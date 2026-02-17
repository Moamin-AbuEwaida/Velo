import { Bike, BikeCategory, SalesData } from './types';

export const INITIAL_BIKES: Bike[] = [
  {
    id: '1',
    name: 'Cannondale Topstone',
    price: 1850,
    category: BikeCategory.ROAD,
    image: 'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 5,
    description: 'Sollicitudin euismod integer condimentum porttitor feugiat. Nascetur proin cursus libero blandit tristique.',
    specs: ['Carbon Frame', '24 Speed', 'Hydraulic Discs'],
    weight: '8.4 kg',
    frameSize: '54cm / Medium'
  },
  {
    id: '2',
    name: 'Turbo Vado SL',
    price: 3500,
    category: BikeCategory.ELECTRIC,
    image: 'https://images.unsplash.com/photo-1523740856324-f2ce89135981?q=80&w=926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 8,
    description: 'Lightweight electric bike designed for the daily commute and weekend fitness.',
    specs: ['320Wh Battery', '120 Miles Range', 'Integrated Lights'],
    weight: '14.9 kg',
    frameSize: 'Large'
  },
  {
    id: '3',
    name: 'Stumpjumper EVO',
    price: 4200,
    category: BikeCategory.MOUNTAIN,
    image: 'https://images.unsplash.com/photo-1583227122027-d2d360c66d3c?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 3,
    description: 'The ultimate trail bike. Adjustable geometry and SWAT door storage.',
    specs: ['Full Suspension', '29" Wheels', 'Carbon Chassis'],
    weight: '13.2 kg',
    frameSize: 'S4 (Large)'
  },
  {
    id: '4',
    name: 'City Cruiser MK1',
    price: 899,
    category: BikeCategory.CITY,
    image: 'https://plus.unsplash.com/premium_photo-1661715303160-9fecfaba31a9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 12,
    description: 'Classic style meets modern reliability. Perfect for coffee runs.',
    specs: ['7 Speed Internal', 'Leather Saddle', 'Front Basket'],
    weight: '11.5 kg',
    frameSize: 'Medium'
  },
  {
    id: '5',
    name: 'Ridgeback Altitude',
    price: 2450,
    category: BikeCategory.MOUNTAIN,
    image: 'https://images.unsplash.com/photo-1578509557315-37510239a203?q=80&w=336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 7,
    description: 'Dominate the peaks with superior traction and stability.',
    specs: ['Hardtail', '27.5" Wheels', 'Aluminum Frame'],
    weight: '12.8 kg',
    frameSize: 'Medium'
  },
  {
    id: '6',
    name: 'Velocipede Racer',
    price: 3100,
    category: BikeCategory.ROAD,
    image: 'https://images.unsplash.com/photo-1582743514780-b381c39ada9f?q=80&w=750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 4,
    description: 'Aerodynamic design for speed enthusiasts. Cut through the wind.',
    specs: ['Aero Bars', '11 Speed', 'Ultra Light'],
    weight: '7.2 kg',
    frameSize: '56cm / Large'
  },
  {
    id: '7',
    name: 'Urban Glide',
    price: 650,
    category: BikeCategory.CITY,
    image: 'https://images.unsplash.com/photo-1666360058702-a3aa07227c53?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 15,
    description: 'Minimalist design for the modern urbanite. Low maintenance.',
    specs: ['Single Speed', 'Coaster Brake', 'Steel Frame'],
    weight: '10.2 kg',
    frameSize: 'Small'
  },
  {
    id: '8',
    name: 'Volt Runner',
    price: 2899,
    category: BikeCategory.ELECTRIC,
    image: 'https://images.unsplash.com/photo-1625090666340-eea129f52a50?q=80&w=1445&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 6,
    description: 'Speed and endurance combined. The future of commuting is here.',
    specs: ['500W Motor', 'Fast Charging', 'LCD Display'],
    weight: '16.5 kg',
    frameSize: 'Medium'
  },
  {
    id: '9',
    name: 'Gravel King',
    price: 2100,
    category: BikeCategory.ROAD,
    image: 'https://images.unsplash.com/photo-1673969539424-23f163191b1e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 9,
    description: 'Versatile geometry for both pavement and dirt paths.',
    specs: ['Wide Clearance', 'Disc Brakes', 'Endurance Geo'],
    weight: '9.1 kg',
    frameSize: '58cm / XL'
  },
  {
    id: '10',
    name: 'Metro Commuter',
    price: 1200,
    category: BikeCategory.CITY,
    image: 'https://images.unsplash.com/photo-1724017482078-d1de1947eba5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 10,
    description: 'Practicality first. Fenders, racks, and lights included.',
    specs: ['Rear Rack', 'Dynamo Lights', 'Kickstand'],
    weight: '12.0 kg',
    frameSize: 'Medium'
  },
  {
    id: '11',
    name: 'Peak Conqueror',
    price: 5500,
    category: BikeCategory.MOUNTAIN,
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 2,
    description: 'Pro-level downhill performance. Nothing stands in your way.',
    specs: ['Dual Crown Fork', 'Coil Shock', 'Reinforced Frame'],
    weight: '15.5 kg',
    frameSize: 'Large'
  },
  {
    id: '12',
    name: 'E-Stream EVO',
    price: 4100,
    category: BikeCategory.ELECTRIC,
    image: 'https://images.unsplash.com/photo-1605132451974-2a8d89c0e69b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 5,
    description: 'Sporty electric mountain bike for extended trail sessions.',
    specs: ['750Wh Battery', 'High Torque', 'Smart Connectivity'],
    weight: '21.0 kg',
    frameSize: 'Medium'
  }
];

export const MOCK_SALES_DATA: SalesData[] = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];