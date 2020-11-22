import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Link, NavLink } from "react-router-dom";
import Icon from "../asset/image/icon.png";
import { Row, Col} from 'antd'

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
                alert("Account is not admin")
              }
            },
            (error) => {
              console.log(error);
             
            }
          );
      })
      .catch(error => {
        console.error(error);
        alert("Account is not admin")
        window.location.reload();
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  console.log("set email ")
  console.log(email)
  console.log(password)



  return (
    
    <Background>
    <Container>
      <CenterArea>

      <img src={Icon} width={80} height={80} />
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
              <RowStyled>
              <input
                style={{width: "300px"}}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
              />
              {errors.email && touched.email && errors.email}
              </RowStyled>
              <RowStyled style={{marginBottom: "15px"}}>
                <input
                  style={{width: "300px"}}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                {errors.password && touched.password && errors.password}
                
              </RowStyled>
              {/* <Link to={`/index/${email}`}> */}
              <RowStyled style={{display: "flex", justifyContent: "center"}}>
                <ButtonSubmit type="submit" disabled={isSubmitting}>
                  Login
                </ButtonSubmit>

              </RowStyled>
              {/* </Link> */}
            </form>
          )}
      </Formik>
      </CenterArea>
      

    </Container>
    </Background>
  );

}

export default Login;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-top: 3%;
  align-items: center;
  
`;
const Background = styled.div`
  background-color: #ECECEC;  
  min-height: 100vh;
`;

const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`

const RowStyled = styled(Row)`
  margin-top: 20px;
`

const ButtonSubmit = styled.button`
  background: linear-gradient(180deg, #7EF192 0%, #2DC897 100%);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 50px;
width: 200px;
border-color: transparent;
font-weight: bold;
cursor: pointer;
`