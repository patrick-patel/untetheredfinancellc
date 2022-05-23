import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router';

import { Container, ButtonGroup, Button, Form } from 'react-bootstrap';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      redirect: false
    }
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  register() {
    var params = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    $.ajax({
      'url': '/register',
      'type': 'POST',
      'context': this,
      'data': params,
      'success': function() {
        console.log('success');
        this.setState({ redirect: true });
      },
      'error': function(error) {
        console.log(error);
      }
    })
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/login' />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <br></br>
        <Container fluid style={{padding: 90}}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} style={{width: "50%", background: "rgba(255,153,0,0.2)"}}required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} style={{width: "50%", background: "rgba(255,153,0,0.2)"}} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} style={{width: "50%", background: "rgba(255,153,0,0.2)"}} required />
            </Form.Group>
            <Button variant="dark" type="submit" style={{cursor: "pointer", background: "#050038"}} onClick={this.register.bind(this)}>
              Register
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default Register;