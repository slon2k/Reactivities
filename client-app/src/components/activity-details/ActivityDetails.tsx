import React from "react";
import { IActivity } from "../../models/activity";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";

interface IProps {
  activity: IActivity;
  setEditMode: (mode: boolean) => void;
  clearSelectedActivity: () => void;
  submitting: boolean;
}

export const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode, clearSelectedActivity, submitting }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button basic loading={submitting} color="blue" content="Edit" onClick={() => setEditMode(true)} />
          <Button basic color="grey" content="Cancel" onClick={() => clearSelectedActivity()} />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};
