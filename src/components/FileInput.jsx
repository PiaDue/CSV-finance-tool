import { useFile } from '../contexts/FileContext';

function FileInput() {
    const { handleFileChange } = useFile();

    const handleFileUpload = (event) => {
        handleFileChange(event.target.files[0]);
    };

    return (
        <>
            <h3>Upload CSV File</h3>
            <div className="card">
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
        </>

    );
}
export default FileInput;
