import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
// import * as firebase from "firebase";

import firebaseFunction from '../firebase'
import axios from "axios";


// import { Formik } from 'formik';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  // let [loading, setLoading] = useState(false);

  const handleSubmit2 = (email, password) => {
    // setLoading(true);     
    firebaseFunction.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // console.log(result.user.uid)
        console.log('success!');
        axios
          .post("http://localhost:3000/createAdmin", {
            email : email,
            password: password,
          })
          .then(
            (response) => {
              setEmail(email)
              setPassword(password)
              console.log("post admin success!!!");
              console.log(response);
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
              <button type="submit" disabled={isSubmitting} >
                login
              </button>
            </form>
          )}
      </Formik>
    </div>
  );

}

export default Login;