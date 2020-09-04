import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
