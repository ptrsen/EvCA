import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import {  MenuFoldOutlined,
          MenuUnfoldOutlined,
          UserOutlined, 
          VideoCameraOutlined, 
          UploadOutlined 
        } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import './App.css';

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  // Extract token values from Ant Design theme
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define the menu items using the 'items' prop
  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/">Page 1</Link>,
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: <Link to="/page2">Page 2</Link>,
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: <Link to="/page3">Page 3</Link>,
    },
  ];

  return (
    <Router>  
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            breakpoint="lg"
            trigger={null}
            collapsible 
            collapsed={collapsed}
            collapsedWidth="0" 
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
              onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
          </Sider>
          
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Header>

            <Layout>
              <Content
                style={{
                  margin: '24px 16px 0',
                  padding: 24,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Routes>
                  <Route path="/" element={<Page1 />} />
                  <Route path="/page2" element={<Page2 />} />
                  <Route path="/page3" element={<Page3 />} />
                </Routes>
              </Content>

              <Sider width={200} style={{ margin: '24px 16px 0', padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                Right Sider
              </Sider>
            </Layout>
              
            <Footer style={{ textAlign: 'center' }}>
              EP ©{new Date().getFullYear()}
            </Footer>
          </Layout> 

        </Layout>
    </Router>
  ); 
}

export default App;

