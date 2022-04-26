import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RegisterSupplyView from "views/RegisterSupply/RegisterSupplyView";
import SuppliesView from "./components/SuppliesView";

const SupplyRoutes = ({ permissionsAccess }) => {
    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path} render={() => <SuppliesView permissionsAccess={permissionsAccess} />}></Route>
                <Route path={`${path}/new`} component={RegisterSupplyView}></Route>
            </Switch>
        </div>
    )
}

export default SupplyRoutes