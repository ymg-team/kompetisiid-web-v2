const Submit = ({ onClick, id, className, loading, disabled, type, text }) => {
  return (
    <div className="form-child">
      <button
        {...{ onClick, id, type }}
        className={`${className} ${loading ? "loading" : ""}`}
        disabled={disabled || loading}
      >
        {loading ? "Memproses permintaan..." : text}
      </button>
    </div>
  );
};

Submit.defaultProps = {
  type: "submit",
  disabled: false,
  className: "btn btn-white",
};

export default Submit;
