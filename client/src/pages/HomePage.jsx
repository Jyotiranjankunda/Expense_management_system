import Layout from './../components/Layout/Layout';
import { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message, Table } from 'antd';
import axios from 'axios';
import { HOST_URL } from '../utils';
import Spinner from '../components/Spinner';
import moment from 'moment';
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Analytics from '../components/Analytics';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState('');
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  // Table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
      sorter: (a, b) => moment(b.date).diff(moment(a.date)),
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            className='mx-2'
          />
          <DeleteOutlined
            className='mx-2'
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // Get all transactions
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);

        const res = await axios.post(`${HOST_URL}/transactions/get-transaction`, {
          userid: user._id,
          frequency: frequency || 'all',
          type,
        });
        setLoading(false);

        const transactionsWithKey = res.data.map((transaction) => ({
          ...transaction,
          key: transaction._id,
        }));

        setAllTransactions(transactionsWithKey);
      } catch (error) {
        message.error('Some error occurred.');
        console.log(error);
      }
    };

    getAllTransactions();
  }, [frequency, type]);

  // form submit
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);

      if (editable) {
        await axios.post(`${HOST_URL}/transactions/edit-transaction`, {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success('Transaction updated successfully');

        // Update the state to reflect the edited transaction
        setAllTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.key === editable.key
              ? { ...transaction, ...values }
              : transaction,
          ),
        );

        window.location.reload();
      } else {
        await axios.post(`${HOST_URL}/transactions/add-transaction`, {
          ...values,
          userid: user._id,
        });

        setLoading(false);
        message.success('Transaction added successfully');

        // Update the state to include the newly added transaction
        setAllTransactions((prevTransactions) => [
          ...prevTransactions,
          { ...values, key: Math.random() },
        ]);

        window.location.reload();
      }

      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error('Failed to add transaction');
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(`${HOST_URL}/transactions/delete-transaction`, {
        transactionId: record._id,
      });
      setLoading(false);
      message.success('Transaction deleted successfully');

      setAllTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.key !== record.key),
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
      message.error('Failed to delete');
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value=''>All</Select.Option>
            <Select.Option value='7'>Last 1 week</Select.Option>
            <Select.Option value='30'>Last 1 month</Select.Option>
            <Select.Option value='365'>Last 1 year</Select.Option>
          </Select>
        </div>
        <div>
          <h6>Select type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='Credit'>Income (Credit)</Select.Option>
            <Select.Option value='Debit'>Expense (Debit)</Select.Option>
          </Select>
        </div>
        <div className='switch-icons'>
          <UnorderedListOutlined
            className={`mx-3 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData('table')}
          />
          <AreaChartOutlined
            className={`mx-3 ${
              viewData === 'analytics' ? 'active-icon' : 'inactive-icon'
            }`}
            onClick={() => setViewData('analytics')}
          />
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModal(true)}>
            Add new
          </button>
        </div>
      </div>
      <div className='content' style={{ overflowX: 'auto' }}>
        {viewData == 'table' ? (
          <Table
            columns={columns}
            dataSource={allTransactions}
            scroll={{ x: 'max-content' }}
            pagination={{ pageSize: 10 }}
            rowClassName={(record) => (record.type === 'Credit' ? 'credit-row' : 'debit-row')}
          />
        ) : (
          <Analytics allTransactions={allTransactions} />
        )}
      </div>

      <Modal
        title={editable ? 'Edit transaction' : 'Add transaction'}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
          window.location.reload();
        }}
        footer={false}>
        <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>

          <Form.Item label='Type' name='type'>
            <Select>
              <Select.Option value='Credit'>Credit</Select.Option>
              <Select.Option value='Debit'>Debit</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='Salary'>Salary</Select.Option>
              <Select.Option value='Grocery'>Grocery</Select.Option>
              <Select.Option value='Food'>Food</Select.Option>
              <Select.Option value='Clothes'>Clothes</Select.Option>
              <Select.Option value='Bills'>Bills</Select.Option>
              <Select.Option value='Shopping'>Shopping</Select.Option>
              <Select.Option value='Medical'>Medical</Select.Option>
              <Select.Option value='Fee'>Fee</Select.Option>
              <Select.Option value='Tax'>Tax</Select.Option>
              <Select.Option value='Utilities'>Utilities</Select.Option>
              <Select.Option value='Electronics'>Electronics</Select.Option>
              <Select.Option value='Vehicle'>Vehicle Expenses</Select.Option>
              <Select.Option value='Maintenance'>Maintenance</Select.Option>
              <Select.Option value='Subscription'>Subscription</Select.Option>
              <Select.Option value='Others'>Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Date' name='date'>
            <Input type='date' />
          </Form.Item>

          <Form.Item label='Description' name='description'>
            <Input type='text' />
          </Form.Item>

          <div className='d-flex justify-content-start'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={() => setShowModal(false)}>
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
