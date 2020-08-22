import React, { useState, useRef } from 'react'
import ReactLoading from 'react-loading';
import { Form } from '@unform/web'
import { FiLogIn, FiLock } from "react-icons/fi";
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/authContext';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { Container, Content } from './styles.js'

export default function Login() {
  const [loading, setLoading] = useState(false)

  const formRef = useRef();
  const {signIn } = useAuth();

  const history = useHistory();

  async function handleSubmit(data) {
    setLoading(true);
    try {

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório !'),
        password: Yup.string().required('Senha obrigatória!')
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push('/home');

    }catch(err) {
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);
        setLoading(false);
        return;
      }
      toast.error('Falha na autenticação, verifique seus dados.')
      setLoading(false);

    }
  };

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor='login'>Login</label>
          <Input
            name='email'
            icon={FiLogIn}
            type='email'
            placeholder='Digite seu E-mail'
          />

          <label htmlFor='password'>Senha</label>
          <Input
            name='password'
            icon={FiLock}
            placeholder='Senha'
            type='password'
          />

          <Button className='btn' type='submit'>
            {loading ?<ReactLoading
            type={'spin'}
            color={"#f9f9f9"}
            delay={10}
            width={'10%'}
            className='loading'/> : 'Entrar' }
          </Button>
          <ToastContainer />
        </Form>
        <Link to='/signup'>
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
    </Container>
  )
}
