// AddBookForm.js
import { useState } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const AddBook = ({ onBookAdded }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/books",
        newBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onBookAdded(response.data); // Notify parent about the new book
      setNewBook({ title: "", author: ""});
      handleCloseModal();
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response?.data || error.message
      );
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Add Book
      </Button>
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
    </>
  );
};

AddBook.propTypes = {
  onBookAdded: PropTypes.func.isRequired,
};

export default AddBook;
