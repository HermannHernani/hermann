import React, {useState , useEffect} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import api from '../../services/api'
import './style.css'


function Estatisticas_norte() {
  const token = sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [can, setCan] = useState(true) 
  const [datas, setDatas] = useState([]);
  const [norte, setNorte] = useState(0); 
  const [ativos, setAtivo] = useState(0);
  const [inativos, setInativo] = useState(0);
  
  async function getNorte(){
    setCan(false);
    const response = await api.get('/showNorte',{
      headers: { Authorization: "Bearer " + token }})
    setNorte(response.data.norte.total.length)
    setAtivo(response.data.norte.ativos.length)
    setInativo(response.data.norte.inativos.length)
    console.log(response.data.norte)
    }



  useEffect(()=>{
    if(can){
      getNorte()
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
            <h2>Estatisticas do Distrito Norte</h2>
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
                        <td>100</td>
                        <td>50</td>
                        <td>50</td>
                        <td>50</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </Container>
      
        </div>
  );
}
export default Estatisticas_norte;