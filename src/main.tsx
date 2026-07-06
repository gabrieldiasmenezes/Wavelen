import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/global.css';
import "./style/theme.css";
import App from './App.tsx';
import { AuthProvider } from './context/auth/authProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </StrictMode>,
);
