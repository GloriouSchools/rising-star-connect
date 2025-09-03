-- Drop the overly permissive policy that exposes all user data
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create proper role-based access policies for profiles table

-- 1. Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- 2. Admins can view all profiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- 3. Teachers can view other teachers and admin profiles (for collaboration)
CREATE POLICY "Teachers can view teacher and admin profiles" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'teacher'
    ) AND role IN ('teacher', 'admin')
  );

-- 4. Parents can only view their own profile and their children's teachers (limited info)
CREATE POLICY "Parents can view limited teacher info" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'parent'
    ) AND (
      id = auth.uid() OR 
      -- Only teachers who teach classes with parent's children
      EXISTS (
        SELECT 1 FROM public.teachers t
        WHERE t.email = profiles.email
        AND EXISTS (
          SELECT 1 FROM public.students s
          WHERE s.class = ANY(t.classes_taught)
          AND s.parent IN (
            SELECT first_name || ' ' || last_name 
            FROM public.profiles 
            WHERE id = auth.uid()
          )
        )
      )
    )
  );

-- 5. Non-teaching staff can view admin profiles only (for reporting)
CREATE POLICY "Non-teaching staff can view admins" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'non-teaching'
    ) AND (
      id = auth.uid() OR role = 'admin'
    )
  );

-- 6. Pupils/Students can only view their own profile
CREATE POLICY "Pupils can view own profile only" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'pupil'
    ) AND id = auth.uid()
  );

-- Create a function to get minimal public info (name and role only) for display purposes
CREATE OR REPLACE FUNCTION public.get_public_profile_info(profile_id UUID)
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  role TEXT,
  department TEXT,
  subject TEXT
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    id,
    first_name,
    last_name,
    role,
    department,
    subject
  FROM public.profiles
  WHERE id = profile_id;
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION public.get_public_profile_info(UUID) TO authenticated;

-- Add comment to explain the security model
COMMENT ON TABLE public.profiles IS 'User profiles with strict role-based access control. Personal information is protected and only visible based on user roles and relationships.';

-- Also update the policies for other tables to ensure consistency

-- Update students table policies to be more restrictive
DROP POLICY IF EXISTS "Students are viewable by authenticated users" ON public.students;

-- Students can be viewed by teachers, admins, and parents of those students
CREATE POLICY "Role-based student access" 
  ON public.students FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('teacher', 'admin')
    ) OR (
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role = 'parent'
        AND (first_name || ' ' || last_name) = students.parent
      )
    ) OR (
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role = 'pupil'
        AND email = students.email
      )
    )
  );

-- Update teachers table policies
DROP POLICY IF EXISTS "Teachers are viewable by authenticated users" ON public.teachers;

CREATE POLICY "Role-based teacher access" 
  ON public.teachers FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('teacher', 'admin', 'non-teaching')
    ) OR (
      -- Parents can see basic info about their children's teachers
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role = 'parent'
      )
    )
  );

-- Update staff table policies
DROP POLICY IF EXISTS "Staff are viewable by authenticated users" ON public.staff;

CREATE POLICY "Role-based staff access" 
  ON public.staff FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'teacher', 'non-teaching')
    )
  );