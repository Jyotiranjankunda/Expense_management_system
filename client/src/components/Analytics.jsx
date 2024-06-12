import { Progress } from 'antd';
import Turnover from './Turnover';
import Chart from './Chart';

const Analytics = ({ allTransactions }) => {
  // categories
  const categories = [
    'Salary',
    'Grocery',
    'Food',
    'Clothes',
    'Bills',
    'Shopping',
    'Medical',
    'Fee',
    'Tax',
    'Utilities',
    'Electronics',
    'Vehicle',
    'Maintenance',
    'Subscription',
    'Others',
  ];

  // Total transactions
  const totalTransactions = allTransactions.length;
  const totalCreditTransactions = allTransactions.filter(
    (transaction) => transaction.type === 'Credit',
  );
  const totalDebitTransactions = allTransactions.filter(
    (transaction) => transaction.type === 'Debit',
  );
  const totalCreditPercent = (totalCreditTransactions.length / totalTransactions) * 100;

  const totalDebitPercent = (totalDebitTransactions.length / totalTransactions) * 100;

  // Total turnover
  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0,
  );

  const totalCreditTurnonver = totalCreditTransactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0,
  );

  const totalDebitTurnonver = totalDebitTransactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount),
    0,
  );

  const totalCreditTurnonverPercent = (totalCreditTurnonver / totalTurnover) * 100;

  const totalDebitTurnonverPercent = (totalDebitTurnonver / totalTurnover) * 100;

  console.log("All transaction : ", allTransactions);
  // console.log("Total transaction : ", totalTransactions);
  // console.log("credit transaction : ", totalCreditTransactions);
  // console.log("debit transaction : ", totalDebitTransactions);
  console.log("Total turnover : ", totalTurnover);
  console.log("Total credit turnover : ", totalCreditTurnonver);
  console.log("Total debit turnover : ", totalDebitTurnonver);


  return (
    <div className='d-flex flex-column flex-md-row justify-content-around align-items-stretch mt-3 mb-4'>
      <div className='row d-flex flex-column w-50 justify-content-between align-items-center  charts'>
        <Chart
          totalTransactions={totalTransactions}
          totalCredit={totalCreditTransactions}
          totalDebit={totalDebitTransactions}
          totalCreditPercent={totalCreditPercent}
          totalDebitPercent={totalDebitPercent}
        />

        <Chart
          totalTransactions={totalTurnover}
          totalCredit={totalCreditTurnonver}
          totalDebit={totalDebitTurnonver}
          totalCreditPercent={totalCreditTurnonverPercent}
          totalDebitPercent={totalDebitTurnonverPercent}
          isTurnover={true}
        />
      </div>

      <div className='row d-flex w-50 justify-content-between turnover'>
        <Turnover
          categories={categories}
          allTransactions={allTransactions}
          totalTurnonver={totalCreditTurnonver}
          type='Credit'
        />

        <Turnover
          categories={categories}
          allTransactions={allTransactions}
          totalTurnonver={totalDebitTurnonver}
          type='Debit'
        />
      </div>
    </div>
  );
};

export default Analytics;
