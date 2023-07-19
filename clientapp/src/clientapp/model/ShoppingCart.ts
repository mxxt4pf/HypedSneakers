export interface Cart {
  id: number;
  userId: string;
  cartItems: CartItem[];
}

export interface CartItem {
  itemId: number;
  name: string;
  brand: string;
  type: string;
  price: number;
  imageUrl: string;
  purchasedQuantity: number;
}
