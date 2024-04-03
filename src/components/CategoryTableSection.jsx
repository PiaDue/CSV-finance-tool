import { useFile } from '../contexts/FileContext';
import {useEffect, useState} from "react";
import '../styles/CategoryBoxStyles.scss';

function CategoryTableSection({category, showCol}){
    const { header, sums, transactions } = useFile();

    const categoryStyle = (cat) => {
        if (cat.includes("Income")) {
            return "bg-success-subtle m-2";
        } else if (cat.includes("YouPay")) {
            return "bg-danger-subtle m-2";
        } else if (cat.includes("GetBack")) {
            return "bg-warning-subtle m-2";
        }
    }

    const categoryText = (cat) => {
        if (cat.includes("Income")) {
            return "text-success";
        } else if (cat.includes("YouPay")) {
            return "text-danger";
        } else if (cat.includes("GetBack")) {
            return "text-warning";
        }
    }

    const categoryBox = (transac) => {

        const handleClick = () => {
            console.log(`Clicked on ${transac.category}`);
        };

        // see styles/CategoryBoxStyles.scss
        return (
            <div onClick={handleClick} className={`category-box ${transac.category.toLowerCase()}`}></div>
        )
    }

    // Dynamically access the correct prop of sums based on the category
    const categorySum = category === "Income" ? sums.income : category === "YouPay" ? sums.youPay : sums.getBack;


    return(
        <>
            <tr>
                <td colSpan={header.length}>
                    <h3 className={categoryStyle(category)} >{category}</h3>
                </td>
            </tr>
            {transactions.map((transaction, index) => (
                transaction.category.includes(category) && (
                    <tr key={index}>
                        <td key="category">{categoryBox(transaction)}</td>
                        {header.map((key, index) => (
                            showCol[index] && <td key={index}>{transaction[key]}</td>
                        ))}
                    </tr>
                )
            ))}
            <tr>
                <td colSpan={header.length} className="text-end">
                    <p className={categoryText(category)}><strong>= {categorySum} €</strong></p>
                </td>
            </tr>
        </>
    );
}

export default CategoryTableSection;