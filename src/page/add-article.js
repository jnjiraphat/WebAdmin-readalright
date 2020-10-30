import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Route, Link } from "react-router-dom";
import { Row, Col } from "antd";

const AddArticle = () => {
  return (
    <div>
      <h1>Article</h1>
      <div>
        <h1>Social Profiles</h1>
        <Formik
          initialValues={{
            content: {
              title: "",
              cate: "",
              contentArea: "",
              question1: "",
              answer1: "",
              question2: "",
              answer2: "",
              question3: "",
              answer3: "",
            },
          }}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
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
                  <span>cate:</span>
                </Col>
                <Col span="16">
                  <Field name="content.cate" />
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
                  <span>contentArea:</span>
                </Col>
                <Col span="16">
                  <Field name="content.contentArea" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>question1:</span>
                </Col>
                <Col span="16">
                  <Field name="content.question1" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>answer1:</span>
                </Col>
                <Col span="16">
                  <Field name="content.answer1" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>question2:</span>
                </Col>
                <Col span="16">
                  <Field name="content.question2" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>answer2:</span>
                </Col>
                <Col span="16">
                  <Field name="content.answer2" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>question3:</span>
                </Col>
                <Col span="16">
                  <Field name="content.question3" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>answer3:</span>
                </Col>
                <Col span="16">
                  <Field name="content.answer3" />
                </Col>
              </Row>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddArticle;
