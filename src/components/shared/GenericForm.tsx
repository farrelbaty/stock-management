/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type Field = {
  name: string;
  label: string;
  typeChamps: "text" | "number" | "textarea" | "select" | "date";
  options?: { value: string; label: string }[];
  required?: boolean;
};

type GenericFormProps = {
  fields: Field[];
  onSubmit: (data: Record<string, any>) => void;
  onSuccess?: () => void;
};

export default function GenericForm({
  fields,
  onSubmit,
  onSuccess,
}: GenericFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm();

  const submitHandler = (data: Record<string, any>) => {
    onSubmit(data);
    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-5">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.typeChamps === "textarea" ? (
            <Textarea
              id={field.name}
              {...register(field.name, { required: field.required })}
            />
          ) : field.typeChamps === "select" && field.options ? (
            <Select onValueChange={(value) => setValue(field.name, value)}>
              <SelectTrigger>
                <SelectValue
                  placeholder={`Sélectionner ${field.label.toLowerCase()}`}
                />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={field.name}
              type={field.typeChamps}
              {...register(field.name, { required: field.required })}
            />
          )}
        </div>
      ))}
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}
