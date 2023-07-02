import { IProduct } from "../../model/productTypes";
import { StarOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ProductCard = (props: IProduct) => {
  return (
    <div className={"product-card"}>
      <div className={"product-card_image_container"}>
        <img
          className={"product-card__image"}
          src={props.image}
          alt={props.title}
        />
      </div>
      <p className={"product-title"}>{props.title}</p>
      <div className={"product-price-rating"}>
        <div className={"product-price"}>{props.price}$</div>
        <div className={"product-rating"}>
          <StarOutlined style={{ color: "var(--status-warning-fill)" }} />{" "}
          {props.rating.rate}
        </div>
      </div>
      <Button type={"primary"}>Add to cart</Button>
    </div>
  );
};
