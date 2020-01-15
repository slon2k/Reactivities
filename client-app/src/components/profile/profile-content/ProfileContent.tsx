import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "../profile-photos/ProfilePhotos";
import ProfileAbout from "../profile-about/ProfileAbout";
import ProfileFollowings from "../profile-followings/ProfileFollowings";

const panes = [
  { menuItem: "About", render: () => <ProfileAbout /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  { menuItem: "Activities", render: () => <Tab.Pane>Activities</Tab.Pane> },
  { menuItem: "Followers", render: () => <ProfileFollowings /> },
  { menuItem: "Following", render: () => <ProfileFollowings /> }
];

const ProfileContent = () => {
  return <Tab menuPosition="right" menu={{ vertical: true }} panes={panes} />;
};

export default ProfileContent;
