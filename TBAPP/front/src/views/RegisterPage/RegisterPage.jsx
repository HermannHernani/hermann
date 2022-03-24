import React from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TimeField from 'react-simple-timefield';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import PersonOutline from "@material-ui/icons/PersonOutline";
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import People from "@material-ui/icons/People";
import PlaceIcon from '@material-ui/icons/Place';
import DateRange from "@material-ui/icons/DateRange";
import Description from "@material-ui/icons/Description";
import Close from "@material-ui/icons/Close";
import AccountBalance from "@material-ui/icons/AccountBalance";
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import HomeIcon from '@material-ui/icons/Home';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import TextField from '@material-ui/core/TextField';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Footer from "views/ComponentsSempreUEA/Footer.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Tooltip from '@material-ui/core/Tooltip';
import Navbar from "../ComponentsSempreUEA/Navbar.jsx";

import loginPageStyle from "views/RegisterPage/registerPageStyle.jsx";

import md5 from 'js-md5'
import Global from 'global';
import image from "assets/img/reg.jpg";
import facebook from "assets/img/facebook-icon-input.png";
import employee from "assets/img/employee.png";
import linkedin from "assets/img/linkedin.png";
import whatsapp from "assets/img/whatsapp.png";
import AlarmClock from "../Alarm/AlarmClock"
import profile from "../../assets/img/faces/profile_default.png"
import { number } from "prop-types";
import '../CalendarPage/time.css'
//import YearPicker from "react-year-picker";
import { green } from "@material-ui/core/colors";
import { networkInterfaces } from "os";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class RegisterPage extends React.Component {
  unidades = [];
  cursos = [];
  file;
  validInputs = {};
  cpfCanChange = true;
  constructor(props) {
    var moment = require('moment');
    moment.locale('pt-br');

    super(props);
    this.initValidInptus();
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      step: 0,
      toggleSituationState: "desempregado",
      textButton: "Próximo",
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
      time: "07:00",
      ok: false,

    };
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears

    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );

    const token = sessionStorage.getItem('jwtToken');

   

    if (!token) {
      // this.props.history.push('/login');
      return
    } else {
      fetch(Global.API_URL + '/register', {
        headers: new Headers({
          'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
          'x-access-token': token
        })
      }).then((response) => {
        if (response.status !== 200) {
          alert('Houve um erro ao listar perfil, tente novamente mais tarde');
          this.props.history.push('/home');
          return;
        }
        response.json().then((data) => {
          if (data.id) this.cpfCanChange = false;
          this.setState({
            nome: data.name,
            email: data.email,
            endereco: data.endereco,
            telefone: data.telefone,
            cep: data.cep,
            nome_mae: data.nomeMae,
            sexo: data.sexo,
            altura: data.altura,
            cpf: data.cpf,          
            imageURL: Global.API_URL + '/img/uploads/' + data.id + '.jpeg?v=' + Date.now(),
            horarioMed:data.time
            // lattes: data.lattes,
            // whatsapp: data.whatsapp
          })
          this.getCourses(this.state.unity);
        });
      }).catch((e) => {
        sessionStorage.setItem('jwtToken', '');
        console.log('cpf',this.state.cpf)
        alert('Houve um erro, tente novamente mais tarde');
        this.props.history.push('/home');
      });

    }
    
  }

  
  initValidInptus() {
    this.validInputs = {
      cpf: true,
      email: true, 
      password: true,
      passwordConfirmation: true,
      imag: true,
      name: true,
      entryYear: true,
      exitYear: true,
      unity: true,
      course: true,
      endereco: true,
      nomeMae: true,
      peso: true,
      altura: true,
      cep: true,
      telefone: true,
      time:true
      
    }

  }

  addAluno() {
    const token = sessionStorage.getItem('jwtToken');
    var request = {};
    var situacao_trabalhista = 0;

    if (this.state.situation === "Discente") {
      if (this.state.discSituation === "Não Trabalha") {
        situacao_trabalhista = 0;
      } else if (this.state.discSituation === "Bolsista") {
        situacao_trabalhista = 1;
      } else if (this.state.discSituation === "Estagiário") {
        situacao_trabalhista = 2;
      } else if (this.state.discSituation === "CLT") {
        situacao_trabalhista = 3;
      } else {
        situacao_trabalhista = 4;
      }
    } else {
      if (this.state.discSituation === "Não Trabalha") {
        situacao_trabalhista = 1;
      } else if (this.state.discSituation === "Bolsista") {
        situacao_trabalhista = 2;
      } else if (this.state.discSituation === "CLT") {
        situacao_trabalhista = 3;
      } else if (this.state.discSituation === "Outros") {
        situacao_trabalhista = 4;
      }
    }
    if (this.state.cargo === null || this.state.cargo === undefined) {
      this.setState({ cargo: '' });
    }
    if (this.state.institution === null || this.state.institution === undefined) {
      this.setState({ institution: '' });
    }

    if (this.cpfCanChange) {
      const str = this.state.cpf;
      var cpf = '';
      var i;
      for (i = 0; i < str.length; i++) {
        cpf += (str[i] !== '.' && str[i] !== '-' ? str[i] : '');
      }
    }

    var body = JSON.stringify({
      "name": this.state.name,
      "email": this.state.email,
      "endereco": this.state.endereco,
      "cpf": cpf,
      "password": this.state.password,
      "telefone": this.state.telefone,
      "cep": this.state.cep,
      "altura": this.state.altura,
      "sexo": this.state.sexo,
      "nome_mae": this.state.nomeMae,
      "peso": this.state.peso,
      "horarioMed":this.state.time

    })
    if (token) {
      request = {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-access-token': token,
          'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        }),
        body: body
      }
    } else {
      request = {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        }),
        body: body
      }
    }

    if ((this.state.password === '') || (this.state.name === '' || this.state.entryYear === '' || this.state.cpf === '' || this.state.course === '' || this.state.course === 'escolha' || this.state.unity === '' || this.state.unity === 'escolha')) {
      //AQUI alert('Verifique se a senha e campos obrigatórios estão preenchidos');
      this.setState({ feedbackMensage: 'Verifique se a senha e campos obrigatórios estão preenchidos' });
      this.setState({ feedbackTitle: 'Ops' });
      this.handleClickOpen("classicModal");
      this.props.history.push('/register-page')
      return;
    }

    fetch(Global.API_URL + '/register', request).then((response) => {
      if (response.ok) {
        console.log(response)
        response.json().then((data) => {
          const form = new FormData();
          form.append('file', this.file);
          form.append('filename', data.cpf + '.jpeg')
          console.log(data.cpf)
          fetch(Global.API_URL + '/uploads', {
            method: 'POST',
            body: form,
          })
            .then((response) => {
            response.json().then((body) => {
              //AQUI alert('Cadastro Realizado com Sucesso') ;
              this.setState({ ok: true });
              this.setState({ feedbackTitle: 'Pronto' });
              this.setState({ feedbackMensage: 'Cadastro Realizado com Sucesso ' });
              this.handleClickOpen("classicModal");
            }).catch((e) => {

              //AQUI alert('Cadastro Realizado com Sucesso')
              this.setState({ feedbackTitle: 'Pronto' });
              this.setState({ feedbackMensage: 'Cadastro Realizado, sem foto. Não foi possível enviar sua foto ' });
              this.handleClickOpen("classicModal");
              this.setState({ ok: true });
            });
          });
          this.setState({ feedbackTitle: 'Pronto' });
          this.setState({ feedbackMensage: 'Cadastro Realizado, sem foto. Não foi possível enviar sua foto ' });
          this.handleClickOpen("classicModal");
          this.setState({ ok: true });
        });
      } else {
        response.json().then((data) => {
          this.setState({ feedbackTitle: 'Error' });
          this.setState({ feedbackMensage: data.message });
          this.handleClickOpen("classicModal");
        });
      }
      // else {
      //   alert("CPF informado invalido, insira outro");
      // }
    }).catch((e) => {
      
      console.log(e)
      //AQUI alert('Houve um erro ao adicionar Aluno, tente novamente mais tarde');
      this.setState({ feedbackTitle: 'Ops' });
      this.setState({ feedbackMensage: 'Houve um erro ao adicionar o paciente, tente novamente mais tarde' });
      this.handleClickOpen("classicModal");
    });
  }




  handleChangePassword(evt) {

    if (this.state.password.length < 5) {
      this.validInputs.password = false;
    } else if (this.isPassOk(evt.target.value)) {
      this.validInputs.password = true;
    }

    if (evt.target.id === 'password') {
      this.setState({
        password: evt.target.value.substring(0, 20)
      });
    }
  }

  isPassOk(params) {
    var lower = 0;
    var upper = 0;
    var digit = 0;
    for (var i = 0; i < params.length; i++) {
      if (params[i] === '0' || params[i] === '1' || params[i] === '2' || params[i] === '3' || params[i] === '4' || params[i] === '5' || params[i] === '6' || params[i] === '7' || params[i] === '8' || params[i] === '9') digit = 1;
      else if (params[i] === params[i].toLowerCase()) lower = 1;
      else if (params[i] === params[i].toUpperCase()) upper = 1;
    }
    return ((lower + upper + digit) === 3);
  }

  handleChangePasswordConfirm(evt) {
    if (this.state.passwordConfirmation.length < 5 || evt.target.value !== this.state.password) {
      this.validInputs.passwordConfirmation = false;
    } else {
      this.validInputs.passwordConfirmation = true;
    }
    if (evt.target.id === 'password_confirmation') {
      this.setState({
        passwordConfirmation: evt.target.value.substring(0, 20)
      });
    }
  }

  handleChangeSituation = sexo => event => {
    console.log(event.target.value)
    this.setState({ sexo: event.target.value },()=>{
      
    });
  };

  handleChangeDiscSituation = discSituation => event => {
    if (this.state.situation === 0) {
      this.setState({ [discSituation]: event.target.value });
      this.setState({ egresSituation: "" });
    } else {
      this.setState({ [discSituation]: "" });
      this.setState({ egresSituation: event.target.value });
    }


  };

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
    if (this.state.ok) {
      if (sessionStorage.getItem('jwtToken')) {
        this.props.history.push('/profile-page')
      } else {
        this.props.history.push('/home')
      }
    }
  }

  handleChangeCourse = course => event => {
    if (event.target.value === '') {
      this.validInputs.course = false;
    } else {
      this.validInputs.course = true;
    }
    this.setState({ [course]: event.target.value });
  };

  handleChangeUnity = unity => event => {
    if (event.target.value === '') {
      this.validInputs.unity = false;
    } else {
      this.validInputs.unity = true;
    }

    this.setState({ [unity]: event.target.value });

    this.getCourses(event.target.value)
  };

  handleChangeTrabalho = name => event => {
    this.setState({ toggleSituationState: (this.state.toggleSituationState === "desempregado" ? "trabalhando" : "desempregado") });
  };

  handleChangeDiscInstitution(evt) {
    if (evt.target.id === 'instituition') {
      this.setState({
        institution: evt.target.value.substring(0, 50)
      });
    }
  }
  handleChangeDiscFunction(evt) {
    this.setState({ cargo: evt.target.value });
  }

  handleChangeName(evt) {
    if (this.state.name.length < 2) {
      this.validInputs.name = false;
    } else {
      this.validInputs.name = true;
    }
    if (evt.target.id === 'name') {
      this.setState({
        name: evt.target.value.substring(0, 100)
      });
    }
  }

  handleChangeNomeMae(evt) {
    if (this.state.nomeMae.length < 2) {
      this.validInputs.nomeMae = false;
    } else {
      this.validInputs.nomeMae = true;
    }
    if (evt.target.id === 'nomeMae') {
      this.setState({
        nomeMae: evt.target.value.substring(0, 100)
      });
    }
  }

  handleChangeEndereco(evt) {
    if (this.state.endereco.length < 5) {
      this.validInputs.endereco = false;
    } else {
      this.validInputs.endereco = true;
    }
    if (evt.target.id === 'endereco' ) {
      this.setState({
        endereco: evt.target.value.substring(0, 400)
      });
    }
  }

  handleChangeAltura(evt) {
    if (this.state.altura.length < 2) {
      this.validInputs.altura = false;
    } else {
      this.validInputs.altura = true;
    }
    if (evt.target.id === 'altura' ) {
      this.setState({
        altura: evt.target.value.substring(0, 3)
      });
    }
  }
  onTimeChange(event, value) {
    const newTime = value.replace(/-/g, ':');
    const time = newTime.substr(0, 5);
    console.log(time)
    this.setState({time});
  }

  handleChangeCPF(evt) {
    if (this.cpfCanChange) {
      if (evt.target.id === 'cpf') {
        let cpfInput = evt.target.value;

        let caracter = (cpfInput.length == 3 || cpfInput.length == 7) ? '.' : '-';
        let toAppend = '';
        if (this.state.cpf.length < evt.target.value.length) {
          toAppend = (cpfInput.length == 3 || cpfInput.length == 7 || cpfInput.length == 11) ? caracter : '';
        }

        if (this.isANumber(evt.target.value) || this.state.cpf.length > evt.target.value.length) {
          this.setState({
            cpf: (cpfInput + toAppend).substring(0, 14)
          }, () => {
            if (this.isCPF(this.state.cpf)) {
              this.validInputs.cpf = true;
            } else {
              this.validInputs.cpf = false;
            }
            this.forceUpdate();
          });
        }
      }
    }
  }

  isCPF(cpf) {
    if (cpf == "000.000.000-0" || cpf == "000.000.000-00") return false;
    let re = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;

    if (!re.test(cpf)) return false;
    cpf = cpf.replace('.', '').replace('.', '').replace('-', '');
    var Soma = 0;
    var Resto = 0;
    var i;

    for (i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  

  }


  isANumber(str) {
    let a = str[str.length];
    if (a === '0' || a === '1' || a === '2' || a === '3' || a === '4' || a === '5' || a === '6' || a === '7' || a === '8' || a === '9' || a == null || a == "-") return true;
    else return false;
  }

  isAChar(str) {
    let a = str[str.length - 1];
    if ((a >= 'a' && a <= 'z') || (a >= 'A' && a <= 'Z')) return true;
    else return false;
  }

  handleChangeEmail(evt) {
    //#modifiquei (
    if (evt.target.id === 'email') {
      this.setState({
        email: evt.target.value.substring(0, 100)
      });
    }
    if (this.isEmail(evt.target.value)) {
      this.validInputs.email = true;
    } else {
      this.validInputs.email = false;
    }
    
    // )


  }

  /*
    isEmail
    Verifica a integridade do email, procura de trás para frente se tem ao menos um ponto até encontrar
    o caracter '@'.
 */
  //#modifiquei(
  isEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test((email));
  }
  //#modifiquei)
  handleChangeLinkedin(evt) {
    if (evt.target.id === 'linkedin') {
      this.setState({
        linkedin: evt.target.value.substring(0, 200)
      });
    }
  }

  handleChangeLattes(evt) {
    if (evt.target.id === 'lattes') {
      this.setState({
        lattes: evt.target.value.substring(0, 200)
      });

      
    }
  }

  handleChangeFacebook(evt) {
    if (evt.target.id === 'facebook') {
      this.setState({
        facebook: evt.target.value.substring(0, 200)
      });
    }
  }
  
  handleChangeImageURL(evt) {
    if (evt.target.id === 'image_url') {
      this.setState({
        imageURL: evt.target.value
      });
    }
  }
  handleChangeTelefone(evt) {
    if (evt.target.id === 'telefone' && this.isANumber(evt.target.value)) {
      var v = evt.target.value
      v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
      v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
      v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos      
      this.validInputs.telefone = true;
      this.setState({
        telefone: v.substring(0, 15)
        
      })
      } else {
        this.validInputs.telefone = false;
      }
      console.log(this.state.telefone)
    }
  

  handleChangeCep(evt) {
    if (evt.target.id === 'cep' && this.isANumber(evt.target.value)) {
      var v = evt.target.value
      v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
      v=v.replace(/(\d)(\d{3})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos  

      this.setState({
        cep: v.substring(0,9)
      });
    }
  }

  handleChangePeso(evt) {
    if (evt.target.id === 'peso' && this.isANumber(evt.target.value)) {
      var v = evt.target.value
      v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito

      this.setState({
        peso: v.substring(0, 3)
      });
    }
  }
  fileChangedHandler = (evt) => {
    this.file = evt.target.files[0];
    let readerFile = new FileReader();


    var fileReader = new FileReader();
    /* ESSE BLOCO NÃO FUNCIONA */
    /*fileReader.onloadend = function (e) {
      var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
      var header = "";
      for (var i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      if (header === "89504e47" || header === "47494638" || header === "ffd8ffe0" || header === "ffd8ffe1" ||
        header === "ffd8ffe2" || header === "ffd8ffe3" || header === "ffd8ffe8") {
        var file = this.file;
        if (file) {
          readerFile.readAsDataURL(file);
        }
      } else {
        this.file = null;
        alert("Tipo de arquivo invalido. Somente imagens .jpg/.png permitidas");
        return;
      }
    };*/

    /* FIM DO BLOCO */

    fileReader.readAsArrayBuffer(this.file);
    readerFile.onload = (e) => {

      this.setState({
        imageURL: e.target.result,
      });
    };
    readerFile.readAsDataURL(this.file);
  }
  step0Validation() {
    if (this.cpfCanChange) {
      if (this.state.cpf.length < 12) {
        this.validInputs.cpf = false;
        this.setState({ cpf: this.state.cpf });
      }
    }

    if (this.state.password.length < 6) {
      this.validInputs.password = false;
      this.setState({ password: this.state.password });
    }

    if (this.state.passwordConfirmation.length < 6 || this.state.passwordConfirmation !== this.state.password) {
      this.validInputs.passwordConfirmation = false;
      this.setState({ passwordConfirmation: this.state.passwordConfirmation });
    }

    if (this.state.name.length < 2) {
      this.validInputs.name = false;
      this.setState({ name: this.state.name });
    }

    if (this.validInputs.cpf
      && this.validInputs.password
      && this.validInputs.passwordConfirmation
      && this.validInputs.name
      && this.validInputs.email //#modifiquei
    ) {
      return true;
    }
    else {
      this.setState({ feedbackMensage: 'Para continuar é necessário preencher todos os campos obrigatórios (marcados com *).Os campos preenchidos incorretamente estarão em vermelho' });
      this.setState({ feedbackTitle: 'Ops!' });
      this.handleClickOpen("classicModal");
      return false;
    }
  }

  step1Validation() {
    if (!(parseInt(this.state.entryYear) >= 1960 && parseInt(this.state.entryYear) < 2600)) { //#modifiquei
      this.validInputs.entryYear = false;
      this.setState({ entryYear: this.state.entryYear });
    }
    if (this.state.unity === '') {
      this.validInputs.unity = false;
      this.setState({ unity: this.state.unity });
    }
    if(this.state.imageURL == ''){
      this.validInputs.image = false;
    } else this.validInputs.image = true;
    if (this.state.course === '') {
      this.validInputs.course = false;
      this.setState({ course: this.state.course });
    }

    //modifiquei
    if (this.state.entryYear > this.state.exitYear) {
      this.validInputs.exitYear = false;
      this.setState({ exitYear: this.state.exitYear });
    }
    if (this.validInputs.nomeMae
      ) {
      return true;
    } else {
      this.setState({ feedbackMensage: 'Para continuar é necessário preencher todos os campos obrigatórios corretamente. Campos obrigatórios estão marcados com *' });
      this.setState({ feedbackTitle: 'Ops' });
      this.handleClickOpen("classicModal");
      return false;
    }

  }

  step2Validation() {
    return true;
  }

  nextStep(evt) {
    evt.preventDefault();

    if (this.state.step !== 2) {
      if (this.state.step === 1) {//(2) se o usuário estiver na segunda etapa
        if (this.step1Validation()) {
          this.setState({ textButton: "Enviar" })
          this.setState({ step: (this.state.step + 1) % 3 });
        }
      } else {
        if (this.step0Validation()) {
          this.setState({ textButton: "Próximo" })//(1) se o usuário estiver na primeira etapa
          this.setState({ step: (this.state.step + 1) % 3 });
        }
      }
      //(3) se o usuário estiver na terceira etapa
    } else {
      if (this.step2Validation()) {
        this.addAluno()
      }
    }
  }


  backStep(evt) {
    evt.preventDefault();
    this.setState({ step: this.state.step - 1 });
    this.setState({ textButton: "Próximo" })
  }

  toggleSituation(evt) {
    evt.preventDefault();
    if (this.state.toggleSituationState === "desempregado" && evt.target.id !== "btnDesempregado") {

      this.setState({
        toggleSituationState: "trabalhando",
        situation: "trabalhando"
      });
    }
    else if (evt.target.id !== "btnTrabalhando") {

      this.setState({
        toggleSituationState: "desempregado",
        situation: "desempregado"
      });
    }
  }

  getOptions(options) {
    const list = options.map((option) =>
      <option value={option.id}>{option.nome}</option>
    )
    return list;
  }

  handleError(e) {
    e.target.src = profile;
    console.log(e.target.src)
  }

  render() {
    const { classes } = this.props;
    const cardTitles = ["Dados de Autenticação", "Dados Pessoais", "Dados Físicos"];
    const {time} = this.state;


    // map dos anos de entrada e saída

    let minOffset = 0, maxOffset = 60;  // maxOffset seta a quantidade de anos a serem mostrados a menos que o atual
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    };

    const yearList = allYears.map((x) => {return(<option name={x}>{x}</option>)});




    const optionsDisc = [
      { id: "nao_trabalha", nome: "Não Trabalha" },
      { id: "bolsista", nome: "Bolsista" },
      { id: "estagiario", nome: "Estagiário" },
      { id: "clt", nome: "CLT" },
      { id: "outros", nome: "Outros" },
    ];

    const optionsEgres = [
      { id: "nao_trabalha", nome: "Não Trabalha" },
      { id: "bolsista", nome: "Bolsista" },
      { id: "clt", nome: "CLT" },
      { id: "outros", nome: "Outros" },
    ];

    const themeSwitch = createMuiTheme({
      palette: {
        primary: { main: "#2fb4a9" }
      },
    });

    const theme = createMuiTheme({
      palette: {
        primary: { main: "#09FF00" }
      },
      select: {
        '&:before': {
          borderColor: { main: "#2fb4a9" },
        },
        '&:after': {
          borderColor: { main: "#2fb4a9" },
        }
      },
    });


    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    let authData = <CardBody className={classes.cardBody}>
      {this.cpfCanChange ?
        <CustomInput

          labelText="CPF *"
          id="cpf"
          //error = {!this.validInputs.cpf}
          error={!this.validInputs.cpf}
          value={this.state.cpf}
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: ((event) => this.handleChangeCPF(event)),
            type: "text",
            autoComplete: "off",
            autoFocus: true,
            endAdornment: (
              <InputAdornment position="end">
                <PersonOutline className={classes.inputIconsColor} />
              </InputAdornment>
            )
          }}
          
        /> : ''
        }
        <p className={classes.inputInfo}>Somente números.</p>
      <CustomInput
        helperText="Some important text"
        labelText="Senha *"
        id="password"
        error={!this.validInputs.password}
        formControlProps={{
          fullWidth: true,
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
      <p className={classes.inputInfo}>Pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula e um numero.</p>

      <CustomInput
        labelText="Confirmar senha *"
        id="password_confirmation"
        error={!this.validInputs.passwordConfirmation}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangePasswordConfirm(event)),
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

      <CustomInput
        labelText="Nome Completo *"
        id="name"
        error={!this.validInputs.name}
        value={this.state.nome}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeName(event)),
          type: "text",
          autoComplete: "new-password",
          endAdornment: (
            <InputAdornment position="end">
              <People className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />
      <CustomInput
        labelText="Email"
        id="email"
        error={!this.validInputs.email} //#modifiquei
        value={this.state.email}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeEmail(event)),
          type: "email",
          endAdornment: (
            <InputAdornment position="end">
              <Email className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />

    </CardBody>

    console.log("url:",this.state.imageURL)
    
    
    let personalData = <CardBody className={classes.cardBody}>
      <GridContainer justify="center">
        <GridItem xs={9} sm={9} md={9}>
          <div className={classes.containerImage}>
            <img onError={this.handleError} src={this.state.imageURL == undefined ?  profile : this.state.imageURL} alt="..." className={classes.imageProfile} />
          </div>
        </GridItem>
      </GridContainer>

      <div className={classes.buttonContainerCenter}>
        <input
          accept="image/*"
          className={classes.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={evt => this.fileChangedHandler(evt)}
        />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span" className={classes.button}>
            SUBIR IMAGEM
                            </Button>
        </label>
      </div>
     
     
      <CustomInput
        labelText="Telefone"
        id="telefone"
        error={!this.validInputs.telefone}
        value={this.state.telefone}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeTelefone(event)),
          type: "text",
          endAdornment: (
            <InputAdornment position="end">
              <Phone className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />
      <p className={classes.inputInfo}>Apenas números.</p>
      <CustomInput
        labelText="Nome da Mãe"
        id="nomeMae"
        error={!this.validInputs.nomeMae}
        value={this.state.nomeMae}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeNomeMae(event)),
          type: "text",
          endAdornment: (
            <InputAdornment position="end">
              <PregnantWomanIcon className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />
      <CustomInput
        labelText="Endereço"
        id="endereco"
        error={!this.validInputs.endereco}
        value={this.state.endereco}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeEndereco(event)),
          type: "text",
          endAdornment: (
            <InputAdornment position="end">
              <PlaceIcon className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />

      <CustomInput
        labelText="CEP"
        id="cep"
        error={!this.validInputs.cep}
        value={this.state.cep}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeCep(event)),
          type: "text",
          endAdornment: (
            <InputAdornment position="end">
              <HomeIcon className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />



      

      {/* <FormControl className={classes.formControl}>
        <MuiThemeProvider theme={theme}>
          <InputLabel
            className={!this.validInputs.exitYear ? classes.danger : ""}
          >
            Ano de saida *
          </InputLabel>
          <Select
            native
            value={this.state.exitYear}
            error={!this.validInputs.exitYear}
            onChange={this.handleChangeExitYear("exitYear")}
            inputProps={{
              name: "exitYear",
              id: "exit_year"
            }}
          >
            <option value="" />
            {yearList}
          </Select>
        </MuiThemeProvider>
      </FormControl> */}

    </CardBody>



    let professionalData = <CardBody className={classes.cardBody}>  
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="situation-for">Sexo</InputLabel>
            
            <Select
            formControlProps={{
              fullWidth: true
            }}
              native
              value={this.state.sexo}
              onChange={this.handleChangeSituation('sexo')}
              inputProps={{
                name: 'sexo',
                id: 'sexo-for',
              }}
            >
              <option value="" />
              <option value={0}>Masculino</option>
              <option value={1}>Feminino</option>

            </Select>
          </FormControl>

      <CustomInput
        labelText="Peso (Kg)"
        id="peso"
        value={this.state.peso}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangePeso(event)),
          type: "text",
          endAdornment: (
            <InputAdornment position="end">
              <VerticalAlignBottomIcon className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />

      <CustomInput
        labelText="Altura (cm)" 
        id="altura"
        value={this.state.altura}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeAltura(event)),
          type: "text",
          endAdornment: (
            <InputAdornment position="end">
              <AccessibilityNewIcon className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />
      
        <h5>Horário da Medicação:</h5>
        
          <TimeField
            value={time}
            onChange={this.onTimeChange}
            style={{
              border: '1px solid grey',
              fontSize: 12,
              width: 107,
              padding: '5px 8px',
              color: '#333',
              borderRadius: 3
            }}
          />
        
                
        
        
    

      {/* <GridContainer>
        <GridItem xm={6} sm={6} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="situation-disc-for">Situação Trabalhista</InputLabel>
            <Select
              native
              value={this.state.situation === 0 ? this.state.discSituation : this.state.egresSituation}
              onChange={this.handleChangeDiscSituation('discSituation')}
              inputProps={{
                // disabled: (this.state.toggleSituationState === "trabalhando"?false:true),
                name: 'discSituation',
                id: 'situation-disc-for',
              }}
            >
              <option value="" />
              {this.state.situation === 0 ? this.getOptions(optionsDisc) : this.getOptions(optionsEgres)}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xm={6} sm={6} md={6}>
          <CustomInput
            labelText="Cargo"
            id="disc_function"
            value={this.state.cargo}
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: ((event) => this.handleChangeDiscFunction(event)),
              type: "text",
              // disabled: (this.state.toggleSituationState === "trabalhando"?false:true),
              endAdornment: (
                <InputAdornment position="end">
                  <img alt='...' src={employee} className={classes.inputIconsColor} />
                </InputAdornment>
              )
            }}
          />
        </GridItem>
      </GridContainer>
      <CustomInput
        labelText="Instituição"
        id="instituition"
        value={this.state.institution}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeDiscInstitution(event)),
          type: "text",
          // disabled: (this.state.toggleSituationState === "trabalhando"?false:true),
          endAdornment: (
            <InputAdornment position="end">
              <AccountBalance className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />
      <CustomInput
        labelText="Linkedin"
        id="linkedin"
        value={this.state.linkedin}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeLinkedin(event)),
          type: "text",
          // disabled: (this.state.toggleSituationState === "trabalhando"?false:true),
          endAdornment: (
            <InputAdornment position="end">
              <img alt='...' src={linkedin} className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      />
      <CustomInput
        labelText="Lattes url.."
        id="lattes"
        value={this.state.lattes}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: ((event) => this.handleChangeLattes(event)),
          type: "text",
          // disabled: (this.state.toggleSituationState === "trabalhando"?false:true),
          endAdornment: (
            <InputAdornment position="end">
              <Description className={classes.inputIconsColor} />
            </InputAdornment>
          )
        }}
      /> */}
    </CardBody>


    let voltar = null;
    if (this.state.step !== 0) {
      voltar = <Button disabled={this.state.step === 0 ? true : false} onClick={this.backStep.bind(this)} color="secondary" size="md" className={classes.buttonBack}>
        voltar
      </Button>
    }
    return (
      <div>
        {/* <Navbar page={"register"} /> */}
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

              <GridItem xs={12} sm={12} md={7} lg={5}>
                <Card className={classes[this.state.cardAnimaton]}>

                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>{cardTitles[this.state.step]}</h4>
                    </CardHeader>
                    {this.state.step === 0 ? authData : ""}
                    {this.state.step === 1 ? personalData : ""}
                    {this.state.step === 2 ? professionalData : ""}

                    <CardFooter className={classes.cardFooter}>
                      {voltar}
                      <Button onClick={this.nextStep.bind(this)} color="primary" size="md" className={classes.buttonNext}>
                        {this.state.textButton}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
            <Dialog
              classes={{
                root: classes.center,
                paper: classes.modal
              }}
              open={this.state.classicModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => this.handleClose("classicModal")}
              aria-labelledby="classic-modal-slide-title"
              aria-describedby="classic-modal-slide-description"
            >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
              >
                <IconButton
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => this.handleClose("classicModal")}
                >
                  <Close className={classes.modalClose} />
                </IconButton>
                <div><h4 className={[classes.modalTitle, (this.state.modalTitle === "Ops" ? classes.danger : '')]}>{this.state.feedbackTitle}</h4></div>
              </DialogTitle>
              <DialogContent
                id="classic-modal-slide-description"
                className={classes.modalBody}
              >
                <p>
                  {this.state.feedbackMensage}
                </p>
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                <Button
                  onClick={() => this.handleClose("classicModal")}
                  color="primary"
                  simple
                >
                  OK
                      </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(RegisterPage);