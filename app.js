// Test if our JS file is properly linked to the HTML File
// console.log(123);

// Grabbing the target elements from the HTML File
const list = document.querySelector(".gallery-carousel__img-container--list");
const imgs = Array.from(list.children);
const nextButton = document.querySelector(".gallery-carousel__btn--right");
const prevButton = document.querySelector(".gallery-carousel__btn--left");
const carouselNav = document.querySelector(".gallery-carousel__nav");
const dots = Array.from(carouselNav.children);

// console.log(list);
// console.log(imgs);
// console.log(nextButton);
// console.log(prevButton);
// console.log(carouselNav);

// Getting the width of our images
// const imgWidth = imgs[0].getBoundingClientRect();
// const imgWidth = imgs[0].getBoundingClientRect().height;
const imgWidth = imgs[0].getBoundingClientRect().width;
// console.log(imgWidth);

// Arranging the images next to one another
// function setImgPosition(img, index) {
//   img.style.left = imgWidth * index + "px";
// }

// Arrow Function
const setImgPosition = (img, index) => {
  img.style.left = imgWidth * index + "px";
};
imgs.forEach(setImgPosition);

// moveToImg Function
const moveToImg = (list, currentImg, targetImg) => {
  list.style.transform = "translateX(-" + targetImg.style.left + ")";
  currentImg.classList.remove("current--img");
  targetImg.classList.add("current--img");
};

// Updating the color of the dots on click
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current--img");
  targetDot.classList.add("current--img");
};

// Hide/Show Arrows
const hideShowArrows = (imgs, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  } else if (targetIndex === imgs.length - 1) {
    prevButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
};

/* 
--------*-*-*-*-*-*-*-*-*-*-*-*-*-*-*---------------------------------------------------
When we click on the right button, move images to the left
-----------*-*--*-*-*-*-*-*-*--*-*-*-*-*------------------------------------------------
*/

nextButton.addEventListener("click", (e) => {
  const currentImg = list.querySelector(".current--img");
  const nextImg = currentImg.nextElementSibling;
  const currentDot = carouselNav.querySelector(".current--img");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = imgs.findIndex((img) => img === nextImg);

  moveToImg(list, currentImg, nextImg);
  updateDots(currentDot, nextDot);
  hideShowArrows(imgs, prevButton, nextButton, nextIndex);
});

/* 
--------*-*-*-*-*-*-*-*-*-*-*-*-*-*-*---------------------------------------------------
When we click on the left button, move images to the right
-----------*-*--*-*-*-*-*-*-*--*-*-*-*-*------------------------------------------------
*/

prevButton.addEventListener("click", (e) => {
  const currentImg = list.querySelector(".current--img");
  const prevImg = currentImg.previousElementSibling;
  const currentDot = carouselNav.querySelector(".current--img");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = imgs.findIndex((img) => img === prevImg);

  moveToImg(list, currentImg, prevImg);
  updateDots(currentDot, prevDot);
  hideShowArrows(imgs, prevButton, nextButton, prevIndex);
});

/* 
--------*-*-*-*-*-*-*-*-*-*-*-*-*-*-*---------------------------------------------------
When we click on the Carousel Nav, switch the images
-----------*-*--*-*-*-*-*-*-*--*-*-*-*-*------------------------------------------------
*/

carouselNav.addEventListener("click", (e) => {
  // what dot was clicked on
  // const targetDot = e;
  // console.log(targetDot.target);
  const targetDot = e.target.closest("button");
  // console.log(targetDot);
  if (!targetDot) return;

  const currentImg = list.querySelector(".current--img");
  const currentDot = carouselNav.querySelector(".current--img");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetImg = imgs[targetIndex];

  moveToImg(list, currentImg, targetImg);
  updateDots(currentDot, targetDot);
  hideShowArrows(imgs, prevButton, nextButton, targetIndex);
});
