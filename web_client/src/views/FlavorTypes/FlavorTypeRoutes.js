import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NewFlavorType from "./components/NewFlavorType";
import FlavorTypesView from "./FlavorTypesView";
import NotPermissionPage from 'common/NotPermissionPage';

const FlavorTypeRoutes = ({ permissionsAccess }) => {
  let { path } = useRouteMatch();

  const readOnly = permissionsAccess === 1;

  return (
    <div>
      <Switch>
        <Route exact path={path} render={() => <FlavorTypesView permissionsAccess={permissionsAccess} />}></Route>
        <Route path={`${path}/new`} render={() => {
          if (readOnly) {
            return <NotPermissionPage />
          } else {
            return <NewFlavorType permissionsAccess={permissionsAccess} />
          }
        }}></Route>
      </Switch>
    </div>
  )
}

export default FlavorTypeRoutes