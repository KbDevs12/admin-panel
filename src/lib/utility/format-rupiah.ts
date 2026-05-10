export function FormatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

export function FormatRupiahV2(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace(".0", "")}jt`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1).replace(".0", "")}rb`;
  }
  return amount.toString();
}
