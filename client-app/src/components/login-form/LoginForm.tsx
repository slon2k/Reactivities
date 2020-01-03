import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Label } from "semantic-ui-react";
import { TextInput } from "../form";
import { StoreContext } from "../../store";
import { IUserForm } from "../../models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("Email"),
  password: isRequired("Password")
})

const LoginForm = () => {
  const Store = useContext(StoreContext);
  const { login } = Store.userStore;
  return (
    <FinalForm
      onSubmit={(credentials: IUserForm) => login(credentials).catch(error => ({
        [FORM_ERROR]: error
      }))}
      validate={validate}
      render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field name="email" component={TextInput} type="email" placeholder="Email" />
          <Field name="password" component={TextInput} type="password" placeholder="Password" />
          {submitError && !dirtySinceLastSubmit && <Label color="red" basic content={submitError.statusText} />}
          <br />
          <Button disabled={invalid && !dirtySinceLastSubmit || pristine} positive loading={submitting} content="Login" />
        </Form>
      )}
    />
  );
};

export default LoginForm;
