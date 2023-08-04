import axios from "axios";
import { Order, OrderData, Product } from "../components/interfaces";

const INPIPELINE_URL = "/api/orders/inpipeline";

const getInPipelineData = async () => {
  const orderData: OrderData = {
    Queued: [],
    InProgress: [],
    QA: [],
  };
  let errorOccured = false;
  try {
    const response = await axios.get(INPIPELINE_URL);
    if (response?.status === 200) {
      const { data } = response.data;
      data.forEach((order: Order) => {
        orderData[order.OrderStatus as keyof OrderData].push(order);
      });
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
    errorOccured = true;
  }
  return { orderData, errorOccured };
};

const UPDATE_STATUS_URL = "/api/orders/update_status";

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
  const updatedOrder = { ...order, OrderStatus: newOrderStatus };
  let orderStatusUpdated = false;
  try {
    const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
    if (response?.status === 200) orderStatusUpdated = true;
    else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
  }
  return orderStatusUpdated;
};

const GET_PRODUCTS_URL = "/api/products/";

const getProductsData = async () => {
  let productsData: Product[] = [];
  try {
    const response = await axios.get(GET_PRODUCTS_URL);
    if (response.status === 200) {
      const { data } = response.data;
      productsData = data as Product[];
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
  }
  return productsData;
};

export {
  getInPipelineData,
  INPIPELINE_URL,
  updateOrderStatus,
  UPDATE_STATUS_URL,
  getProductsData,
  GET_PRODUCTS_URL,
};
