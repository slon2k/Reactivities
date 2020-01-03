import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import { TextInput } from "../form";

const LoginForm = () => {
  return (
    <FinalForm
      onSubmit={form => console.log(form)}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} type="Email" placeholder="Email" />
          <Field name="password" component={TextInput} type="password" placeholder="Password" />
          <Button positive content="Login"/>
        </Form>
      )}
    />
  );
};

export default LoginForm;
