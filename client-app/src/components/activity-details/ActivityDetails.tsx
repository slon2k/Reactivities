import React, { useContext } from "react";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { IActivity } from "../../models/activity";

interface IProps {
  activity: IActivity
}


const ActivityDetails: React.FC<IProps> = ({activity}) => {
  const { setEditMode, clearSelectedActivity, submitting } = useContext(
    ActivityStore
  );

  const {id} = activity;

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
            as={Link}
            to={`/edit/${id}`}
            basic
            loading={submitting}
            color="blue"
            content="Edit"
            onClick={() => setEditMode(true)}
          />
          <Button
            as={Link} 
            to="/activities"
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
