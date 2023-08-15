import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';

export default function BasicTextFields() {
    const token = useSelector((state) => state.alien.token);
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const navigate = useNavigate();
    const location = useLocation();
    const alienRow = location.state;
    const { username, email, role, object_id } = alienRow.alienRow;

    const [formData, setFormData] = useState({
        object_id: object_id,
        username: username,
        email: email,
        role: role,
    })

    const handleChange = (event) => {
        console.log(event.target);
        const { name, value } = event.target;
        const roleOptions = {
            user: ['user'],
            manager: ['user', 'manager'],
            admin: ['user', 'manager', 'admin']
        };
        if (name === 'role') {
            const updatedRole = roleOptions[value];
            const lastRole = updatedRole[updatedRole.length - 1];
            setFormData((prevData) => ({
                ...prevData, [name]: lastRole, role: updatedRole,
            }))
        } else {
            setFormData((prevData) => ({
                ...prevData, [name]: value,
            }))
        }

    }
    const handleUpdate = async (formDataToUpdate) => {
        try {
            console.log(formDataToUpdate);
            const response = await axios.put(`http://localhost:5000/api/aliens/${formDataToUpdate.object_id}`, formDataToUpdate, { headers });
            console.log(response.data);

        } catch (err) {
            console.log(err);
        }
    }
    return (

        <div style={{ margin: '100px' }}>Alien details
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '30ch', display: 'flex', flexDirection: 'column' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" variant="outlined" name='username' label='username' value={formData.username} onChange={handleChange} />
                <TextField id="outlined-basic" variant="outlined" name='email' label='email' value={formData.email} onChange={handleChange} />
                <TextField id="outlined-basic" variant="outlined" name='role' label='role' value={Array.isArray(formData.role) ? formData.role[formData.role.length - 1] : formData.role} onChange={handleChange} select >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem></TextField>
            </Box>
            <div><Button style={{ margin: '10px' }} variant="contained" onClick={() => handleUpdate(formData)}>update</Button><Button color="success" variant="contained" onClick={() => { navigate(`/admin`) }}>Go back</Button></div>
        </div>

    );
}