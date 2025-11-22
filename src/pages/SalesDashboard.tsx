import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PageTransition } from "@/components/PageTransition";
import { DateRangePicker } from "@/components/DateRangePicker";
import { revenueData, getAdvancedMetrics } from "@/services/mockData";
import { motion } from "framer-motion";
import { SortableTransactionTable } from "@/components/SortableTransactionTable";
import { AISummary } from "@/components/AISummary";

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

  const metrics = getAdvancedMetrics();

  return (
    <PageTransition>
      <div className="space-y-8">
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

        <AISummary />

        {/* Top Row: Ticker Style Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-3"
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
              title="Win Rate (Lead Conv.)"
              value={`${metrics.leadConversionRate.toFixed(1)}%`}
              change={1.2}
              changeLabel="vs last month"
              icon={TrendingUp}
            />
          </motion.div>
          <motion.div variants={item}>
            <MetricCard
              title="Open Pipeline"
              value={`$${(metrics.openPipeline / 1000).toFixed(1)}k`}
              change={-0.5}
              changeLabel="vs last month"
              icon={Activity}
            />
          </motion.div>
        </motion.div>

        {/* Middle: Sales Velocity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Velocity</CardTitle>
            <p className="text-sm text-muted-foreground">Revenue over Time vs Target</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
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
                  name="Actual Revenue"
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

        {/* Bottom: Sortable Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <p className="text-sm text-muted-foreground">Sortable transaction history</p>
          </CardHeader>
          <CardContent>
            <SortableTransactionTable />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
