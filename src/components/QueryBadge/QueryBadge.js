import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const QueryBadge = ({ to = "/", query = "" }) => {
    return (
        <Badge 
            bg="success" 
            className="mx-2 p-3"
            style={{
                display: 'inline-block',
                width: 'auto',
                textAlign: 'center'
            }}
        >
            <Link 
                to={to} 
                style={{ color: "white", fontSize: "1rem", textDecoration: "none" }}
            >
                {query}
            </Link>
        </Badge>
    );
};

export default QueryBadge;
