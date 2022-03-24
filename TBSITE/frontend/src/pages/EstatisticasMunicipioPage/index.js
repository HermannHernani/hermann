import React, { useState } from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import './style.css'


function EstatisticasMunicipioPage() {
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
            
            <Container width="150vh" height="100%">
            <h2>Estatisticas Municipais</h2>
                <table className="table">
                  <thead className="header">
                  <tr>
                      <td>CADASTRADOS</td>
                      <td>ATIVOS</td>
                      <td>INATIVOS</td>
                      <td>EM ACOMPANHAMENTO</td>
                      <td>EM ALERTA</td>
                      <td>ABANDONO</td>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                        <td>200</td>
                        <td>190</td>
                        <td>10</td>
                        <td>190</td>
                        <td>3</td>
                        <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </Container>
      
        </div>
  );
}
export default EstatisticasMunicipioPage;