import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import HomeNavbar from "../../components/HomeNavbar/HomeNavbar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    coverPictureUrl: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch books when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User not authenticated. Token not found.');
        return;
      }
  
      console.log('Adding book:', newBook); // Add this line for debugging
  
      const response = await axios.post(
        'http://localhost:3001/books',
        newBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Add book response:', response.data); // Add this line for debugging
  
      // Fetch updated list of books after adding a new one
      fetchBooks();
      // Clear the form
      setNewBook({ title: '', author: '', coverPictureUrl: '' });
      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error('Error adding book:', error.response?.data || error.message);
    }
  };
  

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <HomeNavbar />
      <Container>
        <Row>
          <Col>
            <Button variant="primary" onClick={handleShowModal}>
              Add Book
            </Button>

            {/* Modal for adding books */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add Book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={newBook.title}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={newBook.author}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Cover Picture URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="coverPictureUrl"
                      value={newBook.coverPictureUrl}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddBook}>
                  Add Book
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row>
          {/* Display the list of books */}
          {books.map((book) => (
            <Col key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <img
                src={book.coverPictureUrl}
                alt={book.title}
                style={{ maxWidth: "100px" }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
