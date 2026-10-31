import type { KnowledgePageContent } from './types'
import { images } from '~/utils/images'

const t = (en: string, id: string) => ({ en, id })

export const flora: KnowledgePageContent = {
  eyebrow: t('Biology', 'Biologi'),
  title: t('Flora & Mangrove Ecosystem', 'Flora & Ekosistem Mangrove'),
  lead: t(
    'Bintuni Bay holds one of the largest continuous mangrove forests in Indonesia. Tall Rhizophora and Bruguiera stands line a maze of tidal channels from the open bay to the sago swamps inland.',
    'Teluk Bintuni menyimpan salah satu hutan mangrove utuh terluas di Indonesia. Tegakan Rhizophora dan Bruguiera yang tinggi menjajari labirin saluran pasang surut, dari teluk terbuka hingga rawa sagu di pedalaman.',
  ),
  image: images.flora,
  mapLink: { to: '/map?f=cagar-alam-teluk-bintuni', label: t('See the nature reserve on the map', 'Lihat cagar alam di peta') },
  stats: [
    { value: t('±260,000', '±260.000'), label: t('hectares of mangrove in the regency', 'hektar mangrove di kabupaten') },
    { value: t('8.9%', '8,9%'), label: t("of Indonesia's mangrove area", 'dari luas mangrove Indonesia') },
    { value: '30', label: t('true mangrove species recorded', 'spesies mangrove sejati tercatat') },
    { value: t('124,851', '124.851'), label: t('ha Teluk Bintuni Nature Reserve', 'ha Cagar Alam Teluk Bintuni') },
  ],
  blocks: [
    {
      type: 'prose',
      id: 'overview',
      heading: t('A forest built by the tide', 'Hutan yang dibentuk oleh pasang surut'),
      paragraphs: [
        t(
          'Bintuni Bay is a long, sheltered inlet on the southern side of the Bird’s Head Peninsula. Large rivers carry fine sediment into the bay, and a tidal range of several metres floods the low coast twice a day. This combination of mud, fresh water and tide has produced roughly 260,000 hectares of mangrove — about 8.9% of all mangroves in Indonesia.',
          'Teluk Bintuni adalah teluk panjang dan terlindung di sisi selatan Semenanjung Kepala Burung. Sungai-sungai besar membawa sedimen halus ke teluk, dan pasang surut setinggi beberapa meter merendam pesisir yang landai dua kali sehari. Perpaduan lumpur, air tawar, dan pasang surut inilah yang membentuk sekitar 260.000 hektar mangrove — sekitar 8,9% dari seluruh mangrove Indonesia.',
        ),
        t(
          'Most of the forest is dominated by Rhizophora apiculata, with Bruguiera gymnorrhiza and B. parviflora on firmer ground. The north-eastern part of the bay is protected as the Teluk Bintuni Nature Reserve (about 124,851 ha), while other areas are under customary tenure or production-forest licences.',
          'Sebagian besar hutan didominasi Rhizophora apiculata, dengan Bruguiera gymnorrhiza dan B. parviflora di tanah yang lebih padat. Bagian timur laut teluk dilindungi sebagai Cagar Alam Teluk Bintuni (sekitar 124.851 ha), sementara wilayah lain berada di bawah hak ulayat adat atau izin hutan produksi.',
        ),
      ],
    },
    {
      type: 'steps',
      id: 'zonation',
      heading: t('Zonation from sea to land', 'Zonasi dari laut ke darat'),
      intro: t(
        'Species sort themselves along gradients of flooding, salinity and soil firmness. A typical transect from the bay inland crosses four zones.',
        'Spesies tersebar mengikuti gradien genangan, salinitas, dan kepadatan tanah. Transek khas dari teluk ke darat melintasi empat zona.',
      ),
      items: [
        {
          title: t('Seaward fringe', 'Zona depan (menghadap laut)'),
          subtitle: 'Avicennia marina, Sonneratia alba',
          body: t(
            'Pioneer species colonise newly deposited mudflats. Their pencil-like pneumatophores trap sediment and help the shoreline build outward.',
            'Spesies pionir menempati dataran lumpur yang baru terbentuk. Akar napas berbentuk pensil menangkap sedimen dan membantu garis pantai bertambah ke arah laut.',
          ),
        },
        {
          title: t('Rhizophora zone', 'Zona Rhizophora'),
          subtitle: 'Rhizophora apiculata, R. mucronata',
          body: t(
            'The widest belt, flooded by most high tides. Stilt roots form dense nursery habitat for shrimp, crabs and juvenile fish. Mature trees here commonly exceed 25 m.',
            'Sabuk terluas yang tergenang pada sebagian besar pasang tinggi. Akar tunjang membentuk habitat asuhan yang rapat bagi udang, kepiting, dan ikan muda. Pohon dewasa di sini umumnya lebih dari 25 m.',
          ),
        },
        {
          title: t('Bruguiera – Ceriops zone', 'Zona Bruguiera – Ceriops'),
          subtitle: 'Bruguiera gymnorrhiza, B. parviflora, Ceriops tagal, Xylocarpus granatum',
          body: t(
            'Firmer, less frequently flooded soils. Knee roots of Bruguiera are typical; Xylocarpus with its large cannonball fruits appears along creek banks.',
            'Tanah lebih padat dan lebih jarang tergenang. Akar lutut Bruguiera menjadi ciri khasnya; Xylocarpus dengan buah besar seperti bola meriam tumbuh di tepi alur sungai.',
          ),
        },
        {
          title: t('Back mangrove & freshwater transition', 'Mangrove belakang & peralihan air tawar'),
          subtitle: 'Nypa fruticans, Heritiera littoralis, Lumnitzera littorea',
          body: t(
            'Where rivers dilute the seawater, Nypa palm stands take over and grade into sago (Metroxylon sagu) swamp forest — a key food source for local communities.',
            'Di tempat air sungai mengencerkan air laut, tegakan nipah mengambil alih dan berangsur menjadi hutan rawa sagu (Metroxylon sagu) — sumber pangan utama masyarakat setempat.',
          ),
        },
      ],
    },
    {
      type: 'table',
      id: 'species',
      heading: t('Key mangrove species', 'Spesies mangrove utama'),
      intro: t(
        'A selection of the 30 true mangrove species recorded in the bay, with Indonesian trade names and their role in the ecosystem.',
        'Sebagian dari 30 spesies mangrove sejati yang tercatat di teluk, beserta nama dagang Indonesia dan perannya dalam ekosistem.',
      ),
      italicFirstColumn: true,
      columns: [t('Species', 'Spesies'), t('Indonesian name', 'Nama Indonesia'), t('Zone', 'Zona'), t('Notes', 'Catatan')],
      rows: [
        ['Rhizophora apiculata', 'Bakau minyak', t('Rhizophora', 'Rhizophora'), t('Dominant canopy species; main focus of carbon plots', 'Spesies kanopi dominan; fokus utama petak karbon')],
        ['Rhizophora mucronata', 'Bakau hitam', t('Rhizophora', 'Rhizophora'), t('Along channel banks; preferred for replanting on soft mud', 'Di tepi alur; disukai untuk penanaman ulang di lumpur lunak')],
        ['Bruguiera gymnorrhiza', 'Tancang / lindur', 'Bruguiera', t('Co-dominant; propagules processed into flour', 'Kodominan; propagul diolah menjadi tepung')],
        ['Bruguiera parviflora', 'Lenggadai', 'Bruguiera', t('Common in regenerating stands', 'Umum di tegakan yang beregenerasi')],
        ['Ceriops tagal', 'Tengar', 'Bruguiera – Ceriops', t('Tannin-rich bark traditionally used for dye', 'Kulit kaya tanin, secara tradisional dipakai untuk pewarna')],
        ['Avicennia marina', 'Api-api putih', t('Seaward fringe', 'Zona depan'), t('Pioneer on new mudflats', 'Pionir di dataran lumpur baru')],
        ['Sonneratia alba', 'Pidada putih', t('Seaward fringe', 'Zona depan'), t('Fruits eaten and made into syrup', 'Buah dimakan dan diolah menjadi sirup')],
        ['Xylocarpus granatum', 'Nyirih', 'Bruguiera – Ceriops', t('Durable timber; seeds used in traditional medicine', 'Kayu awet; biji dipakai dalam pengobatan tradisional')],
        ['Nypa fruticans', 'Nipah', t('Back mangrove', 'Mangrove belakang'), t('Leaves for roof thatch; sap for palm sugar', 'Daun untuk atap; nira untuk gula nipah')],
        ['Ceriops decandra', 'Tengar', 'Bruguiera – Ceriops', t('Considered rare in the bay', 'Tergolong langka di teluk')],
        ['Brownlowia argentata', '—', t('Back mangrove', 'Mangrove belakang'), t('Recently recorded in Bintuni, extending its known range', 'Baru tercatat di Bintuni, memperluas sebaran yang diketahui')],
      ],
    },
    {
      type: 'cards',
      id: 'carbon',
      heading: t('Blue carbon', 'Karbon biru'),
      intro: t(
        'Mangrove soils accumulate organic matter for centuries, which makes them some of the most carbon-dense ecosystems on Earth. Preliminary results from our 24 permanent plots (sample data):',
        'Tanah mangrove menimbun bahan organik selama berabad-abad, menjadikannya salah satu ekosistem paling padat karbon di Bumi. Hasil awal dari 24 petak permanen kami (data contoh):',
      ),
      columns: 3,
      items: [
        {
          title: t('≈ 1,050 Mg C/ha', '≈ 1.050 Mg C/ha'),
          subtitle: t('Total ecosystem carbon, mature stands', 'Total karbon ekosistem, tegakan dewasa'),
          body: t('Trees, roots, dead wood and soil to 1 m depth, averaged across mature Rhizophora plots.', 'Pohon, akar, kayu mati, dan tanah hingga kedalaman 1 m, dirata-ratakan dari petak Rhizophora dewasa.'),
        },
        {
          title: '≈ 75%',
          subtitle: t('Stored in the soil', 'Tersimpan di tanah'),
          body: t('Most carbon sits below ground — and is released when mangroves are cleared or drained.', 'Sebagian besar karbon berada di bawah tanah — dan terlepas saat mangrove ditebang atau dikeringkan.'),
        },
        {
          title: t('12 years', '12 tahun'),
          subtitle: t('Monitoring record', 'Rekaman pemantauan'),
          body: t('Annual DBH, height, mortality and recruitment for 14,400 tagged trees since 2014.', 'Data tahunan DBH, tinggi, kematian, dan rekrutmen untuk 14.400 pohon bertanda sejak 2014.'),
        },
      ],
    },
    {
      type: 'cards',
      id: 'pressures',
      heading: t('Pressures and responses', 'Tekanan dan upaya penanganan'),
      columns: 2,
      items: [
        {
          title: t('Harvesting and gaps', 'Penebangan dan celah tajuk'),
          body: t(
            'Commercial and local cutting opens canopy gaps. Our plots compare natural regeneration in 1-, 10- and 20-year-old gaps with intact forest to guide where planting is actually needed.',
            'Penebangan komersial maupun lokal membuka celah tajuk. Petak kami membandingkan regenerasi alami di celah berumur 1, 10, dan 20 tahun dengan hutan utuh untuk menentukan lokasi yang benar-benar perlu ditanami.',
          ),
          tags: [t('Monitoring', 'Pemantauan')],
        },
        {
          title: t('Abrasion of small islands', 'Abrasi pulau-pulau kecil'),
          body: t(
            'Exposed shores and small islands lose land when fringe trees disappear. Restoration focuses on re-establishing Avicennia and Sonneratia on accreting mud rather than planting on eroding edges.',
            'Pantai terbuka dan pulau kecil kehilangan daratan ketika pohon di garis depan hilang. Restorasi difokuskan pada pemulihan Avicennia dan Sonneratia di lumpur yang sedang bertambah, bukan menanam di tepi yang sedang tergerus.',
          ),
          tags: [t('Restoration', 'Restorasi')],
        },
        {
          title: t('Blocked tidal channels', 'Alur pasang surut tersumbat'),
          body: t(
            'Roads, ponds and log jams cut off tidal flow and kill trees behind them. Reopening channels often restores more forest than planting seedlings.',
            'Jalan, tambak, dan tumpukan kayu memutus aliran pasang surut dan mematikan pohon di belakangnya. Membuka kembali alur sering kali memulihkan hutan lebih luas daripada menanam bibit.',
          ),
          tags: [t('Hydrology', 'Hidrologi')],
        },
        {
          title: t('Coastal development', 'Pembangunan pesisir'),
          body: t(
            'Industrial and settlement growth around the bay increases pressure on the forest edge. Spatial data on this site supports land-use planning with the regency government.',
            'Pertumbuhan industri dan permukiman di sekitar teluk menambah tekanan pada tepi hutan. Data spasial di situs ini mendukung perencanaan tata ruang bersama pemerintah kabupaten.',
          ),
          tags: [t('Policy', 'Kebijakan')],
        },
      ],
    },
    { type: 'related', id: 'research', heading: t('Related research', 'Riset terkait'), tags: ['Blue Carbon', 'Vegetation', 'Rhizophora'] },
  ],
  sources: [
    { label: 'Mongabay Indonesia (2023) — Hutan mangrove Teluk Bintuni, paru-paru dunia yang terluka', url: 'https://mongabay.co.id/2023/03/23/hutan-mangrove-teluk-bintuni-paru-paru-dunia-yang-terluka/' },
    { label: 'Jurnal Ilmu Kehutanan UGM — Mangrove sejati di Teluk Bintuni (catatan Amyema mackayensis & Brownlowia argentata)', url: 'https://journal.ugm.ac.id/v3/jik/article/download/8696/5016' },
    { label: 'Laporan Survei Data Dasar Teluk Bintuni (2017)', url: 'https://www.yumpu.com/en/document/view/63229004/teluk-bintuni-baseline-survey-report-id' },
    { label: 'Wikipedia — Bintuni Bay', url: 'https://en.wikipedia.org/wiki/Bintuni_Bay' },
  ],
}
