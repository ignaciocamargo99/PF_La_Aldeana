import ChamberFlavorsDispatch from '../ChamberFlavorsDispatch/components/ChamberFlavorsDispatch';
// import LoginUser from './LoginUser/LoginUser';
import BeShowed from '../../common/BeShowed';
import { connect } from 'react-redux';
import { toRoot, toChamberFlavorsDispatch, toRegisterAttendance, lockMenu, unlockMenu } from '../../actions/MenuActions';
import logo from '../../images/logo_expandido.png';
import '../../assets/logo.css';
import SideMenu from './Menu';

const Main = (props) => {

  return (
    <>
      <BeShowed show={!props.menu}>
        <div className='row root'>
          <div className='row col-sm-3' style={{width: '15em'}}>
            <SideMenu />
          </div>

        
          <div className="row justify-content-sm-center col-sm-9 main">

            <BeShowed show={props.location === 1}>
              <ChamberFlavorsDispatch />
            </BeShowed>

            <BeShowed show={props.location === 0}>
              <img className='logo' src={logo} alt="" style={{width: '70em'}}></img>
            </BeShowed>

          </div>
        </div>
        
      </BeShowed>
      <BeShowed show={props.menu}>
        <div className='row root'>
          <div className='row col-sm-1'>
            <SideMenu />
          </div>

        
          <div className="row justify-content-sm-center col-sm-11">

            <BeShowed show={props.location === 1}>
              <ChamberFlavorsDispatch />
            </BeShowed>

            <BeShowed show={props.location === 0}>
              <img className='logo' src={logo} alt="" style={{width: '70em'}}></img>
            </BeShowed>
          </div>
        </div>
        
      </BeShowed>
    </>

  );
}

const mapStateToProps = state => {
  return {
      location: state.location,
      menu: state.menu
  }
}

const mapDispatchToProps = {
  toRoot,
  toChamberFlavorsDispatch,
  toRegisterAttendance,
  lockMenu,
  unlockMenu
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);