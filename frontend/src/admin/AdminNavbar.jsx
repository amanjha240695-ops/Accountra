import { useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";


function AdminNavbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");

  };


  return (
    <header className="admin-navbar">

      <div className="admin-page-title">
        <h1>
          Admin Dashboard
        </h1>

        <p>
          Manage Accountra platform
        </p>
      </div>


      <div className="admin-profile">

        <div className="admin-user">

          <UserCircle size={28}/>

          <div>
            <h4>
              Admin
            </h4>

            <span>
              Administrator
            </span>
          </div>

        </div>


        <button 
          className="logout-btn"
          onClick={logout}
        >

          <LogOut size={18}/>

          Logout

        </button>


      </div>


    </header>
  );
}


export default AdminNavbar;