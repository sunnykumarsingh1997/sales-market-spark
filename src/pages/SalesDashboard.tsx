import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
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
} from "recharts";

const revenueData = [
  { month: "Jan", actual: 120000, target: 130000 },
  { month: "Feb", actual: 135000, target: 135000 },
  { month: "Mar", actual: 148000, target: 140000 },
  { month: "Apr", actual: 125000, target: 145000 },
  { month: "May", actual: 160000, target: 150000 },
  { month: "Jun", actual: 140000, target: 140000 },
];

const productData = [
  { name: "Cloud Services", revenue: 140000 },
  { name: "Analytics Platform", revenue: 105000 },
  { name: "Mobile App", revenue: 70000 },
  { name: "Consulting", revenue: 35000 },
  { name: "Enterprise Software", revenue: 25000 },
];

const regionData = [
  { name: "Pacific", value: 24, color: "hsl(var(--chart-1))" },
  { name: "Europe", value: 14, color: "hsl(var(--chart-2))" },
  { name: "Americas", value: 32, color: "hsl(var(--chart-3))" },
  { name: "Asia", value: 18, color: "hsl(var(--chart-4))" },
  { name: "Africa", value: 12, color: "hsl(var(--chart-5))" },
];

const transactions = [
  { id: "TXN-0549", customer: "Innovation Labs", product: "Premium", amount: "$4,433", status: "Completed", date: "10/1/2025" },
  { id: "TXN-2081", customer: "TechStart Inc", product: "Pro Plan", amount: "$2,031", status: "Pending", date: "9/30/2025" },
  { id: "TXN-1847", customer: "Global Corp", product: "Enterprise", amount: "$8,750", status: "Completed", date: "9/29/2025" },
  { id: "TXN-3392", customer: "Digital Agency", product: "Standard", amount: "$1,250", status: "Completed", date: "9/28/2025" },
  { id: "TXN-4156", customer: "StartUp Hub", product: "Basic", amount: "$599", status: "Failed", date: "9/27/2025" },
];

export default function SalesDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales Analytics Dashboard</h2>
          <p className="text-muted-foreground mt-1">Real-time sales analytics and performance insights</p>
        </div>
        <Badge variant="outline" className="text-sm">Last 30 days</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$571.4K"
          change={7.59}
          changeLabel="vs last month"
          icon={DollarSign}
        />
        <MetricCard
          title="Total Sales"
          value="10,281"
          change={3.18}
          changeLabel="vs last month"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Conversion Rate"
          value="16.7%"
          change={0.05}
          changeLabel="vs last month"
          icon={TrendingUp}
        />
        <MetricCard
          title="New Customers"
          value="1,516"
          change={17.90}
          changeLabel="vs last month"
          icon={Users}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly revenue vs target</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
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
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <p className="text-sm text-muted-foreground">Regional distribution of sales</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" width={150} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <p className="text-sm text-muted-foreground">Latest sales activity</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-mono text-sm">{transaction.id}</td>
                    <td className="py-3 px-4">{transaction.customer}</td>
                    <td className="py-3 px-4">{transaction.product}</td>
                    <td className="py-3 px-4 font-semibold">{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          transaction.status === "Completed"
                            ? "default"
                            : transaction.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{transaction.date}</td>
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
