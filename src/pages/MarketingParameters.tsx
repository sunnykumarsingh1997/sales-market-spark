import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function MarketingParameters() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 0, 1),
    to: new Date(),
  });

  const handleSave = () => {
    toast({
      title: "Parameters Saved",
      description: "Your marketing parameters have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Parameters</h2>
          <p className="text-muted-foreground mt-1">Configure data sources, budgets, and KPI targets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="datasources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="datasources">Data Sources</TabsTrigger>
          <TabsTrigger value="budgets">Budgets & Goals</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Setup</TabsTrigger>
          <TabsTrigger value="kpis">KPI Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="datasources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Google Ads Integration</CardTitle>
                <CardDescription>Connect your Google Ads account for real-time data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="google-client-id">Client ID</Label>
                  <Input id="google-client-id" placeholder="Enter Google Ads Client ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="google-account">Account ID</Label>
                  <Input id="google-account" placeholder="Enter Account ID" />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  Connected
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meta (Facebook) Ads</CardTitle>
                <CardDescription>Connect your Meta advertising account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-access-token">Access Token</Label>
                  <Input id="meta-access-token" type="password" placeholder="Enter Meta Access Token" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-ad-account">Ad Account ID</Label>
                  <Input id="meta-ad-account" placeholder="act_XXXXXXXXXX" />
                </div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
                  Not Connected
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Marketing</CardTitle>
                <CardDescription>Connect Mailchimp, SendGrid, or other platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-platform">Platform</Label>
                  <Select defaultValue="mailchimp">
                    <SelectTrigger id="email-platform">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="hubspot">HubSpot</SelectItem>
                      <SelectItem value="klaviyo">Klaviyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-api-key">API Key</Label>
                  <Input id="email-api-key" type="password" placeholder="Enter API Key" />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  Connected
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CRM Integration</CardTitle>
                <CardDescription>Connect to SalesVision or other CRM systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crm-system">CRM System</Label>
                  <Select defaultValue="salesvision">
                    <SelectTrigger id="crm-system">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salesvision">SalesVision</SelectItem>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="hubspot">HubSpot CRM</SelectItem>
                      <SelectItem value="pipedrive">Pipedrive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm-endpoint">API Endpoint</Label>
                  <Input id="crm-endpoint" placeholder="https://api.salesvision.com/v1" />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  Connected
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Marketing Budget</CardTitle>
                <CardDescription>Set your total marketing budget for the period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="total-budget">Total Budget ($)</Label>
                  <Input id="total-budget" type="number" placeholder="50000" defaultValue="50000" />
                </div>
                <div className="space-y-2">
                  <Label>Budget Period</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("justify-start text-left font-normal")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? format(dateRange.from, "PPP") : <span>From date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("justify-start text-left font-normal")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? format(dateRange.to, "PPP") : <span>To date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Budget Allocation</CardTitle>
                <CardDescription>Distribute budget across marketing channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="social-budget">Social Media ($)</Label>
                  <Input id="social-budget" type="number" placeholder="15000" defaultValue="15000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-budget">Email Marketing ($)</Label>
                  <Input id="email-budget" type="number" placeholder="10000" defaultValue="10000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-budget">Search Ads ($)</Label>
                  <Input id="search-budget" type="number" placeholder="18000" defaultValue="18000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display-budget">Display Ads ($)</Label>
                  <Input id="display-budget" type="number" placeholder="7000" defaultValue="7000" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Configure and manage your marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="Summer Sale 2025" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <Select>
                    <SelectTrigger id="campaign-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="consideration">Consideration</SelectItem>
                      <SelectItem value="conversion">Conversion</SelectItem>
                      <SelectItem value="retention">Retention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-budget">Budget ($)</Label>
                  <Input id="campaign-budget" type="number" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-channel">Primary Channel</Label>
                  <Select>
                    <SelectTrigger id="campaign-channel">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="search">Search Ads</SelectItem>
                      <SelectItem value="display">Display Ads</SelectItem>
                      <SelectItem value="content">Content Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">Add New Campaign</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Targets</CardTitle>
                <CardDescription>Set your KPI targets for the period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target-roi">Target ROI (x)</Label>
                  <Input id="target-roi" type="number" step="0.1" placeholder="3.5" defaultValue="3.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-ctr">Target CTR (%)</Label>
                  <Input id="target-ctr" type="number" step="0.1" placeholder="4.5" defaultValue="4.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-cpc">Target CPC ($)</Label>
                  <Input id="target-cpc" type="number" step="0.01" placeholder="2.50" defaultValue="2.50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-conversion">Target Conversion Rate (%)</Label>
                  <Input id="target-conversion" type="number" step="0.1" placeholder="2.8" defaultValue="2.8" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Generation Targets</CardTitle>
                <CardDescription>Set targets for lead acquisition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target-leads">Monthly Lead Target</Label>
                  <Input id="target-leads" type="number" placeholder="5000" defaultValue="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-cpl">Target Cost Per Lead ($)</Label>
                  <Input id="target-cpl" type="number" step="0.01" placeholder="25.00" defaultValue="25.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-sql">Sales Qualified Leads Target</Label>
                  <Input id="target-sql" type="number" placeholder="1500" defaultValue="1500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-lead-conversion">Lead-to-Customer Rate (%)</Label>
                  <Input id="target-lead-conversion" type="number" step="0.1" placeholder="15" defaultValue="15" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
