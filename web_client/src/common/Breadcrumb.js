import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import '../assets/Breadcrumb.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = ({ currentName, parentName, parentLink }) => {
    return (
        <div className="bread">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href={parentLink} onClick="">{parentName}
                </Link>
                <Typography color="textPrimary">
                    {currentName}
                    &nbsp;
                    <FontAwesomeIcon icon={faIceCream} />
                </Typography>


            </Breadcrumbs>
        </div>
    )
};

export default Breadcrumb;