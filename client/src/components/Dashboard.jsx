import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";

const Dashboard = ({ price, totalBTC, distributions, distributionsUSD, pubKey, balance }) => (
  <div style={{background: "rgba(255,153,0,0.2)"}}>
    <Container>
      <br></br>
      <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Member Dashboard</b></h3>
      <Row style={{textAlign: "center", color: "#050038"}}>
        {
          balance !== 0 ?
          <Col className="mb-2" md={6}>
            <Card className="h-100" style={{background: "#fbdba3"}}>
              <p className="lead"><a href={`https://bitaps.com/${pubKey}`} target="_blank" rel="noopener noreferrer" style={{color: "#050038"}}>Wallet Balance</a></p>
              <p className="lead"><b>{balance/100000000} BTC</b></p>
            </Card>
          </Col>
          : null
        }
        <Col className="mb-2" md={6}>
          <Card className="h-100" style={{background: "#fbdba3"}}>
            <p className="lead">Total Distributions (BTC)</p>
            <p className="lead"><b>{totalBTC}</b></p>
          </Card>
        </Col>
        <Col className="mb-2" md={6}>
          <Card className="h-100" style={{background: "#fbdba3"}}>
            <p className="lead">Total Distributions (USD)</p>
            <p className="lead"><b>${Math.round(totalBTC*Number(price)*100)/100}</b></p>
          </Card>
        </Col>
        <Col className="mb-2" md={6}>
          <Card className="h-100" style={{background: "#fbdba3"}}>
            <p className="lead">BTCUSD Market Price</p>
            <p className="lead"><b>${price}</b></p>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row style={{textAlign: "center"}}>
        <Col className="mb-2" md={12} lg={6}>
          <Card>
            <Chart
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Total Distributions (BTC)'],
                [0, 0],
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
                height: "400px",
                title: "Total Distributions (BTC)",
                backgroundColor: {
                  fill: "#fbdba3",
                  stroke: "#dfbf8e",
                },
                hAxis: {
                  title: 'Month',
                  ticks: [0,1,2,3,4,5,6,7,8,9,10,11,12],
                  gridlines: {
                    color: "#808080",
                  },
                },
                vAxis: {
                  title: 'BTC',
                  baseline: 0,
                  gridlines: {
                    color: "#808080",
                  },
                },
                fontName: 'Verdana',
                fontSize: 16,
                legend: { position: 'bottom' },
                series: [
                  {color: "#050038", visibleInLegend: false}
                ],
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card>
        </Col>
        <br></br>
        <Col className="mb-2" md={12} lg={6}>
          <Card>
            <Chart
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Total Distributions (USD)'],
                [0, 0],
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
                height: "400px",
                title: "Total Distributions (USD)",
                backgroundColor: {
                  fill: "#fbdba3",
                  stroke: "#dfbf8e",
                },
                hAxis: {
                  title: 'Month',
                  ticks: [0,1,2,3,4,5,6,7,8,9,10,11,12],
                  gridlines: {
                    color: "#808080",
                  },
                },
                vAxis: {
                  title: 'USD',
                  baseline: 0,
                  gridlines: {
                    color: "#808080",
                  },
                },
                fontName: 'Verdana',
                fontSize: 16,
                legend: { position: 'bottom' },
                series: [
                  {color: "#050038", visibleInLegend: false}
                ],
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card>
        </Col>
      </Row>
    </Container>
    <br></br>
  </div>
)

export default Dashboard;