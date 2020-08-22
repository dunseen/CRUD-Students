import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap'

import ModalForm from '../../components/Modals/Modal'
import DataTable from '../../components/Tables/DataTable'

import { useAuth } from '../../hooks/authContext';
import api from '../../services/api';

import { Header } from './styles.js';
import { toast } from 'react-toastify';

export default function Home(props){
    const [items, setItems] = useState([]);
    const { token, signOut, user } = useAuth();

    const getItems = async () => {

        try {
          
          const response = await api.get(`users/${user.id}/students` ,{ headers: {'authorization' : `Bearer ${token}`} });
          const data = await response.data;
          setItems(data.students);
            
            
        } catch (error) {
            console.log(error);
        }
    }

    const addItemToState =  async (item) => {

      setItems([...items,item])
     
    }

    const updateState =  (item) => {
        const itemIndex = items.findIndex(data => data.id === item.id);
        const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)];
        setItems(newArray);
    }

    const deleteItemFromState = (id) => {
        const updatedItems = items.filter(item => item.id !== id)
        setItems(updatedItems);
    }

    useEffect(() => {
        getItems()
        },[]);

    return (
        <>
       <Container className="App">
        <Row>
          <Col>
            <Header>
            <h1>Students List</h1>
            <Button color="danger" onClick={() => signOut()}>LogOut</Button>
            </Header>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add Student" addItemToState={addItemToState}/>
          </Col>
        </Row>
      </Container>
      </>
    )
}