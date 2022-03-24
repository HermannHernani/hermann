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


class CardAlunoSmall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno:this.props.aluno
        }
    }

    componentDidMount() {

    }
    
    handleError(e){
        e.target.src = camera;
    }

    render() {
        const { classes } = this.props;
        return (
          <GridItem xs={12} sm={6} md={3} className={classes.card}>
          <Card className={classes.profileSmall}>
            <CardBody onClick={() => this.props.history.push('profile-page/'+this.state.aluno.id)}>
              <GridContainer>
              {/* <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0MDguNzg4IDQwOC43ODgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwOC43ODggNDA4Ljc4ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojNDc1OTkzOyIgZD0iTTM1My43MDEsMEg1NS4wODdDMjQuNjY1LDAsMC4wMDIsMjQuNjYyLDAuMDAyLDU1LjA4NXYyOTguNjE2YzAsMzAuNDIzLDI0LjY2Miw1NS4wODUsNTUuMDg1LDU1LjA4NSAgaDE0Ny4yNzVsMC4yNTEtMTQ2LjA3OGgtMzcuOTUxYy00LjkzMiwwLTguOTM1LTMuOTg4LTguOTU0LTguOTJsLTAuMTgyLTQ3LjA4N2MtMC4wMTktNC45NTksMy45OTYtOC45ODksOC45NTUtOC45ODloMzcuODgyICB2LTQ1LjQ5OGMwLTUyLjgsMzIuMjQ3LTgxLjU1LDc5LjM0OC04MS41NWgzOC42NWM0Ljk0NSwwLDguOTU1LDQuMDA5LDguOTU1LDguOTU1djM5LjcwNGMwLDQuOTQ0LTQuMDA3LDguOTUyLTguOTUsOC45NTUgIGwtMjMuNzE5LDAuMDExYy0yNS42MTUsMC0zMC41NzUsMTIuMTcyLTMwLjU3NSwzMC4wMzV2MzkuMzg5aDU2LjI4NWM1LjM2MywwLDkuNTI0LDQuNjgzLDguODkyLDEwLjAwOWwtNS41ODEsNDcuMDg3ICBjLTAuNTM0LDQuNTA2LTQuMzU1LDcuOTAxLTguODkyLDcuOTAxaC01MC40NTNsLTAuMjUxLDE0Ni4wNzhoODcuNjMxYzMwLjQyMiwwLDU1LjA4NC0yNC42NjIsNTUuMDg0LTU1LjA4NFY1NS4wODUgIEM0MDguNzg2LDI0LjY2MiwzODQuMTI0LDAsMzUzLjcwMSwweiIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /> */}
                <GridItem xs={3} sm={12} md={12} className={classes.gridImage}>
                    <img onError={this.handleError} src={Global.API_URL + '/imgs/uploads/' + this.state.aluno.id + '.jpeg?v=' + Date.now()} alt="..." className={classes.navImageClassesSmall} />
                </GridItem>
                <GridItem xs={9} sm={12} md={12} className={classes.gridText}>
                  <div className={classes.name}>
                    <h6 className={classes.egressosSmall}>{this.state.aluno.nome}</h6>
                    <p className={classes.egressosProfessionSmall}>{this.state.aluno.curso}</p>
                    <GridContainer justify>
                      <GridItem xs={5} sm={5} md={5}>
                      </GridItem>
                      <GridItem xs={2} sm={2} md={2}>
                      <a href={this.state.aluno.linkedin}  justIcon link target="blank" className={classes.linkedinIconContainer}>
                      {this.state.aluno.linkedin ? <img className={classes.linkedinIconSmall} src={linkedin}/>:<img className={classes.linkedinIconSmallInactive} src={linkedin}/>}
                      </a>  
                      </GridItem>
                      <GridItem xs={2} sm={2} md={2}>
                      <a href={this.state.aluno.lattes}  justIcon link target="blank" className={classes.linkedinIconContainer}>
                      {this.state.aluno.lattes ? <img className={classes.lattesIconSmall} src={lattes}/>:<img className={classes.lattesIconSmallInactive} src={lattes}/>}
                      </a> 
                      </GridItem>
                      <GridItem xs={2} sm={2} md={2}>
                      <a href={this.state.aluno.facebook}  justIcon link target="blank" className={classes.linkedinIconContainer}>
                      {this.state.aluno.facebook ? <img className={classes.linkedinIconSmall} src={facebook}/>:<img className={classes.linkedinIconSmallInactive} src={facebook}/>}
                      </a>      
                      </GridItem>                
                  </GridContainer>
                  </div>
                </GridItem>
            </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        );
    }
}

export default withRouter(withStyles(homePageStyle)(CardAlunoSmall));