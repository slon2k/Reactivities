import React from "react";
import ActivityDetails from "../components/activity-details/ActivityDetails";
import { Segment } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";

interface IParams {
  id: string
}

const DetailsPage : React.FC<RouteComponentProps<IParams>> = ({match}) => {

  return (
    <Segment>
      <ActivityDetails id={match.params.id}/>      
    </Segment>
  
  );
};

export default DetailsPage;
