import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Burger from '../../components/Burger'
import Menu from '../../components/Menu'
import Container from '../../components/Container'
import api from '../../services/api'
import {Link} from 'react-router-dom'
import './styles.css'


export default function UnityPage(){
  const token= sessionStorage.getItem('token')
      /*const datas = [
          { id:1,name: 'UBS L 42', cnes: 2013010,Codigo_DISA:"Leste" } ,
          { id:2,name: 'UBS L 34', cnes: 2014645,Codigo_DISA:"Leste"  },
       ];*/
    const [datas, setDatas] = useState([]);
    const [open, setOpen] = useState(false);
    const [can, setCan] = useState(true) 
    async function getUnity(){
        setCan(false);
        const response= await api.get('/unitys',{
          headers: { Authorization: "Bearer " + token }})
        setDatas(response.data.unitys);
    }
    useEffect(()=>{
      if(can){
        getUnity()
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
            <div>
              <Container width="100vh" height="200%">
              <h2>UNIDADES LOTADAS</h2> 
                <table className="table">
                  <thead className="header">
                    <tr>
                      <td>ID</td>
                      <td>Nome</td>
                      <td>CNES</td>
                      <td>Codigo_DISA</td>
                    </tr>
                  </thead>
                  <tbody >
                  {
                  datas.map((data)=>( 
                    <tr>
                      <td key={data.unidade_id}>{data.unidade_id}</td>
                      <td><Link to={'/estatisticas/'+ data.unidade_id.toString()} className="table-body">{data.unidade_nome}</Link></td>
                      <td>{data.unidade_cnes}</td>
                      <td>{data.unidade_distrito}</td>
                    </tr>
                    ))
                  }
                  </tbody>
                </table>
              </Container>
          </div>
        </div>
    )
}

