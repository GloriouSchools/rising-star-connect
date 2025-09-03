-- First, drop ALL existing policies on profiles table to start fresh
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Teachers can view teacher and admin profiles" ON public.profiles;
DROP POLICY IF EXISTS "Parents can view limited teacher info" ON public.profiles;
DROP POLICY IF EXISTS "Non-teaching staff can view admins" ON public.profiles;
DROP POLICY IF EXISTS "Pupils can view own profile only" ON public.profiles;

-- Now create the secure policies with proper role-based access control

-- 1. Users can view their own profile (all roles)
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- 2. Users can update their own profile  
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 3. Admins have full access to all profiles
CREATE POLICY "Admins have full profile access" 
  ON public.profiles FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- 4. Teachers can view other teachers and admins (for collaboration)
CREATE POLICY "Teachers view colleagues" 
  ON public.profiles FOR SELECT 
  USING (
    id = auth.uid() OR (
      EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'teacher'
      ) AND role IN ('teacher', 'admin')
    )
  );

-- 5. Parents have very limited access - only their own profile
CREATE POLICY "Parents limited access" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'parent'
    ) AND id = auth.uid()
  );

-- 6. Non-teaching staff can see their profile and admins
CREATE POLICY "Non-teaching staff limited view" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'non-teaching'
    ) AND (
      id = auth.uid() OR role = 'admin'
    )
  );

-- 7. Pupils can only see their own profile
CREATE POLICY "Pupils own profile only" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'pupil'
    ) AND id = auth.uid()
  );

-- Create a secure function to get minimal public info for UI display
CREATE OR REPLACE FUNCTION public.get_user_display_name(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    CASE 
      WHEN first_name IS NOT NULL AND last_name IS NOT NULL 
      THEN first_name || ' ' || last_name
      ELSE email
    END
  FROM public.profiles
  WHERE id = user_id;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.get_user_display_name(UUID) TO authenticated;

-- Also fix the other table policies to be more restrictive

-- Fix students table access
DROP POLICY IF EXISTS "Students are viewable by authenticated users" ON public.students;
DROP POLICY IF EXISTS "Teachers and admins can manage students" ON public.students;
DROP POLICY IF EXISTS "Role-based student access" ON public.students;

-- Only teachers and admins can view students
CREATE POLICY "Teachers and admins view students" 
  ON public.students FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('teacher', 'admin')
    )
  );

-- Parents can only see their own children
CREATE POLICY "Parents view own children" 
  ON public.students FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role = 'parent'
      AND (first_name || ' ' || last_name) = students.parent
    )
  );

-- Students can see their own record
CREATE POLICY "Students view own record" 
  ON public.students FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'pupil'
      AND p.email = students.email
    )
  );

-- Teachers and admins can manage students
CREATE POLICY "Teachers admins manage students" 
  ON public.students FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('teacher', 'admin')
    )
  );

-- Fix teachers table access
DROP POLICY IF EXISTS "Teachers are viewable by authenticated users" ON public.teachers;
DROP POLICY IF EXISTS "Admins can manage teachers" ON public.teachers;
DROP POLICY IF EXISTS "Role-based teacher access" ON public.teachers;

-- Restricted teacher viewing
CREATE POLICY "Limited teacher viewing" 
  ON public.teachers FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'teacher', 'non-teaching')
    )
  );

-- Only admins can manage teachers
CREATE POLICY "Only admins manage teachers" 
  ON public.teachers FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Fix staff table access
DROP POLICY IF EXISTS "Staff are viewable by authenticated users" ON public.staff;
DROP POLICY IF EXISTS "Admins can manage staff" ON public.staff;
DROP POLICY IF EXISTS "Role-based staff access" ON public.staff;

-- Only internal staff can view staff records
CREATE POLICY "Internal staff viewing" 
  ON public.staff FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'teacher', 'non-teaching')
    )
  );

-- Only admins can manage staff
CREATE POLICY "Only admins manage staff" 
  ON public.staff FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add table comments explaining the security model
COMMENT ON TABLE public.profiles IS 'User profiles with strict role-based access. Personal data is protected - users can only see profiles based on their role and relationships.';
COMMENT ON TABLE public.students IS 'Student records with role-based access. Only teachers, admins, parents (own children), and students (own record) can view.';
COMMENT ON TABLE public.teachers IS 'Teacher records viewable by staff only. Parents and students cannot access teacher personal information.';
COMMENT ON TABLE public.staff IS 'Staff records restricted to internal staff only. No access for parents or students.';