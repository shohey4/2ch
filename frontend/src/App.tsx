import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import Header from './components/Header';
import ThreadPage from './routes/ThreadPage';

function App() {
  return (
    <div className="w-full h-screen flex flex-col pt-3">
      <Header />
      <div className="grow flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thread/:id" element={<ThreadPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
