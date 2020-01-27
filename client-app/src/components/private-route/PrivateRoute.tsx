import React, { useContext } from "react";
import {
  RouteComponentProps,
  Route,
  RouteProps,
  Redirect
} from "react-router-dom";
import { StoreContext } from "../../store";
import { observer } from "mobx-react-lite";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const Store = useContext(StoreContext);
  const { isLoggedIn } = Store.userStore;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  );
};

export default observer(PrivateRoute);
