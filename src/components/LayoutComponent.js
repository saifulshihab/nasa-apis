import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RiseOutlined,
} from '@ant-design/icons';

import { Switch, Route, Redirect, withRouter, NavLink } from 'react-router-dom';

import ApodComponent from './ApodComponent';
import DonkyComponent from './DonkyComponent';
import EarthComponent from './EarthComponent';
import MarsComponent from './MarsComponent';

function LayoutComponent() {
  const [collapse, setCollapse] = useState(false);

  const { Header, Sider, Content } = Layout;
  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <Layout className="layout-wrap">
      <Sider trigger={null} collapsible collapsed={collapse}>
        <div className="logo">
          <h3>NASA DATA</h3>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<RiseOutlined />}>
            <NavLink to="/apod">APOD</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<RiseOutlined />}>
            <NavLink to="/donky">DONKY</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<RiseOutlined />}>
            <NavLink to="/earth">Earth</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<RiseOutlined />}>
            EONET
          </Menu.Item>
          <Menu.Item key="5" icon={<RiseOutlined />}>
            EPIC
          </Menu.Item>
          <Menu.Item key="6" icon={<RiseOutlined />}>
            ExoPlanet
          </Menu.Item>
          <Menu.Item key="7" icon={<RiseOutlined />}>
            GeneLab
          </Menu.Item>
          <Menu.Item key="8" icon={<RiseOutlined />}>
            Insight
          </Menu.Item>
          <Menu.Item key="9" icon={<RiseOutlined />}>
            <NavLink to="/mars"> Mars Rover Photos</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background " style={{ padding: 0 }}>
          {React.createElement(
            collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            }
          )}
          Data from NASA Open APIs
        </Header>
        <Content
          className="site-layout-background content-wrap"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <>
            <Switch>
              <Route exact path="/apod" component={ApodComponent} />
              <Route exact path="/donky" component={DonkyComponent} />
              <Route exact path="/earth" component={EarthComponent} />
              <Route exact path="/mars" component={MarsComponent} />
              <Redirect to="/apod" />
            </Switch>
          </>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(LayoutComponent);
