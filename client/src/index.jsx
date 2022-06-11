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
      message: "",
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
        console.log('server response: ', data.data);
        this.setState({
          "price": data.data.last,
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
        if (data.success) {
          localStorage.setItem("token", data.token);
          $.ajax({
            'url': '/userData',
            'type': 'GET',
            'context': this,
            'headers': {
              'x-access-token': localStorage.getItem('token')
            },
            'success': function(data) {
              console.log(data);
              this.setState({ isLoggedIn: localStorage.getItem('token') };
              setTimeout(() => this.setState({ redirectDash: true }), 750);
            },
            'error': function(error) {
              console.log(error);
            }
          })
        } else {setTimeout(() => this.setState({ redirectLogin: true }), 750);}
      },
      'error': function(error) {
        console.log(error);
        this.setState({ message: "Error", messageType: "danger" });
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
                  {this.state.isLoggedIn ? null : <NavDropdown.Item href="#action3"><Link to="/login" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Login</Link></NavDropdown.Item>}
                  {this.state.isLoggedIn ? <NavDropdown.Item href="#action3"><Link to="/dashboard" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Dashboard</Link></NavDropdown.Item> : null}
                  {this.state.isLoggedIn ? <NavDropdown.Item href="#action4"><Link to="/account" className="btn btn-link" style={{color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}}>Account</Link></NavDropdown.Item> : null}
                  {this.state.isLoggedIn ? <NavDropdown.Divider /> : null}
                  {this.state.isLoggedIn ? <NavDropdown.Item href="#action5"><Link to="/login" className="btn btn-link" style={{cursor: "pointer", color: "#050038", textDecoration: "none", fontSize: "28px", marginRight: 20}} onClick={this.logout.bind(this)}>Logout</Link></NavDropdown.Item> : null}
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
            {this.state.isLoggedIn ? <Dashboard price={this.state.price} totalBTC={this.state.totalBTC} distributions={this.state.distributions}/> : <Redirect to="/" />}
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/login">
            {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : <Login email={this.state.email} password={this.state.password} message={this.state.message} messageType={this.state.messageType} redirectLogin={this.state.redirectLogin} redirectDash={this.state.redirectDash} redirectForgotPassword={this.state.redirectForgotPassword}/>}
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