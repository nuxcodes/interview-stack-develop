import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { getProductsData } from "../ApiHelper";
import { Product } from "../../components/interfaces";

const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const getProducts = async () => {
    const productsData = await getProductsData();
    setData(productsData);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageWrapper>
      {data
        .filter((product) => product.ProductStatus === "Active")
        .map((product) => (
          <div key={product.ProductID}>{product.ProductName}</div>
        ))}
    </PageWrapper>
  );
};

export default ProductsPage;
