export enum BikeCategory {
  ELECTRIC = 'Electric',
  MOUNTAIN = 'Mountain',
  ROAD = 'Road',
  CITY = 'City'
}

export interface Bike {
  id: string;
  name: string;
  price: number;
  category: BikeCategory;
  image: string;
  stock: number;
  description: string;
  specs: string[];
  weight?: string;
  frameSize?: string;
}

export interface CartItem extends Bike {
  quantity: number;
}

export interface SalesData {
  name: string;
  sales: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  items: CartItem[];
  total: number;
}