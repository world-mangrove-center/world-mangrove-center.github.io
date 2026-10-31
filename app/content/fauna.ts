import type { KnowledgePageContent } from './types'
import { images } from '~/utils/images'

const t = (en: string, id: string) => ({ en, id })

export const fauna: KnowledgePageContent = {
  eyebrow: t('Biology', 'Biologi'),
  title: t('Fauna & Aquatic Life', 'Fauna & Kehidupan Akuatik'),
  lead: t(
    'From mud crabs and banana prawns to saltwater crocodiles and migratory curlews, the mangroves of Bintuni Bay feed both wildlife and the coastal economy.',
    'Dari kepiting bakau dan udang jerbung hingga buaya muara dan burung gajahan migran, mangrove Teluk Bintuni menghidupi satwa liar sekaligus ekonomi pesisir.',
  ),
  image: images.faunaPage,
  mapLink: { to: '/map?f=jalur-survei-sungai-utama', label: t('See the survey transect on the map', 'Lihat transek survei di peta') },
  stats: [
    { value: '103', label: t('bird species recorded in mangrove surveys', 'spesies burung tercatat dalam survei mangrove') },
    { value: '3', label: t('mud crab species (Scylla) in the catch', 'spesies kepiting bakau (Scylla) dalam tangkapan') },
    { value: t('2,764 t', '2.764 t'), label: t('capture fisheries landings in 2016, mostly shrimp', 'produksi perikanan tangkap 2016, didominasi udang') },
    { value: '14', label: t('migratory shorebird species counted (sample data)', 'spesies burung pantai migran terhitung (data contoh)') },
  ],
  blocks: [
    {
      type: 'prose',
      id: 'nursery',
      heading: t('A nursery for the bay', 'Tempat asuhan bagi teluk'),
      paragraphs: [
        t(
          'Mangrove roots slow the water, trap leaf litter and offer shelter from predators. Larvae of prawns and fish drift in on the tide, grow up among the roots and move to the open bay as adults. This is why the most valuable fisheries in Bintuni — shrimp, mud crab and barramundi — depend directly on intact mangroves.',
          'Akar mangrove memperlambat arus, menangkap serasah daun, dan menjadi tempat berlindung dari pemangsa. Larva udang dan ikan terbawa pasang ke dalam hutan, tumbuh di sela akar, lalu bergerak ke teluk terbuka saat dewasa. Karena itulah perikanan paling bernilai di Bintuni — udang, kepiting bakau, dan kakap — bergantung langsung pada mangrove yang utuh.',
        ),
        t(
          'Studies in logged and intact forest recorded 103 bird species, 9 reptiles and 7 mammals in the mangroves alone. Fauna was often more abundant in young regrowth than in old stands, which shows that well-managed regeneration can recover habitat quickly.',
          'Penelitian di hutan bekas tebangan dan hutan utuh mencatat 103 spesies burung, 9 reptil, dan 7 mamalia di kawasan mangrove saja. Satwa sering lebih melimpah di hutan muda dibanding tegakan tua, menunjukkan bahwa regenerasi yang dikelola baik dapat memulihkan habitat dengan cepat.',
        ),
      ],
    },
    {
      type: 'cards',
      id: 'crustaceans',
      heading: t('Crustaceans & molluscs', 'Krustasea & moluska'),
      columns: 3,
      items: [
        {
          title: t('Banana prawn', 'Udang jerbung'),
          subtitle: 'Penaeus merguiensis',
          body: t('The dominant commercial shrimp. Juveniles live in mangrove creeks; adults are caught with gillnets in the bay.', 'Udang komersial utama. Juvenil hidup di alur mangrove; dewasanya ditangkap dengan jaring insang di teluk.'),
          tags: [t('Fisheries', 'Perikanan')],
        },
        {
          title: t('Greasyback shrimp', 'Udang dogol'),
          subtitle: 'Metapenaeus ensis',
          body: t('Second most important shrimp in local landings, common in muddy estuaries.', 'Udang terpenting kedua dalam hasil tangkapan lokal, umum di muara berlumpur.'),
          tags: [t('Fisheries', 'Perikanan')],
        },
        {
          title: t('Mud crabs', 'Kepiting bakau'),
          subtitle: 'Scylla serrata, S. olivacea, S. tranquebarica',
          body: t('Caught with traps and hooks among roots. High value live trade; national minimum-size rules and customary permits apply.', 'Ditangkap dengan bubu dan pengait di sela akar. Bernilai tinggi dalam perdagangan hidup; berlaku aturan ukuran minimum nasional dan izin adat.'),
          tags: [t('Fisheries', 'Perikanan'), t('Customary rules', 'Aturan adat')],
        },
        {
          title: t('Sesarmid crabs', 'Kepiting sesarmid'),
          subtitle: 'Parasesarma spp.',
          body: t('Small leaf-eating crabs that process fallen litter and recycle nutrients — vital ecosystem engineers.', 'Kepiting kecil pemakan daun yang mengurai serasah dan mendaur ulang nutrien — perekayasa ekosistem yang penting.'),
          tags: [t('Ecosystem function', 'Fungsi ekosistem')],
        },
        {
          title: t('Mangrove whelks', 'Siput bakau'),
          subtitle: 'Telescopium telescopium, Terebralia palustris',
          body: t('Large snails on the mud surface, gathered as food by women and children at low tide.', 'Siput besar di permukaan lumpur, dikumpulkan sebagai pangan oleh perempuan dan anak-anak saat surut.'),
          tags: [t('Food', 'Pangan')],
        },
        {
          title: t('Shipworm (tambelo)', 'Tambelo'),
          subtitle: 'Bactronophorus thoracites',
          body: t('A wood-boring bivalve living in rotting mangrove logs, eaten fresh by coastal communities in Papua.', 'Kerang pengebor kayu yang hidup di batang mangrove lapuk, dimakan segar oleh masyarakat pesisir Papua.'),
          tags: [t('Food', 'Pangan'), t('Culture', 'Budaya')],
        },
      ],
    },
    {
      type: 'cards',
      id: 'fish',
      heading: t('Fish of the estuary', 'Ikan muara'),
      columns: 3,
      items: [
        {
          title: t('Barramundi', 'Kakap putih'),
          subtitle: 'Lates calcarifer',
          body: t('Prized catch that uses mangrove creeks as nursery and feeding grounds; caught with bottom longlines and gillnets.', 'Tangkapan bernilai tinggi yang memakai alur mangrove sebagai tempat asuhan dan mencari makan; ditangkap dengan rawai dasar dan jaring insang.'),
        },
        {
          title: t('Mangrove red snapper', 'Kakap merah bakau'),
          subtitle: 'Lutjanus argentimaculatus',
          body: t('Juveniles shelter in root tangles before moving offshore.', 'Juvenil berlindung di sela akar sebelum pindah ke laut lepas.'),
        },
        {
          title: t('Mudskippers', 'Ikan gelodok'),
          subtitle: 'Periophthalmus, Periophthalmodon',
          body: t('Amphibious fish that breathe air on the mud at low tide; an easy indicator of healthy mudflats.', 'Ikan amfibi yang menghirup udara di atas lumpur saat surut; indikator mudah bagi dataran lumpur yang sehat.'),
        },
        {
          title: t('Archerfish', 'Ikan sumpit'),
          subtitle: 'Toxotes jaculatrix',
          body: t('Shoots jets of water to knock insects off overhanging leaves.', 'Menyemprotkan air untuk menjatuhkan serangga dari daun yang menjuntai.'),
        },
      ],
    },
    {
      type: 'table',
      id: 'birds-reptiles',
      heading: t('Birds, reptiles & mammals', 'Burung, reptil & mamalia'),
      intro: t(
        'Selected species monitored by the Center. Conservation status follows the IUCN Red List; several are also protected under Indonesian law.',
        'Spesies terpilih yang dipantau Pusat. Status konservasi mengikuti Daftar Merah IUCN; beberapa juga dilindungi undang-undang Indonesia.',
      ),
      italicFirstColumn: true,
      columns: [t('Species', 'Spesies'), t('Common name', 'Nama umum'), t('Status', 'Status'), t('Where to look', 'Lokasi pengamatan')],
      rows: [
        ['Numenius madagascariensis', t('Far Eastern Curlew', 'Gajahan timur'), t('Endangered (IUCN)', 'Genting (IUCN)'), t('High-tide roosts on outer mudflats, Sep–Nov', 'Lokasi istirahat saat pasang di dataran lumpur luar, Sep–Nov')],
        ['Numenius phaeopus', t('Whimbrel', 'Gajahan pengala'), t('Least Concern', 'Risiko Rendah'), t('Mudflats and channel edges during migration', 'Dataran lumpur dan tepi alur saat migrasi')],
        ['Ardea sumatrana', t('Great-billed Heron', 'Cangak laut'), t('Least Concern', 'Risiko Rendah'), t('Quiet creeks deep in the forest', 'Alur sepi di dalam hutan')],
        ['Todiramphus saurophagus', t('Beach Kingfisher', 'Cekakak pantai'), t('Least Concern', 'Risiko Rendah'), t('Mangrove edge along the main channels', 'Tepi mangrove di alur utama')],
        ['Haliaeetus leucogaster', t('White-bellied Sea-eagle', 'Elang-laut perut-putih'), t('Least Concern; protected in Indonesia', 'Risiko Rendah; dilindungi di Indonesia'), t('Tall emergent trees near the bay', 'Pohon tinggi dekat teluk')],
        ['Crocodylus porosus', t('Saltwater crocodile', 'Buaya muara'), t('Least Concern; protected in Indonesia', 'Risiko Rendah; dilindungi di Indonesia'), t('Large rivers and creeks — keep distance', 'Sungai dan alur besar — jaga jarak')],
        ['Varanus indicus', t('Mangrove monitor', 'Biawak mangrove'), t('Least Concern', 'Risiko Rendah'), t('Basking on logs and banks', 'Berjemur di batang kayu dan tebing')],
        ['Pteropus spp.', t('Flying foxes', 'Kalong'), t('Varies by species', 'Bervariasi per spesies'), t('Roost colonies in tall mangroves; important pollinators', 'Koloni bertengger di mangrove tinggi; penyerbuk penting')],
      ],
    },
    {
      type: 'callout',
      id: 'safety',
      tone: 'caution',
      heading: t('Crocodile safety', 'Keselamatan dari buaya'),
      body: t(
        'Saltwater crocodiles live throughout the bay. Field teams and visitors should not wade in channels, should avoid cleaning fish at the water’s edge and should always travel with a local guide.',
        'Buaya muara hidup di seluruh teluk. Tim lapangan dan pengunjung tidak boleh menyeberangi alur dengan berjalan kaki, sebaiknya tidak membersihkan ikan di tepi air, dan selalu didampingi pemandu lokal.',
      ),
    },
    {
      type: 'steps',
      id: 'monitoring',
      heading: t('How we monitor fauna', 'Cara kami memantau fauna'),
      items: [
        {
          title: t('Quarterly boat transects', 'Transek perahu triwulanan'),
          body: t('A fixed 30 km route through the main estuary records birds, crocodiles and water quality at the same tide stage each quarter (sample protocol).', 'Rute tetap 30 km melalui muara utama mencatat burung, buaya, dan kualitas air pada fase pasang yang sama setiap triwulan (protokol contoh).'),
        },
        {
          title: t('High-tide shorebird counts', 'Hitungan burung pantai saat pasang tinggi'),
          body: t('Monthly counts at six roost sites during spring tides, contributing data to the East Asian–Australasian Flyway network.', 'Hitungan bulanan di enam lokasi istirahat saat pasang purnama, menyumbang data ke jaringan Jalur Terbang Asia Timur–Australasia.'),
        },
        {
          title: t('Community catch logbooks', 'Buku catatan tangkapan masyarakat'),
          body: t('Partner fishers record species, size and effort for shrimp and crab, showing trends in stock health and the share of undersized catch.', 'Nelayan mitra mencatat spesies, ukuran, dan upaya tangkap udang dan kepiting, sehingga tren kesehatan stok dan porsi tangkapan di bawah ukuran terlihat.'),
        },
      ],
    },
    { type: 'related', id: 'research', heading: t('Related research', 'Riset terkait'), tags: ['Ornithology', 'Shorebirds', 'Biodiversity'] },
  ],
  sources: [
    { label: 'Yudha et al. (2021) — Impact of logging on flora and fauna in the mangrove forests of Bintuni Bay (UGM)', url: 'https://ir.lib.ugm.ac.id/id/eprint/5706' },
    { label: 'Laporan Survei Data Dasar Teluk Bintuni (2017) — perikanan udang, kepiting, dan kakap', url: 'https://www.yumpu.com/en/document/view/63229004/teluk-bintuni-baseline-survey-report-id' },
    { label: 'Pranata et al. (2025) — Aspek biologi kepiting bakau (Scylla sp.) di perairan Teluk Bintuni', url: 'https://journalpasca.unipa.ac.id/index.php/cs/article/view/300' },
  ],
}
