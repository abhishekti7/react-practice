import React from "react";
import styles from "./Footer.module.css";

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <div>
        <p data-testid="footer">Made with &#x2615;</p>
      </div>
    </footer>
  );
};

export default Footer;
