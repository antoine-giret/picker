export function Avatar({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center rounded-full h-6 w-6 bg-black/5 dark:bg-white/5 shrink-0">
      <span className="text-[0.65rem]/1">{text.substring(0, 2)}</span>
    </div>
  );
}
