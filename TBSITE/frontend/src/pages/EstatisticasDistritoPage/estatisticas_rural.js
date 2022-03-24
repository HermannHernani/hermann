import React, {useState , useEffect} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import api from '../../services/api'
import './style.css'


function Estatisticas_rural() {
  const token = sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [can, setCan] = useState(true)
  const [datas, setDatas] = useState([]);
  const [rural, setRural] = useState(0);
  const [ativos, setAtivo] = useState(0);
  const [inativos, setInativo] = useState(0);

  async function getRural(){
    setCan(false);
    const response = await api.get('/showRural', {
      headers: { Authorization: "Bearer " + token}})
    setRural(response.data.rural.total.length)
    setAtivo(response.data.rural.ativos.length)
    setInativo(response.data.rural.inativos.length)
    console.log(response.data.rural)
    
  }
  
  useEffect(() =>{
    if (can) {
      getRural()
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
            <h2>Estatisticas do Distrito Rural</h2>
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
                        <td>{rural}</td>
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
export default Estatisticas_rural;