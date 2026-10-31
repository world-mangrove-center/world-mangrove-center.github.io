import type { KnowledgePageContent } from './types'
import { images } from '~/utils/images'

const t = (en: string, id: string) => ({ en, id })

export const ethnobiology: KnowledgePageContent = {
  eyebrow: t('Ethnobiology', 'Etnobiologi'),
  title: t('Ethnobiology & Traditional Knowledge', 'Etnobiologi & Pengetahuan Tradisional'),
  lead: t(
    'Generations of Irarutu, Kuri and other coastal clans have learned how to eat, build, heal and fish with the mangroves. We document this knowledge with the communities — and on their terms.',
    'Turun-temurun, marga-marga Irarutu, Kuri, dan suku pesisir lain belajar cara makan, membangun, mengobati, dan menangkap ikan bersama mangrove. Kami mendokumentasikan pengetahuan ini bersama masyarakat — dan sesuai ketentuan mereka.',
  ),
  image: images.ethnobiologyPage,
  stats: [
    { value: '147', label: t('plant-use records (sample)', 'catatan kegunaan tumbuhan (contoh)') },
    { value: '28', label: t('customary management rules documented (sample)', 'aturan pengelolaan adat terdokumentasi (contoh)') },
    { value: '23', label: t('elder knowledge holders interviewed (sample)', 'tetua pemegang pengetahuan diwawancarai (contoh)') },
    { value: '4', label: t('villages in Babo and Kuri districts (sample)', 'kampung di Distrik Babo dan Kuri (contoh)') },
  ],
  blocks: [
    {
      type: 'prose',
      id: 'why',
      heading: t('Knowledge that lives in people', 'Pengetahuan yang hidup dalam diri manusia'),
      paragraphs: [
        t(
          'Much of what coastal communities know about the mangroves has never been written down: which trees make the strongest house posts, which fruits are safe after soaking, where crabs moult, which creeks to rest. As elders pass away and young people move to town, this knowledge can disappear within one generation.',
          'Banyak pengetahuan masyarakat pesisir tentang mangrove belum pernah ditulis: pohon mana yang terbaik untuk tiang rumah, buah mana yang aman setelah direndam, di mana kepiting berganti kulit, alur mana yang perlu diistirahatkan. Ketika para tetua berpulang dan anak muda pindah ke kota, pengetahuan ini bisa hilang dalam satu generasi.',
        ),
        t(
          'The ethnobiology programme records this knowledge in local languages with Indonesian and English translation, and returns it to the villages as illustrated booklets for schools.',
          'Program etnobiologi merekam pengetahuan ini dalam bahasa daerah dengan terjemahan Indonesia dan Inggris, lalu mengembalikannya ke kampung dalam bentuk buku bergambar untuk sekolah.',
        ),
      ],
    },
    {
      type: 'table',
      id: 'plant-uses',
      heading: t('Traditional uses of mangrove plants', 'Pemanfaatan tradisional tumbuhan mangrove'),
      intro: t('Examples of widely reported uses in the region. Medicinal uses are shown for cultural documentation only.', 'Contoh pemanfaatan yang banyak dilaporkan di wilayah ini. Kegunaan obat ditampilkan hanya sebagai dokumentasi budaya.'),
      italicFirstColumn: true,
      columns: [t('Species', 'Spesies'), t('Part used', 'Bagian'), t('Use', 'Kegunaan'), t('Category', 'Kategori')],
      rows: [
        ['Rhizophora apiculata', t('Trunk, poles', 'Batang, tiang'), t('House posts, jetty piles, firewood and charcoal', 'Tiang rumah, tiang dermaga, kayu bakar, dan arang'), t('Construction & energy', 'Bangunan & energi')],
        ['Rhizophora mucronata', t('Bark', 'Kulit kayu'), t('Tannin to dye and preserve fishing nets', 'Tanin untuk mewarnai dan mengawetkan jaring'), t('Fishing technology', 'Teknologi perikanan')],
        ['Bruguiera gymnorrhiza', t('Propagule', 'Propagul'), t('Soaked and boiled several times, eaten in times of food shortage; today made into flour', 'Direndam dan direbus berkali-kali, dimakan saat paceklik; kini diolah menjadi tepung'), t('Food', 'Pangan')],
        ['Nypa fruticans', t('Leaves, sap', 'Daun, nira'), t('Roof thatch and walls; sap for sugar and vinegar', 'Atap dan dinding; nira untuk gula dan cuka'), t('Construction & food', 'Bangunan & pangan')],
        ['Sonneratia alba', t('Fruit', 'Buah'), t('Eaten fresh or cooked; sour flavouring for fish', 'Dimakan segar atau dimasak; penambah rasa asam untuk ikan'), t('Food', 'Pangan')],
        ['Xylocarpus granatum', t('Seed, bark', 'Biji, kulit kayu'), t('Traditional remedy for stomach complaints', 'Ramuan tradisional untuk sakit perut'), t('Medicine', 'Obat')],
        ['Acanthus ilicifolius', t('Leaves, root', 'Daun, akar'), t('Applied to skin ailments and wounds', 'Dioleskan untuk penyakit kulit dan luka'), t('Medicine', 'Obat')],
        ['Excoecaria agallocha', t('Latex', 'Getah'), t('Known as toxic — irritates eyes and skin; avoided or handled with care', 'Dikenal beracun — mengiritasi mata dan kulit; dihindari atau ditangani hati-hati'), t('Hazard knowledge', 'Pengetahuan bahaya')],
        ['Metroxylon sagu', t('Pith', 'Empulur'), t('Staple starch (papeda); leaves for thatch; sago grubs as protein', 'Pati pokok (papeda); daun untuk atap; ulat sagu sebagai protein'), t('Food & construction', 'Pangan & bangunan')],
      ],
    },
    {
      type: 'cards',
      id: 'animal-knowledge',
      heading: t('Knowledge of animals and seasons', 'Pengetahuan tentang satwa dan musim'),
      columns: 3,
      items: [
        { title: t('Reading the crab moult', 'Membaca masa ganti kulit kepiting'), body: t('Fishers know from tide and moon phase when crabs moult and hide; soft-shell crabs are left alone so they can harden and grow.', 'Nelayan tahu dari pasang dan fase bulan kapan kepiting berganti kulit dan bersembunyi; kepiting cangkang lunak dibiarkan agar mengeras dan tumbuh.') },
        { title: t('Tambelo from fallen logs', 'Tambelo dari batang tumbang'), body: t('Shipworms are harvested from logs that have lain in the mud for months; elders mark logs as belonging to the family that found them.', 'Tambelo dipanen dari batang yang terendam lumpur berbulan-bulan; para tetua menandai batang sebagai milik keluarga yang menemukannya.') },
        { title: t('Bird and tide signs', 'Tanda burung dan pasang'), body: t('The arrival of curlews and whimbrels marks the turn of the season and the start of good shrimp catches near the river mouths.', 'Kedatangan burung gajahan menandai pergantian musim dan awal tangkapan udang yang baik di sekitar muara.') },
      ],
    },
    {
      type: 'steps',
      id: 'method',
      heading: t('How we document — with consent', 'Cara kami mendokumentasikan — dengan persetujuan'),
      items: [
        { title: t('Village agreement', 'Kesepakatan kampung'), body: t('A community meeting agrees on what may be recorded, who owns the recordings and how benefits are shared, before any interview starts.', 'Musyawarah kampung menyepakati apa yang boleh direkam, siapa pemilik rekaman, dan bagaimana manfaat dibagi, sebelum wawancara dimulai.') },
        { title: t('Interviews & walks', 'Wawancara & jelajah'), body: t('Elders lead forest and river walks, naming plants and animals in their language; specimens are vouchered only with permission.', 'Para tetua memimpin jelajah hutan dan sungai sambil menyebut nama tumbuhan dan satwa dalam bahasa daerah; spesimen hanya diambil dengan izin.') },
        { title: t('Community review', 'Tinjauan masyarakat'), body: t('Draft records are read back in the village; anything sacred or sensitive is removed or kept in a restricted archive held by the clan.', 'Draf catatan dibacakan kembali di kampung; apa pun yang sakral atau sensitif dihapus atau disimpan di arsip terbatas milik marga.') },
        { title: t('Return & teaching', 'Pengembalian & pengajaran'), body: t('Approved knowledge goes into school booklets and the Center’s compendium, credited to the clans and knowledge holders.', 'Pengetahuan yang disetujui dimasukkan ke buku sekolah dan kompendium Pusat, dengan menyebut marga dan pemegang pengetahuan.') },
      ],
    },
    {
      type: 'callout',
      id: 'disclaimer',
      tone: 'caution',
      heading: t('Not medical advice', 'Bukan saran medis'),
      body: t(
        'Traditional remedies are documented to respect and safeguard cultural knowledge. Several mangrove plants are toxic when prepared incorrectly; do not use them for self-treatment.',
        'Ramuan tradisional didokumentasikan untuk menghormati dan menjaga pengetahuan budaya. Beberapa tumbuhan mangrove beracun bila diolah dengan cara yang salah; jangan gunakan untuk pengobatan sendiri.',
      ),
    },
    { type: 'related', id: 'research', heading: t('Related research', 'Riset terkait'), tags: ['Ethnobiology', 'TEK', 'Biocultural'] },
  ],
  sources: [
    { label: 'Wikipedia — Irarutu language (Babo, Aroba and Fafurwar districts)', url: 'https://en.wikipedia.org/wiki/Irarutu_language' },
    { label: 'Mongabay Indonesia (2023) — masyarakat pesisir Teluk Bintuni dan pemanfaatan mangrove', url: 'https://mongabay.co.id/2023/03/23/hutan-mangrove-teluk-bintuni-paru-paru-dunia-yang-terluka/' },
  ],
}
