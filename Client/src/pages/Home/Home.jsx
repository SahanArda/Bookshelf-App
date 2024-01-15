import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import HomeNavbar from "../../components/HomeNavbar/HomeNavbar";
import AddBook from "../../components/AddBook/AddBook";
import DeleteBook from "../../components/DeleteBook/DeleteBook";
import UpdateBook from "../../components/UpdateBook/UpdateBook";
import styles from "./Hero.module.css";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleBookDeleted = (deletedBookId) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== deletedBookId)
    );
  };

  const handleBookUpdated = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  return (
    <>
      <HomeNavbar />
      <Container>
        <div className={styles.addbtn}>
          <AddBook onBookAdded={handleBookAdded} />
        </div>
        <Row>
          {books.map((book) => (
            <Col key={book._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                  <DeleteBook
                    bookId={book._id}
                    onBookDeleted={handleBookDeleted}
                  />
                  <UpdateBook
                    bookId={book._id}
                    onBookUpdated={handleBookUpdated}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
