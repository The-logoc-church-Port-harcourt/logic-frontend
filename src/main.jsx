import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from "./context/app.context";

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
)
