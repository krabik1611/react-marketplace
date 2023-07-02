import { AppDispatch, RootState } from "../../store";
import { fetchProducts } from "../../saga/actions/product/fetchProducts";
import { IQuery } from "../../model/queryTypes";
import { connect } from "react-redux";
import { useEffect } from "react";
import { ProductCard } from "../Card/ProductCard";

interface IProductContainerProps {
  get: (params?: IQuery) => void;
  products: RootState["product"]["products"];
  loading: boolean;
  error: string;
}

const ProductContainer = (props: IProductContainerProps) => {
  const { get } = props;
  useEffect(() => {
    get();
  }, [get]);
  return (
    <div className={"product-container"}>
      {props.products.map((product, key) => (
        <ProductCard key={key} {...product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    products: state.product.products,
    loading: state.product.loading,
    error: state.product.error,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    get: (params?: IQuery) => dispatch(fetchProducts(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
