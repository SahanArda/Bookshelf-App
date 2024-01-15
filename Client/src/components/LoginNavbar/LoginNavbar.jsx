import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const LoginNavbar = () => {
  return (
    <Navbar className="bg-body-tertiary" fixed='top'>
      <Container fluid>
        <Navbar.Brand>Bookshelf</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default LoginNavbar;
