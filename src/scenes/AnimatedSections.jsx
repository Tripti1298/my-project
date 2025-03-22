import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type";

gsap.registerPlugin(Observer);

const sections = [
  {
    text: "Scroll down",
    bg: "https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    text: "Animated with GSAP",
    bg: "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    text: "GreenSock",
    bg: "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    text: "Animation platform",
    bg: "https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920",
  },
  {
    text: "Keep scrolling",
    bg: "https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75w=1920",
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
      <header className="fixed top-0 w-full flex justify-between items-center p-5 z-10 text-sm tracking-wider uppercase">
        <div>Animated Sections</div>
        <div>
          <a href="https://codepen.io/BrianCross/pen/PoWapLP" className="text-white">Original By Brian</a>
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
