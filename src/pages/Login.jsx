import styled from 'styled-components'
import { mobile } from '../responsive'
import {useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login } from '../redux/apiCalls'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("https://raw.githubusercontent.com/jardeleko/flow/main/public/img/bg3.png"); 
    background-size: cover;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width:25%;
    padding: 20px;
    background-color: white;
    opacity:0.9;
    border-radius: 10px;
    ${mobile({width:"75%"})}
`

const Title = styled.h1`
    text-align:center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight:600;
`

const Form = styled.form`
    display: flex;
    flex-direction:column;
    margin: 20px;
`
const P = styled.p`

`
const Input = styled.input`
    flex:1;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size:15px;
    min-width:40%;
    margin: 5px 0px;
    border:1px solid lightslategray;
    padding: 10px;
    color:black;
`

const Link = styled.a`
    color:solid blue;
    font-size:15px;
    text-decoration: silver;
    font-weight:bold;
    margin-top: 5px;
    color: #54a85c !important;
     &:hover{        
        color:#54a85c !important;
        text-decoration: none;
        opacity: 0.8;
    }
    cursor:pointer;
`

const Button = styled.button`
    width: 100%;
    border:none;
    margin-top:10px;
    padding: 10px 20px;
    margin-bottom:20px;
    background-color:#7daf82;
    color:white;
    font-weight:bold;
    cursor:pointer;
    &:hover{
        background-color:#54a85c;
    }
    &:disabled{
        background-color: #54a85c;
        color: #54a85c;
        cursor: not-allowed;
    }
`
const Error = styled.span`
    font-weight: bold;
    color:red;
    margin:5px;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);    
    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})
    }
    
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN </Title>
                <Form name='signin' className='form-group' netlify netlify-honeypot="bot-field" hidden>
                    <Input className='form-control' placeholder="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                    <Input className='form-control' placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleLogin} >LOGIN</Button>
                    {error && <Error> Wrong credentials, try again! </Error>}
                    <P>DO NOT YOU REMEMBER THE PASSWORD?</P>
                    <Link href='/Register'>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>        
        </Container>
    )
}

export default Login;
