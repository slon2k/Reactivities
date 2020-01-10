import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "../profile-photos/ProfilePhotos";
import ProfileAbout from "../profile-about/ProfileAbout";

const panes = [
  { menuItem: "About", render: () => <ProfileAbout /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  { menuItem: "Activities", render: () => <Tab.Pane>Activities</Tab.Pane> },
  { menuItem: "Followers", render: () => <Tab.Pane>Followers</Tab.Pane> },
  { menuItem: "Following", render: () => <Tab.Pane>Following</Tab.Pane> }
];

const ProfileContent = () => {
  return <Tab menuPosition="right" menu={{ vertical: true }} panes={panes} />;
};

export default ProfileContent;
