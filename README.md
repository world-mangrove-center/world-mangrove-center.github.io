# World Mangrove Center — Hub Bintuni

Portal internasional dan pusat pengetahuan untuk restorasi keanekaragaman hayati hutan mangrove di Teluk Bintuni, Papua Barat.

**Stack:** [Nuxt 4](https://nuxt.com) (Vue 3, SSR) · Tailwind CSS · [Neon](https://neon.tech) Postgres + [Drizzle ORM](https://orm.drizzle.team) · [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils) · `@nuxtjs/i18n` (EN/ID) · deploy di **Vercel** dari **GitHub**.

```
app/                 Frontend (pages, components, layouts)
  pages/             Rute publik (EN di "/", ID di "/id/…") + /admin
  components/home/   Bagian beranda (Hero, Impact, Mission, Explore, CTA)
  components/admin/  AdminResource — tabel + editor CRUD generik
  utils/sections.ts  Teks halaman yang masih "coming soon"
  utils/images.ts    Semua URL gambar placeholder (ganti di sini)
server/
  api/               Endpoint publik: team, publications, metrics, contact, data-requests
  api/admin/         Endpoint admin (wajib login) — dilindungi server/middleware/admin-auth.ts
  database/          schema.ts, migrations/, seed.ts, seed-data/*.json
i18n/locales/        Teks antarmuka EN & ID
design.md            Sistem desain (palet "Tomorro" hijau hutan)
```

## Data di database

| Tabel | Isi | Dikelola di |
|---|---|---|
| `team_members` | Profil tim & pakar (EN/ID) | `/admin/team` |
| `publications` | Makalah, laporan, dataset | `/admin/publications` |
| `metrics` | Angka "Impact & Scale" + statistik mitra | `/admin/metrics` |
| `contact_messages` | Kiriman formulir `/contact` | `/admin/messages` |
| `data_requests` | Permintaan akses data dari halaman Research | `/admin/data-requests` |
| `admin_users` | Akun admin (password di-hash scrypt) | lewat `npm run db:seed` |

## Pengembangan lokal

```bash
npm install
cp .env.example .env        # isi DATABASE_URL (bisa branch "dev" di Neon), NUXT_APP_SECRET, ADMIN_*
npm run db:setup            # migrasi + isi data awal + buat admin pertama
npm run dev                 # http://localhost:3000  ·  admin: http://localhost:3000/admin
```

Tips: buat **branch Neon** terpisah (mis. `dev`) supaya eksperimen lokal tidak menyentuh data produksi.

Mengubah skema: edit `server/database/schema.ts` → `npm run db:generate` → commit file SQL baru di `server/database/migrations/` → `npm run db:migrate`.

## Deploy: GitHub → Vercel + Neon

1. **Push** repo ini ke GitHub (`world-mangrove-center/world-mangrove-center.github.io`).
2. Di **Vercel** → *Add New Project* → impor repo tersebut. Framework terdeteksi otomatis sebagai Nuxt.
3. Di proyek Vercel → *Storage* → **Connect Database → Neon** (atau buat proyek di neon.tech, region **AWS ap-southeast-1 / Singapore**). Integrasi ini mengisi `DATABASE_URL` dan `DATABASE_URL_UNPOOLED`. Aktifkan opsi *preview branches* agar tiap Preview Deployment memakai branch database sendiri.
4. Tambahkan Environment Variables di Vercel:
   - `NUXT_APP_SECRET` — `openssl rand -base64 32`
   - `NUXT_PUBLIC_SITE_URL` — domain final, mis. `https://worldmangrovecenter.org`
5. **Deploy.** Perintah build (`npm run vercel-build`) menjalankan migrasi lebih dulu, lalu `nuxt build`.
6. Buat admin pertama sekali saja dari komputer Anda (memakai URL Neon produksi):
   ```bash
   DATABASE_URL="<url neon produksi>" ADMIN_EMAIL="anda@domain.org" ADMIN_PASSWORD="<min. 10 karakter>" npm run db:seed
   ```
7. (Opsional) Hubungkan domain kustom di Vercel → *Settings → Domains*.

Setiap push ke `main` = deploy produksi; setiap pull request = Preview Deployment. Workflow `.github/workflows/ci.yml` menguji build + migrasi di Postgres sementara.

> Situs lama di GitHub Pages: workflow Pages sudah dihapus. Matikan juga di GitHub → *Settings → Pages* (Source: *None*) supaya `world-mangrove-center.github.io` tidak menayangkan versi lama. Bila ingin alamat itu tetap hidup, buat repo kecil berisi redirect ke domain Vercel.

## Catatan

- Gambar masih memakai URL generator AI eksternal dari situs lama (`app/utils/images.ts`, kolom `image_url` di DB). Ganti dengan foto asli — simpan di `public/images/` atau CDN — lalu perbarui lewat admin.
- Respons API publik di-cache 60 detik per instance; perubahan dari admin langsung membersihkan cache instance tersebut.
- Formulir publik dilindungi validasi, honeypot, dan batas 3 kiriman / 10 menit per email.
