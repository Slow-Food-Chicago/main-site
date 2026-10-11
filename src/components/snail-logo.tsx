import logo from "../assets/white_snail.png";

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
          {/* <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            
          </span> */}
        </div>
      )}
    </div>
  );
}

export function ChicagoStar({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-10 -10 20 20"
      className={"inline-block text-snail-red fill-current"}
    >
      <path d="M0 -9 L2.5 -2.8 L9 -4.5 L4.5 0.5 L9 5.5 L2.5 3.8 L0 10 L-2.5 3.8 L-9 5.5 L-4.5 0.5 L-9 -4.5 L-2.5 -2.8 Z" />
    </svg>
  );
}