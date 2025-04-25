import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Edit from './pages/Edit';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/edit" element={<Edit />} />
        </Route>
      </Routes>
    </>
    
  );
}

export default App;
