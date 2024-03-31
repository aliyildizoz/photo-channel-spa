import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
import { useSelector } from 'react-redux';

  
  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      // let currentUser = useSelector(state => state.currentUserReducer)

      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
          currentUser
        />
      );
    }
  
    return ComponentWithRouterProp;
  }


  export default withRouter;