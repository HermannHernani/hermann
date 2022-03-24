import React, { useState } from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header'
import Container from '../../components/Container'
import profile from '../../assets/img/marca.png'
import './styles.css'
function MainPage() {
  const [open, setOpen] = useState(false);
  return (
  
        <div className="home-body">
            <div>
            <Header></Header>
                <Burger open={open} setOpen={setOpen} />
                <Menu open={open} setOpen={setOpen} />
            
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Container width='50%' height='50%' className="container">
                <h2> Bem vindo ao TB SITE</h2>
                <img src={profile} className="logo-photo" alt="profile logo"></img>
                <br></br>
                <br></br>
                <p >Site de monitoramento e avaliação do uso da ferramenta TBApp por profissionais de saúde da <br></br> Atenção Primária da Secretaria Municipal de Saúde de Manaus</p>
              
            
            </Container>
      
        </div>
  );
}
export default MainPage;