interface IGradientOrbProps {
  className?: string;
  color?: string;
  size?: string;
}

const GradientOrb = ({
  className = '',
  color = '#8b5cf6',
  size = '400px',
}: IGradientOrbProps) => {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
      }}
    />
  );
};

export { GradientOrb };
