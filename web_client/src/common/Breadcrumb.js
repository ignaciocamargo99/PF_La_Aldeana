
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import '../assets/Breadcrumb.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Breadcrumb = ({ currentName, parentName, parentLink, icon }) => {
    return (
        <div className="bread">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href={parentLink}>{parentName}
                </Link>
                <Typography color="textPrimary">
                    {currentName}
                    &nbsp;
                    <FontAwesomeIcon icon={icon} />
                </Typography>
            </Breadcrumbs>
        </div>
    )
};

export default Breadcrumb;