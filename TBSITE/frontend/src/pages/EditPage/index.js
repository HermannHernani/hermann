import React,{useState, useEffect} from 'react'
import profile from '../../assets/img/profile.png'
import Burger from '../../components/Burger'
import Menu from '../../components/Menu'
import api from '../../services/api'
import {Form,Input,Button,Title} from '../../components/Form'
import Container from '../../components/Container'
import { ToastContainer, toast } from 'react-toastify';
import { Link,Navlink, useHistory } from 'react-router-dom'
import { AiOutlineMail,AiOutlineLock,AiOutlineUser,AiOutlinePhone,AiOutlineSetting,AiOutlineHome,AiOutlineAudit} from "react-icons/ai"
import './styles.css'
import Avatar from './Avatar'
import Header from '../../components/Header'
import {cpfMask, cnsMask, phoneMask} from '../../components/Mask/mask.js'

function EditPage(){
    const token= sessionStorage.getItem('token')
    const profissional_id = sessionStorage.getItem('id')
    const [nome,setNome]=useState('');
    const [cpf,setCPF]=useState('');
    const [cns,setCNS]=useState('');
    const [email,setEmail]=useState('');
    const [senha,setSenha]=useState('');
    const [confirmaSenha,setConfirmaSenha]=useState('');
    const [senhaOld,setSenhaOld]=useState('');
    const [telefone,setTelefone]=useState('');
    const [unidade1,setUnidade1]=useState(-1);
    const [unidade2,setUnidade2]=useState(-1);
    const [unidade1Old,setUnidade1Old]=useState(-1);
    const [unidade2Old,setUnidade2Old]=useState(-1);
    const [cargo,setCargo]=useState(-1);
    let history = useHistory();
    const [open, setOpen] = useState(false);
    const [unidades, setUnidades] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [can, setCan] = useState(true) 

    async function getData(){
        setCan(false);

        const res= await api.get(('/user/' + profissional_id),{
            headers: { Authorization: "Bearer " + token }})
        .then(response =>{
            const uny1 = sessionStorage.getItem('unidade_1_id')
            const uny2 = sessionStorage.getItem('unidade_2_id')

            setNome(response.data.profissional_nome)
            setCPF(response.data.profissional_cpf)
            setCNS(response.data.profissional_cns)
            setTelefone(response.data.profissional_telefone)
            setEmail(response.data.profissional_email)
            setUnidade1(uny1)
            setUnidade2(uny2)
            setUnidade1Old(uny1)
            setUnidade2Old(uny2)
            
        }).catch(error=>{
            console.log(error)
        })

        const response1 = await api.get('/unitys',{
          headers: { Authorization: "Bearer " + token }})
        setUnidades(response1.data.unitys);

        const response2 = await api.get('/cargos',{
            headers: { Authorization: "Bearer " + token }})
          setCargos(response2.data.cargos);
    }

    useEffect(()=>{
        if(can){
          getData();
        }
    })

    async function submit(e){
        e.preventDefault()
        const res= await api.put('/user/' + profissional_id,{
            nome:nome,
            email:email,
            senhaOld:senhaOld,
            senha:senha,
            confirmaSenha:confirmaSenha,
            telefone:telefone,
            unidade_id_1:unidade1,
            unidade_id_2:unidade2,
            unidade_id_1_old:unidade1Old,
            unidade_id_2_old:unidade2Old,
        },{
            headers: { Authorization: "Bearer " + token }}).then(response =>{
            console.log(response)
            alert('Dados alterados com sucesso')
            window.sessionStorage.setItem('unidade_1_id',unidade2)
            window.sessionStorage.setItem('unidade_2_id',unidade1)
            history.push('/home')
        }).catch(error=>{
            console.log(error)
        })
    }
    
        return(
            <div >
               
                <Header></Header>
                <Burger open={open} setOpen={setOpen} />
                <Menu open={open} setOpen={setOpen} />
                <br></br>
                <br></br>
                
                <Container width="90vh" height="100%"> 
                {/* <ToastContainer className='notify'></ToastContainer>                */}
                        <h2>Editar Cadastro</h2>

                    <Form display="table-row"> 
                        <div className='input-field'>
                            <label>Nome </label>
                            <AiOutlineUser></AiOutlineUser>
                            <Input height="35px" type="name"  placeholder="Digite o nome" value={nome} onChange={e=>{setNome(e.target.value)}}/>                        
                        </div>
                        <div className='input-field'>
                            <label>Email </label>
                            <AiOutlineMail></AiOutlineMail>
                            <Input  height="35px"  type="email"  placeholder="Digite o email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className='input-field'>
                            <label>Senha antiga </label>
                            <AiOutlineLock></AiOutlineLock>
                            <Input height="35px"   type="password"  placeholder="Digite a senha antiga" value={senhaOld} onChange={e=>{setSenhaOld(e.target.value)}}/>
                        </div>
                        <div className='input-field'>
                            <label>Senha nova </label>
                            <AiOutlineLock></AiOutlineLock>
                            <Input height="35px"   type="password"  placeholder="Digite a senha nova" value={senha} onChange={e=>{setSenha(e.target.value)}}/>
                        </div>
                        <div className='input-field'>
                            <label>Confirmar Senha </label>
                            <AiOutlineLock></AiOutlineLock>
                            <Input height="35px"   type="password"  placeholder="Confirme a senha nova" value={confirmaSenha} onChange={e=>{setConfirmaSenha(e.target.value)}}/>
                        </div>
                        <div className='input-field'>
                            <label>Telefone </label>
                            <AiOutlinePhone></AiOutlinePhone>
                            <Input height="35px"  type="name"  placeholder="Digite o telefone" value={telefone} onChange={e=>{setTelefone(phoneMask(e.target.value))}}/>
                        </div>
                        <div className='input-field'>
                            <label>Unidade 1 </label>
                            <AiOutlineHome></AiOutlineHome>
                            <select onChange={e=>{setUnidade1(e.target.value)}} value={unidade1}>
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
                        <div className="button">
                            <Button   type="submit" height='60px' onClick={(e)=>{submit(e)}} ><a ><Link to='/profile'>Finalizar</Link></a></Button>
                            <a><Link to="/profile"><Button className="cancel-button" height='60px'>Cancelar</Button></Link></a>
                            <br></br>
                        </div>
                    </Form>
                    
                </Container>
              
            </div>
        )
    
}
export default EditPage