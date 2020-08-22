import React, { useState, useRef } from 'react'
import ReactLoading from 'react-loading';
import { Form } from '@unform/web'
import { FiLogIn, FiLock, FiMail } from "react-icons/fi";
import { useHistory, Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/authContext';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { Container, Content, Background, AnimatedContent } from "./styles";

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
      console.log(err);
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
          <AnimatedContent>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Login</h1>

              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                placeholder="Password"
                type="password"
              />

              <Button type="submit">
                {loading ?<ReactLoading
                type={'spin'}
                color={"#f9f9f9"}
                delay={10}
                width={'10%'}
                height={'70%'}
                className='loading'/> : 'Login' }
                </Button>
              <ToastContainer />
            </Form>

            <Link to="/signup">
              <FiLogIn />
              SignUp
            </Link>
          </AnimatedContent>

      </Content>
    <Background />
  </Container>
  )
}
