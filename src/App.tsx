import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio/:id" element={<ProjectView />} />
            </Routes>
        </Router>
    );
}

export default App;
