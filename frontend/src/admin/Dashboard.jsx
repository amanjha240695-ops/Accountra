import { useEffect, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import api from "../services/api";
import "./Admin.css";


function Dashboard() {


  const [dashboard, setDashboard] = useState({

    totalUsers: 0,
    totalFeedbacks: 0,
    totalLogins: 0,
    recentUsers: [],
    recentFeedbacks: []

  });



  useEffect(() => {


    const fetchDashboard = async () => {


      try {


        const response = await api.get("/admin/dashboard");


        setDashboard(response.data.dashboard);


      } catch (error) {


        console.log("Dashboard error:", error);


      }


    };


    fetchDashboard();


  }, []);





  return (

    <div className="admin-page">



      {/* Header */}

      <div className="page-header">


        <div>

          <h2>
            Dashboard
          </h2>


          <p>
            Overview of admin metrics and recent activity.
          </p>


        </div>



        <div className="page-icon">

          <LayoutDashboard size={28}/>

        </div>


      </div>





      {/* Dashboard Cards */}

      <div className="dashboard-cards">



        <div className="dashboard-card">

          <h3>
            Total Users
          </h3>

          <p>
            {dashboard.totalUsers}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Total Feedback
          </h3>

          <p>
            {dashboard.totalFeedbacks}
          </p>

        </div>





        <div className="dashboard-card">

          <h3>
            Total Logins
          </h3>

          <p>
            {dashboard.totalLogins}
          </p>

        </div>



      </div>








      {/* Recent Users */}


      <div className="table-container">


        <h3 className="table-title">
          Recent Users
        </h3>



        <table className="admin-table">


          <thead>

            <tr>

              <th>
                Username
              </th>


              <th>
                Email
              </th>


              <th>
                Role
              </th>


              <th>
                Joined
              </th>


            </tr>


          </thead>





          <tbody>


          {

            dashboard.recentUsers.length === 0 ? (

              <tr>

                <td colSpan="4">
                  No users found
                </td>

              </tr>


            ) : (


              dashboard.recentUsers.map((user)=>(


                <tr key={user.id}>


                  <td>
                    {user.username}
                  </td>


                  <td>
                    {user.email}
                  </td>


                  <td>
                    {user.role}
                  </td>


                  <td>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>


                </tr>


              ))


            )


          }


          </tbody>


        </table>


      </div>







      {/* Recent Feedback */}



      <div className="table-container">


        <h3 className="table-title">
          Recent Feedback
        </h3>





        <table className="admin-table">


          <thead>


            <tr>

              <th>
                User
              </th>


              <th>
                Message
              </th>


              <th>
                Date
              </th>


            </tr>


          </thead>





          <tbody>


          {


            dashboard.recentFeedbacks.length === 0 ? (


              <tr>

                <td colSpan="3">
                  No feedback found
                </td>


              </tr>


            ) : (


              dashboard.recentFeedbacks.map((item)=>(


                <tr key={item.id}>


                  <td>
                    {item.user?.username}
                  </td>


                  <td>
                    {item.message}
                  </td>


                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>


                </tr>


              ))


            )


          }


          </tbody>


        </table>


      </div>





    </div>

  );

}


export default Dashboard;