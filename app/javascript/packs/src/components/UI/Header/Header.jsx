import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import Logo from '../../../assets/images/Logo0421.png';

const Header = () => {
  return (
    <nav className={classes.Header}>
      <Link to='/'><img src={Logo} alt='DevDose'/></Link>
      <ul>
        <li className={classes.SignIn}>
          <Link to="/sign_in">Sign In</Link>
        </li>
        {/* <li className={classes.SignUp}>
          <Link to="/sign_up">Sign Up</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Header;
