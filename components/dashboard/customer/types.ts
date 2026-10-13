export interface NavItem {
  id: string;
  label: string;
  iconName: string;
  href: string;
  badge?: number;
}

export interface PropertyItem {
  id: string;
  title: string;
  location: string;
  price: string;
  priceNote?: string;
  beds: number;
  baths: number;
  area: string;
  type: string;
  tag: "For Sale" | "For Rent";
  isFeatured?: boolean;
  isSaved?: boolean;
  image: string;
  description?: string;
  agent?: {
    name: string;
    phone: string;
    avatar: string;
    verified: boolean;
  };
}

export interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  count: number | string;
  iconName: "bookmark" | "calendar" | "message" | "activity";
  href: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatarLetter: string;
  email: string;
  phone: string;
  location: string;
}
