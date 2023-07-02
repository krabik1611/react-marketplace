import ProductContainer from "../components/containers/ProductContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCarts } from "../saga/actions/cart/fetchCarts";
import Header from "../components/Header/Header";

export const Marketplace = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);
  return (
    <div>
      <Header />
      <ProductContainer />
    </div>
  );
};
