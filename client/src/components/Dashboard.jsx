import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";


const Dashboard = ({ price, totalBTC, distributions, distributionsUSD, pubKey, balance }) => (
  <div style={{background: "rgba(255,153,0,0.2)"}}>
    <Container fluid style={{padding: 90}}>
      <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Member Dashboard</b></h3>
      <Row style={{textAlign: "center"}}>
        {balance !== 0 ? <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Wallet Balance</p>
            <p className="lead"><b>{balance/100000000}</b></p>
          </Card>
        </Col> : null}
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total Distributions (BTC)</p>
            <p className="lead"><b>{totalBTC}</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total Distributions (USD)</p>
            <p className="lead"><b>{Math.round(totalBTC*Number(price)*100)/100}</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">BTCUSD Market Price (USD)</p>
            <p className="lead"><b>{price}</b></p>
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
        <Col className="col-6">
          <Card>
            <Chart
              height={'500px'}
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
  </div>
)

export default Dashboard;