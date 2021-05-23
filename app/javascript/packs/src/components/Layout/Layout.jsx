import React from "react";
import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";
import Main from "../UI/Main/Main";
import classes from './Layout.module.scss';
const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;
