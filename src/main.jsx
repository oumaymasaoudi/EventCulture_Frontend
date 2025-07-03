import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="237657974922-02gqtemj5st5ugofq55lbn90onuaeqmb.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
