import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Divider, Switch, Spin } from 'antd';
import { Card, Avatar } from 'antd';
const { Meta } = Card;

function ApodComponent() {
  const [apoddata, setApodData] = useState([]);
  const [hd, setHD] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?hd=${hd}&api_key=pEW4MIDbAxO2MRBT7XxgobiHRczr4xSDQIrg2Ak9`
      )
      .then((response) => {
        setApodData(response.data);
        setLoader(false);
      })
      .catch((error) => {
        if (error.response) {
          let statusText =
            error.response.status === 404
              ? 'URL not found'
              : error.response.statusText;
          alert(`Error ${error.response.status} : ${statusText}.`);
        }
      });
  }, [hd]);

  return (
    <>
      <Row>
        <Col span={24}>
          {loader ? (
            <Spin size='large' />
          ) : (
            <>
              <Row>
                <Col span={24}>
                  <h1>Astronomy Picture of the Day (APOD)</h1>
                  <p>
                    Each day a different image or photograph of our fascinating
                    universe is featured, along with a brief explanation written
                    by a professional astronomer.{' '}
                    <a href='https://apod.nasa.gov/apod/archivepix.html'>
                      Discover the cosmos!
                    </a>
                  </p>
                  <Divider />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card
                    style={{ width: '100%' }}
                    cover={
                      <img
                        alt={apoddata.title}
                        src={hd ? apoddata.hdurl : apoddata.url}
                      />
                    }
                  >
                    <Meta
                      avatar={<Avatar src={apoddata.url} />}
                      title={apoddata.title}
                      description={apoddata.explanation}
                    />
                    <div className='apod'>
                      <p>Date: {apoddata.date}</p>
                      <p>Copyright: {apoddata.copyright}</p>
                      HD Image{' '}
                      <Switch
                        onChange={() => {
                          console.log('changed');
                          setHD(!hd);
                        }}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ApodComponent;
