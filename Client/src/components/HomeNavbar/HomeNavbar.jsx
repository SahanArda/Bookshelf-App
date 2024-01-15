import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./HomeNavbar.module.css";


const HomeNavbar = () => {
	const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the stored token (or perform any other necessary cleanup)
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/");
  };
  return (
    <Navbar expand="md" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand href="#">Bookshelf</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Bookshelf
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-5">
              <NavDropdown
                title={<i className="fa-regular fa-user"></i>}
                id="offcanvasNavbarDropdown-expand-md"
								className={styles.navbar_element}
              >
                <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;
