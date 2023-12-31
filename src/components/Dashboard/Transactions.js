import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, message, Row, Spin, Table, Pagination } from 'antd';
import {
  ADDRESS_TRANSACTIONS,
  requestAddressTransactions,
} from '../../redux/actions';
import { STATUS_ERROR, STATUS_LOADING } from '../../constants/redux';

const columns = [
  {
    title: 'Tx Hash',
    dataIndex: 'hash',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timeStamp',
  },
  {
    title: 'From',
    dataIndex: 'from',
  },
  {
    title: 'To',
    dataIndex: 'to',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
];

const DashboardTransactions = memo(({ selectedAddress }) => {
  const dispatch = useDispatch();
  const lastAddress = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [transactionsArr, setTransactionsArr] = useState([]);

  const transactions = useSelector(state => state.transactions);
  const requestStatus = useSelector(
    state => state.status[ADDRESS_TRANSACTIONS]
  );
  const pageSize = 10;

  // Function to load more transactions
  const loadMoreTransactions = () => {
    setCurrentPage(currentPage+1);
  };

  // request Transactions whenever an Address changes
  useEffect(() => {
    if (selectedAddress !== lastAddress.current && selectedAddress || (selectedAddress && currentPage > 1)) {
      dispatch(requestAddressTransactions({ address: selectedAddress, page: currentPage }));
    }

    lastAddress.current = selectedAddress;
  }, [dispatch, selectedAddress, currentPage]);

  //Created a local state variable to handle the transactions data
  useEffect(() => {
    setTransactionsArr((prevTransactions) => [...prevTransactions, ...transactions]);
  }, [transactions])

  // display a message if our request errors
  useEffect(() => {
    if (requestStatus === STATUS_ERROR) {
      message.error(
        'Sorry, we are not able to retrieve the transactions for that address. Please try again later.'
      );
    }
  }, [requestStatus]);

  useEffect(() => {
    // Check if all transactions have been loaded
    if (transactionsArr.length > pageSize * currentPage) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [pageSize, transactionsArr, currentPage]);

  return (
    <Row>
      <Col flex={1}>
        {selectedAddress ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>Viewing transactions for {selectedAddress}:</Col>
            {requestStatus === STATUS_LOADING && currentPage === 1 ? (
              <Col span={24}>
                <Spin />
              </Col>
            ) : (
              <>
                <Table
                  columns={columns}
                  dataSource={transactionsArr || []}
                  pagination={false}
                  rowKey="hash"
                />
                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    {requestStatus === STATUS_LOADING ? (
                      <Spin />
                    ) : (
                      <button onClick={loadMoreTransactions}>Load More</button>
                    )}
                  </div>
                )}
              </>
            )}
          </Row>
        ) : (
          `Select an address to view it's latest transactions`
        )}
      </Col>
    </Row>
  );
});

export default DashboardTransactions;
