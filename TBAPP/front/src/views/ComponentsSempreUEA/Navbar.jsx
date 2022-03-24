import React from "react";

// @material-ui/core components
import { withRouter } from 'react-router';
import MediaQuery from 'react-responsive';
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "components/Header/Header.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";
import profileImage from '../../assets/img/faces/profile_default.png';
import logo from "assets/img/logo/lungLogo.svg"
import Global from 'global';
import GLOBAL from 'global';
import axios from 'axios';
const token= sessionStorage.getItem('jwtToken')
class SectionNavbars extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page : this.props.page,
    }
    
    axios.get(`${GLOBAL.API_URL}/paciente`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
    .then((response) => {
      console.log(response)
      this.setState({
        cpf:response.data.cpf,
        name:response.data.nome
      })
     
    })
    .catch(error => {
      console.log(error)
    })
  }
  componentDidMount(){
    axios.get(`${GLOBAL.API_URL}/paciente`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
    .then((response) => {
      console.log(response)
      this.setState({
        cpf:response.data.cpf,
        name:response.data.nome
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  

  handleError(e){
    e.target.src = profileImage;
  }

  goToRegister(){
    sessionStorage.setItem('jwtToken','');
    this.props.history.push('/register-page')
  }
  goToLogin(){
    this.props.history.push('/login')
  }
  goToList(){
    this.props.history.push('/list')
  }
  goToHome(){
    this.props.history.push('/home')
  }
  goToAbout(){
    this.props.history.push('/about')
  }
  loggout(){
    sessionStorage.clear();
    this.props.history.push('/');
  }
  goToProfile(){
    this.props.history.push('/profile-page')
  }
  goToFaq(){
    this.props.history.push('/faq')
  }
  goToCalendar(){
    this.props.history.push('/calendar')
  }

  
  

  render() {
    const { classes } = this.props;
    let loginButton = <MediaQuery query="(max-device-width: 768px)">
    <ListItem className={classes.listItem}>
      <Button
        onClick={this.goToLogin.bind(this)}
        className={classes.registerNavLink}
        color={this.state.page === "login"? "primary":"transparent"}>
        Login
      </Button>
    </ListItem>
  </MediaQuery>
  let registerButton = <ListItem className={classes.listItem}>
    <Button
      onClick={this.goToRegister.bind(this)}
      className={classes.registerNavLink}
      color={this.state.page === "register"? "primary":"transparent"}>
      Cadastrar
    </Button>
  </ListItem>

  let calendarButton = <ListItem className={classes.listItem}>
  <Button
    onClick={this.goToCalendar.bind(this)}
    className={classes.registerNavLink}
    color={this.state.page === "Calendar"? "primary":"transparent"}>
    Calendário
  </Button>
</ListItem>

  let loggoutButton = <ListItem className={classes.listItem}>
  <CustomDropdown
    className={classes.profileDropdown}
    left
    caret={false}
    hoverColor="primary"
    dropdownHeader={this.state.name}
    buttonText={
      <img
        onError={this.handleError}
        src={Global.API_URL + '/imgs/uploads/'+`${this.state.cpf}` +'.jpeg'}
        className={classes.img}
        alt="profile"
      />
    }
    buttonProps={{
      className:
        classes.navLink + " " + classes.imageDropdownButton,
      color: "transparent"
    }}
    dropdownList={[
      <p onClick={this.goToProfile.bind(this)}
          color="transparent" className = {classes.dropdownLink}>Meu Perfil</p>,
      <p onClick={this.loggout.bind(this)}
          color="transparent" className = {classes.dropdownLink}>Sair</p>
    ]}
  />
</ListItem>

    return (
      
      <div>
        <Header
              
              leftLinks={
                <List className={classes.list}>
                  <ListItem className={classes.listItem}>
                    <Button
                      onClick={this.goToHome.bind(this)}
                      
                      color={this.state.page === "home"? "primary":"transparent"}>
                      Início
                    </Button>
                  </ListItem>

                  {sessionStorage.getItem('jwtToken')?'':loginButton}

                  {sessionStorage.getItem('jwtToken')?'':registerButton}

                  {calendarButton}
                  {/* {sessionStorage.getItem('jwtToken')?calendarButton:''} */}

                  {/* <ListItem className={classes.listItem}>
                    <Button
                      onClick={this.goToList.bind(this)}
                      className={classes.registerNavLink}
                      color={this.state.page === "students"? "primary":"transparent"}>
                      Alunos
                    </Button>
                  </ListItem> */}
                  <ListItem className={classes.listItem}>
                    <Button
                      onClick={this.goToFaq.bind(this)}
                      className={classes.registerNavLink}
                      color={this.state.page === "faq"? "primary":"transparent"}>
                      Dúvidas Frequentes
                    </Button>
                  </ListItem>
                  
                  <ListItem className={classes.listItem}>
                    <Button
                      onClick={this.goToAbout.bind(this)}
                      className={classes.registerNavLink}
                      color={this.state.page === "about"? "primary":"transparent"}>
                      Sobre
                    </Button>
                  </ListItem>
                  
                  {sessionStorage.getItem('jwtToken')?loggoutButton:''}
                </List>
                
              }
            />
      </div>
    );
  }
}

export default withRouter(withStyles(navbarsStyle)(SectionNavbars));
