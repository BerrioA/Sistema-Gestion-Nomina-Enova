import { FaUsers, FaBuilding, FaChartBar, FaDollarSign } from "react-icons/fa";

const Tarjeta = () => {
  return (
    <div className="container-tarjeta">
      <div className="icon">
        <FaUsers size={50} color="#6751ff" />
      </div>
      <FaBuilding size={50} color="#ee49fd" />
      <FaChartBar size={50} color="#6157ff" />
      <FaDollarSign size={50} color="#28a745" />
    </div>
  );
};

export const Card = () => {
  return (
    <Tarjeta />
  )
};
