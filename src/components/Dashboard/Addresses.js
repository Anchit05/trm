import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Col, Table } from 'antd';
import { weiToEther } from '../../utils/commonHelper';

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'ETH Balance',
    dataIndex: 'balance',
  },
];

const DashboardAddresses = memo(({ setSelectedAddress }) => {
  const addresses = useSelector(state => state.addresses);

  const onAddressClick = useCallback(
    ({ address }) => {
      setSelectedAddress(address);
    },
    [setSelectedAddress]
  );

  /**
   * this is used to format the balance coming inside addresses
   * rest of the fields will remain same
   */
  const formattedAddresses = addresses?.map(address => ({
    ...address,
    balance: weiToEther(address.balance),
  }));

  return (
    <Col span={24}>
      <Table
        columns={columns}
        dataSource={formattedAddresses || []}
        rowKey="address"
        onRow={record => ({
          onClick: () => onAddressClick(record),
        })}
      />
    </Col>
  );
});

export default DashboardAddresses;
