import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Footer from "views/ComponentsSempreUEA/Footer.jsx";
import Calendar from "../ComponentsSempreUEA/Calendar.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import notification from '../ComponentsSempreUEA/notification'
import GLOBAL from 'global';
import axios from 'axios';

import Navbar from "../ComponentsSempreUEA/Navbar";

import CalendarPageStyle from "views/CalendarPage/CalendarPageStyle.jsx";

import image from "assets/img/bg7.jpg";
const token = sessionStorage.getItem('jwtToken');
class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      300
    );
    
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        
        <Navbar page={"Calendar"}/>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div 
          className={classes.container}>
           <Calendar/>
          </div> 
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withStyles(CalendarPageStyle)(CalendarPage);