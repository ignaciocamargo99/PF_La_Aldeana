import ChamberFlavorsDispatch from './ChamberFlavorsDispatch/components/ChamberFlavorsDispatch';
// import LoginUser from './LoginUser/LoginUser';
import Sales from './Sales/Sales';
import BeShowed from '../common/BeShowed';
import { connect } from 'react-redux';
import { toRoot, toSales, toChamberFlavorsDispatch } from '../actions/MenuActions';
import logo from '../images/logo_expandido.png';
import '../assets/logo.css';
import Menu from './Menu/Menu';
import { ProSidebar } from 'react-pro-sidebar';

const App = (props) => {

  return (
    <>
      <div className='row root'>
        <div className='col-sm-1'>
          <Menu/>
        </div>

      
      <div className="row justify-content-sm-center col-sm-11">


            <BeShowed show={props.location === 1}>
              <Sales />
            </BeShowed>

            <BeShowed show={props.location === 2}>
              <ChamberFlavorsDispatch />
            </BeShowed>

      </div>
      </div>
      
      <BeShowed show={props.location === 0}>
              <img className='logo' src={logo} alt=""></img>
            </BeShowed>
    </>

  );
}

const mapStateToProps = state => {
  return {
      location: state.location
  }
}

const mapDispatchToProps = {
  toRoot,
  toSales,
  toChamberFlavorsDispatch
}

export default connect(mapStateToProps,mapDispatchToProps)(App);