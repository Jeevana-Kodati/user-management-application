import React from 'react'
import { styled } from "styled-components";
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetching } from '../redux/alienSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
width:100vw;
height:100vh;
display:flex;
align-items:center;
justify-content:center;`;


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
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const x = useSelector((state) => state.alien.role);
    const y = useSelector((state) => state.alien.username);

    console.log(x, y)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/alien/login`, { username, password });
            const role = response.data.role;
            const id = response.data._id;
            const token = response.data.accessToken;
            dispatch(fetching({ id, username, role, token, }));

            setPassword("");
            setUsername("");

            console.log(response.data, role);
            navigate("/user");
        }
        catch (err) {
            if (err.response && err.response.status === 401) {
                setErrorMessage('Wrong username or password');
            }
            else {
                setErrorMessage('An error occured while logging in. Please try again later.');
            }

            console.log(err);
            console.log(errorMessage);
        }



    }
    return (
        <Container><Wrapper><Form onSubmit={handleFormSubmit}>
            <Input placeholder='username' value={username} onChange={(e) => { setUsername(e.target.value) }}></Input>
            <Input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
            <Button type="submit">Login</Button>
        </Form>
            {errorMessage && <p>{errorMessage}</p>}</Wrapper></Container>
    )
}
