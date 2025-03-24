import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type";

import chatBg1 from "../assets/chat-bg1.png";
import chatBg2 from "../assets/chat-bg2.png";
import chatBg3 from "../assets/chat-bg3.png";
import chatBg4 from "../assets/chat-bg4.png";
import chatBg5 from "../assets/chat-bg5.png";
import { div } from "framer-motion/client";
gsap.registerPlugin(Observer);

const sections = [
  {
    text: "Start Chat🚀 Now!",
    bg: chatBg1,
  },
  {
    text: "Here to assist you anytime!⏳",
    bg: chatBg2,
  },
  {
    text: "Smooth, interactive experience✨",
    bg: chatBg3,
  },
  {
    text: "I’m Your AI Sidekick!",
    bg: chatBg4,
  },
  {
    text: "Smart AI Chatbot",
    bg: chatBg5,
  },
];


const AnimatedSections = () => {
  const sectionRefs = useRef([]);
  let currentIndex = -1;
  let animating = false;

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);

    const goToSection = (index, direction) => {
      if (animating) return;
      animating = true;
      index = (index + sections.length) % sections.length;
      let fromTop = direction === -1;
      let dFactor = fromTop ? -1 : 1;
      let tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => (animating = false),
      });

      if (currentIndex >= 0) {
        gsap.set(sectionRefs.current[currentIndex], { zIndex: 0 });
        tl.to(sectionRefs.current[currentIndex], { opacity: 0 });
      }
      
      gsap.set(sectionRefs.current[index], { zIndex: 1, opacity: 1 });
      tl.fromTo(
        sectionRefs.current[index],
        { yPercent: 100 * dFactor },
        { yPercent: 0 },
        0
      );
      new SplitType(sectionRefs.current[index].querySelector("h2"));

      currentIndex = index;
    };

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => goToSection(currentIndex - 1, -1),
      onUp: () => goToSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    goToSection(0, 1);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black text-white font-serif">
      <header className="fixed top-0 w-full flex justify-between items-center p-10 z-10 text-sm tracking-wider uppercase">
        <div>IIT-INDORE</div>
        <div>
          <a href="https://codepen.io/BrianCross/pen/PoWapLP" className="text-white"></a>
        </div>
      </header>
      {sections.map((section, i) => (
        <section
          key={i}
          ref={(el) => (sectionRefs.current[i] = el)}
          className="absolute inset-0 flex justify-center items-center opacity-0"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url(${section.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h2 className="text-5xl tracking-widest uppercase text-gray-300">{section.text}</h2>
        </section>
      ))}
    </div>
  );
};

export default AnimatedSections;
