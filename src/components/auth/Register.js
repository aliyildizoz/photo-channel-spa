import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'
import SimpleReactValidator from 'simple-react-validator';
import React, { useState, useEffect, useRef } from 'react';
import { Link,useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import * as authAsyncActions from '../../redux/actions/auth/authAsyncActions'
export default function Register() {

    const [, forceUpdate] = useState()
    const validator = useRef(new SimpleReactValidator({ locale:"tr",autoForceUpdate: { forceUpdate: forceUpdate }}))

    const apiResponse = useSelector(state => state.apiResponseReducer);
    const dispatch = useDispatch();

    const history = useHistory()
    const register = () => {
        dispatch(authAsyncActions.registerApi(model))
    }

    const [model, setModel] = useState({ email: "", password: "",firstName:"",lastName:"",userName:"" });

    const onChangeHandler = (e) => {
        setModel({ ...model, [e.target.name]: e.target.value })
        validator.current.showMessages()
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (validator.current.allValid()) {
            register();
        } else {
            validator.current.showMessages();
        }
    }
    return (
        <Container>
            <Row className="bg-light" style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
                <Col md={{ span: 4, offset: 4 }} style={{ marginTop: 50, marginBottom: 50 }} >
                    <Form onSubmit={onSubmitHandler}>
                        <h3>Kayıt Ol</h3>
                        <FormGroup>
                            <Form.Control type="text" name="firstName" required onChange={onChangeHandler} placeholder="İsim" />
                            {validator.current.message('firstName', model.firstName, 'required', { className: 'text-danger' })}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="lastName" required onChange={onChangeHandler} placeholder="Soyisim" />
                            {validator.current.message('lastName', model.lastName, 'required', { className: 'text-danger' })}</FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="userName" required onChange={onChangeHandler} placeholder="Kullanıcı adı" />
                            {validator.current.message('userName', model.userName, 'required', { className: 'text-danger' })}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="email" onChange={onChangeHandler} placeholder="Email" />
                            {validator.current.message('email', model.email, 'required|email', { className: 'text-danger' })}
                            {validator.current.messageWhenPresent(apiResponse.message, { className: 'text-danger' })}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="password" name="password" onChange={onChangeHandler} placeholder="Şifre" />
                            {validator.current.message('password', model.password, 'required|min:1|max:50', { className: 'text-danger' })}
                        </FormGroup>
                        <Button type="submit" block className="col-6">Giriş</Button>
                        <p className="text-right">
                            Forgot <Link to="#">password?</Link>
                        </p>
                    </Form>
                </Col>
            </Row >
        </Container>
    )
}