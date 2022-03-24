import React,{useEffect, useState} from 'react';
import { StyledMenu } from './StyledMenu';
import logo from '../../assets/img/profile.png'
import { Link,NavLink } from 'react-router-dom';
import api from '../../services/api'
import { useHistory } from 'react-router-dom';

const Menu = ({ open }) => {
  let history = useHistory();
  const[nome,setNome]=useState('')
  //const[permissoes,setPermissoes]=useState([])
  const[done, setDone]=useState(true)
  const[text, setText]=useState('')
  const[per1, setPer1]=useState()
  const[per2, setPer2]=useState()
  const[per3, setPer3]=useState()
  const[per4, setPer4]=useState()
  const[per5, setPer5]=useState()
  const[per6, setPer6]=useState()
  const token= sessionStorage.getItem('token')

  async function submit (e){
    e.preventDefault()
    const res= await api.delete('/logout',{
      headers: { Authorization: "Bearer " + token }
    }).then(response =>{
      sessionStorage.removeItem('token');
      history.push('/')
    }).catch(error =>{
      console.log(error)
    })
  }

  function getUser(){
    if(done){
      const prof_id = sessionStorage.getItem("id");
      const res = api.get('/user/'+ prof_id ,{headers: { Authorization: "Bearer " + token }}).then(response => {
        setNome(response.data.profissional_nome);
        choosePermitions(response.data.lista);
        setDone(false);
        }
      )
    }
  }

  function choosePermitions(permissoes){
    
    if(permissoes.includes(0)){
      setPer1(<a><Link className='Link' to='/profile'>Meus Dados</Link></a>)
    }
    if(permissoes.includes(4) ){
      setPer2(<a><NavLink className='Link' to='/professional'>Profissionais</NavLink></a>)
    }
    if(permissoes.includes(4) ){
      setPer3(<a><Link className='Link' to='/unity'>Unidades</Link></a>)
    }
    if(permissoes.includes(5)){
      setPer4(<a><NavLink className='Link' to='/estatisticasDistrito'>Estatísticas Distrital</NavLink></a>)
    }
    if(permissoes.includes(5)){
      setPer5(<a><NavLink className='Link' to='/estatisticasMunicipio'>Estatísticas Municipais</NavLink></a>)
    }
    if(permissoes.includes(2)){
      setPer6(<a><Link className='Link' to='/register'>Adicionar Profissional</Link></a>)
    }
  }
  
  useEffect( () => {
    getUser();
  });

  return (
    <StyledMenu open={open}>
      {/* <img src={logo} className="Logo" alt="loldesign logo"></img> */}
      <p>Bem vindo(a), {nome}</p>
      <a><Link className='Link' to='/home'>Home</Link></a>
      {per1}
      {per2}
      {per3}
      {per4}
      {per5}
      {per6}
      <a><Link className="Link" onClick={(e)=>{submit(e)}}>Sair</Link></a>
    </StyledMenu>
  )
}

export default Menu;