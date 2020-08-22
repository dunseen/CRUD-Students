import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

import { ToastContainer, toast } from 'react-toastify'

import { useAuth } from '../../hooks/authContext';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';

function DataTable(props){
    const { token } = useAuth();
    
    const deleteItem = async (id) => {
        try {
            let confirmDelete = window.confirm('Remover os dados do estudante ?');

            if(confirmDelete){
                await api.delete(`students/${id}`, {headers: {'Authorization': `Bearer ${token}`} });
                props.deleteItemFromState(id)
                
                toast.success('Estudante removido com sucesso !');
            }else {
                toast.error('Falha ao remover estudante !');
                }
            }catch (error) {
                console.log(error);
                toast.error('Falha na operação, tente novamente !');
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
            <Button color="danger" onClick={() => deleteItem(item.id)}>Remove</Button>
            <ToastContainer />
            </div>
        </td>
        </tr>
        )
    })

  return (
    <Table responsive hover>
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