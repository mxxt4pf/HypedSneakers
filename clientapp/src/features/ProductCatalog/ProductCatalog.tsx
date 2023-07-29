import { Fragment, useEffect, useState } from "react";
import { Product } from "../../clientapp/model/Product";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ItemList from "./ItemList";
import axios from "axios";
import axiosAPI from "../../clientapp/clientAPI/Axios";
import { error } from "console";

//remove props if in refactoring for destructuring products,addproducts
export default function ProductCatalog() {
  /*
  built array by states functionality of React Hooks
  */
  const [products, setProducts] = useState<Product[]>([]);
  const [buffering, setBuffering] = useState(true);

  /*
    call back function and then the dependencies(empty array) 
    as the second parameter for preventing it to go into infinite loop,
    getting body of response into json object and 
    getting data back in reponse from api 
    and using use state for updating component to rerender
   */
  useEffect(() => {
    axiosAPI.ProductCatalog.productList()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setBuffering(false));
  }, []);

  return (
    <>
      <ItemList products={products} />
    </>
  );
}
