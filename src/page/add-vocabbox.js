import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Row, Col } from "antd";

const initialValues = {
  vocabBox: [{ title: "", image: "", category_id: "" }],
  friends: [
    {
      name: "",
      email: "",
    },
  ],
};

const InviteFriends = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
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
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
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
                  onClick={() => push({ name: "", email: "" })}
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
);

export default InviteFriends;
