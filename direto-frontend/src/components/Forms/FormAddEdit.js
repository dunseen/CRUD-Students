import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify'

import { useAuth } from '../../hooks/authContext';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css'

function AddEditForm(props) {
    const { token, user } = useAuth();

    const[form, setForm] = useState({
        id: 0,
        name: '',
        email: '',
        phone: '',
    });

    const onChange = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
    }

    const submitFormAdd = async (e) => {
    e.preventDefault()
    
    try {
        const response = await api.post(`/users/${user.id}/students`,{
            name: form.name,
            email: form.email,
            phone: form.phone,
        }, {headers: {'Authorization': `Bearer ${token}`} } );

        await props.addItemToState(response.data);
        await props.toggle();
        toast.success('Register Success!');
           
    } catch (error) {
        toast.error('Student already exist !')

    }
    }

    const submitFormEdit = async (e) => {
    e.preventDefault()
    
    try {
        const response = await api.put(`users/$${user.id}/students/${form.id}`, {
            name: form.name,
            email: form.email,
            phone: form.phone,
        },{headers: {'Authorization': `Bearer ${token}`} } );

        if(response.data) {
            props.updateState(response.data);
            props.toggle();

            toast.success('Update success !');
        }
    } catch (error) {
        console.log(error);
        toast.error('Failed on update !');
    }
    }

    useEffect(() => {
    if(props.item){
        const { id, name, email, phone} = props.item
        setForm({ id, name, email, phone})
    }
    }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={onChange} value={form.name === null ? '' : form.name} />
      </FormGroup>
     
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" onChange={onChange} value={form.email === null ? '' : form.email}  />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input type="text" name="phone" id="phone" onChange={onChange} value={form.phone === null ? '' : form.phone} />
      </FormGroup>
      <Button color='info'>Submit</Button>
      <ToastContainer/>
    </Form>
  )
}

export default AddEditForm