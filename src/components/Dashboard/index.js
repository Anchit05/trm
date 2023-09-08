import React, { memo, useEffect, useState } from 'react';

import { Col, Row } from 'antd';

import DashboardAddresses from './Addresses';
import DashboardSearch from './Search';
import DashboardTransactions from './Transactions';
import { useParams } from 'react-router-dom';
import { isAddressValid } from '../../utils/commonHelper';
import { useNavigate } from 'react-router-dom';

const Dashboard = memo(() => {
  const [selectedAddress, setSelectedAddress] = useState();
  const { address } = useParams();
  const navigate = useNavigate();

  /**
   * This will handle, when we get addrees from url checks if it's valid and update
   * it accordinly.
   */
  useEffect(() => {
    if ( address ){
      if (isAddressValid(address, 'ETH')) {
        setSelectedAddress(address);
      }else{
        alert("Address in the url is incorrect!!");
        navigate("/");
      }
    }
  }, [address]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <DashboardSearch paramAddress={address} />
          <DashboardAddresses setSelectedAddress={setSelectedAddress} />
        </Row>
      </Col>
      <Col span={12}>
        <DashboardTransactions selectedAddress={selectedAddress} />
      </Col>
    </Row>
  );
});

export default Dashboard;
