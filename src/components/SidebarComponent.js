import React, { useState } from 'react';
import { Menu, Switch, Divider } from 'antd';
import { RiseOutlined } from '@ant-design/icons';

function Sidebar() {
  const [mode, setMode] = useState('inline');
  const [theme, setTheme] = useState('light');

  const changeMode = (value) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <div>
      <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} /> Change Style
      <br />
      <br />
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
      >
        <Menu.Item key="1" icon={<RiseOutlined />}>
          APOD
        </Menu.Item>
        <Menu.Item key="2" icon={<RiseOutlined />}>
          DONKY
        </Menu.Item>
        <Menu.Item key="3" icon={<RiseOutlined />}>
          Earth
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
          Mars Rover Photos
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidebar;
