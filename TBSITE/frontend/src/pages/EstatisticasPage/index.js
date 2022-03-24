import React, { useState , useEffect} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import './style.css'
import { Link } from '@material-ui/core';
import { NavLink, useParams } from 'react-router-dom';
import api from '../../services/api'
import { AiOutlineMail,AiOutlineLock,AiOutlineUser,AiOutlinePhone,AiOutlineSetting,AiOutlineHome,AiOutlineAudit} from "react-icons/ai"


function EstatisticasPage() {
  const token= sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [can, setCan] = useState(true) 
  const [datas, setDatas] = useState([]);
  const [cadastrados, setCadastrados] = useState(0);
  const [ativos, setAtivos] = useState(0); 
  const [inativos, setInativos] = useState(0); 
  const [unidade, setUnidade] = useState("")

  async function getVinculacao(){
    
    const queryString = window.location.hash.split("/");
    sessionStorage.setItem('unidadeSelecionada', queryString[queryString.length-1])
    setUnidade(queryString[queryString.length-1].toString());

    const response = await api.get(('/vinculacao/' + queryString[queryString.length-1].toString()),{
      headers: { Authorization: "Bearer " + token }})
    setCadastrados(response.data.vinculacao.total.length)
    setInativos(response.data.vinculacao.inativos.length)
    setAtivos(response.data.vinculacao.ativos.length)
    
    console.log(response.data.vinculacao.total)
    console.log(response.data.vinculacao.ativos)
    console.log(response.data.vinculacao.inativos)
  }
  useEffect(()=>{
    if(can){
      setCan(false);
      getVinculacao()
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
            <h2>Estatisticas da Unidade</h2>
            <AiOutlineUser></AiOutlineUser>
            <NavLink to='/pacient' className="table-body"> PACIENTES </NavLink>
            <br></br>
            <br></br>
            <table className="table">
                  <thead className="header">
                    <tr>
                      <td>CADASTRADOS</td> 
                      <td>EM ACOMPANHAMENTO</td>
                      <td>ATIVOS</td>
                      <td>EM ALERTA</td>
                      <td>RISCO DE ABANDONO</td>
                      <td>ALTO RISCO</td>
                      <td>INATIVOS</td>
                    </tr>
                  </thead>
                  <tbody >
                    <tr>
                        <td>{cadastrados}</td>
                        <td>{cadastrados}</td>
                        <td>{ativos}</td>
                        <td>{inativos}</td>
                        <td>{inativos}</td>
                        <td>{inativos}</td>
                        <td>{inativos}</td>
                    </tr>
                  </tbody>
                </table>
              </Container>
      
        </div>
  );
}
export default EstatisticasPage;