'use strict';
import debounce from 'lodash.debounce'
import React from 'react';
import Notification  from '../ComponentsSempreUEA/Notification';
import color from '@material-ui/core/colors/purple';
import axios from 'axios';
import GLOBAL from 'global';
const token = sessionStorage.getItem('jwtToken');

//allow react dev tools work
window.React = React;
var data= new Date
    var dia=data.getDate()
    var mes= data.getMonth()
    var ano=data.getFullYear() 
    var date=dia+'-'+(mes+1)+'-'+ano
class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
      alarmTime: '',
      ignore: true,
      remind:false,
  
      title: `Você ainda não tomou seus medicamentos de hoje (${date})`
    };
   
  }

  componentDidMount(){
    
    this.clock = setInterval(
      () => this.setCurrentTime(),
      1000
    )
    this.interval = setInterval(
      () => this.notifyme(),
    1000)
    
    
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

 
    

  handlePermissionGranted(){
    console.log('Permission Granted');
    this.setState({
      ignore: false
    });
   
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
    setTimeout(() => {
      console.log('show')

      console.log(e, 'Notification closed tag:' + tag);
    }, 50000);
    
    
  }

  handleNotificationOnShow(e, tag){
    setTimeout(() => {
      console.log('show')

    console.log(e, 'Notification shown tag:' + tag);
    }, 50000);
   
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

   notifyme(){
    
    //=== this.state.alarmTime + ":00"
    if(this.state.currentTime ){
      
      return( 
        
      <div>
        <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={200000}
          title={this.state.title}
          options={this.state.options}
          swRegistration={this.props.swRegistration}
        />
        {/* <audio id='sound' preload='auto'>
          <source src='./sound.mp3' type='audio/mpeg' />
          <source src='./sound.ogg' type='audio/ogg' />
          <embed hidden={true} autostart='false' loop={false} src='./sound.mp3' />
        </audio>  */}
      </div>
      
        )
        
    }

    
  }
  render() {

    return (
      <div>
        {this.state.currentTime  ? 
        this.notifyme()
        :null}
        
      </div>
        
    )
  }
};
export default Reminder