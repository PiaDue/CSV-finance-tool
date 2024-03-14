import { useFile } from '../contexts/FileContext';
import {useEffect, useState} from "react";

function TransactionOverview() {
    const { showOverview, header, transactions } = useFile();
    const [showCol, setShowCol] = useState([]);

    useEffect(() => {
        const i = [1, 2, 6, 7, 9, 10, 11];
        const initialShowCol = Array(header.length).fill(true);
        i.forEach(index => {
            if (index < initialShowCol.length) {
                initialShowCol[index] = false;
            }
        });
        setShowCol(initialShowCol);
        console.log(transactions)
    }, [header]);

    const handleCheckboxChange = (index) => {
        setShowCol(showCol.map((value, i) => i === index ? !value : value));
    }
    const categoryStyle = (category) => {
        if (category.includes("Income")) {
            return "table-success";
        } else {
            return "table-danger";
        }
    }

    return (
        <>
            {showOverview && (
                <>
                    <h1>Transactions Overview</h1>

                    <div>
                       {/*checkboxes for each column to show/hide*/}
                        {header.map((key, index) => (
                            <div key={index} className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={showCol[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <label className="form-check-label">{key}</label>
                            </div>
                        ))}
                    </div>

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                {header.map((cell, index) => (
                                    showCol[index] && <th key={index} scope="col">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr className={categoryStyle(transaction.category)} key={index}>
                                    {header.map((key, index) => (
                                        showCol[index] && <td key={index}>{transaction[key]}</td>
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
