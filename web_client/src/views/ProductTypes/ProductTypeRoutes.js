import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RegisterTypeProductView from "views/RegisterTypeProduct/RegisterTypeProductView";
import ProductTypesView from "./components/ProductTypesView";

const ProductTypeRoutes = ({ permissionsAccess }) => {
    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path} render={() => <ProductTypesView permissionsAccess={permissionsAccess} />}></Route>
                <Route path={`${path}/new`} component={RegisterTypeProductView}></Route>
            </Switch>
        </div>
    )
}

export default ProductTypeRoutes