import "./style.css";
function ErrorComponent({ setError, error, message }) {
  return error ? (
    <span onClick={() => setError(false)} className="query-error">
      {message.error === "Internal server error"
        ? "Validation error, check input"
        : message.error}
    </span>
  ) : null;
}

export default ErrorComponent;
