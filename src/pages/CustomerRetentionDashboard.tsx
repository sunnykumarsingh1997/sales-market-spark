import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingDown, DollarSign, Target, UserCheck, UserX, UserPlus, Activity } from "lucide-react";
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
  ScatterChart,
  Scatter,
} from "recharts";

// Customer Segmentation Data
const segmentationData = [
  { segment: "New", count: 1245, percentage: 18, ltv: 850, color: "hsl(var(--chart-1))" },
  { segment: "Active", count: 3890, percentage: 56, ltv: 3240, color: "hsl(var(--chart-2))" },
  { segment: "At-Risk", count: 1120, percentage: 16, ltv: 1580, color: "hsl(var(--chart-3))" },
  { segment: "Lost", count: 695, percentage: 10, ltv: 420, color: "hsl(var(--chart-4))" },
];

// Monthly Churn Analysis
const churnData = [
  { month: "Jan", churnRate: 3.2, customers: 6800, lost: 218, retained: 6582 },
  { month: "Feb", churnRate: 2.8, customers: 6950, lost: 195, retained: 6755 },
  { month: "Mar", churnRate: 3.5, customers: 7100, lost: 249, retained: 6851 },
  { month: "Apr", churnRate: 2.9, customers: 6980, lost: 202, retained: 6778 },
  { month: "May", churnRate: 2.6, customers: 7200, lost: 187, retained: 7013 },
  { month: "Jun", churnRate: 2.4, customers: 6950, lost: 167, retained: 6783 },
];

// Lifetime Value Distribution
const ltvData = [
  { range: "$0-500", customers: 1240, avgLtv: 285, color: "hsl(var(--chart-1))" },
  { range: "$500-1K", customers: 1890, avgLtv: 745, color: "hsl(var(--chart-2))" },
  { range: "$1K-2.5K", customers: 2140, avgLtv: 1625, color: "hsl(var(--chart-3))" },
  { range: "$2.5K-5K", customers: 980, avgLtv: 3420, color: "hsl(var(--chart-4))" },
  { range: "$5K+", customers: 700, avgLtv: 7850, color: "hsl(var(--chart-5))" },
];

// Retention Score Distribution (predictive)
const retentionScoreData = [
  { score: 90, customerCount: 3240, avgPurchases: 12, avgLtv: 4200, segment: "Loyal" },
  { score: 75, customerCount: 1850, avgPurchases: 8, avgLtv: 2800, segment: "Regular" },
  { score: 55, customerCount: 1120, avgPurchases: 4, avgLtv: 1200, segment: "At-Risk" },
  { score: 35, customerCount: 740, avgPurchases: 2, avgLtv: 580, segment: "Critical" },
];

// Cohort Analysis
const cohortData = [
  { cohort: "Q1 2025", month1: 100, month2: 87, month3: 78, month4: 72, month5: 68, month6: 65 },
  { cohort: "Q4 2024", month1: 100, month2: 85, month3: 76, month4: 70, month5: 66, month6: 62 },
  { cohort: "Q3 2024", month1: 100, month2: 82, month3: 73, month4: 67, month5: 62, month6: 58 },
  { cohort: "Q2 2024", month1: 100, month2: 80, month3: 70, month4: 64, month5: 59, month6: 55 },
];

export default function CustomerRetentionDashboard() {
  const [regionFilter, setRegionFilter] = useState("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState("all");
  const [purchaseFreqFilter, setPurchaseFreqFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customer Retention Dashboard</h2>
          <p className="text-muted-foreground mt-1">Predictive insights and customer lifecycle analytics</p>
        </div>
        <Badge variant="outline" className="text-sm">Last 6 months</Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <p className="text-sm text-muted-foreground">Customize your view by region, age group, and purchase frequency</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia Pacific</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Age Group</label>
              <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45-54">45-54</SelectItem>
                  <SelectItem value="55+">55+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Purchase Frequency</label>
              <Select value={purchaseFreqFilter} onValueChange={setPurchaseFreqFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frequencies</SelectItem>
                  <SelectItem value="high">High (10+ / month)</SelectItem>
                  <SelectItem value="medium">Medium (5-9 / month)</SelectItem>
                  <SelectItem value="low">Low (1-4 / month)</SelectItem>
                  <SelectItem value="rare">Rare (&lt;1 / month)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Customers"
          value="6,950"
          change={4.2}
          changeLabel="vs last month"
          icon={Users}
        />
        <MetricCard
          title="Churn Rate"
          value="2.4%"
          change={-0.5}
          changeLabel="vs last month"
          icon={TrendingDown}
        />
        <MetricCard
          title="Avg Customer LTV"
          value="$2,847"
          change={8.3}
          changeLabel="vs last quarter"
          icon={DollarSign}
        />
        <MetricCard
          title="Retention Score"
          value="87.6%"
          change={3.1}
          changeLabel="vs last month"
          icon={Target}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="New Customers"
          value="1,245"
          change={12.4}
          changeLabel="this month"
          icon={UserPlus}
        />
        <MetricCard
          title="Active Customers"
          value="3,890"
          change={2.8}
          changeLabel="vs last month"
          icon={UserCheck}
        />
        <MetricCard
          title="At-Risk Customers"
          value="1,120"
          change={-6.2}
          changeLabel="vs last month"
          icon={Activity}
        />
        <MetricCard
          title="Lost Customers"
          value="695"
          change={-8.1}
          changeLabel="vs last month"
          icon={UserX}
        />
      </div>

      {/* Customer Segmentation */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segmentation</CardTitle>
            <p className="text-sm text-muted-foreground">Distribution by customer lifecycle stage</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="count"
                >
                  {segmentationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segment Lifetime Value</CardTitle>
            <p className="text-sm text-muted-foreground">Average LTV by customer segment</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={segmentationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="segment" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="ltv" radius={[8, 8, 0, 0]}>
                  {segmentationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Churn Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Churn Rate</CardTitle>
            <p className="text-sm text-muted-foreground">Customer churn percentage over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={churnData}>
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
                <Line
                  type="monotone"
                  dataKey="churnRate"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={3}
                  name="Churn Rate (%)"
                  dot={{ fill: "hsl(var(--destructive))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <p className="text-sm text-muted-foreground">Retained vs lost customers by month</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={churnData}>
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
                  dataKey="retained"
                  stackId="1"
                  stroke="hsl(var(--success))"
                  fill="hsl(var(--success))"
                  fillOpacity={0.6}
                  name="Retained"
                />
                <Area
                  type="monotone"
                  dataKey="lost"
                  stackId="2"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.6}
                  name="Lost"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* LTV Distribution & Retention Score */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lifetime Value Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">Customer count by LTV range</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ltvData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="customers" name="Customers" radius={[8, 8, 0, 0]}>
                  {ltvData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Retention Score</CardTitle>
            <p className="text-sm text-muted-foreground">AI-powered retention likelihood by customer segment</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="avgPurchases"
                  type="number"
                  name="Avg Purchases"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Avg Purchases", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  dataKey="score"
                  type="number"
                  name="Retention Score"
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: "Retention Score", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Scatter
                  name="Customers"
                  data={retentionScoreData}
                  fill="hsl(var(--primary))"
                >
                  {retentionScoreData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.segment === "Loyal"
                          ? "hsl(var(--success))"
                          : entry.segment === "Regular"
                          ? "hsl(var(--primary))"
                          : entry.segment === "At-Risk"
                          ? "hsl(var(--warning))"
                          : "hsl(var(--destructive))"
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cohort Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Cohort Retention Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">Customer retention by acquisition cohort over 6 months</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="cohort"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="month1" stroke="hsl(var(--chart-1))" name="Month 1" strokeWidth={2} />
              <Line type="monotone" dataKey="month2" stroke="hsl(var(--chart-2))" name="Month 2" strokeWidth={2} />
              <Line type="monotone" dataKey="month3" stroke="hsl(var(--chart-3))" name="Month 3" strokeWidth={2} />
              <Line type="monotone" dataKey="month4" stroke="hsl(var(--chart-4))" name="Month 4" strokeWidth={2} />
              <Line type="monotone" dataKey="month5" stroke="hsl(var(--chart-5))" name="Month 5" strokeWidth={2} />
              <Line type="monotone" dataKey="month6" stroke="hsl(var(--primary))" name="Month 6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* DAX Formula Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Power BI DAX Integration Insights</CardTitle>
          <p className="text-sm text-muted-foreground">Key predictive metrics powered by DAX formulas</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Customer Retention Rate (DAX)</h4>
                <code className="text-xs text-muted-foreground">
                  DIVIDE(CALCULATE([Total Customers], [Active Status] = TRUE), [Total Customers])
                </code>
                <p className="mt-2 text-sm">Current: <strong className="text-success">87.6%</strong></p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Predicted Churn Score</h4>
                <code className="text-xs text-muted-foreground">
                  IF([Days Since Last Purchase] &gt; 90, "High Risk", IF([Purchase Frequency] &lt; 2, "Medium", "Low"))
                </code>
                <p className="mt-2 text-sm">At-Risk: <strong className="text-warning">1,120 customers</strong></p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Customer Lifetime Value (DAX)</h4>
                <code className="text-xs text-muted-foreground">
                  SUMX(RELATEDTABLE(Transactions), [Amount]) * [Avg Customer Lifespan]
                </code>
                <p className="mt-2 text-sm">Average: <strong className="text-primary">$2,847</strong></p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Retention Health Score</h4>
                <code className="text-xs text-muted-foreground">
                  CALCULATE([Purchase Frequency] * 0.4 + [Engagement Score] * 0.6)
                </code>
                <p className="mt-2 text-sm">Score: <strong className="text-success">8.2/10</strong></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
