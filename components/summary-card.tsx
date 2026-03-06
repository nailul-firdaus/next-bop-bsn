"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { summaryStatistics } from "@/lib/data/statistics";

export default function SummaryCard() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {summaryStatistics.map((summary, index) => {
        const Icon = summary.icon;
        const isUp = summary.trend === "up";

        return (
          <Card
            key={index}
            className="group relative overflow-hidden rounded-3xl border bg-background p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.2 transition-all duration-300"
          >
            <div
              className={cn(
                "absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-30",
                summary.glow,
              )}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {summary.title}
                  </p>
                  <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
                    {summary.value}
                  </h3>
                </div>
                <div
                  className={cn("p-3 rounded-2xl shadow-sm", summary.iconBg)}
                >
                  <Icon
                    className={cn("w-5 h-5", summary.iconColor)}
                    strokeWidth={3}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 border-t pt-4">
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold",
                    isUp
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600",
                  )}
                >
                  {isUp ? (
                    <TrendingUp className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <TrendingDown className="h-4 w-4" strokeWidth={3} />
                  )}
                  {summary.percentage}
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  {summary.insight}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
