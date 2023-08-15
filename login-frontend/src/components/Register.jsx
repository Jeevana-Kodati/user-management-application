import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';


const Container = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
justify-content:center;`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align:center;
`;
const Wrapper = styled.div`
width:20%;
padding:20px;
margin-bottom:20px;`;

const Form = styled.form`
display:flex;
flex-direction:column`;

const Input = styled.input`
flex:1;
margin:10px 0px;
padding:10px;
min-width: 40%;
`;

const Button = styled.button`
width:40%;
background-color: teal;
border:none;
padding:15px 20px;
`;


export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/alien/register`, { username, email, password });
            setPassword("");
            setUsername("");
            setEmail("");
            setErrMessage("");
            console.log(response.data);
        } catch (err) {
            if (err.response.data === "Username already taken") {
                setErrMessage("Username already taken");
            } else if (err.response.data === "Email already registered") {
                setErrMessage("Email already registered, try a new email");
            } else {
                console.log(err);
            }
        }
    }
    return (
        <Container><Wrapper><Title>Register</Title><Form onSubmit={handleFormSubmit}>
            <Input placeholder='username' value={username} onChange={(e) => { setUsername(e.target.value) }}></Input>
            <Input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
            <Input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
            <Button type="submit">create an account</Button>
        </Form>{errMessage && <p>{errMessage}</p>}<Link to="/login">Already have an account? Sign In</Link></Wrapper></Container>
    )
}
