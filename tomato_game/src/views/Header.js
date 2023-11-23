import React from 'react'
import { Container, Dropdown, Image, Navbar } from 'react-bootstrap';
import tomato_logo from "../assets/images/tomato_logo.png"

const Header = () => {
    return (
        <>
            <Navbar className='nav iq-navbar'>
                <Container fluid className='navbar-inner'>
                        <Image
                            src={tomato_logo}
                            width={65}
                            height={65}
                            className='navbar-brand m-2'
                        />
                        <h4 className='logo-title m-2'>Welcome,Ritik Sharma</h4>
                    <Dropdown as="li" className="nav-item">
                        <Dropdown.Toggle variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="caption ms-3 d-none d-md-block ">
                                <h5 className="mb-0 caption-title">Ritik's Profile</h5>
                                <p className="mb-0 caption-sub-title">Marketing Administrator</p>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <Dropdown.Divider />
                            <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/auth/sign-in">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;
