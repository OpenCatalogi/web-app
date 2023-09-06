import * as React from "react";
import { navigate } from "gatsby";

const LoginPage: React.FC = () => {
  React.useEffect(() => {
    navigate("/");
  });

  return <></>;
};

export default LoginPage;
