import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  setEditMode: (mode: boolean) => void;
  clearSelectedActivity: () => void;
}

export const NavBar: React.FC<IProps> = ({ setEditMode, clearSelectedActivity }) => {
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
