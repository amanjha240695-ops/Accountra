import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Calculator
} from "lucide-react";


function AdminSidebar() {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />
    },
    {
      name: "Feedback",
      path: "/admin/feedback",
      icon: <MessageSquare size={20} />
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={20} />
    }
  ];


  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">

        <div className="logo-icon">
          <Calculator size={22}/>
        </div>

        <h2>
          Accountra
        </h2>

      </div>


      {/* Navigation */}
      <nav className="admin-menu">

        {
          menuItems.map((item)=>(
            
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({isActive}) =>
                isActive 
                ? "admin-link active"
                : "admin-link"
              }
            >

              {item.icon}

              <span>
                {item.name}
              </span>

            </NavLink>

          ))
        }

      </nav>


    </aside>
  );
}


export default AdminSidebar;