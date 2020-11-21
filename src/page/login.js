import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Link, NavLink } from "react-router-dom";

// import * as firebase from "firebase";

import firebaseFunction from '../firebase'
import axios from "axios";


// import { Formik } from 'formik';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  // let [loading, setLoading] = useState(false);

  const handleSubmit2 = (email, password) => {
    setEmail(email)
    setPassword(password)
    // setLoading(true);     
    firebaseFunction.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        var uid = firebaseFunction.auth.currentUser.uid;

        // console.log(result.user.uid)
        console.log('success!');
        axios
          .get("http://localhost:3000/user/admin/" + uid)
          .then(
            (response) => {

              console.log("post admin success!!!");
              console.log(response.data.user);
              if (response.data.user != null) {
                console.log("admin")
                window.localStorage.setItem('email', email);
                // Storage.prototype.setItem('email', email)
                window.location.assign('/console')
              } else {
                console.log("not admin")

              }
            },
            (error) => {
              console.log(error);
            }
          );
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  console.log("set email ")
  console.log(email)
  console.log(password)



  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     email: '',
  //     password: '',
  //     currentUser: null,
  //     message: ''
  //   }
  // }

  // onChange = e => {
  //   const { name, value } = e.target

  //   this.setState({
  //     [name]: value
  //   })
  // }

  // onSubmit = e => {
  //   e.preventDefault()

  //   const { email, password } = this.state

  //   firebaseFunction.auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(response => {
  //       this.setState({
  //         currentUser: response.user
  //       })
  //     })
  //     .catch(error => {
  //       this.setState({
  //         message: error.message
  //       })
  //     })
  // }

  // TODO: implement signInWithEmailAndPassword()

  // const { message, currentUser } = this.state

  // if (currentUser) {
  //   return (
  //     <div>
  //       <p>Hello {currentUser.email}</p>
  //       <button onClick={this.logout}>Logout</button>
  //     </div>
  //   )
  // }
  return (

    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values) => {
          // setTimeout(() => {

          console.log("HI Login")

          const email = values.email
          const password = values.password

          console.log(email)
          handleSubmit2(email, password)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              {/* <Link to={`/index/${email}`}> */}
              <button type="submit" disabled={isSubmitting} >
                login
              </button>
              {/* </Link> */}
            </form>
          )}
      </Formik>
    </div>
  );

}

export default Login;