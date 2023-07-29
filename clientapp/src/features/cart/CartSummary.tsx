import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
} from "@mui/material";
import { useSaveContext } from "../..//clientapp/SaveContext/SaveContext";
import { rateIndent } from "../..//clientapp/utilities/utillities";
import { fontGrid } from "@mui/material/styles/cssUtils";

export default function CartSummary() {
  const { Cart } = useSaveContext();

  const itemtotal =
    Cart?.cartItems.reduce(
      (total, items) => total + items.price * items.purchasedQuantity,

      0
    ) ?? 0;

  const deliveryCharges = itemtotal > 50000 ? 0 : 500;

  return (
    <>
      <TableContainer component={Card} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4}>Item Total</TableCell>
              <TableCell align="right">{rateIndent(itemtotal)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4}>Delivery Charges*</TableCell>
              <TableCell align="right">{rateIndent(deliveryCharges)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4}>Order Total</TableCell>
              <TableCell align="right">
                {rateIndent(itemtotal + deliveryCharges)}
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
