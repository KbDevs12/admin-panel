"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";

interface FormattedDateProps {
  date: string | Date;
  formatStr?: string;
}

export function FormattedDate({
  date,
  formatStr = "dd MMM yyyy",
}: FormattedDateProps) {
  return <span>{format(new Date(date), formatStr, { locale: id })}</span>;
}
