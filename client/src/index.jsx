import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Account from './components/Account.jsx';
import Resources from './components/Resources.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import Metrics from './components/Metrics.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import PasswordReset from './components/PasswordReset.jsx';
import logo from "./media/logo.png";

import { Redirect } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Col, Container, Navbar, Nav, NavDropdown, Row } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      "password": "",
      message: "",
      messageType: "",
      redirectLogin: false,
      redirectDash: false,
      redirectForgotPassword: false,
      "price": 0,
      "totalBTC": 0,
      "distributions": [],
      "distributionsUSD": [],
      "key": "",
      "balance": 0,
      "totalBTCHoldings": [1.5],
      "casaWallet": [0.4],
      "coldWallet": [0.9],
      "asicFund": [0.1],
      "taxFund": [0.1],
      "numberOfAsics": [35],
      "hash_rate_scoring": 0,
      "off_workers": 0,
      "rewards": 0,
      message: "",
      isLoggedIn: localStorage.getItem('token'),
    }
  }

  componentDidMount() {
    console.log('comp did mount')
    $.ajax({
      'url': 'https://api.bitaps.com/market/v1/ticker/btcusd',
      'type': 'GET',
      'crossDomain': true,
      'context': this,
      'success': function(data) {
        console.log('server response: ', data.data);
        this.setState({
          "price": data.data.last,
        })
      }
    })
    $.ajax({
      'url': '/fetchPoolStats',
      'type': 'GET',
      'context': this,
      'success': function(stats) {
        console.log('server response: ', stats);
        this.setState({
          "hash_rate_scoring": stats.hash_rate_scoring,
          "off_workers": stats.off_workers,
          "rewards": stats.confirmed_reward,
        })
      }
    })
    $.ajax({
      'url': '/fetchMetrics',
      'type': 'GET',
      'context': this,
      'success': function(metrics) {
        console.log('server response: ', metrics);
        this.setState({
          "totalBTCHoldings": metrics.totalBTCHoldings,
          "casaWallet": metrics.casaWallet,
          "coldWallet": metrics.coldWallet,
          "asicFund": metrics.asicFund,
          "taxFund": metrics.taxFund,
          "numberOfAsics": metrics.numberOfAsics,
        })
      }
    })
    $.ajax({
      'url': '/fetchBTC',
      'type': 'GET',
      'context': this,
      'headers': {
        'x-access-token': localStorage.getItem('token')
      },
      'success': function(data) {
        console.log('server response: ', data);
        this.setState({
          "totalBTC": data.totalBTC,
          "distributions": data.distributions,
          "distributionsUSD": data.distributionsUSD,
          "key": data.key,
        })
        $.ajax({
          'url': `https://api.bitaps.com/btc/v1/blockchain/address/state/${this.state.key}`,
          'type': 'GET',
          'context': this,
          'success': function(data) {
            console.log('server response: ', data);
            this.setState({
              "balance": data.data.balance,
            })
          }
        })
      }
    })
  }

  login(e) {
    e.preventDefault();
    var json = {"email": this.state.email, "password": this.state.password};
    $.ajax({
      'url': '/login',
      'type': 'POST',
      'context': this,
      'data': json,
      'success': function(data) {
        console.log(data);
        this.setState({ message: data.message, messageType: data.messageType });
        setTimeout(() => this.setState({ message: '', messageType: '' }), 1000);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setTimeout(() => this.setState({ isLoggedIn: localStorage.getItem('token'), "email": "", "password": "" }), 1000);
          $.ajax({
            'url': '/fetchBTC',
            'type': 'GET',
            'context': this,
            'headers': {
              'x-access-token': localStorage.getItem('token')
            },
            'success': function(data) {
              console.log('server response: ', data);
              this.setState({
                "totalBTC": data.totalBTC,
                "distributions": data.distributions,
                "distributionsUSD": data.distributionsUSD,
                "key": data.key,
              })
              setTimeout(() => this.setState({ redirectDash: true }), 750);
              setTimeout(() => this.setState({ redirectDash: false }), 1000);
            }
          })
        } else {
          setTimeout(() => this.setState({ redirectLogin: true }), 750);
          setTimeout(() => this.setState({ redirectLogin: false }), 1000);
        }
      },
      'error': function(error) {
        console.log(error);
        this.setState({ message: "Error", messageType: "danger" });
        setTimeout(() => this.setState({ message: '', messageType: '' }), 5000);
      }
    })
  }

  onChange(target) {
    this.setState({ [target.name]: target.value });
  }

  forgotPassword() {
    this.setState({ redirectForgotPassword: true });
    setTimeout(() => this.setState({ redirectForgotPassword: false }), 250);

  }

  logout() {
    localStorage.removeItem("token");
    this.setState({
      isLoggedIn: null
    })
  }


  render () {
    return (
    <Router>
      <div>
        <Navbar className="navbar" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/"><img src={logo} style={{width:150, marginLeft: -10, marginTop: -30, marginBottom: -30}} /><i style={{color: "#050038", fontSize: "28px", margin: 0}}><b>Untethered Finance</b></i></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="ms-auto">
                <br></br>
                <Link to="/" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Home</Link>
                <Link to="/resources" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Resources</Link>
                <NavDropdown title="Members" id="basic-nav-dropdown" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>
                  {this.state.isLoggedIn ? null : <NavDropdown.Item href="#action3"><Link to="/login" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Login</Link></NavDropdown.Item>}
                  {this.state.isLoggedIn ? <NavDropdown.Item><Link to="/dashboard" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Dashboard</Link></NavDropdown.Item> : null}
                  {this.state.isLoggedIn ? <NavDropdown.Item><Link to="/metrics" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Metrics</Link></NavDropdown.Item> : null}
                  {this.state.isLoggedIn ? <NavDropdown.Item><Link to="/account" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Account</Link></NavDropdown.Item> : null}
                  {this.state.isLoggedIn ? <NavDropdown.Divider /> : null}
                  {this.state.isLoggedIn ? <NavDropdown.Item><Link to="/login" className="btn btn-link" style={{cursor: "pointer", color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}} onClick={this.logout.bind(this)}>Logout</Link></NavDropdown.Item> : null}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
        <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/dashboard">
            {this.state.isLoggedIn ? <Dashboard price={this.state.price} totalBTC={this.state.totalBTC} distributions={this.state.distributions} distributionsUSD={this.state.distributionsUSD} pubKey={this.state.key} balance={this.state.balance}/> : <Redirect to="/login" />}
          </Route>
          <Route path="/metrics">
            {this.state.isLoggedIn ? <Metrics price={this.state.price} totalBTCHoldings={this.state.totalBTCHoldings} casaWallet={this.state.casaWallet} coldWallet={this.state.coldWallet} asicFund={this.state.asicFund} taxFund={this.state.taxFund} numberOfAsics={this.state.numberOfAsics} hashrate={this.state.hash_rate_scoring} off_workers = {this.state.off_workers} rewards={this.state.rewards}/> : <Redirect to="/login" />}
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/login">
            {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : this.state.redirectForgotPassword ? <Redirect to="/forgot-password" /> : <Login login={this.login.bind(this)} onChange={this.onChange.bind(this)} forgotPassword={this.forgotPassword.bind(this)} email={this.state.email} password={this.state.password} message={this.state.message} messageType={this.state.messageType} redirectLogin={this.state.redirectLogin} redirectDash={this.state.redirectDash} redirectForgotPassword={this.state.redirectForgotPassword}/>}
          </Route>
          <Route path="/register">
            {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : <Register />}
          </Route>
          <Route path="/account">
            {this.state.isLoggedIn ? <Account /> : <Redirect to="/login" />}
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/passwordReset">
            <PasswordReset />
          </Route>
        </Switch>
        <footer style={{background: "#050038", padding: 25}}>
          <Row>
            <Col className="col-6">
              <h6 className="display-6" style={{color: "white", margin: 0, position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>Untethered Finance, LLC</h6>
            </Col>
            <Col className="col-3" style={{color: "white"}}>
              <b>Patrick Patel</b>
              <p>Role: Manager</p>
              <p>Phone: +1 (360) 771 - 2299</p>
              <p>Email: patrickpatel@comcast.net</p>
            </Col>
            <Col className="col-3" style={{color: "white"}}>
              <b>Taylor Wood</b>
              <p>Role: Manager</p>
              <p>Phone: +1 (360) 619 - 2972</p>
              <p>Email: taylor.w00d@yahoo.com</p>
            </Col>
          </Row>
        </footer>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));