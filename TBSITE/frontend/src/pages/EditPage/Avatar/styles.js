import styled from 'styled-components'

export const Container = styled.div`
align-self: center;
margin-bottom:30px;
label{
    cursor:pointer;
    &:hover{
        opacity:0.7
    }
    img{
        height: 140px;
        width:140px;
        border-radius:50%;
        border:3px solid rgba(255,255,255,0.3);
        background:#eee;
        margin-left:180%;
    }
    input{
        display:none
    }
}
`