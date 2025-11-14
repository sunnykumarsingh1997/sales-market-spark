import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  alert_type: string;
  metric_name: string;
  threshold_value: number;
  current_value: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  is_read: boolean;
  created_at: string;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
    case 'high':
      return <AlertTriangle className="h-4 w-4" />;
    case 'medium':
      return <Info className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'destructive';
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    default:
      return 'secondary';
  }
};

export const AlertsPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['kpi-alerts', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kpi_alerts')
        .select('*')
        .eq('user_id', user!.id)
        .is('resolved_at', null)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as Alert[];
    },
    enabled: !!user,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('kpi_alerts')
        .update({ is_read: true })
        .eq('id', alertId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-alerts'] });
    },
  });

  const resolveAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('kpi_alerts')
        .update({ resolved_at: new Date().toISOString() })
        .eq('id', alertId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-alerts'] });
      toast({
        title: "Alert Resolved",
        description: "The alert has been marked as resolved.",
      });
    },
  });

  const unreadCount = alerts.filter(a => !a.is_read).length;

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading alerts...</div>;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Smart Alerts</h3>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No active alerts</p>
          <p className="text-xs text-muted-foreground mt-1">
            You'll be notified when KPIs deviate from thresholds
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.is_read ? 'bg-background' : 'bg-accent/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-2 flex-1">
                    <div className={`mt-0.5 text-${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{alert.metric_name}</span>
                        <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>Current: {alert.current_value}</span>
                        <span>Threshold: {alert.threshold_value}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => resolveAlertMutation.mutate(alert.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {!alert.is_read && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 h-6 text-xs"
                    onClick={() => markAsReadMutation.mutate(alert.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  );
};
