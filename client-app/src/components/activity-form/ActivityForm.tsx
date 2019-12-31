import React, { useContext } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { v4 as uuid } from "uuid";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput, TextArea, SelectInput, DateInput } from "../form";
import { category } from "../../settings/categoryOptions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

interface IProps {
  activity?: IActivity;
}

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({ message: "Description is too short" })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("date")
});

const ActivityForm: React.FC<IProps> = ({ activity }) => {
  const activityStore = useContext(ActivityStore);
  const { createActivity, updateActivity, submitting } = activityStore;

  const initialActivity: IActivity = {
    id: "",
    title: "",
    description: "",
    date: null,
    venue: "",
    category: "",
    city: ""
  };

  const form = activity || initialActivity;

  const handleFormSubmit = (form: IActivity) => {
    if (form.id !== "") {
      updateActivity(form);
    } else {
      form.id = uuid();
      createActivity(form);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={form}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Field
                    placeholder="Title"
                    name="title"
                    value={form.title}
                    component={TextInput}
                  />
                  <Field
                    rows={2}
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    component={TextArea}
                  />
                  <Field
                    placeholder="Category"
                    name="category"
                    options={category}
                    value={form.category}
                    component={SelectInput}
                  />
                  <Field name="date" value={form.date} component={DateInput} />
                  <Field
                    placeholder="City"
                    name="city"
                    value={form.city}
                    component={TextInput}
                  />
                  <Field
                    placeholder="Venue"
                    name="venue"
                    value={form.venue}
                    component={TextInput}
                  />
                  <Button
                    floated="right"
                    disabled={submitting || invalid || pristine}
                    positive
                    type="submit"
                    loading={submitting}
                    content="Submit"
                  />
                  <Button
                    as={Link}
                    to={`/activities/${form.id}`}
                    floated="right"
                    type="button"
                    content="Cancel"
                  />
                </Form>
              );
            }}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
