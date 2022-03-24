import styled from "styled-components"

export const Form = styled.form.attrs(props =>({
    display:props.display || "inline-block",
   
}))`
    display:${props=> props.display};
    margin-left:auto; 
    margin-right:auto;
    height: 100%;
    width: 100%;
    margin:0;
    padding:0;
    
`;
export const Input =styled.input.attrs(props =>({
    type:props.type,
    width:props.width|| "100%",
    height:props.height || "50px",
}))`
  width: ${props=>props.width};
  height:${props=>props.height};
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 12px;
  background-color: #fff;
  color: #282828;
  padding:1%;
  opacity:0.5; 
  margin:0% ;


`;
export const Button=styled.button.attrs(props=>({
    width:props.width||"100%",
    height:props.height ||"50px;"
}))` 
    color: var(--white);
    background:#006400;
    border: 1px solid green;
    margin-left:auto ;
    margin-right:auto ;
    margin-top:5%  ;
    padding-top:2%;
    width:${props=>props.width};
    height:${props=>props.height};
    cursor: pointer;
    padding: 16px;
    font-style: normal;
    text-align:center;
    font-weight: bold;
    font-size: 16px;
    border-radius: 10px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;
    &:hover,
    &:focus {
    opacity: .5;
    }
`
export const Title = styled.h1`
  vertical-align:middle;
    margin-right:50%;
    margin-left:40%;


`;