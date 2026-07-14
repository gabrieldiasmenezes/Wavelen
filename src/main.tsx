import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/global.css';
import "./style/theme.css";
import App from './App.tsx';
import { AuthProvider } from './context/auth/AuthProvider.tsx';
import { OnboardingProvider } from './context/onboarding/onboardingProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <OnboardingProvider>
          <App/>
      </OnboardingProvider>
      </AuthProvider>
  </StrictMode>,
);
