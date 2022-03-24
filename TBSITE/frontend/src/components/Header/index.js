import React, { useEffect, useState } from 'react'
import profile from '../../assets/img/profile2.png'
import profile2 from '../../assets/img/marca.png'
import api from '../../services/api'
import './StyledHeader.css'
function Header(){
    
    const[nome,setNome]=useState('')
    const nomeText = sessionStorage.getItem("nome");
    const token= sessionStorage.getItem('token')
    const [can, setCan] = useState(true) 

    async function getUser(){
        setCan(false);
        setNome(nomeText) 
    }
    useEffect(()=>{
        if(can){
            getUser();
        }
    })
    return(
        <>
            <nav className="Menu">
                <div className="identify">
                    <p>Olá,{nome}!</p>         
                </div>
            </nav>
      </>
    )
}
export default Header