import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppProvider } from "./context/app.context";
import { AuthProvider } from './context/AdminAuthContext';

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppProvider>
);
