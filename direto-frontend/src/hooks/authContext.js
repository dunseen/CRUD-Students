import React, {createContext, useContext, useState } from 'react';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [data, setData] = useState(()=> {
    const token = localStorage.getItem('@Direto-front:token');
    const user = localStorage.getItem('@Direto-front:user');

    if(token && user){

      return {token, user: JSON.parse(user)};
    }

    return {}

  });
  async function signIn ({email, password }){
    const response = await api.post('sessions', { email, password});
    const { token, user } = response.data;

      if(token !== '') {
        localStorage.setItem('@Direto-front:token', token);
        localStorage.setItem('@Direto-front:user', JSON.stringify(user));
  
        setData({token, user});
      }  

  }
  async function signOut(){
    localStorage.clear();
    setData({});
  };

  return (
    <AuthContext.Provider
    value={
      {
        token: data.token,
        user: data.user,
        signIn,
        signOut
      }}>
    {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth, AuthContext };


