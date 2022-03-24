import React, { useState, useEffect } from 'react'
import Table from 'rc-table';
import Container from '../../components/Container'
import Burger from '../../components/Burger'
import Menu from '../../components/Menu'
import Header from '../../components/Header'
import api from '../../services/api'
import './style.css'
import { NavLink } from 'react-router-dom';

function PacientPage(){
    const columns = [
        {
          title: 'Nome',
          dataIndex: 'paciente_nome',
          key: 'paciente_nome',
          width: 500,
        },
        {
          title: 'CPF',
          dataIndex: 'paciente_cpf',
          key: 'paciente_cpf',
          width: 250,
        },
        /*{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
        },*/
        /*{
            title: 'Dias em atraso',
            dataIndex: 'dias_atraso',
            key: 'dias_atraso',
            width: 150,
        },*/
        {
          title: 'Inicio do Tratamento',
          dataIndex: 'paciente_data_inicio',
          key: 'paciente_data_inicio',
          width: 300,
        },
        {
            title: 'Fim do Tratamento',
            dataIndex: 'paciente_data_fim',
            key: 'paciente_data_fim',
            width: 300,
          },
        
      ];
   
    const [open, setOpen] = useState(false);
    const token= sessionStorage.getItem('token')
    const [datas, setDatas] = useState([]);
    const [pacientes, setPacientes] = useState([])
    const [can, setCan] = useState(true) 
    async function getPacientes(){
        setCan(false);
        var aux = []
        const unidade_id = sessionStorage.getItem('unidadeSelecionada').toString()
        const response= await api.get(('/pacientes/' + unidade_id),{
          headers: { Authorization: "Bearer " + token }})
        setDatas(response.data.pacientes);
        console.log(response.data.pacientes);
    }
    useEffect(()=>{
      if(can){
        getPacientes()
      }
    })

    return(
        <div>
            <div>
            <Header></Header>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
            </div>
            <br/>
            <br/>
            <br/>
            
            <Container width="130vh" height="50vh">
            <h2>Pacientes da Unidade</h2>
            <br></br>
            <br></br>
            <Table className='table' columns={columns} data={datas} />
            
            
            </Container>
        </div>
    )
}

export default PacientPage