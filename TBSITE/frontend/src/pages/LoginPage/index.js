import React,{useState,useEffect} from 'react'
import {AiOutlineLock,AiOutlineUser} from "react-icons/ai"
import { useHistory } from 'react-router-dom';
import {Form,Input,Button,Title} from '../../components/Form'
import Container from '../../components/Container'
import api from '../../services/api.js'
import '../../custom.scss';
import './styles.css';
import {cpfMask} from '../../components/Mask/mask.js'
import { NavLink, Link, Redirect } from 'react-router-dom';

function LoginPage(){
    let history = useHistory();
    const [cpf,setCPF]=useState('');
    const [password,setPassword]=useState('')
    
    async function submit (e){
        e.preventDefault()
        const res= await api.post('/login',{
            profissional_cpf:(cpf.replace(/\./g,'')).replace(/\-/g,''),
            password:password
        }).then(response =>{
            // console.log(response)
            sessionStorage.setItem('token',response.data.token)
            sessionStorage.setItem('nome',response.data.profissional_nome)
            sessionStorage.setItem('cargo_id',response.data.cargo_id)
            sessionStorage.setItem('id',response.data.profissional_id)
            sessionStorage.setItem('unidade_1_nome',response.data.unidade1.unidade_nome)
            sessionStorage.setItem('unidade_2_nome',response.data.unidade2.unidade_nome)
            sessionStorage.setItem('unidade_1_id',response.data.unidade1.unidade_id)
            sessionStorage.setItem('unidade_2_id',response.data.unidade2.unidade_id)
            
            // sessionStorage.setItem('avatar_id',response.data.userExist.avatar_id)
            // sessionStorage.setItem('avatar_url',response.data.userExist.avatar.url)
            // sessionStorage.setItem('avatar_path',response.data.userExist.avatar.path)
            history.push('/home')
        }).catch(error =>{
            console.log(error)
            // alert('Dados inválidos')
        })
    }

     return(
         <div className="home-body">
        <br></br>
        <br></br>
        <br></br>
        <br></br>

         <Container width="80vh" height="60%">
            <Title>Login</Title>
            <Form>
                <div>
                    <label >CPF</label>
                    <AiOutlineUser ></AiOutlineUser>
                    <Input width = "100%" type="cpf"  placeholder="Digite seu CPF" value={cpf} onChange={e=>{setCPF(cpfMask(e.target.value))}} />
                </div>

                <div>
                    <label>Senha</label>
                    <AiOutlineLock></AiOutlineLock>
                    <Input width = "100%" type="password"  placeholder="Digite sua senha"  value={password} onChange={e=>{setPassword(e.target.value)}}/>
                </div>
                <div>
                    <br></br>
                    <p className="text">Esqueceu a senha? Clique <NavLink to='/index.js'> aqui </NavLink> para recuperar</p>
                    <Button  width="95%" type="submit" onClick={(e)=>{submit(e)}}>Login</Button>
                </div>
            </Form>
            
         </Container>
         </div>
     )
    
}

export default LoginPage;