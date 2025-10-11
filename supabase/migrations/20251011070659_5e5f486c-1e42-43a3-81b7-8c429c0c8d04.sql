-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- User roles policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Create user_guides table
CREATE TABLE public.user_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_guides ENABLE ROW LEVEL SECURITY;

-- User guides policies
CREATE POLICY "Users can view their own guides"
ON public.user_guides FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own guides"
ON public.user_guides FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own guides"
ON public.user_guides FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own guides"
ON public.user_guides FOR DELETE
USING (auth.uid() = user_id);

-- Create storage bucket for Power BI files
INSERT INTO storage.buckets (id, name, public)
VALUES ('powerbi-files', 'powerbi-files', false);

-- Storage policies for Power BI files
CREATE POLICY "Users can view their own Power BI files"
ON storage.objects FOR SELECT
USING (bucket_id = 'powerbi-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own Power BI files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'powerbi-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own Power BI files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'powerbi-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own Power BI files"
ON storage.objects FOR DELETE
USING (bucket_id = 'powerbi-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create powerbi_files table
CREATE TABLE public.powerbi_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.powerbi_files ENABLE ROW LEVEL SECURITY;

-- Power BI files policies
CREATE POLICY "Users can view their own Power BI files"
ON public.powerbi_files FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Power BI files"
ON public.powerbi_files FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Power BI files"
ON public.powerbi_files FOR DELETE
USING (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_guides_updated_at
  BEFORE UPDATE ON public.user_guides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();