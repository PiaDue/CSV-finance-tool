import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <h1>Upload CSV File</h1>

      <div className="card">
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      {file && (
        <div>
          <h2>File Content:</h2>
          <pre>{file}</pre>
        </div>
      )}
    </>
  )
}

export default App 
