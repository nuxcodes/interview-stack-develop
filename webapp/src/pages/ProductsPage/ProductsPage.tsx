import { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import { getProductsData } from "../ApiHelper";
import { Product } from "../../components/interfaces";
import Spinner from "../../components/Spinner/Spinner";

const DATA_STATES = {
  waiting: "WAITING",
  loaded: "LOADED",
  error: "ERROR",
};

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState<Product[]>([]);
  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productsData, errorOccured } = await getProductsData();
    setData(productsData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getProducts();
  }, []);

  let content;

  content =
    loadingState === DATA_STATES.waiting ? (
      <div
        className="flex flex-row justify-center w-full pt-10"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    ) : loadingState === DATA_STATES.error ? (
      <div
        className="flex flex-row justify-center w-full pt-10 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    ) : (
      <div
        className="container my-10 grid w-full gap-8 md:grid-cols-[repeat(auto-fill,_minmax(14rem,1fr))]"
        data-testid="product-container"
      >
        {data
          .filter((product) => product.ProductStatus === "Active")
          .map((product) => (
            <div
              key={product.ProductID}
              data-testid="product-item"
              className="text-white group flex w-full flex-col items-start justify-start gap-5 transition-transform duration-150 ease-in hover:translate-y-[-0.5rem]"
            >
              <div className="relative h-[20rem] md:h-[12rem] w-full overflow-clip rounded-lg transition-shadow duration-150 ease-in group-hover:shadow-xl group-hover:shadow-zinc-800 ">
                <img
                  src={product.ProductPhotoURL}
                  alt={product.ProductName}
                  className="w-full h-full object-cover"
                ></img>
              </div>
              <span className="text-lg md:text-base font-semibold">
                {product.ProductName}
              </span>
            </div>
          ))}
      </div>
    );

  return <PageWrapper>{content}</PageWrapper>;
};

export default ProductsPage;
