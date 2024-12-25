import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/User.jsx';
import { RecipeProvider } from './context/Receipe.jsx';
import { SavedProvider } from './context/SavedReceipe.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <RecipeProvider>
          <SavedProvider>
            <App />
          </SavedProvider>
        </RecipeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
