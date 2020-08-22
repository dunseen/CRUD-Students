import React, { useState, useRef } from 'react'
import ReactLoading from 'react-loading';
import { Form } from '@unform/web'
import { FiArrowLeft, FiLock, FiUser, FiMail } from "react-icons/fi";
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import api from '../../services/api';

import { Container, Content, Background, AnimatedContent } from "./styles";

import 'react-toastify/dist/ReactToastify.css'

export default function SignUp() {
  const [loading, setLoading] = useState(false)

  const formRef = useRef();

  const history = useHistory();

  async function handleSubmit(data) {
    setLoading(true);
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório !'),
        email: Yup.string().required('E-mail obrigatório !').email('Digite um e-mail válido!'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos !'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
      toast.success('Cadastro realizado !');

      history.push('/');


    }catch(err) {
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);
        setLoading(false);
        return;
      }
      toast.error('Falha ao criar usuário, tente novamente !');
      setLoading(false);

    }
  };

  return (
    <Container>
    <Background />
    <Content>
      <AnimatedContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>SignUp</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Password"
            type="password"
          />

          <Button type="submit">SignUp</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Login
        </Link>
      </AnimatedContent>
    </Content>
  </Container>
  )
}
