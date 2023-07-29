import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from "@mui/material";
import { Product } from "../../clientapp/model/Product";
import ItemCard from "./ItemCard";

interface Props {
  products: Product[];
}

export default function ItemList({ products }: Props) {
  return (
    //theme spacing material UI
    <Grid container spacing={4}>
      {products.map((product) => (
        //setting number of columns
        <Grid item xs={3} key={product.id}>
          <ItemCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
