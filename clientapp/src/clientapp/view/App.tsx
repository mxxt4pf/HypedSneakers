import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import ProductCatalog from "../../features/ProductCatalog/ProductCatalog";

function App() {
  /*
  built array by states functionality of React Hooks
  */
  const [products, setProducts] = useState<Product[]>([]);

  /*
    call back function and then the dependencies(empty array) 
    as the second parameter for preventing it to go into infinite loop,
    getting body of response into json object and 
    getting data back in reponse from api 
    and using use state for updating component to rerender
   */
  useEffect(() => {
    fetch("http://localhost:5000/api/products").then((response) =>
      response.json().then((data) => setProducts(data))
    );
  }, []);
  /*
   method for adding products 
   */
  function addProducts() {
    setProducts((prevState) => [
      ...products,
      {
        id: prevState.length + 1,
        name: "product" + (prevState.length + 1),
        //type:,
        brand: "xyz brand",
        description: "xyz description",
        price: prevState.length * 100 + 99.99,
        imageUrl: "http:/xyz/500",
        //quantityInStock:
      },
    ]);
  }

  return (
    <div className="app">
      <h1>HypedSneakers</h1>
      <ProductCatalog products={products} addProducts={addProducts} />
    </div>
  );
}

export default App;
