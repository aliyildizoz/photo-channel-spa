import React, { Component } from 'react'
import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/actions/authActions'
class Login extends Component {
    state = {
        model: {
            email: "",
            password: ""
        },
        validate: false,
        isRedirect: false
    }

    onChangeHandler = (e) => {
        this.setState({ model: { ...this.state.model, [e.target.name]: e.target.value }, validate: true })
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // console.log("valid1")
            this.props.actions.login(this.state.model, this.props.history);
        }
        this.setValidated(true);
    }
    setValidated = (val) => this.setState({ validate: val })


    renderLogin = () => {
        const { validate } = this.state;
        return (
            <Row className="bg-light" style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
                <Col md={{ span: 4, offset: 4 }} style={{ marginTop: 50, marginBottom: 50  }} >
                    <Form noValidate validated={validate} onSubmit={this.onSubmitHandler}>
                        <h3>Giriş Yap</h3>
                        <FormGroup>
                            <Form.Control type="email" name="email" required onChange={this.onChangeHandler} placeholder="Email" />
                            <Form.Control.Feedback type="invalid">
                                E-mail alanı boş geçilemez
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="password" name="password" onChange={this.onChangeHandler} required placeholder="Şifre" />
                            <Form.Control.Feedback type="invalid">
                                Şifre alanı boş geçilemez
                            </Form.Control.Feedback>
                            {this.apiValidate()}
                        </FormGroup>
                        <Button type="submit" block className="col-6">Giriş</Button>
                        <p className="text-right">
                            Forgot <Link to="#">password?</Link>
                        </p>
                    </Form>
                </Col>
            </Row >
        )
    }
    apiValidate = () => {
        if (this.props.loginRes.data) {
            return <div className="text-danger">{this.props.loginRes.data}</div>
        }
        return null;
    }

    render() {
        return (
            <div>
                <Container>
                    {this.renderLogin()}
                </Container>
            </div>
        )
    }

}


function mapDispatchToProps(dispatch) {
    return {
        actions: {
            login: bindActionCreators(authActions.loginApi, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        loginRes: state.authReducer.loginResult
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);