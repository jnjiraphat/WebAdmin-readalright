import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Route, Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
// const readingId = "";
const AddArticle = () => {
  const [person, setPerson] = useState([]);
  const [readingIdD, setReadingIdD] = useState("");

  async function fetch() {
    const result = await axios("https://jsonplaceholder.typicode.com/users");

    setPerson(result.data);
    // console.log(person)
  }
  useEffect(() => {
    fetch();
  });

  async function postReading(
    title,
    content,
    image,
    category_id,
    level_reading
  ) {
    const response = await axios.post("http://localhost:3000/reading", {
      title: title,
      content: content,
      image: image,
      category_id: category_id,
      level_reading: level_reading,
    });
    console.log("reading", response.data);
    var readingId = response.data.quiz;
    console.log(readingId);
    setReadingIdD(readingId);
    // console.log("reading", response.data.quiz);
    // readingId = response.data.quiz;
    // setReadingId(response.data.quiz)
    // if (readingId != "") {
    //   console.log(readingId)
    // }
  }

  async function postQuiz(
    question,
    typeOfSuggestion_id,
    isRightChoice,
    choice
  ) {
    const response = await axios.post("http://localhost:3000/quizs", {
      question: question,
      typeOfSuggestion_id: typeOfSuggestion_id,
      reading_id: readingIdD,
    });
    console.log("quiz", response.data);
    console.log("quizId", response.data.quiz);
    await postChoice(isRightChoice, choice, response.data.quiz);
  }
  async function postChoice(isRightChoice, choice, question_id) {
    const response = await axios.post("http://localhost:3000/choice", {
      isRightChoice: isRightChoice,
      choice: choice,
      optionText: choice,
      value: choice,
      question_id: question_id,
    });
    console.log("choice", response.data);
  }

  return (
    <Background>
      <Container>
        <AreaTopic>
          <TopicAdd>Add Article</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              <h1>Article</h1>
              <Formik
                initialValues={{
                  content: {
                    title: "",
                    content: "",
                    image: "",
                    category_id: "1",
                    level_reading: "A1",
                  },
                }}
                onSubmit={(values) => {
                  console.log(values);
                  postReading(
                    values.content.title,
                    values.content.content,
                    "image test",
                    values.content.category_id,
                    values.content.level_reading
                  );

                  // same shape as initial values
                }}
              >
                {(formProps) => (
                  <Form>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>Title:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled name="content.title" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>content:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldContent name="content.content" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>photo:</TextForm>
                      </Col>
                      <Col span="12">
                        <input
                          type="file"
                          name="file"
                          onChange={(event) => {
                            formProps.setFieldValue(
                              "photo1",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>category_id:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled as="select" name="content.category_id">
                          <option value="1">Song</option>
                          <option value="2">Movie</option>
                          <option value="3">Sport</option>
                          <option value="4">Entertainment</option>
                          <option value="5">Health</option>
                          <option value="6">Information Technology</option>
                          <option value="7">Travel</option>
                          <option value="8">Story</option>
                        </FieldStyled>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>level_reading:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled as="select" name="content.level_reading">
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="B1">B1</option>
                        </FieldStyled>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6"></Col>
                      <Col span="12"></Col>
                      <ColSubmit span="6">
                        <button type="submit">Submit</button>
                      </ColSubmit>
                    </RowStyled>
                  </Form>
                )}
              </Formik>

              <h1>Post Test</h1>
              <h4>Question no.1</h4>
              <Formik
                initialValues={{
                  content: {
                    question: "",
                    typeOfSuggestion_id: "1",
                    isRightChoice: "1",
                    choice: "",
                  },
                }}
                onSubmit={(values) => {
                  console.log(values);
                  postQuiz(
                    values.content.question,
                    values.content.typeOfSuggestion_id,
                    values.content.isRightChoice,
                    values.content.choice
                  );
                }}
              >
                {(formProps) => (
                  <Form>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>question:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldContent name="content.question" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>typeOfSuggestion_id:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled
                          as="select"
                          name="content.typeOfSuggestion_id"
                        >
                          <option value="1">Verb</option>
                          <option value="2">Noun</option>
                        </FieldStyled>
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>isRightChoice:</TextForm>
                      </Col>
                      <Col span="12">
                        <Field
                          type="radio"
                          name="content.isRightChoice"
                          value="1"
                        />{" "}
                        True
                        <Field
                          type="radio"
                          name="content.isRightChoice"
                          value="0"
                        />{" "}
                        False
                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6">
                        <TextForm>choice:</TextForm>
                      </Col>
                      <Col span="12">
                        <FieldStyled name="content.choice" />
                      </Col>
                      <Col span="6"></Col>
                    </RowStyled>
                    <RowStyled>
                      <Col span="6"></Col>
                      <Col span="12"></Col>
                      <ColSubmit span="6">
                        <button type="submit">Submit</button>
                      </ColSubmit>
                    </RowStyled>
                  </Form>
                )}
              </Formik>
            </div>
          </WhiteArea>
        </RowArea>
      </Container>
    </Background>
  );
};

export default AddArticle;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  padding-top: 3%;
  align-items: center;
`;

const Background = styled.div`
  background: linear-gradient(
    180deg,
    rgba(230, 139, 236, 1) 0%,
    rgba(138, 99, 229, 1) 100%
  );
  min-height: 100vh;
`;

const WhiteArea = styled.div`
  width: 1100px;
  background: #fff;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 40px;
  min-height: 500px;
  margin-top: 22px;
  /* display: flex; */
  border-radius: 4px;
`;

const RowArea = styled(Row)`
  /* display: flex; */
  justify-content: center;
`;

const TopicAdd = styled.span`
  font-size: 24px;
  font-weight: bold;
  align-self: center;
`;

const AreaTopic = styled.div`
  display: flex;
  justify-content: center;
`;

const TextForm = styled.span`
  font-weight: bold;
  font-size: 14px;
  margin-left: 30%;
`;

const RowStyled = styled(Row)`
  margin-bottom: 2%;
`;

const FieldStyled = styled(Field)`
  width: 500px;
`;
const FieldContent = styled(FieldStyled)`
  height: 150px;
`;

const ColSubmit = styled(Col)`
  display: flex;
  justify-content: center;
`;
