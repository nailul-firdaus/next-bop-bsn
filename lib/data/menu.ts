import {
  Activity,
  Database,
  FileWarning,
  HelpCircle,
  Landmark,
  Pen,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

export const sidebarMenu = {
  navMain: [
    {
      title: "Bussiness Settings",
      url: "#",
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: "Bank Manager",
          url: "#",
        },
        {
          title: "Biller Manager",
          url: "#",
        },
        {
          title: "Biller Categories",
          url: "#",
        },
        {
          title: "Merchants",
          url: "#",
        },
        {
          title: "Branches",
          url: "#",
        },
        {
          title: "BSN Informations",
          url: "#",
        },
        {
          title: "BSN Promotions",
          url: "#",
        },
        {
          title: "Family Limits",
          url: "#",
        },
        {
          title: "Card Settings",
          url: "#",
        },
        {
          title: "General Parameters",
          url: "#",
        },
        {
          title: "Blast Notifications",
          url: "#",
        },
        {
          title: "User Management",
          url: "#",
        },
      ],
    },
    {
      title: "Authorization",
      url: "#",
      isActive: false,
      icon: ShieldCheck,
      items: [
        {
          title: "User Settings",
          url: "#",
        },
        {
          title: "User Approval",
          url: "#",
        },
        {
          title: "Approval Config",
          url: "#",
        },
        {
          title: "Promo Approval",
          url: "#",
        },
        {
          title: "Info Approval",
          url: "#",
        },
        {
          title: "Role Approval",
          url: "#",
        },
        {
          title: "Blacklist & Passwords",
          url: "#",
        },
      ],
    },
    {
      title: "Monitoring & Reports",
      url: "#",
      isActive: false,
      icon: Activity,
      items: [
        {
          title: "Transaction Statistics",
          url: "#",
        },
        {
          title: "Customer Activity",
          url: "#",
        },
        {
          title: "Activation & Deactivation",
          url: "#",
        },
        {
          title: "Registration Reports",
          url: "#",
        },
        {
          title: "Password Settings",
          url: "#",
        },
        {
          title: "Blocklist",
          url: "#",
        },
        {
          title: "Blast Notifications",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Promo Monitoring",
          url: "#",
        },
        {
          title: "Info Monitoring",
          url: "#",
        },
        {
          title: "Remaining Promos",
          url: "#",
        },
        {
          title: "MID API Connection Status",
          url: "#",
        },
        {
          title: "OTP Monitoring",
          url: "#",
        },
      ],
    },
    {
      title: "M-Banking Settings",
      url: "#",
      isActive: false,
      icon: SlidersHorizontal,
      items: [
        {
          title: "Block Customer Account",
          url: "#",
        },
        {
          title: "Unblock Customer Account",
          url: "#",
        },
        {
          title: "Customer M-Banking Registration",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Database,
    },
    {
      name: "Reports",
      url: "#",
      icon: FileWarning,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: Pen,
    },
  ],
};
