export function TokenSwatch({
  name,
  token,
  hex,
  border,
}: {
  name: string;
  token: string;
  hex: string;
  border?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-go-border bg-go-paper">
      <div
        className="h-16"
        style={{
          backgroundColor: hex,
          borderBottom: border ? "1px solid var(--color-border)" : undefined,
        }}
      />
      <div className="p-3">
        <p className="text-label text-go-ink">{name}</p>
        <p className="font-mono text-caption text-go-muted">{hex}</p>
        <p className="text-caption text-go-muted">{token}</p>
      </div>
    </div>
  );
}
