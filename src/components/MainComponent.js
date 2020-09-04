import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './SidebarComponent';

function MainComponent() {
  return (
    <Row>
      <Col span={6}>
        <Sidebar />
      </Col>
      <Col span={18}></Col>
    </Row>
  );
}

export default MainComponent;
