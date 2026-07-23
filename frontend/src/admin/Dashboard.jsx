import { useEffect, useState } from "react";
import {
  Users,
  MessageSquare,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import api from "../services/api";
import "./Admin.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalFeedbacks: 0,
    totalLogins: 0,
    recentUsers: [],
    recentFeedbacks: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        setDashboard(response.data.dashboard);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-page">
      {/* ================= HEADER ================= */}

      <div className="dashboard-header">
        <div>
          <h1>Welcome Back 👋</h1>

          <p>
            Here's a quick overview of everything happening in your Accountra
            dashboard.
          </p>
        </div>

        <div className="dashboard-date">
          <CalendarDays size={18} />
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={28} />
          </div>

          <div>
            <h2>
              {loading ? "..." : dashboard.totalUsers}
            </h2>

            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <MessageSquare size={28} />
          </div>

          <div>
            <h2>
              {loading ? "..." : dashboard.totalFeedbacks}
            </h2>

            <p>Total Feedback</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h2>
              {loading ? "..." : dashboard.totalLogins}
            </h2>

            <p>Total Logins</p>
          </div>
        </div>
      </div>

      {/* ================= RECENT USERS ================= */}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Users</h2>

          <button className="view-btn">
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : dashboard.recentUsers.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              ) : (
                dashboard.recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="avatar">
                          {user.username.charAt(0).toUpperCase()}
                        </div>

                        <span>{user.username}</span>
                      </div>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={
                          user.role === "admin"
                            ? "badge admin"
                            : "badge user"
                        }
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= RECENT FEEDBACK ================= */}

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Feedback</h2>

          <button className="view-btn">
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : dashboard.recentFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan="3">No feedback found.</td>
                </tr>
              ) : (
                dashboard.recentFeedbacks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.user?.username}</td>

                    <td className="message-cell">
                      {item.message}
                    </td>

                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;