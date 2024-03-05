import { useEffect, useState } from 'react';
import { useFile } from '../contexts/FileContext';

function FinanceData() {
    const { parsedData } = useFile();
    const [skipLines, setSkipLines] = useState(4);

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
                                    <th key={index} scope="col">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {parsedData.slice(skipLines + 1).map((row, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    {row.map((cell, index) => (
                                        <td key={index}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>

    );
}
export default FinanceData;