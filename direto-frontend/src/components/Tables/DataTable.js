import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

import { ToastContainer, toast } from 'react-toastify'

import { useAuth } from '../../hooks/authContext';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';

function DataTable(props){
    const { token, user } = useAuth();
    
    const deleteItem = async (id) => {
        try {
            let confirmDelete = window.confirm('Delete student data ?');

            if(confirmDelete){
                await api.delete(`/users/${user.id}/students/${id}`, {headers: {'Authorization': `Bearer ${token}`} });
                props.deleteItemFromState(id)
                
                toast.success('Student removed.');
            }

            }catch (error) {
                console.log(error);
                toast.error('Fail on delete, try again.');
            }  
    }

    const items = props.items.map(item => {
    return (
        <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.registration}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>
            <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button outline color="info" onClick={() => deleteItem(item.id)}>Del</Button>
            <ToastContainer />
            </div>
        </td>
        </tr>
        )
    })

  return (
    <Table responsive hover dark>
      <thead>
        <tr>
          <th>ID</th>
          <th>Registration</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default DataTable