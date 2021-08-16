import ChamberFlavorsDispatch from './ChamberFlavorsDispatch/components/ChamberFlavorsDispatch';
// import LoginUser from './LoginUser/LoginUser';
import Sales from './Sales/Sales';
import { BrowserRouter, Route } from 'react-router-dom';

export default function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Route path='/app/loginUser' component={LoginUser}></Route> */}
        <Route path='/app/sales' component={Sales}></Route>
        <Route path='/app/flavorsChamber' component={ChamberFlavorsDispatch}></Route>
      </BrowserRouter>
    </>
  );
}
