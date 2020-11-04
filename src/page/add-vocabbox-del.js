import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { Route, Link } from "react-router-dom";
import { Row, Col } from "antd";
import axios from "axios";

const AddVocabBox = () => {
  const [vocabForm, setVocabForm] = useState({
    data: [
      {
        vocabulary: "",
        meaning: "",
      },
    ],
  });
  const addVocabForm = () => {
    let newVocabForm = { ...vocabForm };
    console.log('...', newVocabForm);
    newVocabForm.data.push({
      vocabulary: "",
      meaning: "",
    });
    setVocabForm(newVocabForm)
  }


  async function postVocabCard(
    engWord,
    thaiWord,
  ) {
    const response = await axios.post("http://localhost:3000/vocabCard", {
      engWord: engWord,
      thaiWord: thaiWord,
      // vocabBox_id: category_id
    });
    console.log("reading", response.data);
  }
  return (
    <div>
      <div>
        <h1>Vocabulary</h1>
        <Formik
          initialValues={{
            content: {
              title: "",
              image: "",
              // category_id: "",
            },
            vocabForm,
          }}
          onSubmit={(values) => {
            console.log(values)
            // postVocab(
            //   values.content.title,
            //   values.content.category_id,
            //   "image test",
            //   values.item.vocabulary,
            //   values.item.meaning,
            // );

          }}
        >
          {(formProps) => (
            <Form>
              <Row>
                <Col span="8">
                  <span>Title</span>
                </Col>
                <Col span="16">
                  <Field name="content.title" />
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>Category</span>
                </Col>
                <Col span="16">
                  {/* <Field as="select" name="content.category_id">
                    <option value="9">Action</option>
                    <option value="10">Sport</option>
                    <option value="11">Conjunction</option>
                    <option value="12">Preposition</option>
                    <option value="13">Food</option>
                    <option value="14">Feeling</option>
                    <option value="15">House</option>
                    <option value="16">Natural</option>
                    <option value="17">Animal</option>
                    <option value="18">Symptoms&illness</option>
                  </Field> */}
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <span>Vocab Box Picture</span>
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
              {vocabForm.data.map((item, i) => {
                return (
                  <>
                    <Row>
                      <Col span="8">
                        <span>Vocabulary</span>
                      </Col>
                      <Col span="16">
                        <Field id={`item[${i}].vocabulary`} name={`item[${i}].vocabulary`} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span="8">
                        <span>Meaning</span>
                      </Col>
                      <Col span="16">
                        <Field id={`item[${i}].meaning`} name={`item[${i}].meaning`} />
                      </Col>
                    </Row>
                  </>
                );
              })}
              <button type="submit">Submit</button>
              <button onClick={() => addVocabForm()}>Add Words</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddVocabBox;
