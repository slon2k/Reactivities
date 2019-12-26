import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { ActivityStore } from "../../store";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const { setEditMode, clearSelectedActivity} = useContext(ActivityStore);

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="assets/logo.png"
            alt="logo"
            style={{ marginRight: "15px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Messages" />
        <Menu.Item>
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
