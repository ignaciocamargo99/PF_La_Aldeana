
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Menu/Main';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Route path='/' component={Main}></Route>
      </BrowserRouter>
    </>
  );
}

