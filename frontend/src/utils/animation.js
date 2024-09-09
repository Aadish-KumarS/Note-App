import gsap from "gsap";


export   const slideAnimation = (target, px) => {
  gsap.to( target ,{
    opacity: 1,
    marginTop: px,
  })
}

export const rotateArrow = (target,deg) => {
  gsap.to( target ,{
    opacity: 1,
    rotate: deg,
  })
}

