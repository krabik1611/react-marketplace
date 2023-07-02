import { RootState } from "../../store";
import { connect } from "react-redux";
import { Logo } from "../Logo";

interface IHeaderProps {
  user: RootState["user"]["user"];
  cart: RootState["cart"]["cart"];
}

const Header = (props: IHeaderProps) => {
  return (
    <div className={"header_wrapper"}>
      <Logo />
      <div className={"name_wrapper"}>
        <div>{props.user && props.user.name.firstname}</div>
        <div>{props.user && props.user.name.lastname}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    cart: state.cart.cart,
  };
};
export default connect(mapStateToProps)(Header);
