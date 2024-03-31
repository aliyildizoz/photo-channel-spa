import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'
import SimpleReactValidator from 'simple-react-validator';
import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import * as authAsyncActions from '../../redux/actions/auth/authAsyncActions'
export default function Login() {

    const [, forceUpdate] = useState()
    const validator = useRef(new SimpleReactValidator({ locale:"tr",autoForceUpdate: { forceUpdate: forceUpdate }}))

    const apiResponse = useSelector(state => state.apiResponseReducer);
    const dispatch = useDispatch();
    const login = () => {
        dispatch(authAsyncActions.loginApi(model))
    }

    const [model, setModel] = useState({ email: "", password: "" });

    const onChangeHandler = (e) => {
        setModel({ ...model, [e.target.name]: e.target.value })
        validator.current.showMessages()
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (validator.current.allValid()) {
            login();
        } else {
            validator.current.showMessages();
        }
    }
    return (
        <Container>
            <Row className="bg-light" style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
                <Col md={{ span: 4, offset: 4 }} style={{ marginTop: 50, marginBottom: 50 }} >
                    <Form onSubmit={onSubmitHandler}>
                        <h3>Giriş Yap</h3>
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