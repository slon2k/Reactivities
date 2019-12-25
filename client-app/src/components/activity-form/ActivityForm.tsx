import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../models/activity";

interface IProps {
  setEditMode: (mode: boolean) => void;
  activity: IActivity | null;
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode, activity}) => {

  const initialActivity: IActivity = {
    id: '',
    title: '',
    description: '',
    date: new Date(),
    venue: '',
    category: '',
    city: ''
  }

  const [form, setForm] = useState<IActivity>(activity || initialActivity)

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" value={form.title}/>
        <Form.TextArea rows={2} placeholder="Description" value={form.description}/>
        <Form.Input placeholder="Category" value={form.category}/>
        <Form.Input type="date" value={form.date}/>
        <Form.Input placeholder="City" value={form.city}/>
        <Form.Input placeholder="Venue" value={form.venue}/>
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
