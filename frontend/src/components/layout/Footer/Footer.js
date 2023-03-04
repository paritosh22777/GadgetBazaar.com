import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  let id = pathname.substring(9, pathname.length);
  let keyword = pathname.substring(10, pathname.length);
  if (
    pathname === "/" ||
    pathname === "/products" ||
    pathname === `/product/${id}` ||
    pathname === `/products/${keyword}` ||
    pathname === "/cart"
  ) {
    return (
      <footer className="footer">
        <div className="left-footer">
          <h3>Social</h3>
          <div className="footer-social-container">
            <Link className="footer-icon facebook" to="facebook">
              <FacebookIcon />
            </Link>
            <Link className="footer-icon instagram" to="instagram">
              <InstagramIcon />
            </Link>
            <Link className="footer-icon twitter" to="twitter">
              <TwitterIcon />
            </Link>
            <Link className="footer-icon youtube" to="youtube">
              <YouTubeIcon />
            </Link>
          </div>
        </div>
        <div className="middle-footer">
          <h1>GadgetBazaar.com</h1>
          <h3>High Quality is our first priority</h3>
          <p className="footer-desc">
            GadgetBazaar.com is a professional eCommerce platform. Here we will
            provide you best quality products at a reasonable prices. We're
            dedicated to providing you the best of eCommerce service, with a
            focus on dependability and shopping. We're working to turn our
            passion for eCommerce into a booming online website. We hope you
            enjoy our service as much as we enjoy offering them to you.
          </p>
          <p className="copyrighted">Copyrighted {new Date().getFullYear()}</p>
        </div>
        <div className="right-footer">
          <h3>Contact Us</h3>
          <a href="mailto:GadgetBazaar@gmail.com">
            <span className="email-icon">
              <MailOutlineIcon />
            </span>
            <h4>gadgetbazaar2022@gmail.com</h4>
          </a>
          <img
            className="footer-payment"
            src="https://i.ibb.co/Qfvn4z6/payment.png"
            alt="payment"
          />
        </div>
      </footer>
    );
  }
  return null;
}

export default Footer;
