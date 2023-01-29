interface SubmitProps {
  onClick?: any;
  id?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  text?: string;
  style?: object;
}

const Submit: React.FC<SubmitProps> = ({
  onClick,
  id,
  className = "btn btn-white",
  loading = false,
  disabled = false,
  type = "submit",
  text,
  style,
}) => {
  return (
    <button
      {...{ onClick, id, type, style }}
      className={`${className} ${loading ? "loading" : ""}`}
      disabled={disabled || loading}
    >
      {loading ? "Memproses permintaan..." : text}
    </button>
  );
};

export default Submit;
