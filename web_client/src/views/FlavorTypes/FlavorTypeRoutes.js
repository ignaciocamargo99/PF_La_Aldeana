import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import FlavorTypesView from "./FlavorTypesView";

const FlavorTypeRoutes = ({ permissionsAccess }) => {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path} render={() => <FlavorTypesView permissionsAccess={permissionsAccess} />}></Route>
        <Route path={`${path}/new`} render={() => <>En desarrollo...</>}></Route>
      </Switch>
    </div>
  )
}

export default FlavorTypeRoutes