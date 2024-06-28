import { useFile } from '../contexts/FileContext';
import { useEffect, useState } from "react";
import CategoryTableSection from "./CategoryTableSection";
import PDFGenerator from "./PDFGenerator.jsx";
import saveAs from 'file-saver';
import { pdf } from '@react-pdf/renderer'


function TransactionOverview() {
    const { showOverview, getBackKeywords, header, transactions, sums, monthYear } = useFile();
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

    const generatePDF = async () => {
        const blob = await pdf(<PDFGenerator header={header} sums={sums} transactions={transactions} showCol={showCol} monthYear={monthYear} />).toBlob()
        saveAs(blob, `${monthYear.m}-${monthYear.y}-abrechnung.pdf`)
    };

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

                    {/*transactions table*/}
                    <table className='table mb-5'>
                        <thead>
                            <tr>
                                <th key="category" scope="col">Kategorie</th>
                                {header.map((cell, index) => (
                                    showCol[index] && <th key={index} scope="col">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={header.length}>
                                <h3>GetBack Keywords: {getBackKeywords}</h3>
                            </td></tr>
                            <CategoryTableSection category="GetBack" showCol={showCol} />
                            <CategoryTableSection category="Income" showCol={showCol} />
                            <CategoryTableSection category="YouPay" showCol={showCol} />
                        </tbody>
                    </table>
                    <button className="btn btn-primary btn-lg position-fixed bottom-0 end-0 m-3"
                        onClick={generatePDF}>
                        <i className="bi bi-download me-1"></i> PDF
                    </button>
                </>
            )}
        </>
    );
}
export default TransactionOverview;
