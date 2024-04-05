import React from 'react';
import {Document, Page, Text, StyleSheet, View} from '@react-pdf/renderer';

function PDFGenerator ({header, sums, transactions, showCol, monthYear}) {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 20,
        },
        header: {
            fontSize: 24,
            marginBottom: 15,
        },
        section: {
            margin: 10,
        },
        categoryHeader: {
            fontSize: 10,
            marginBottom: 10,
        },
        row: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#949494',
            padding: 5,
        },
        columnHeader: {
            width: '25%',
            fontWeight: 'bold',
            fontSize: 8,
        },
        cell: {
            width: '25%',
            fontSize: 8,
        },
        totalRow: {
            flexDirection: 'row',
            backgroundColor: '#edf0f1',
            padding: 5,
        },
        totalColumn: {
            width: '25%',
            fontWeight: 'bold',
            fontSize: 8,
        },
    });

    // Function to filter transactions by category
    const filterTransactionsByCategory = (category) => {
        return transactions.filter(transaction => transaction.category === category);
    };

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Abrechnung: {monthYear.m } 20{monthYear.y}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.categoryHeader, { color: '#ffc107' }]}>GetBack</Text>
                    <View style={[styles.row, { backgroundColor: '#fff3cd' }]}>
                        {header.map((key, index) => (
                            showCol[index] && (
                                <Text key={index} style={styles.columnHeader}>{key}</Text>
                            )
                        ))}
                    </View>
                    {filterTransactionsByCategory('GetBack').map((transaction, index) => (
                        <View key={index} style={styles.row}>
                            {header.map((key, index) => (
                                showCol[index] && (
                                    <Text key={index} style={styles.cell}>{transaction[key]}</Text>
                                )
                            ))}
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <Text style={[styles.totalColumn, { color: '#ffc107' }]}>= {sums.getBack}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.categoryHeader, { color: '#198754' }]}>Income</Text>
                    <View style={[styles.row, { backgroundColor: '#d1e7dd' }]}>
                        {header.map((key, index) => (
                            showCol[index] && (
                                <Text key={index} style={styles.columnHeader}>{key}</Text>
                            )
                        ))}
                    </View>
                    {filterTransactionsByCategory('Income').map((transaction, index) => (
                        <View key={index} style={styles.row}>
                            {header.map((key, index) => (
                                showCol[index] && (
                                    <Text key={index} style={styles.cell}>{transaction[key]}</Text>
                                )
                            ))}
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <Text style={[styles.totalColumn, { color: '#198754' }]}>= {sums.income}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.categoryHeader, { color: '#dc3545' }]}>YouPay</Text>
                    <View style={[styles.row, { backgroundColor: '#f8d7da' }]}>
                        {header.map((key, index) => (
                            showCol[index] && (
                                <Text key={index} style={styles.columnHeader}>{key}</Text>
                            )
                        ))}
                    </View>
                    {filterTransactionsByCategory('YouPay').map((transaction, index) => (
                        <View key={index} style={styles.row}>
                            {header.map((key, index) => (
                                showCol[index] && (
                                    <Text key={index} style={styles.cell}>{transaction[key]}</Text>
                                )
                            ))}
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <Text style={[styles.totalColumn, { color: '#dc3545' }]}>= {sums.youPay}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default PDFGenerator;