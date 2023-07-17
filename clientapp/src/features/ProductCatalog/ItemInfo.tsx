import {
  Divider,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../clientapp/model/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { error } from "console";

export default function ItemInfo() {
  /* always gonna be a string as coming from router */
  const { id } = useParams<{ id: string }>();

  const [item, setItems] = useState<Product | null>(null);

  const [buffering, setBuffering] = useState(true);

  /*api end point for getting individual item so basically fetching from api*/
  /*Including dependencies to avoid endless loop while using useEffect as we're setting Items 
  and buffering (time complexity) and this would be called if the id parameter changes */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)

      .then((response) => setItems(response.data))

      .catch((error) => console.log(error))

      .finally(() => setBuffering(false));
  }, [id]); //here, id would be the dependency

  /*checking if the item is present */
  if (!item) {
    return <Typography variant="h2">Item not present!</Typography>;
  } else if (buffering) {
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
          <Typography variant="h4">{item.name}</Typography>
          <Divider sx={{ marginborder: 0 }}></Divider>
          <Typography variant="h5" sx={{ color: "blue", fontSize: "10" }}>
            ${item.price}
          </Typography>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{item.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type of the Item</TableCell>
                <TableCell>{item.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item Description</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Available Stock</TableCell>
                <TableCell>{item.quantityInStock}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
}
