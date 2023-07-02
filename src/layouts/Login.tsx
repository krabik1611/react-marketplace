import { Form, Input } from "antd";
import { Logo } from "../components/Logo";
import { useDispatch } from "react-redux";
import { login } from "../saga/actions/user/login";

export const Login = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    if (values.username && values.password) dispatch(login(values));
  };
  return (
    <div className={"login_wrapper"}>
      <div className={"login-form"}>
        <Logo />
        <Form
          onFinish={onFinish}
          onFinishFailed={(e) => console.log(e)}
          layout={"vertical"}
        >
          <Form.Item
            name={"username"}
            label={<span className={"form-label"}>Username</span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={<span className={"form-label"}>Password</span>}
          >
            <Input.Password />
          </Form.Item>
          <button className={"login-button"}>Login</button>
        </Form>
      </div>
    </div>
  );
};
