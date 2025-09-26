import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SelectorArrays } from "@/types/SelectorArrays";

type Props = {
  label: string;
  placeholder: string;
  arrayOfValues: SelectorArrays[];
  setValue: (value: string) => void;
};

export function Selector({ label, placeholder, arrayOfValues, setValue }: Props) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {arrayOfValues.map((values) => (
            <SelectItem key={values.value} value={values.value} onClick={() => setValue(values.value)}>
              {values.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
