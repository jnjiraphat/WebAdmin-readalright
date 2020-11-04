import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row, Col } from "antd";
import axios from "axios";


const initialValues = {
  vocabBox: [{ title: "", image: "", category_id: "", image: "image test" }],
  friends: [
    {
      engWord: "",
      thaiWord: "",
    },
  ],
};

const InviteFriends = () => {

  const [vocabBoxIdD, setvocabBoxIdD] = useState("");

  async function postVocabBox(
    boxEngName,
    boxThaiName,
    category_id,
    image, friends
  ) {
    const response = await axios.post("http://localhost:3000/vocabBox", {
      boxEngName: boxEngName,
      boxThaiName: boxThaiName,
      category_id: category_id,
      image: image
    });
    console.log("reading", response.data);
    var vocabBoxId = response.data.quiz;
    console.log("this is vocabBox")
    console.log(vocabBoxId);
    setvocabBoxIdD(vocabBoxId)
    await postVocabCard(response.data.quiz, friends)
  }

  // console.log("this is vocabBox 2")
  // console.log(vocabBoxIdD)

  async function postVocabCard(
    vocabBox_id, friends
  ) {
    console.log("eiei");

    console.log(friends);
    for (let index = 0; index < friends.length; index++) {
      const response = await axios.post("http://localhost:3000/vocabCard", {
        engWord: friends[index]['engWord'],
        thaiWord: friends[index]['thaiWord'],
        vocabBox_id: vocabBox_id
      });
    }
  }

  return (
    <div>
      <h1>Invite friends</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          postVocabBox(
            values.content.title,
            values.content.title_meaning,
            values.content.category_id,
            "image test", values.friends
          );
          console.log(values.friends)

          console.log(values.friends.length)
          // for (let index = 0; index < values.friends.length; index++) {
          //   postVocabCard(
          //     values.friends[index].engWord,
          //     values.friends[index].thaiWord       
          //   )

          // }         
        }}
      >
        {({ values }) => (
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
                <span>Title Meaning</span>
              </Col>
              <Col span="16">
                <Field name="content.title_meaning" />
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <span>Category</span>
              </Col>
              <Col span="16">
                <Field as="select" name="content.category_id">
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
                </Field>
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
                    values.setFieldValue("photo1", event.currentTarget.files[0]);
                  }}
                />
              </Col>
            </Row>
            <FieldArray name="friends">
              {({ insert, remove, push }) => (
                <div>
                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`friends.${index}.engWord`}>Vocabulary</label>
                          <Field
                            name={`friends.${index}.engWord`}
                            // placeholder="Jane Doe"
                            type="text"
                          />
                          <ErrorMessage
                            name={`friends.${index}.engWord`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`friends.${index}.thaiWord`}>Meaning</label>
                          <Field
                            name={`friends.${index}.thaiWord`}
                            // placeholder="jane@acme.com"
                            type="text"
                          />
                          <ErrorMessage
                            name={`friends.${index}.thaiWord`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                        </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ engWord: "", thaiWord: "" })}
                  >
                    Add Friend
                </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Invite</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InviteFriends;
