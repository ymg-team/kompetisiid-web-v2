import { AvatarStyled } from "./styled";

interface AvatarProps {
  src: "";
  alt: "";
  size: "small" | "large";
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size }) => {
  return <AvatarStyled {...{ src, alt, size }} />;
};

export default Avatar;
