import { useEffect, useState } from 'react';
import { useFile } from '../contexts/FileContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

function FinanceData() {
    const { parsedData } = useFile();
    const [skipLines, setSkipLines] = useState(4);
    const excludedColumns = [1,2,6,7,9,10,11]; //TODO: make this dynamic

    useEffect(() => {
        console.log(parsedData);
    }, [parsedData]);

    if (!parsedData) {
        return <div>No data available</div>;
    }

    return (
        <>
            {parsedData && (
                <div>
                    <div className='lineSkipper'>
                        <label htmlFor="skipLinesInput">Skip Lines:</label>
                        <input
                            id="skipLinesInput"
                            type="number"
                            value={skipLines}
                            onChange={() => { setSkipLines(parseInt(event.target.value)); }}
                            min={0}
                        />
                    </div>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope="col">*</th>
                                {parsedData[skipLines].map((cell, index) => (
                                    !excludedColumns.includes(index) && <th key={index} scope="col">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {parsedData.slice(skipLines + 1).map((row, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    {row.map((cell, index) => (
                                        !excludedColumns.includes(index) && <td key={index}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary btn-lg position-fixed bottom-0 end-0 m-3" onClick={() => { console.log('Analyze'); }}>
                        Analyze
                    </button>
                </div>
            )}
        </>

    );
}
export default FinanceData;