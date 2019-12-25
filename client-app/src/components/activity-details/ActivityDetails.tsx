import React from "react";
import { IActivity } from "../../models/activity";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";

interface IProps {
  activity: IActivity;
}

export const ActivityDetails: React.FC<IProps> = ({ activity }) => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};
