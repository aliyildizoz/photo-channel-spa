import Image from 'cloudinary-react/lib/components/Image'
import Transformation from 'cloudinary-react/lib/components/Transformation'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, FormControl, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { searchByTextApi } from '../../redux/actions/search/searchAsyncActions'
import { searchByTextSuccess } from '../../redux/actions/search/searchActionCreators'

const SearchInput = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const searchTextRes = useSelector(state => state.searchReducer.searchTextRes)
    const [inputIsFocus, setInputIsFocus] = useState(false)
    const [cursor, setCursor] = useState(0)
    const [searchText, setSearchText] = useState("")
    const searchInputRef = React.createRef();
    const [contentSize, setMarginLeft] = useState({});
    useEffect(() => {
        setMarginLeft(searchInputRef.current.getBoundingClientRect())
    }, [])
    const onChangeHandler = (event) => {
        setSearchText(event.target.value)
        if (event.target.value !== "") {
            dispatch(searchByTextApi(event.target.value, history));
            setInputIsFocus(true);

        } else {
            dispatch(searchByTextSuccess({}));
            setInputIsFocus(false);
        }
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 38 && cursor > 0) {
            const newCursor = cursor - 1;
            setCursor(newCursor);
        } else if (e.keyCode === 40 && cursor < (searchTextRes.users.length + searchTextRes.channels.length - 1)) {
            const newCursor = cursor + 1;
            setCursor(newCursor);
        } else if (e.keyCode === 13) {
            var redirectUrl = ""
            if (cursor >= searchTextRes.channels.length) {
                var user = searchTextRes.users.find((val, i) => i === cursor - searchTextRes.channels.length)
                redirectUrl = "/profile/" + user.id;
            } else {
                var channel = searchTextRes.channels.find((val, i) => i === cursor);
                redirectUrl = "/channel/" + channel.id;
            }

            history.push(redirectUrl);
            setCursor(0);
            setInputIsFocus(false);
            dispatch(searchByTextSuccess({}));
            setSearchText("");
        }

    }
    return <div>
        <div onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setInputIsFocus(false);
                setCursor(0);
            }
        }}>
            <FormControl ref={searchInputRef} onFocus={() => setInputIsFocus(true)} onKeyDown={handleKeyDown} type="text" value={searchText} onChange={onChangeHandler} placeholder="arama" style={{ width: 400, height: 30 }} className="mr-2 ml-3" />

            {
                inputIsFocus ? <Container >
                    <Row>
                        <Col className="fixed-top mt-5"  style={{ marginLeft: contentSize.left-15, width: contentSize.width+30 }}>

                            <ListGroup>
                                {
                                    Object.entries(searchTextRes).length !== 0 ? searchTextRes.channels.map((c, i) => {
                                        return <Link key={i} onClick={() => { setSearchText(""); dispatch(searchByTextSuccess({})); }} className="text-decoration-none" to={"/channel/" + c.id}>
                                            <ListGroup.Item action variant="light"  className="d-flex pt-1 pb-1 " style={{ backgroundColor: (cursor === i ? "#ececf6" : null) }}>

                                                <Image cloudName="dwebpzxqn" publicId={c.publicId}   >
                                                    <Transformation width={25} height={25} gravity="auto" crop="fill" radius="2" />
                                                </Image>
                                                <h6 className="d-flex align-items-center ml-2"> {c.name}</h6>

                                            </ListGroup.Item></Link>

                                    }) : null
                                }
                                {
                                    Object.entries(searchTextRes).length !== 0 ? searchTextRes.users.map((u, i) => {
                                        return <Link key={i+10} onClick={() => { setSearchText(""); dispatch(searchByTextSuccess({})) }} className="text-decoration-none" to={"/profile/" + u.id}>
                                            <ListGroup.Item action variant="light"  className="d-flex pt-1 pb-0 " style={{ backgroundColor: (cursor === i + searchTextRes.channels.length ? "#ececf6" : null) }}>
                                                <i className="fas fa-user mr-2 ml-1 " style={{ fontSize: 18 }}></i>
                                                <h6 className="d-flex align-items-center ml-1 "> {u.firstName + " " + u.lastName}</h6>
                                            </ListGroup.Item>
                                        </Link>
                                    }) : null
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Container> : null
            }
        </div>
    </div>
}
export default SearchInput;