import { useFile } from '../contexts/FileContext';
import {useEffect, useState} from "react";
import '../styles/CategoryBoxStyles.scss';
import Dropdown from 'react-bootstrap/Dropdown';


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

    //TODO: make this a separate component
    const categoryBox = (transac) => {
        const handleCategoryChange = (newCategory) => {
            // You can add logic here to update the category in your data/state
            console.log(`Changed category from ${transac.category} to ${newCategory}`);
        };

        // see styles/CategoryBoxStyles.scss
        return (
            <Dropdown>
                <Dropdown.Toggle as={'div'} className={'d-inline-flex p-0'} id="category-dropdown" noCaret>
                    <div className={`category-box ${transac.category.toLowerCase()}`}></div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleCategoryChange('GetBack')}>Get Back</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryChange('Income')}>Income</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryChange('YouPay')}>You Pay</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
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