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
} from "@mui/material";
import { Product } from "../../clientapp/model/Product";
import { Link } from "react-router-dom";
import ProductCatalog from "./ProductCatalog";
import ItemInfo from "./ItemInfo";

interface Props {
  product: Product;
}

export default function ItemCard({ product }: Props) {
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
        <Button size="medium">Add Item</Button>
        <Button
          size="medium"
          component={Link}
          to={`/productcatalog/${product.id}`} //Item details baseed on item id
        >
          Preview
        </Button>
      </CardActions>
    </Card>
  );
}
