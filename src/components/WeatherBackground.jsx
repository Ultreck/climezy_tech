import React, { useEffect, useState } from "react";

const WeatherBackground = ({ weatherCondition, children }) => {
  const [clouds, setClouds] = useState([]);
  const [rain, setRain] = useState([]);
  const [snow, setSnow] = useState([]);
  const [sun, setSun] = useState(false);
  const [stars, setStars] = useState([]);

  // Initialize weather elements based on condition
  useEffect(() => {
    // Clear all elements first
    setClouds([]);
    setRain([]);
    setSnow([]);
    setSun(false);
    setStars([]);

    // Create elements based on weather condition
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        setSun(true);
        // Create some stars for night time
        if (Math.random() > 0.5) {
          const newStars = Array(15)
            .fill()
            .map((_, i) => ({
              id: i,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              size: `${Math.random() * 10 + 10}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
            }));
          setStars(newStars);
        }
        break;
      case "clouds":
      case "broken clouds":
        const newClouds = Array(5)
          .fill()
          .map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`,
            size: `${Math.random() * 10 + 20}px`,
            speed: `${Math.random() * 10 + 10}s`,
            opacity: Math.random() * 0.7 + 0.3,
          }));
        setClouds(newClouds);
        break;
      case "rain":
        setClouds(
          Array(4)
            .fill()
            .map((_, i) => ({
              id: i,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}%`,
              size: `${Math.random() * 10 + 20}px`,
              speed: `${Math.random() * 30 + 20}s`,
              opacity: Math.random() * 0.7 + 0.3,
              dark: true,
            }))
        );
        const newRain = Array(60)
          .fill()
          .map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            speed: `${Math.random() * 0.5 + 0.5}s`,
            length: `${Math.random() * 8 + 8}px`,
            angle: Math.random() * 10 + 80,
          }));
        setRain(newRain);
        break;
      case "snow":
        setClouds(
          Array(3)
            .fill()
            .map((_, i) => ({
              id: i,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}%`,
              size: `${Math.random() * 10 + 20}px`,
              speed: `${Math.random() * 50 + 30}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }))
        );
        const newSnow = Array(30)
          .fill()
          .map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            speed: `${Math.random() * 10 + 5}s`,
            size: `${Math.random() * 4 + 2}px`,
            sway: Math.random() * 50 + 25,
          }));
        setSnow(newSnow);
        break;
      default:
        setSun(true);
        const defaultClouds = Array(3)
          .fill()
          .map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`,
            size: `${Math.random() * 10 + 20}px`,
            speed: `${Math.random() * 50 + 30}s`,
            opacity: Math.random() * 0.7 + 0.3,
          }));
        setClouds(defaultClouds);
    }
  }, [weatherCondition]);

  const getBackgroundGradient = () => {
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        return "bg-gradient-to-b from-blue-600 to-blue-800";
      case "clouds":
      case "broken clouds":
        return "bg-gradient-to-b from-slate-600 to-slate-800";
      case "rain":
        return "bg-gradient-to-b from-slate-600 to-slate-800";
      case "snow":
        return "bg-gradient-to-b from-blue-400 to-blue-700";
      default:
        return "bg-gradient-to-b from-blue-600 to-blue-800";
    }
  };

  return (
    <div
      className={`relative w-full  max-w-3xl h-56 shadow-lg mx-auto rounded-xl overflow-hidden ${getBackgroundGradient()}`}
    >
      <div className="text absolute w-full mb-6 h-full">{children}</div>
      {/* Sun */}
      {/* {sun && (
        <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50 animate-pulse"></div>
      )} */}

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDelay} infinite alternate`,
          }}
        ></div>
      ))}

      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`absolute rounded-full ${
            cloud.dark ? "bg-gray-600" : "bg-white"
          } shadow-lg`}
          style={{
            left: cloud.left,
            top: cloud.top,
            width: cloud.size,
            height: cloud.size,
            opacity: cloud.opacity,
            animation: `moveLeftRight ${cloud.speed} linear infinite`,
          }}
        ></div>
      ))}

      {/* Rain */}
      {rain.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-blue-300"
          style={{
            left: drop.left,
            top: drop.top,
            width: "1px",
            height: drop.length,
            transform: `rotate(${drop.angle}deg)`,
            animation: `fall ${drop.speed} linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        ></div>
      ))}

      {/* Snow */}
      {snow.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white shadow-sm"
          style={{
            left: flake.left,
            top: flake.top,
            width: flake.size,
            height: flake.size,
            animation: `fall ${flake.speed} linear infinite, sway ${flake.sway}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      {/* CSS Animations */}
      <style jsx="true">{`
        @keyframes moveLeftRight {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100% + 100px));
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes sway {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(10px);
          }
        }
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default WeatherBackground;
