import React from "react";
import MediaQuery from 'react-responsive';
// nodejs library that concatenates classes
import classNames from "classnames";
import './HomePage.css';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Footer from "views/ComponentsSempreUEA/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Navbar from "../ComponentsSempreUEA/Navbar";
import Login from "../ComponentsSempreUEA/Login";
import Background from "../../assets/img/bgs/home.png"

import camera from 'assets/img/faces/profile_default.png';

import homePageStyle from "views/HomePage/homePageStyle.jsx";

class HomePage extends React.Component {
    constructor(){
        super();
        this.state = {
            alunos: [],
            selected: ''
        } 
    }

    componentDidMount(){
      var request = {
          method: 'get',
          mode: 'cors',
          headers : new Headers({
            'x-api-key' : 'eiWee8ep9due4deeshoa8Peichai8Eih',
          })
      }
  }

  handleError(e){
      e.target.src = camera;
  }

  openLink(link){
    if(link==='' || link===null){
      alert('Nenhuma pagina adicionada')
    } else{ 
      window.open(link);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Navbar page={"home"}/>
        <Parallax filter image={Background}>
        <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h2 className={classes.title}>Bem Vindo ao TBAPP</h2>
                <h4 className={classes.descriptionText}>
                O TBApp é um aplicativo destinado ao auxílio e suporte à pessoas que estão realizando o tratamento da 
                Tuberculose, com lembretes diários da medicação, histórico das doses registradas, mensagens motivadoras,
                além de informações educativas sobre a doença, exames e tratamento.
                </h4>
                <br />
                <br />                
                <br /> 
                <br />
                <br />                
                <br /> 
              </GridItem>
              
              {sessionStorage.getItem('jwtToken')? '':
              <GridItem xs={12} sm={12} md={6} className = "hiddenOnSmallScreen">
                <Login/>
              </GridItem>
              }
            </GridContainer>
          </div>
        </Parallax>
        <Footer/>
      </div>
    );
  }
}

export default withStyles(homePageStyle)(HomePage);
