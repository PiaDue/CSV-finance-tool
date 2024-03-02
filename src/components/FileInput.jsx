import React from 'react';
import { useFile } from '../contexts/FileContext';

function FileInput() {
    const { fileData, handleFileChange } = useFile();

    const handleFileUpload = (event) => {
        handleFileChange(event.target.files[0]);
    };

    return (
        <div className="App">
            <h1>Upload CSV File</h1>
            <div className="card">
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
            {fileData && (
                <div>
                    <h2>File Content:</h2>
                    <pre>{fileData}</pre>
                </div>
            )}
        </div>

    );
}
export default FileInput;
