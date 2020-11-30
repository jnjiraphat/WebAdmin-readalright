import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field, Form, FieldArray } from "formik";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import {
  useRouteMatch,
} from 'react-router-dom';
import { Spin } from "antd";

// const readingId = "";
const EditPostTest = () => {
  var email = window.localStorage.getItem("email");

  console.log(email);
  const [dataArrayQuizChallenge, setdataArrayQuizChallenge] = useState([]);
  const match = useRouteMatch(`/edit-postTest/:reading_id`);
  // console.log("reading id in edit post test");
  // console.log(match.params.reading_id);

  
  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);


  async function putPostTest(content) {
    console.log("content in put post tes");
    console.log(dataArrayQuizChallenge);
    console.log(content);
    console.log(content[0].typeOfSuggestionID);
    console.log(content[1].typeOfSuggestionID);
    console.log(content[2].typeOfSuggestionID);
    console.log(dataArrayQuizChallenge[0][0].question_id);
    for (let index = 0; index < 3; index++) {
      const response = await axios.put(
        "https://readalright-backend.khanysorn.me/admin/updateQuiz/" +
          dataArrayQuizChallenge[0][index].question_id,
        {
          question: content[index].questionText,
          typeOfSuggestion_id: content[index].typeOfSuggestionID,
          reading_id: match.params.reading_id,
          typeOfQuestion: "chal",
        }
      );
      console.log("quiz", response.data);
    }
  }

  async function putPostTestAnswer(content) {
    console.log("choice in put post test lenghtttt");
    console.log(content[0].options.length);
    console.log("choice in put post test");
    console.log(content[0].options[0].choice_id);

    console.log(content[0].options[0].choice_id);
    console.log(content[0].options[0].choice);
    console.log(content[0].options[0].isRightChoice);
    console.log(content[0].options[0].optionText);
    console.log(content[0].options[1].choice_id);
    console.log(content[0].options[1].choice);
    console.log(content[0].options[2].choice_id);
    console.log(content[0].options[2].choice);
    console.log(content[0].options[3].choice_id);
    console.log(content[0].options[3].choice);
    console.log(content[0].options[3].isRightChoice);
    // console.log(content[0].options[4].choice_id)
    // console.log(content[0].options[4].choice)
    console.log(content[1].options[0].choice_id);
    console.log(content[1].options[0].choice);

    console.log(content[1].options[1].choice_id);
    console.log(content[1].options[1].choice);
    console.log(content[1].options[2].choice_id);
    console.log(content[1].options[2].choice);
    console.log(content[1].options[3].choice_id);
    console.log(content[1].options[3].choice);

    for (let index = 0; index < content[0].options.length; index++) {
      const response = await axios.put(
        "https://readalright-backend.khanysorn.me/admin/updateChoice/" +
          content[0].options[index].choice_id,
        {
          isRightChoice: content[0].options[index].isRightChoice,
          choice: content[0].options[index].optionText,
          question_id: content[0].options[index].question_id,
          optionText: content[0].options[index].optionText,
          value: content[0].options[index].optionText,
        }
      );
        console.log(response)
    }

    for (let index = 0; index < content[1].options.length; index++) {
      const response = await axios.put(
        "https://readalright-backend.khanysorn.me/admin/updateChoice/" +
          content[1].options[index].choice_id,
        {
          isRightChoice: content[1].options[index].isRightChoice,
          choice: content[1].options[index].optionText,
          question_id: content[1].options[index].question_id,
          optionText: content[1].options[index].optionText,
          value: content[1].options[index].optionText,
        }
      );
      console.log(response)
    }

    for (let index = 0; index < content[2].options.length; index++) {
      const response = await axios.put(
        "https://readalright-backend.khanysorn.me/admin/updateChoice/" +
          content[2].options[index].choice_id,
        {
          isRightChoice: content[2].options[index].isRightChoice,
          choice: content[2].options[index].optionText,
          question_id: content[2].options[index].question_id,
          optionText: content[2].options[index].optionText,
          value: content[2].options[index].optionText,
        }
      );
      console.log(response)
    }
  }

  const fetchAPI = async (dataArrayQuizChallenge) => {
    var dataArrayQuiz = [];
    for (let index = 0; index < dataArrayQuizChallenge[0].length; index++) {
      await axios
        .get(
          "https://readalright-backend.khanysorn.me/quiz/" +
            dataArrayQuizChallenge[0][index].question_id
        )
        .then(
          (response) => {
            console.log(response.data);
            dataArrayQuiz.push(response.data);
            console.log("typeOfSuggestion_id");
            // console.log(response.data.quiz[0].typeOfSuggestion_id);
            console.log(dataArrayQuiz.length);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    setQuizData(dataArrayQuiz);
    console.log("quizData");
    console.log(quizData);
    getQuiz(quizData);
    console.log("Quiz");
    console.log(quiz);
  };

  const getQuiz = (quizData) => {
    let data = [];
    quizData.map((item) => {
      data.push({
        questionText: item.questionText,
        typeOfSuggestionID: item.typeOfSuggestionID,
        options: item.options,
      });
    });
    console.log("SetQuiz");
    console.log(data);
    setQuiz(data);
  };

  const fetchApiChallenge = async () => {
    var temp = [];

    if (match.params.reading_id != null) {
      await axios
        .get("https://readalright-backend.khanysorn.me/quizInContent/" + match.params.reading_id)
        .then(
          (response) => {
            console.log("fetch api challenge");
            console.log(response.data.quiz);
            temp.push(response.data.quiz);
            console.log(temp.length);
          },
          (error) => {
            console.log(error);
          }
        );
      setdataArrayQuizChallenge(temp);
      console.log("data array quiz chal");
      console.log(dataArrayQuizChallenge);
      fetchAPI(temp);
    } else {
    }
  };

  useEffect(() => {
    fetchApiChallenge();
    // eslint-disable-next-line
  }, []);

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
        <AreaTopic>
          <TopicAdd>Edit PostTest</TopicAdd>
        </AreaTopic>
        <RowArea>
          <WhiteArea>
            <div>
              {quizData.length > 0 ? (
                <Formik
                  initialValues={{
                    content: [...quizData],
                    // correctChoice: ""
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                    // console.log(values);
                    console.log("value");
                    console.log(values.content[0]);
                    console.log(values.content[0].typeOfSuggestionID);
                    console.log("value choice");
                    console.log(values.content[0].options[0].choice_id);

                    console.log(values.content[0].options.length);
                    console.log("Q1");
                    var countQ1 = 0;
                    for (
                      let index = 0;
                      index < values.content[0].options.length;
                      index++
                    ) {
                      console.log(
                        values.content[0].options[index].isRightChoice
                      );
                      if (
                        values.content[0].options[index].isRightChoice === "1"
                      ) {
                        countQ1++;
                        console.log("count in if");
                        console.log(countQ1);
                      }
                    }
                    console.log("Q2");
                    var countQ2 = 0;
                    for (
                      let index = 0;
                      index < values.content[1].options.length;
                      index++
                    ) {
                      console.log(
                        values.content[1].options[index].isRightChoice
                      );
                      if (
                        values.content[1].options[index].isRightChoice === "1"
                      ) {
                        countQ2++;
                        console.log("count in if");
                        console.log(countQ2);
                      }
                    }
                    console.log("Q3");
                    var countQ3 = 0;
                    for (
                      let index = 0;
                      index < values.content[2].options.length;
                      index++
                    ) {
                      console.log(
                        values.content[2].options[index].isRightChoice
                      );
                      if (
                        values.content[2].options[index].isRightChoice === "1"
                      ) {
                        countQ3++;
                        console.log("count in if");
                        console.log(countQ3);
                      }
                    }
                    console.log("countQ3");
                    console.log(countQ3);
                    if (countQ1 === 1 && countQ2 === 1 && countQ3 === 1) {
                      console.log("Post in this condition");
                      putPostTest(values.content);
                      putPostTestAnswer(values.content);
                      alert(JSON.stringify("Edit Successful"));
                    } else {
                      console.log("not success");
                      alert(
                        JSON.stringify(
                          "Please edit Question correct choice just 1 choice"
                        )
                      );
                    }
                  }}
                >
                  {({ values }) => (
                    <Form>
                      <FieldArray name="content">
                        {({ insert, remove, push }) => (
                          <div>
                            {quizData.length > 0 &&
                              quizData.map((content, index) => (
                                <Col key={index}>
                                  <center>
                                    <h2>Question no.{index + 1}</h2>
                                  </center>
                                  <div>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Question</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldTextArea
                                          name={`content.${index}.questionText`}
                                          component="textarea"
                                        />
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice A</TextForm>
                                      </Col>
                                      <Col span="6">
                                        <FieldStyled
                                          name={`content.${index}.options.${0}.optionText`}
                                        />
                                      </Col>
                                      <Col span="10">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${0}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${0}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                      </Col>
                                    </RowStyled>

                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice B</TextForm>
                                      </Col>
                                      <Col span="6">
                                        <FieldStyled
                                          name={`content.${index}.options.${1}.optionText`}
                                        />
                                      </Col>
                                      <Col span="10">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${1}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${1}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                      </Col>
                                    </RowStyled>
                                    {/* <RowStyled>
                                      <Col span="8">
                                        <TextForm>isRightChoice:</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${1}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${1}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                      </Col>
                                    </RowStyled> */}
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice C</TextForm>
                                      </Col>
                                      <Col span="6">
                                        <FieldStyled
                                          name={`content.${index}.options.${2}.optionText`}
                                        />
                                      </Col>
                                      <Col span="10">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${2}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${2}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Choice D</TextForm>
                                      </Col>
                                      <Col span="6">
                                        <FieldStyled
                                          name={`content.${index}.options.${3}.optionText`}
                                        />
                                      </Col>
                                      <Col span="10">
                                        <Field
                                          type="radio"
                                          name={`content.${index}.options.${3}.isRightChoice`}
                                          value="1"
                                        />{" "}
                                        Correct
                                        <FieldRadio
                                          type="radio"
                                          name={`content.${index}.options.${3}.isRightChoice`}
                                          value="0"
                                        />{" "}
                                        Wrong
                                        {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                      </Col>
                                    </RowStyled>
                                    <RowStyled>
                                      <Col span="8">
                                        <TextForm>Type Of Suggestion</TextForm>
                                      </Col>
                                      <Col span="14">
                                        <FieldStyled
                                          as="select"
                                          name={`content.${index}.typeOfSuggestionID`}
                                          value={content.typeOfSuggestionID}
                                        > 
                                          <option value="1">Verb</option>
                                          <option value="2">Noun</option>
                                          <option value="3">Adverb</option>
                                        </FieldStyled>
                                      </Col>
                                    </RowStyled>
                                    <RowStyled
                                      style={{ justifyContent: "center" }}
                                    >
                                      <Line
                                        style={{
                                          marginTop: "15px",
                                          marginBottom: "50px",
                                        }}
                                      ></Line>
                                    </RowStyled>
                                  </div>
                                </Col>
                              ))}
                          </div>
                        )}
                      </FieldArray>
                      <AreaSubmit>
                        <button type="submit">Save</button>
                        <Link to="/console">
                          <button style={{marginLeft: "10px"}}>Back to Console</button>
                        </Link>
                      </AreaSubmit>
                    </Form>
                  )}
                </Formik>
              ) : (
                <center style={{ marginTop: "20vh" }}>
                  <Spin />
                </center>
              )}
            </div>
          </WhiteArea>
        </RowArea>
      </Container>
      )} 
    </Background>
  );
};

export default EditPostTest;

const Line = styled.div`
  width: 500px;
  height: 1px;
  background-color: #000;
`;

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

const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

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
  width: 250px;
`;

const FieldTextArea = styled(Field)`
  width: 500px;
  height: 100px;
`;

 
const AreaSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2%;
  margin-right: 10%;
`;

const FieldRadio = styled(Field)`
  margin-left: 2%;
`;
