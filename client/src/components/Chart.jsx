import { Progress } from "antd";

const Chart = ({
  totalTransactions,
  totalCredit,
  totalDebit,
  totalCreditPercent,
  totalDebitPercent,
  isTurnover = false, // new prop to differentiate between counts and amounts
}) => {
  return (
    <div className='col-md-4 w-100 chart-card'>
      <div className='card'>
        <div className='card-header'>
          {isTurnover ? "Total Turnover: ₹" : "Total Transactions: "}
          {totalTransactions}
        </div>
        <div className='card-body'>
          <h5 className='text-success text-center'>
            {isTurnover ? "Income Turnover: ₹" : "Income (Credit): "}
            {isTurnover ? totalCredit : totalCredit.length}
          </h5>
          <h5 className='text-danger text-center'>
            {isTurnover ? "Expense Turnover: ₹" : "Expense (Debit): "}
            {isTurnover ? totalDebit : totalDebit.length}
          </h5>
          <div className='mt-5 d-flex justify-content-center'>
            <Progress
              type='circle'
              strokeColor={'green'}
              className='mx-2'
              percent={totalCreditPercent.toFixed(0)}
            />
            <Progress
              type='circle'
              strokeColor={'red'}
              className='mx-2'
              percent={totalDebitPercent.toFixed(0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
