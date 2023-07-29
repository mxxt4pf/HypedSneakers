import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";
import { Product } from "../../clientapp/model/Product";
import { Link } from "react-router-dom";
import ProductCatalog from "./ProductCatalog";
import ItemInfo from "./ItemInfo";
import { AlignHorizontalLeft, ForkLeft } from "@mui/icons-material";
import { useState } from "react";
import axiosAPI from "../../clientapp/clientAPI/Axios";
import { error } from "console";

interface Props {
  product: Product;
}

export default function ItemCard({ product }: Props) {
  const [buffering, SetBuffering] = useState(false);

  function manipulateAddCartItems(itemId: number) {
    SetBuffering(true);
    //no quantity parameter as their is a default value in the base function
    axiosAPI.ShoppingCart.addItem(itemId)
      .catch((error) => console.log(error))
      .finally(() => SetBuffering(false));
  }
  return (
    /*Material UI Card Component for adding every specific item to our Product Catalog 
    sx={{ maxWidth: 345 }}*/
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "pink" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
      ></CardHeader>
      <CardMedia
        sx={{
          backgroundSize: "contain",
          height: 129,
          backgroundColor: "beige",
        }}
        image={product.imageUrl}
        title={product.name}
      ></CardMedia>
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ font: "primary" }}
        >
          ${product.price.toFixed(3)}
        </Typography>

        <Typography
          variant="body1"
          color="text.primary"
          fontFamily={"sans-serif"}
        >
          {product.brand} / {product.type}
        </Typography>
      </CardContent>

      <CardActions>
        <Box display={"flex"} alignItems={"left"}>
          <Button
            onClick={() => manipulateAddCartItems(product.id)}
            size="medium"
          >
            Add Item
          </Button>
        </Box>

        <Box>
          <Button
            size="medium"
            component={Link}
            to={`/productcatalog/${product.id}`} //Item details baseed on item id
          >
            Preview Item
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
