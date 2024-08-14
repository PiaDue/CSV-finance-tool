import { useFile } from '../contexts/FileContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import '../styles/CategoryBoxStyles.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from 'react';

function CategoryBox({ transac }) {
    const { changeExpenseCategory, changeTransactionCategory, expCategories } = useFile();

    const handleCategoryChange = (newCategory) => {
        changeTransactionCategory(transac, newCategory);
    };

    const handleExpenseCategoryChange = (newExpCategoryTitle) => {
        changeExpenseCategory(transac, newExpCategoryTitle);
    };

    // see styles/CategoryBoxStyles.scss
    return (
        <div className='d-flex justify-content-between align-items-center'>
            <div>
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
            </div>
            <div>
                {transac.category === "YouPay" && transac.expCat && (
                    <div className="d-flex">

                        {/* <Button variant="light" size="sm" className="m-1">
                            <i className={"bi bi-" + transac.expCat.icon}></i>
                            <span>{transac.expCat.title}</span> 
                        </Button> */}

                        <Dropdown>
                            <Dropdown.Toggle as={'div'} className={'d-inline-flex p-0'} id="expcategory-dropdown" noCaret>
                                <Button variant="light" size="sm" className="m-1">
                                    <i className={"bi bi-" + transac.expCat.icon}></i>
                                </Button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {expCategories.map((expCat, index) => (
                                    <Dropdown.Item key={index} className={'d-flex'} onClick={() => handleExpenseCategoryChange(expCat.title)}>
                                        <div className={"d-flex"}>
                                            <i className={"bi bi-" + expCat.icon} style={{ marginRight: '8px' }}></i>
                                            <span>{expCat.title}</span>
                                        </div>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>


                    </div>
                )}
            </div>
        </div>
    )

}

export default CategoryBox;