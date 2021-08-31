
import Main from './Menu/Main';
import Sales from './Sales/Sales';
import { HashRouter, BrowserRouter, Route } from 'react-router-dom';

export default function App() {

  return (
    <>
      {/* <Main /> */}
      <BrowserRouter>
        <Route path='/index' component={Main}></Route>
        <Route path='/sales' component={Sales}></Route>
      </BrowserRouter>
      {/* <HashRouter>
        <Route path='/app/' component={Main}></Route>
        <Route path='/app/sales' component={Sales}></Route>
      </HashRouter> */}
    </>
  );
}
