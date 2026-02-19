const DotGrid = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, #262626 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    />
  );
};

export { DotGrid };
