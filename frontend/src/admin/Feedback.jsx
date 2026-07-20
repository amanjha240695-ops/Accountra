import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import api from "../services/api";
import "./Admin.css";


function Feedback() {

  const [feedbacks, setFeedbacks] = useState([]);


  useEffect(() => {

    const fetchFeedbacks = async () => {

      try {

        const response = await api.get("/admin/feedbacks");

        setFeedbacks(response.data.feedbacks);

      } catch (error) {

        console.log("Feedback error:", error);

      }

    };


    fetchFeedbacks();

  }, []);



  return (
    <div className="admin-page">


      <div className="page-header">

        <div>

          <h2>
            Feedback
          </h2>

          <p>
            Review feedback submitted by users.
          </p>

        </div>


        <div className="page-icon">

          <MessageSquare size={28}/>

        </div>

      </div>




      <div className="table-container">


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

              <th>
                Status
              </th>

            </tr>

          </thead>



          <tbody>


          {
            feedbacks.length === 0 ? (

              <tr>

                <td colSpan="4">
                  No feedback available
                </td>

              </tr>


            ) : (


              feedbacks.map((item)=>(

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



                  <td>

                    New

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


export default Feedback;