export interface Product {
    id: string;
    name: string;
    description?: string;
    price: string;
    stock: number;
    imageUrl?: string;
  
    category: {
      id: string;
      name: string;
    };
  }