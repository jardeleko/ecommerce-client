import { useLocation, useNavigate } from "react-router"
import styled from "styled-components"
import img from '../assets/fail.png'

const Container = styled.div`
  width:100%;
  height: 100vh;
  background-color: white;    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`
const Image = styled.img`
  width:10%;
  height: 20vh;
  align-items: center;
  justify-content: center;
`
const Button = styled.button`
  cursor:pointer;
  padding: 8px;
  margin-top: 20px;
  border: none;
  border-radius:10px;
  background-color: red;
  color:#fff;
  
  &:hover{
    background-color: #323232;

  }
`
const Failed = () => {
  const location = useLocation()
  const data = location.state.data.raw.message
  const history = useNavigate()
  console.log(data)

  const returnReset = () => {
    history('/cart')
  }
  const action = setTimeout(() => {
    history('/cart') 
 }, 5000)


  return (
    <Container >
      <Image src={img}/>
        <span> {action && data} 
        </span>
        <Button onClick={returnReset}>Cart Page</Button>
          
    </Container>
  );
};

export default Failed