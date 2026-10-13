import { NavItem, PropertyItem, QuickAccessItem, UserProfile } from "./types";

export const currentUser: UserProfile = {
  name: "Anisa Rahma",
  role: "Customer",
  avatarLetter: "A",
  email: "anisa.rahma@example.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
};

export const customerNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    iconName: "Home",
    href: "/dashboard/customer",
  },
  {
    id: "discover",
    label: "Discover",
    iconName: "Compass",
    href: "/dashboard/customer/discover",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    iconName: "Sparkles",
    href: "/dashboard/customer/ai-assistant",
  },
  {
    id: "saved",
    label: "Saved",
    iconName: "Bookmark",
    href: "/dashboard/customer/saved",
    badge: 12,
  },
  {
    id: "site-visits",
    label: "Site Visits",
    iconName: "Calendar",
    href: "/dashboard/customer/site-visits",
    badge: 3,
  },
  {
    id: "messages",
    label: "Messages",
    iconName: "MessageSquare",
    href: "/dashboard/customer/messages",
    badge: 5,
  },
  {
    id: "transactions",
    label: "Transactions",
    iconName: "ArrowLeftRight",
    href: "/dashboard/customer/transactions",
  },
  {
    id: "services",
    label: "Services",
    iconName: "Wrench",
    href: "/dashboard/customer/services",
  },
  {
    id: "notifications",
    label: "Notifications",
    iconName: "Bell",
    href: "/dashboard/customer/notifications",
    badge: 2,
  },
  {
    id: "settings",
    label: "Profile & Settings",
    iconName: "UserCog",
    href: "/dashboard/customer/settings",
  },
];

export const quickAccessItems: QuickAccessItem[] = [
  {
    id: "saved",
    title: "Saved",
    subtitle: "12 properties",
    count: 12,
    iconName: "bookmark",
    href: "/dashboard/customer/saved",
  },
  {
    id: "site-visits",
    title: "Site Visits",
    subtitle: "3 upcoming",
    count: 3,
    iconName: "calendar",
    href: "/dashboard/customer/site-visits",
  },
  {
    id: "messages",
    title: "Messages",
    subtitle: "5 unread",
    count: 5,
    iconName: "message",
    href: "/dashboard/customer/messages",
  },
  {
    id: "activity",
    title: "Activity",
    subtitle: "24 this week",
    count: 24,
    iconName: "activity",
    href: "/dashboard/customer/notifications",
  },
];

export const recommendedProperties: PropertyItem[] = [
  {
    id: "rec-1",
    title: "Modern Villa with Ocean View",
    location: "Jimbaran, Denpasar",
    price: "IDR 4,500,000,000",
    beds: 4,
    baths: 3,
    area: "220 m²",
    type: "Residential",
    tag: "For Sale",
    isFeatured: true,
    isSaved: true,
    image: "/images/dashboard/customer/home/homeImg1.png",
    description:
      "Perched on Jimbaran cliffside with panoramic ocean views, private infinity pool, fully furnished minimalist Scandinavian interior, and smart home automation system.",
    agent: {
      name: "Budi Santoso",
      phone: "+62 811-987-6543",
      avatar: "B",
      verified: true,
    },
  },
  {
    id: "rec-2",
    title: "Cozy Apartment in Business District",
    location: "SCBD, Jakarta Selatan",
    price: "IDR 850,000,000",
    beds: 2,
    baths: 2,
    area: "85 m²",
    type: "Residential",
    tag: "For Sale",
    isFeatured: false,
    isSaved: false,
    image: "/images/dashboard/customer/home/homeImg2.png",
    description:
      "Executive suite within walking distance to Pacific Place & MRT Station. Features floor-to-ceiling skyline windows, premium Italian kitchen, and olympic swimming pool.",
    agent: {
      name: "Siti Rahayu",
      phone: "+62 813-234-5678",
      avatar: "S",
      verified: true,
    },
  },
  {
    id: "rec-3",
    title: "Spacious Family House with Garden",
    location: "Dago, Bandung",
    price: "IDR 12,000,000 / mo",
    beds: 3,
    baths: 2,
    area: "160 m²",
    type: "Residential",
    tag: "For Rent",
    isFeatured: false,
    isSaved: true,
    image: "/images/dashboard/customer/home/homeImg3.png",
    description:
      "Serene family haven nestled in cool mountain air of Dago. Features landscaped lawn garden, children playground, open terrace, and 24/7 gated security cluster.",
    agent: {
      name: "Dimas Pratama",
      phone: "+62 818-765-4321",
      avatar: "D",
      verified: true,
    },
  },
];

export const searchPills = [
  "Villa in Bali",
  "2BR Apartment Jakarta",
  "Office space Surabaya",
];
