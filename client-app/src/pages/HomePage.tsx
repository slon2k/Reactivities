import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store";
import LoginForm from "../components/login-form/LoginForm";
import RegisterForm from "../components/register-form/RegisterForm";

const HomePage = () => {
  const Store = useContext(StoreContext);
  const { isLoggedIn, user } = Store.userStore;
  const { openModal } = Store.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button onClick={() => openModal(<LoginForm />)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
              Register
            </Button>                            
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
