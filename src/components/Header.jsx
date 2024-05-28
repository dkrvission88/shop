import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logoutUser } from '../Slices/UserSlice'

const Header = () => {
  let {userInfo} = useSelector(state=>state.user);
  let dispatch = useDispatch();
  const logoutHandler = () => { 
    dispatch(logoutUser());
   }
  return (
    <header>
         <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to={'/'}>
        <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to={'/cart'}>
            <Nav.Link>cart</Nav.Link>
            </LinkContainer>
           {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to={'/profile'}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
           ): (
            <LinkContainer to={'/login'}>
            <Nav.Link>
              Sign In
            </Nav.Link>
            </LinkContainer>
           )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header