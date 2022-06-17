import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";


const Metrics = ({ price, casaWallet, coldWallet, asicFund, taxFund, totalBTCHoldings }) => (
  <div style={{background: "rgba(255,153,0,0.2)"}}>
    <Container fluid style={{padding: 90}}>
      <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Company Metrics</b></h3>
      <Row style={{textAlign: "center"}}>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total BTC Holdings</p>
            <p className="lead"><b>{totalBTCHoldings[0]}</b></p>
            <p className="lead"><b>(${totalBTCHoldings[0]*price})</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Casa Wallet Balance</p>
            <p className="lead"><b>{casaWallet[0]}</b></p>
            <p className="lead"><b>(${casaWallet[0]*price})</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Cold Storage Wallet Balance</p>
            <p className="lead"><b>{coldWallet[0]}</b></p>
            <p className="lead"><b>(${coldWallet[0]*price})</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">ASIC Fund</p>
            <p className="lead"><b>{asicFund[0]}</b></p>
            <p className="lead"><b>(${asicFund[0]*price})</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Tax Fund</p>
            <p className="lead"><b>{taxFund[0]}</b></p>
            <p className="lead"><b>(${taxFund[0]*price})</b></p>
          </Card>
        </Col>
        <Col>
          <Card style={{background: "rgba(255,153,0,0.2)"}}>
            <p className="lead">Total Scoring Hashrate</p>
            <p className="lead"><b>Slushpool API</b></p>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row style={{textAlign: "center"}}>
        <Col className="col-6">
          <Card>
            <Chart
              height={'500px'}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Total BTC Holdings', 'Cold Wallet', 'Casa Wallet', 'ASIC Fund', 'Tax Fund'],
                [0, 0],
                [1, totalBTCHoldings[0], coldWallet[0], casaWallet[0], asicFund[0], taxFund[0]],
                [2, totalBTCHoldings[1], coldWallet[1], casaWallet[1], asicFund[1], taxFund[1]],
                [3, totalBTCHoldings[2], coldWallet[2], casaWallet[2], asicFund[2], taxFund[2]],
                [4, totalBTCHoldings[3], coldWallet[3], casaWallet[3], asicFund[3], taxFund[3]],
                [5, totalBTCHoldings[4], coldWallet[4], casaWallet[4], asicFund[4], taxFund[4]],
                [6, totalBTCHoldings[5], coldWallet[5], casaWallet[5], asicFund[5], taxFund[5]],
                [7, totalBTCHoldings[6], coldWallet[6], casaWallet[6], asicFund[6], taxFund[6]],
                [8, totalBTCHoldings[7], coldWallet[7], casaWallet[7], asicFund[7], taxFund[7]],
                [9, totalBTCHoldings[8], coldWallet[8], casaWallet[8], asicFund[8], taxFund[8]],
                [10, totalBTCHoldings[9], coldWallet[9], casaWallet[9], asicFund[9], taxFund[9]],
                [11, totalBTCHoldings[10], coldWallet[10], casaWallet[10], asicFund[10], taxFund[10]],
                [12, totalBTCHoldings[11], coldWallet[11], casaWallet[11], asicFund[11], taxFund[11]],
              ]}
              options={{
                title: "Holdings Breakdown",
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
                isStacked: true,
                fontName: 'Verdana',
                fontSize: 16,
                legend: { position: 'bottom' },
                series: [
                  {color: "#050038"}
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
                ['Month', 'Number Of Asics'],
                [0, 0],
                [1, numberOfAsics[0]],
                [2, numberOfAsics[1]],
                [3, numberOfAsics[2]],
                [4, numberOfAsics[3]],
                [5, numberOfAsics[4]],
                [6, numberOfAsics[5]],
                [7, numberOfAsics[6]],
                [8, numberOfAsics[7]],
                [9, numberOfAsics[8]],
                [10, numberOfAsics[9]],
                [11, numberOfAsics[10]],
                [12, numberOfAsics[11]],
              ]}
              options={{
                title: "Number Of Asics",
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

export default Metrics;