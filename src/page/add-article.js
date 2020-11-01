import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Route, Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";

const AddArticle = () => {
  const [person, setPerson] = useState([]);

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
  }
  async function postQuiz(
    question,
    typeOfSuggestion_id,
    reading_id,
    typeOfQuestion,
    level
  ) {
    const response = await axios.post("http://localhost:3000/quizs", {
      question: question,
      typeOfSuggestion_id: typeOfSuggestion_id,
      reading_id: reading_id,
      typeOfQuestion: typeOfQuestion,
      level: level,
    });
    console.log("quiz", response.data);
  }
  async function postChoice(
    isRightChoice,
    choice,
    optionText,
    value,
    question_pretest_id,
    question_id
  ) {
    const response = await axios.post("http://localhost:3000/choice", {
      isRightChoice: isRightChoice,
      choice: choice,
      optionText: optionText,
      value: value,
      question_pretest_id: question_pretest_id,
      question_id: question_id,
    });
    console.log("choice", response.data);
  }

  return (
    <div>
      <h1>Article</h1>
      <div>
        <h1>Article</h1>
        <Formik
          initialValues={{
            content: {
              title: "",
              content: "",
              image: "",
              category_id: "",
              level_reading: "",
            },
          }}
          onSubmit={(values) => {
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
              <Row>
                <Col span="8">
                  <span>Title:</span>
                </Col>
                <Col span="16">
                  <Field name="content.title" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>content:</span>
                </Col>
                <Col span="16">
                  <Field name="content.content" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>photo:</span>
                </Col>
                <Col span="16">
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
              </Row>
              <Row>
                <Col span="8">
                  <span>category_id:</span>
                </Col>
                <Col span="16">
                  <Field as="select" name="content.category_id">
                    <option value="1">Song</option>
                    <option value="2">Movie</option>
                    <option value="3">Sport</option>
                    <option value="4">Entertainment</option>
                    <option value="5">Health</option>
                    <option value="6">Information Technology</option>
                    <option value="7">Travel</option>
                    <option value="8">Story</option>
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>level_reading:</span>
                </Col>
                <Col span="16">
                  <Field as="select" name="content.level_reading">
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                  </Field>
                </Col>
              </Row>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>

      <div>
        <h1>Post Test</h1>
        <h4>Question no.1</h4>
        <Formik
          initialValues={{
            content: {
              question: "",
              typeOfSuggestion_id: 1,
              reading_id: 1,
              typeOfQuestion: "",
              level: "",
              isRightChoice: "0",
              choice: "",
              optionText: "",
              value: "",
              question_pretest_id: 1,
              question_id: 1,
            },
          }}
          onSubmit={(values) => {
            postQuiz(
              values.content.question,
              values.content.typeOfSuggestion_id,
              values.content.reading_id,
              values.content.typeOfQuestion,
              values.content.level
            );
            postChoice(
              values.content.isRightChoice,
              values.content.choice,
              values.content.optionText,
              values.content.value,
              values.content.question_pretest_id,
              values.content.question_id
            );
          }}
        >
          {(formProps) => (
            <Form>
              <Row>
                <Col span="8">
                  <span>question:</span>
                </Col>
                <Col span="16">
                  <Field name="content.question" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>typeOfSuggestion_id:</span>
                </Col>
                <Col span="16">
                  <Field as="select" name="content.typeOfSuggestion_id">
                    <option value="1">Verb</option>
                    <option value="2">Noun</option>
                  </Field>
                </Col>
              </Row>
              {/* <Row>
                <Col span="8">
                  <span>reading_id:</span>
                </Col>
                <Col span="16">
                  <Field name="content.reading_id" />
                </Col>
              </Row> */}
              {/* <Row>
                <Col span="8">
                  <span>typeOfQuestion:</span>
                </Col>
                <Col span="16">
                  <Field name="content.typeOfQuestion" />
                </Col>
              </Row> */}
              {/* <Row>
                <Col span="8">
                  <span>level:</span>
                </Col>
                <Col span="16">
                  <Field name="content.level" />
                </Col>
              </Row> */}
              <Row>
                <Col span="8">
                  <span>isRightChoice:</span>
                </Col>
                <Col span="16">
                  <Field type="radio" name="content.isRightChoice" value="1T" /> True
                  <Field type="radio" name="content.isRightChoice" value="1F" /> False
                  {/* ทำฟังก์ชั่น fi ถ้า 1T ให้เพิ่มข้อมูลว่า 1T 0F */}
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>choice:</span>
                </Col>
                <Col span="16">
                  <Field name="content.choice" />
                </Col>
              </Row>
              {/* <Row>
                <Col span="8">
                  <span>optionText:</span>
                </Col>
                <Col span="16">
                  <Field name="content.optionText" />
                </Col>
              </Row>{" "} */}
              {/* <Row>
                <Col span="8">
                  <span>value:</span>
                </Col>
                <Col span="16">
                  <Field name="content.value" />
                </Col>
              </Row> */}
              {/* <Row>
                <Col span="8">
                  <span>question_pretest_id:</span>
                </Col>
                <Col span="16">
                  <Field name="content.question_pretest_id" />
                </Col>
              </Row> */}
              {/* <Row>
                <Col span="8">
                  <span>question_id:</span>
                </Col>
                <Col span="16">
                  <Field name="content.question_id" />
                </Col>
              </Row> */}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddArticle;
