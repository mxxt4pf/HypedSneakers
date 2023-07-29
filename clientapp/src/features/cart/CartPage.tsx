import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Cart } from "../../clientapp/model/ShoppingCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Add, Delete, Remove } from "@mui/icons-material";
import axiosAPI from "../../clientapp/clientAPI/Axios";
import { useSaveContext } from "../../clientapp/SaveContext/SaveContext";
import CartSummary from "./CartSummary";
import { NavLink } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CartPage() {
  /*useState for storing our cart and 
  and initialliy it would be null as we are assumign no items added at start*/

  const [buffering, setBuffering] = useState(true);

  const { Cart, setCart, removeItem } = useSaveContext();

  const [status, setStatus] = useState({
    loading: false,

    name: "",
  });

  useEffect(() => {
    axiosAPI.ShoppingCart.get()

      .then((response) => setCart(response.data))

      .catch((error) => console.log(error))

      .finally(() => setBuffering(false));
  }, []); //empty array as there is no {id}

  if (buffering)
    return <Typography variant="h2"> Buffering is going on!</Typography>;

  function manipulateAddCartItem(itemId: number, name: string) {
    setStatus({ loading: true, name });

    axiosAPI.ShoppingCart.addItem(itemId)

      .then((Cart) => setCart(Cart))

      .catch((error) => console.log(error))

      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function manipulateRemoveItem(itemId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });

    axiosAPI.ShoppingCart.deleteItem(itemId, quantity)

      .then(() => removeItem(itemId, quantity))

      .catch((error: any) => console.log(error))

      .finally(() => setStatus({ loading: false, name: "" }));
  }

  if (!Cart) return <h2>You donot have items in your cart</h2>;

  return (
    <>
      <TableContainer component={Card}>
        <Table sx={{ minWidth: 850, borderColor: "white", borderWidth: "5" }}>
          <TableHead sx={{ bgcolor: "gray" }}>
            <TableRow>
              <StyledTableCell>Purchased Item</StyledTableCell>

              <StyledTableCell align="center">Price</StyledTableCell>

              <StyledTableCell align="center">Quantity</StyledTableCell>

              <StyledTableCell align="center">Total</StyledTableCell>

              <StyledTableCell align="center">
                Delete Purchased Items?
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ bgcolor: "lightblue" }}>
            {Cart.cartItems.map((items) => (
              <TableRow
                key={items.itemId}
                sx={{ "&:last-child td, &:last-child th": {} }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      style={{ height: 45, marginRight: 25 }}
                      src={items.imageUrl}
                      alt={items.name}
                    />
                    <span>{items.name}</span>
                  </Box>
                </TableCell>

                <TableCell align="right">${items.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      manipulateRemoveItem(
                        items.itemId,
                        1,
                        "rem" + items.itemId
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </Button>
                  {items.purchasedQuantity}
                  <Button
                    onClick={() =>
                      manipulateAddCartItem(items.itemId, "add" + items.itemId)
                    }
                    color="secondary"
                  >
                    <Add />
                  </Button>
                </TableCell>

                <TableCell align="center">
                  ${(items.price / 100) * items.purchasedQuantity}
                </TableCell>

                <TableCell align="center">
                  <Button
                    onClick={() =>
                      manipulateRemoveItem(
                        items.itemId,
                        items.purchasedQuantity,
                        "del" + items.itemId
                      )
                    }
                    color="error"
                  >
                    <Delete></Delete>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <CartSummary />
          <Button
            component={NavLink}
            to="/checkoutpage"
            fullWidth
            variant="contained"
            size="small"
            sx={{ bgcolor: "pink" }}
          >
            Proceed to Checkout!
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
