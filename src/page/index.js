import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Icon from "../asset/image/icon.png";
import { Row, Col, Button } from "antd";
import IndexArea from "../components/IndexArea";
import { useRouteMatch } from "react-router-dom";

import firebaseFunction from '../firebase'

const MenuSite = () => {
  // const match = useRouteMatch('/index');
  var email = window.localStorage.getItem('email');

  console.log(email);

  const logout = () => {
    firebaseFunction.auth.signOut().then(function() {
      email = window.localStorage.removeItem('email');
      console.log(email)
      
      if (email == null) {
        alert("Sign-out successful")
        window.location.assign('/')
      }
      
    }).catch(function(error) {
      alert("Error")
      // An error happened.
    });
  }

  return (
    <Background>
     {email === null ? (
        <Container>
          <CenterArea>
          <span>Please Login First</span>
          <Link to="/">
            <button>Login</button>
          </Link>
          </CenterArea>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col span="4" style={{ display: "flex", justifyContent: "center" }}>
              <img src={Icon} width={80} height={80} />
            </Col>
            <Col span="10" style={{ display: "flex", alignItems: "center" }}>
              <Topic>Admin</Topic>
            </Col>
            <Col
              span="8"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Topic>{email}</Topic>
              <ButtonLogout type="primary" onClick={logout}>
                Logout
              </ButtonLogout>
            </Col>
          </Row>
          <IndexArea />
        </Container>
      )} 
    </Background>
  );
};

export default MenuSite;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-top: 3%;
  align-items: center;
`;

const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Background = styled.div`
  background: linear-gradient(
    180deg,
    rgba(230, 139, 236, 1) 0%,
    rgba(138, 99, 229, 1) 100%
  );
  min-height: 100vh;
`;

const Topic = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const ButtonLogout = styled.button`
  background: #f66181 !important;
  border-color: #f66181 !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 200px;
  height: 39px;
  margin-left: 5%;
  color: #000 !important;
  font-weight: bold;
`;
