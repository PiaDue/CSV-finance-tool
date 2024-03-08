import { useFile } from '../contexts/FileContext';

function TransactionOverview() {
    const { showOverview, transactions } = useFile();

    return (
        <>
            {showOverview && (
                <p>Transaction Overview</p>
            )}
        </>

    );
}
export default TransactionOverview;
