import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <h1 
      className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent cursor-pointer"
      onClick={() => navigate('/')}
    >
      Cinely
    </h1>
  );
};

export default Logo;
