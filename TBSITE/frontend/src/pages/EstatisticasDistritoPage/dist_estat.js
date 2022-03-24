import React, {useState} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import './style.css'



function Dist_estat() {
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
            <h2>Estatisticas do Distrito Selecionado</h2>
                <table className="table">
                  <thead className="header">
                  <tr>
                      <td>QTD UNIDADES</td>
                      <td>CADASTRADOS</td>
                      <td>ATIVOS</td>
                      <td>INATIVOS</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                        <td>100</td>
                        <td>50</td>
                        <td>100</td>
                        <td>2</td>
                        <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </Container>
      
        </div>
  );
}
export default Dist_estat;