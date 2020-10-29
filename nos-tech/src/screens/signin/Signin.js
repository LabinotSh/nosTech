import React from "react";
import "./signin.css";
import { useFormik } from "formik";
import SelectComp from "../../components/select/SelectComp.js";

const options = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
];

function Signin() {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.role) {
      errors.role = "Role is required";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
    },
    validate,
    onSubmit: (value) => {
      alert(value);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          className="input"
          name="email"
          id="email"
          type="email"
          onChange={(value) => formik.setFieldValue("Role", value.value)}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="email">Job</label>
        <Select options={options} value={formik.values.role} />
        {formik.errors.role ? (
          <div className="error">{formik.errors.role}</div>
        ) : null}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signin;
