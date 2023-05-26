import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { TrainRoutesList } from "./components/TrainRoutesList";
import { NewRouteForm } from "./components/NewRouteForm/NewRouteForm";

function App() {
  return (
    <div className="">
      <nav className="navbar px-3 is-dark">
        <div className="navbar-brand">
          <a
            className="navbar-item"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://kevychsolutions.com/wp-content/uploads/2022/02/Screenshot_2022-02-17_at_18.23.31-removebg-preview.png"
              alt="KevychSolutions-test-task"
              width="222"
              height="28"
            />
          </a>
        </div>
      </nav>

      <main className="section main">
        <Routes>
          <Route path="/" element={<TrainRoutesList />} />
          <Route path="/add" element={<NewRouteForm />} />
          <Route path="*" element={<p>Page not found</p>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
