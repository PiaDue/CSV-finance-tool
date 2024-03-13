import { useFile } from '../contexts/FileContext';

function TransactionOverview() {
    const { showOverview, header, transactions } = useFile();

    return (
        <>
            {showOverview && (
                <>
                    <h1>Transactions Overview</h1>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                {header.map((cell, index) => (
                                    <th key={index} scope="col">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    {header.map((key, index) => (
                                        <td key={index}>{transaction[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
export default TransactionOverview;
