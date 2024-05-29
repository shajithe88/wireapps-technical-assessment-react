import './App.css';
import HomePage from "./features/home/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryProducts from "./features/products/CategoryProducts";
import Header from "./components/common/header/Header";

function App() {
  return (
      <Router>
          <div style={{ background: '#F5F5F5' }}>
              <Header />
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/category/:categoryName" element={<CategoryProducts />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
