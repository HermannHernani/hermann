import React from "react";
import classNames from "classnames";
import moment, { relativeTimeThreshold } from "moment";
import "./CalendarStyle.css";
import 'moment/locale/pt-br'
import withStyles from "@material-ui/core/styles/withStyles";

import InputAdornment from "@material-ui/core/InputAdornment";
import GLOBAL from 'global';
import axios from 'axios';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Button from "components/CustomButtons/Button.jsx";


import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import loginPageStyle from "views/ComponentsSempreUEA/LoginStyle.jsx";

import Pilula from 'assets/img/pilula.png';
import PilulaCheck from 'assets/img/pilulaCheck.png';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import color from "@material-ui/core/colors/amber";

moment.locale('pt-br');
let localeData = moment.localeData()
const initialState = { date: moment(), desc: "" }
const token = sessionStorage.getItem('jwtToken');
var h
var pilulas

class Calendar extends React.Component {
  weekdayshort = localeData.weekdaysShort();
 
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      showYearTable: false,
      showMonthTable: false,
      showDateTable: true,
      dateToday: moment(),
      dateObject: moment(),
      allmonths: moment.months(),
      selectedDay: null,
      selectedDayString: null,
      desc: "",
      tasks: [],
      showPopup: false,
      cardAnimaton: "cardHidden",
      pills: [],
      tomouQuantas:0,
      qtddDePilulas:0,
      sleep:false,
      currentTime: '',
      alarmTime: '',
      hasToShowAlarm: false,
      alarmMessage: 'Está na hora de tomar seus medicamentos',
      naoTomouMes: [],
      tomouMes: [],
      firstAlert: true,
      inicioDoTratamento: '4-03-2020',
      fimDoTratamento: '4-05-2020',
    };
    
    
  }
 
componentDidMount(){
  clearTimeout(h)
  axios.get(`${GLOBAL.API_URL}/paciente`,{
    headers: {
      'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
      'x-access-token': token
    }
  })
  .then((response) => {
    this.setState({
      cpf:response.data.cpf,
      name:response.data.nome,
      peso:response.data.peso
    })
    alert(`Bem vindo(a) ${this.state.name}!`)
    this.setState({qtddDePilulas: this.calcularMedicacao()})
    this.getDiasNaoTomados()
  })
  .catch(error => {
    console.log(error)
    alert('Aguarde enquanto as informações do paciente estão sendo carregadas ')
    
    h= setTimeout("location.reload(true);",100)
  })
  this.clock = setInterval(
    () => this.setCurrentTime(),
    1000
  )
 
    this.alarm()
}
async alarm(){
  await axios.get(`${GLOBAL.API_URL}/getalarme`,{
    headers: {
      'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
      'x-access-token': token
    }
  })
    .then((response) => {
      
      this.setState({
        alarmTime:response.data.Set_Alarm+':00'
      })
      
    })
    .catch(error => {
      console.log(error)
    })
    var data = new Date
    var dia = data.getDate()
    var mes = data.getMonth()
    var ano = data.getFullYear() 
    var date = dia+'-'+(mes+1)+'-'+ano
   
    axios.get(`${GLOBAL.API_URL}/tratamento/${date}`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    }).then((response) => {
        this.setState({
          tomouQuantas:response.data.Ingestao,
        })
        
    }).catch(error => {
      console.log(error)
    })
    this.setCurrentTime();
    
    if(this.state.currentTime === this.state.alarmTime  && this.state.tomouQuantas ===0){
      new Notification(this.state.alarmMessage);
    }
    setInterval(()=>{
      this.setCurrentTime();
      this.setTreatment();
     
      if(this.state.currentTime>= this.state.alarmTime  && this.state.tomouQuantas === 0){
         this.notifyme();
         
      }
    }, 300000)
}
async setTreatment(){
  
  var data = new Date
  var dia = data.getDate()
  var mes = data.getMonth()
  var ano = data.getFullYear() 
  var date = dia+'-'+(mes+1)+'-'+ano
  console.log(date)
  await axios.get(`${GLOBAL.API_URL}/tratamento/${date}`,{
    headers: {
      'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
      'x-access-token': token
    }
  }).then((response) => {
      this.setState({
        tomouQuantas:response.data.Ingestao,
      })
      
  }).catch(error => {
    console.log(error)
    this.setState({
      tomouQuantas:0,
    })
  })
  
}

setAlarm(){
  axios.get(`${GLOBAL.API_URL}/getalarme`,{
    headers: {
      'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
      'x-access-token': token
    }
  })
    .then((response) => {
      
      this.setState({
        alarmTime:response.data.Set_Alarm+':00'
      })
      
    })
    .catch(error => {
      console.log(error)
    })
}

  // newdate = year + "/" + month + "/" + day;
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };
  year = () => {
    return this.state.dateObject.format("Y");
  };
  currentDay = () => {
    return this.state.dateObject.format("D");
  };
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d"); // Day of week 0...1..5...6
    return firstDay;
  };
  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  showMonth = (e, month) => {
    this.setState({
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
  };
  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable
    });
    
  };
  MonthList = props => {
    let months = [];
    props.data.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
      this.getDiasNaoTomados()});
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Selecione um Mês</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };
  
  notifyme(){
    
    
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }
    
    // Let's check whether notification permissions have alredy been granted
    else if (Notification.permission === "granted" && this.state.currentTime ) {
      // If it's okay let's create a notification
      var notification = new Notification(this.state.alarmMessage);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied' || Notification.permission === "default") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Está na hora de tomar seus medicamentos!");
        }
      });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  
  
}

  showYearTable = e => {
    this.setState({
      showYearTable: !this.state.showYearTable,
      showDateTable: !this.state.showDateTable
    });
  };

  onPrev = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });
  };
  onNext = () => {
    let curr = "";
    if (this.state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });

  };
  
  setYear = year => {
    // alert(year)
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
      showMonthTable: !this.state.showMonthTable,
      showYearTable: !this.state.showYearTable
    });
  };
  onYearChange = e => {
    this.setYear(e.target.value);
  };
  getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }
  YearTable = props => {
    let months = [];
    let nextten = moment()
      .set("year", props)
      .add("year", 12)
      .format("Y");

    let tenyear = this.getDates(props, nextten);

    tenyear.map(data => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={e => {
            this.setYear(data);
          }}
        >
          <span>{data}</span>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i == 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colSpan="4">Selecione um Ano</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };
  setCurrentTime(){
    this.setState({
      currentTime: new Date().toLocaleTimeString('pt-BR', {timeZone: 'America/Manaus'})
      
    });
    
  }
  handleChangeTask(evt) {
    this.setState({
      desc: evt.target.value.substring(0, 200)
    });
  };
  async  onDayClick (e, d) {
 
    var dia=d
    var data= new Date
    var mes= data.getMonth()
    var ano=data.getFullYear() 
    var date=dia+'-'+(mes+1)+'-'+ano
    var getTratament= await axios.get(`${GLOBAL.API_URL}/tratamento/${date}`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
    
      .then((response) => {
        this.setState({
          tomouQuantas:response.data.Ingestao,      
        })
      
      })

      .catch(error => {
        console.log(error)
      })
    
    // console.log('get',this.getTratament)
    var pillsX = []
    for (let i = 0; i < this.state.qtddDePilulas; i++) {
      pillsX.push(true)
    }
    for (let i = 0; i < this.state.tomouQuantas; i++) {
      pillsX[i]= false
    }
    this.setState(
      {
        desc: "",
       
        selectedDay: d,
        pills: pillsX,
      },

      
      () => {

      
        
      }
      
    );

    
  };

  handleShowAlert() {
    let mensages = ["Faça o exame de escarro no final de cada mês!", "Pessoas que moram com você precisam ser examinadas!",
     "Evite lugares fechados e sem ventilação!", "Náuseas, vômitos e dor de estômago?! Procure um posto de saúde.", "Nas primeiras semanas, você vai se sentir melhor!", 
     "Nas primeiras semanas você vai se sentir melhor.", "Você já fez o exame de HIV/AIDS?", "O principal sintoma da tuberculose é a tosse!", "A medicação deve ser tomada no mesmo horário em dose única.",
    "Não precisa separar pratos, talheres e copos!", "É necessário completar todo o tratamento para ser curado!"]

    var aleatorio = Math.floor(Math.random() * 10)
    if(this.state.qtddDePilulas == this.state.tomouQuantas){
      var tomouTudo =true
    }
    else{
      var tomouTudo = false
    }

    this.setState({
      alertMesage: tomouTudo? mensages[aleatorio]: "NEM TODAS AS PILULAS FORAM TOMADAS OU SELECIONADAS!!!",
      showAlert: !this.showAlert

    });
  };


  pillPress(index) {
    let pillsMod = this.state.pills
    pillsMod[index] = !this.state.pills[index]
    var tomouQuantasX = this.state.tomouQuantas

    if (this.state.pills[index] === true){
      pillsMod[index] = !this.state.pills[index]
      alert('Não é possível desmarcar as pílulas que já foram tomadas!!!')}
    else{
      if(tomouQuantasX < this.state.qtddDePilulas){
        
        tomouQuantasX = tomouQuantasX + 1
      }
    }

    
   
    this.setState({
      pills: pillsMod,
      tomouQuantas: tomouQuantasX,
      
    })
    console.log('index ',index)
    console.log('this.state.pills ',this.state.pills)
    console.log('pillsMod ',pillsMod)
    console.log('pillsMod[index] ',pillsMod[index])
    console.log('tomouQuantasX ',tomouQuantasX)
  };
  
  
  addTask() {
    var dia=this.state.selectedDay
    var data= new Date
    var mes= data.getMonth()
    var ano=data.getFullYear() 
    var date=dia+'-'+(mes+1)+'-'+ano
    let description = this.state.desc
    let dateT = this.state.dateObject


    const task = this.state.tasks
    const token = sessionStorage.getItem('jwtToken');
    task.push({ dateT, description })



    this.setState({
      tasks: task,
      showPopup: !this.state.showPopup,
    })
    let days=this.state.dateObject.daysInMonth()
    
    axios.post(`${GLOBAL.API_URL}/register/tratamento`, {
      ingestao: this.state.tomouQuantas,
      dia: date 
      
    }, {
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
      .then((response) => {
        this.setState({
          
          tomouQuantas:response.data.Ingestao,
          qtddDePilulas: this.state.qtddDePilulas
          
        })

      })
      
      .catch(error => {
        
        console.log(error)
        
      })

      
  }
  
  

  getTratamento(d){
    var dia=this.state.selectedDay
    var data= new Date
    var mes= data.getMonth()
    var ano=data.getFullYear() 
    var date=dia+'-'+(mes+1)+'-'+ano
    axios.get(`${GLOBAL.API_URL}/tratamento/${date}`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
    
      .then((response) => {
        this.setState({
          tomouQuantas:response.data.Ingestao,
          
          
        })
        this.tomadas=this.state.tomouQuantas
        
      })

      .catch(error => {
        console.log(error)
        this.state.tomouQuantas=0
      })
    
    
  }
  showreminder(){
    setInterval(()=>{
        if(this.state.tomouQuantas === 0){
          this.setState({
            sleep:true,
            ja:true
          })
        }
       
        
      },50000)
    }

   async getDiasNaoTomados(){
    
      var mes= parseInt(this.state.dateObject.format("MM"))
      var ano= parseInt(this.state.dateObject.format("YYYY"))
      var date=mes+'-'+ano
      
      await axios.get(`${GLOBAL.API_URL}/datas/${date}`,{
        headers: {
          'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
          'x-access-token': token
        }
      })
      
        .then((response) => {
          console.log(response)
          
          var diasDoMesNaoTomados= new Array()
          var diasDoMesTomados = new Array()
          for (var i =0; i <= response.data.length - 1; i++){
            var aux = Object.values(response.data[i])
            console.log('aux',aux)
            if (aux[1] < this.state.qtddDePilulas){
              diasDoMesNaoTomados[i]=parseInt(aux[0].charAt(0)+aux[0].charAt(1))
            }
            if (aux[1] === this.state.qtddDePilulas){
              diasDoMesTomados[i]=parseInt(aux[0].charAt(0)+aux[0].charAt(1))
            }
            console.log('Dias do mes',diasDoMesNaoTomados)
          }
            this.setState({
              naoTomouMes: diasDoMesNaoTomados,
              tomouMes: diasDoMesTomados
              
            })
            console.log('nao tomado',this.state.naoTomouMes)
        })

        .catch(error => {
          console.log(error)
        })
    
  }

 calcularMedicacao(){
    var peso=this.state.peso
    
    if(20<=peso || peso>=35){
      pilulas=2
    }
    if(36<=peso || peso>=50){
      pilulas=3
    }
    if(51<=peso || peso >=70){
      pilulas=4
    }
    if(peso>70){
      pilulas=5
    }
    this.setState({
      qtddDePilulas:pilulas
    })
    console.log('aqui',this.state.qtddDePilulas)
    return pilulas;
   
    
  }
 
 

  render() {

    const stylePage = {
      container: {      
        zIndex: "2",
        position: "center",
        paddingTop: "80vh",
        color: "#FFFFFF"
      },
      buttonNext: {
        marginLeft: "50%",
      },
      navImageClassesSmall:{
        width: "65px",
        height: "60px",
        objectFit: "cover",
      },
      pillStyle:{
        marginBottom:'20px',
        marginLeft:'10px',
        marginRight:'10px',
        position: 'relative',
      },
      btn:{
        backgroud: '#f0000',     
        opacity: 1,
      },
    }
    const { classes } = this.props;
    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty">{""}</td>);
    }
    let daysInMonth = [];
    
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = (
        this.state.naoTomouMes.includes(d) ? "ntomou" :
        this.state.tomouMes.includes(d) ? "today" :
        null
        )
        
      if (d == this.currentDay() && parseInt(this.state.dateObject.format("MM")) == parseInt(this.state.dateToday.format("MM")) ){
        currentDay = "today"
      }
      var dataInicio = this.state.inicioDoTratamento.split("-")
      var diaInicio = parseInt(dataInicio[0])
      var mesInicio = parseInt(dataInicio[1])
      var anoInicio = parseInt(dataInicio[2])

      var dataFim = this.state.fimDoTratamento.split("-")
      var diaFim = parseInt(dataFim[0])
      var mesFim = parseInt(dataFim[1])
      var anoFim = parseInt(dataFim[2])
      if (d == diaInicio && mesInicio == parseInt(this.state.dateObject.format("MM")) && anoInicio == parseInt(this.state.dateObject.format("YYYY"))){
        currentDay = "prazo"
      }
      if (d == diaFim && mesFim == parseInt(this.state.dateObject.format("MM")) && anoFim == parseInt(this.state.dateObject.format("YYYY"))){
        currentDay = "prazo"
      }
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span
            onClick={e => {
              console.log('d',d)
              console.log('current',this.currentDay())

              if(d == this.currentDay() && this.state.naoTomouMes.includes(d) ? "ntomou" : ""){
              this.onDayClick(e, d);
              this.setState({
                showPopup: !this.state.showPopup})}
              if(d != this.currentDay()){
                this.setState({naoTomouAlert: !this.state.naoTomouAlert})}
            }
            
          }
          >
            {d}
          </span>
        </td>
      );
    }
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });
   
    return (
      
      <div> 
        {this.state.qtddDePilulas != this.state.tomouQuantas ? 
      <Dialog
      open={this.state.firstAlert}
      onClose={!this.state.firstAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      
      <DialogContent>
        <DialogContentText id="alert-dialog-tilte">
          Você já tomou seus remédios hoje?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={() => {
          var today = this.currentDay()
          this.onDayClick(null, Number(today))
          this.state.tomouQuantas = this.state.qtddDePilulas
          this.setState({firstAlert: !this.state.firstAlert, showPopup: !this.state.showPopup})
        }} color="primary" autoFocus>
          SIM
        </Button>
        <Button onClick={() => {
          var today = this.currentDay()
          this.onDayClick(null, Number(today))
          this.setState({firstAlert: !this.state.firstAlert, showPopup: !this.state.showPopup})
        }} 
        color="primary" autoFocus>
          NÃO
        </Button>
      </DialogActions>
      </Dialog>
      : null
      }

      {this.state.naoTomouAlert ? 
      <Dialog
      open={this.state.naoTomouAlert}
      onClose={!this.state.naoTomouAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      
      <DialogContent>
        <DialogContentText id="alert-dialog-tilte">
          Os dias anteriores em que os remedios foram tomados aparecerão em VERDE. 
          <br></br>
          <br></br>
          Os dias em que os remedios não foram tomados aparecerão em VERMELHO. 
          <br></br>
          <br></br>
          E os dias anteriores ao inicio do tratamento e dias futuros aparecerão em BRANCO.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.setState({naoTomouAlert: !this.state.naoTomouAlert})} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
      </Dialog>
      : null
      }      

      {!this.state.showPopup ?
      <div className="tail-datetime-calendar">
        <Card className={classes[this.state.cardAnimaton, classes.cardLogin]} style={{marginTop: '8px'}} >
        <CardBody style={{padding: '1vh'}} >
          <h4 style={{fontSize: '15px', fontFamily: 'sans-serif', fontStyle: 'bold' }} align="center" font-weight= 'bold'><b>TOQUE EM UMA DATA PARA EXIBIR AS INFORMAÇÕES</b></h4>
        </CardBody>
      </Card>
      <Card style={{marginTop: '-25px', marginBottom: '0px',}}>
      
        <div className="calendar-navi">
          <span
            onClick={e => {
              this.onPrev();
              this.getDiasNaoTomados()
            }}
            class="calendar-button button-prev"
          />
          {!this.state.showMonthTable && (
            <span
              onClick={e => {
                this.showMonth();
              }}
              class="calendar-label"
            >
              {this.month()}
            </span>
          )}
          <span className="calendar-label" onClick={e => this.showYearTable()}>
            {this.year()}
          </span>
          <span
            onClick={e => {
              this.onNext();
              this.getDiasNaoTomados()
            }}
            className="calendar-button button-next"
          />
        </div>
        
        <div className="calendar-date">
          {this.state.showYearTable && <this.YearTable props={this.year()} />}
          {this.state.showMonthTable && (
            <this.MonthList data={moment.months()} />
          )}
        </div>
          
        {this.state.showDateTable && (
          <div className="calendar-date">
            <table className="calendar-day">
              <thead>
                <tr>{weekdayshortname}</tr>
              </thead>
              <tbody>{daysinmonth}</tbody>
            </table>
          </div>
        )}
        </Card>
        </div>
        : null
      }
      {this.state.showAlert?
        <Dialog
        open={this.state.showAlert}
        onClose={this.state.showAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"CONTINUE O TRATAMENTO!"} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.alertMesage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({showAlert: !this.state.showAlert})} color="primary" autoFocus>
            FECHAR
          </Button>
        </DialogActions>
        </Dialog>
        : null}
        <div >
        
        {this.state.showPopup ?
            <GridContainer justify={'center'}>
              <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[this.state.cardAnimaton, classes.cardLogin]} style={{marginTop: '8px'}} >
                {/* {this.getTratamento()} */}
                <CardBody >
                  <h4 style={{fontSize: '15px'}}>Seu tratamento são {this.state.qtddDePilulas} comprimidos uma vez ao dia (em dose única).</h4>
                  <h4 style={{fontSize: '15px'}}>Após tomar, selecione as pílulas e confirme</h4>
                  
                </CardBody>
              </Card>
              <Card className={classes[this.state.cardAnimaton, classes.cardLogin]} style={{marginTop: '-20px'}} >
              <CardBody >
                <GridContainer justify={'center'} flex={1}>
                  
                  {this.state.pills.map((p, index) =>
                    <GridItem xs={3} sm={12} md={12} style={stylePage.pillStyle}>
                      <button onClick={() => this.pillPress(index) }>
                        {p ?   
                          <img onError={this.handleError} src={Pilula} style={stylePage.navImageClassesSmall}/>
                        : <img onError={this.handleError} src={PilulaCheck} style={stylePage.navImageClassesSmall}/>
                        }
                         
                      </button>
                    </GridItem>
                  )}

                </GridContainer>
                <Button
                  onClick={() => {
                    this.addTask() 
                    this.handleShowAlert()
                    this.getDiasNaoTomados()
                  }}
                  color="primary" size="lg" className={stylePage.buttonNext} fullWidth="true">
                  Confirma
  
                </Button>
                <Button
                  onClick={() => this.setState({showPopup: !this.state.showPopup}) }
                  color="danger" size="lg" className={stylePage.buttonNext} fullWidth="true">
                  Cancelar
  
                </Button>
                
              </CardBody>
              </Card>
              </GridItem>
            </GridContainer>
          : null
        }

       
      </div>
      </div>);
      <br/>
  }
}
export default withStyles(loginPageStyle)(Calendar);