import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectorArrays } from "@/types/SelectorArrays";

type Props = {
  label: string;
  placeholder: string;
  arrayOfValues: SelectorArrays[];
  setValue: (value: string) => void;
  value?: string | null;
};

export function Selector({ label, placeholder, arrayOfValues, setValue, value }: Props) {
  return (
    <Select value={value ?? undefined} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {arrayOfValues.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
