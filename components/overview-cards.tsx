"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { CalendarDays, ChevronRight } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

const viewOptions = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
] as const;

type ViewType = (typeof viewOptions)[number]["value"];

export default function OverviewCards() {
  const [activeView, setActiveView] = useState<ViewType>("weekly");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
      <div className="flex flex-row items-center gap-3 w-full lg:w-auto overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
        <span className="pl-2 text-sm font-semibold text-slate-700 shrink-0">
          Shows data:
        </span>
        <Select defaultValue="weekly">
          <SelectTrigger
            className="flex w-26 shrink-0 lg:hidden border-2 border-primary"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <div className="hidden lg:flex bg-muted p-1 sm:h-10 h-8 rounded-lg items-center shrink-0">
          {viewOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              onClick={() => setActiveView(option.value)}
              className={cn(
                "px-4 rounded-md h-8 text-sm font-medium transition-all",
                activeView === option.value
                  ? "bg-primary text-white shadow-sm hover:bg-primary/90 hover:text-white"
                  : "text-muted-foreground hover:text-primary hover:bg-transparent",
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "flex sm:h-10 h-8 ml-auto items-center gap-2 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary px-4 shrink-0",
                !date && "text-muted-foreground",
              )}
            >
              {date?.from ? (
                date.to ? (
                  <>
                    <span className="font-normal hidden xl:inline">
                      {format(date.from, "LLL dd, y")}
                    </span>
                    <span className="font-normal xl:hidden">
                      {format(date.from, "LLL dd")}
                    </span>
                    <ChevronRight className="h-5 w-5" strokeWidth={3} />
                    <span className="font-normal hidden xl:inline">
                      {format(date.to, "LLL dd, y")}
                    </span>
                    <span className="font-normal xl:hidden">
                      {format(date.to, "LLL dd")}
                    </span>
                  </>
                ) : (
                  <span className="font-normal">
                    {format(date.from, "LLL dd, y")}
                  </span>
                )
              ) : (
                <>
                  <span className="font-normal hidden xl:inline">
                    Start Date
                  </span>
                  <span className="font-normal xl:hidden">Start</span>
                  <ChevronRight className="h-5 w-5" strokeWidth={3} />
                  <span className="font-normal hidden xl:inline">End Date</span>
                  <span className="font-normal xl:hidden">End</span>
                </>
              )}
              <CalendarDays className="ml-1 h-5 w-5" strokeWidth={3} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={(currentDate) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(today.getMonth() - 6);
                sixMonthsAgo.setHours(0, 0, 0, 0);

                if (currentDate > today) return true;

                if (currentDate < sixMonthsAgo) return true;

                if (date?.from && !date?.to) {
                  const diffTime = Math.abs(
                    currentDate.getTime() - date.from.getTime(),
                  );
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  if (diffDays > 30) return true;
                }

                return false;
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button className="w-full lg:w-auto lg:ml-auto h-10 rounded-lg bg-primary px-6 font-semibold text-white hover:bg-primary/90 shrink-0">
        Apply
      </Button>
    </div>
  );
}
