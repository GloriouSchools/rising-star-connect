-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('pupil', 'teacher', 'non-teaching', 'parent', 'admin')) NOT NULL,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  title TEXT,
  gender TEXT,
  subject TEXT,
  department TEXT,
  qualification TEXT,
  experience TEXT,
  join_date DATE,
  bio TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  avatar_url TEXT,
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'archived', 'deleted')),
  status_reason TEXT,
  status_date TIMESTAMP WITH TIME ZONE,
  suspension_end_date TIMESTAMP WITH TIME ZONE,
  status_updated_by UUID,
  next_steps TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  age INTEGER NOT NULL,
  parent TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'archived', 'expelled')),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  emergency_contact TEXT,
  emergency_phone TEXT,
  medical_info TEXT,
  created_by UUID REFERENCES auth.users,
  updated_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  department TEXT,
  qualification TEXT,
  experience TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'suspended')),
  is_class_teacher BOOLEAN DEFAULT false,
  is_department_head BOOLEAN DEFAULT false,
  classes_taught TEXT[],
  subjects_taught TEXT[],
  created_by UUID REFERENCES auth.users,
  updated_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create staff table
CREATE TABLE public.staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  created_by UUID REFERENCES auth.users,
  updated_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  level TEXT NOT NULL,
  class_teacher_id UUID REFERENCES public.teachers(id),
  student_count INTEGER DEFAULT 0,
  room_number TEXT,
  academic_year TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create grades table
CREATE TABLE public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  term TEXT NOT NULL,
  year INTEGER NOT NULL,
  marks INTEGER CHECK (marks >= 0 AND marks <= 100),
  grade TEXT,
  remarks TEXT,
  teacher_id UUID REFERENCES public.teachers(id),
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pending_operations table for teacher requests
CREATE TABLE public.pending_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_type TEXT CHECK (operation_type IN ('add', 'edit', 'delete')) NOT NULL,
  entity_type TEXT CHECK (entity_type IN ('student', 'teacher', 'staff')) NOT NULL,
  entity_data JSONB NOT NULL,
  original_data JSONB,
  requested_by UUID REFERENCES auth.users NOT NULL,
  requester_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reason TEXT,
  reviewed_by UUID REFERENCES auth.users,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON public.grades
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_operations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" 
  ON public.profiles FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for students
CREATE POLICY "Students are viewable by authenticated users" 
  ON public.students FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Teachers and admins can manage students" 
  ON public.students FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('teacher', 'admin')
  ));

-- RLS Policies for teachers
CREATE POLICY "Teachers are viewable by authenticated users" 
  ON public.teachers FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage teachers" 
  ON public.teachers FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for staff
CREATE POLICY "Staff are viewable by authenticated users" 
  ON public.staff FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage staff" 
  ON public.staff FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for classes
CREATE POLICY "Classes are viewable by authenticated users" 
  ON public.classes FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and teachers can manage classes" 
  ON public.classes FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('teacher', 'admin')
  ));

-- RLS Policies for grades
CREATE POLICY "Students can view their own grades" 
  ON public.grades FOR SELECT 
  USING (
    auth.role() = 'authenticated' AND (
      student_id IN (
        SELECT id FROM public.students WHERE email = auth.email()
      ) OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role IN ('teacher', 'admin', 'parent')
      )
    )
  );

CREATE POLICY "Teachers and admins can manage grades" 
  ON public.grades FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('teacher', 'admin')
  ));

-- RLS Policies for pending_operations
CREATE POLICY "Admins can view all pending operations" 
  ON public.pending_operations FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can view their own pending operations" 
  ON public.pending_operations FOR SELECT 
  USING (requested_by = auth.uid());

CREATE POLICY "Teachers can create pending operations" 
  ON public.pending_operations FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'teacher'
  ));

CREATE POLICY "Admins can update pending operations" 
  ON public.pending_operations FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'pupil')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();