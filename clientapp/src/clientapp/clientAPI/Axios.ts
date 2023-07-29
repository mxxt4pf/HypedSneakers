import axios, { Axios, AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

//creating helper method to extract the data from the body element
const apiResponse = (responseParam: AxiosResponse) => responseParam.data;

const apiRequest = {
  //extracting data out of api response
  get: (requestURL: string) => axios.get(requestURL).then(apiResponse),
  //creating a resource on the server , struct typically used for creating api data
  post: (requestURL: string, struct: {}) =>
    axios.post(requestURL, struct).then(apiResponse),
  //for updating the data out of api
  put: (requestURL: string, struct: {}) =>
    axios.put(requestURL, struct).then(apiResponse),
  //for deleting a resource on the server
  delete: (requestURL: string) => axios.delete(requestURL).then(apiResponse),
};

//storing request for prodcut catalog
const ProductCatalog = {
  productList: () => apiRequest.get(`products`),
  productInfo: (id: number) => apiRequest.get(`products/${id}`),
};

const ShoppingCart = {
  get: () => apiRequest.get(`shoppingcart`),
  //creating or adding cart items
  //empty object to go with a post request
  addItem: (itemId: number, quantity = 1) =>
    apiRequest.post(`shoppingcart?itemId=${itemId}&quantity=${quantity}`, {}),
  //deleting cart items, no empty {} object in this case as we can't delete null
  deleteItem: (itemId: number, quantity = 1) =>
    apiRequest.delete(`shoppingcart?itemId=${itemId}&quantity=${quantity}`),
};

const axiosAPI = {
  ProductCatalog,
  ShoppingCart,
};

export default axiosAPI;
