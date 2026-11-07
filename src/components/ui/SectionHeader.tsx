interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlightedText,
  description,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl mb-12 ${
        centered ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-3 bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/20`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans leading-tight">
        {title}{' '}
        {highlightedText && (
          <span className="text-[#00ff66] relative inline-block">
            {highlightedText}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}

