import axios from 'axios'
import React, { Component, useEffect, useRef, useState } from 'react'
import { Container, Form, FormGroup, Row, Col, Button, Accordion, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import { getUserDetailSuccess } from '../../redux/actions/user/userActionsCreators'
import { getUserUrlById, getUpdatePasswordUrl } from '../../redux/actions/user/userEndPoints'
import { authHeaderObj } from '../../redux/helpers/localStorageHelper'
import * as localStorageHelper from "../../redux/helpers/localStorageHelper"
import { redirectErrPage } from '../../redux/helpers/historyHelper'
import { currentUserClearSuccess, currentUserSuccess, isLoggedFSuccess } from '../../redux/actions/auth/authActionsCreators'
import { toast } from 'react-toastify';
export default class ProfileSettings extends Component {

    render() {
        return (
            <div>
                <Container>
                    <Settings />
                </Container>
            </div>
        )
    }
}

function Settings() {
    const [, forceUpdate] = useState()
    const userValidator = useRef(new SimpleReactValidator({ locale: "tr", autoForceUpdate: { forceUpdate: forceUpdate } }))
    const passwordValidator = useRef(new SimpleReactValidator({ locale: "tr", autoForceUpdate: { forceUpdate: forceUpdate } }))

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const currentUser = useSelector(state => state.currentUserReducer.detail)

    const [userModel, setUserModel] = useState({});
    const [userResponse, setUserResponse] = useState("");
    const [isChange, setIsChange] = useState(false);

    const [passwordModel, setPasswordModel] = useState({ oldPasword: "", newPassword: "", newRePassword: "", equalMessage: "" });
    const [passwordResponse, setPasswordResponse] = useState("")

    useEffect(() => { setUserModel({ ...currentUser }) }, [setUserModel, currentUser])

    const onChangeHandlerUser = (e) => {
        setUserModel({ ...userModel, [e.target.name]: e.target.value })
        setIsChange(true)
        userValidator.current.showMessages()
    }
    const setEqualMessage = (equalMessage = "Şifreler eşleşmiyor") => setPasswordModel({ ...passwordModel, equalMessage })
    const onChangeHandlerPassword = (e) => {
        setPasswordModel({ ...passwordModel, [e.target.name]: e.target.value })
        passwordValidator.current.showMessages()

    }
    const onSubmitHandlerUser = async (event) => {
        event.preventDefault();
        if (userValidator.current.allValid() && isChange) {

            await axios.put(getUserUrlById(currentUser.id), userModel, { headers: authHeaderObj() }).then(res => {
                dispatch(getUserDetailSuccess(currentUser));
                localStorageHelper.setToken(res.data)
            }).then(() => navigate("/profile/" + currentUser.id)).then(() => dispatch(currentUserSuccess(userModel))).then(() => toast.success("Hesap güncellendi.")).catch((err) => setUserResponse(err.response.data))

        } else {
            userValidator.current.showMessages();
        }
    }
    const onSubmitHandlerPassword = async (event) => {
        event.preventDefault();
        if (passwordValidator.current.allValid()) {
            if (passwordModel.newPassword === passwordModel.newRePassword) {
                await axios.put(getUpdatePasswordUrl(currentUser.id), {
                    oldPassword: passwordModel.oldPasword,
                    newPassword: passwordModel.newPassword
                }, { headers: authHeaderObj() }).then(() => navigate("/profile/me")).then(() => toast.success("Şifre güncellendi.")).catch((err) => setPasswordResponse(err.response.data))
                setEqualMessage("");
            }
            else {
                setEqualMessage()
            }
        } else {
            passwordValidator.current.showMessages();
        }
    }
    const deleteAccount = async () => {
        await axios.delete(getUserUrlById(currentUser.id), { headers: authHeaderObj() }).then(() => {
            localStorageHelper.removeToken();
            dispatch(isLoggedFSuccess());
            dispatch(currentUserClearSuccess());
            navigate("/")
        }).catch((err) => redirectErrPage(err, dispatch))
    }
    return <Row className="bg-light" style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
        <Col style={{ marginTop: 50, marginBottom: 50 }}>

            <Row className="mb-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={onSubmitHandlerUser}>
                        <h3>Profili güncelle</h3>
                        <FormGroup>
                            <Form.Control type="text" name="firstName" onChange={onChangeHandlerUser} placeholder="İsim" defaultValue={userModel.firstName} />
                            {userValidator.current.message('firstName', userModel.firstName, 'required|min:1|max:50', { className: 'text-danger' })}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="lastName" onChange={onChangeHandlerUser} placeholder="Soyisim" defaultValue={userModel.lastName} />
                            {userValidator.current.message('lastName', userModel.lastName, 'required|min:1|max:50', { className: 'text-danger' })}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="userName" onChange={onChangeHandlerUser} placeholder="Kullanıcı adı" defaultValue={userModel.userName} />
                            {userValidator.current.message('userName', userModel.userName, 'required|min:1|max:50', { className: 'text-danger' })}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type="text" name="email" onChange={onChangeHandlerUser} placeholder="Email" defaultValue={userModel.email} />
                            {userValidator.current.message('email', userModel.email, 'required|email|min:1|max:50', { className: 'text-danger' })}
                            {userValidator.current.messageWhenPresent(userResponse, { className: 'text-danger' })}


                        </FormGroup>
                        <Button type="submit" block className="" >Kaydet</Button>
                    </Form>
                </Col>
            </Row><Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Accordion>
                        <Accordion.Toggle as="a" className="text-decoration-none cursorPointer" variant="link" eventKey="0">
                            <h3 className="text-dark"> Şifre değiştir &nbsp;<i className="fas fa-exchange-alt text-info fa-lg"></i></h3>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Alert variant="dark">
                                <Form onSubmit={onSubmitHandlerPassword}>
                                    <FormGroup>
                                        <Form.Control type="password" name="oldPasword" onChange={onChangeHandlerPassword} placeholder="Eski şifre" />
                                        {passwordValidator.current.message('oldPasword', passwordModel.oldPasword, 'required', { className: 'text-danger' })}
                                        {passwordValidator.current.messageWhenPresent(passwordResponse, { className: 'text-danger' })}
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Control type="password" name="newPassword" onChange={onChangeHandlerPassword} placeholder="Yeni şifre" />
                                        {passwordValidator.current.message('newPassword', passwordModel.newPassword, 'required|min:6', { className: 'text-danger' })}
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Control type="password" name="newRePassword" onChange={onChangeHandlerPassword} placeholder="Yeni şifre tekrar" />
                                        {passwordValidator.current.messageWhenPresent(passwordModel.equalMessage, { className: 'text-danger' })}
                                        {passwordValidator.current.message('newRePassword', passwordModel.newRePassword, 'required|min:6', { className: 'text-danger' })}
                                    </FormGroup>
                                    <Button type="submit" variant="success" block className="" >Onayla</Button>
                                </Form>
                            </Alert>
                        </Accordion.Collapse>

                        <Accordion.Toggle as="a" className="text-decoration-none cursorPointer" variant="link" eventKey="1">
                            <h3 className="text-dark"> Hesabı sil &nbsp;<i className="fas fa-minus-circle text-danger fa-lg"></i></h3>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Alert variant="danger">Hesabını silmek istediğinden emin misin ? <Button variant="danger" onClick={deleteAccount} className="ml-2">Evet</Button></Alert>
                        </Accordion.Collapse>
                    </Accordion>

                </Col>
            </Row>

        </Col>
    </Row >
}

