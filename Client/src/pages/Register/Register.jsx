import { Container } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "../../components/LoginNavbar/LoginNavbar";
import styles from "./Register.module.css";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .required("Required"),
});

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        // Perform registration logic
        await axios.post("http://localhost:3001/users/register", values);

        // Redirect to the login page after successful registration
        navigate("/");
      } catch (error) {
        console.error("Registration failed:", error.message);
      }
    },
  });

  return (
    <>
      <LoginNavbar />
      <Container className={styles.register_container}>
        <div className={styles.form_container}>
          <form className="row g-3" onSubmit={formik.handleSubmit}>
            <div className="col-md-6">
              <input
                className={`form-control ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "is-invalid"
                    : ""
                }`}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              <div className="invalid-feedback">
                {formik.touched.firstName && formik.errors.firstName}
              </div>
            </div>

            <div className="col-md-6">
              <input
                className={`form-control ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "is-invalid"
                    : ""
                }`}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <div className="invalid-feedback">
                {formik.touched.lastName && formik.errors.lastName}
              </div>
            </div>

            <div className="col-md-6">
              <input
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div className="invalid-feedback">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>

            <div className="col-md-6">
              <input
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div className="invalid-feedback">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className={`btn btn-primary ${styles.btn}`}>
                Register
              </button>
            </div>
          </form>
          <div className="col-12">
            <p className={styles.small_text}>
              Already have an account?{" "}
              <span
                className={styles.link}
                onClick={() => {
                  navigate("/");
                }}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
