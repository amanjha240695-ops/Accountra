import { useEffect, useState } from "react";
import { Users as UsersIcon, Eye, Shield, Trash2 } from "lucide-react";
import api from "../services/api";


function Users() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);

  const [message, setMessage] = useState("");



  const showMessage = (text) => {

    setMessage(text);

    setTimeout(() => {

      setMessage("");

    }, 3000);

  };




  const fetchUsers = async () => {

    try {

      const response = await api.get("/admin/users");

      setUsers(response.data.users);


    } catch(error) {

      console.log(error);

      showMessage("Failed to load users");

    } finally {

      setLoading(false);

    }

  };




  useEffect(() => {

    fetchUsers();

  }, []);





  const viewUser = async(id)=>{

    try{

      const response = await api.get(`/admin/users/${id}`);

      setSelectedUser(response.data.user);


    }catch(error){

      console.log(error);

    }

  };





  const changeRole = async(id,currentRole)=>{

    try{

      const newRole = currentRole === "admin"
      ? "user"
      : "admin";


      await api.put(`/admin/users/${id}/role`,{

        role:newRole

      });


      fetchUsers();

      showMessage("User role updated successfully");


    }catch(error){

      console.log(error);

      showMessage("Role update failed");

    }

  };





  const deleteUser = async(id)=>{


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );


    if(!confirmDelete) return;



    try{


      await api.delete(`/admin/users/${id}`);


      fetchUsers();

      showMessage("User deleted successfully");


    }catch(error){

      console.log(error);

      showMessage("Delete failed");

    }


  };





return (

<div className="admin-page">



{
message && (

<div className="admin-toast">

{message}

</div>

)
}




<div className="page-header">


<div>

<h2>
Users
</h2>


<p>
Manage registered Accountra users.
</p>


</div>



<div className="page-icon">

<UsersIcon size={28}/>

</div>


</div>





<div className="table-container">


<table className="admin-table">


<thead>

<tr>

<th>Username</th>

<th>Email</th>

<th>Role</th>

<th>Status</th>

<th>Actions</th>

</tr>

</thead>




<tbody>


{

loading ? (

<tr>

<td colSpan="5">
Loading users...
</td>

</tr>


) : users.length === 0 ? (


<tr>

<td colSpan="5">
No users available
</td>

</tr>


) : (


users.map((user)=>(


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
Active
</td>



<td>


<button
className="action-btn"
onClick={()=>viewUser(user.id)}
title="View"
>

<Eye size={17}/>

</button>



<button
className="action-btn"
onClick={()=>changeRole(user.id,user.role)}
title="Change Role"
>

<Shield size={17}/>

</button>



<button
className="action-btn delete"
onClick={()=>deleteUser(user.id)}
title="Delete"
>

<Trash2 size={17}/>

</button>



</td>



</tr>


))


)


}


</tbody>


</table>


</div>





{
selectedUser && (

<div className="user-modal-overlay">


<div className="user-modal">


<h3>
User Details
</h3>


<p>
<strong>Username:</strong> {selectedUser.username}
</p>


<p>
<strong>Email:</strong> {selectedUser.email}
</p>


<p>
<strong>Phone:</strong> {selectedUser.phoneNumber || "N/A"}
</p>


<p>
<strong>Role:</strong> {selectedUser.role}
</p>


<p>
<strong>Joined:</strong>{" "}
{new Date(selectedUser.createdAt).toLocaleDateString()}
</p>


<p>
<strong>Last Login:</strong>{" "}
{
selectedUser.lastLogin
?
new Date(selectedUser.lastLogin).toLocaleDateString()
:
"Never"
}
</p>



<button
className="close-modal"
onClick={()=>setSelectedUser(null)}
>

Close

</button>


</div>


</div>

)

}



</div>

);

}


export default Users;