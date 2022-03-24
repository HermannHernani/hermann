import React, {useState , useEffect} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import api from '../../services/api'
import './style.css'


function Estatisticas_sul() {
  const token= sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [can, setCan] = useState(true)
  const [datas, setDatas] = useState([]);
  const [sul, setSul] = useState(0);
  const [ativos, setAtivos] = useState(0);
  const [inativos, setInativos] = useState(0);

  async function getSul(){
    setCan(false);
    const response = await api.get('/showSul', {
      headers: {Authorization: "Bearer " + token}})
    setSul(response.data.sul.total.length)
    setAtivos(response.data.sul.ativos.length)
    setInativos(response.data.sul.inativos.length)
    console.log(response.data.sul)
  }
  
  useEffect(() =>{
    if (can){
      getSul()
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
            <h2>Estatisticas do Distrito Sul</h2>
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
                      <td>{sul}</td>
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
export default Estatisticas_sul;