import { renderRoutes } from "react-router-config";

export default (props) => <>{renderRoutes(props.route.routes)}</>;
