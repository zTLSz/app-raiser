import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { Redirect, Link } from "react-router-dom";
// import { loginUser } from '../actions/auth';
import { Form, Input, Checkbox, Button, Typography, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { requestLogin } from '../actions/auth'
import bg from '../images/bglog.jpg'


const { Text } = Typography;
const { Title } = Typography;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const opacity = keyframes`
  from {
    opacity: 1
  }

  to {
    opacity: 0.7,
  }
`;


const opacityhover = keyframes`
  from {
    opacity: 0.7
  }

  to {
    opacity: 1,
  }
`;

const opacitybig = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1,
  }
`;



const BgLogin = styled.div`
  position: fixed;
  top: -20px;
  bottom: -20px;
  left: -20px;
  right: -20px;
  background: url(${bg}); 
  background-position-x: center;
  background-position-y: center;
  filter: blur(12px);

`

const BgForm = styled.div`
  margin-top: 20vh;
  border-radius: 5px;
  padding: 20px;
  background-color: white;
  position: relative;
  opacity: 0.7;
  animation-name: ${opacity};
  animation-duration: 0.5s;
  &:hover {
    opacity: 1;
    animation-name: ${opacityhover};
    animation-duration: 0.5s;
  }

  .ant-form-item-label {
    text-align: left;
  }

  .ant-form-item-control {
    margin-bottom: 10px;
  }

  .ant-btn {
    margin-right: 10px;
  }
`


const LoginError = styled.div`
  animation-name: ${opacitybig};
  animation-duration: 0.5s;
  opacity: 1;
  position: absolute;
  width: 250px;
  bottom: -80px;
`

  

interface AuthTypes {
  auth: {
    isAuthenticated: boolean
  }
}

const LoginPage: React.FC = () => {
    const [log, setLog] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const dispatch = useDispatch();
    const authState = useSelector(( state: AuthTypes ) => state.auth.isAuthenticated)




    if (authState) {
      return (
        <Redirect to="/" />
      )
    } else  {
      return (
        <>
        <BgLogin></BgLogin>
        <Row>
            <Col 
              xs={{span: 24, offset: 0}} 
              sm={{span: 24, offset: 0}} 
              xl={{span: 12, offset: 6}}
              xxl={{span: 10, offset: 7}}
            >
            <BgForm>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                >
                <Title>App-raiser</Title>
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Введите почту!' }]}
                >
                    <Input onChange={(e) => setLog(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password onChange={(e) => setPass(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={() => dispatch(requestLogin(log, pass))}>
                        Войти
                    </Button>
                    <Link to='/reg'>
                      <Button type="dashed">
                          Регистрация
                      </Button>
                    </Link>
                </Form.Item>
              </Form>
                <QuestionCircleOutlined />
              </BgForm>
            </Col>
          </Row>
        </>
      );
    }
}


// const LoginPage = Form.create({ name: 'normal_login' })(LoginPageChild);

export default LoginPage