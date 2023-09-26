import * as React from "react";
import "../styling/index.css";
import { Helmet } from "react-helmet";

export const Head: React.FC = () => {
  return (
    <Helmet
      bodyAttributes={{
        class: process.env.GATSBY_NL_DESIGN_THEME_CLASSNAME,
      }}
    >
      <title>OpenCatalogi</title>
    </Helmet>
  );
};
