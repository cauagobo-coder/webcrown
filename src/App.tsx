import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/ui/CustomCursor';

const Home = lazy(() => import('./pages/Home'));
const ProjectView = lazy(() => import('./pages/ProjectView'));

function App() {
    return (
        <>
            <CustomCursor />
            <Router>
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/portfolio/:id" element={<ProjectView />} />
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
