import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NewFlavorType from "./components/NewFlavorType";
import FlavorTypesView from "./FlavorTypesView";
import NotPermissionPage from 'common/NotPermissionPage';
import EditFlavorType from "./components/EditFlavorType";
import ReadFlavorType from "./components/ReadFlavorType";
import SesionPage from "common/SesionPage";

const FlavorTypeRoutes = ({ permissionsAccess }) => {
    let { path } = useRouteMatch();

    const readOnly = permissionsAccess === 1;

    return (
        <div>
            <Switch>
                <Route exact path={path} render={() => <FlavorTypesView permissionsAccess={permissionsAccess} />}></Route>

                <Route exact path={`${path}/new`} render={() => {
                    if (readOnly) {
                        return <NotPermissionPage />
                    } else {
                        return <NewFlavorType />
                    }
                }}></Route>

                <Route exact path={`${path}/view/:idFlavorType`} component={ReadFlavorType}></Route>

                <Route exact path={`${path}/edit/:idFlavorType`} render={() => {
                    if (permissionsAccess !== 3) {
                        return <NotPermissionPage />
                    } else if(permissionsAccess === 3){
                        return <EditFlavorType />
                    }
                }}></Route>

                <Route path={`/`} render={() => {
                    return <SesionPage />
                }}></Route>

            </Switch>
        </div>
    )
}

export default FlavorTypeRoutes