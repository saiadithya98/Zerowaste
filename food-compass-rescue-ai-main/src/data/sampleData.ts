
import { Donation, User } from "@/types/donations";

export const sampleDonations: Donation[] = [
  {
    id: "1",
    title: "Fresh Vegetables Bundle",
    description: "Assorted vegetables including carrots, broccoli, and bell peppers. Freshly harvested yesterday.",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    foodType: "veg",
    quantity: "5 kg",
    location: {
      lat: 51.505,
      lng: -0.09,
      address: "123 Green St, London"
    },
    status: "fresh",
    expiryTime: "2025-04-14T18:00:00",
    pickupWindow: "Today, 2-6 PM",
    donorId: "user1",
    donorName: "Green Grocers",
    createdAt: "2025-04-12T10:00:00"
  },
  {
    id: "2",
    title: "Leftover Catering Food",
    description: "Mixed food items from corporate event. Includes sandwiches, pasta, and salads.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    foodType: "non_veg",
    quantity: "10 servings",
    location: {
      lat: 51.51,
      lng: -0.1,
      address: "45 Business Park, London"
    },
    status: "expiring_soon",
    expiryTime: "2025-04-13T12:00:00",
    pickupWindow: "Today, 6-8 PM",
    donorId: "user2",
    donorName: "City Catering Co.",
    createdAt: "2025-04-12T08:30:00"
  },
  {
    id: "3",
    title: "Bakery Products",
    description: "Assorted bread, pastries, and cookies from our bakery. All baked this morning.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    foodType: "veg",
    quantity: "20 items",
    location: {
      lat: 51.515,
      lng: -0.08,
      address: "78 Baker Street, London"
    },
    status: "fresh",
    expiryTime: "2025-04-13T20:00:00",
    pickupWindow: "Today, 4-7 PM",
    donorId: "user3",
    donorName: "Daily Bread Bakery",
    createdAt: "2025-04-12T07:00:00"
  },
  {
    id: "4",
    title: "Restaurant Meal Packages",
    description: "Prepared meals including chicken curry, rice, and vegetable sides.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    foodType: "non_veg",
    quantity: "8 meal packages",
    location: {
      lat: 51.52,
      lng: -0.095,
      address: "22 Curry Lane, London"
    },
    status: "expiring_soon",
    expiryTime: "2025-04-13T14:00:00",
    pickupWindow: "Today, 1-3 PM",
    donorId: "user4",
    donorName: "Spice Garden Restaurant",
    createdAt: "2025-04-12T06:15:00"
  },
  {
    id: "5",
    title: "Fruit Basket Surplus",
    description: "Mixed seasonal fruits including apples, oranges, and bananas.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    foodType: "veg",
    quantity: "15 kg",
    location: {
      lat: 51.508,
      lng: -0.11,
      address: "90 Market Street, London"
    },
    status: "fresh",
    expiryTime: "2025-04-15T18:00:00",
    pickupWindow: "Tomorrow, 9 AM-12 PM",
    donorId: "user5",
    donorName: "Fresh Fruits Market",
    createdAt: "2025-04-12T09:45:00"
  }
];

export const sampleUsers: User[] = [
  {
    id: "user1",
    name: "Green Grocers",
    email: "contact@greengrocers.com",
    role: "donor",
    organization: "Green Grocers Ltd",
    verified: true,
    createdAt: "2025-01-15T10:00:00"
  },
  {
    id: "user2",
    name: "City Catering Co.",
    email: "info@citycatering.com",
    role: "donor",
    organization: "City Catering Company",
    verified: true,
    createdAt: "2025-02-10T14:30:00"
  },
  {
    id: "user3",
    name: "Daily Bread Bakery",
    email: "hello@dailybread.com",
    role: "donor",
    organization: "Daily Bread Ltd",
    verified: true,
    createdAt: "2025-01-05T09:15:00"
  },
  {
    id: "user4",
    name: "Spice Garden Restaurant",
    email: "contact@spicegarden.com",
    role: "donor",
    organization: "Spice Garden Ltd",
    verified: true,
    createdAt: "2025-03-01T11:45:00"
  },
  {
    id: "user5",
    name: "Fresh Fruits Market",
    email: "info@freshfruits.com",
    role: "donor",
    organization: "Fresh Fruits Inc",
    verified: true,
    createdAt: "2025-02-20T08:00:00"
  },
  {
    id: "user6",
    name: "Food For All NGO",
    email: "help@foodforall.org",
    role: "receiver",
    organization: "Food For All Charity",
    verified: true,
    createdAt: "2025-01-10T10:30:00"
  },
  {
    id: "user7",
    name: "Community Shelter",
    email: "contact@communityshelter.org",
    role: "receiver",
    organization: "Community Shelter Foundation",
    verified: true,
    createdAt: "2025-01-20T13:00:00"
  }
];
