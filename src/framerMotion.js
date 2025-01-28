export const fadeIn = (direction = "up", distance = 50, delay = 0, duration= 0.8,) => {
  
    return {
      hidden: {
        x:
          direction === "left"
            ? -distance
            : direction === "right"
            ? distance
            : 0,
        y:
          direction === "up"
            ? distance
            : direction === "down"
            ? -distance
            : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration,
          delay,
        },
      },
    };
  };

 export const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
 
 export const slideVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  