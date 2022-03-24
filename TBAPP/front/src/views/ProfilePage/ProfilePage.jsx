import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Footer from "views/ComponentsSempreUEA/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Navbar from "../ComponentsSempreUEA/Navbar.jsx";
import camera from 'assets/img/faces/profile_default.png';
import QRCode from 'qrcode.react'
import "./ProfilePage.css";

import Global from 'global';
import profilePageStyle from "views/ProfilePage/profilePageStyle.jsx";

class ProfilePage extends React.Component {

  constructor(props){
    super(props);    
    this.state = {
      cpf: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      facebook: "",
      nomeMae: "",
      endereco: "",
      peso: "",
      sexo: 0,
      altura: "",
      cep: "",
      time:"",
      inicio:'',
      fim:'',
      id: this.props.match.params.paciente
    }
  }

  componentDidMount() {
    
      var id = ''+this.props.match.params.paciente
      if(id!=='undefined'){
        fetch(Global.API_URL + '/profile', {
          headers : new Headers({
            'x-api-key' : 'eiWee8ep9due4deeshoa8Peichai8Eih',            
          })
        }).then((response) => {
          if(response.status !== 200){
            alert('A Houve um erro ao listar perfil, tente novamente mais tarde');
            this.props.history.push('/home');
            return;
          }    
          response.json().then((data) => {
            this.setState({
              nome: data.name,
              email: data.email,
              endereco: data.endereco,
              telefone: data.telefone,
              cep: data.cep,
              nome_mae: data.nomeMae,
              sexo: data.sexo,
              altura: data.altura,
              peso:data.peso,
              cpf: data.cpf,
              horarioMed:data.time,
              inicio:data.inicio,
              fim:data.fim,
              imageURL: Global.API_URL + '/imgs/uploads/' + data.cpf+'.jpeg'
            })
          }).catch((e) => {
            alert('B Houve um erro ao listar perfil, tente novamente mais tarde');
            this.props.history.push('/list');
          });;
        }).catch((e) => {
          sessionStorage.setItem('jwtToken', '');
          alert('C Houve um erro ao listar perfil, tente novamente mais tarde');
          this.props.history.push('/login');
        });   
        return;
      }
      const token= sessionStorage.getItem('jwtToken')
      fetch(Global.API_URL + '/profile', {
        headers : new Headers({
            'x-api-key' : 'eiWee8ep9due4deeshoa8Peichai8Eih', 
            'x-access-token' :token
        })
      }).then((response) => {     
        console.log(response)  
        response.json().then((data) => {
          console.log(data.cpf)
          this.setState({
            nome: data.name,
            email: data.email,
            endereco: data.endereco,
            telefone: data.telefone,
            cep: data.cep,
            nome_mae: data.nomeMae,
            sexo: data.sexo,
            altura: data.altura,
            peso:data.peso,
            cpf: data.cpf,
            time:data.horarioMed,
            inicio:data.inicio,
            fim:data.fim,

            imageURL: Global.API_URL + '/imgs/uploads/' + data.cpf+'.jpeg',
          })
          console.log('cpf',this.state.cpf)
          
        });
      }).catch((e) => {
        sessionStorage.setItem('jwtToken', '');
        alert('e Houve um erro ao listar perfil, tente novamente mais tarde');
        this.props.history.push('/login');
      }); 
      const item=this.state.cpf 
    
      
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
  
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    var edit = null;
    if(sessionStorage.getItem("id") === this.state.id){
      edit = <Button onClick={() => this.props.history.push('/register-page')} color="primary" className={classes.buttonEditar}>Editar</Button>
    }
    
    return (
      <div>
        <Navbar />
         <br/>
         <br/>
         <br/>
         <br/>
         
         <br/>
         <br/>
         <br/>
         <br/>

        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                       <img onError={this.handleError} src={Global.API_URL + '/imgs/uploads/' + this.state.cpf + '.jpeg'} alt="..." className={classes.imageProfile} />
                    </div>
                    <div className={classes.name}>
                      <h3 className={classes.title}>{(this.state.name == null? '-':this.state.name)}</h3>
                    <br/>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                    <GridContainer justify='center'>
                    <div>
                      {/* <QRCode
                        id='QRCode'
                        value={(this.state.email == null? '-':this.state.email)+'\n'+(this.state.name = null ? '-' : this.state.name)+"\n ueasempre/profile-page"+(this.state.id=null ? '-' : this.state.id)}
                        size={290}
                        level={"H"}
                        includeMargin={true}
                        fgColor='black'
                      /> */}
                      <h4 id="name" style={{color: "#363636"}} > Nome: {this.state.nome}</h4> 
                      <h4 id="cpf" style={{color: "#363636"}}> CPF: {this.state.cpf}</h4> 
                      <h4 id="email" style={{color: "#363636"}}> Email: {this.state.email}</h4> 
                      <h4 id="peso" style={{color: "#363636"}}> Peso: {this.state.peso}</h4> 
                      <h4 id="altura" style={{color: "#363636"}}> Altura: {this.state.altura}</h4> 
                      <h4 id="horariomed" style={{color: "#363636"}}> Horário da medicacao: {this.state.time}</h4> 
                      <h4 id="inicio" style={{color: "#363636"}}> Inicio: {this.state.inicio}</h4> 
                      <h4 id="fim" style={{color: "#363636"}}> Fim: {this.state.fim}</h4> 
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    </GridContainer>
                    <br/>
                    
                    {/* {<p id="cpf"> cpf: {this.state.cpf}</p> } */}

                    
                    <div className={classes.centerContainer}>
                      {/* <Button onClick={() => this.props.history.push('/')} className={classes.buttonVoltar}>Voltar</Button> */}
                      <Button onClick={this.context.router.history.goBack} className={classes.buttonVoltar}>SAIR</Button>
                      
                      {edit}
                    </div>
                    
              </div>
              
          
            </div>
            
          </div>
          
        </div>
        <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
        <Footer />
        />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(ProfilePage);