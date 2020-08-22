import React from 'react';

import {AuthProvider} from './authContext'

const AppProvider = ({children}) => (
  <AuthProvider>
      {children}
  </AuthProvider>
);

export default AppProvider;
