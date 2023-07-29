import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cart } from "../model/ShoppingCart";

interface SaveContextValue {
  Cart: Cart | null;
  setCart: (Cart: Cart) => void;
  removeItem: (itemId: number, purchasedQuantity: number) => void;
}

export const SaveContext = createContext<SaveContextValue | undefined>(
  undefined
);

export function useSaveContext() {
  let cont = useContext(SaveContext);

  if (cont === undefined) {
    throw Error("Save Context Error!");
  }

  return cont;
}

export function SaveContextProvider({ children }: PropsWithChildren<any>) {
  const [Cart, setCart] = useState<Cart | null>(null);

  function removeItem(itemId: number, purchasedQuantity: number) {
    if (!Cart) return;
    const items = [...Cart.cartItems]; // new array of items
    const itemIndex = items.findIndex((i) => i.itemId === itemId);
    if (itemIndex >= 0) {
      items[itemIndex].purchasedQuantity -= purchasedQuantity;
      if (items[itemIndex].purchasedQuantity === 0) items.splice(itemIndex, 1);
      setCart((prevState) => {
        return { ...prevState!, items };
      });
    }
  }

  return (
    <SaveContext.Provider value={{ Cart, setCart, removeItem }}>
      {children}
    </SaveContext.Provider>
  );
}
