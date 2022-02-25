const main = async () => {
  const intro = document.querySelector(".intro");
  const video = intro.querySelector("video");
  const text = document.querySelector("h1");

  let videoDuration = 0;
  let isVideoReady = false;

  video.onloadedmetadata = () => {
    isVideoReady = true;
    videoDuration = video.duration;
  };

  while (!isVideoReady) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const controller = new ScrollMagic.Controller();

  let videoScene = new ScrollMagic.Scene({
    // convert video duration to ms
    duration: videoDuration * 1000,
    triggerElement: intro,
    triggerHook: 0,
  })
    .setPin(intro)
    .addTo(controller);

  const textAnimation = gsap.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

  let textScene = new ScrollMagic.Scene({
    duration: (videoDuration / 3) * 1000,
    triggerElement: intro,
    triggerHook: 0,
  })
    .setTween(textAnimation)
    .addTo(controller);

  // video animation
  let accelerationAmount = 0.1;
  let scrollPos = 0;
  let delay = 0;

  videoScene.on("update", (event) => {
    // get the duration in seconds
    scrollPos = event.scrollPos / 1000;
  });

  setInterval(() => {
    delay += (scrollPos - delay) * accelerationAmount;
    video.currentTime = delay;
    // interval should be close to the frame rate
  }, 33.3);
};

main();
