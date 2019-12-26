import React, { useState } from "react";
import { Item, Button, Label } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface IProps {
  activity: IActivity;
  deleting: boolean;
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityListItem: React.FC<IProps> = ({
  activity,
  selectActivity,
  deleteActivity,
  deleting
}) => {

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
            onClick={() => selectActivity(activity.id)}
            floated="right"
            color="blue"
            content="View"
          />
          <Button
            onClick={() => {
              deleteActivity(activity.id);              
            }}
            loading={deleting}
            floated="right"
            color="red"
            content="Delete"
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
