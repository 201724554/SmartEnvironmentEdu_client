import React, { useEffect, useState } from 'react';
import './Header.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { decodeToken, isExpired } from 'react-jwt';
import { customAxios } from '../Common/CustomAxios';
import { RESPONSE_BAD_REQ, RESPONSE_OK } from '../Common/Response';

function Header() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    if (isExpired(localStorage.getItem('refresh')) === true) {
      localStorage.clear();
      setUsername('');
    } else {
      setUsername(decodeToken(localStorage.getItem('refresh')).username);
    }
  }, [isExpired(localStorage.getItem('refresh'))]);

  function logout() {
    customAxios.post('/logout').then((response) => {
      if (response.data.code === RESPONSE_OK) {
        localStorage.clear();
        alert('로그아웃 성공');
      } else if (response.data.code === RESPONSE_BAD_REQ) {
        alert('로그아웃 실패');
      }
    });
  }

  return (
    <div className="fixed-top">
      <div>
        <Navbar style={{ height: '2em', fontSize: '0.8em' }}>
          <Container className="justify-content-end">
            <Nav>
              {isExpired(localStorage.getItem('refresh')) === true ? (
                <>
                  <NavLink className={'nav-link'} to="/login">
                    LOGIN
                  </NavLink>
                  <NavLink className={'nav-link'} to="/register">
                    JOIN US
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className={'nav-link'}
                    to="/"
                    style={{ color: 'white' }}
                  >
                    {username}
                  </NavLink>
                  <span
                    className={'nav-link'}
                    style={{ color: 'white', cursor: 'pointer' }}
                    onClick={logout}
                  >
                    LOGOUT
                  </span>
                </>
              )}
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
              <NavDropdown
                title="DATA"
                id="basic-nav-dropdown"
                className={'mx-2'}
                style={{ fontSize: '1.2em' }}
              >
                <NavLink className={'nav-link'} to="/">
                  SEEd Device
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  Data portal
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  My data
                </NavLink>
              </NavDropdown>
              <NavDropdown
                title="ABOUT"
                id="basic-nav-dropdown"
                className={'mx-2'}
                style={{ fontSize: '1.2em' }}
              >
                <NavLink className={'nav-link'} to="/">
                  What we do
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  TEAM
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  Community
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  Projects
                </NavLink>
              </NavDropdown>
              <NavDropdown
                title="GET STARTED"
                id="basic-nav-dropdown"
                className={'mx-2'}
                style={{ fontSize: '1.2em' }}
              >
                <NavLink className={'nav-link'} to="/">
                  Using SEEd platform
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  SEEd Device manual
                </NavLink>

                <NavLink className={'nav-link'} to="/">
                  Data manual
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  FAQs
                </NavLink>
              </NavDropdown>
              <NavDropdown
                title="EDUCATION"
                id="basic-nav-dropdown"
                className={'mx-2'}
                style={{ fontSize: '1.2em' }}
              >
                <NavLink className={'nav-link'} to="/">
                  Start E-Classes
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  E-Classes
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  Project reports
                </NavLink>
              </NavDropdown>
              <NavDropdown
                title="LEARN MORE"
                id="basic-nav-dropdown"
                style={{ fontSize: '1.2em' }}
                className={'mx-2'}
              >
                <NavLink className={'nav-link'} to="/">
                  News and Research
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  Education Resources
                </NavLink>
                <NavLink className={'nav-link'} to="/">
                  Training and implementation
                </NavLink>
              </NavDropdown>
              <NavLink
                className={'nav-link mx-2'}
                to="/etc"
                style={{ color: 'rgba(0,0,0,0.55)', fontSize: '1.2em' }}
              >
                CONTACT
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
