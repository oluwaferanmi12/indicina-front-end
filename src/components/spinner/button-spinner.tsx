import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const ButtonSpinner = () => {
  return <Spin  style={{ fontSize: 18, color: "white" }}  indicator={<LoadingOutlined spin />} />;
};
