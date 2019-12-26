import React, { useContext, useEffect } from "react";
import ActivityDetails from "../components/activity-details/ActivityDetails";
import { ActivityStore } from "../store";

interface IProps {
  id: string
}

const DetailsPage: React.FC<IProps> = ({ id }) => {
  const { loadActivity } = useContext(ActivityStore);

  useEffect(() => {
    loadActivity(id)
  }, [loadActivity, id]);

  return <ActivityDetails />;
};

export default DetailsPage;
