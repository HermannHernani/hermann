import React, { useState } from 'react';
import Burger from '../../components/Burger/index';
import Menu from '../../components/Menu/index';
import Header from '../../components/Header';
import Container from '../../components/Container';
import './style.css'
import { NavLink } from 'react-router-dom';
import {MdKeyboardBackspace} from "react-icons/md";
import Table from 'rc-table';
import {Link} from 'react-router-dom'
import estatisticas_norte from './estatisticas_norte'

function EstatisticasDistritoPage() {
  const columns = [
    {
        title: 'Codigo_DISA',
        dataIndex: 'cod_disa',
        key: 'cod_disa',
        width: 1000,
    },
  ];

  const distritos = [
    {cod_disa: "UBS DISTRITO NORTE"},
    {cod_disa: "UBS DISTRITO SUL"},
    {cod_disa: "UBS DISTRITO LESTE"},
    {cod_disa: "UBS DISTRITO OESTE"},
    {cod_disa: "UBS DISTRITO RURAL"},
  ];


const [open, setOpen] = useState(false);
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
        <h2>DISTRITOS</h2> 
        <table className="table">
                  <thead className="header">
                    <tr>
                      <td>REGIÃO</td>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <tr>
                      <td><Link to={'/estatisticas_norte'} className="table-body"> UBS REGIÃO NORTE </Link></td>
                    </tr>
                    <tr>
                      <td><Link to={'/estatisticas_sul'} className="table-body">UBS REGIÃO SUL</Link> </td>
                    </tr>
                    <tr>
                      <td><Link to={'/estatisticas_leste'} className="table-body">UBS REGIÃO LESTE</Link></td>
                    </tr>
                    <tr>
                      <td><Link to={'/estatisticas_oeste'} className="table-body">UBS REGIÃO OESTE</Link></td>
                    </tr>
                    <tr>
                      <td><Link to={'/estatisticas_rural'} className="table-body">UBS REGIÃO RURAL</Link></td>
                    </tr>
                  </tbody>
          </table>
        </Container>
    </div>
  )
}
export default EstatisticasDistritoPage;