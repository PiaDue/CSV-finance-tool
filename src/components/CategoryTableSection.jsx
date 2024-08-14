/* eslint-disable react/prop-types */
import { useFile } from '../contexts/FileContext';
import GBCategorySection from "./GBCategorySection";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import AddTransactionModal from './AddTransactionModal';
import '../styles/CategoryBoxStyles.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import CategoryBox from './CategoryBox';


function CategoryTableSection({ category, showCol }) {

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

    // Dynamically access the correct prop of sums based on the category
    const categorySum = category === "Income" ? sums.income : category === "YouPay" ? sums.youPay : sums.getBack;

    const GBKeywords = (category) => {
        if (category === "GetBack") {
            return (
                <tr><td colSpan={header.length} className="text-start">
                    <GBCategorySection />
                </td></tr>
            )
        }

    };


    return (
        <>
            <tr>
                <td colSpan={header.length}>
                    <h3 className={categoryStyle(category)} >{category}</h3>
                </td>
            </tr>
            {GBKeywords(category)}
            {transactions.map((transaction, index) => (
                transaction.category.includes(category) && (
                    <tr key={index}>
                        <td key="category">
                            <CategoryBox transac={transaction} />
                        </td>
                        {header.map((key, index) => (
                            showCol[index] && <td key={index}>{transaction[key]}</td>
                        ))}
                    </tr>
                )
            ))}
            <tr>
                <td>
                    <AddTransactionModal initialCategory={category} />
                </td>
                <td colSpan={header.length - 1} className="text-end">
                    <p className={categoryText(category)}><strong>= {categorySum} €</strong></p>
                </td>
            </tr>
        </>
    );
}

export default CategoryTableSection;