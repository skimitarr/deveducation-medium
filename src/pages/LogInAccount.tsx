import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';

import { IPropAccounts, IFormValues } from '../components/Interfaces';
import { userLocalSaveData } from '../store/SomeSlice'

const LogInAccount = (props : IPropAccounts) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();

  const [form] = Form.useForm();

  useEffect(() => {
    if(localStorage.user) {
      navigate('/main');
    }
  }, []);

  const onFinish = (values: IFormValues) => {
    for (const user in props.accounts) {
      if (user === values.username && props.accounts[user].password === values.password) {
        if (values.remember) {
          dispatch(userLocalSaveData({ username: values.username, password: values.password }))
        }
        navigate('/main');
      }
    }
    form.setFields([
      {
        name: 'username',
        errors: ['Invalid username or password'],
      },
      {
        name: 'password',
        errors: ['Invalid username or password'],
      },
    ]);
  };

  return (
    <main className="main form__container">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="formLogIn"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
export default LogInAccount;
