import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import bharatImage from "../assets/Bharat Jain Image.jpg";
import "./styles/OnlinePresence.css";

const platforms = [
  {
    name: "GitHub",
    description: "Explore my code",
    href: "https://github.com/bharatxjain",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    description: "Let's connect",
    href: "https://linkedin.com/in/bharatxjain",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    description: "Follow my journey",
    href: "https://www.instagram.com/bharatxjain/",
    icon: <FaInstagram />,
  },
  {
    name: "YouTube",
    description: "Watch my videos",
    href: "https://www.youtube.com/@bharatxjain",
    icon: <FaYoutube />,
  },
];

const OnlinePresence = () => {
  return (
    <section className="online-presence section-container" id="online-presence">
      <div className="online-presence-container">
        <div className="online-presence-heading">
          <p className="online-presence-eyebrow">Stay connected</p>
          <h2>Online Presence</h2>
          <p className="online-presence-intro">
            Find me online, follow what I&apos;m building, and let&apos;s keep
            learning together.
          </p>
        </div>

        <div className="online-presence-stage">
          <div className="online-presence-ring online-presence-ring-outer" />
          <div className="online-presence-ring online-presence-ring-inner" />

          <div className="online-presence-links">
            {platforms.map((platform) => (
              <a
                className="online-presence-card"
                href={platform.href}
                key={platform.name}
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                <span className="online-presence-icon">{platform.icon}</span>
                <span className="online-presence-card-copy">
                  <strong>{platform.name}</strong>
                  <small>{platform.description}</small>
                </span>
                <span className="online-presence-arrow">↗</span>
              </a>
            ))}
          </div>

          <div className="online-presence-avatar-wrap">
            <div className="online-presence-avatar">
              <img
                src={bharatImage}
                alt="Bharat Jain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlinePresence;
