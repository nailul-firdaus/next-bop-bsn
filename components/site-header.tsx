"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, RefreshCw, Search } from "lucide-react";
import { HeaderUser } from "./header-user";
import { user } from "@/lib/data/user";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function SiteHeader() {
  const [isSynchronizing, setIsSynchronizing] = useState<boolean>(false);

  const handleSynchronize = () => {
    if (isSynchronizing) return;

    setIsSynchronizing(true);

    setTimeout(() => {
      setIsSynchronizing(false);
    }, 3000);
  };

  return (
    <header className="flex h-auto min-h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-auto">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center gap-1 px-4 py-4 lg:gap-2 lg:px-6">
          <Button
            size="sm"
            className={cn(
              "text-primary bg-background hover:bg-primary/25 border-2 border-primary",
              isSynchronizing
                ? "animate-pulse bg-primary/5 cursor-not-allowed"
                : "hover:bg-primary/25",
            )}
            onClick={handleSynchronize}
            disabled={isSynchronizing}
          >
            <RefreshCw
              className={cn(isSynchronizing && "animate-spin")}
              strokeWidth={3}
            />
            <span>{isSynchronizing ? "Synchronizing..." : "Synchronize"}</span>
          </Button>
          <div className="ml-auto flex items-center gap-4">
            <Bell className="text-primary w-4 h-4" strokeWidth={3} />
            <RefreshCw className="text-primary w-4 h-4" strokeWidth={3} />
            <HeaderUser user={user} />
          </div>
        </div>
        <Separator
          orientation="horizontal"
          className="w-full data-[orientation=horizontal]:h-px"
        />
        <div className="flex w-full items-center gap-1 px-4 py-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Dashboard</h1>
          <div className="ml-auto flex items-center">
            <div className="flex max-w-md w-full">
              <div className="flex w-full items-stretch drop-shadow-sm">
                <Select defaultValue="transaction_id">
                  <SelectTrigger className="w-38 h-11 rounded-lg rounded-r-none border-0 bg-primary text-background hover:bg-primary/90 focus:ring-0 focus:ring-offset-0 focus:bg-primary font-medium [&>svg]:text-background! [&>svg]:opacity-100! [&_svg]:stroke-[3px]!">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="transaction_id">
                        Transaction Id
                      </SelectItem>
                      <SelectItem value="customer_name">
                        Customer Name
                      </SelectItem>
                      <SelectItem value="account_number">
                        Account Number
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="hidden relative sm:flex flex-1">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="h-9 w-full rounded-lg rounded-l-none border-l-0 bg-background pl-4 pr-11 text-base placeholder:text-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-offset-0"
                  />
                  <Search
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/30"
                    strokeWidth={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex md:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                  >
                    <Search strokeWidth={3} className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-6 top-[20%] translate-y-0">
                  <DialogHeader>
                    <DialogTitle className="mb-2">Search Records</DialogTitle>
                  </DialogHeader>
                  <div className="flex w-full items-stretch drop-shadow-sm">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        placeholder="Search..."
                        className="h-11 w-full rounded-lg bg-background text-base focus-visible:ring-1 focus-visible:ring-offset-0"
                      />
                      <Search
                        className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/50"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
