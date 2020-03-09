import React, { Component } from 'react'
import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/actions/authActions'
import * as userActions from '../../redux/actions/userActions'

class ProfileSettings extends Component {

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
            if (this.state.model.password !== this.state.model.rePassword) this.setIsBlock(true)
            else this.setIsBlock(false)
        } else {
            console.log("valid1")
            if (this.state.model.password !== this.state.model.rePassword) {
                this.setIsBlock(true)
            }
            else {
                this.setIsBlock(false)
                const { firstName, lastName, userName, email, password } = this.state.model
                this.props.actions.userUpdate({ firstName, lastName, userName, email, password, id: this.props.loggedUser.id }, this.props.history);
                
                this.props.actions.getLoggedUser();
                this.props.history.push("/profile/" + this.props.loggedUser.id)

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
                <Col style={{ marginTop: 50, marginBottom: 50 }}>
                    <Form noValidate validated={validate} onSubmit={this.onSubmitHandler}>

                        <Row>

                            <Col md={{ span: 4, offset: 2 }}>
                                <h3>Profili güncelle</h3>

                                <FormGroup>
                                    <Form.Control type="text" name="firstName" required onChange={this.onChangeHandler} placeholder="İsim" defaultValue={this.props.loggedUser.firstName} />
                                    <Form.Control.Feedback type="invalid">
                                        Isim alanı boş geçilemez
                            </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <Form.Control type="text" name="lastName" required onChange={this.onChangeHandler} placeholder="Soyisim" defaultValue={this.props.loggedUser.lastName} />
                                    <Form.Control.Feedback type="invalid">
                                        Soyisim alanı boş geçilemez
                            </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <Form.Control type="email" name="email" required onChange={this.onChangeHandler} placeholder="Email" defaultValue={this.props.loggedUser.email} />
                                    <Form.Control.Feedback type="invalid">
                                        E-mail alanı boş geçilemez
                            </Form.Control.Feedback>
                                </FormGroup>

                            </Col>
                            <Col md={{ span: 4 }}>
                                <h3>Şifre değiştir</h3>
                                <FormGroup>
                                    <Form.Control type="password" name="password" onChange={this.onChangeHandler} placeholder="Şifre" />
                                </FormGroup>
                                <FormGroup>
                                    <Form.Control type="password" name="rePassword" onChange={this.onChangeHandler} placeholder="Şifre onayla" />

                                    <Form.Control.Feedback type="invalid" style={{ display: this.state.isBlock ? "block" : "none" }}>
                                        Şifreler uyuşmuyor
                            </Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    {
                                        this.apiValidate()
                                    }
                                </FormGroup>
                                <Button type="submit" block className="" >Kaydet</Button>

                            </Col>
                        </Row>


                    </Form>
                </Col>
            </Row >
        )
    }
    apiValidate = () => {
        // if (this.props.registerRes.data) {
        //     return <div className="text-danger">{this.props.registerRes.data}</div>
        // }
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
            getLoggedUser: bindActionCreators(authActions.getLoggedUserApi, dispatch),
            userUpdate: bindActionCreators(userActions.userUpdateApi, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        loggedUser: state.authReducer.loggedUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);

