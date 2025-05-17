import { FaArrowLeft } from "react-icons/fa";

const PrevButton = ({ swiperRef }) => {
  return (
    <FaArrowLeft onClick={() => swiperRef.current?.slidePrev()} className="arrow-icon"/>
  );
};

export default PrevButton;
