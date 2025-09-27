import { Button } from "@/components/ui/button"

type Props = {
  buttonLabel: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function ClearButton({ buttonLabel, onClick, variant }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button onClick={onClick} variant={variant}>{buttonLabel}</Button>
    </div>
  )
}
