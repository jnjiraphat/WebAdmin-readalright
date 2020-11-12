import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import { Button } from "antd";
import {
  BrowserRouter as Router,
  useRouteMatch,
} from 'react-router-dom';

// const readingId = "";
const AddPostTest = () => {
  // const match = useRouteMatch('/add-postTest/:readingId2');
  // console.log("reading id in add post test")
  // console.log(match.params.readingId2)
  
  const [readingId, setReadingIdD] = useState("");

  const [questionBox, setQuestionBox] = useState([])

  const match = useRouteMatch('/edit-postTest/:readingId2');
  console.log("reading id in add post test")
  console.log(match.params.readingId2)


  //ตรงนี้เลยมุกตรงนี้ๆๆๆๆ ขอแค่ URL ที่ get มา เดี๋ยวเราไปต่อเองๆๆๆ
  // async function editPostTest() {
  //   console.log("vocab box ID in editVocabBox")
  //   console.log(match.params.vocabBox_id)
  //   const result = await axios.get("http://localhost:3000/vocabBox/id/" + match.params.vocabBox_id);
  //   console.log("result")
  //   console.log(result.data.reading[0])
  //   console.log(result.data.reading.length)
  //   for (let index = 0; index < result.data.reading.length; index++) {
  //     vocabId.push(result.data.reading[index].vocabCard_id)
  //     console.log(vocabId[index])
  //   }
  //   setTitle(result.data.reading[0].boxEngName)
  //   setTitleMeaning(result.data.reading[0].boxThaiName)
  //   setCategoryId(result.data.reading[0].category_id)
  //   setImage(result.data.reading[0].image)
  //   setVocabCardID(result.data.reading[0].vocabCard_id)
  // }


  async function postQuiz(
    question,
    typeOfSuggestion_id,
    isRightChoice,
    choice
  ) {
    const response = await axios.post("http://localhost:3000/quizs", {
      question: question,
      typeOfSuggestion_id: typeOfSuggestion_id,
      reading_id: readingId,
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


  // useEffect(() => {
  //   editPostTest();
  //   getPostTest();
  //   // fetch();
  // });


  return (
    <Background>
      <Container>
        <AreaTopic>
          <TopicAdd>Add PostTest</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              <h1>Post Test</h1>
              <Formik
                initialValues={{
                  content: [
                    {
                      question: "",
                      typeOfSuggestion_id: "1",
                      isRightChoice: "1",
                      choice: "",
                    },
                  ],
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
                {({ values }) => (
                  <Form>
                    <FieldArray name="content">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.content.length > 0 &&
                            values.content.map((content, index) => (
                              <Col key={index}>
                                <h4>Question no.{index+1}</h4>
                                <div>
                                <RowStyled>
                                  <Col span="8">
                                    <TextForm>question:</TextForm>
                                  </Col>
                                  <Col span="14">
                                    <FieldContent
                                      name={`content.${index}.question`}
                                      component="textarea"
                                    />
                                  </Col>
                                </RowStyled>
                                <RowStyled>
                                  <Col span="8">
                                    <TextForm>typeOfSuggestion:</TextForm>
                                  </Col>
                                  <Col span="14">
                                    <FieldStyled
                                      as="select"
                                      name={`content.${index}.typeOfSuggestion_id`}
                                    >
                                      <option value="1">Verb</option>
                                      <option value="2">Noun</option>
                                    </FieldStyled>
                                  </Col>
                                </RowStyled>
                                <RowStyled>
                                  <Col span="8">
                                    <TextForm>isRightChoice:</TextForm>
                                  </Col>
                                  <Col span="14">
                                    <Field
                                      type="radio"
                                      name={`content.${index}.isRightChoice`}
                                      value="1"
                                    />{" "}
                                    True
                                    <FieldRadio
                                      type="radio"
                                      name={`content.${index}.isRightChoice`}
                                      value="0"
                                    />{" "}
                                    False
                                    {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                  </Col>
                                </RowStyled>
                                {/* <RowStyled>
                                  <Col span="8">
                                    <TextForm>choice:</TextForm>
                                  </Col>
                                  <Col span="12">
                                    <FieldStyled
                                      name={`content.${index}.choice`}
                                    />
                                  </Col>
                                </RowStyled> */}
                                {/* <Col span="6">
                                  
                                  <TextFormLebel htmlFor={`content.${index}.question`}>
                                    question-{index+1}
                                  </TextFormLebel>
                                  </Col>
                                <Col Span="5">
                                  <FieldStyledMini
                                    name={`content.${index}.question`}
                                    // placeholder="Jane Doe"
                                    type="text"
                                  />
                                  
                                  <ErrorMessage
                                    name={`content.${index}.question`}
                                    component="div"
                                    className="field-error"
                                  />
                                </Col> */}
                                {/* <RowStyled>
                                <Col span="8">
                                    
                                  </Col>
                                  
                                <ColSubmit span="12"> */}
                                  <AreaMoreWord>
                                  <ButtonStyled
                                    type="primary"
                                    className="secondary"
                                    onClick={() => remove(index)}
                                    danger
                                  >
                                    Remove Question
                                  </ButtonStyled>
                                  </AreaMoreWord>
                                {/* </ColSubmit>
                                </RowStyled> */}
                                </div>
                              </Col>
                            ))}
                          <AreaSubmit>
                            <ButtonStyled
                              type="primary"
                              className="secondary"
                              onClick={() =>
                                push({
                                  question: "",
                                  typeOfSuggestion_id: "",
                                  isRightChoice: "",
                                  choice: "",
                                })
                              }
                            >
                              More Questions
                            </ButtonStyled>
                          </AreaSubmit>
                        </div>
                      )}
                    </FieldArray>

                    <AreaSubmit>
                      <ButtonStyled type="submit">Save</ButtonStyled>
                    <Link to="/">
                      <button>
                        Go to Admin Board
                      </button>
                    </Link>
                    </AreaSubmit>
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

export default AddPostTest;

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
const TextFormLebel = styled.label`
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
const FieldStyledMini = styled(Field)`
  width: 200px;
`;
const FieldContent = styled(FieldStyled)`
  height: 150px;
`;

const ColSubmit = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  height: 27.6px;
`;
const AreaSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2%;
  margin-right: 10%;
`;
const AreaMoreWord = styled(AreaSubmit)`
  margin-top: 5%;
`;

const FormStyled = styled(Form)`
  margin-top: 22px;
`;

const FieldRadio = styled(Field)`
  margin-left: 2%;
`