import React, { useContext } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { v4 as uuid } from "uuid";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput, TextArea, SelectInput, DateInput } from "../form";
import { category } from "../../settings/categoryOptions";

interface IProps {
  activity?: IActivity;
}

const ActivityForm: React.FC<IProps & RouteComponentProps> = ({
  activity,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { createActivity, updateActivity, submitting } = activityStore;

  //const newDate = new Date();
  const initialActivity: IActivity = {
    id: "",
    title: "New title",
    description: "",
    date: new Date(),
    venue: "",
    category: "",
    city: ""
  };

  const form = activity || initialActivity;

  // const handleSubmit = async () => {
  //   if (form.id !== "") {
  //     console.log("Updating ...", form);
  //     await updateActivity(form);
  //     history.push(`/activities/${form.id}`);
  //   } else {
  //     form.id = uuid();
  //     console.log("Creating ...", form);
  //     await createActivity(form);
  //     history.push(`/activities/${form.id}`);
  //   }
  // };

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  console.log("form", form)

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFormSubmit}
            render={({ handleSubmit }) => {
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
                  <Field
                    name="date"
                    value={form.date}
                    component={DateInput}
                  />
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

export default withRouter(observer(ActivityForm));
