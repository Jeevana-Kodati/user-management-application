import * as React from 'react';
import { DataGrid, } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NavBar from './NavBar';
import { useSelector } from 'react-redux';

export default function DataTable() {
    const [aliens, setAliens] = useState([]);
    const navigate = useNavigate();
    const token = useSelector((state) => state.alien.token);
    const headers = {
        Authorization: `Bearer ${token}`
    };

    useEffect(() => {
        const fetchAliens = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/aliens/allaliens`, { headers });

                setAliens(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchAliens();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', },
        { field: 'username', headerName: 'User Name', width: 130, headerAlign: 'center', },
        { field: 'email', headerName: 'Email Address', width: 130, headerAlign: 'center', },
        { field: 'role', headerName: 'Role', width: 130, headerAlign: 'center', },
        {
            field: "action",
            headerName: " Actions",
            sortable: false,
            headerAlign: 'center',

            width: 200,
            renderCell: (params) =>
                <div>
                    <Button onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(params.row.object_id)}><DeleteForeverIcon /></Button>
                </div>
        },];

    const handleDelete = async (objectId) => {
        try {
            const deletedAlien = await axios.delete(`http://localhost:5000/api/aliens/delete/${objectId}`, { headers });

            console.log(deletedAlien);
            const response = await axios.get(`http://localhost:5000/api/aliens/allaliens`, { headers });
            setAliens(response.data);

        } catch (err) {
            console.log(err);
        }
    }
    const handleEdit = (alienRow) => {
        navigate(`/admin/${alienRow.id}`, { state: { alienRow } });
    }
    const rows = aliens.map((alien, index) => ({
        object_id: alien._id,
        id: index + 1,
        username: alien.username,
        email: alien.email,
        role: alien.role[alien.role.length - 1],
    }))
    return (
        <div>
            <NavBar />
            <div style={{ height: 400, width: '100%', margin: 20 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>

    );
}