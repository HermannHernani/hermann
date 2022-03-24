import React,{useState,useEffect} from 'react'
import profile from '../../assets/img/profile2.png'
import profile2 from '../../assets/img/marca.png'
import Burger from '../../components/Burger'
import Menu from '../../components/Menu'
import api from '../../services/api'
import Avatar from '../EditPage/Avatar'
import {Form,Input,Button,Title} from '../../components/Form'
import Container from '../../components/Container'
import { ToastContainer, toast } from 'react-toastify';
import './styles.css'
import Header from '../../components/Header'
import { NavLink } from 'react-router-dom'

function Profile(){
    const token= sessionStorage.getItem('token')
    const profissional_id = sessionStorage.getItem('id')
    const [nome,setNome]=useState('');
    const [cpf,setCPF]=useState('');
    const [cns,setCNS]=useState('');
    const [email,setEmail]=useState('');
    const [senha,setSenha]=useState('');
    const [telefone,setTelefone]=useState('');
    const [unidade1,setUnidade1]=useState(0);
    const [unidade2,setUnidade2]=useState(0);
    const [cargo,setCargo]=useState('');
    const [open, setOpen] = useState(false);
    const [unidades, setUnidades] = useState([]);

    const [can, setCan] = useState(true) 

    async function getData(){
        setCan(false);
        const response1 = await api.get('/unitys',{
            headers: { Authorization: "Bearer " + token }})
          setUnidades(response1.data.unitys);

        const res= await api.get(('/user/' + profissional_id),{
            headers: { Authorization: "Bearer " + token }})
        .then(response =>{
            // console.log(response.data)

            const uny1 = sessionStorage.getItem('unidade_1_id')
            const uny2 = sessionStorage.getItem('unidade_2_id')

            setNome(response.data.profissional_nome)
            setCPF(response.data.profissional_cpf)
            setCNS(response.data.profissional_cns)
            setTelefone(response.data.profissional_telefone)
            setEmail(response.data.profissional_email)
            setUnidade1(response1.data.unitys[uny1 - 1].unidade_nome)
            setUnidade2(response1.data.unitys[uny2 - 1].unidade_nome)
            
        }).catch(error=>{
            console.log(error)
        })
    }
   
    useEffect(()=>{
        if(can){
          getData();
        }
      })

    return(
        
        <div>
            <Header></Header>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />

            <br></br>
            <br></br>
            
            <Container width="95vh" height="250%">       
                <h3 id="title" style={{marginLeft:"40%"}}>Meus Dados</h3>   
                <br></br>   
                <br></br>   
                    
            <br></br>
            <Form className="profile-info" >
                    <div >
                        <label>Nome</label>
                        <p className="about-field">{nome}</p>
                    </div>
                    <div >
                        <label>CPF</label>
                        <p className="about-field">{cpf}</p>
                    </div>
                    <div>
                        <label>Email</label>
                        <p className="about-field">{email}</p>
                    </div>
                    <div>
                        <label>Telefone</label>
                        <p className="about-field">{telefone}</p>
                    </div>
                    <div>
                        <label>Unidade 1</label>
                        <p className="about-field">{unidade1}</p>
                    </div>
                    <div>
                        <label>Unidade 2</label>
                        <p className="about-field">{unidade2}</p>
                    </div>
                    <NavLink to="/editProfile"><Button  className='end-button' justify='center' height='40px' width='90%'>Editar</Button></NavLink>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
            </Form>
            </Container>
            <ToastContainer></ToastContainer>
        </div>
    )
    
}
export default Profile