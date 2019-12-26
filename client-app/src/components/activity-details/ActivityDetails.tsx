import React, { useContext } from "react";
import { IActivity } from "../../models/activity";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity;
}

const ActivityDetails: React.FC<IProps> = ({ activity }) => {
  const { setEditMode, clearSelectedActivity, submitting } = useContext(
    ActivityStore
  );

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            basic
            loading={submitting}
            color="blue"
            content="Edit"
            onClick={() => setEditMode(true)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => clearSelectedActivity()}
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
