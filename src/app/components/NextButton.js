import {FaArrowRight } from "react-icons/fa";

const NextButton = ({ swiperRef }) => {
  return (
      <FaArrowRight onClick={() => swiperRef.current?.slideNext()} className="arrow-icon"/>
  );
};

export default NextButton;
