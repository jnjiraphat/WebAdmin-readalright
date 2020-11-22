import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form, FieldArray } from "formik";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";
import { Button } from "antd";
import { BrowserRouter as Router, useRouteMatch } from "react-router-dom";

// const readingId = "";
const AddPostTest = () => {
  // const match = useRouteMatch('/add-postTest/:readingId2');
  // console.log("reading id in add post test")
  // console.log(match.params.readingId2)

  var email = window.localStorage.getItem("email");

  console.log(email);

  const [readingId, setReadingIdD] = useState("");

  const [questionBox, setQuestionBox] = useState([]);

  const match = useRouteMatch("/add-postTest/:readingId2");
  console.log("reading id in add post test");
  console.log(match.params.readingId2);

  async function putPostTest(content) {
    console.log("content in put post tes");
    // console.log(dataArrayQuizChallenge)
    console.log(content);
    console.log(content[0].questionText);
    console.log(content[1].questionText);
    console.log(content[2].questionText);
    // console.log(dataArrayQuizChallenge[0][0].question_id)
    for (let index = 0; index < 3; index++) {
      // const response = await axios.put("http://localhost:3000/admin/updateQuiz/" + dataArrayQuizChallenge[0][index].question_id, {
      //   question: content[index].questionText,
      //   typeOfSuggestion_id: 1,
      //   reading_id: match.params.reading_id,
      //   typeOfQuestion: "chal"
      // });
      // console.log("quiz", response.data);
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
        "http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/admin/updateChoice/" +
        content[0].options[index].choice_id,
        {
          isRightChoice: content[0].options[index].isRightChoice,
          choice: content[0].options[index].optionText,
          question_id: content[0].options[index].question_id,
          optionText: content[0].options[index].optionText,
          value: content[0].options[index].optionText,
        }
      );
    }

    for (let index = 0; index < content[1].options.length; index++) {
      const response = await axios.put(
        "http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/admin/updateChoice/" +
        content[1].options[index].choice_id,
        {
          isRightChoice: content[1].options[index].isRightChoice,
          choice: content[1].options[index].optionText,
          question_id: content[1].options[index].question_id,
          optionText: content[1].options[index].optionText,
          value: content[1].options[index].optionText,
        }
      );
    }

    for (let index = 0; index < content[2].options.length; index++) {
      const response = await axios.put(
        "http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/admin/updateChoice/" +
        content[2].options[index].choice_id,
        {
          isRightChoice: content[2].options[index].isRightChoice,
          choice: content[2].options[index].optionText,
          question_id: content[2].options[index].question_id,
          optionText: content[2].options[index].optionText,
          value: content[2].options[index].optionText,
        }
      );
    }
  }

  // const [arrayQuiz, setarrayQuiz] = ([])

  async function postQuiz(content) {
    var quizIdArray = [];
    try {
      for (let index = 0; index < 3; index++) {
        const response = await axios.post("http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/quizs",
          {
            question: content[index].questionText,
            typeOfSuggestion_id: content[index].typeOfSuggestionID,
            reading_id: match.params.readingId2,
            typeOfQuestion: "chal",
          }
        );
        console.log("quiz", response.data);
        console.log("quiz", response.data);
        console.log("quizId", response.data.quiz);
        // setarrayQuiz(response.data.quiz);
        quizIdArray.push(response.data.quiz);
        console.log("array")
        console.log(quizIdArray)
      }
    } catch (error) {
    } finally{
      postChoice(quizIdArray,content);
    }
   

    // const response = await axios.post("http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/quizs", {
    //   question: question,
    //   typeOfSuggestion_id: typeOfSuggestion_id,
    //   reading_id: match.params.readingId2,
    // });
    // console.log("quiz", response.data);
    // console.log("quizId", response.data.quiz);
    // await postChoice(isRightChoice, choice, response.data.quiz);
  }
  async function postChoice(quizID,content) {
    console.log("content in postchoice")
    console.log(content)
    console.log("array quiz in post choice")
    console.log(quizID[0])
    console.log(quizID[1])
    console.log(quizID[2])
    for (let index = 0; index < content[0].options.length; index++) {
    const response = await axios.post(
      "http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/QChoice",
      {
        isRightChoice: content[0].options[index].isRightChoice,
        choice: content[0].options[index].optionText,
        question_id: quizID[0],
        optionText: content[0].options[index].optionText,
        value: content[0].options[index].optionText,
      }
    );
  }

  for (let index = 0; index < content[1].options.length; index++) {
    const response = await axios.post(
      "http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/QChoice" ,
      {
        isRightChoice: content[1].options[index].isRightChoice,
        choice: content[1].options[index].optionText,
        question_id: quizID[1],
        optionText: content[1].options[index].optionText,
        value: content[1].options[index].optionText,
      }
    );
  }

  for (let index = 0; index < content[2].options.length; index++) {
    const response = await axios.post(
      "http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/QChoice",
      {
        isRightChoice: content[2].options[index].isRightChoice,
        choice: content[2].options[index].optionText,
        question_id: quizID[2],
        optionText: content[2].options[index].optionText,
        value: content[2].options[index].optionText,
      }
    );
  }
  }



  const options = [
    {
      optionText: "",
      isRightChoice: "",
    },
    {
      optionText: "",
      isRightChoice: "",
    },
    {
      optionText: "",
      isRightChoice: "",
    },
    {
      optionText: "",
      isRightChoice: "",
    },
  ];

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
              <TopicAdd>Add PostTest</TopicAdd>
            </AreaTopic>
            <RowArea>
              <WhiteArea>
                <div>
                  <Formik
                    initialValues={{
                      content: [
                        {
                          questionText: "",
                          typeOfSuggestionID: "",
                          options: options,
                        },
                        {
                          questionText: "",
                          typeOfSuggestionID: "",
                          options: options,
                        },
                        {
                          questionText: "",
                          typeOfSuggestionID: "",
                          options: options,
                        },
                      ],
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                      // postQuiz(
                      //   values.content.question,
                      //   values.content.typeOfSuggestion_id,
                      //   values.content.isRightChoice,
                      //   values.content.choice
                      // );
                      console.log("value");
                      console.log(values.content[0].questionText);
                      // putPostTest(values.content);

                      console.log(values.content[0].options.length);
                      console.log("Q1");
                      var countQ1 = 0;
                      for (
                        let index = 0;
                        index < values.content[0].options.length;
                        index++
                      ) {
                        console.log(values.content[0].options[index].isRightChoice);
                        if (values.content[0].options[index].isRightChoice == "1") {
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
                        console.log(values.content[1].options[index].isRightChoice);
                        if (values.content[1].options[index].isRightChoice == "1") {
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
                        console.log(values.content[2].options[index].isRightChoice);
                        if (values.content[2].options[index].isRightChoice == "1") {
                          countQ3++;
                          console.log("count in if");
                          console.log(countQ3);
                        }
                      }
                      console.log("countQ3");
                      console.log(countQ3);
                      if (
                        countQ1 == 1 &&
                        countQ2 == 1 &&
                        countQ3 == 1 &&
                        values.content[0].typeOfSuggestionID &&
                        values.content[1].typeOfSuggestionID &&
                        values.content[2].typeOfSuggestionID
                      ) {
                        console.log("Post in this condition");
                        console.log(values.content)
                        postQuiz(values.content)
                        // putPostTest(values.content);
                        // putPostTestAnswer(values.content);
                        alert("Add Successful");
                      } else {
                        console.log("not success");
                        alert("Form is not Complete");
                      }
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
                                      {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                                        </Col>
                                      </RowStyled>
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
                                        <Col span="8">
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

                                    </Col>
                                      </RowStyled>
                                      <RowStyled>
                                        <Col span="8">
                                          <TextForm>Type of Suggestion</TextForm>
                                        </Col>
                                        <Col span="14">
                                          <Field
                                            as="select"
                                            name={`content.${index}.typeOfSuggestionID`}
                                          >
                                            <option value="0">Select</option>
                                            <option value="1">Verb</option>
                                            <option value="2">Noun</option>
                                            <option value="3">Adverb</option>
                                          </Field>
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
                            <button style={{ marginLeft: "10px" }}>Back to Console</button>
                          </Link>
                        </AreaSubmit>
                      </Form>
                    )}
                  </Formik>
                </div>
              </WhiteArea>
            </RowArea>
          </Container>
        )}
    </Background>
  );
};

export default AddPostTest;

const Line = styled.div`
  width: 500px;
  height: 1px;
  background-color: #000;
`;

const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  width: 250px;
`;

const FieldTextArea = styled(Field)`
  width: 500px;
  height: 100px;
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
`;
