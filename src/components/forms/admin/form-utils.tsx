"use client";

import type { ReactNode } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Meta = {
  isTouched: boolean;
  isValid: boolean;
  errors: Array<unknown>;
};

function normalizeErrors(errors: Array<unknown>) {
  return errors.map((error) =>
    typeof error === "object" && error !== null && "message" in error
      ? (error as { message?: string })
      : { message: String(error) },
  );
}

export function fieldInvalid(meta: Meta) {
  return meta.isTouched && !meta.isValid;
}

export function TextField({
  id,
  label,
  type = "text",
  value,
  onBlur,
  onChange,
  meta,
  placeholder,
  disabled,
  min,
}: {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  onBlur: () => void;
  onChange: (value: string) => void;
  meta: Meta;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
}) {
  const isInvalid = fieldInvalid(meta);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
      />
      {isInvalid && <FieldError errors={normalizeErrors(meta.errors)} />}
    </Field>
  );
}

export function NumberField({
  id,
  label,
  value,
  onBlur,
  onChange,
  meta,
  placeholder,
  disabled,
  min,
}: {
  id: string;
  label: string;
  value: number;
  onBlur: () => void;
  onChange: (value: number) => void;
  meta: Meta;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
}) {
  const isInvalid = fieldInvalid(meta);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={id}
        type="number"
        value={Number.isNaN(value) ? "" : value}
        onBlur={onBlur}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
      />
      {isInvalid && <FieldError errors={normalizeErrors(meta.errors)} />}
    </Field>
  );
}

export function TextareaField({
  id,
  label,
  value,
  onBlur,
  onChange,
  meta,
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  meta: Meta;
  placeholder?: string;
  disabled?: boolean;
}) {
  const isInvalid = fieldInvalid(meta);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        name={id}
        value={value}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isInvalid && <FieldError errors={normalizeErrors(meta.errors)} />}
    </Field>
  );
}

export function SelectField({
  id,
  label,
  value,
  onBlur,
  onChange,
  meta,
  disabled,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  meta: Meta;
  disabled?: boolean;
  children: ReactNode;
}) {
  const isInvalid = fieldInvalid(meta);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        name={id}
        value={value}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        aria-invalid={isInvalid}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </select>
      {isInvalid && <FieldError errors={normalizeErrors(meta.errors)} />}
    </Field>
  );
}

export function CheckboxField({
  id,
  label,
  checked,
  onBlur,
  onChange,
  disabled,
}: {
  id: string;
  label: string;
  checked: boolean;
  onBlur: () => void;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Field orientation="horizontal">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
        className="size-4 rounded border border-input accent-primary"
      />
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
    </Field>
  );
}
