import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useSaveContext } from "../..//clientapp/SaveContext/SaveContext";
import { currencyFormat } from "../..//clientapp/utilities/utillities";
import { fontGrid } from "@mui/material/styles/cssUtils";

export default function CartSummary() {
  const { Cart } = useSaveContext();
  const itemtotal =
    Cart?.cartItems.reduce(
      (total, items) => total + items.purchasedQuantity * items.price,
      0
    ) ?? 0;
  const deliveryCharges = itemtotal > 50000 ? 0 : 500;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Item Total</TableCell>
              <TableCell align="right">{currencyFormat(itemtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery Charges*</TableCell>
              <TableCell align="right">
                {currencyFormat(deliveryCharges)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Order Total</TableCell>
              <TableCell align="right">
                {currencyFormat(itemtotal + deliveryCharges)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "initial" }}>
                  !Orders above $500 would get zero delivery charges!
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
