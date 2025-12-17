import { useState, useEffect } from "react";
import "./App.css";

// Snowflake component for snow animation
const Snowflake = ({ style }) => (
  <div className="snowflake" style={style}>
    ❄
  </div>
);

// Gift Card component
const WishCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="wish-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-glow"></div>
      <div className="card-content">
        <div className="gift-icon">{item.icon}</div>
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
      </div>
      <div className={`sparkles ${isHovered ? "active" : ""}`}>
        <span>✨</span>
        <span>⭐</span>
        <span>✨</span>
      </div>
    </div>
  );
};

function App() {
  const wishItems = [
    {
      id: 1,
      name: "Men's Jackets",
      icon: "🧥",
      description: "Stylish and warm jackets for the winter season",
    },
    {
      id: 2,
      name: "Remote Control JCB",
      icon: "🚜",
      description: "Awesome RC JCB excavator for hours of fun",
    },
    {
      id: 3,
      name: "Remote Control Tractor",
      icon: "🚜",
      description: "Farm-style RC tractor with realistic sounds",
    },
    {
      id: 4,
      name: "Remote Control Train",
      icon: "🚂",
      description: "Classic RC train set with tracks and accessories",
    },
    {
      id: 5,
      name: "Boys Kids Ray-Ban Sunglasses",
      icon: "🕶️",
      description: "Cool Ray-Ban style sunglasses for kids",
    },
    {
      id: 6,
      name: "Remote Control Lorry",
      icon: "🚛",
      description: "Big RC truck/lorry with working lights",
    },
  ];

  const [snowflakes, setSnowflakes] = useState([]);

  // Generate snowflakes
  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 10,
      animationDelay: Math.random() * 5,
      fontSize: 10 + Math.random() * 20,
      opacity: 0.5 + Math.random() * 0.5,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="app">
      {/* Snow Animation */}
      <div className="snow-container">
        {snowflakes.map((flake) => (
          <Snowflake
            key={flake.id}
            style={{
              left: `${flake.left}%`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
              fontSize: `${flake.fontSize}px`,
              opacity: flake.opacity,
            }}
          />
        ))}
      </div>

      {/* Decorative lights */}
      <div className="lights-container">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="light-bulb"
            style={{
              animationDelay: `${i * 0.2}s`,
              backgroundColor: [
                "#ff6b6b",
                "#4ecdc4",
                "#ffe66d",
                "#95e1d3",
                "#f38181",
              ][i % 5],
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <div className="santa-hat">🎅</div>
        <h1 className="title">
          <span className="title-icon">🎄</span>
          Arulraj V Wish List
          <span className="title-icon">🎄</span>
        </h1>
        <p className="subtitle">
          Dear Santa, here's what I'm wishing for this Christmas!
        </p>
        <div className="ornaments">
          <span className="ornament">🔔</span>
          <span className="ornament">⭐</span>
          <span className="ornament">🎁</span>
          <span className="ornament">🦌</span>
          <span className="ornament">🔔</span>
        </div>
      </header>

      {/* Wish Cards Grid */}
      <main className="wishes-container">
        <div className="wishes-grid">
          {wishItems.map((item, index) => (
            <WishCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>🎄 Merry Christmas & Happy Holidays! 🎄</p>
        <div className="footer-icons">
          <span>❄️</span>
          <span>🎁</span>
          <span>🦌</span>
          <span>🎅</span>
          <span>🎁</span>
          <span>❄️</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
