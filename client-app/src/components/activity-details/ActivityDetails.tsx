import React, { useContext } from "react";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import Loading from "../loading/Loading";

const ActivityDetails: React.FC= () => {
  const { selectedActivity :activity, setEditMode, clearSelectedActivity, submitting, loading } = useContext(
    ActivityStore
  );

  if (loading || !activity) {
    return <Loading content="Loading activity ..." />
  }

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
