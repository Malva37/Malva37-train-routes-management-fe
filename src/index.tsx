import ReactDOM from 'react-dom/client';
import './index.css';
import 'bulma/css/bulma.min.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { RouteProvider } from './RouteProvider';

const root = ReactDOM.createRoot(document.getElementById('root')  as Element);
root.render(
  <BrowserRouter>
    <RouteProvider>
      <App />
    </RouteProvider>
  </BrowserRouter>
);

reportWebVitals();
