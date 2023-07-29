import {
  Box,
  Button,
  Divider,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Product } from "../../clientapp/model/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { error } from "console";
import axiosAPI from "../../clientapp/clientAPI/Axios";
import { useSaveContext } from "../../clientapp/SaveContext/SaveContext";

export default function ItemInfo() {
  const { Cart, setCart, removeItem } = useSaveContext();
  /* always gonna be a string as coming from router */
  const { id } = useParams<{ id: string }>();

  const [items, setItems] = useState<Product | null>(null);

  const [buffering, setBuffering] = useState(true);

  const [quantity, setQuantity] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  const item = Cart?.cartItems.find((i) => i.itemId === items?.id);

  /*api end point for getting individual item so basically fetching from api*/
  /*Including dependencies to avoid endless loop while using useEffect as we're setting Items 
  and buffering (time complexity) and this would be called if the id parameter changes */
  useEffect(() => {
    if (item) {
      setQuantity(item.purchasedQuantity);
    }
    //"&&" defensive programming to predeclare id before using it in react 18 because threw the error type undefined while directly doing it
    id &&
      axiosAPI.ProductCatalog.productInfo(parseInt(id))

        .then((response) => setItems(response))

        .catch((error) => console.log(error))

        .finally(() => setBuffering(false));
  }, [id]); //here, id would be the dependency
  function manipulateChangeInput(e: any) {
    if (e.target.value >= 0) setQuantity(parseInt(e.target.value));
  }

  function manipulateCartUpdate() {
    setSubmitting(true);
    if (!item || quantity > item?.purchasedQuantity) {
      const updatedQuantity = item
        ? quantity - item.purchasedQuantity
        : quantity;
      axiosAPI.ShoppingCart.addItem(items?.id!, updatedQuantity)
        .then((Cart) => setCart(Cart))
        .catch((error) => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.purchasedQuantity - quantity;
      axiosAPI.ShoppingCart.deleteItem(item?.itemId!, updatedQuantity)
        .then(() => removeItem(item?.itemId!, updatedQuantity))
        .catch((error: any) => console.log(error))
        .finally(() => setSubmitting(false));
    }
  }

  /*checking if the item is present 
  if (!item) {
    return <Typography variant="h2">Item not present!</Typography>;
  } else */ if (buffering) {
    /*checking if its fetching info on the screen */
    return <Typography variant="h2"> Buffering is taking place</Typography>;
  } else
    return (
      <Grid container spacing={5}>
        <Grid item sm={5}>
          <img
            src={item?.imageUrl}
            alt={item?.name}
            style={{ maxWidth: "99%" }}
          ></img>
        </Grid>
        <Grid item sm={5}>
          <Typography variant="h4">{items?.name}</Typography>
          <Divider sx={{ marginborder: 0 }}></Divider>
          <Typography variant="h5" sx={{ color: "blue", fontSize: "10" }}>
            ${items?.price}
          </Typography>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{items?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{items?.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type of the Item</TableCell>
                <TableCell>{items?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item Description</TableCell>
                <TableCell>{items?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Available Stock</TableCell>
                <TableCell>{items?.quantityInStock}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>

          <Grid container spacing={6}>
            <Grid item xs={5}>
              <Box sx={{ margin: 2 }}>
                <TextField
                  onChange={manipulateChangeInput}
                  variant={"filled"}
                  type={"number"}
                  label={"Quantity in Cart"}
                  fullWidth
                  value={quantity}
                />
              </Box>
            </Grid>

            <Grid item xs={7}>
              <Box sx={{ margin: 2 }}>
                <Button
                  disabled={
                    items?.quantityInStock === quantity ||
                    (!items && quantity === 0)
                  }
                  onClick={manipulateCartUpdate}
                  sx={{ height: "55px" }}
                  color={"primary"}
                  size={"medium"}
                  variant={"contained"}
                  fullWidth
                >
                  {item ? "Update Quantity" : "Add Item to Cart :)"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}
