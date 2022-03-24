/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";


import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.containerFooter}>
        
        <div className={classes.center}>
          &copy; {1900 + new Date().getYear()}, feito por{" "}
            LUDUS - Laboratório de Tecnologia, Inovação e Economia Criativa <br/>
            Facebook:   
          {' '}
          <a
            href="https://www.facebook.com/uealuduslab/"
            className={aClasses}
            target="_blank"
            style={{color: "#3C485C"}}
          >
            <i className={"fab fa-facebook"}  />
          </a>{" "}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
