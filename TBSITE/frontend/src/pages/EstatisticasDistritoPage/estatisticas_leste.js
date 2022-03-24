import React, {useState , useEffect} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import api from '../../services/api';
import './style.css'


function Estatisticas_leste() {
  const token = sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [can, setCan] = useState(true)
  const [data, setDatas] = useState([]);
  const [leste, setLeste] = useState(0);
  const [ativos, setAtivo] = useState(0);
  const [inativos, setInativo] = useState(0);

  async function getLeste(){
    setCan(false);
    const response = await api.get('/showLeste', {
      headers: {Authorization: "Bearer " + token}})
    setLeste(response.data.leste.total.length)
    setAtivo(response.data.leste.ativos.length)
    setInativo(response.data.leste.inativos.length)
    console.log(response.data.leste)

  }
  
  useEffect(()=>{
    if(can){
      getLeste()
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
            <h2>Estatisticas do Distrito Leste</h2>
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
                        <td>{leste}</td>
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
export default Estatisticas_leste;