import { Container } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/users/login",
          values
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/home");
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    },
  });

  return (
    <>
      <Container className={styles.test}>
        <div className={styles.form_container}>
          <form className="row g-3" onSubmit={formik.handleSubmit}>
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
                Sign in
              </button>
            </div>
            {/* <div className="col-md-6">
              <button
                type="submit"
                className={`btn btn-primary ${styles.btn}`}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div> */}
            <div className="col-12">
              <p className={styles.small_text}>
                Don't have an account? Create one {" "}
                <span
                  className={styles.link}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  here
                </span>
              </p>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
