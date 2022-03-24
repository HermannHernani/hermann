import React, {useState, useEffect} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import api from '../../services/api';
import './style.css'


function Estatisticas_oeste() {
  const token = sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [can, setCan] = useState(true)
  const [datas, setDatas] = useState([]);
  const [oeste, setOeste] = useState(0);
  const [ativos, setAtivo] = useState(0);
  const [inativos, setInativo] = useState(0);

  async function getOeste(){
    setCan(false);
    const response = await api.get('/showOeste' ,{
      headers: {Authorization: "Bearer " + token}})
    setOeste(response.data.oeste.total.length)
    setAtivo(response.data.oeste.ativos.length)
    setInativo(response.data.oeste.inativos.length)
    console.log(response.data.oeste)

  }

  
  useEffect(() =>{
    if (can) {
      getOeste()
    }
  })

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
            <h2>Estatisticas do Distrito Oeste</h2>
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
                        <td>{oeste}</td>
                        <td>{ativos}</td>
                        <td>{inativos}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </Container>
      
        </div>
  );
}
export default Estatisticas_oeste;