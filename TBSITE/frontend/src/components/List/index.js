import React, { useState, useEffect } from 'react'
import Table from 'rc-table';
import Container from '../../components/Container'
import Burger from '../../components/Burger'
import Menu from '../../components/Menu'

import './StyledList.css'
const List= ({columns,data,width,height})=>{
    const [open, setOpen] = useState(false);
    console.log(data)
    return(
        <div>
            <div>
            <Burger open={open} setOpen={setOpen} />
            <Menu open={open} setOpen={setOpen} />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Container   width={width} height={height}>
            <Table className='table' columns={columns} data={data} />
           
            </Container>
        </div>
    )
}

export default List