import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

function PDFGenerator ({ content }) {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        }
    });

    return (
        <Document>
            <Page style={styles.page}>
                <Text>{content}</Text>
            </Page>
        </Document>
    );
}

export default PDFGenerator;