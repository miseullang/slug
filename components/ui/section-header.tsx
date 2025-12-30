type SectionHeaderProps = {
  label: string;
  title: string;
};

export function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-1 shrink-0 py-3 w-fit">
      <span className="text-xs uppercase pl-1 tracking-[0.3em] text-foreground/40">
        {label}
      </span>
      <h2 className="text-3xl">{title}</h2>
    </div>
  );
}
