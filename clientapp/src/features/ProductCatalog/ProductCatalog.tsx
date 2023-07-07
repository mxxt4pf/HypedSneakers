import { Fragment } from "react";
import { Product } from "../../clientapp/model/Product";

/*used props as a parameter for type safety as typescript
throws any if not defined as an interface
used interface to specify if properties are required for 
parent components if child missing
*/
interface Props {
  products: Product[];
  addProducts: () => void;
}

export default function ProductCatalog(props: Props) {
  return (
    <Fragment>
      <ul>
        {props.products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <button onClick={props.addProducts}>Add Products</button>
    </Fragment>
  );
}
