import './index.css'
import ReactDOM from 'react-dom/client';
import App from './App';
import { register } from './serviceWorkerRegistration';

require('dotenv').config();
const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(<App/>)
register();