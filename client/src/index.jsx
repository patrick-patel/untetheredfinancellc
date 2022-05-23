import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Account from './components/Account.jsx';
import Resources from './components/Resources.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
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
      "price": 0,
      "totalBTC": 0,
      "distributions": [],
      isLoggedIn: localStorage.getItem('token'),
    }
  }

  componentDidMount() {
    console.log('comp did mount')
    $.ajax({
      'url': 'https://api.bitaps.com/market/v1/ticker/btcusd',
      'type': 'GET',
      'context': this,
      'success': function(data) {
        console.log('server response: ', data);
        this.setState({
          "price": data.last,
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
          "distributions": data.distributions
        })
      }
    })
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
            <Navbar.Brand href="/"><img src={logo} style={{width:150, marginLeft: -10, marginTop: -30, marginBottom: -30}} /><i style={{color: "#050038", margin: 0}}><b>Untethered Finance</b></i></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="ms-auto">
                <br></br>
                <Link to="/" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Home</Link>
                <Link to="/resources" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Resources</Link>
                <NavDropdown title="Members" id="navbarScrollingDropdown" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>
                  <NavDropdown.Item href="#action3">{this.state.isLoggedIn ? null : <Link to="/login" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Login</Link>}</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">{this.state.isLoggedIn ? null : <Link to="/register" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Register</Link>}</NavDropdown.Item>
                  <NavDropdown.Item href="#action3">{this.state.isLoggedIn ? <Link to="/dashboard" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Dashboard</Link> : null}</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">{this.state.isLoggedIn ? <Link to="/account" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Account</Link> : null}</NavDropdown.Item>
                  {this.state.isLoggedIn ? <NavDropdown.Divider /> : null}
                  <NavDropdown.Item href="#action5">{this.state.isLoggedIn ? <Link to="/login" className="btn btn-link" style={{cursor: "pointer", color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}} onClick={this.logout.bind(this)}>Logout</Link> : null}</NavDropdown.Item>
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
            {this.state.isLoggedIn ? <Dashboard price={this.state.price} totalBTC={this.state.totalBTC} distributions={this.state.distributions}/> : <Redirect to="/login" />}
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/login">
            {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
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
              <p>Phone: +1(360)771-2299</p>
              <p>Email: patrickpatel@comcast.net</p>
            </Col>
            <Col className="col-3" style={{color: "white"}}>
              <b>Taylor Wood</b>
              <p>Role: Manager</p>
              <p>Phone: +1(360)619-2972</p>
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