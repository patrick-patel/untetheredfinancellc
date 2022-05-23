import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";


const Dashboard = ({ price, totalBTC, distributions }) => (
  <div style={{background: "rgba(255,153,0,0.2)"}}>
    <Container fluid style={{padding: 90}}>
      <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Member Dashboard</b></h3>
      <Row style={{textAlign: "center"}}>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total Distributions (BTC)</p>
            <p className="lead">{totalBTC}</p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">BTCUSD Market Price (USD)</p>
            {price === 0 ? <p className="lead">loading...</p> : <p className="lead">{price}</p>}
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total Distributions (USD)</p>
            <p className="lead">{totalBTC*Number(price)}</p>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row style={{textAlign: "center"}}>
        <Col className="col-6">
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <Chart
              height={'500px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Total Distributions (USD)'],
                [1, 0],
                [2, 0.012],
                [3, 0.025],
                [4, 0.037],
                [5, 0.051],
                [6, 0.060],
                [7, 0.072],
                [8, 0.087],
                [9, 0.123],
                [10, 0.144],
                [11, 0.155],
                [12, 0.168],
              ]}
              options={{
                hAxis: {
                  title: 'Month',
                },
                vAxis: {
                  title: 'BTC',
                },
                fontName: 'Verdana',
                fontSize: 16,
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card>
        </Col>
        <Col className="col-6">
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <Chart
              height={'500px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Total Distributions (USD)'],
                [1, 0],
                [2, 125],
                [3, 276],
                [4, 564],
                [5, 821],
                [6, 1294],
                [7, 2045],
                [8, 2507],
                [9, 3305],
                [10, 3964],
                [11, 4205],
                [12, 4,997],
              ]}
              options={{
                hAxis: {
                  title: 'Month',
                },
                vAxis: {
                  title: 'USD',
                },
                fontName: 'Verdana',
                fontSize: 16,
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
)

export default Dashboard;