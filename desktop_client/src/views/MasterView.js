
import Main from './Menu/Main';
import Sales from './Sales/Sales';
import { BrowserRouter, Route } from 'react-router-dom';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Route path='/app/sales' component={Sales}></Route>
        <Route path='/app/flavorsChamber' component={Main}></Route>
      </BrowserRouter>
    </>
  );
}
