import React,{useState, useEffect} from 'react'
import profile from '../../assets/img/profile.png'
import Burger from '../../components/Burger'
import Menu from '../../components/Menu'
import api from '../../services/api'
import { useHistory } from 'react-router-dom';
import {Form,Input,Button,Title} from '../../components/Form'
import Container from '../../components/Container'
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineMail,AiOutlineLock,AiOutlineUser,AiOutlinePhone,AiOutlineSetting,AiOutlineHome,AiOutlineAudit} from "react-icons/ai"
import './styles.css'
import Header from '../../components/Header'
import {cpfMask, cnsMask, phoneMask} from '../../components/Mask/mask.js'
import Avatar from '../EditPage/Avatar'


export default function RegisterPage(){
    const token= sessionStorage.getItem('token')
    const [name,setName]=useState('');
    const [cpf,setCPF]=useState('');
    const [cns,setCNS]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [unidade,setUnidade]=useState(-1);
    const [unidade2,setUnidade2]=useState(-1);
    const [cargo,setCargo]=useState(-1);
    let history = useHistory();
    const [open, setOpen] = useState(false);

    const [unidades, setUnidades] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [can, setCan] = useState(true) 

    async function getData(){
        setCan(false);

        const response1 = await api.get('/unitys',{
          headers: { Authorization: "Bearer " + token }})
        setUnidades(response1.data.unitys);
        console.log(response1.data.unitys);

        const response2 = await api.get('/cargos',{
            headers: { Authorization: "Bearer " + token }})
          setCargos(response2.data.cargos);
          console.log(response2.data.cargos);
    }

    useEffect(()=>{
        if(can){
          getData();
        }
      })

    async function submit(e){
        e.preventDefault()
        const res= await api.post('/users',{
            profissional_cpf:(cpf.replace(/\./g,'')).replace(/\-/g,''),
            profissional_nome:name,
            profissional_cns:(cns.replace(/\s/g, '')),
            profissional_email:email,
            profissional_senha:password,
            profissional_telefone:((phone.replace(/\(/g,'')).replace(/\)/g,'').replace(/\-/g,'')),
            profissional_ativo:true,
            unidade_1_id: unidade,
            unidade_2_id: unidade2,
            cargo_id: cargo
        }).then(response =>{
            console.log(response)
            alert("Cadastro realizado com sucesso!")
            history.push('/home')
        }).catch(error=>{
            console.log(error)
            alert("Algo deu errado!Por favor, confira se os dados estão preenchidos corretamente")
        })
    }
        return(
            <div >
                <Header></Header>
                <Burger open={open} setOpen={setOpen} />
                <Menu open={open} setOpen={setOpen} />
                <br></br>
                <br></br>
                
                <Container width="90vh" height="100vh">              
                        <h2 id="title-register">Cadastro de Profissional</h2>
                        <br></br>
                        <br></br>
                    <Form > 
                        <div>
                            <label>Nome </label>
                            <AiOutlineUser></AiOutlineUser>
                            <Input height="35px" type="nome"  placeholder="Digite o nome" value={name} onChange={e=>{setName(e.target.value)}}/>                        
                        </div>
                        <div >
                            <label>CPF </label>
                            <AiOutlineAudit></AiOutlineAudit>
                            <Input  height="35px" type="cpf"  placeholder="Digite o CPF" value={cpf} onChange={e=>{setCPF(cpfMask(e.target.value))}}/>
                        </div>
                        <div >
                            <label>CNS </label>
                            <AiOutlineAudit></AiOutlineAudit>
                            <Input height="35px"   type="cns"  placeholder="Digite o CNS" value={cns} onChange={e=>{setCNS(cnsMask(e.target.value))}}/>
                        </div>
                        <div className='input-field'>
                            <label>Email </label>
                            <AiOutlineMail></AiOutlineMail>
                            <Input  height="35px"  type="email"  placeholder="Digite o email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className='input-field'>
                            <label>Senha </label>
                            <AiOutlineLock></AiOutlineLock>
                            <Input height="35px"   type="password"  placeholder="Digite a senha" value={password} onChange={e=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className='input-field'>
                            <label>Telefone </label>
                            <AiOutlinePhone></AiOutlinePhone>
                            <Input height="35px"  type="name"  placeholder="Digite o telefone" value={phone} onChange={e=>{setPhone(phoneMask(e.target.value))}}/>
                        </div>
                        <div className='input-field'>
                            <label>Unidade 1</label>
                            <AiOutlineHome></AiOutlineHome>
                            <select onChange={e=>{setUnidade(e.target.value)}} value={unidade}>
                                <option
                                    key={-1}
                                    value={-1}
                                >
                                    Selecione uma unidade
                                </option>
                                {
                                    unidades.map((unidade)=>( 
                                        <option 
                                            key={unidade.unidade_id}
                                            value={unidade.unidade_id}
                                        >
                                            {unidade.unidade_nome}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='input-field'>
                            <label>Unidade 2 (opcional)</label>
                            <AiOutlineHome></AiOutlineHome>
                            <select onChange={e=>{setUnidade2(e.target.value)}} value={unidade2}>
                                <option
                                    key={-1}
                                    value={-1}
                                >
                                    Selecione uma unidade (Opcional)
                                </option>
                                {
                                    unidades.map((unidade)=>( 
                                        <option 
                                            key={unidade.unidade_id}
                                            value={unidade.unidade_id}
                                        >
                                            {unidade.unidade_nome}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='input-field'>
                            <label>Cargo</label>
                            <AiOutlineSetting></AiOutlineSetting>
                            <select onChange={e=>{setCargo(e.target.value)}} value={cargo}>
                                <option
                                    key={-1}
                                    value={-1}
                                >
                                    Selecione um cargo
                                </option>
                                {
                                    cargos.map((cargo)=>( 
                                        <option 
                                            key={cargo.cargo_id}
                                            value={cargo.cargo_id}
                                        >
                                            {cargo.cargo_nome}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    
                        <Button type="submit" height='60px' onClick={(e)=>{submit(e)}} >Cadastrar</Button>
                        <br></br>
                    </Form>
                    <ToastContainer></ToastContainer>
                </Container>
              
            </div>
        )
    
}