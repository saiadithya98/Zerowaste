
export type DonationStatus = "fresh" | "expiring_soon" | "expired";
export type FoodType = "veg" | "non_veg";

export interface Donation {
  id: string;
  title: string;
  description: string;
  image?: string;
  foodType: FoodType;
  quantity: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  status: DonationStatus;
  expiryTime: string;
  pickupWindow: string;
  donorId: string;
  donorName: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "donor" | "receiver" | "admin";
  organization?: string;
  verified: boolean;
  createdAt: string;
}
