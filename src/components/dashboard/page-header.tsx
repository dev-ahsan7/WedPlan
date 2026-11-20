type PageHeaderProps = {
  title: string;
  text?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, text, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {text && <p className="mt-2 text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
