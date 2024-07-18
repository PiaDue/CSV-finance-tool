/* eslint-disable react/prop-types */
import { useFile } from '../contexts/FileContext';
import GBCategorySection from "./GBCategorySection";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddTransactionModal from './AddTransactionModal';
import '../styles/CategoryBoxStyles.scss';
import Dropdown from 'react-bootstrap/Dropdown';


function CategoryTableSection({ category, showCol }) {

    const { header, sums, transactions, changeTransactionCategory } = useFile();

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
            changeTransactionCategory(transac, newCategory);
        };

        // see styles/CategoryBoxStyles.scss
        return (
            <Dropdown>
                <Dropdown.Toggle as={'div'} className={'d-inline-flex p-0'} id="category-dropdown" noCaret>
                    <div className={`category-box ${transac.category.toLowerCase()}`}></div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className={'d-flex'} onClick={() => handleCategoryChange('GetBack')}>
                        <div className={`category-box getback`}></div>
                        <span>Get Back</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={'d-flex'} onClick={() => handleCategoryChange('Income')}>
                        <div className={`category-box income`}></div>
                        <span>Income</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={'d-flex'} onClick={() => handleCategoryChange('YouPay')}>
                        <div className={`category-box youpay`}></div>
                        <span>You Pay</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
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
                        <td key="category">{categoryBox(transaction)}</td>
                        {header.map((key, index) => (
                            showCol[index] && <td key={index}>{transaction[key]}</td>
                        ))}
                    </tr>
                )
            ))}
            <tr>
                <td>
                    <AddTransactionModal />
                </td>
                <td colSpan={header.length - 1} className="text-end">
                    <p className={categoryText(category)}><strong>= {categorySum} €</strong></p>
                </td>
            </tr>
        </>
    );
}

export default CategoryTableSection;