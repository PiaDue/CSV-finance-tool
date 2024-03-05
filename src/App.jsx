import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FileInput from './components/FileInput';
import FinanceData from './components/FinanceData';
import { FileProvider } from './contexts/FileContext';

function App() {
  return (
    <FileProvider>
      <div className="App">
        <FileInput />
        <FinanceData />
      </div>
    </FileProvider>
  );
}

export default App;