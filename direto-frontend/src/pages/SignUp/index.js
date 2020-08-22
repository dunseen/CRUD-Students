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
        name: Yup.string().required('Name required !'),
        email: Yup.string().required('E-mail required !').email('Enter a valid E-mail Adress !'),
        password: Yup.string().min(6, 'Min 6 characters!'),
      })

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
      toast.success('Register Success !');

      history.push('/');


    }catch(err) {
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);
        setLoading(false);
        return;
      }
      toast.error('Fail on register user, try again !');
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

          <Button type="submit">
            {loading ?<ReactLoading
              type={'spin'}
              color={"#f9f9f9"}
              delay={10}
              width={'10%'}
              height={'70%'}
              className='loading'/> : 'SignUp' }
            </Button>
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
