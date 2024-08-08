import { useFile } from '../contexts/FileContext';
import { useEffect, useState } from "react";
import PieChart from './PieChart';

function ExpensesOverview() {
    const { transactions, expCategories } = useFile();
    //expCategories: {id, title, icon}

    const [expCatSums, setExpCatSums] = useState([]);

    useEffect(() => {
        let sums = [];
        expCategories.forEach(category => {
            let sum = 0;
            transactions.forEach(transaction => {
                if (transaction.expCat && transaction.expCat.title === category.title) {
                    sum += transaction.Betrag;
                    sum = Math.round(sum * 100) / 100;
                }
            });
            sums.push({ title: category.title, betrag: sum, id: category.id, icon: category.icon });
        });
        sums.sort((a, b) => a.betrag - b.betrag);
        setExpCatSums(sums);
    }, [transactions, expCategories]);


    return (
        <>
            <h2 className="mt-5">Expenses Overview</h2>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-group mb-5">
                            {expCatSums.map((category) => (
                                <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>
                                        <i className={"bi bi-" + category.icon}></i>
                                        <span className='mx-2'>{category.title}</span>
                                    </span>
                                    <span className="badge bg-primary rounded-pill ">{category.betrag} €</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <div style={{ height: '400px' }}>
                            <PieChart data={expCatSums} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}
export default ExpensesOverview;