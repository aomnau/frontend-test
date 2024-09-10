import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterFrom from './layout/RegisterFrom';
import LoginFrom from './layout/LoginFrom';
import HomePage from './layout/Homepage';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterFrom />} />
                <Route path="/login" element={<LoginFrom />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/" element={<LoginFrom />} />
            </Routes>
        </Router>
    );
};

export default App;

