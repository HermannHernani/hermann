import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Global from 'global';
import { withRouter } from 'react-router';
import withStyles from "@material-ui/core/styles/withStyles";

import homePageStyle from "views/HomePage/homePageStyle.jsx";
import camera from 'assets/img/faces/profile_default.png';

import lattes from 'assets/img/lattes.svg';
import facebook from 'assets/img/face.png';
import linkedin from 'assets/img/linkedin2.png';

class CardAluno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno:this.props.aluno,
            
        }
        
    }

    componentDidMount() {
      console.log("aluno: ", this.props)
    }
    
    handleError(e){
        e.target.src = camera;
    }

    validarURL(link){
      var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
      return re.test(link) && link.search('http')!=-1;
    }

    situacaoaluno(){
      var sit = ''
      if(this.state.aluno.situacao == 1){
        sit = 'Aluno Egresso';
      }
      else{
        sit = 'Aluno Discente';
      }
      return sit;
    }

    render() {
        const { classes } = this.props;
        return (
            <GridItem xs={12} sm={6} md={3}>
                <Card className={classes.profile}>
                   <CardBody onClick={() => this.props.history.push('profile-page/'+this.state.aluno.id)}>
                     
                    <GridContainer>
                      <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                          <img onError={this.handleError} src={Global.API_URL + '/imgs/uploads/' + this.state.aluno.id + '.jpeg?v=' + Date.now()} alt="..." className={classes.navImageClasses} />
                      </GridItem>
                      <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                        <div className={classes.name}>
                          <h6 className={classes.egressos}>{this.state.aluno.nome}</h6>
                          <p className={classes.egressosProfession}>{this.state.aluno.curso}</p>
                          <p classname={classes.egressdis}>{this.situacaoaluno()}</p>
                          
                        </div>
                      </GridItem>
                   </GridContainer>
                   </CardBody>
                   <CardFooter className={classes.cardFooter}>
                    
                    <a href={this.validarURL(this.state.aluno.linkedin)?this.state.aluno.linkedin:false} justIcon link target="blank" className={classes.linkedinIconContainer}>
                      {this.validarURL(this.state.aluno.linkedin) ? <img className={classes.linkedinIcon} src={linkedin}/>:<img className={classes.linkedinIconInactive} src={linkedin}/>}
                    </a> 
                    <a href={this.validarURL(this.state.aluno.lattes)?this.state.aluno.lattes:false}  justIcon link target="blank" className={classes.linkedinIconContainer}>
                      {this.validarURL(this.state.aluno.lattes) ? <img className={classes.lattesIcon} src={lattes}/>:<img className={classes.lattesIconInactive} src={lattes}/>}
                    </a> 
                    <a href={this.validarURL(this.state.aluno.facebook)?this.state.aluno.facebook:false}  justIcon link target="blank" className={classes.linkedinIconContainer}>
                      {this.validarURL(this.state.aluno.facebook)? <img className={classes.linkedinIcon} src={facebook}/>:<img className={classes.linkedinIconInactive} src={facebook}/>}
                    </a>                 
                   </CardFooter>
                 </Card>
               </GridItem>
        );
    }
}

export default withRouter(withStyles(homePageStyle)(CardAluno));