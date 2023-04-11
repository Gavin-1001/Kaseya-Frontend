import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logout = () =>{
        dispatch(clearCurrentUser());
        navigate("/login");
    };
    
  return (
    .nav.navbar-expand.navbar-dark.bg-dark
  )
}

export default Navbar
