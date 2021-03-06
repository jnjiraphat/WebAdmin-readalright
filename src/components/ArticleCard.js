import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, Row, Button, Col } from "antd";
import axios from "axios";
import { Spin } from "antd";

const ArticleCard = (props) => {
  const { title, catergory, level, editButton, removeButton } = props;
  // const [article, setArticle] = useState([]);

  async function fetch() {
    const result = await axios("https://readalright-backend.khanysorn.me/reading");

    setArticle(result.data);
    console.log("this is all article");
    console.log(article[0]);
  }

  
  async function deleteArticle(reading_id) {
    console.log("reading_id in delete article!");
    console.log(reading_id);
    await axios
      .delete("https://readalright-backend.khanysorn.me/admin/deleteReading/" + reading_id)
      .then(
        (response) => {
          alert("delete article success");
          console.log(response);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const [article, setArticle] = useState([]);
  useEffect(() => {
    async function fetch() {
      const result = await axios("https://readalright-backend.khanysorn.me/reading");
      
      setArticle(result.data);
      console.log("this is all article");    }  
      fetch();
  }, []);

  return (
    <>
      {article.title === "" ? (
        <center style={{ marginTop: "20vh" }}>
          <Spin />
        </center>
      ) : (
        <div>
          {article.map((items) => (
            <CardStyled>
              <Row>
                <ColStyled span="8">
                  <ui>
                    <li>{items.title}</li>
                  </ui>
                </ColStyled>
                <SubCol span="4">
                  <ui>
                    <li>{items.categoryName}</li>
                  </ui>
                </SubCol>
                <SubCol span="4">
                  <ui>
                    <li>{items.level_reading}</li>
                  </ui>
                </SubCol>
                <TailCol span="8">
                  <Link to="/edit-article">
                    <EditButton type="primary" danger>
                      {/* <Route path="/post/"  component={Post} /> */}
                      <Link to={`/edit-article/${items.reading_id}`}>
                        Edit Content
                      </Link>
                    </EditButton>
                  </Link>
                  <Link to="/edit-postTest">
                    <EditButton type="primary" danger>
                      <Link to={`/edit-postTest/${items.reading_id}`}>
                        Edit Post Test
                      </Link>
                    </EditButton>
                  </Link>
                  <RemoveButton
                    type="primary"
                    danger
                    onClick={() => deleteArticle(items.reading_id)}
                  >
                    Remove
                  </RemoveButton>
                </TailCol>
              </Row>
            </CardStyled>
          ))}
        </div>
      )}
    </>
  );
};

export default ArticleCard;

const CardStyled = styled(Card)`
  margin-bottom: 15px;
`;

const ButtonStyled = styled(Button)`
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  border-color: transparent !important;
  color: #000 !important;
  width: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

const EditButton = styled(ButtonStyled)`
  width: 90%;
  background: linear-gradient(180deg, #ffd387 0%, #ffe43a 100%) !important;
`;
const RemoveButton = styled(ButtonStyled)`
  background: linear-gradient(180deg, #ffb382 0%, #f07590 100%) !important;
`;

const ColStyled = styled(Col)`
  font-size: 14px;
  overflow: hidden;
  font-weight: 700;
`;

const SubCol = styled(ColStyled)`
  display: flex;
  justify-content: center;
`;

const TailCol = styled(ColStyled)`
  display: flex;
  justify-content: flex-end;
`;
