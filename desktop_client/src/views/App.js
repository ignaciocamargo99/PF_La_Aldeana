import ChamberFlavorsDispatch from './ChamberFlavorsDispatch/ChamberFlavorsDispatch';
import { BrowserRouter, Route } from 'react-router-dom';


export default function App() {

  return (
    <>
      <BrowserRouter>
        <Route path='/app/flavorsChamber' component={ChamberFlavorsDispatch}></Route>
      </BrowserRouter>
      <a href="/app/flavorsChamber" target="_blank">
        <button>Click</button>
      </a>
    </>
  );
}
