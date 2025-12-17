import { useState, useEffect } from "react";
import "./App.css";

// Snowflake component for snow animation
const Snowflake = ({ style }) => (
  <div className="snowflake" style={style}>
    ❄
  </div>
);

// Fallback Santa Quotes (used when internet fetch fails)
const fallbackQuotes = [
  { title: "Ho Ho Ho!", message: "Santa loves your wish list! You've been VERY good this year!", icon: "🎅" },
  { title: "Wonderful!", message: "Rudolph and the reindeer are already packing your gifts!", icon: "🦌" },
  { title: "Amazing!", message: "The elves are working overtime just for you!", icon: "🧝" },
  { title: "Fantastic!", message: "Your wishes made Santa do a happy dance!", icon: "💃" },
  { title: "Incredible!", message: "Mrs. Claus said your list is the sweetest she's ever seen!", icon: "🍪" },
  { title: "Spectacular!", message: "Santa just added you to the EXTRA nice list!", icon: "⭐" },
  { title: "Jolly Good!", message: "The North Pole is buzzing with excitement for your gifts!", icon: "🎁" },
  { title: "Merry Wishes!", message: "Santa's sleigh has extra room just for your presents!", icon: "🛷" },
  { title: "Magic!", message: "Christmas magic is making your wishes come true!", icon: "✨" },
  { title: "Hooray!", message: "Even the snowmen are cheering for your wish list!", icon: "⛄" },
];

// Christmas icons for random selection
const christmasIcons = ["🎅", "🦌", "🎄", "🎁", "⭐", "❄️", "🛷", "🧝", "⛄", "🍪", "✨", "🔔"];

// Christmas Countdown component
const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();

      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }

      const difference = christmas - now;

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <h2 className="countdown-title">🎄 Christmas Countdown 🎄</h2>
      <div className="countdown-boxes">
        <div className="countdown-box">
          <span className="countdown-number">{timeLeft.days}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-number">{timeLeft.hours}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-number">{timeLeft.minutes}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-number">{timeLeft.seconds}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

// Gift Card component
const WishCard = ({ item, index, isFavorite, onToggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onToggleFavorite(item.id);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <div
      className={`wish-card ${isFavorite ? "favorite" : ""} ${isClicked ? "clicked" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="card-glow"></div>
      {isFavorite && <div className="favorite-badge">⭐ Most Wanted!</div>}
      <div className="card-content">
        <div className="gift-icon">{item.icon}</div>
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <p className="click-hint">{isFavorite ? "★ Click to unmark" : "☆ Click to mark as Most Wanted"}</p>
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
  const [favorites, setFavorites] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(fallbackQuotes[0]);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Fetch random quote from the internet
  const fetchChristmasMagic = async () => {
    setIsLoading(true);

    try {
      // Try fetching from DummyJSON quotes API
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      if (data && data.quote) {
        // Add Christmas magic to the quote!
        const randomIcon = christmasIcons[Math.floor(Math.random() * christmasIcons.length)];
        const christmasTitles = ["Christmas Wisdom!", "Santa Says...", "Holiday Magic!", "Festive Thought!", "Joyful Message!", "Merry Insight!"];
        const randomTitle = christmasTitles[Math.floor(Math.random() * christmasTitles.length)];

        setCurrentQuote({
          title: randomTitle,
          message: `"${data.quote}" — ${data.author}`,
          icon: randomIcon,
        });
      } else {
        throw new Error("No quote received");
      }
    } catch (error) {
      // Fallback to local Christmas quotes
      console.log("Using fallback quotes:", error);
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setCurrentQuote(randomQuote);
    }

    setIsLoading(false);
    setShowSuccess(true);
  };

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

      {/* Flying Santa Sleigh */}
      <div className="flying-santa">
        <span>🦌🦌🦌</span>
        <span className="sleigh">🛷🎅</span>
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

      {/* Christmas Countdown */}
      <ChristmasCountdown />

      {/* Wish Cards Grid */}
      <main className="wishes-container">
        <div className="wishes-grid">
          {wishItems.map((item, index) => (
            <WishCard
              key={item.id}
              item={item}
              index={index}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </main>

      {/* Receive Christmas Magic Button */}
      <div className="send-section">
        <button className="send-btn" onClick={fetchChristmasMagic} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="btn-icon">✨</span>
              Santa is writing...
              <span className="loading-dots">...</span>
            </>
          ) : (
            <>
              <span className="btn-icon">✨</span>
              Receive Christmas Magic!
              <span className="btn-icon">🎅</span>
            </>
          )}
        </button>
      </div>

      {/* Success Modal with Random Quote */}
      {showSuccess && (
        <div className="success-message" onClick={() => setShowSuccess(false)}>
          <div className="message-content">
            <span className="message-icon">{currentQuote.icon}</span>
            <h2>{currentQuote.title}</h2>
            <p className="quote-message">{currentQuote.message}</p>
            <div className="message-emojis">
              <span>🦌</span>
              <span>🎄</span>
              <span>🎁</span>
              <span>⭐</span>
              <span>❄️</span>
            </div>
            <button className="close-btn">Get More Christmas Magic! ✨</button>
          </div>
        </div>
      )}

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
