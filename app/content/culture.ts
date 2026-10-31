import type { KnowledgePageContent } from './types'
import { images } from '~/utils/images'

const t = (en: string, id: string) => ({ en, id })

export const culture: KnowledgePageContent = {
  eyebrow: t('Socio-Economics', 'Sosio-Ekonomi'),
  title: t('Culture & Indigenous Heritage', 'Budaya & Warisan Adat'),
  lead: t(
    'Teluk Bintuni is known as the Land of Seven Tribes. Each tribe has its own language, clans and customary territory, from the coastal swamps to the interior forests — and each has rules for how land and sea may be used.',
    'Teluk Bintuni dikenal sebagai Tanah Tujuh Suku. Setiap suku memiliki bahasa, marga, dan wilayah adatnya sendiri, dari rawa pesisir hingga hutan pedalaman — dan masing-masing punya aturan tentang cara tanah dan laut boleh dimanfaatkan.',
  ),
  image: images.culture,
  mapLink: { to: '/map?f=kampung-babo', label: t('Partner villages on the map', 'Kampung mitra di peta') },
  stats: [
    { value: '7', label: t('tribes recognised as customary law communities', 'suku diakui sebagai masyarakat hukum adat') },
    { value: '24', label: t('districts in the regency', 'distrik di kabupaten') },
    { value: '8', label: t('partner villages around the bay (sample)', 'kampung mitra di sekitar teluk (contoh)') },
    { value: '2', label: t('major language groups: Austronesian and Papuan', 'kelompok bahasa utama: Austronesia dan Papua') },
  ],
  blocks: [
    {
      type: 'prose',
      id: 'land-of-seven-tribes',
      heading: t('The Land of Seven Tribes', 'Tanah Tujuh Suku'),
      paragraphs: [
        t(
          'The regency recognises seven tribes as customary law communities: Wamesa, Kuri, Irarutu, Sebyar, Sumuri, Sough and Moskona. Each tribe is made up of clans (marga) that hold rights over a defined customary territory, including its forests, rivers and fishing grounds.',
          'Kabupaten mengakui tujuh suku sebagai masyarakat hukum adat: Wamesa, Kuri, Irarutu, Sebyar, Sumuri, Sough, dan Moskona. Setiap suku terdiri atas marga-marga yang memegang hak atas wilayah adat tertentu, termasuk hutan, sungai, dan wilayah tangkapnya.',
        ),
        t(
          'Oral histories describe the Wamesa as seafarers who read stars and currents, the Kuri and Irarutu as keepers of the coastal swamps and sago, the Sebyar and Sumuri as people of the southern shores, and the Moskona and Sough as forest people of the interior.',
          'Cerita lisan menggambarkan Wamesa sebagai pelaut yang mahir membaca bintang dan arus, Kuri dan Irarutu sebagai penjaga rawa pesisir dan sagu, Sebyar dan Sumuri sebagai masyarakat pesisir selatan, serta Moskona dan Sough sebagai masyarakat hutan di pedalaman.',
        ),
      ],
    },
    {
      type: 'table',
      id: 'tribes',
      heading: t('The seven tribes', 'Tujuh suku'),
      columns: [t('Tribe', 'Suku'), t('Main areas', 'Wilayah utama'), t('Language family', 'Rumpun bahasa'), t('Relationship with the mangroves', 'Hubungan dengan mangrove')],
      rows: [
        ['Wamesa', t('North-east of the bay (Wamesa District)', 'Timur laut teluk (Distrik Wamesa)'), t('Austronesian', 'Austronesia'), t('Sea travel, fishing and trade along the coast', 'Pelayaran, penangkapan ikan, dan perdagangan pesisir')],
        ['Kuri', t('Kuri District (e.g. Sarbe)', 'Distrik Kuri (mis. Sarbe)'), t('Austronesian, close to Irarutu', 'Austronesia, dekat dengan Irarutu'), t('Mud-crab grounds managed through customary permits', 'Wilayah tangkap kepiting dikelola lewat izin adat')],
        ['Irarutu', t('Babo, Aroba and Fafurwar Districts', 'Distrik Babo, Aroba, dan Fafurwar'), t('Austronesian', 'Austronesia'), t('Sago gardens, crab and shrimp fishing on the southern shore', 'Dusun sagu, tangkapan kepiting dan udang di pesisir selatan')],
        ['Sebyar', t('Aranday, Tomu and Kamundan Districts', 'Distrik Aranday, Tomu, dan Kamundan'), t('Papuan (Arandai)', 'Papua (Arandai)'), t('Estuary fishing on the south-western coast', 'Perikanan muara di pesisir barat daya')],
        ['Sumuri', t('Sumuri District (Tofoi, Tanah Merah)', 'Distrik Sumuri (Tofoi, Tanah Merah)'), t('Papuan', 'Papua'), t('Coastal gardens and fishing near the river mouths', 'Kebun pesisir dan perikanan di dekat muara')],
        ['Sough', t('Interior highlands', 'Dataran tinggi pedalaman'), t('Papuan (East Bird’s Head)', 'Papua (Kepala Burung Timur)'), t('Upstream forests that feed the bay’s rivers', 'Hutan hulu yang mengaliri sungai-sungai ke teluk')],
        ['Moskona', t('Moskona Districts and interior forests', 'Distrik-distrik Moskona dan hutan pedalaman'), t('Papuan (East Bird’s Head)', 'Papua (Kepala Burung Timur)'), t('Forest custodians; several clans have formal recognition of their customary forest', 'Penjaga hutan; beberapa marga telah mendapat pengakuan resmi atas hutan adatnya')],
      ],
      note: t('Areas are simplified; customary boundaries are defined by the clans themselves.', 'Wilayah disederhanakan; batas adat ditentukan oleh marga masing-masing.'),
    },
    {
      type: 'cards',
      id: 'customary-governance',
      heading: t('Customary governance', 'Tata kelola adat'),
      columns: 2,
      items: [
        {
          title: t('Clan territories (hak ulayat)', 'Wilayah marga (hak ulayat)'),
          body: t('Land, forest and water belong to clans. Anyone harvesting — including researchers and companies — needs permission from the clan that owns the area.', 'Tanah, hutan, dan perairan dimiliki marga. Siapa pun yang memanfaatkan — termasuk peneliti dan perusahaan — perlu izin dari marga pemilik wilayah.'),
        },
        {
          title: t('Customary fishing permits', 'Izin tangkap adat'),
          body: t('In Kuri villages such as Sarbe, the customary council (LMA) issues permits for crab fishing and limits the number of outside fishers to keep the stock healthy.', 'Di kampung Kuri seperti Sarbe, Lembaga Masyarakat Adat (LMA) menerbitkan izin penangkapan kepiting dan membatasi jumlah nelayan dari luar agar stok tetap sehat.'),
        },
        {
          title: t('Seasonal closures', 'Penutupan musiman'),
          body: t('Some clans close selected creeks for several months so that crabs and shellfish can recover, reopening them with a shared harvest (documented in sample villages).', 'Beberapa marga menutup alur tertentu selama beberapa bulan agar kepiting dan kerang pulih, lalu membukanya kembali dengan panen bersama (terdokumentasi di kampung contoh).'),
        },
        {
          title: t('Legal recognition', 'Pengakuan hukum'),
          body: t('A regional regulation recognises the seven tribes as customary law communities, and the regent has issued decrees recognising the customary territories of several Moskona clans.', 'Peraturan daerah mengakui ketujuh suku sebagai masyarakat hukum adat, dan bupati telah menerbitkan SK pengakuan wilayah adat bagi beberapa marga Suku Moskona.'),
        },
      ],
    },
    {
      type: 'cards',
      id: 'heritage',
      heading: t('Living heritage', 'Warisan yang hidup'),
      columns: 3,
      items: [
        { title: 'Noken', body: t('String bags knotted from bark fibre, carried by women for gardens, markets and babies; inscribed by UNESCO in 2012.', 'Tas rajut dari serat kulit kayu yang dibawa perempuan ke kebun, pasar, dan untuk menggendong bayi; ditetapkan UNESCO pada 2012.') },
        { title: t('Sago culture', 'Budaya sagu'), body: t('Felling, pounding and washing sago is shared family work, and papeda remains the centre of everyday meals and ceremonies.', 'Menebang, menokok, dan meramas sagu adalah kerja bersama keluarga, dan papeda tetap menjadi pusat makanan sehari-hari maupun upacara.') },
        { title: t('Navigation knowledge', 'Pengetahuan navigasi'), body: t('Reading stars, winds and tidal currents to travel the bay by canoe is still taught by elders to young fishers.', 'Membaca bintang, angin, dan arus pasang untuk menjelajahi teluk dengan perahu masih diajarkan para tetua kepada nelayan muda.') },
      ],
    },
    {
      type: 'callout',
      id: 'fpic',
      tone: 'info',
      heading: t('Free, prior and informed consent', 'Persetujuan atas dasar informasi di awal tanpa paksaan'),
      body: t(
        'All Hub Bintuni fieldwork on customary land starts with a village meeting and written consent from the clan heads. Communities can stop a study at any time, and results are presented back in the village before publication.',
        'Semua kerja lapangan Hub Bintuni di tanah adat diawali musyawarah kampung dan persetujuan tertulis dari kepala marga. Masyarakat dapat menghentikan penelitian kapan saja, dan hasilnya dipaparkan kembali di kampung sebelum dipublikasikan.',
      ),
    },
    { type: 'related', id: 'research', heading: t('Related research', 'Riset terkait'), tags: ['Ethnobiology', 'TEK', 'Socio-Economics'] },
  ],
  sources: [
    { label: 'Wikipedia — List of ethnic groups of West Papua (Teluk Bintuni)', url: 'https://en.wikipedia.org/wiki/List_of_ethnic_groups_of_West_Papua' },
    { label: 'GNFI (2026) — Teluk Bintuni, Tanah Tujuh Suku', url: 'https://www.goodnewsfromindonesia.id/2026/06/03/kabupaten-teluk-bintuni-rumah-bagi-ekosistem-mangrove-indonesia-dan-lumbung-gas-nusantara' },
    { label: 'Mongabay Indonesia (2023) — SK pengakuan masyarakat hukum adat marga Suku Moskona', url: 'https://mongabay.co.id/2023/10/16/bupati-teluk-bintuni-keluarkan-sk-pengakuan-masyarakat-adat-langkah-lanjutan/amp/' },
    { label: 'Fahrizal et al. (2021) — Kelembagaan adat Suku Kuri dan perizinan kepiting bakau di Kampung Sarbe', url: 'https://www.ejournal.um-sorong.ac.id/index.php/jrpk/article/download/1271/695/3374' },
    { label: 'Wikipedia — Irarutu language', url: 'https://en.wikipedia.org/wiki/Irarutu_language' },
  ],
}
