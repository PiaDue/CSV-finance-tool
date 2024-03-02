import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FileInput from './components/FileInput';
import { FileProvider } from './contexts/FileContext';

function App() {
  return (
    <FileProvider>
      <div className="App">
        <FileInput />
      </div>
    </FileProvider>
  );
}

export default App;