import React, { Component } from 'react'
import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/actions/authActions'

class Register extends Component {

    state = {
        model: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            rePassword: ""
        },
        validate: false,
        isRedirect: false,
        isBlock: false

    }
    onChangeHandler = (e) => {
        this.setState({ model: { ...this.state.model, [e.target.name]: e.target.value }, validate: true })
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            console.log(this.state.model.password)
            console.log(this.state.model.rePassword)
            if (this.state.model.password !== this.state.model.rePassword) this.setIsBlock(true)
            else this.setIsBlock(false)
        } else {
            console.log("valid1")
            if (this.state.model.password !== this.state.model.rePassword) {
                this.setIsBlock(true)
            }
            else {
                this.setIsBlock(false)
                console.log("valid1")
                const { firstName, lastName, userName, email, password } = this.state.model
                //this.props.actions.register({ firstName, lastName, userName, email, password }, this.props.history);
            }
        }
        this.setValidated(true);
    }
    setIsBlock = (val) => this.setState({ isBlock: val })
    setValidated = (val) => this.setState({ validate: val })
    renderRegister = () => {
        const { validate } = this.state;
        return (
            <Row className="bg-light" style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
                <Col md={{ span: 4, offset: 4 }} style={{ marginTop: 50, marginBottom: 50 }}>
                    <Form noValidate validated={validate} onSubmit={this.onSubmitHandler}>
                        <h3>Üye Ol</h3>
                        <FormGroup>
                            {
                                this.apiValidate()
                            }
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="firstName" required onChange={this.onChangeHandler} placeholder="İsim" />
                            <Form.Control.Feedback type="invalid">
                                Isim alanı boş geçilemez
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="lastName" required onChange={this.onChangeHandler} placeholder="Soyisim" />
                            <Form.Control.Feedback type="invalid">
                                Soyisim alanı boş geçilemez
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="userName" required onChange={this.onChangeHandler} placeholder="Kullanıcı adı" />
                            <Form.Control.Feedback type="invalid">
                                Kullanıcı adı alanı boş geçilemez
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="email" name="email" required onChange={this.onChangeHandler} placeholder="Email" />
                            <Form.Control.Feedback type="invalid">
                                E-mail alanı boş geçilemez
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="password" name="password" required onChange={this.onChangeHandler} placeholder="Şifre" />
                            <Form.Control.Feedback type="invalid">
                                Şifre alanı boş geçilemez
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="password" name="rePassword" required onChange={this.onChangeHandler} placeholder="Şifre onayla" />
                            <Form.Control.Feedback type="invalid">
                                Şifre onayla alanı boş geçilemez
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" style={{ display: this.state.isBlock ? "block" : "none" }}>
                                Şifreler uyuşmuyor
                            </Form.Control.Feedback>
                        </FormGroup>

                        <Button type="submit" block>Kayıt Ol</Button>
                    </Form>
                </Col>
            </Row >
        )
    }
    apiValidate = () => {
        if (this.props.registerRes.data) {
            return <div className="text-danger">{this.props.registerRes.data}</div>
        }
        return null;
    }
    render() {

        return (

            <div>
                <Container>
                    {
                        this.renderRegister()
                    }
                </Container>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            register: bindActionCreators(authActions.registerApi, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        registerRes: state.authReducer.registerResult
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);