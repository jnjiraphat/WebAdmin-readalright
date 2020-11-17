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
const EditPostTest = () => {

  const [oldQuestion, setOldQuestion] = useState("");
  const [oldtypeOfSuggestionId, setOldtypeOfSuggestionId] = useState("");
  const [oldIsRightChoice, setOldIsRightChoice] = useState("");
  const [oldChoice, setOldChoice] = useState("");


  const [dataArrayQuizChallenge, setdataArrayQuizChallenge] = useState([]);
  const match = useRouteMatch(`/edit-postTest/:reading_id`);
  console.log("reading id in edit post test")
  console.log(match.params.reading_id)

  const [quiz,setQuiz] = useState([]);

  const fetchAPI = async (dataArrayQuizChallenge) => {
    console.log("fetch api")
    console.log(dataArrayQuizChallenge)
    console.log("data array length")
    // const data = [];
    // const newdata = [];
    // data.map(item=>{
    //   newdata.push({id :item.id, name : item.name})
    // })
    // console.log(dataArrayQuizChallenge[0].length)
    var dataArrayQuiz = [];
    for (let index = 0; index < dataArrayQuizChallenge[0].length; index++) {
      await axios
        .get(
          "http://localhost:3000/quiz/" + dataArrayQuizChallenge[0][index].question_id)
        .then(
          (response) => {
            console.log(response.data);
            dataArrayQuiz.push(response.data);
            console.log("typeOfSuggestion_id")
            console.log(response.data.quiz[0].typeOfSuggestion_id);
            console.log(dataArrayQuiz.length);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    setQuiz(dataArrayQuiz);
    // getQuiz(quiz)
  };

  const getQuiz = (quiz) => {
    let data = [];
    quiz.map(item => {
      data.push({
        
        
      })
    })
  }

  console.log("quiz in edit post")
  console.log(quiz)

  const fetchApiChallenge = async () => {
    var temp = [];

    if (match.params.reading_id != null) {
      await axios
        .get("http://localhost:3000/quizInContent/" + match.params.reading_id)
        .then(
          (response) => {
            console.log("fetch api challenge")
            console.log(response.data.quiz);
            temp.push(response.data.quiz);
            console.log(temp.length);
          },
          (error) => {
            console.log(error);
          }
        );
        setdataArrayQuizChallenge(temp)
        console.log("data array quiz chal")
        console.log(dataArrayQuizChallenge)
        // for (let index = 1; index < temp.length; index++) {
          fetchAPI(temp)
          
        // }
        // fetchAPI(dataArrayQuizChallenge)
    } else {
    }
  };
  

  const [readingIdD, setReadingIdD] = useState("");

  useEffect(()  => {
    fetchApiChallenge();
    // fetchAPI();
  },[]);

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
          <TopicAdd>Edit PostTest</TopicAdd>
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
                    <Link to="/">
                      <ButtonStyled type="submit">Submit</ButtonStyled>
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

export default EditPostTest;

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