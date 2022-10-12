import NotPermissionPage from 'common/NotPermissionPage';
import SesionPage from "common/SesionPage";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RegisterPurchaseSupplies from './RegisterPurchaseSupplies';
import { PurchasesList } from "./PurchasesList";
import PurchaseSuppliesView from "./PurchaseSuppliesView";

const PurchaseSuppliesRoutes = ({ permissionsAccess, user }) => {
    let { path } = useRouteMatch();
    const readOnly = permissionsAccess === 1;

    return (
        <div>
            <Switch>
                <Route exact path={path} render={() => <PurchasesList permissionsAccess={permissionsAccess} />}></Route>

                <Route exact path={`newPurchaseSupplies`} render={() => {
                    if (readOnly) {
                        return <NotPermissionPage />
                    } else {
                        return <PurchaseSuppliesView user={user}/>
                    }
                }}></Route>

                <Route exact path={`${path}/view/:idPurchase`} component={RegisterPurchaseSupplies}></Route>
                <Route path={`/`} render={() => {
                    return <SesionPage />
                }}></Route>

            </Switch>
        </div>
    )
}

export default PurchaseSuppliesRoutes