import { ChangeEvent } from "react";

interface NumericTaskInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

const NumericTaskInput = ({
  label,
  value,
  min = 0,
  max,
  step = 1,
  onChange,
}: NumericTaskInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value);
    onChange(Number.isFinite(parsed) ? parsed : min);
  };

  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink/80">
      {label}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="rounded-lg border border-ink/20 bg-white px-3 py-2"
      />
    </label>
  );
};

export default NumericTaskInput;
