import styled from 'styled-components'
import { mobile } from '../responsive'
import { publicRequest } from '../requestMethods'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("https://raw.githubusercontent.com/jardeleko/flow/main/public/img/bg2.jpg"); 
    background-size: cover;
    background-repeat:no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width:40%;
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
    flex-wrap:wrap;
    margin: 20px;
    margin-left:10%;
`

const Input = styled.input`
    flex:1;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size:15px;
    min-width:50%;
    align-items: center;
    margin: 20px 10px 0px 0px;
    border:1px solid lightslategray;
    padding: 10px;
    color:black;
    ${mobile({width:"86.7%"})}
`
const Div = styled.div`
    margin-bottom: 10px;
    text-align:center;
`

const Agreement = styled.span`
    font-size: 15.4px;
    margin: 20px 0px;
    margin-right:30px;
    color:black;
    font-weight:600;
`
// cadetblue || cornflowerblue

const Link = styled.a`
    color:crimson !important;
    text-decoration:none;
    font-weight:bold;

     &:hover{        
        color:#54a85c !important;
        text-decoration: none;
    }
`

const Button = styled.button`
    width: 37%;
    border:none;
    padding: 10px 20px;
    background-color:#7daf82;
    color:white;
    font-weight:bold;
    cursor:pointer;
    &:hover{
        background-color:#54a85c;
    }
    ${mobile({width:"95%"})}
`


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nick, setUsername] = useState("");
    const [passw, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()   
        if(confirm === passw){
            await publicRequest.post('/auth/register', {
                name: name,
                email: email,
                username: nick,
                password: passw 
            }).then((res) => {
                console.log(res.data)
                alert('Create Success ✓, please logon now')
                history('/login')
            }).catch((err) => {
                console.log("error in register:" + JSON.stringify(err))
            })
        }
        else {
            alert("Please, need a combine pass!")
        }     
    }
    const content = (
        <Container>
            <Wrapper>
                <Title>CREATE ACCOUNT</Title>
                <Form name='register' onSubmit={handleSubmit} netlify netlify-honeypot="bot-field" hidden>
                    <Div>
                        <Input placeholder="name" type='text' onChange={(e) => setName(e.target.value)}/>
                        <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        <Input placeholder="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                        <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <Input placeholder="confirm password" type="password"  onChange={(e) => setConfirm(e.target.value)}/>
                    </Div>
                    <Agreement>
                        If you have account<Link href='/Login'> click here</Link> to SIGN IN.
                    </Agreement>
                    <Button type='submit'>CREATE</Button>
                </Form>
            </Wrapper>        
        </Container>
      )
    return content
}

export default Register;
