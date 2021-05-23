import React from "react";
import MediumIcon from '../../../assets/images/medium_subed_logo.png';
import GithubIcon from '../../../assets/images/git_subed_logo.png';
import FacebookIcon from '../../../assets/images/fb_subed_logo.png';
import LinkedInIcon from '../../../assets/images/linkedin_subed_logo.png';
import classes from './Footer.module.scss';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.block}>
        <h2>About</h2>
        <ul>
          <li>
            <Link to="#">Me</Link>
          </li>
          <li>
            <Link to="#">Partnership</Link>
          </li>
        </ul>
      </div>
      <div className={classes.block}>
        <h2>Connect</h2>
        <ul>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="#">Updates</Link>
          </li>
        </ul>
      </div>
      <div className={classes.block}>
        <h2>Resources</h2>
        <ul>
          <li>
            <Link to="#">ColorPicker</Link>
          </li>
        </ul>
      </div>
      <ul className={classes.contactLinks}>
        <li>
          <Link to="#">
            <img src={MediumIcon} alt="" />
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={GithubIcon} alt="" />
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={FacebookIcon} alt="" />
          </Link>
        </li>
        <li>
          <Link to="#">
            <img src={LinkedInIcon} alt="" />
          </Link>
        </li>
      </ul>
      <ul className={classes.others}>
        <li>
          <Link to="#">Terms Of Use</Link>
        </li>
        <li>
          <Link to="/terms">Privacy Policy</Link>
        </li>
        <li>
          <Link to="#">Cookie Policy</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
