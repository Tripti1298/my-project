import gsap from 'gsap';

export const animateChatbox = (chatbox) => {
  if (chatbox) {
    gsap.fromTo(chatbox, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
  }
};