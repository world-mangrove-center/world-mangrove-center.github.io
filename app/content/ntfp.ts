import type { KnowledgePageContent } from './types'
import { images } from '~/utils/images'

const t = (en: string, id: string) => ({ en, id })

export const ntfp: KnowledgePageContent = {
  eyebrow: t('NTFP & Ecotourism', 'HHBK & Ekowisata'),
  title: t('Non-Timber Forest Products & Ecotourism', 'Hasil Hutan Bukan Kayu & Ekowisata'),
  lead: t(
    'Mangroves can earn more standing than cut. Community cooperatives turn Nypa sap, mangrove fruit and crab into fair-priced products, and small-group tours bring visitors to the forest with local guides.',
    'Mangrove bisa lebih menguntungkan saat tetap berdiri daripada ditebang. Koperasi masyarakat mengolah nira nipah, buah mangrove, dan kepiting menjadi produk berharga adil, dan wisata kelompok kecil membawa pengunjung ke hutan bersama pemandu lokal.',
  ),
  image: images.ntfpPage,
  mapLink: { to: '/map?f=jalan-papan-mangrove', label: t('Find tour sites on the map', 'Cari lokasi wisata di peta') },
  stats: [
    { value: '6', label: t('product lines from mangrove resources', 'lini produk dari sumber daya mangrove') },
    { value: '5', label: t('women-led cooperatives', 'koperasi yang dipimpin perempuan') },
    { value: '4', label: t('pilot tour packages', 'paket wisata percontohan') },
    { value: '70%', label: t('of tour fees paid to the host community (sample)', 'biaya wisata untuk komunitas tuan rumah (contoh)') },
  ],
  blocks: [
    {
      type: 'prose',
      id: 'approach',
      heading: t('Why NTFPs matter', 'Mengapa HHBK penting'),
      paragraphs: [
        t(
          'For many households around the bay, cash income comes mainly from shrimp and crab. Prices swing with the season and with buyers from outside the regency. Adding value locally — processing, grading, packaging — keeps more of the money in the village and gives families a reason to protect the forest that produces these goods.',
          'Bagi banyak rumah tangga di sekitar teluk, pendapatan tunai terutama berasal dari udang dan kepiting. Harganya naik-turun mengikuti musim dan pembeli dari luar kabupaten. Menambah nilai di tingkat lokal — mengolah, menyortir, mengemas — membuat lebih banyak uang tetap di kampung dan memberi keluarga alasan untuk menjaga hutan yang menghasilkan barang-barang ini.',
        ),
        t(
          'Every product below is harvested under rules agreed with the customary owners (marga) of the area, and cooperatives record volumes so that harvests stay within sustainable limits.',
          'Setiap produk di bawah dipanen dengan aturan yang disepakati bersama pemilik ulayat (marga) setempat, dan koperasi mencatat volume panen agar tetap dalam batas lestari.',
        ),
      ],
    },
    {
      type: 'cards',
      id: 'products',
      heading: t('Product catalogue', 'Katalog produk'),
      intro: t('Indicative prices at the cooperative (sample data, 2026).', 'Harga indikatif di koperasi (data contoh, 2026).'),
      columns: 3,
      items: [
        {
          title: t('Nypa palm sugar', 'Gula nipah'),
          subtitle: 'Nypa fruticans',
          body: t('Sap tapped from the flower stalk is boiled down to a soft brown sugar. One palm can be tapped for months without felling it.', 'Nira dari tangkai bunga dimasak hingga menjadi gula cokelat lembut. Satu pohon dapat disadap berbulan-bulan tanpa ditebang.'),
          meta: t('Rp 45,000 / 500 g', 'Rp 45.000 / 500 g'),
          tags: [t('Year-round', 'Sepanjang tahun')],
        },
        {
          title: t('Lindur fruit flour', 'Tepung buah lindur'),
          subtitle: 'Bruguiera gymnorrhiza',
          body: t('Propagules are soaked and boiled several times to remove tannins, then dried and milled into a gluten-free flour for cakes and noodles.', 'Propagul direndam dan direbus beberapa kali untuk menghilangkan tanin, lalu dikeringkan dan digiling menjadi tepung bebas gluten untuk kue dan mi.'),
          meta: t('Rp 35,000 / 500 g', 'Rp 35.000 / 500 g'),
          tags: [t('Fruiting season', 'Musim berbuah')],
        },
        {
          title: t('Pidada syrup', 'Sirup pidada'),
          subtitle: 'Sonneratia alba',
          body: t('The sour fruit is made into syrup and jam. Only fallen or ripe fruit is collected so seedlings can still establish.', 'Buah yang asam diolah menjadi sirup dan selai. Hanya buah jatuh atau matang yang dikumpulkan agar bibit tetap bisa tumbuh.'),
          meta: t('Rp 30,000 / 330 ml', 'Rp 30.000 / 330 ml'),
          tags: [t('Seasonal', 'Musiman')],
        },
        {
          title: t('Graded live mud crab', 'Kepiting bakau hidup tersortir'),
          subtitle: 'Scylla spp.',
          body: t('Crabs are sorted by size at a village collection point; undersized and egg-bearing females go back to the water. Graded crab fetches a better price than mixed catch.', 'Kepiting disortir menurut ukuran di titik pengumpulan kampung; yang di bawah ukuran dan betina bertelur dilepas kembali. Kepiting tersortir dihargai lebih baik daripada tangkapan campuran.'),
          meta: t('Rp 90,000–140,000 / kg by grade', 'Rp 90.000–140.000 / kg sesuai kelas'),
          tags: [t('Customary permit', 'Izin adat')],
        },
        {
          title: t('Sago starch', 'Pati sagu'),
          subtitle: 'Metroxylon sagu',
          body: t('Harvested from the freshwater swamps behind the mangroves. Sold wet in leaf packages or as dried flour for papeda.', 'Dipanen dari rawa air tawar di belakang mangrove. Dijual basah dalam bungkus daun atau sebagai tepung kering untuk papeda.'),
          meta: t('Rp 25,000 / kg (dry)', 'Rp 25.000 / kg (kering)'),
          tags: [t('Staple food', 'Pangan pokok')],
        },
        {
          title: t('Noken and woven crafts', 'Noken dan anyaman'),
          body: t('Hand-made string bags and mats from bark fibre and Nypa or pandan leaves. Noken is recognised by UNESCO as Intangible Cultural Heritage.', 'Tas tali dan tikar buatan tangan dari serat kulit kayu dan daun nipah atau pandan. Noken diakui UNESCO sebagai Warisan Budaya Takbenda.'),
          meta: t('Rp 150,000–400,000 each', 'Rp 150.000–400.000 / buah'),
          tags: [t('Handicraft', 'Kerajinan')],
        },
      ],
    },
    {
      type: 'cards',
      id: 'tours',
      heading: t('Ecotourism packages', 'Paket ekowisata'),
      intro: t(
        'Small groups only (max. 8 guests), always with a guide from the host village. Prices per person, including boat and guide (sample data).',
        'Hanya kelompok kecil (maks. 8 tamu), selalu bersama pemandu dari kampung tuan rumah. Harga per orang, termasuk perahu dan pemandu (data contoh).',
      ),
      columns: 2,
      items: [
        {
          title: t('Mangrove boardwalk & interpretation trail', 'Jalan papan & jalur interpretasi mangrove'),
          body: t('A 1.2 km walk near Bintuni town through a mature Rhizophora stand, with signs on zonation, roots and carbon. Suitable for families and school groups.', 'Jalan kaki 1,2 km dekat kota Bintuni melalui tegakan Rhizophora dewasa, dengan papan informasi tentang zonasi, akar, dan karbon. Cocok untuk keluarga dan rombongan sekolah.'),
          meta: t('2 hours · Rp 75,000', '2 jam · Rp 75.000'),
          tags: [t('Easy', 'Mudah')],
        },
        {
          title: t('Dawn river safari & birdwatching', 'Susur sungai pagi & pengamatan burung'),
          body: t('Leave at first light by longboat to the viewing platform, timed with the tide. Herons, kingfishers, sea-eagles and, in season, migratory shorebirds.', 'Berangkat saat fajar dengan perahu panjang ke menara pengamatan, disesuaikan dengan pasang surut. Cangak, raja-udang, elang-laut, dan burung pantai migran pada musimnya.'),
          meta: t('5 hours · Rp 450,000', '5 jam · Rp 450.000'),
          tags: [t('Moderate', 'Sedang'), t('Best Sep–Nov', 'Terbaik Sep–Nov')],
        },
        {
          title: t('A day with crab fishers', 'Sehari bersama nelayan kepiting'),
          body: t('Join a Kuri fishing family to set and check traps, learn the customary permit system and the size rules, then cook the catch in the village.', 'Ikut keluarga nelayan Kuri memasang dan memeriksa bubu, belajar sistem izin adat dan aturan ukuran, lalu memasak hasil tangkapan di kampung.'),
          meta: t('2 days / 1 night homestay · Rp 1,250,000', '2 hari / 1 malam di rumah warga · Rp 1.250.000'),
          tags: [t('Cultural', 'Budaya')],
        },
        {
          title: t('From sago to papeda', 'Dari sagu ke papeda'),
          body: t('Visit an Irarutu sago garden, watch the felling, pounding and washing of the pith, and share a papeda meal with yellow fish soup.', 'Kunjungi dusun sagu Irarutu, saksikan penebangan, penokokan, dan peramasan empulur, lalu santap papeda dengan ikan kuah kuning.'),
          meta: t('Full day · Rp 600,000', 'Sehari penuh · Rp 600.000'),
          tags: [t('Cultural', 'Budaya'), t('Food', 'Kuliner')],
        },
      ],
    },
    {
      type: 'steps',
      id: 'visitor-code',
      heading: t('Visitor code of conduct', 'Tata tertib pengunjung'),
      items: [
        { title: t('Ask before you enter', 'Minta izin sebelum masuk'), body: t('All forest and river areas belong to a clan. Tours are arranged through the host village, which collects the customary entry fee.', 'Semua wilayah hutan dan sungai dimiliki marga. Wisata diatur melalui kampung tuan rumah, yang memungut retribusi adat.') },
        { title: t('Follow the tide plan', 'Ikuti jadwal pasang surut'), body: t('Departure times depend on the tide. Guides decide when it is safe to travel and where to land.', 'Waktu berangkat bergantung pada pasang surut. Pemandu yang memutuskan kapan aman untuk berangkat dan di mana boleh mendarat.') },
        { title: t('Take nothing, leave nothing', 'Jangan ambil apa pun, jangan tinggalkan apa pun'), body: t('No collecting of plants, propagules or animals, and carry all rubbish back to town.', 'Dilarang mengambil tumbuhan, propagul, atau satwa, dan bawa kembali semua sampah ke kota.') },
        { title: t('Health and safety', 'Kesehatan dan keselamatan'), body: t('Bintuni is a malaria area: use repellent and long sleeves. Wear the life jacket provided and stay in the boat in crocodile habitat.', 'Bintuni termasuk daerah malaria: gunakan losion antinyamuk dan baju lengan panjang. Kenakan pelampung yang disediakan dan tetap di perahu di habitat buaya.') },
      ],
    },
    { type: 'related', id: 'research', heading: t('Related research', 'Riset terkait'), tags: ['NTFP', 'Gender'] },
  ],
  sources: [
    { label: 'UNESCO — Noken multifunctional knotted or woven bag (Intangible Cultural Heritage, 2012)', url: 'https://ich.unesco.org/en/USL/noken-multifunctional-knotted-or-woven-bag-handcraft-of-the-people-of-papua-00619' },
    { label: 'Fahrizal et al. (2021) — Kepiting bakau Teluk Bintuni: strategi pengelolaan dan perizinan usaha (Kampung Sarbe)', url: 'https://www.ejournal.um-sorong.ac.id/index.php/jrpk/article/download/1271/695/3374' },
  ],
}
