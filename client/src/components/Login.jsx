import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Alert, Col, Container, ButtonGroup, Button, Form, Row } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": this.props.email,
      "password": this.props.password,
      message: this.props.message,
      messageType: this.props.messageType,
      redirectLogin: this.props.redirectLogin,
      redirectDash: this.props.redirectDash,
      redirectForgotPassword: this.props.redirectForgotPassword,
    };
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  forgotPassword() {
    this.setState({ redirectForgotPassword: true });
  }

  render() {
    const redirectLogin = this.state.redirectLogin;
    const redirectDash = this.state.redirectDash;
    const redirectForgotPassword = this.state.redirectForgotPassword;
    if (redirectLogin) {
      return (
        <div style={{background: "rgba(255,153,0,0.2)"}}>
          <br></br>
          <Container fluid style={{padding: 90}}>
          <br></br>
            <Row>
              <Col>
                <h3 className="display-3" style={{color: "#050038", textDecoration: "none", margin: "auto", width: "75%"}}><b>Member Login</b></h3>
                <p className="lead" style={{color: "#050038", textDecoration: "none", margin: "auto", width: "75%", fontSize: "24px"}}><i>View your investment dashboard, update</i></p>
                <p className="lead" style={{color: "#050038", textDecoration: "none", margin: "auto", width: "75%", fontSize: "24px"}}><i>your account information and more</i></p>
              </Col>
              <Col>
                {this.state.message.length > 0 ? <Alert key={this.state.messageType} variant={this.state.messageType}>{this.state.message}</Alert> : null}
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", marginLeft: 50, width: "75%"}} onClick={this.props.login()}>
                        Login
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", marginLeft: 50, width: "75%"}} onClick={this.forgotPassword.bind(this)}>
                        Forgot Password
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
    if (redirectDash) {
      return <Redirect to="/dashboard" />
    }
    if (redirectForgotPassword) {
      return <Redirect to="/forgot-password" />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <br></br>
        <Container fluid style={{padding: 90}}>
        <br></br>
          <Row>
            <Col>
              <h3 className="display-3" style={{color: "#050038", textDecoration: "none", margin: "auto", width: "75%"}}><b>Member Login</b></h3>
              <p className="lead" style={{color: "#050038", textDecoration: "none", margin: "auto", width: "75%", fontSize: "24px"}}><i>View your investment dashboard, update</i></p>
              <p className="lead" style={{color: "#050038", textDecoration: "none", margin: "auto", width: "75%", fontSize: "24px"}}><i>your account information and more</i></p>
            </Col>
            <Col>
              {this.state.message.length > 0 ? <Alert key={this.state.messageType} variant={this.state.messageType}>{this.state.message}</Alert> : null}
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"  placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} style={{backgroundColor: "rgba(255,153,0,0.2)"}} required />
                </Form.Group>
                <Row>
                  <Col>
                    <Button className="mb-2" variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", marginLeft: 50, width: "75%"}} onClick={this.login.bind(this)}>
                      Login
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="dark" type="submit" style={{cursor: "pointer", background: "#050038", marginLeft: 50, width: "75%"}} onClick={this.forgotPassword.bind(this)}>
                      Forgot Password
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Login;