export interface Product {
  //Specifying the Product properties (JSON to TS interface)
  id: number;
  name: string;
  type?: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  quantityInStock?: number;
}

export interface ItemParams {
  orderBy: string;
  searchFilter?: string;
  types: string[];
  brands: string[];
  pageOrder: number;
  pageLength: number;
}
