import { useState } from 'react';


const HeartAnimation = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleHeart = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <div className="stage">
      <div
        className={`heart ${isActive ? 'is-active' : ''}`}
        onClick={toggleHeart}
      ></div>
    </div>
  );
};

export default HeartAnimation;
