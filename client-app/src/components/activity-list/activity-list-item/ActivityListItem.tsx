import React from "react";
import { Item, Button, Label } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import { Link } from "react-router-dom";

interface IProps {
  activity: IActivity;
}

export const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header>{activity.title}</Item.Header>
        <Item.Meta>{activity.date}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            {activity.venue}, {activity.city}
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            color="blue"
            content="View"
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
