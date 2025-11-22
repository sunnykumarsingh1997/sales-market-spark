import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingCart, TrendingUp, Users, Activity, CreditCard } from "lucide-react";
import {
  AreaChart,
  Area,
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
import { PageTransition } from "@/components/PageTransition";
import { DateRangePicker } from "@/components/DateRangePicker";
import { revenueData, productData, regionData, transactions, calculateCAC, calculateCLV } from "@/services/mockData";
import { motion } from "framer-motion";

export default function SalesDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const cac = calculateCAC();
  const clv = calculateCLV();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sales Analytics Dashboard</h2>
            <p className="text-muted-foreground mt-1">Real-time sales analytics and performance insights</p>
          </div>
          <div className="flex items-center gap-2">
            <DateRangePicker />
            <Badge variant="outline" className="text-sm h-10 px-4 flex items-center">Last 30 days</Badge>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div variants={item}>
            <MetricCard
              title="Total Revenue"
              value="$571.4K"
              change={7.59}
              changeLabel="vs last month"
              icon={DollarSign}
            />
          </motion.div>
          <motion.div variants={item}>
            <MetricCard
              title="Total Sales"
              value="10,281"
              change={3.18}
              changeLabel="vs last month"
              icon={ShoppingCart}
            />
          </motion.div>
          <motion.div variants={item}>
            <MetricCard
              title="Conversion Rate"
              value="16.7%"
              change={0.05}
              changeLabel="vs last month"
              icon={TrendingUp}
            />
          </motion.div>
          <motion.div variants={item}>
            <MetricCard
              title="New Customers"
              value="1,516"
              change={17.90}
              changeLabel="vs last month"
              icon={Users}
            />
          </motion.div>
          <motion.div variants={item}>
            <MetricCard
              title="CAC (Avg)"
              value={`$${cac.toFixed(2)}`}
              change={-2.5}
              changeLabel="vs last month"
              icon={CreditCard}
            />
          </motion.div>
          <motion.div variants={item}>
            <MetricCard
              title="CLV (Est)"
              value={`$${(clv / 1000).toFixed(1)}k`}
              change={5.2}
              changeLabel="vs last year"
              icon={Activity}
            />
          </motion.div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <p className="text-sm text-muted-foreground">Monthly revenue vs target</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorActual)"
                    strokeWidth={2}
                    name="Actual"
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="hsl(var(--muted-foreground))"
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </AreaChart>
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
                      <td className="py-3 px-4">{transaction.customerName}</td>
                      <td className="py-3 px-4">{transaction.product}</td>
                      <td className="py-3 px-4 font-semibold">${transaction.amount.toLocaleString()}</td>
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
    </PageTransition>
  );
}
