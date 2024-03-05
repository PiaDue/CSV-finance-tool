import { useEffect } from 'react';
import { useFile } from '../contexts/FileContext';

function FinanceData() {
    const { parsedData } = useFile();

    return (
        <>
            {parsedData && (
                <div>
                    <h2>Parsed Data:</h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    {parsedData[0].map((cell, index) => (
                                        <th key={index}>{cell}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {parsedData.slice(1).map((row, index) => (
                                    <tr key={index}>
                                        {row.map((cell, index) => (
                                            <td key={index}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>

    );
}
export default FinanceData;