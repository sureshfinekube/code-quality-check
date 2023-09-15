import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const ParticlesView = () => {
  const particlesInit = async (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -999,
          },
          particles: {
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#bd1bb3",
            },
            shape: {
              type: "polygon",
              polygon: {
                sides: 20,
              },
            },
            opacity: {
              value: 0.02,
              random: {
                enable: true,
                minimumValue: 0.2,
              },
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 5,
              random: {
                enable: true,
                minimumValue: 10,
              },
              anim: {
                enable: false,
                speed: 1,
                size_min: 40,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 200,
              color: "#4d4e4e",
              opacity: 1,
              width: 2,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              attract: {
                enable: false,
                rotateX: 6500,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: false,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                duration: 2,
                size: 10,
                opacity: 0.08,
                speed: 3,
                color: "#4d4e4e",
              },
              repulse: {
                distance: 200,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          background: {
            color: "transparent",
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
        }}
      />
    </div>
  );
};

export default ParticlesView;
