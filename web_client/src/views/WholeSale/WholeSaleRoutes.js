import NotPermissionPage from 'common/NotPermissionPage';
import SesionPage from "common/SesionPage";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ReadWholeSale } from './WholeSaleList/ReadWholeSale/ReadWholeSale';
import { WholeSalesList } from "./WholeSaleList/WholeSalesList";
import WholeSalesView from "./WholeSalesView";

const WholeSaleRoutes = ({ permissionsAccess, user }) => {
    let { path } = useRouteMatch();
    const readOnly = permissionsAccess === 1;

    return (
        <div>
            <Switch>
                <Route exact path={path} render={() => <WholeSalesList permissionsAccess={permissionsAccess} />}></Route>

                <Route exact path={`${path}/new`} render={() => {
                    if (readOnly) {
                        return <NotPermissionPage />
                    } else {
                        return <WholeSalesView user={user}/>
                    }
                }}></Route>

                <Route exact path={`${path}/view/:idWholesale`} component={ReadWholeSale}></Route>
                <Route path={`/`} render={() => {
                    return <SesionPage />
                }}></Route>

            </Switch>
        </div>
    )
}

export default WholeSaleRoutes