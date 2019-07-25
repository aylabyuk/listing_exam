import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children }) => {
    return (
        <Layout>
            <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="user" />
                            <span className="nav-text">Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/listings">
                            <Icon type="user" />
                            <span className="nav-text">Listings</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/others">
                            <Icon type="user" />
                            <span className="nav-text">Others</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }} >ReactJS</Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', height: '100vh' }}>
                    { children }
                </Content>
                <Footer style={{ textAlign: 'center' }}>Oriel Vinci Absin</Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout;
