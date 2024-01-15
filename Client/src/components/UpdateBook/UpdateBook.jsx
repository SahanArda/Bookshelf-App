// UpdateBookForm.js
import { useState } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";

const UpdateBookForm = ({ bookId, onBookUpdated }) => {
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    author: "",
    coverPictureUrl: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdateBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3001/books/${bookId}`,
        updatedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onBookUpdated(response.data); // Notify parent about the updated book
      handleCloseModal();
    } catch (error) {
      console.error(
        "Error updating book:",
        error.response?.data || error.message
      );
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Update Book Details
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
                value={updatedBook.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={updatedBook.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover Picture URL</Form.Label>
              <Form.Control
                type="text"
                name="coverPictureUrl"
                value={updatedBook.coverPictureUrl}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateBook}>
            Update Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateBookForm;
