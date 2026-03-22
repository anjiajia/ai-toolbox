interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ title, subtitle, center }: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
      {subtitle && <p className="text-zinc-500 mt-2">{subtitle}</p>}
    </div>
  );
}
