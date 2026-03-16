import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';
import CustomCursor from './components/ui/CustomCursor';

function App() {
    return (
        <>
            <CustomCursor />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio/:id" element={<ProjectView />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
