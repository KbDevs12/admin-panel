export function bookingStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending_payment: "Menunggu Bayar",
    paid: "Sudah Dibayar",
    confirmed: "Terkonfirmasi",
    cancelled: "Dibatalkan",
    completed: "Selesai",
  };

  return labels[status] ?? status;
}

export function paymentStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "Pending",
    paid: "Dibayar",
    confirmed: "Terkonfirmasi",
    rejected: "Ditolak",
  };

  return labels[status] ?? status;
}
