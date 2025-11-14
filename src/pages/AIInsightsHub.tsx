import { DashboardLayout } from "@/components/DashboardLayout";
import { AIAssistant } from "@/components/AIAssistant";
import { AlertsPanel } from "@/components/AlertsPanel";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Users, Target } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { MetricCard } from "@/components/MetricCard";

export default function AIInsightsHub() {
  const { primaryRole, isAdmin } = useUserRole();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              AI Insights Hub
            </h1>
            <p className="text-muted-foreground mt-1">
              Predictive analytics and intelligent automation for {primaryRole} role
            </p>
          </div>
        </div>

        {/* Key AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="AI Predictions"
            value="94.2%"
            change={3.5}
            changeLabel="from last month"
            icon={Brain}
          />
          <MetricCard
            title="Insights Generated"
            value="1,247"
            change={17.6}
            changeLabel="from last month"
            icon={TrendingUp}
          />
          <MetricCard
            title="Automations Active"
            value="23"
            change={27.8}
            changeLabel="from last month"
            icon={Target}
          />
          <MetricCard
            title="Users Engaged"
            value="89"
            change={15.6}
            changeLabel="from last month"
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Assistant - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AIAssistant />
          </div>

          {/* Alerts Panel */}
          <div>
            <AlertsPanel />
          </div>
        </div>

        {/* AI Features Tabs */}
        <Card className="p-6">
          <Tabs defaultValue="predictive" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
              <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
              <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="predictive" className="space-y-4">
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Predictive Analytics Models</h3>
                <div className="grid gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Churn Prediction Model</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Identifies customers at risk of churning with 92% accuracy
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">Active</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Last trained: 2 days ago</span>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Sales Forecasting Model</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Predicts revenue trends with 88% confidence interval
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">Active</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Last trained: 1 week ago</span>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Customer LTV Prediction</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Estimates lifetime value for customer segments
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded">Active</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Last trained: 3 days ago</span>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="segmentation" className="space-y-4">
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">AI-Powered Customer Segmentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Machine learning algorithms automatically identify customer segments based on behavior, purchase patterns, and engagement.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium text-green-600 mb-1">High-Value Segment</h4>
                    <p className="text-2xl font-bold mb-2">1,234 customers</p>
                    <p className="text-xs text-muted-foreground">Avg LTV: $12,450 • Retention: 94%</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-blue-600 mb-1">Growth Potential</h4>
                    <p className="text-2xl font-bold mb-2">2,891 customers</p>
                    <p className="text-xs text-muted-foreground">Avg LTV: $3,200 • Retention: 76%</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-yellow-600 mb-1">At-Risk</h4>
                    <p className="text-2xl font-bold mb-2">456 customers</p>
                    <p className="text-xs text-muted-foreground">Churn probability: 68% • Action needed</p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-gray-600 mb-1">Dormant</h4>
                    <p className="text-2xl font-bold mb-2">789 customers</p>
                    <p className="text-xs text-muted-foreground">No activity: 90+ days • Re-engagement campaign</p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="forecasting" className="space-y-4">
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Revenue & Sales Forecasting</h3>
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium mb-1">Next Quarter Forecast</h4>
                        <p className="text-sm text-muted-foreground">Q1 2024 Revenue Prediction</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">88% confidence</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Pessimistic</span>
                        <span className="font-medium">$2.8M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Expected</span>
                        <span className="font-bold text-primary">$3.2M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Optimistic</span>
                        <span className="font-medium">$3.6M</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Key Forecast Drivers</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>Seasonal trend: +15% growth expected</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>Customer acquisition rate: Stable at 12%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-500" />
                        <span>Market expansion: New region launch</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Smart Automation Workflows</h3>
                <div className="space-y-3">
                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Churn Prevention Campaign</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Automatically triggers email sequence when churn probability exceeds 60%
                        </p>
                        <div className="flex gap-2 text-xs">
                          <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded">Active</span>
                          <span className="bg-muted px-2 py-1 rounded">45 customers engaged</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">High-Value Lead Alert</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Notifies sales team when lead score exceeds 80 points
                        </p>
                        <div className="flex gap-2 text-xs">
                          <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded">Active</span>
                          <span className="bg-muted px-2 py-1 rounded">12 alerts this week</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Daily Performance Report</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Generates and emails AI insights summary at 8 AM daily
                        </p>
                        <div className="flex gap-2 text-xs">
                          <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded">Active</span>
                          <span className="bg-muted px-2 py-1 rounded">Sent to 15 users</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
