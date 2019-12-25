import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (mode: boolean) => void;
  activity: IActivity | null;
  createActivity: (activity: IActivity) => void;
  updateActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity,
  createActivity,
  updateActivity
}) => {
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

  const handleSubmit = () => {
    if (form.id !== '') {
      console.log("Updating ...", form);
      updateActivity(form);
    } else {
      form.id = uuid();
      console.log("Creating ...", form);
      createActivity(form);
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};
