interface AdSlotProps {
  className?: string;
}

export default function AdSlot({ className = '' }: AdSlotProps) {
  return (
    <div className={`adsbygoogle ${className}`}>
      <div className="bg-zinc-100 border border-zinc-200 rounded-lg p-8 text-center text-zinc-400 text-sm">
        <p>广告位 · AdSense</p>
      </div>
    </div>
  );
}
