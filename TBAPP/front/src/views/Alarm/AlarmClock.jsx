'use strict';
import debounce from 'lodash.debounce'
import React from 'react';

import Reminder from "../Alarm/Reminder"
import color from '@material-ui/core/colors/purple';
import axios from 'axios';
import GLOBAL from 'global';
const token = sessionStorage.getItem('jwtToken');
var h
var x
//allow react dev tools work
window.React = React;
var data= new Date
    var dia=data.getDate()
    var mes= data.getMonth()
    var ano=data.getFullYear() 
    var date=dia+'-'+(mes+1)+'-'+ano


class AlarmClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      alarmTime: '',
      ignore: true,
      remind:true,
      tomouQuantas:0,
      title: 'TirasEstá na hora de você tomar seus medicamentos!'
    };
    
    axios.get(`${GLOBAL.API_URL}/getalarme`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
      .then((response) => {
        
          this.setState({
            alarmTime:response.data.Set_Alarm,
            
          })
          
          
      })
      .catch(error => {
        console.log(error)
      })
  }
 
  componentDidMount(){
    
    this.clock = setInterval(
      () => this.setCurrentTime(),
      1000
    )
    // this.interval = setInterval(
    //   () => this.checkAlarmClock(),
    // 1000)
    
     
    
}
    componentWillUnmount(){
    clearInterval(this.clock);
    clearInterval(this.interval);
  
  }
  setCurrentTime(){
    this.setState({
      currentTime: new Date().toLocaleTimeString('pt-BR', {timeZone: 'America/Manaus'})
    });
  }
  setAlarmTime(event) {
    event.preventDefault();
    const inputAlarmTimeModified = this.state.alarmTime
    this.setState({
      alarmTime: inputAlarmTimeModified
    })
  }

  async checkAlarmClock(){
    axios.get(`${GLOBAL.API_URL}/tratamento/${date}`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
    
      .then((response) => {
        console.log(response)
        this.setState({
          tomouQuantas:response.data.Ingestao,
          // qtddDePilulas:response.data.Receita,
          
        })
        console.log("Ingeriu: ",this.state.tomouQuantas)
        // console.log("A ingestao desse paciente é",this.state.tomouQuantas)
        
      })

      .catch(error => {
        console.log(error)
      })

      if(this.state.alarmTime == 'undefined' || !this.state.alarmTime) {
        this.alarmMessage = "";
      } else {
        this.alarmMessage = "" + this.state.alarmTime + ".";
        if(this.state.currentTime=== this.state.alarmTime + ":00") {
          console.log('check')
        } 
        
      }   
    }

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
    axios.get(`${GLOBAL.API_URL}/getalarme`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
      .then((response) => {
          console.log('response.data.Set_Alarm ',response.data.Set_Alarm)
          this.setState({
            alarmTime:response.data.Set_Alarm
          })
          // console.log('alarmtime',this.setState.alarmTime)
          
      })
      .catch(error => {
        console.log(error)
      })
  }
  handlePermissionDenied(){
    console.log('Permission Denied');
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    console.log('Web Notification not Supported');
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }u 

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
    if(e.type === 'close'){
      console.log('fechou')
      this.remember=true
      
    }
  }

  handleNotificationOnShow(e, tag){
    
    console.log(e, 'Notification shown tag:' + tag);
    
    
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

   notifyme(){
    
    
     
    
  }

async teste(){
    
    var data= new Date
    var dia=data.getDate()
    var mes= data.getMonth()
    var ano=data.getFullYear() 
    var date=dia+'-'+(mes+1)+'-'+ano
    console.log('get dia',date)
    await axios.get(`${GLOBAL.API_URL}/tratamento/${date}`,{
      headers: {
        'x-api-key': 'eiWee8ep9due4deeshoa8Peichai8Eih',
        'x-access-token': token
      }
    })
    
      .then((response) => {
        console.log(response)
        this.setState({
          tomadas:response.data.Ingestao
          
        })
        console.log("A ingestao desse paciente é: ",this.state.tomadas)
        
      })

      .catch(error => {
        console.log(error)
      
      })
  
      
  }
  


async snooze(){
h= setTimeout(() => {
  console.log('esperei')
}, 10000);
}
  render() {
    
    return (
      <div>
        {this.state.currentTime  && this.state.tomouQuantas === 0  ? 
         this.notifyme()
        :null}
        
      </div>
        
    )
  }
};
export default AlarmClock