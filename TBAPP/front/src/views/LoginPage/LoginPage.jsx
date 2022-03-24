import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "views/ComponentsSempreUEA/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import Navbar from "../ComponentsSempreUEA/Navbar";
import Login from "../ComponentsSempreUEA/Login";

import loginPageStyle from "views/LoginPage/loginPageStyle.jsx";

import image from "assets/img/bg7.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Navbar page={"login"}/> */}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <Login/>
              </GridItem>
            </GridContainer>
          </div> 
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
