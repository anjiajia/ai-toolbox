interface TagPillProps {
  label: string;
  variant?: 'default' | 'blue' | 'green' | 'purple';
}

const variants = {
  default: 'bg-zinc-100 text-zinc-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
};

export default function TagPill({ label, variant = 'default' }: TagPillProps) {
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded-full ${variants[variant]}`}>
      {label}
    </span>
  );
}
