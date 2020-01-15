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

interface IProps {
  setActiveTab: (index: any) => void;
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
  return (
    <Tab
      menuPosition="right"
      menu={{ vertical: true }}
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
