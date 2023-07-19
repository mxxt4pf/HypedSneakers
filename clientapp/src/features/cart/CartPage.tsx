import { Typography } from "@mui/material";
import { Cart } from "../../clientapp/model/ShoppingCart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  /*useState for storing our cart and 
  and initialliy it would be null as we are assumign no items added at start*/

  const [buffering, setBuffering] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/ShoppingCart`)

      .then((response) => setCart(response.data))

      .catch((error) => console.log(error))

      .finally(() => setBuffering(false));
  }, []); //empty array as there is no {id}

  if (!cart) {
    return <h2>Cart not present!</h2>;
  } else if (buffering) {
    return <Typography variant="h2"> Buffering is going on!</Typography>;
  } else {
    return <Typography variant="h1">{}</Typography>;
  }
}
