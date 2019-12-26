import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const { setEditMode, clearSelectedActivity} = useContext(ActivityStore);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header exact as={NavLink} to="/">
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "15px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item as={NavLink} to="/create">
          <Button
            onClick={() => {
              clearSelectedActivity();
              setEditMode(true);
            }}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
