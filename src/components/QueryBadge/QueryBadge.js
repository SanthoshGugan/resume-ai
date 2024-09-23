import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const QueryBadge = ({ to = "/", query = ""}) => {
    return (
        <Badge bg="success" className="mx-2">
            <Link to={to}>
                <div style={{ color: "white", fontSize: "1rem"}}>
                    {query}
                </div>
            </Link>
        </Badge>
    );
};

export default QueryBadge;