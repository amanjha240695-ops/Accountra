import { Settings as SettingsIcon } from "lucide-react";


function Settings() {


  return (
    <div className="admin-page">


      <div className="page-header">


        <div>

          <h2>
            Settings
          </h2>

          <p>
            Manage admin and platform settings.
          </p>

        </div>


        <div className="page-icon">

          <SettingsIcon size={28}/>

        </div>


      </div>



      <div className="settings-card">


        <h3>
          Admin Account
        </h3>


        <div className="setting-item">

          <span>
            Username
          </span>

          <strong>
            admin
          </strong>

        </div>



        <div className="setting-item">

          <span>
            Role
          </span>

          <strong>
            Administrator
          </strong>

        </div>



        <div className="setting-item">

          <span>
            Platform
          </span>

          <strong>
            Accountra
          </strong>

        </div>


      </div>


    </div>
  );
}


export default Settings;