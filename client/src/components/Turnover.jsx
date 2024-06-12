import { Progress } from "antd";

const Turnover = ({categories, allTransactions, totalTurnonver, type}) => {
  return (
    <div className='col-md-4 w-50 turnover-card'>
      <h4 className='mb-3'>Category wise {type === 'Credit' ? "Income" : "Expenses"}</h4>
      {categories.map((category) => {
        const amount = allTransactions
          .filter(
            (transaction) =>
              transaction.type === type && transaction.category === category,
          )
          .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

        return (
          amount > 0 && (
            <div className='card mt-2' key={category}>
              <div className='card-body'>
                <h5>{category}</h5>
                <Progress percent={((amount / totalTurnonver) * 100).toFixed(0)} />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Turnover;
