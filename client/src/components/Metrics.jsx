import React from 'react';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";


const Metrics = ({ price, casaWallet, coldWallet, asicFund, hashrate, numberOfAsics, taxFund, totalBTCHoldings }) => (
  <div style={{background: "rgba(255,153,0,0.2)"}}>
    <Container>
      <br></br>
      <h3 className="display-3" style={{color: "#050038", textDecoration: "none"}}><b>Company Metrics</b></h3>
      <Row style={{textAlign: "center", color: "#050038"}}>
        <Col className="mb-2" xs={12} md={6} lg={3}>
          <Card className="h-100" style={{background: "#fbdba3"}}>
            <p className="lead">Total BTC Holdings</p>
            <p className="lead"><b>{totalBTCHoldings[totalBTCHoldings.length-1]} BTC</b></p>
            <p className="lead"><b>(${Math.round(totalBTCHoldings[totalBTCHoldings.length-1]*price*100)/100})</b></p>
          </Card>
        </Col>
        <Col className="mb-2" xs={12} md={6} lg={3}>
          <Card className="h-100" style={{background: "#fbdba3"}}>
            <p className="lead"><a href='https://bitaps.com/39tDkWKAbWrzneBnf7PvErHxWVKkqkGmKp' target="_blank" rel="noopener noreferrer" style={{color: "#050038"}}>Casa Wallet Balance</a></p>
            <p className="lead"><b>{casaWallet[casaWallet.length-1]} BTC</b></p>
            <p className="lead"><b>(${Math.round(casaWallet[casaWallet.length-1]*price*100)/100})</b></p>
          </Card>
        </Col>
        <Col className="mb-2" xs={12} md={6} lg={3}>
          <Card className="h-100" style={{background: "#fbdba3"}}>
            <p className="lead"><a href='https://bitaps.com/' target="_blank" rel="noopener noreferrer" style={{color: "#050038"}}>Cold Storage Wallet Balance</a></p>
            <p className="lead"><b>{coldWallet[coldWallet.length-1]} BTC</b></p>
            <p className="lead"><b>(${Math.round(coldWallet[coldWallet.length-1]*price*100)/100})</b></p>
          </Card>
        </Col>
        <Col className="mb-2" xs={12} md={6} lg={3}>
          <Card className="h-100" style={{background: "#fbdba3"}}>
            <p className="lead">Total Scoring Hashrate</p>
            <p className="lead"><b>{Math.round(hashrate/1000*100)/100} TH/s</b></p>
            <p className="lead"><b># of Asics: {numberOfAsics[numberOfAsics.length-1]}</b></p>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row style={{textAlign: "center"}}>
        <Col className="mb-2" md={12} lg={6}>
          <Card>
            <Chart
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Cold Wallet', 'Casa Wallet'],
                [0, 0, 0],
                [1, coldWallet[0], casaWallet[0]],
                [2, coldWallet[1], casaWallet[1]],
                [3, coldWallet[2], casaWallet[2]],
                [4, coldWallet[3], casaWallet[3]],
                [5, coldWallet[4], casaWallet[4]],
                [6, coldWallet[5], casaWallet[5]],
                [7, coldWallet[6], casaWallet[6]],
                [8, coldWallet[7], casaWallet[7]],
                [9, coldWallet[8], casaWallet[8]],
                [10, coldWallet[9], casaWallet[9]],
                [11, coldWallet[10], casaWallet[10]],
                [12, coldWallet[11], casaWallet[11]],
              ]}
              options={{
                height: "400px",
                title: "Total Holdings Breakdown",
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
                series: [
                  {color: "#050038"}
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
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Month', 'Operating Fund', 'ASIC Fund', 'Tax Fund'],
                [0, 0, 0, 0],
                [1, casaWallet[0] - asicFund[0] - taxFund[0], asicFund[0], taxFund[0]],
                [2, casaWallet[1] - asicFund[1] - taxFund[1], asicFund[1], taxFund[1]],
                [3, casaWallet[2] - asicFund[2] - taxFund[2], asicFund[2], taxFund[2]],
                [4, casaWallet[3] - asicFund[3] - taxFund[3], asicFund[3], taxFund[3]],
                [5, casaWallet[4] - asicFund[4] - taxFund[4], asicFund[4], taxFund[4]],
                [6, casaWallet[5] - asicFund[5] - taxFund[5], asicFund[5], taxFund[5]],
                [7, casaWallet[6] - asicFund[6] - taxFund[6], asicFund[6], taxFund[6]],
                [8, casaWallet[7] - asicFund[7] - taxFund[7], asicFund[7], taxFund[7]],
                [9, casaWallet[8] - asicFund[8] - taxFund[8], asicFund[8], taxFund[8]],
                [10, casaWallet[9] - asicFund[9] - taxFund[9], asicFund[9], taxFund[9]],
                [11, casaWallet[10] - asicFund[10] - taxFund[10], asicFund[10], taxFund[10]],
                [12, casaWallet[11] - asicFund[11] - taxFund[11], asicFund[11], taxFund[11]],
              ]}
              options={{
                height: "400px",
                title: "Casa Wallet Breakdown",
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
                series: [
                  {color: "#050038"}
                ],
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Card>
        </Col>
        <br></br>
        <Col className="mb-2" md={12} lg={12}>
          <Card>
            <Chart
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
                height: "400px",
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
    <br></br>
  </div>
)

export default Metrics;