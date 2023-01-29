import React from "react";

interface TextErrorProps {
  text: string;
}

const TextError: React.FC<TextErrorProps> = ({ text }) => {
  return (
    <p className="text-muted align-center">
      {text || "Something wrong, please try again!"}
    </p>
  );
};

export default TextError;
