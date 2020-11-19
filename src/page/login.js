// import React from 'react';
// import styled from 'styled-components'
// import {auth} from '../firebase/index'

// import { Formik } from 'formik';

// class Login extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       email: '',
//       password: '',
//       currentUser: null,
//       message: ''
//     }
//   }

//   onChange = e => {
//     const { name, value } = e.target

//     this.setState({
//       [name]: value
//     })
//   }

//   onSubmit = e => {
//     e.preventDefault()

//     const { email, password } = this.state
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .then(response => {
//         this.setState({
//           currentUser: response.user
//         })
//       })
//       .catch(error => {
//         this.setState({
//           message: error.message
//         })
//       })
//   }

//   // TODO: implement signInWithEmailAndPassword()

//   render() {
//     const { message, currentUser } = this.state

//     if (currentUser) {
//       return (
//         <div>
//           <p>Hello {currentUser.email}</p>
//           <button onClick={this.logout}>Logout</button>
//         </div>
//       )
//     }
//     return (

//       <div>
//         <h1>Login</h1>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validate={values => {
//             const errors = {};
//             if (!values.email) {
//               errors.email = 'Required';
//             } else if (
//               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//             ) {
//               errors.email = 'Invalid email address';
//             }
//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               alert(JSON.stringify(values, null, 2));
//               setSubmitting(false);
//             }, 400);
//           }}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//             /* and other goodies */
//           }) => (
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="email"
//                   name="email"
//                   onChange={this.onChange}
//                   onBlur={handleBlur}
//                   value={values.email}
//                 />
//                 {errors.email && touched.email && errors.email}
//                 <input
//                   type="password"
//                   name="password"
//                   onChange={this.onChange}
//                   onBlur={handleBlur}
//                   value={values.password}
//                 />
//                 {errors.password && touched.password && errors.password}
//                 <button type="submit" disabled={isSubmitting} >
//                   login
//               </button>
//               </form>
//             )}
//         </Formik>
//       </div>
//     );
//   }

// }

// export default Login;