import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Form, Input, message } from 'antd';

import { ADDRESS_BALANCE, requestAddressBalance } from '../../redux/actions';
import { STATUS_ERROR, STATUS_LOADING } from '../../constants/redux';
import { isAddressValid } from '../../utils/commonHelper';

const { useForm } = Form;

const DashboardSearch = memo(() => {
  const dispatch = useDispatch();
  const [form] = useForm();

  const requestStatus = useSelector(state => state.status[ADDRESS_BALANCE]);

  // AntDesign's Form automatically manages our validation,
  // so we can just request our Address' balance
  // which adds the address to our Addresses list upon success
  const onSubmit = useCallback(
    ({ address }) => {
      if (isAddressValid(address, 'ETH')) {
        dispatch(requestAddressBalance({ address }));
        form.resetFields();
      }
    },
    [dispatch, form]
  );

  // display a message if our request errors
  useEffect(() => {
    if (requestStatus === STATUS_ERROR) {
      message.error(
        'Sorry, we are not able to retrieve the balance of that address. You may have entered an invalid address.'
      );
    }
  }, [requestStatus]);

  return (
    <Col span={24}>
      <Form form={form} layout="inline" onFinish={onSubmit}>
        <Form.Item
          className="input-address"
          name="address"
          rules={[
            { required: true, message: 'Please enter an address' },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve(); // Empty field, no validation needed
                }
                if (isAddressValid(value, 'ETH')) {
                  return Promise.resolve(); // Valid address
                }
                return Promise.reject('Invalid address. Please enter a valid ETH address.');
              },
            },
          ]}
        >
          <Input placeholder="ETH Address" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={requestStatus === STATUS_LOADING}
        >
          Add Address
        </Button>
      </Form>
    </Col>
  );
});

export default DashboardSearch;
