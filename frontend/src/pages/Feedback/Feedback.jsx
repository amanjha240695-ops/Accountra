import { useState } from "react";
import {
  Star,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../../services/api";
import "./Feedback.css";

function Feedback() {
  const MAX_LENGTH = 500;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="feedback-page">
      <div className="feedback-card">
        <div className="feedback-header">
          <div className="feedback-icon">
            <MessageSquare size={32} />
          </div>

          <h1>Share Your Feedback</h1>

          <p>
            Your feedback helps us improve Accountra and build better accounting
            tools for everyone.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="rating-section">
            <label>How would you rate your experience?</label>

            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="star-btn"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoverRating || rating)
                        ? "star filled"
                        : "star"
                    }
                  />
                </button>
              ))}
            </div>

            <span className="rating-text">
              {rating === 0 && "Select Rating"}
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          </div>

          <div className="input-group">
            <label>Your Feedback</label>

            <textarea
              placeholder="Tell us what you liked, what can be improved, or report an issue..."
              value={message}
              maxLength={MAX_LENGTH}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="character-count">
              {message.length}/{MAX_LENGTH}
            </div>
          </div>

          {error && (
            <div className="feedback-error">
              {error}
            </div>
          )}

          {success && (
            <div className="feedback-success">
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            className="submit-feedback-btn"
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