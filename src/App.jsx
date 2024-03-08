import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FileInput from './components/FileInput';
import FileData from "./components/FileData.jsx";
import { FileProvider } from './contexts/FileContext';
import TransactionOverview from "./components/TransactionOverview.jsx";


function App() {
  return (
    <FileProvider>
      <div className="App">
        <FileInput />
        <FileData />
        <TransactionOverview />
      </div>
    </FileProvider>
  );
}

export default App;