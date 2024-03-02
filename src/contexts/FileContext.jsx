import React, { createContext, useState, useContext } from 'react';
const FileContext = createContext();
export const useFile = () => useContext(FileContext);

export const FileProvider = ({ children }) => {

    const [fileData, setFileData] = useState(null);

    const handleFileChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                setFileData(fileContent);
            };
            reader.readAsText(file);
        }
    };

    return (
        <FileContext.Provider value={{ fileData, handleFileChange }}>
            {children}
        </FileContext.Provider>
    );
};