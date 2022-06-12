import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";


const Dashboard = ({ price, totalBTC, distributions, distributionsUSD }) => (
  <div style={{background: "rgba(255,153,0,0.2)"}}>
    <Container fluid style={{padding: 90}}>
      <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Member Dashboard</b></h3>
      <Row style={{textAlign: "center"}}>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total Distributions (BTC)</p>
            <p className="lead"><b>{totalBTC}</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">BTCUSD Market Price (USD)</p>
            <p className="lead"><b>{price}</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total Distributions (USD)</p>
            <p className="lead"><b>{totalBTC*Number(price)}</b></p>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row style={{textAlign: "center"}}>
        <Col className="col-6">
          <Card>
            <Chart
              height={'500px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Total Distributions (BTC)'],
                [1, distributions[0]],
                [2, distributions[1]],
                [3, distributions[2]],
                [4, distributions[3]],
                [5, distributions[4]],
                [6, distributions[5]],
                [7, distributions[6]],
                [8, distributions[7]],
                [9, distributions[8]],
                [10, distributions[9]],
                [11, distributions[10],],
                [12, distributions[11],],
              ]}
              options={{
                title: "Total Distributions (BTC)",
                backgroundColor: "rgba(255,153,0,0.2)",
                hAxis: {
                  title: 'Month',
                },
                vAxis: {
                  title: 'BTC',
                },
                fontName: 'Verdana',
                fontSize: 16,
                legend: { position: 'bottom' },
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card>
        </Col>
        <Col className="col-6">
          <Card>
            <Chart
              height={'500px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Total Distributions (USD)'],
                [1, distributionsUSD[0]],
                [2, distributionsUSD[1]],
                [3, distributionsUSD[2]],
                [4, distributionsUSD[3]],
                [5, distributionsUSD[4]],
                [6, distributionsUSD[5]],
                [7, distributionsUSD[6]],
                [8, distributionsUSD[7]],
                [9, distributionsUSD[8]],
                [10, distributionsUSD[9]],
                [11, distributionsUSD[10]],
                [12, distributionsUSD[11]],
              ]}
              options={{
                chart: {
                  title: "Total Distributions (USD)",
                  backgroundColor: "rgba(255,153,0,0.2)",
                },
                hAxis: {
                  title: 'Month',
                },
                vAxis: {
                  title: 'BTC',
                },
                fontName: 'Verdana',
                fontSize: 16,
                legend: { position: 'bottom' },
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