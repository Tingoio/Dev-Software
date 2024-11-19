import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Layout from "./layout/Layout";
import Home from "./pages/home";
import Pessoas from "./pages/pessoa";
// import 'bootstrap/dist/css/bootstrapt.min.css';

function App() {
    return (
        <>
        <Routes>
            <Route path="/" element ={<Layout><Home/></Layout>} />
            <Route path="/pessoa" element ={<Layout><Pessoas/></Layout>} />
        </Routes>
        </>
    );
}

export default App;