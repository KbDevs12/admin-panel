# Admin Panel - Booking Lapangan Futsal

Admin panel berbasis Next.js untuk mengelola sistem booking lapangan futsal.

Admin panel ini terhubung ke backend Go melalui REST API dan digunakan oleh admin/superadmin untuk mengelola booking, pembayaran, field, schedule field, user, report, notification, dan akun admin.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack React Form
- TanStack React Table
- Zod
- Sonner Toast
- Recharts
- Lucide React
- shadcn-style components

## Struktur Folder

```bash
.
├── public
├── src
│   ├── actions
│   │   ├── admin
│   │   ├── auth
│   │   └── dashboard
│   ├── app
│   │   ├── (auth)
│   │   └── (dashboard)
│   ├── components
│   │   ├── forms
│   │   ├── layouts
│   │   ├── shared
│   │   ├── table
│   │   └── ui
│   ├── hooks
│   ├── lib
│   │   ├── api
│   │   ├── auth
│   │   ├── navigation
│   │   ├── utility
│   │   └── validations
│   └── types
├── package.json
└── tsconfig.json
```

## Fitur

### Auth

- Login admin.
- Session admin menggunakan cookie.
- Refresh session otomatis jika token expired.
- Redirect ke login jika session tidak valid.

### Dashboard

- Statistik booking.
- Statistik revenue.
- Pending booking/payment.
- Chart revenue.

### Booking

- Lihat semua booking.
- Buat booking dari admin panel.
- Lihat detail booking.
- Update status booking.

### Payment

- Lihat semua payment.
- Lihat detail payment.
- Konfirmasi pembayaran.
- Reject pembayaran.
- Lihat bukti pembayaran.

### Field / Lapangan

- Lihat semua field.
- Buat field baru.
- Lihat detail field.
- Edit field.
- Disable/delete field.
- Kelola schedule khusus per field.

### Schedule Field

Schedule field dikelola dari halaman detail field.

Flow:

```bash
Fields -> All Fields -> pilih field -> Detail Field
```

Di halaman detail field ada:

- form `Tambah / Update Jadwal Khusus`
- tabel `Jadwal Khusus`
- tombol hapus schedule override

Default field menggunakan jam:

```bash
08:00 - 23:00
```

Admin hanya perlu membuat schedule jika ada jadwal khusus pada tanggal tertentu.

Contoh penggunaan:

- Field buka lebih siang pada tanggal tertentu.
- Field tutup lebih awal pada tanggal tertentu.
- Field tutup full day pada tanggal tertentu.
- Hapus schedule override agar kembali ke jam default.

### User

- Lihat semua user.
- Lihat detail user.
- Update data user.
- Delete user.

### Admin Account

Khusus role `superadmin`:

- Lihat semua admin.
- Buat admin.
- Update admin.
- Delete admin.

### Report

- Report harian.
- Report berdasarkan range tanggal.

### Notification

- Lihat notifikasi sistem.

## Requirements

- Node.js
- npm
- Backend API berjalan
- Akun admin/superadmin yang valid

## Environment Variables

Buat file `.env.local` di root project.

Contoh:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Jika backend berjalan melalui Ngrok:

```env
NEXT_PUBLIC_API_URL=https://your-ngrok-domain.ngrok-free.app
```

Penting: jangan tambahkan `/api/v1` di `NEXT_PUBLIC_API_URL`, karena endpoint di project sudah menyertakan prefix `/api/v1`.

Benar:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Salah:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## Instalasi

```bash
npm install
```

## Menjalankan Development Server

```bash
npm run dev
```

Default URL:

```bash
http://localhost:3000
```

## Build Production

```bash
npm run build
```

## Start Production

```bash
npm run start
```

## Lint

```bash
npm run lint
```

## Routes Halaman

### Auth

```bash
/login
```

### Dashboard

```bash
/dashboard
```

### Bookings

```bash
/bookings
/bookings/create
/bookings/[id]
```

### Payments

```bash
/payments
/payments/[bookingId]
```

### Fields

```bash
/fields
/fields/create
/fields/[id]
```

Schedule field berada di:

```bash
/fields/[id]
```

### Users

```bash
/users
/users/[id]
```

### Admin Accounts

Khusus superadmin:

```bash
/admins
/admins/create
```

### Reports

```bash
/reports
```

### Notifications

```bash
/notifications
```

## API Integration

Semua endpoint backend didefinisikan di:

```bash
src/lib/api/endpoint.ts
```

API helper berada di:

```bash
src/lib/api/server.ts
```

Session helper berada di:

```bash
src/lib/auth/session.ts
```

## Schedule Field di Admin Panel

File terkait:

```bash
src/app/(dashboard)/fields/[id]/page.tsx
src/components/forms/admin/FieldForms.tsx
src/components/table/field-schedules-table.tsx
src/actions/admin/fields.ts
src/lib/api/endpoint.ts
src/lib/validations/admin.schema.ts
src/types/admin.ts
```

### Tambah / Update Jadwal Khusus

Input yang tersedia:

- `date`
- `open_time`
- `close_time`
- `is_closed`

Jika `is_closed` dicentang, field dianggap tutup full day pada tanggal tersebut.

### Hapus Jadwal Khusus

Di tabel `Jadwal Khusus`, klik tombol `Hapus`.

Setelah dihapus, field kembali memakai default:

```bash
08:00 - 23:00
```

## Role

### Admin

Admin bisa mengelola:

- Dashboard
- Bookings
- Payments
- Fields
- Field schedules
- Users
- Reports
- Notifications

### Superadmin

Superadmin punya akses admin biasa ditambah:

- Admin Accounts

## Catatan Field Type

Saat ini field type sengaja dibatasi ke:

```bash
futsal
```

Enum ini tetap dipertahankan supaya nanti jika tempat expand ke tipe lapangan lain, struktur datanya masih siap dikembangkan.

## Troubleshooting

### Tidak bisa login

Cek:

- Backend berjalan.
- `NEXT_PUBLIC_API_URL` benar.
- Akun admin ada di database.
- Firebase user valid.
- Token belum expired.

### Data tidak muncul

Cek:

- Backend API bisa diakses dari browser/server.
- Cookie session tersedia.
- Token admin valid.
- Role user adalah `admin` atau `superadmin`.

### Schedule tidak muncul

Cek:

- Masuk ke halaman detail field: `/fields/[id]`.
- Schedule hanya muncul jika ada override di tabel `schedules`.
- Jika belum ada override, field tetap memakai default `08:00-23:00`.
