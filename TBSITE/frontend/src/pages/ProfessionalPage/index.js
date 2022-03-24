import React, {useState , useEffect} from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import api from '../../services/api'
import './styles.css'
import Table from 'rc-table';
import {Link} from 'react-router-dom'


function Profissional() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'profissional_id',
      key: 'profissional_id',
      width: 200,
    },
    {
      title: 'NOME',
      dataIndex: 'profissional_nome',
      key: 'paciente_cpf',
      width: 500,
    },
    {
      title: 'CPF',
      dataIndex: 'profissional_cpf',
      key: 'profissional_cpf',
      width: 200,
    },
    {
        title: 'CNS',
        dataIndex: 'profissional_cns',
        key: 'profissional_cns',
        width: 200,
    },
    {
        title: 'STATUS',
        dataIndex: 'profissional_ativo',
        key: 'profissional_ativo',
        width: 200,
    },
    {
      title: 'TELEFONE',
      dataIndex: 'profissional_telefone',
      key: 'profissional_telefone',
      width: 200,
    },
    {
      title: 'EMAIL',
      dataIndex: 'profissional_email',
      key: 'profissional_email',
      width: 200,
    }
    
  ];
  const token = sessionStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [can, setCan] = useState(true);
  const [profissionais, setProfissionais] = useState([]); 
  
  async function getProfissional(){
    setCan(false);
    const response = await api.get('/profissional',{
      headers: { Authorization: "Bearer " + token }})
    setProfissionais(response.data.profissionais)
    // console.log(response.data.profissionais)

  }
  useEffect(()=>{
    if(can){
      getProfissional()
    }
  })
  

  return (
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
    <h2>Profissionais</h2>
    <br></br>
    <br></br>
    <Table className='table' columns={columns} data={profissionais} />
    
    
    </Container>
</div>
)
}
export default Profissional;