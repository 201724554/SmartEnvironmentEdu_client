import React, {useEffect, useState} from 'react';
import './Header.css';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {decodeToken, isExpired} from "react-jwt";
import {customAxios} from "../Common/CustomAxios";
import {RESPONSE_BAD_REQ, RESPONSE_OK} from "../Common/Response";

function Header() {
    const [username,setUsername] = useState("");
    useEffect(()=> {
        if (isExpired(localStorage.getItem("refresh")) === true)
        {
            localStorage.clear();
            setUsername("");
        }
        else
        {
            setUsername(decodeToken(localStorage.getItem("refresh")).username);
        }
    },[isExpired(localStorage.getItem("refresh"))]);

    function logout()
    {
        customAxios.post("/logout").then((response)=>{
            if(response.data.code === RESPONSE_OK)
            {
                localStorage.clear();
                alert("로그아웃 성공");
            }
            else if(response.data.code === RESPONSE_BAD_REQ)
            {
                alert("로그아웃 실패");
            }
        })
    }

    return (
        <div className="fixed-top">
            <div>
                <Navbar
                    style={{ backgroundColor: 'black', height: '2em', fontSize: '0.8em' }}
                >
                    <Container className="justify-content-end">
                        <Nav>
                            <NavLink
                                className={'nav-link'}
                                to="/seed"
                                style={{ color: 'white' }}
                            >
                                Seed
                            </NavLink>
                            <NavLink
                                className={'nav-link'}
                                to="/classroom"
                                style={{ color: 'white' }}
                            >
                                수업하기
                            </NavLink>
                            {
                                isExpired(localStorage.getItem("refresh")) === true
                                    ? (
                                        <>
                                            <NavLink
                                                className={'nav-link'}
                                                to="/login"
                                                style={{color: 'white'}}
                                            >
                                                로그인
                                            </NavLink>
                                            <NavLink
                                                className={'nav-link'}
                                                to="/register"
                                                style={{color: 'white'}}
                                            >
                                                회원가입
                                            </NavLink>
                                        </>
                                    )
                                    : (
                                        <>
                                            <NavLink
                                                className={'nav-link'}
                                                to="/"
                                                style={{color: 'white'}}
                                            >{username}
                                            </NavLink>
                                            <span
                                                className={'nav-link'}
                                                style={{color: 'white', cursor: "pointer"}}
                                                onClick={logout}
                                            >로그아웃
                                        </span>
                                        </>
                                    )
                            }
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Navbar>
                    <Container
                        className="justify-content-between"
                        style={{ height: '5em' }}
                    >
                        <Nav>
                            <NavLink className="nav-link" to="/" style={{ color: 'black' }}>
                                <h4>test</h4>
                            </NavLink>
                        </Nav>
                        <Nav>
                            <NavLink
                                className="nav-link mx-4"
                                to="/platform"
                                style={{ color: 'black' }}
                            >
                                <h4>플랫폼 소개</h4>
                            </NavLink>
                            <NavLink
                                className={'nav-link mx-4'}
                                to="/education"
                                style={{ color: 'black' }}
                            >
                                <h4>교육</h4>
                            </NavLink>
                            <NavLink
                                className={'nav-link mx-4'}
                                to="/etc"
                                style={{ color: 'black' }}
                            >
                                <h4>기타</h4>
                            </NavLink>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
}

export default Header;