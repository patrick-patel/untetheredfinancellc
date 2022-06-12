import React from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';

import { Alert, Container, ButtonGroup, Button, Form } from 'react-bootstrap';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      message: "",
      messageType: "",
      redirectResetPassword: false,
    };
    this.submitEmail = this.submitEmail.bind(this);
  }

  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  submitEmail(e) {
    e.preventDefault();
    var json = {"email": this.state.email};
    $.ajax({
      'url': '/forgotPassword',
      'type': 'POST',
      'context': this,
      'data': json,
      'success': function(data) {
        console.log('response success');
        this.setState({ message: data.message, messageType: data.messageType });
        if (data.messageType === "success") {setTimeout(() => this.setState({ redirectResetPassword: true, message: "", messageType: "" }), 1000);}
        else {setTimeout(() => this.setState({ message: "", messageType: "" }), 1000);}

        console.log(data);
      },
      'error': function(error) {
        console.log('response error');
        console.log(error);
      }
    })
  }

  render() {
    if (this.state.redirectResetPassword === true) {
      setTimeout(() => this.setState(redirectResetPassword: false), 250);
      return <Redirect to="/passwordReset" />
    }
    return (
      <div style={{background: "rgba(255,153,0,0.2)"}}>
        <br></br>
        <Container fluid style={{padding: 90}}>
          {this.state.message.length > 0 ? <Alert key={this.state.messageType} variant={this.state.messageType}>{this.state.message}</Alert> : null}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.onChange.bind(this)} style={{width: "50%"}} required />
              <Form.Text className="text-muted">
                You will receive an email with a password reset link and will have 1 hr before the link expires.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" style={{cursor: "pointer"}} onClick={(e) => this.submitEmail(e)}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default ForgotPassword;