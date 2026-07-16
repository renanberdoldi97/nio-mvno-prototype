export function SuccessIcon({ size = 56 }: { size?: number }) {
  return (
    <div
      className="bg-primary mx-auto"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: 'url(/icons/CheckCircular.svg)',
        maskImage: 'url(/icons/CheckCircular.svg)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
