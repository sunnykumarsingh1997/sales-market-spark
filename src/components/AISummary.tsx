import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AISummary() {
    return (
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
            <CardContent className="p-6 flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                    <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1 flex-1">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        AI Insights
                        <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
                            Updated just now
                        </span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Revenue is up <span className="text-foreground font-medium">12%</span> this week driven by strong performance in the <span className="text-foreground font-medium">North Region</span>.
                        Customer churn has decreased by <span className="text-foreground font-medium">2%</span> following the new retention campaign.
                    </p>
                </div>
                <Button variant="outline" size="sm" className="hidden md:flex">
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
}
