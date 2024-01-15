// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// const AddBook = ({ onBookAdded }) => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const addBookSchema = Yup.object().shape({
//     title: Yup.string().required("Required"),
//     author: Yup.string().required("Required"),
//     coverPictureUrl: Yup.string(),
//   });

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       author: "",
//       coverPictureUrl: "",
//     },
//     validationSchema: addBookSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post(
//           "http://localhost:3001/books",
//           values
//         );

//         // Assuming the response contains the newly added book details
//         const newBook = response.data;

//         // Close the modal
//         handleClose();

//         // Trigger the callback to update the books on the main page
//         onBookAdded(newBook);
//       } catch (error) {
//         console.error("Error adding book:", error.message);
//       }
//     },
//   });

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Add Book
//       </Button>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add a Book</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={formik.handleSubmit}>
//             <div>
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.title}
//               />
//               {formik.touched.title && formik.errors.title ? (
//                 <div>{formik.errors.title}</div>
//               ) : null}
//             </div>

//             <div>
//               <label htmlFor="author">Author</label>
//               <input
//                 type="text"
//                 id="author"
//                 name="author"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.author}
//               />
//               {formik.touched.author && formik.errors.author ? (
//                 <div>{formik.errors.author}</div>
//               ) : null}
//             </div>

//             <div>
//               <label htmlFor="coverPictureUrl">Cover Picture URL</label>
//               <input
//                 type="text"
//                 id="coverPictureUrl"
//                 name="coverPictureUrl"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.coverPictureUrl}
//               />
//               {formik.touched.coverPictureUrl &&
//               formik.errors.coverPictureUrl ? (
//                 <div>{formik.errors.coverPictureUrl}</div>
//               ) : null}
//             </div>

//             <div>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button variant="primary" type="submit" onClick={handleadd}>
//                 Add Book
//               </Button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default AddBook;
