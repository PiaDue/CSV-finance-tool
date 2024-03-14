import { createContext, useState, useContext, useEffect } from 'react';
const FileContext = createContext();
export const useFile = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
    const [parsedData, setParsedData] = useState(null);
    const [header, setHeader] = useState([String]);
    const [showOverview, setShowOverview] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const handleFileChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const parsedData = parseCSV(fileContent);
                setParsedData(parsedData);
            };
            reader.readAsText(file, 'ISO-8859-1');
            changeShowOverview(false);
        }
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
                const betragKey = betragString[0][0];
                const betragValue = betragString[0][1];
                const betragFloat = parseFloat(betragValue.replace(",", "."));
                transaction = { ...transaction, [betragKey]: betragFloat };
            }

            /*categorize transactions*/
            if (transaction["Umsatztyp"] && transaction["Umsatztyp"].includes("Eingang")) {
                transaction = { ...transaction, category: "Income" };
            }else{
                transaction = { ...transaction, category: "YouPay" };
            }
            transactionsArr.push(transaction);
        }

        setTransactions(transactionsArr);
        changeShowOverview(true);
    }

    return (
        <FileContext.Provider value={{ handleFileChange, analyzeData, changeShowOverview, parsedData, header, transactions, showOverview }}>
            {children}
        </FileContext.Provider>
    );
};