import * as React from "react";
import "../styling/index.css";
import { Helmet } from "react-helmet";

export const Head: React.FC = () => {
  console.log("deploy#3");

  return (
    <Helmet>
      <title>OpenCatalogi</title>
      <script src="/env.js"></script>
    </Helmet>
  );
};
