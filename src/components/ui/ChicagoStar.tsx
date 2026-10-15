export default function ChicagoStar({
  className = '',
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
      className={`inline-block text-snail-red fill-current ${className}`.trim()}
    >
      <path d="M0 -9 L2.5 -2.8 L9 -4.5 L4.5 0.5 L9 5.5 L2.5 3.8 L0 10 L-2.5 3.8 L-9 5.5 L-4.5 0.5 L-9 -4.5 L-2.5 -2.8 Z" />
    </svg>
  );
}
