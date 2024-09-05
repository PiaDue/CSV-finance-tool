/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const FileContext = createContext();
export const useFile = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
    const [linesSkippedContext, setLinesSkippedContext] = useState(0);
    const [parsedData, setParsedData] = useState(null);
    const [monthYear, setMonthYear] = useState({ m: 0, y: 0 });
    const [header, setHeader] = useState([String]);
    const [showOverview, setShowOverview] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [sums, setSums] = useState({ income: 0.0, youPay: 0.0, getBack: 0.0 });
    const [getBackKeywords, setGetBackKeywords] = useState([]);
    const [expCategories, setExpCategories] = useState([]);
    let apiKey = "API_KEY";

    useEffect(() => {
        console.log('API Key:', apiKey);

        // Fetch data form local JSON server
        const fetchGetBackKeywords = async () => {
            try {
                const response = await axios.get('http://localhost:5001/getBackKeywords');
                setGetBackKeywords(response.data.map(item => item.keyword));
            } catch (error) {
                console.error('Error fetching keywords:', error);
            }
        };

        const fetchExpCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5001/expenseCategories');
                setExpCategories(response.data);
            } catch (error) {
                console.error('Error fetching expense categories:', error);
            }
        }

        const fetchApiKey = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api-key');
                console.log('API Key:', response.data);
                apiKey = response.data;
            } catch (error) {
                console.error('Error fetching API Key:', error);
            }
        }

        fetchGetBackKeywords();
        fetchExpCategories();
        fetchApiKey();
    }, []);

    const saveGetBackKeywords = async (newKeywords) => {
        try {
            const updatedKeywords = newKeywords.map((keyword, index) => ({ id: (index + 1).toString(), keyword }));

            // Clear all existing keywords
            const response = await axios.get('http://localhost:5001/getBackKeywords');
            const currentKeywords = response.data;
            for (const currKeyword of currentKeywords) {
                await axios.delete(`http://localhost:5001/getBackKeywords/${currKeyword.id}`);
            }

            // Add updated keywords
            for (const keyword of updatedKeywords) {
                await axios.post('http://localhost:5001/getBackKeywords', keyword);
            }

            setGetBackKeywords(newKeywords);
        } catch (error) {
            console.error('Error saving keywords:', error);
        }
    };


    const handleFileChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const parsedData = parseCSV(fileContent);
                setParsedData(parsedData);
            };
            reader.readAsText(file, 'ISO-8859-1');
        } else {
            setParsedData(null);
            setHeader([String]);
            setMonthYear({ m: 0, y: 0 });
            setTransactions([]);
            setSums({ income: 0.0, youPay: 0.0, getBack: 0.0 });
        }
        changeShowOverview(false);
    };

    const changeTransactionCategory = (transaction, category) => {
        const updatedTransaction = { ...transaction, category };
        const updatedTransactions = transactions.map(t => t === transaction ? updatedTransaction : t);
        setTransactions(updatedTransactions);
    }

    const changeExpenseCategory = (transaction, expCategoryTitle) => {
        const expCat = expCategories.find(cat => cat.title === expCategoryTitle);
        const updatedTransaction = { ...transaction, expCat };
        const updatedTransactions = transactions.map(t => t === transaction ? updatedTransaction : t);
        setTransactions(updatedTransactions);
    };

    const changeShowOverview = (bool) => {
        setShowOverview(bool);
    }

    const parseCSV = (str) => {
        const arr = []; //TODO: use a type to save the data in objects
        let quote = false;  // 'true' means we're inside a quoted field

        // Iterate over each character, keep track of current row and column (of the returned array)
        for (let row = 0, col = 0, c = 0; c < str.length; c++) {
            let cc = str[c], nc = str[c + 1];        // Current character, next character
            arr[row] = arr[row] || [];             // Create a new row if necessary
            arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

            // If the current character is a quotation mark, and we're inside a
            // quoted field, and the next character is also a quotation mark,
            // add a quotation mark to the current column and skip the next character
            if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

            // If it's just one quotation mark, begin/end quoted field
            if (cc == '"') { quote = !quote; continue; }

            // If it's a comma and we're not in a quoted field, move on to the next column
            if (cc == ';' && !quote) { ++col; continue; }

            // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
            // and move on to the next row and move to column 0 of that new row
            if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

            // If it's a newline (LF or CR) and we're not in a quoted field,
            // move on to the next row and move to column 0 of that new row
            if (cc == '\n' && !quote) { ++row; col = 0; continue; }
            if (cc == '\r' && !quote) { ++row; col = 0; continue; }

            // Otherwise, append the current character to the current column
            arr[row][col] += cc;
        }
        return arr;
    }

    const analyzeData = (skippedLines) => {
        setHeader(parsedData[skippedLines]);
        setLinesSkippedContext(skippedLines);


        const transactionsArr = [];
        for (let i = skippedLines + 1; i < parsedData.length; i++) {
            let transaction = {};
            for (let j = 0; j < parsedData[i].length; j++) {
                transaction = { ...transaction, [parsedData[skippedLines][j]]: parsedData[i][j] };
            }

            /*convert  amount to float*/
            const betragString = Object.keys(transaction)
                .filter(key => key.includes("Betrag"))
                .map(key => [key, transaction[key]]);
            if (betragString.length > 0) {
                const betragKey = "Betrag";
                const betragValue = betragString[0][1];
                const betragFloat = parseFloat(betragValue.replace(",", "."));
                transaction = { ...transaction, [betragKey]: betragFloat };
            }

            /*categorize transactions*/
            if (transaction["Umsatztyp"] && transaction["Umsatztyp"].includes("Eingang")) {
                transaction = { ...transaction, category: "Income" };
            } else {
                const zahlungsempfanger = transaction["Zahlungsempfänger*in"];
                const isGetBack = getBackKeywords.some(keyword => zahlungsempfanger && zahlungsempfanger.toLowerCase().includes(keyword.toLowerCase()));

                if (isGetBack) {
                    transaction = { ...transaction, category: "GetBack" };
                } else {
                    transaction = { ...transaction, category: "YouPay" };
                }
            }
            transactionsArr.push(transaction);
        }
        setTransactions(transactionsArr);

        const date = transactionsArr[0]["Buchungsdatum"];
        const month = date.split(".")[1];
        const year = date.split(".")[2];
        setMonthYear({ m: month, y: year });

        changeShowOverview(true);
    }

    const addTransaction = (formData) => {
        const lastTransaction = transactions[transactions.length - 1];

        const newTransaction = {
            ...lastTransaction,
            "Betrag": parseFloat(formData.betrag.replace(",", ".")),
            "Betrag (€)": formData.betrag,
            "Buchungsdatum": formData.date.toLocaleDateString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
            "Wertstellung": formData.date.toLocaleDateString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
            "Gläubiger-ID": "",
            "IBAN": "",
            "Kundenreferenz": "",
            "Mandatsreferenz": "",
            "Status": "",
            "Umsatztyp": "",
            "Verwendungszweck": formData.verwendungszweck,
            "Zahlungsempfänger*in": "",
            "Zahlungspflichtige*r": "",
            "category": formData.category
        };

        setTransactions([...transactions, newTransaction]);
    }


    // Expense Categorization
    useEffect(() => {

        if (transactions.length > 0) {
            for (const transaction of transactions) {
                if (!transaction.expCat && transaction.category === "YouPay") {

                    //TODO: ChatGPT API Category Prediction
                    //for testing: chose random cat of expCategories
                    const randomIndex = Math.floor(Math.random() * expCategories.length);
                    transaction.expCat = expCategories[randomIndex];
                }
            }
        }
    }, [transactions]);




    //analyze data again when getBackKeywords change
    useEffect(() => {
        if (parsedData && showOverview) {
            analyzeData(linesSkippedContext);
        }
    }, [getBackKeywords]);


    const calculateSums = () => {
        const income = transactions.filter(transaction => transaction.category === "Income").reduce((acc, transaction) => acc + transaction["Betrag"], 0).toFixed(2);
        const youPay = transactions.filter(transaction => transaction.category === "YouPay").reduce((acc, transaction) => acc + transaction["Betrag"], 0).toFixed(2);
        const getBack = transactions.filter(transaction => transaction.category === "GetBack").reduce((acc, transaction) => acc + transaction["Betrag"], 0).toFixed(2);
        return { income, youPay, getBack };
    }

    useEffect(() => {
        if (transactions.length > 0) {
            setSums(calculateSums());
        }
    }, [transactions]);

    return (
        <FileContext.Provider value={{
            handleFileChange,
            analyzeData,
            changeShowOverview,
            changeTransactionCategory,
            changeExpenseCategory,
            getBackKeywords,
            saveGetBackKeywords,
            parsedData,
            header,
            monthYear,
            sums,
            transactions,
            showOverview,
            addTransaction,
            expCategories
        }}>
            {children}
        </FileContext.Provider>
    );
};