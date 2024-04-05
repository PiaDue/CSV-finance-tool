import { useFile } from '../contexts/FileContext';
import {useRef} from "react";

function FileInput() {
    const { handleFileChange, parsedData } = useFile();
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        handleFileChange(event.target.files[0]);
    };

    const clearFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
            handleFileChange(null); // Clear the file in context
        }
    };

    return (
        <>
            <h3>Upload CSV File</h3>
            <div className="card d-flex flex-row justify-content-between">
                <input type="file" accept=".csv"
                       ref={fileInputRef}
                       onChange={handleFileUpload}
                />
                {parsedData && (
                    <button className="btn btn-outline-danger " onClick={clearFileInput}>
                        <i className="bi bi-x"></i>
                    </button>
                )}
            </div>
        </>

    );
}
export default FileInput;
