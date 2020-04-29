import React, { useRef, useEffect, useState } from "react";

const ImageTogglerOnScroll = ({ primaryImg, secondaryImg }) => {
  const imageRef = useRef(null);
  //由于第一次render的时候会直接先渲染成黑白色，然后才会到useeffect函数执行，给图片上色，我们需要直接上色，不经过黑白设置，在第一次渲染的时候
  const [isLoading, setIsLoading] = useState(true);
  //useEffect like useComponentDidAndWillUnmount
  //useEffect causes side effects
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    setInView(isInView());
    setIsLoading(false);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [isLoading]);
  //图片是否有显示
  const [inView, setInView] = useState(false);
  //计算图片是否出现在视图范围内
  const isInView = () => {
    if (imageRef.current) {
      //getBoundingClientRect() combine size of thw windowdies the trick for us
      const rect = imageRef.current.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };
  //to set the inView state based on whether the img is actually in view.each time the page scrolls it's calculated again
  const scrollHandler = () => {
    setInView(() => {
      return isInView();
    });
  };
  //simple check in our return , which renders the component , and isloading is true , dont render anything
  return isLoading ? null : (
    <img
      src={inView ? secondaryImg : primaryImg}
      alt=""
      ref={imageRef}
      width="200"
      height="200"
    />
  );
};

export default ImageTogglerOnScroll;
