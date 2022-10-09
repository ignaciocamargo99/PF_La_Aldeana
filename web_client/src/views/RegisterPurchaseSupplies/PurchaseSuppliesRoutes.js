import NotPermissionPage from 'common/NotPermissionPage';
import SesionPage from "common/SesionPage";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RegisterPurchaseSupplies from './RegisterPurchaseSupplies';
import { WholeSalesList } from "./WholeSalesList";
import PurchaseSuppliesView from "./PurchaseSuppliesView";

const PurchaseSuppliesRoutes = ({ permissionsAccess, user }) => {
    let { path } = useRouteMatch();
    const readOnly = permissionsAccess === 1;

    return (
        <div>
        {console.log(permissionsAccess, user)}
            <Switch>
                <Route exact path={path} render={() => <WholeSalesList permissionsAccess={permissionsAccess} />}></Route>

                <Route exact path={`newPurchaseSupplies`} render={() => {
                    if (readOnly) {
                        return <NotPermissionPage />
                    } else {
                        return <PurchaseSuppliesView user={user}/>
                    }
                }}></Route>

                <Route exact path={`${path}/view/:idWholesale`} component={RegisterPurchaseSupplies}></Route>
                <Route path={`/`} render={() => {
                    return <SesionPage />
                }}></Route>

            </Switch>
        </div>
    )
}

export default PurchaseSuppliesRoutes