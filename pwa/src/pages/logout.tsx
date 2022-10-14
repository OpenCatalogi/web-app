import * as React from "react";
import { navigate } from "gatsby";
import { handleLogout } from "../services/auth";
import APIContext from "../apiService/apiContext";
import APIService from "../apiService/apiService";

const Logout: React.FC = () => {
  const API: APIService | null = React.useContext(APIContext);

  React.useEffect(() => {
    API && handleLogout(API);
    navigate("/");
  });

  return <></>;
};

export default Logout;
