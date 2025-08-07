import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { MultiSelect } from "./multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const TextField = ({
  className,
  label,
  ...props
}: React.ComponentProps<"input"> & {
  label?: string;
}) => {
  const field = useFieldContext<string>();
  const [inputType, setInputType] = useState<string | undefined>(props.type);

  return (
    <div className={cn("grid gap-2.5", className)}>
      {label && (
        <Label
          className={cn(
            field.state.meta.errorMap.onSubmit && "text-destructive",
          )}
          htmlFor={props.id}
        >
          {label}
        </Label>
      )}
      <div className="flex gap-2.5">
        <Input
          aria-invalid={!!field.state.meta.errorMap.onSubmit}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          id={props.id}
          {...props}
          type={inputType}
        />
        {props.type === "password" && (
          <Button
            onClick={() => {
              if (inputType === "password") {
                setInputType("text");
              } else {
                setInputType("password");
              }
            }}
            type="button"
            variant={"outline"}
            size={"icon"}
          >
            {inputType === "password" ? <Eye /> : <EyeClosed />}
          </Button>
        )}
      </div>
      {field.state.meta.errorMap.onSubmit && (
        <Label className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </Label>
      )}
    </div>
  );
};

export const SelectField = ({
  className,
  label,
  multiple,
  options,
  placeholder,
  ...props
}: React.ComponentProps<"input"> & {
  label?: string;
  multiple?: boolean;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}) => {
  const field = useFieldContext<string | string[]>();

  return (
    <div className={cn("grid gap-2.5", className)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      {multiple
        ? (
          <MultiSelect
            aria-invalid={!!field.state.meta.errorMap.onSubmit}
            placeholder={placeholder}
            onValueChange={field.handleChange}
            defaultValue={field.state.value as string[]}
            options={options}
          />
        )
        : (
          <Select
            onValueChange={field.handleChange}
            value={field.state.value as string}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem value={option.value}>
                  {option.icon && <option.icon />} {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      {field.state.meta.errorMap.onSubmit && (
        <Label className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </Label>
      )}
    </div>
  );
};

export const DateField = (
  { className, label, ...props }: React.ComponentProps<"input"> & {
    label?: string;
  },
) => {
  const field = useFieldContext<Date>();

  return (
    <div className={cn("grid gap-2.5", className)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!field.state.value}
            className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon />
            {field.state.value
              ? format(field.state.value, "PPP")
              : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            required
            mode="single"
            selected={field.state.value}
            onSelect={field.handleChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const SubmitButton = ({ ...props }: React.ComponentProps<"button">) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} type="submit" {...props} />
      )}
    </form.Subscribe>
  );
};

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, SelectField, DateField },
  formComponents: { SubmitButton },
});
