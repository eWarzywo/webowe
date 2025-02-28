import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Categories from './pages/Categories';
import './styles/main.scss';

const App = () => {
    return (
        <Router>
            <div className="app">
                <header className="header">
                    <div className="container">
                        <h1 className="logo">Dowalony Blog</h1>
                        <nav className="nav">
                            <Link to="/" className="nav__link">Home</Link>
                            <Link to="/categories" className="nav__link">Categories</Link>
                            <Link to="/post/1" className="nav__link">Post</Link>
                        </nav>
                    </div>
                </header>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/post/:id" element={<Post />} />
                        <Route path="/categories" element={<Categories />} />
                    </Routes>
                </main>
                <footer className="footer">
                    <div className="container">&copy; 2024</div>
                </footer>
            </div>
        </Router>
    );
};

export default App;