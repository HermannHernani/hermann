import React from "react";
import { withRouter } from 'react-router';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Popover from "@material-ui/core/Popover";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "views/ComponentsSempreUEA/LoginStyle.jsx";
import GLOBAL from 'global';
import md5 from 'js-md5'

//modal
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
import Global from "global";
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


class LoginPage extends React.Component {
  validInputs = {};

  constructor(props) {
    super(props);
    this.initValidInptus();
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      cpf: '',
      email: '',
      password: '',
      openBottom: false,
      openBottomEmailError: false,
      messageErro: '',
      titleErro: '',
      sendingEmail: false,
      classicModal: false,
      messageRecoverEmail: '', //referente ao esqueci a minha senha, não colocou um email correto
    };

  }
  initValidInptus() {
    this.validInputs = {
      cpf: true,
      password: true
    }

  }


  handleChange(evt) {
    if (evt.target.id === 'cpf') {
      this.setState({
        cpf: evt.target.value
      });
    } else {
      this.setState({
        password: evt.target.value
      });
    }
  }

  inputsValidation() {
    if (this.state.cpf.length < 12) {
      this.validInputs.cpf = false;
      this.setState({ cpf: this.state.cpf });
    }

    if (this.state.password.length < 6) {
      //this.validInputs.password = false;
      this.validInputs.password = true; //aceitar senha vazia - teste
      this.setState({ password: this.state.password });
    }
    
    if (this.validInputs.cpf
      && this.validInputs.password) {
      return true; 
    }
    else {
      this.setState({
        openBottom: true,
        titleErro: 'Preencha todos os campos corretamente',
        messageErro: 'Para logar no site é necessário preencher todos os campos corretamente'
      });
      return false;
    }
  }
  
  handleChangeCPF(evt) {
    if (evt.target.value.length < 14) {
      this.validInputs.cpf = false;
    } else {
      this.validInputs.cpf = true;
    }

    if (evt.target.id === 'cpf') {
      let toAppend = '';
      if (this.state.cpf.length < evt.target.value.length) {
        if (evt.target.value.length == 3 || evt.target.value.length == 7) toAppend = '.';
        if (evt.target.value.length == 11) toAppend = '-';
      }
      if (this.isANumber(evt.target.value) || this.state.cpf.length > evt.target.value.length) {
        this.setState({
          cpf: (evt.target.value + toAppend).substring(0, 14)
        });
      }
    }
    
    
  }

createItem() { 
    localStorage.cpf = this.state.cpf; 
} 
  handleChangeEmail(evt) {
    if (evt.target.id == 'email') {
      this.setState({ email: evt.target.value.substring(0, 60) });
    }
    
  }
  handleChangePassword(evt) {
    if (evt.target.value.length < 6) {
      this.validInputs.password = false;
    } else {
      this.validInputs.password = true;
    }
    if (evt.target.id === 'password') {
      this.setState({
        password: evt.target.value.substring(0, 20)
      });
    }
  }

  handleClosePopover(state) {
    this.setState({
      [state]: false
    });
  }


  handleSubmit(evt) {
    const str = this.state.cpf;
    let cpf = '';
    var i;
    for (i = 0; i < str.length; i++) {
      cpf += (str[i] !== '.' && str[i] !== '-' ? str[i] : '');
    }
 
    if (!this.inputsValidation()) {
      this.setState({
        openBottom: true,
        titleErro: 'Preencha todos os campos corretamente',
        messageErro: 'Para logar no site é necessário preencher todos os campos corretamente'
      });
    } else {
      fetch(Global.API_URL + '/login', { //local
        headers: new Headers({
          'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
          'Authorization': 'Basic ' + btoa(cpf + ':' + this.state.password),
        })
      })
        .then(function (response) {
          if (response.status == 200) {
            response.json()

              .then(data => {
                if (data.canLogin) {
                  sessionStorage.setItem('jwtToken', data.token)
                  // this.getTratamento()
                   this.props.history.push('/calendar');
              

                } else {
                  this.setState({
                    openBottom: true,
                    titleErro: 'Dados Incorretos',
                    messageErro: 'Verifique os campos CPF e Senha e tente novamente'
                  });
                }
              });
          } else {
            this.setState({
              openBottom: true,
              titleErro: 'Dados Incorretos',
              messageErro: 'Verifique os campos CPF e Senha e tente novamente'
            });
          }
        }.bind(this))

        .catch((e) => {
          this.setState({
            openBottom: true,
            titleErro: 'Erro no Sistema',
            messageErro: 'O sistema pode estar temporariamente fora do ar, tente novamente mais tarde'
          });
        });
    }
    evt.preventDefault();
  }
  isANumber(str) {
    let a = str[str.length - 1];
    if (a == '0' || a == '1' || a == '2' || a == '3' || a == '4' || a == '5' || a == '6' || a == '7' || a == '8' || a == '9') return true;
    else return false;
  }

  componentDidMount() {
    // we add a hidden class tothe card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
 
  goToRegister() {
    this.props.history.push('/register-page')
  }

  goToProfile() {
    this.props.history.push('/profile-page')
  }

  //Funções do processo do "esqueceu a senha"
  sendEmail(e) {
    e.preventDefault();
    if (this.state.email == '') {
      this.setState({
        messageRecoverEmail: 'É preciso inserir um email',
        openBottomEmailError: true
      });
    } else {
      /*
        Nesse trecho do código acontece uma requisição com o axios para a rota
        'forgotPassword', dentro dessa rota vai ter uma resposta que pode dizer
        se o email estava incorreto/não estava no banco de dados ou se o email
        foi enviado com sucesso
      */
      this.setState({ sendingEmail: true, });
      axios
        .post(`${GLOBAL.API_URL}/forgotPassword`,
          {
            email: this.state.email
          },
          {
            headers: { 'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih' }
          })
        .then(response => {
          if (response.data.message === "enviado com sucesso") {
            this.setState({
              messageRecoverEmail: 'Email enviado com sucesso',
              sendingEmail: false,
              openBottomEmailError: true
            });
          } else {
            this.setState({
              messageRecoverEmail: 'Falha ao enviar o email',
              sendingEmail: false,
              openBottomEmailError: true
            });
          }


        }).catch(error => {
          this.setState({ sendingEmail: false })
        });
    }

  }
  render() {
    const { classes } = this.props;

    //Botão de esqueceu a senha
    let EsqueceuSenha =
      <GridItem xs={12} sm={12} md={12}>
        <Button
          color="secondary"
          simple
          block
          onClick={() => this.setState({ classicModal: true })}
        >
          Esqueceu a senha?
        </Button>

        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={this.state.classicModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.setState({ classicModal: false })}
        >
          <DialogTitle
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.setState({ classicModal: false })}
            >
              <Close className={classes.modalClose} />
            </IconButton>
            <h4 className={classes.modalTitle}>Digite o seu email para recuperar a senha:</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <form className={classes.form}>
              <CustomInput
                labelText="Email"
                id="email"
                value={this.state.email}
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event => this.handleChangeEmail(event),
                  type: "text",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
              <Button
                color="primary"

                onClick={this.sendEmail.bind(this)}
                disabled={this.state.sendingEmail}
              >
                {this.state.sendingEmail ? "Enviando" : "Enviar"}
              </Button>
              <Popover
                classes={{
                  paper: classes.popover
                }}
                open={this.state.openBottomEmailError}
                onClose={() => this.handleClosePopover("openBottomEmailError")}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
              >
                <h3 className={classes.popoverHeader}>{this.state.titleErro}</h3>
                <div className={classes.popoverBody}>
                  {this.state.messageRecoverEmail}
                </div>
              </Popover>
            </form>
          </DialogContent>
        </Dialog>
      </GridItem>

    return (
      <div>
        <GridContainer justify="center">
          <GridItem xs={0} sm={0} md={4}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card className={classes[this.state.cardAnimaton, classes.cardLogin]}>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Login</h4>

                </CardHeader>
                <CardBody>

                  <CustomInput
                    labelText="CPF..."
                    id="cpf"
                    error={!this.validInputs.cpf}
                    value={this.state.cpf}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: ((event) => this.handleChangeCPF(event)),
                      type: "text",
                      autoComplete: "off",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Senha"
                    id="password"
                    error={!this.validInputs.password}
                    value={this.state.password}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: ((event) => this.handleChangePassword(event)),
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                              </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} className={classes.buttonsContainer}>
                      <Button
                        onClick={this.handleSubmit.bind(this)}
                        color="primary" size="md"
                        buttonRef={node => {
                          this.anchorElBottom = node;
                        }}>
                        ENTRAR
                          </Button>
                      <Popover
                        classes={{
                          paper: classes.popover
                        }}
                        open={this.state.openBottom}
                        anchorEl={this.anchorElBottom}
                        anchorReference={"anchorEl"}
                        onClose={() => this.handleClosePopover("openBottom")}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center"
                        }}
                      >
                        <h3 className={classes.popoverHeader}>{this.state.titleErro}</h3>
                        <div className={classes.popoverBody}>
                          {this.state.messageErro}
                        </div>
                      </Popover>
                    </GridItem>
                    {EsqueceuSenha}
                    <p className={classes.divider}>Ou</p>
                    <GridItem xs={12} sm={12} md={12} className={classes.buttonsContainer}>
                      <Button onClick={this.goToRegister.bind(this)} simple color="secondary" size="md">
                        FAZER CADASTRO
                          </Button>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withRouter(withStyles(loginPageStyle)(LoginPage));
