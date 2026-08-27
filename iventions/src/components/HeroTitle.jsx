import "./HeroTitle.css";

export default function HeroTitle() {
  return (
    <div className="hero-title-layer">
      <svg
        className="hero-title-svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <text
          x="10"
          y="865"
          className="hero-title-base"
        >
          IVENTIONS
        </text>
      </svg>
    </div>
  );
}