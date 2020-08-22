import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap'

import ModalForm from '../../components/Modals/Modal'
import DataTable from '../../components/Tables/DataTable'

import { useAuth } from '../../hooks/authContext';
import api from '../../services/api';

import { Header } from './styles.js';

export default function Home(props){
    const [items, setItems] = useState([]);
    const { token, signOut } = useAuth();

    const getItems = async () => {

        try {
            
            const response = await api.get('students' ,{ headers: {'authorization' : `Bearer ${token}`} });
            const data = await response.data;
            setItems(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    const addItemToState =  (item) => {
        setItems([...items, item]);
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
            <h1>CRUD Students</h1>
            <button onClick={() => signOut()}>LogOut</button>
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
            <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
          </Col>
        </Row>
      </Container>
      </>
    )
}