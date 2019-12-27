import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { v4 as uuid } from "uuid";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

interface IProps {
  activity?: IActivity
}

const ActivityForm: React.FC<IProps & RouteComponentProps> = ({activity, history}) => {
  
  const activityStore = useContext(ActivityStore);
  const {
    setEditMode,
    createActivity,
    updateActivity,
    submitting
  } = activityStore;

  const initialActivity: IActivity = {
    id: "",
    title: "",
    description: "",
    date: "",
    venue: "",
    category: "",
    city: ""
  };

  const [form, setForm] = useState<IActivity>(activity || initialActivity);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (form.id !== "") {
      console.log("Updating ...", form);
      await updateActivity(form);
      history.push(`/activities/${form.id}`);
    } else {
      form.id = uuid();
      console.log("Creating ...", form);
      await createActivity(form);
      history.push(`/activities/${form.id}`);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
        <Form.Input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={form.venue}
          onChange={handleChange}
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
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default withRouter(observer(ActivityForm));
