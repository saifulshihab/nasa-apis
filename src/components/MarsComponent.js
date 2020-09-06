import React, { useState, useEffect } from 'react';
import { Row, Col, Divider, Card, Modal, Select, Spin, Pagination } from 'antd';
import axios from 'axios';
import {} from '@ant-design/icons';

function MarsComponent() {
  const [data, setData] = useState([]);
  const [rover, setRover] = useState('curiosity');
  const [loading, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(true);

  useEffect(() => {
    setPage(rover !== 'curiosity' ? 1 : page);
    setPagination(rover === 'curiosity' ? true : false);
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${page}&api_key=pEW4MIDbAxO2MRBT7XxgobiHRczr4xSDQIrg2Ak9`
      )
      .then((response) => {
        setTimeout(() => {
          setData(response.data.photos);      
          setLoad(false);
        }, 0);
      })
      .catch((error) => {
        if (error.response) {
          let statusText =
            error.response.status === 404
              ? 'Invalid URL or Page not Found'
              : error.response.statusText;
          alert(`Error ${error.response.status} : ${statusText}.`);
        }
      });
  }, [rover, page]);
  const clickHandler = (data) => {
    showModal({ data });
  };
  function showModal({ data }) {
    let d;
    data.map((data) => (d = data));
    Modal.info({
      title: 'Photo Information',
      content: (
        <>
          <Divider />
          <div className="modal_data_wrapper">
            <div style={{ width: '100%' }}>
              <img src={d.img_src} alt={d.rover.name} />
              <br />
              <p style={{ display: 'inline-block' }}>
                Earth Date: {d.earth_date}
              </p>
              <p style={{ display: 'inline-block', float: 'right' }}>
                Sol: {d.sol}
              </p>
            </div>
            <h3>Rover Info</h3>
            <Divider />
            <p>Name: {d.rover.name}</p>
            <p>Lanuching Date: {d.rover.launch_date}</p>
            <p>Landing Date: {d.rover.landing_date}</p>
            <p>Status: {d.rover.status}</p>
            <br />
            <h3>Camera Info</h3>
            <Divider />
            <p>Name: {d.camera.name}</p>
            <p>Full Name: {d.camera.full_name}</p>
          </div>
        </>
      ),
      style: { top: 10, height: '80vh' },
      width: '80%',
      okText: 'Close',
      onOk() {},
    });
  }
  const { Option } = Select;

  function onChange(value) {
    setLoad(true);
    setRover(value.toLowerCase());
  }
  function paginationHandler(value) {   
    setPage(value);
  }
  return (
    <>
      <Row>
        <Col span={24}>
          <h1>Mars Rover Photos</h1>
          <Divider />
          <p>
            This API is designed to collect image data gathered by NASA's
            Curiosity, Opportunity, and Spirit rovers on Mars and make it more
            easily available to other developers, educators, and citizen
            scientists. This API is maintained by Chris Cerami. Each rover has
            its own set of photos stored in the database, which can be queried
            separately. There are several possible queries that can be made
            against the API. Photos are organized by the sol (Martian rotation
            or day) on which they were taken, counting up from the rover's
            landing date. A photo taken on Curiosity's 1000th Martian sol
            exploring Mars, for example, will have a sol attribute of 1000. If
            instead you prefer to search by the Earth date on which a photo was
            taken, you can do that too. Along with querying by date, results can
            also be filtered by the camera with which it was taken and responses
            will be limited to 25 photos per call. Queries that should return
            more than 25 photos will be split onto several pages, which can be
            accessed by adding a 'page' param to the query.
          </p>
          <div>
            <Divider>Select Rover</Divider>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select Rover"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Curiosity">Curiosity</Option>
              <Option value="Opportunity">Opportunity</Option>
              <Option value="Spirit">Spirit</Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Spin size="large" style={{ marginTop: 20 }} />
        ) : (
          <>
            {data.map((d) => (
              <Col
                className="card-data"
                key={d.id}
                span={6}
                style={{ padding: '5px' }}
              >
                <Card
                  onClick={() =>
                    clickHandler(data.filter((pid) => pid.id === d.id))
                  }
                  style={{ width: '100%' }}
                  cover={<img alt={d.sol} src={d.img_src} />}
                ></Card>
              </Col>
            ))}
          </>
        )}
      </Row>
      {pagination ? (
        <Pagination
          onChange={paginationHandler}
          defaultCurrent={1}
          total={800}
        ></Pagination>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default MarsComponent;
