import type { KnowledgePageContent } from './types'
import { images } from '~/utils/images'

const t = (en: string, id: string) => ({ en, id })

export const livelihood: KnowledgePageContent = {
  eyebrow: t('Socio-Economics', 'Sosio-Ekonomi'),
  title: t('Sustainable Livelihoods & Fisheries', 'Mata Pencaharian & Perikanan Berkelanjutan'),
  lead: t(
    'Shrimp, mud crab and fish from the mangroves are the main source of cash for coastal households. Our work helps fishers earn more from each kilogram while keeping stocks healthy.',
    'Udang, kepiting bakau, dan ikan dari mangrove adalah sumber uang tunai utama rumah tangga pesisir. Kerja kami membantu nelayan mendapat lebih banyak dari setiap kilogram sambil menjaga stok tetap sehat.',
  ),
  image: images.livelihoodPage,
  mapLink: { to: '/map?f=kampung-bintuni', label: t('Partner villages on the map', 'Kampung mitra di peta') },
  stats: [
    { value: t('2,764 t', '2.764 t'), label: t('capture fisheries production (2016), mostly shrimp', 'produksi perikanan tangkap (2016), didominasi udang') },
    { value: '57%', label: t('of fishers reported declining catches (2017 survey)', 'nelayan melaporkan tangkapan menurun (survei 2017)') },
    { value: t('Rp 75,000', 'Rp 75.000'), label: t('top shrimp price per kg at landing (2017)', 'harga udang tertinggi per kg di pendaratan (2017)') },
    { value: '312', label: t('households in partner programmes (sample)', 'rumah tangga dalam program mitra (contoh)') },
  ],
  blocks: [
    {
      type: 'prose',
      id: 'context',
      heading: t('An economy built on the mangroves', 'Ekonomi yang bertumpu pada mangrove'),
      paragraphs: [
        t(
          'A baseline survey in 2017 found that most coastal households depend on shrimp, mud crab and fish as their main income. Most fishers use small boats without engines or with outboard motors, and gillnets and bottom longlines are the most common gear.',
          'Survei data dasar tahun 2017 menemukan bahwa sebagian besar rumah tangga pesisir bergantung pada udang, kepiting bakau, dan ikan sebagai penghasilan utama. Kebanyakan nelayan memakai perahu tanpa mesin atau bermesin tempel, dengan jaring insang dan rawai dasar sebagai alat tangkap paling umum.',
        ),
        t(
          'Although total production rose, 57% of fishers said their own catch was falling — because there are more fishers, fishing grounds are further away and industrial activity has grown around the bay. Livelihood work therefore has to raise income per catch, not the size of the catch.',
          'Meskipun produksi total naik, 57% nelayan menyatakan hasil tangkapan mereka sendiri menurun — karena jumlah nelayan bertambah, lokasi tangkap makin jauh, dan aktivitas industri di sekitar teluk meningkat. Karena itu, program mata pencaharian harus menaikkan pendapatan per tangkapan, bukan jumlah tangkapan.',
        ),
      ],
    },
    {
      type: 'cards',
      id: 'livelihoods',
      heading: t('Household livelihood portfolio', 'Portofolio mata pencaharian rumah tangga'),
      intro: t('Most families combine several of these activities across the year.', 'Kebanyakan keluarga menggabungkan beberapa kegiatan ini sepanjang tahun.'),
      columns: 3,
      items: [
        { title: t('Shrimp fishing', 'Menangkap udang'), body: t('Banana prawn and greasyback shrimp caught with gillnets in the bay; sold fresh to collectors and cold storage in Bintuni.', 'Udang jerbung dan udang dogol ditangkap dengan jaring insang di teluk; dijual segar ke pengepul dan gudang pendingin di Bintuni.'), tags: [t('Main cash income', 'Pendapatan tunai utama')] },
        { title: t('Mud crab trapping', 'Menangkap kepiting bakau'), body: t('Traps (bubu) and hooks set among the roots at low tide; live crabs fetch the best prices.', 'Bubu dan pengait dipasang di sela akar saat surut; kepiting hidup dihargai paling tinggi.'), tags: [t('High value', 'Bernilai tinggi')] },
        { title: t('Fishing for barramundi & snapper', 'Memancing kakap'), body: t('Bottom longlines along channels and river mouths, mostly for local markets.', 'Rawai dasar di sepanjang alur dan muara, sebagian besar untuk pasar lokal.') },
        { title: t('Sago and gardens', 'Sagu dan kebun'), body: t('Sago from the back-swamps and small gardens of tubers, bananas and vegetables provide food security.', 'Sagu dari rawa belakang dan kebun kecil umbi, pisang, serta sayur menjamin ketahanan pangan.'), tags: [t('Food security', 'Ketahanan pangan')] },
        { title: t('Processing & crafts', 'Pengolahan & kerajinan'), body: t('Women’s cooperatives make Nypa sugar, lindur flour and noken for sale in town.', 'Koperasi perempuan membuat gula nipah, tepung lindur, dan noken untuk dijual di kota.') },
        { title: t('Wage work & services', 'Kerja upahan & jasa'), body: t('Seasonal labour, boat transport, tour guiding and work linked to the gas and construction sectors.', 'Kerja musiman, jasa angkut perahu, pemanduan wisata, dan pekerjaan terkait sektor gas dan konstruksi.') },
      ],
    },
    {
      type: 'steps',
      id: 'programmes',
      heading: t('Programme models', 'Model program'),
      items: [
        {
          title: t('Village crab collection points', 'Titik pengumpulan kepiting kampung'),
          body: t('Cooperatives buy crab directly from fishers, grade it by size and sex, release undersized and egg-bearing crabs, and sell graded batches to buyers in Bintuni and Sorong. Fishers receive a better price and the stock is protected.', 'Koperasi membeli kepiting langsung dari nelayan, menyortirnya menurut ukuran dan jenis kelamin, melepas kepiting kecil dan betina bertelur, lalu menjual kelompok tersortir ke pembeli di Bintuni dan Sorong. Nelayan mendapat harga lebih baik dan stok terlindungi.'),
        },
        {
          title: t('“Mangrove Mothers” cooperatives', 'Koperasi “Mama-Mama Mangrove”'),
          body: t('Five women-led groups process NTFPs, keep shared books and run savings-and-loan circles so members can buy nets and equipment without high-interest credit.', 'Lima kelompok yang dipimpin perempuan mengolah HHBK, mengelola pembukuan bersama, dan menjalankan arisan simpan-pinjam agar anggota bisa membeli jaring dan peralatan tanpa kredit berbunga tinggi.'),
        },
        {
          title: t('Paid community restoration', 'Restorasi berbasis upah masyarakat'),
          body: t('Village nurseries grow Rhizophora and Bruguiera seedlings; families are paid per surviving seedling after 12 months, not per seedling planted.', 'Persemaian kampung menumbuhkan bibit Rhizophora dan Bruguiera; keluarga dibayar per bibit yang hidup setelah 12 bulan, bukan per bibit yang ditanam.'),
        },
        {
          title: t('Fisher logbooks & data return', 'Buku catatan nelayan & pengembalian data'),
          body: t('Fishers record catch and effort; every quarter the results are shown back in the village so communities can set their own closures and limits.', 'Nelayan mencatat hasil tangkapan dan upaya; setiap triwulan hasilnya dipaparkan kembali di kampung agar masyarakat dapat menetapkan sendiri penutupan dan batasan.'),
        },
      ],
    },
    {
      type: 'table',
      id: 'calendar',
      heading: t('Seasonal calendar', 'Kalender musim'),
      intro: t('Indicative pattern compiled from community workshops (sample data).', 'Pola indikatif hasil lokakarya masyarakat (data contoh).'),
      columns: [t('Period', 'Periode'), t('Weather', 'Cuaca'), t('Main activities', 'Kegiatan utama')],
      rows: [
        [t('Dec – Mar', 'Des – Mar'), t('North-west monsoon, heavy rain, rough outer bay', 'Musim barat, hujan lebat, teluk luar berombak'), t('Fishing close to the forest edge; crab trapping; sago processing', 'Menangkap di dekat tepi hutan; memasang bubu kepiting; mengolah sagu')],
        [t('Apr – May', 'Apr – Mei'), t('Transition, calmer seas', 'Pancaroba, laut lebih tenang'), t('Peak shrimp gillnetting; Nypa tapping', 'Puncak jaring udang; menyadap nipah')],
        [t('Jun – Sep', 'Jun – Sep'), t('South-east trade winds, drier', 'Angin pasat tenggara, lebih kering'), t('Longline fishing; garden clearing; seedling collection for nurseries', 'Memancing rawai; membuka kebun; mengumpulkan bibit untuk persemaian')],
        [t('Oct – Nov', 'Okt – Nov'), t('Transition', 'Pancaroba'), t('Shrimp and crab; mangrove fruiting — lindur flour production; birdwatching season', 'Udang dan kepiting; mangrove berbuah — produksi tepung lindur; musim pengamatan burung')],
      ],
    },
    {
      type: 'table',
      id: 'indicators',
      heading: t('Programme indicators', 'Indikator program'),
      intro: t('Partner villages, baseline 2023 vs. 2026 (sample data).', 'Kampung mitra, baseline 2023 vs. 2026 (data contoh).'),
      columns: [t('Indicator', 'Indikator'), t('Baseline 2023', 'Baseline 2023'), '2026', t('Change', 'Perubahan')],
      rows: [
        [t('Average price received for crab (Rp/kg)', 'Rata-rata harga kepiting diterima (Rp/kg)'), t('62,000', '62.000'), t('96,000', '96.000'), '+55%'],
        [t('Undersized crabs in landed catch', 'Kepiting di bawah ukuran dalam tangkapan'), '38%', '12%', t('−26 points', '−26 poin')],
        [t('Households with savings-group membership', 'Rumah tangga anggota kelompok simpan-pinjam'), '41', '186', '+145'],
        [t('Seedling survival after 12 months', 'Bibit yang hidup setelah 12 bulan'), '54%', '78%', t('+24 points', '+24 poin')],
        [t('Women in cooperative leadership roles', 'Perempuan di posisi pengurus koperasi'), '9', '23', '+14'],
      ],
    },
    { type: 'related', id: 'research', heading: t('Related research', 'Riset terkait'), tags: ['Socio-Economics', 'Gender', 'NTFP'] },
  ],
  sources: [
    { label: 'Laporan Survei Data Dasar Teluk Bintuni (2017) — Ekologi, Perikanan, dan Status Sosial Masyarakat', url: 'https://www.yumpu.com/en/document/view/63229004/teluk-bintuni-baseline-survey-report-id' },
    { label: 'Pranata et al. (2025) — Aspek biologi kepiting bakau di perairan Teluk Bintuni', url: 'https://journalpasca.unipa.ac.id/index.php/cs/article/view/300' },
  ],
}
