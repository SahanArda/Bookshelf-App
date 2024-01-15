import axios from "axios";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const DeleteBook = ({ bookId, onBookDeleted }) => {
  const handleDeleteBook = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onBookDeleted(bookId); // Notify parent about the deleted book
    } catch (error) {
      console.error(
        "Error deleting book:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Button variant="danger" onClick={handleDeleteBook}>
      Delete
    </Button>
  );
};

DeleteBook.propTypes = {
  bookId: PropTypes.string.isRequired,
  onBookDeleted: PropTypes.func.isRequired,
}

export default DeleteBook;
