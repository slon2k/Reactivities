import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { TextInput } from "../form";
import { StoreContext } from "../../store";
import { IUserForm } from "../../models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("Email"),
  password: isRequired("Password")
});

const LoginForm = () => {
  const Store = useContext(StoreContext);
  const { login } = Store.userStore;
  return (
    <FinalForm
      onSubmit={(credentials: IUserForm) =>
        login(credentials).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <Field
            name="email"
            component={TextInput}
            type="email"
            placeholder="Email"
          />
          <Field
            name="password"
            component={TextInput}
            type="password"
            placeholder="Password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text="Invalid email or password"
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            color="teal"
            fluid
            loading={submitting}
            content="Login"
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
