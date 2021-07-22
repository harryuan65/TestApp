import React from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Header.module.scss";
import Logo from "../../../assets/images/Logo0421.png";
import APIManager from "../../../utils/APIManager";

const Header = ({ author, setAuthor }) => {
  const history = useHistory();
  const signOut = () => {
    APIManager.Instance()
    .delete('authors/sign_out')
    .then(response => {
      setAuthor({});
      history.push('/');
    })
    .catch(err=> {
      // setResponseError(err);
      console.error(err);
    })
  }
  let btn = null;
  if (author && author.loggedIn) {
    btn = (
      <li>
        <button className={classes.SignOut} onClick={() => signOut()}>Sign Out</button>
      </li>
    );
  } else {
    btn = (
      <li className={classes.SignIn}>
        <Link to="/sign_in">Sign In</Link>
      </li>
    );
  }
  return (
    <nav className={classes.Header}>
      <Link to="/">
        <img src={Logo} alt="DevDose" />
      </Link>
      <ul>
      {btn}
        <li className={classes.SignIn}>
          <Link to="/post/new">&#x002b; New</Link>
        </li>
        {/* <li className={classes.SignUp}>
          <Link to="/sign_up">Sign Up</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Header;
