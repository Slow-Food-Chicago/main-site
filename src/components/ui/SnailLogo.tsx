import logo from "../../assets/logos/white_snail.png";

interface SnailLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  /** Background color of the circular badge. Defaults to Snail Red (var(--snail-red)). */
  backgroundColor?: string;
}

export default function SnailLogo({
  size = 36,
  showText = false,
  backgroundColor = "var(--snail-red)",
}: SnailLogoProps) {
  return (
    <div className={"inline-flex items-center gap-2.5"}>
      <div
        className="shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{
          width: size,
          height: size,
          backgroundColor,
          padding: size * 0.14,
        }}
      >
        <img
          src={logo}
          width={size}
          height={size}
          alt="Slow Food Snail of Approval"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-base font-bold tracking-tight text-foreground sm:text-lg">
            Slow Food Chicago
          </span>
        </div>
      )}
    </div>
  );
}
