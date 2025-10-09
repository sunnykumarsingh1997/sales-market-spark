import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, MousePointerClick, TrendingUp, DollarSign, Target, Users, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const impressionsData = [
  { month: "Jan", impressions: 45000, clicks: 3200, conversions: 420 },
  { month: "Feb", impressions: 52000, clicks: 3800, conversions: 510 },
  { month: "Mar", impressions: 61000, clicks: 4500, conversions: 680 },
  { month: "Apr", impressions: 58000, clicks: 4100, conversions: 590 },
  { month: "May", impressions: 72000, clicks: 5200, conversions: 780 },
  { month: "Jun", impressions: 68000, clicks: 4900, conversions: 720 },
];

const channelData = [
  { name: "Social Media", spend: 12500, roi: 3.2, budget: 15000, cpc: 2.4, ctr: 4.8, color: "hsl(var(--chart-1))" },
  { name: "Email", spend: 8200, roi: 4.8, budget: 10000, cpc: 0.8, ctr: 6.2, color: "hsl(var(--chart-2))" },
  { name: "Search Ads", spend: 15800, roi: 2.9, budget: 18000, cpc: 3.1, ctr: 3.9, color: "hsl(var(--chart-3))" },
  { name: "Display", spend: 6300, roi: 2.1, budget: 7000, cpc: 1.9, ctr: 2.1, color: "hsl(var(--chart-4))" },
  { name: "Content", spend: 9100, roi: 3.7, budget: 10000, cpc: 1.2, ctr: 5.4, color: "hsl(var(--chart-5))" },
];

const leadSourceData = [
  { source: "Organic Search", leads: 1240, cost: 8200, cpl: 6.61, color: "hsl(var(--chart-1))" },
  { source: "Paid Social", leads: 890, cost: 12500, cpl: 14.04, color: "hsl(var(--chart-2))" },
  { source: "Email Campaign", leads: 650, cost: 3200, cpl: 4.92, color: "hsl(var(--chart-3))" },
  { source: "Referral", leads: 420, cost: 2100, cpl: 5.00, color: "hsl(var(--chart-4))" },
  { source: "Direct", leads: 380, cost: 1500, cpl: 3.95, color: "hsl(var(--chart-5))" },
];

const campaignData = [
  { name: "Summer Sale 2025", impressions: 125000, clicks: 8400, conversions: 1120, spend: "$4,200", roi: "3.8x" },
  { name: "Product Launch", impressions: 98000, clicks: 6800, conversions: 920, spend: "$3,800", roi: "4.2x" },
  { name: "Brand Awareness", impressions: 210000, clicks: 12500, conversions: 850, spend: "$5,600", roi: "2.1x" },
  { name: "Holiday Special", impressions: 156000, clicks: 9200, conversions: 1340, spend: "$4,900", roi: "4.5x" },
];

const funnelData = [
  { stage: "Impressions", value: 68000, color: "hsl(var(--chart-1))" },
  { stage: "Clicks", value: 4900, color: "hsl(var(--chart-2))" },
  { stage: "Leads", value: 1200, color: "hsl(var(--chart-3))" },
  { stage: "Conversions", value: 720, color: "hsl(var(--chart-4))" },
];

export default function MarketingDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Performance Dashboard</h2>
          <p className="text-muted-foreground mt-1">Track campaign performance and marketing ROI</p>
        </div>
        <Badge variant="outline" className="text-sm">Last 30 days</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Impressions"
          value="589K"
          change={12.4}
          changeLabel="vs last month"
          icon={Eye}
        />
        <MetricCard
          title="Total Clicks"
          value="26.7K"
          change={8.2}
          changeLabel="vs last month"
          icon={MousePointerClick}
        />
        <MetricCard
          title="Click-Through Rate"
          value="4.5%"
          change={0.3}
          changeLabel="vs last month"
          icon={TrendingUp}
        />
        <MetricCard
          title="Cost Per Acquisition"
          value="$32.40"
          change={-5.2}
          changeLabel="vs last month"
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Marketing ROI"
          value="3.4x"
          change={8.9}
          changeLabel="vs target"
          icon={Target}
        />
        <MetricCard
          title="Total Leads"
          value="3,580"
          change={15.2}
          changeLabel="vs last month"
          icon={Users}
        />
        <MetricCard
          title="Cost Per Lead"
          value="$8.12"
          change={-12.3}
          changeLabel="vs last month"
          icon={Zap}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <p className="text-sm text-muted-foreground">Impressions, clicks, and conversions over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={impressionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="impressions"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                  name="Impressions"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stackId="2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.6}
                  name="Clicks"
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stackId="3"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.6}
                  name="Conversions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <p className="text-sm text-muted-foreground">Marketing spend by channel</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, spend }) => `${name}: $${(spend/1000).toFixed(1)}K`}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="spend"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Spend by Channel</CardTitle>
            <p className="text-sm text-muted-foreground">Real-time tracking of allocated vs actual spend</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelData.map((channel) => {
              const spendPercentage = (channel.spend / channel.budget) * 100;
              return (
                <div key={channel.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{channel.name}</span>
                    <span className="text-muted-foreground">
                      ${channel.spend.toLocaleString()} / ${channel.budget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={spendPercentage} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{spendPercentage.toFixed(1)}% utilized</span>
                    <span className={spendPercentage > 90 ? "text-yellow-600 font-medium" : ""}>
                      ${(channel.budget - channel.spend).toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <p className="text-sm text-muted-foreground">Cost per lead by acquisition channel</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="source" type="category" width={100} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="cpl" fill="hsl(var(--chart-2))" radius={[0, 8, 8, 0]} name="Cost Per Lead ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance Metrics</CardTitle>
            <p className="text-sm text-muted-foreground">CPC and CTR comparison across channels</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Channel</th>
                    <th className="text-left py-3 px-4 font-medium">CPC</th>
                    <th className="text-left py-3 px-4 font-medium">CTR</th>
                    <th className="text-left py-3 px-4 font-medium">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {channelData.map((channel) => (
                    <tr key={channel.name} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{channel.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">${channel.cpc.toFixed(2)}</td>
                      <td className="py-3 px-4 text-muted-foreground">{channel.ctr}%</td>
                      <td className="py-3 px-4">
                        <Badge variant="default">{channel.roi}x</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <p className="text-sm text-muted-foreground">Customer journey stages</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Campaigns</CardTitle>
          <p className="text-sm text-muted-foreground">Best performing marketing campaigns</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Campaign Name</th>
                  <th className="text-left py-3 px-4 font-medium">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium">Conversions</th>
                  <th className="text-left py-3 px-4 font-medium">Spend</th>
                  <th className="text-left py-3 px-4 font-medium">ROI</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((campaign, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{campaign.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{campaign.impressions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-muted-foreground">{campaign.clicks.toLocaleString()}</td>
                    <td className="py-3 px-4 text-muted-foreground">{campaign.conversions.toLocaleString()}</td>
                    <td className="py-3 px-4 font-semibold">{campaign.spend}</td>
                    <td className="py-3 px-4">
                      <Badge variant="default">{campaign.roi}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
