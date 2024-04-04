import { useFile } from '../contexts/FileContext';
import {useEffect, useState} from "react";
import CategoryTableSection from "./CategoryTableSection";
import PDFGenerator from "./PDFGenerator.jsx";
import { FileSaver } from 'file-saver';


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

    function sayHello() {
        var blob = new Blob(["Hello, world!"], {
            type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, "hello world.txt");
    }

    return (
        <>
            {showOverview && (
                <>
                    <h1>Transactions Overview</h1>

                    <button onClick={sayHello}>Click me!</button>

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
                    <table className='table'>
                        <thead>
                            <tr>
                                <th key="category" scope="col">Kategorie</th>
                                {header.map((cell, index) => (
                                    showCol[index] && <th key={index} scope="col">{cell}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <CategoryTableSection category="GetBack" showCol={showCol}/>
                            <CategoryTableSection category="Income" showCol={showCol}/>
                            <CategoryTableSection category="YouPay" showCol={showCol}/>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
export default TransactionOverview;
