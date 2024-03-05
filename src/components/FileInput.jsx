import { useFile } from '../contexts/FileContext';

function FileInput() {
    const { handleFileChange } = useFile();

    const handleFileUpload = (event) => {
        handleFileChange(event.target.files[0]);
    };

    return (
        <>
            <h1>Upload CSV File</h1>
            <div className="card">
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
        </>

    );
}
export default FileInput;
