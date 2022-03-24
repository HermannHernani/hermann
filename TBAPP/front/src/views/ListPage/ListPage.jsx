import React from "react";
import MediaQuery from 'react-responsive';
// nodejs library that concatenates classes
import classNames from "classnames";
import './ListPage.css';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import Navbar from "../ComponentsSempreUEA/Navbar";
import CardAluno from "../ComponentsSempreUEA/CardAluno";
import CardAlunoSmall from "../ComponentsSempreUEA/CardAlunoSmall";
import Footer from "views/ComponentsSempreUEA/Footer.jsx";

import Global from 'global';
import camera from 'assets/img/faces/profile_default.png';
import homePageStyle from "views/ListPage/listPageStyle.jsx";

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
          headers : new Headers({
            'x-api-key' : 'eiWee8ep9due4deeshoa8Peichai8Eih',
            "Access-Control-Allow-Origin": "localhost:5000"
          })
      }
      fetch(Global.API_URL + '/alunos/0', request).then((response) => {
        if(response.status == 200){
        response.json().then((data) => {
              
              this.setState({alunos:data.alunos}) 
          });      
        } else {
          alert('Houve um erro ao listar alunos, tente novamente mais tarde');
        }
      }).catch((e) => {
          
          alert('Houve um erro ao listar alunos, tente novamente mais tarde');
      });
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

  openProfile(id){    
    this.props.history.push('/profile-page/'+id);
  }

  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  render() {
    const { classes } = this.props;
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    let list = <div>
    <div className={classes.container}>

      <div className={classes.description}>
          <h2 className={classes.titleEgressos}>
          ALUNOS E EGRESSOS
          </h2>

      </div>
      <GridContainer justify="center">

      {this.state.alunos.map(c => 
        <CardAluno aluno={c}></CardAluno>
      )}
      </GridContainer>
      <br/>
      <br/>
      <br/>
      
    </div>
  </div>

  let listSmall = <div>
  <div className={classes.container}>

    <div className={classes.description}>
        <h2 className={classes.titleEgressosWhite}>
        ALUNOS E EGRESSOS
        </h2>

    </div>
    <GridContainer justify="center">

    {this.state.alunos.map(c => 
        <CardAlunoSmall aluno={c}></CardAlunoSmall>
    )}
    </GridContainer>
    <br/>
    <br/>
    <br/>
    
  </div>
  </div>  
    return (
      <div className='bg'>
        <Navbar page={"students"}/>
        <br/>
        <br/>
        <br/>
        <br/>       
        <br/>    
        <br/>     

        <MediaQuery query="(min-device-width: 600px)">
          <div className={classNames(classes.main, classes.mainRaised)}>
              {list}
          </div>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 600px)">
          {listSmall}
        </MediaQuery>
        <br/>
        <Footer/>   
        </div>
    );
  }
}

export default withStyles(homePageStyle)(HomePage);
