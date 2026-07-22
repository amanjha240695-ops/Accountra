import { useState } from "react";
import {
  Star,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../../services/api";
import useRequireLogin from "../../hooks/useRequireLogin"; // Adjust import path if needed
import "./Feedback.css";

function Feedback() {
  const MAX_LENGTH = 500;

  // Initialize custom login check hook
  const checkLogin = useRequireLogin();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Check if user is logged in before running submit logic
    if (!checkLogin()) {
      return; // Stops submission & redirects to /login via your hook
    }

    setSuccess("");
    setError("");

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (message.trim().length < 10) {
      setError("Feedback must contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/feedback", {
        message: message.trim(),
        rating,
      });

      if (data.success) {
        setSuccess("Thank you! Your feedback has been submitted.");

        setRating(0);
        setHoverRating(0);
        setMessage("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fb-page">
      <div className="fb-card">
        <div className="fb-header">
          <div className="fb-icon">
            <MessageSquare size={32} />
          </div>

          <h1>Share Your Feedback</h1>

          <p>
            Your feedback helps us improve Accountra and build better accounting
            tools for everyone.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="fb-form">
          <div className="fb-rating-section">
            <label className="fb-label">How would you rate your experience?</label>

            <div className="fb-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="fb-star-btn"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoverRating || rating)
                        ? "fb-star filled"
                        : "fb-star"
                    }
                  />
                </button>
              ))}
            </div>

            <span className="fb-rating-text">
              {rating === 0 && "Select Rating"}
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          </div>

          <div className="fb-field-group">
            <label className="fb-label">Your Feedback</label>

            <textarea
              className="fb-textarea"
              placeholder="Tell us what you liked, what can be improved, or report an issue..."
              value={message}
              maxLength={MAX_LENGTH}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="fb-character-count">
              {message.length}/{MAX_LENGTH}
            </div>
          </div>

          {error && (
            <div className="fb-error">
              {error}
            </div>
          )}

          {success && (
            <div className="fb-success">
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            className="fb-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;