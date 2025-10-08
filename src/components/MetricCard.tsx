import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
}

export const MetricCard = ({ title, value, change, changeLabel, icon: Icon }: MetricCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center mt-2 text-xs">
          {isPositive ? (
            <ArrowUp className="h-3 w-3 text-success mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 text-destructive mr-1" />
          )}
          <span className={isPositive ? "text-success" : "text-destructive"}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground ml-1">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};
