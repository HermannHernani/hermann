import React from "react";
import MediaQuery from 'react-responsive';
// nodejs library that concatenates classes
import classNames from "classnames";
import './AboutPage.css';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Footer from "../ComponentsSempreUEA/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Navbar from "../ComponentsSempreUEA/Navbar";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Background from 'assets/img/bgs/about.png';
import profJucimar  from 'assets/img/ProfJucimar.jpg';
import nicolas from 'assets/img/nicolas.jfif';
import natalia from 'assets/img/natalia.png';
import jair from 'assets/img/jair.jfif';
import amelia from 'assets/img/amelia.jfif';
import raimundo from 'assets/img/raimundo.jfif';
import daniel from 'assets/img/daniel.jfif';
import lara from 'assets/img/lara.jfif';
import afonso from 'assets/img/afonso.jpg'
import hermann from 'assets/img/hermann.jpg'
import felipe from 'assets/img/felipe.jpg'
import rafaela from 'assets/img/rafaela.jpg'
import william from 'assets/img/william.jpg'
import levi from 'assets/img/levi.jpg'
import aboutPageStyle from "views/AboutPage/aboutPageStyle.jsx";
import CardAluno from "../ComponentsSempreUEA/CardAluno";


class AboutPage extends React.Component {
    constructor(){
        super();
        this.state = {
            alunos: [],
            selected: ''
        } 
    }

  render() {
    const { classes } = this.props;
          let listSmall = 
          <div className={classes.containerSmall}>
            <div className={classes.egressosSmallContainer}>

              <div className={classes.description}>
                  <h2 className={classes.titleEgressos}>
                  A equipe:
                  </h2>
              </div>
              <GridContainer justify="center" marginBottom="20px">
                <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage} >
                          <img onError={this.handleError} src={profJucimar} className={classes.navImageClassesSmall}/>
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Jucimar Junior"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Doutor em Engenharia de Software"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>
               <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={amelia} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Amélia Sícsu"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Doutora em Enfermagem em Saúde Pública"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>

               <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={lara} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Lara Oliveira"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Mestranda em Enfermagem em Saúde Pública"}</p>
                          <p className={classes.egressosProfessionSmall}>{"larabezerradeassis@gmail.com"}</p>
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>
               <GridItem xs={12} sm={6} md={3}>
               
               <Card className={classes.profileSmall}>
                  <CardBody >                     
                   <GridContainer>
                     <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                         <img onError={this.handleError} src={nicolas} className={classes.navImageClassesSmall} />
                     </GridItem>
                     <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                       <div className={classes.name}>
                         <h6 className={classes.egressosSmall}>{"Nicolas Lima"}</h6>
                         <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                       </div>
                     </GridItem>
                  </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={6} md={3}>
              
              <Card className={classes.profileSmall}>
                 <CardBody >                     
                  <GridContainer>
                    <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                        <img onError={this.handleError} src={natalia} className={classes.navImageClassesSmall} />
                    </GridItem>
                    <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                      <div className={classes.name}>
                        <h6 className={classes.egressosSmall}>{"Natália Cavalcante"}</h6>
                        <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                      </div>
                    </GridItem>
                 </GridContainer>
                 </CardBody>
               </Card>
             </GridItem>
             <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={raimundo} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Raimundo Artini"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Mestre em Engenharia de produção (SEMSA MANAUS)"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>
               <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={jair} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Jair Pinheiro"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Doutorando em Doenças Tropicais e Infecciosas (SEMSA MANAUS)"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>

               <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={daniel} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Daniel Sacramento"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Mestre em Saúde e Sociedade em Endemias (SEMSA MANAUS)"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>

               <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={afonso} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Afonso Garcia"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>

               <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={hermann} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Hermann Hernani"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>

               <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={felipe} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Felipe Henrique"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                 </Card>
               </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={rafaela} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Rafaela MElo"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={william} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"William Azevedo"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                </Card>
                </GridItem>
                
                <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profileSmall}>
                   <CardBody >                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={levi} className={classes.navImageClassesSmall} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressosSmall}>{"Levi Lima"}</h6>
                          <p className={classes.egressosProfessionSmall}>{"Bolsista de projeto de extensão"}</p>                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                </Card>
                </GridItem>               
              </GridContainer>
              <br/>
            </div>
          </div>
    
    return (
      <div>
        <Navbar page={"about"}/>
        <Parallax className={classes.bg} filter image={Background}>
        <div className={classes.container}>

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
              <div>
                <h2 className={classes.title}>
                  <strong>Sobre o TBApp:</strong>
                </h2>
                <h4 justify>
                  <strong>O TBApp é uma ferramenta para lhe auxiliar durante o seu tratamento para tuberculose (TB). Você contará com lembretes diários, mensagens motivadoras, conteúdos educativos e um espaço para registros diário da tomada da medicação.
                  Nosso objetivo é proporcionar a você o cuidado com a sua saúde, com acompanhamento pela equipe de saúde durante todo o seu tratamento.</strong>
                </h4>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

              </div>
              </GridItem>
              
            </GridContainer>
          
          </div>
        </Parallax>
        <MediaQuery maxDeviceWidth = {1920}>
          {listSmall}
        </MediaQuery>
        <Footer/>
      </div>
    );
  }
}

export default withStyles(aboutPageStyle)(AboutPage);
