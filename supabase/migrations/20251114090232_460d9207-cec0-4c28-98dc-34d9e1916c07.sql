-- Create alerts table for smart monitoring
CREATE TABLE public.kpi_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  threshold_value DECIMAL,
  current_value DECIMAL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on kpi_alerts
ALTER TABLE public.kpi_alerts ENABLE ROW LEVEL SECURITY;

-- RLS policies for kpi_alerts
CREATE POLICY "Users can view their own alerts"
ON public.kpi_alerts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
ON public.kpi_alerts
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "System can insert alerts"
ON public.kpi_alerts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create AI chat history table
CREATE TABLE public.ai_chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on ai_chat_history
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_chat_history
CREATE POLICY "Users can view their own chat history"
ON public.ai_chat_history
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages"
ON public.ai_chat_history
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_kpi_alerts_user_id ON public.kpi_alerts(user_id, created_at DESC);
CREATE INDEX idx_ai_chat_history_user_id ON public.ai_chat_history(user_id, conversation_id, created_at);