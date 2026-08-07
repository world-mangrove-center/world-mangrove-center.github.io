export type TeamCategory = 'researcher' | 'localAdvisor' | 'management' | 'ecologyExpert'

export interface TeamMember {
  id: string
  name: string
  roleKey:
    | 'leadResearcher'
    | 'conservationSpecialist'
    | 'localAdvisor'
    | 'programManager'
    | 'ecologyExpert'
    | 'communityLiaison'
  categories: TeamCategory[]
  image: string
  bio: { en: string; id: string }
  shortBio: { en: string; id: string }
  expertise: string[]
  email: string
  linkedin?: string
  publications?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'dr-siti-nurhalimah',
    name: 'Dr. Siti Nurhalimah',
    roleKey: 'leadResearcher',
    categories: ['researcher'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20female%20Indonesian%20scientist%20in%20her%2040s%20with%20hair%20pulled%20back%20wearing%20a%20navy%20blazer%20over%20white%20shirt%2C%20warm%20confident%20smile%2C%20soft%20studio%20lighting%2C%20neutral%20gray%20background&image_size=square_hd',
    shortBio: {
      en: 'Lead researcher specializing in mangrove ecology and blue carbon quantification with 15+ years of field experience in Southeast Asia.',
      id: 'Peneliti utama yang mengkhususkan diri pada ekologi mangrove dan kuantifikasi karbon biru dengan pengalaman lapangan lebih dari 15 tahun di Asia Tenggara.',
    },
    bio: {
      en: 'Dr. Siti Nurhalimah is a leading mangrove ecologist whose research focuses on carbon sequestration dynamics in tropical coastal ecosystems. She received her Ph.D. from the University of Queensland and has led over 20 interdisciplinary research expeditions across the Indonesian archipelago. Her work has been instrumental in developing standardized blue carbon measurement protocols adopted by the Indonesian Ministry of Environment and Forestry. At Hub Bintuni, she coordinates the long-term ecological monitoring program and supervises graduate research in mangrove restoration ecology.',
      id: 'Dr. Siti Nurhalimah adalah seorang ekolog mangrove terkemuka yang penelitiannya berfokus pada dinamika penyerapan karbon di ekosistem pesisir tropis. Ia meraih gelar Ph.D. dari University of Queensland dan telah memimpin lebih dari 20 ekspedisi penelitian interdisipliner di seluruh kepulauan Indonesia. Karyanya berperan penting dalam pengembangan protokol pengukuran karbon biru standar yang diadopsi oleh Kementerian Lingkungan Hidup dan Kehutanan RI. Di Hub Bintuni, ia mengoordinasikan program pemantauan ekologi jangka panjang dan membimbing penelitian pascasarjana di bidang ekologi restorasi mangrove.',
    },
    expertise: [
      'Blue Carbon',
      'Ecosystem Dynamics',
      'Restoration Ecology',
      'PhD Supervision',
    ],
    email: 's.nurhalimah@worldmangrovecenter.org',
    linkedin: '#',
    publications: '#',
  },
  {
    id: 'pak-benas-wanda',
    name: 'Benas Wanda',
    roleKey: 'localAdvisor',
    categories: ['localAdvisor'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20Papuan%20elder%20indigenous%20man%20in%20his%2060s%20with%20gentle%20wise%20eyes%20wearing%20traditional%20woven%20vest%20over%20dark%20shirt%2C%20dignified%20expression%2C%20soft%20natural%20lighting%2C%20muted%20earthy%20background&image_size=square_hd',
    shortBio: {
      en: 'Indigenous community leader from the Mairasi tribe, guardian of traditional mangrove knowledge spanning four generations.',
      id: 'Pemuka komunitas adat dari suku Mairasi, penjaga pengetahuan tradisional mangrove yang telah diwariskan empat generasi.',
    },
    bio: {
      en: 'Benas Wanda is a respected elder and traditional knowledge holder from the Mairasi tribe of Teluk Bintuni. Born and raised in the mangrove-fringed villages along the bay, he learned sustainable harvesting practices, traditional navigation techniques, and medicinal plant knowledge from his father and grandfather. As the elected tribal representative for conservation initiatives, he plays a critical role in bridging indigenous wisdom with modern scientific approaches. He leads the traditional fire management protocol and advises on community tenure agreements for mangrove protection zones.',
      id: 'Benas Wanda adalah seorang tetua adat dan pemegang pengetahuan tradisional yang dihormati dari suku Mairasi Teluk Bintuni. Lahir dan besar di desa-desa yang dikelilingi mangrove di sepanjang teluk, ia mempelajari praktik pemanenan berkelanjutan, teknik navigasi tradisional, dan pengetahuan tanaman obat dari ayah dan kakeknya. Sebagai perwakilan suku terpilih untuk inisiatif konservasi, ia memainkan peran krusial dalam menjembatani kearifan adat dengan pendekatan ilmiah modern. Ia memimpin protokol pengelolaan api tradisional dan memberi masukan mengenai perjanjian hak kelola masyarakat untuk zona perlindungan mangrove.',
    },
    expertise: [
      'Traditional Knowledge',
      'Community Governance',
      'Medicinal Plants',
      'Tenure Rights',
    ],
    email: 'b.wanda@worldmangrovecenter.org',
  },
  {
    id: 'dr-markus-tambunan',
    name: 'Dr. Markus Tambunan',
    roleKey: 'programManager',
    categories: ['management'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20Batak%20Indonesian%20man%20in%20his%20late%2030s%20wearing%20olive%20green%20button%20up%20shirt%2C%20clean%20shaven%2C%20approachable%20friendly%20smile%2C%20wearing%20glasses%2C%20soft%20studio%20lighting%2C%20neutral%20background&image_size=square_hd',
    shortBio: {
      en: 'Program manager with a decade of experience in international conservation project management, donor relations, and strategic planning.',
      id: 'Manajer program dengan pengalaman satu dekade dalam manajemen proyek konservasi internasional, hubungan donor, dan perencanaan strategis.',
    },
    bio: {
      en: `Dr. Markus Tambunan brings over 12 years of experience managing complex conservation programs across Indonesia. Previously with WWF-Indonesia and the Asian Development Bank, he holds a Master's in Environmental Management from the National University of Singapore and a Ph.D. in Sustainability Science from IPB University. At Hub Bintuni, he oversees strategic planning, budget administration, stakeholder engagement, and multi-partner coordination across the 12,500-hectare restoration initiative. His expertise in Results-Based Management frameworks ensures transparent reporting to international donors and government stakeholders.`,
      id: 'Dr. Markus Tambunan membawa pengalaman lebih dari 12 tahun mengelola program konservasi kompleks di seluruh Indonesia. Sebelumnya bergabung dengan WWF-Indonesia dan Bank Pembangunan Asia, ia meraih gelar Master dalam Manajemen Lingkungan dari National University of Singapore dan Ph.D. dalam Ilmu Keberlanjutan dari IPB University. Di Hub Bintuni, ia membawahi perencanaan strategis, administrasi anggaran, keterlibatan pemangku kepentingan, dan koordinasi mitra lintas dalam inisiatif restorasi seluas 12.500 hektar. Keahliannya dalam kerangka Manajemen Berbasis Hasil memastikan pelaporan transparan kepada donor internasional dan pemangku kepentingan pemerintah.',
    },
    expertise: [
      'Project Management',
      'Donor Relations',
      'Strategic Planning',
      'Policy Advocacy',
    ],
    email: 'm.tambunan@worldmangrovecenter.org',
    linkedin: '#',
  },
  {
    id: 'dr-maria-ngga',
    name: 'Dr. Maria Ngga',
    roleKey: 'ecologyExpert',
    categories: ['ecologyExpert', 'researcher'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20Papuan%20female%20marine%20biologist%20in%20her%2030s%20with%20curly%20shoulder%20length%20hair%20wearing%20teal%20blouse%20with%20fish%20patterns%2C%20bright%20energetic%20smile%2C%20soft%20lighting%2C%20blue%20accent%20background&image_size=square_hd',
    shortBio: {
      en: 'Marine ecologist specializing in benthic fauna, mangrove-associated fish communities, and aquatic trophic cascades.',
      id: 'Ahli ekologi laut yang mengkhususkan diri pada fauna bentik, komunitas ikan asosiasi mangrove, dan kaskade trofik perairan.',
    },
    bio: {
      en: 'Dr. Maria Ngga is a marine ecologist whose pioneering work on mangrove-fish connectivity has reshaped our understanding of nursery habitat function in Bintuni Bay. A native Papuan from Manokwari, she completed her doctoral research at James Cook University, where she documented 78 fish species utilizing mangrove habitats during critical juvenile life stages. She leads the aquatic biodiversity monitoring program, deploying baited remote underwater video systems (BRUVS) and conducting quarterly ichthyofauna surveys across 36 permanent monitoring stations.',
      id: 'Dr. Maria Ngga adalah seorang ekolog laut yang karya perintisnya tentang konektivitas mangrove-ikan telah membentuk kembali pemahaman kita mengenai fungsi habitat asuh di Teluk Bintuni. Asli Papua dari Manokwari, ia menyelesaikan penelitian doktoralnya di James Cook University, di mana ia mendokumentasikan 78 spesies ikan yang memanfaatkan habitat mangrove selama tahap kehidupan juvenil yang krusial. Ia memimpin program pemantauan keanekaragaman hayati perairan, menggunakan sistem video bawah air jarak jauh dengan umpan (BRUVS) dan melakukan survei ikhtiofauna triwulanan di 36 stasiun pemantauan permanen.',
    },
    expertise: [
      'Marine Ecology',
      'Ichthyology',
      'Benthic Communities',
      'Trophic Ecology',
    ],
    email: 'm.ngga@worldmangrovecenter.org',
    linkedin: '#',
    publications: '#',
  },
  {
    id: 'pak-eko-saputro',
    name: 'Eko Saputro, S.Hut.',
    roleKey: 'conservationSpecialist',
    categories: ['ecologyExpert', 'management'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20Javanese%20Indonesian%20conservationist%20in%20his%20early%2040s%20wearing%20khaki%20field%20shirt%20with%20patches%2C%20weathered%20face%20with%20kind%20eyes%2C%20slight%20stubble%2C%20natural%20outdoor%20lighting%2C%20mangrove%20silhouette%20background%20blur&image_size=square_hd',
    shortBio: {
      en: 'Field conservation specialist overseeing on-the-ground restoration activities, nursery operations, and community ranger training.',
      id: 'Spesialis konservasi lapangan yang membawahi kegiatan restorasi di lapangan, operasional pembibitan, dan pelatihan penjaga hutan masyarakat.',
    },
    bio: {
      en: `Eko Saputro is the lead field conservationist at Hub Bintuni, managing a team of 28 community rangers across seven restoration sites. A graduate of IPB University's Forestry program, he developed his expertise through 14 years of hands-on mangrove restoration work across Sumatra, Kalimantan, and Sulawesi. He developed the Center's proprietary "ridge-to-reef" hydrological restoration methodology, which has achieved a 92% survival rate for planted Rhizophora and Avicennia propagules. He also coordinates the monthly mangrove nursery production of 50,000+ seedlings sourced from locally-collected, genetically-diverse parent stock.`,
      id: `Eko Saputro adalah konservasionis lapangan utama di Hub Bintuni, memimpin tim yang terdiri dari 28 penjaga hutan masyarakat di tujuh lokasi restorasi. Lulusan program Kehutanan IPB University, ia mengembangkan keahliannya melalui 14 tahun pekerjaan restorasi mangrove praktis di seluruh Sumatra, Kalimantan, dan Sulawesi. Ia mengembangkan metodologi restorasi hidrologis "dari punggungan ke terumbu" milik Pusat yang telah mencapai tingkat kelangsungan hidup 92% untuk propagul Rhizophora dan Avicennia yang ditanam. Ia juga mengoordinasikan produksi pembibitan mangrove bulanan lebih dari 50.000 bibit yang bersumber dari induk pohon koleksi lokal dengan keragaman genetik tinggi.`,
    },
    expertise: [
      'Field Restoration',
      'Nursery Management',
      'Hydrology',
      'Ranger Training',
    ],
    email: 'e.saputro@worldmangrovecenter.org',
  },
  {
    id: 'ibu-desy-maramatua',
    name: 'Desy Maramatua',
    roleKey: 'communityLiaison',
    categories: ['localAdvisor', 'management'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20Minahasan%20Indonesian%20woman%20in%20her%2030s%20wearing%20a%20warm%20rust%20colored%20blazer%2C%20confident%20but%20warm%20expression%2C%20hair%20in%20a%20low%20bun%2C%20wearing%20small%20gold%20earrings%2C%20soft%20studio%20lighting%2C%20neutral%20warm%20background&image_size=square_hd',
    shortBio: {
      en: `Community liaison and socio-economic development officer specializing in women's empowerment and NTFP enterprise development.`,
      id: 'Petugas hubungan masyarakat dan pembangunan sosio-ekonomi yang mengkhususkan diri pada pemberdayaan perempuan dan pengembangan usaha HHBK.',
    },
    bio: {
      en: `Desy Maramatua serves as the critical bridge between Hub Bintuni's research operations and the eight indigenous communities surrounding Bintuni Bay. With a background in Community Development from Universitas Indonesia and certification in Fair Trade enterprise auditing, she has established five women-led cooperatives producing value-added mangrove products including Nypa palm sugar, dried mangrove crab, and traditional woven crafts. Her flagship program, "Mangrove Mothers," trains women in sustainable harvesting protocols, financial literacy, and direct-to-market digital sales. She also facilitates quarterly Community Conservation Forums where indigenous leaders co-design research priorities with the science team.`,
      id: `Desy Maramatua menjembatani operasional penelitian Hub Bintuni dengan delapan komunitas adat di sekitar Teluk Bintuni. Dengan latar belakang Pembangunan Masyarakat dari Universitas Indonesia dan sertifikasi audit usaha Perdagangan Adil, ia telah mendirikan lima koperasi yang dipimpin perempuan yang memproduksi produk turunan mangrove bernilai tambah termasuk gula aren Nypa, kepiting mangrove kering, dan kerajinan anyaman tradisional. Program andalannya, "Ibu-Ibu Mangrove," melatih perempuan dalam protokol pemanenan berkelanjutan, literasi keuangan, dan penjualan digital langsung ke pasar. Ia juga memfasilitasi Forum Konservasi Masyarakat triwulanan di mana para pemuka adat bersama-sama merancang prioritas penelitian dengan tim sains.`,
    },
    expertise: [
      'Community Development',
      `Women's Empowerment`,
      'NTFP Enterprises',
      'Social Enterprise',
    ],
    email: 'd.maramatua@worldmangrovecenter.org',
    linkedin: '#',
  },
  {
    id: 'prof-willem-kwai',
    name: 'Prof. Willem Kwai',
    roleKey: 'ecologyExpert',
    categories: ['ecologyExpert', 'researcher'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20an%20elderly%20Chinese%20Papuan%20professor%20in%20his%2070s%20wearing%20a%20charcoal%20gray%20suit%20jacket%20over%20mint%20green%20sweater%2C%20wearing%20wire%20rimmed%20glasses%2C%20kind%20knowing%20smile%2C%20soft%20lighting%2C%20bookshelves%20blurred%20in%20background&image_size=square_hd',
    shortBio: {
      en: 'Distinguished professor of ethnobiology, leading the documentation of indigenous plant knowledge and traditional medicine systems.',
      id: 'Guru besar etnobiologi terkemuka, memimpin pendokumentasian pengetahuan tanaman adat dan sistem pengobatan tradisional.',
    },
    bio: {
      en: `Professor Willem Kwai is internationally recognized for his groundbreaking work in ethnobotany and the documentation of indigenous medicinal plant knowledge in Papua. Born in Manokwari to a Chinese-Papuan family, he has spent 45 years building relationships with the indigenous tribes of the Bird's Head Peninsula. He is the author of the definitive 3-volume "Medicinal Flora of West Papua" and serves on the IUCN Commission on Environmental, Economic and Social Policy. At Hub Bintuni, he leads the ethnobiology research program and personally conducts biocultural knowledge interviews with elder knowledge holders, ensuring proper consent, benefit-sharing, and intergenerational transmission protocols.`,
      id: `Profesor Willem Kwai diakui secara internasional atas karya terobosannya di bidang etnobotani dan pendokumentasian pengetahuan tanaman obat masyarakat adat di Papua. Lahir di Manokwari dari keluarga Tionghoa-Papua, ia telah menghabiskan 45 tahun membangun hubungan dengan suku-suku adat di Semenanjung Kepala Burung. Ia adalah penulis 3 jilid "Flora Obat Papua Barat" yang menjadi acuan utama dan menjabat di Komisi IUCN tentang Kebijakan Lingkungan, Ekonomi, dan Sosial. Di Hub Bintuni, ia memimpin program penelitian etnobiologi dan secara pribadi melakukan wawancara pengetahuan biokultural dengan para tetua pemegang pengetahuan, memastikan persetujuan yang tepat, pembagian manfaat, dan protokol transmisi antargenerasi.`,
    },
    expertise: [
      'Ethnobiology',
      'Medicinal Plants',
      'Biocultural Diversity',
      'Indigenous Rights',
    ],
    email: 'w.kwai@worldmangrovecenter.org',
    publications: '#',
  },
  {
    id: 'dr-resti-anggraini',
    name: 'Dr. Resti Anggraini',
    roleKey: 'researcher',
    categories: ['researcher'],
    image:
      'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20young%20Sundanese%20Indonesian%20scientist%20in%20her%20late%2020s%20wearing%20a%20cream%20colored%20sustainable%20fashion%20blazer%20over%20simple%20tshirt%2C%20fresh%20optimistic%20expression%2C%20hair%20worn%20down%20straight%2C%20soft%20bright%20lighting%2C%20clean%20white%20background&image_size=square_hd',
    shortBio: {
      en: 'Avian ecologist studying migratory bird populations, endangered species habitat use, and mangrove bird community dynamics.',
      id: 'Ekolog burung yang mempelajari populasi burung migran, penggunaan habitat spesies terancam, dan dinamika komunitas burung mangrove.',
    },
    bio: {
      en: `Dr. Resti Anggraini is a rising star in tropical ornithology, with her postdoctoral research on the critically endangered Milky Stork (Mycteria cinerea) populations in Bintuni Bay yielding the first comprehensive population estimates in 20 years. Trained at the Bogor Institute of Agriculture and the Cornell Lab of Ornithology, she operates the Center's 12-station bird banding program and coordinates citizen science bird monitoring with the local school system. Her research identified Bintuni Bay as a critical stopover site for three species of migratory shorebirds along the East Asian-Australasian Flyway, leading to its nomination as a Ramsar Site of International Importance.`,
      id: `Dr. Resti Anggraini adalah bintang muda di bidang ornitologi tropis, dengan penelitian pascadoktoralnya tentang populasi Bangau Susu (Mycteria cinerea) yang terancam punah secara kritis di Teluk Bintuni menghasilkan perkiraan populasi komprehensif pertama dalam 20 tahun. Dilatih di Institut Pertanian Bogor dan Cornell Lab of Ornithology, ia mengoperasikan program pemusatan burung 12 stasiun di Pusat dan mengoordinasikan pemantauan burung sains warga dengan sistem sekolah lokal. Penelitiannya mengidentifikasi Teluk Bintuni sebagai lokasi persinggahan krusial bagi tiga spesies burung pantai migran di sepanjang Jalur Terbang Asia Timur-Australasia, yang mengarah pada nominasi sebagai Situs Ramsar Penting Internasional.`,
    },
    expertise: [
      'Ornithology',
      'Endangered Species',
      'Citizen Science',
      'Ramsar Ecology',
    ],
    email: 'r.anggraini@worldmangrovecenter.org',
    linkedin: '#',
    publications: '#',
  },
]
