import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import EditFlavor from "./components/EditFlavor";
import NewFlavor from "./components/NewFlavor";
import ListFlavors from "./ListFlavors";

const FlavorRoutes = ({ permissionsAccess }) => {
    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path} render={() => <ListFlavors permissionsAccess={permissionsAccess} />}></Route>
                <Route path={`${path}/new`} component={NewFlavor}></Route>
                <Route path={`${path}/:idFlavor`} component={EditFlavor}></Route>
            </Switch>
        </div>
    )
}

export default FlavorRoutes