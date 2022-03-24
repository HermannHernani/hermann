import styled from 'styled-components';

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color:#eeee ;
  height: 100vh;
  text-align: left;
  padding: 0.8rem;
  position: fixed;
  top: 0;
  left: 0;
  opacity:1;
  transition: transform 0.3s ease-in-out;
  z-index:2;
  @media (max-width:700px) {
    width: 100%;
  }
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  a {
    font-size: 1rem;
    padding: 1.0rem 0;
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: 700px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: green;
    }
  }
  p{
    border-bottom:1px solid green;
    margin-top:20%;
    margin-bottom:10%;
    padding-bottom:20px   
  }
  .Logo{
    margin-top:-100%;
    margin-bottom:70%;
    width:60%;
    height:20%;
    margin-left:5%;
    border-radius:50%;
  }
  .Link{
    color:black
 }
`;
export default StyledMenu