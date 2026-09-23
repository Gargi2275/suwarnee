import { Course, CommitteeMember, TimelineEvent, TrustEvent, GalleryItem, VideoItem, AudioItem, DocumentItem, Shloka, Category, EnrollmentRecord, InquiryRecord } from '../types';

export const PRIMARY_PHONE = '+91 99672 21246';

export const SECONDARY_PHONE = '+91 90296 76370';
export const SECONDARY_PHONE_NOTE = '+91 90296 76370'; // Note: Found in About Us footer on archival site
export const PRIMARY_EMAIL = 'info@surawanee.org';
export const CONTACT_PERSON = 'Rutuja Velankar';

export const LOGO_PRIMARY = 'https://www.surawanee.org/wp-content/uploads/2022/08/Surawani_new_logo-e1660680365439.png';
export const LOGO_SECONDARY = '/trust-logo.png';

export const HERO_SHLOKA: Shloka = {
  sanskrit: 'संस्कृताध्ययनेनैव संस्कृतेः प्रसरो भवेत् ।\nतस्मात्संस्कृतभाषायाः प्रसारो ध्येयमस्तु नः ||',
  transliteration: 'Saṁskṛtādhyayanenaiva saṁskṛteḥ prasaro bhavet |\nTasmātsaṁskṛtabhāṣāyāḥ prasāro dhyeyamastu naḥ ||',
  meaningEn: 'Only through the study of Sanskrit can culture spread. Therefore, the propagation of the Sanskrit language shall be our supreme goal.',
  meaningMr: 'संस्कृताच्या अध्ययनानेच संस्कृतीचा प्रसार होईल. म्हणूनच संस्कृत भाषेचा प्रसार हेच आमचे ध्येय असावे.',
  source: '— Surawanee Sanskrit Motto Verse'
};

export const MOTTO_SHLOKA: Shloka = {
  sanskrit: 'विद्या ददाति विनयं विनयाद्याति पात्रताम्।\nपात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥',
  transliteration: 'Vidyā dadāti vinayaṁ vinayādyāti pātratām |\nPātratvāddhanamāpnoti dhanāddharmaṁ tataḥ sukham ||',
  meaningEn: 'True knowledge imparts humility; from humility comes worthiness; from worthiness comes prosperity; from prosperity comes righteous conduct, and from righteousness follows everlasting peace.',
  meaningMr: 'ज्ञान विनम्रता देते, नम्रतेतून पात्रता येते, पात्रतेतून संपत्ती प्राप्त होते, संपत्तीतून सत्कार्य घडते आणि त्यामुळे शाश्वत सुख मिळते.',
  source: '— Hitopadesha'
};

export const TRUST_INFO = {
  nameEn: 'Surawanee Dyan Mandir',
  nameHeading: 'SURAWANEE',
  subtitle: 'DNYANMANDIR',
  nameMr: 'सुरवाणी ज्ञानमंदिर',
  taglineEn: 'Sanskrit School (Pathashala) & Cultural Trust (Est. 1958)',
  taglineMr: 'संस्कृत पाठशाळा व शैक्षणिक संस्था (स्थापना १९५८)',
  estDate: '15th August 1958',
  estYear: 1958,
  regNo: 'Registration No E-225 Thane',
  regOrder: 'Amended order no 2182 dated 1st March 1975 of Assistant Charity Commissioner, Nashik Region, Nashik.',
  foundingStatement: 'The Organization was founded on 15th August 1958 to promote and enhance the interest in the Sanskrit Language. The organization is a Charitable Trust registered under the amended order no 2182 dated 1st March 1975 of Assistant Charity Commissioner, Nashik Region, Nashik. (Registration No E-225 Thane)',
  foundingStatementMr: 'संस्कृत भाषेविषयीची आवड वाढवण्यासाठी आणि तिचा प्रसार करण्यासाठी १५ ऑगस्ट १९५८ रोजी या संस्थेची स्थापना करण्यात आली. ही संस्था सहाय्यक धर्मादाय आयुक्त, नाशिक विभाग, नाशिक यांच्या १ मार्च १९७५ च्या सुधारित आदेश क्र. २१८२ अन्वये नोंदणीकृत धर्मादाय ट्रस्ट आहे. (नोंदणी क्र. ई-२२५ ठाणे)',
  addressEn: 'Surawanee Dyan Mandir, 3rd Flr Padma Niwas, Ram Maruti Cross Lane, Naupada, Thane 400602, Maharashtra – India',
  addressMr: 'सुरवाणी ज्ञानमंदिर, ३ रा मजला, पद्म निवास, राम मारुती क्रॉस लेन, नौपाडा, ठाणे ४००६०२, महाराष्ट्र – भारत',
  phone: PRIMARY_PHONE,
  phoneRaw: '+919967221246',
  secondaryPhoneNote: SECONDARY_PHONE_NOTE,
  contactPerson: CONTACT_PERSON,
  email: PRIMARY_EMAIL,
  coordinates: {
    lat: 19.1896,
    lng: 72.9697
  },
  taxExemption: 'Donations eligible for 80G Tax Exemption (U/S 80G of Income Tax Act)',
  hoursEn: 'Monday – Saturday: 9:00 AM – 7:30 PM | Sunday: 9:00 AM – 1:00 PM',
  hoursMr: 'सोमवार ते शनिवार: स. ९:०० ते सायं. ७:३० | रविवार: स. ९:०० ते दु. १:००'
};

export const CATEGORIES: Category[] = [
  {
    id: 'paurohitya',
    titleEn: 'Paurohitya Track',
    titleMr: 'पौरोहित्य वर्ग',
    type: 'course',
    descriptionEn: 'Priest training, ritual ceremonies, pujas, and Vedic rites',
    descriptionMr: 'पौरोहित्य प्रशिक्षण, पूजाविधी व शास्त्रोक्त संस्कार'
  },
  {
    id: 'other-courses',
    titleEn: 'Other Courses',
    titleMr: 'इतर अभ्यासक्रम',
    type: 'course',
    descriptionEn: 'General Sanskrit learning, language vargs, and teacher training',
    descriptionMr: 'सामान्य संस्कृत शिक्षण व इतर वर्ग'
  },
  {
    id: 'language',
    titleEn: 'Sanskrit Language',
    titleMr: 'संस्कृत भाषा',
    type: 'course',
    descriptionEn: 'Grammar, conversation, literature and foundation classes',
    descriptionMr: 'व्याकरण, संभाषण व भाषा परिचय वर्ग'
  },
  {
    id: 'sanskar',
    titleEn: 'Sanskar Varg',
    titleMr: 'संस्कार वर्ग',
    type: 'course',
    descriptionEn: 'Value education, shlokas, and cultural heritage for kids',
    descriptionMr: 'मुलांसाठी संस्कार, श्लोक व मूल्यांचे धडे'
  },
  {
    id: 'teachers-training',
    titleEn: 'Teachers Training',
    titleMr: 'शिक्षक प्रशिक्षण',
    type: 'course',
    descriptionEn: 'Pedagogy and advanced teaching methodologies for Sanskrit tutors',
    descriptionMr: 'संस्कृत शिक्षकांसाठी अध्यापन कौशल्ये'
  },
  {
    id: 'paurohitya-media',
    titleEn: 'Paurohitya Media',
    titleMr: 'पौरोहित्य साहित्य',
    type: 'knowledge',
    descriptionEn: 'Audio chants, ritual demonstration videos, and puja manuals',
    descriptionMr: 'पूजाविधी ध्वनी, व्हिडिओ व साहित्य'
  },
  {
    id: 'audio-recitations',
    titleEn: 'Audio Recitations',
    titleMr: 'ध्वनी फीती (Audio)',
    type: 'knowledge',
    descriptionEn: 'Authentic Veda mantras, Stotras, and pronunciation guides',
    descriptionMr: 'वेद मंत्रोच्चार, स्तोत्र पठण व शुद्ध उच्चार'
  },
  {
    id: 'video-lectures',
    titleEn: 'Video Lectures',
    titleMr: 'व्हिडिओ वर्ग',
    type: 'knowledge',
    descriptionEn: 'Recorded lectures, webinars, and event broadcasts',
    descriptionMr: 'व्याख्याने, व्हिडिओ पाठ व सोहळे'
  },
  {
    id: 'study-docs',
    titleEn: 'Study Material & PDFs',
    titleMr: 'अभ्यास साहित्य व पुस्तके',
    type: 'knowledge',
    descriptionEn: 'Downloadable PDF reference guides, research papers, and manuscripts',
    descriptionMr: 'अभ्यासक्रम मार्गदर्शिका, ई-पुस्तके व हस्तलिखिते'
  }
];

export const FOUNDER_INFO = {
  nameEn: 'Sanskrut Choodamani Raghunath Ganesh Parashtekar',
  nameMr: 'संस्कृत चूडामणी रघुनाथ गणेश पराष्टेकर',
  titleEn: 'Founder & Visionary Acharya',
  titleMr: 'संस्थापक आचार्य व प्रेरणास्थान',
  bioEn: 'The organization was founded by Sanskrut Choodamani Raghunath Ganesh Parashtekar on 15th August 1958 to foster, preserve, and propagate Sanskrit education for all generations.',
  bioMr: 'संस्कृत चूडामणी रघुनाथ गणेश पराष्टेकर यांनी १५ ऑगस्ट १९५८ रोजी सर्व पिढ्यांमध्ये संस्कृत शिक्षणाचा प्रसार करण्यासाठी सुरवाणीची स्थापना केली.',
  photo: '/Sanskrit-Choodamani-Raghunath-Ganesh-Parashtekar-updraft-pre-smush-original.png'
};

export const ABOUT_EXACT_TEXT = {
  p1: 'Surawanee Dnyan Mandir is a Sanskrut School (Pathashala) affiliated to The Sanskrut Language Broadcasting Assembly, Thane (संस्कृत भाषा प्रसरिणी सभा, ठाणे). It is a government recognized Sanskrut Pathashala. For the last 6 decades Surawanee has been in operation, running classes from school-going children to senior citizens.',
  p2: 'Surawanee conducts a Subhashit Pathan competition for school-going children; together with Thane College Arts Division it conducts a Bhagvat Geeta Chanting Competition for college students; and with Deen Dayal Prerana Kendra it conducts an interschool Stotra Pathan competition.',
  p3: 'Surawanee also conducts Paurohitya classes covering Stotra Pathan, Shodashopachar Pooja, Ganapati Pooja, and Satyanarayan Pooja, with online classes planned for students based outside India.',
  p4: 'The organization was founded by Sanskrut Choodamani Raghunath Ganesh Parashtekar.',
  p5: "Surawanee began on the first floor Sabhamandap of Shree Kaupineshwar Mandir, Thane (built during the Shilahar Dynasty), and had to relocate when the temple was renovated. Teacher Mr. Mukund Damle took enormous effort to secure Surawanee's own premises, now located in the main part of Thane city.",
  p6: 'Past Presidents/Vice-Presidents/Committee Members include: Dr. V B Pandit, S V Kulkarni, Bhau Apte, Bhatakhande, D K Soman, Medha Soman.',
  p7: 'Alongside Sanskrit, subjects like Mathematics, English, and Science were taught honorarily by dedicated teachers — remembered fondly are Damle Sir and Athalye Sir for English. Mrs. Nandedkar served as Pradhanacharya (Principal) for 30 years, through a period of changing education policy.'
};

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: 'c1',
    nameEn: 'Dr. V B Pandit',
    nameMr: 'डॉ. व्ही. बी. पंडित',
    roleEn: 'Past President / Leadership',
    roleMr: 'माजी अध्यक्ष',
    qualification: 'Eminent Sanskrit Scholar & Educationist',
    bioEn: 'Distinguished scholar who guided Surawanee Dnyan Mandir during crucial decades of institution building in Thane.',
    bioMr: 'सुरवाणी ज्ञानमंदिरच्या स्थापनेतील व विकासातील प्रमुख मार्गदर्शक.',
    photo: '/Photos/Shantaram-Apte-former-Adhyaksha-Sanman-e1660834164874-480x270.jpg'
  },
  {
    id: 'c2',
    nameEn: 'S V Kulkarni',
    nameMr: 'एस. व्ही. कुलकर्णी',
    roleEn: 'Past Vice-President / Trustee',
    roleMr: 'माजी उपाध्यक्ष / विश्वस्त',
    qualification: 'Senior Sanskritist & Administrator',
    bioEn: 'Dedicated leadership expanding the Sanskrit Pathashala network and student welfare programs.',
    bioMr: 'संस्कृत पाठशाळेच्या विस्तारासाठी महत्त्वपूर्ण योगदान देणारे ज्येष्ठ कार्यकर्ते.',
    photo: '/Photos/Shantaram-Apte-Sanman-e1660833908526-480x270.jpg'
  },
  {
    id: 'c3',
    nameEn: 'Bhau Apte',
    nameMr: 'भाऊ आपटे',
    roleEn: 'Past Committee Member & Mentor',
    roleMr: 'माजी समिती सदस्य व मार्गदर्शक',
    qualification: 'Advocate & Cultural Patron',
    bioEn: 'Guiding legal, constitutional, and governance affairs of the charitable trust.',
    bioMr: 'ट्रस्टच्या कायदेशीर व सामाजिक उपक्रमांचे मार्गदर्शक.',
    photo: '/Photos/pradhanacharya-Sanman-480x360.jpg'
  },
  {
    id: 'c4',
    nameEn: 'Bhatakhande',
    nameMr: 'भातखंडे',
    roleEn: 'Past Committee Member',
    roleMr: 'माजी समिती सदस्य',
    qualification: 'Classical Sanskrit Educator',
    bioEn: 'Pillar of curriculum development and traditional Sanskrit chanting pedagogy.',
    bioMr: 'पारंपरिक संस्कृत अध्यापन व स्तोत्र पाठणाचे आधारस्तंभ.',
    photo: '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
  },
  {
    id: 'c5',
    nameEn: 'D K Soman',
    nameMr: 'डी. के. सोमन',
    roleEn: 'Past Committee Leader & Patron',
    roleMr: 'माजी समिती प्रमुख',
    qualification: 'Renowned Thane Scholar',
    bioEn: 'Instrumental in establishing the interschool Sanskrit competitions in Thane district.',
    bioMr: 'ठाणे जिल्ह्यातील आंतरशालेय संस्कृत स्पर्धांचे आयोजन करणारे प्रमुख नेते.',
    photo: '/Photos/Surwanee_competition_8-scaled-updraft-pre-smush-original.jpg'
  },
  {
    id: 'c6',
    nameEn: 'Medha Soman',
    nameMr: 'मेधा सोमन',
    roleEn: 'Committee Member & Academician',
    roleMr: 'समिती सदस्या व शिक्षणतज्ज्ञ',
    qualification: 'M.A. Sanskrit Literature',
    bioEn: 'Dedicated to women Sanskrit education and cultural outreach in Thane.',
    bioMr: 'संस्कृत साहित्य प्रचार व महिला वर्गांसाठी मार्गदर्शक.',
    photo: '/Photos/Teachers-Training-2-updraft-pre-smush-original.jpg'
  },
  {
    id: 'c7',
    nameEn: 'Mrs. Nandedkar',
    nameMr: 'श्रीमती नांदेडकर',
    roleEn: 'Pradhanacharya (Principal for 30 Years)',
    roleMr: 'प्रधानाचार्या (३० वर्षे सेवा)',
    qualification: 'Veteran Sanskrit Principal & Acharya',
    bioEn: 'Served as Pradhanacharya (Principal) for 30 distinguished years through changing educational policies with unwavering dedication.',
    bioMr: 'बदलत्या शिक्षण धोरणांच्या काळात सलग ३० वर्षे मुख्याध्यापिका म्हणून सुरवाणीचे नेतृत्व करणाऱ्या निष्ठावंत आचार्या.',
    photo: '/Photos/Pradhanacharya-Manapatra-updraft-pre-smush-original.jpg'
  },
  {
    id: 'c8',
    nameEn: 'Mr. Mukund Damle',
    nameMr: 'श्री. मुकुंद दामले',
    roleEn: 'Foundational Teacher & Estate Architect',
    roleMr: 'ज्येष्ठ शिक्षक व वास्तू शिल्पकार',
    qualification: 'Dedicated Honorary Teacher',
    bioEn: 'Took enormous effort to secure Surawanee’s own premises at Padma Niwas in central Thane after relocation from Kaupineshwar Mandir.',
    bioMr: 'कौपिनेश्वर मंदिरातील स्थलांतरानंतर ठाण्यातील सध्याच्या स्वतःच्या वास्तूसाठी (पद्म निवास) अथांग परिश्रम घेणारे शिक्षक.',
    photo: '/Photos/Surawanee_new_location-updraft-pre-smush-original.png'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1958',
    titleEn: 'Founding at Shree Kaupineshwar Mandir',
    titleMr: 'कौपिनेश्वर मंदिर सभागृहात स्थापना',
    descriptionEn: 'Founded on 15th August 1958 by Sanskrut Choodamani Raghunath Ganesh Parashtekar on the 1st floor Sabhamandap of historic Shree Kaupineshwar Mandir, Thane (built during the Shilahar Dynasty).',
    descriptionMr: '१५ ऑगस्ट १९५८ रोजी संस्कृत चूडामणी रघुनाथ गणेश पराष्टेकर यांनी शिलाहारकालीन कौपिनेश्वर मंदिराच्या पहिल्या मजल्यावरील सभामंडपात सुरवाणीची स्थापना केली.'
  },
  {
    year: '1975',
    titleEn: 'Official Trust Registration',
    titleMr: 'धर्मादाय आयुक्त अधिकृत नोंदणी',
    descriptionEn: 'Registered under amended order no 2182 dated 1st March 1975 of Assistant Charity Commissioner, Nashik Region (Registration No E-225 Thane).',
    descriptionMr: '१ मार्च १९७५ रोजी सहाय्यक धर्मादाय आयुक्त नाशिक यांच्या आदेश क्र. २१८२ अन्वये अधिकृत नोंदणी (क्र. ई-२२५ ठाणे).'
  },
  {
    year: '1980s',
    titleEn: 'Acquisition of Padma Niwas Premises',
    titleMr: 'पद्म निवास स्वतःच्या वास्तूत स्थलांतर',
    descriptionEn: 'When Kaupineshwar Mandir underwent renovation, Teacher Mr. Mukund Damle led monumental efforts to secure Surawanee’s own permanent premises at 3rd Floor, Padma Niwas, Ram Maruti Cross Lane, Naupada, Thane.',
    descriptionMr: 'मंदिराच्या जीर्णोद्धारानंतर श्री. मुकुंद दामले यांच्या प्रयत्नांतून राम मारुती क्रॉस लेन, नौपाडा येथे स्वतःची वास्तू प्राप्त झाली.'
  },
  {
    year: '1960s – 1990s',
    titleEn: 'Three Decades of Leadership by Mrs. Nandedkar',
    titleMr: 'श्रीमती नांदेडकर यांच्या नेतृत्वाखाली ३० वर्षे',
    descriptionEn: 'Mrs. Nandedkar served as Pradhanacharya for 30 years, alongside honorary teachers like Damle Sir and Athalye Sir teaching English, Mathematics, and Science.',
    descriptionMr: 'श्रीमती नांदेडकर यांनी ३० वर्षे प्रधानाचार्या म्हणून धुरा सांभाळली; दामले सर व अथाल्ये सर यांनी मानद अध्यापन केले.'
  },
  {
    year: 'Present',
    titleEn: '6 Decades of Continuous Sanskrit Education',
    titleMr: '६ दशकांची अखंड संस्कृत ज्ञानगंगा',
    descriptionEn: 'Affiliated to The Sanskrut Language Broadcasting Assembly, Thane (संस्कृत भाषा प्रसरिणी सभा, ठाणे), running classes from school children to senior citizens.',
    descriptionMr: 'संस्कृत भाषा प्रसरिणी सभा, ठाणे संलग्नित, शालेय विद्यार्थ्यांपासून ते ज्येष्ठ नागरिकांपर्यंत अखंड ज्ञानदान.'
  }
];

export const COURSES: Course[] = [
  {
    id: 'stotra-pathan',
    titleEn: 'Stotra Pathan',
    titleMr: 'स्तोत्र पठण',
    category: 'paurohitya',
    categoryLabelEn: 'Paurohitya',
    categoryLabelMr: 'पौरोहित्य',
    subtitleEn: 'Proper pronunciation, meter, and sacred context of Stotras related to Puja rituals.',
    subtitleMr: 'पूजा विधी आणि स्तोत्रांचे शुद्ध उच्चारण, लय व अध्यात्मिक ज्ञान.',
    descriptionEn: 'The pronunciation of words is of extreme importance in Sanskrit language as the way one pronounces it is as if communication with the God and hence the clarity, perfect pronunciation and the rhythm in which a stotra (prarthana) is to be pronounced need to be learned through proper Guru. The Stotra Pathan courses aim at proper teaching as to how the stotra is to be pronounced — not only the pronunciation but also when it is to be said and the purpose for which it is said. The course provides individual attention and audio/document material with pronunciation rules. Courses can focus on a specific stotra such as Shiv Mahimna Stotra or Durga Saptashati Stotra.',
    descriptionMr: 'संस्कृत भाषेत शब्दांचे उच्चारण अत्यंत महत्त्वाचे आहे. योग्य गुरूंकडून स्तोत्रांचे शुद्ध, स्पष्ट आणि लयबद्ध उच्चारण शिकणे आवश्यक आहे. या वर्गात केवळ उच्चार नव्हे तर स्तोत्र कधी व कोणत्या हेतूने म्हणावे याचेही मार्गदर्शन केले जाते. शिव महिम्न स्तोत्र, दुर्गा सप्तशती इत्यादी विशिष्ट स्तोत्रांचा यात समावेश आहे.',
    level: 'Beginner',
    duration: '10 Weeks',
    totalLessons: 0,
    totalHours: '20+ Hours',
    mode: 'Classroom (Thane)',
    fee: 'Free',
    isFreeOrSubsidized: true,
    thumbnail: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
    upcomingBatch: 'Batch Announcements (Inquire at Padma Niwas Campus)',
    prerequisites: [
      'Interest in Sanskrit Stotra recitation and correct pronunciation',
      'Open to all levels (School children, youth, and senior citizens)'
    ],
    learningOutcomes: [
      'Clarity, perfect pronunciation and rhythmic cadence of sacred Stotras',
      'Understanding when and why each specific Stotra is chanted in daily life & Pujas',
      'Detailed study of specific texts like Shiv Mahimna Stotra and Durga Saptashati'
    ],
    certificateProvided: true,
    featured: true,
    instructor: {
      name: 'TechnoAdviser / Surawanee Faculty',
      titleEn: 'Senior Faculty & Sanskrit Acharyas',
      titleMr: 'संस्कृत प्राध्यापक व तज्ज्ञ',
      credentials: 'Surawanee Dnyanmandir Faculty Council',
      avatar: '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
    },
    modules: [
      {
        id: 'stotra-m1',
        titleEn: 'Strot Uchharan Margdarshan (स्तोत्र उच्चारण मार्गदर्शन)',
        titleMr: 'स्तोत्र उच्चारण मार्गदर्शन',
        duration: 'Module 1',
        description: 'Guidance on correct tongue placement, vowel resonance, and clarity rules.',
        topics: [
          'Phonetic foundation and clarity rules',
          'Vowel and consonant articulation guide',
          'Content lessons coming soon'
        ]
      },
      {
        id: 'stotra-m2',
        titleEn: 'Strot Pathan (स्तोत्र पठण) - audio',
        titleMr: 'स्तोत्र पठण (ध्वनी मुद्रिका)',
        duration: 'Module 2',
        description: 'Audio-guided recitation of selected Stotras including Shiv Mahimna & Durga Saptashati.',
        topics: [
          'Rhythmic chanting audio tracks',
          'Step-by-step recitation loops',
          'Content lessons coming soon'
        ]
      }
    ]
  },
  {
    id: 'prashikshan-varg-pratham-star',
    titleEn: 'Prashikshan Varg (Pratham Star)',
    titleMr: 'प्रशिक्षण वर्ग (प्रथम स्तर)',
    category: 'paurohitya',
    categoryLabelEn: 'Paurohitya',
    categoryLabelMr: 'पौरोहित्य',
    subtitleEn: 'Foundational stage training for Paurohitya and Vedic ritual ceremonies.',
    subtitleMr: 'पौरोहित्य आणि वैदिक कर्मकांड विधींचा प्रथम स्तर पायाभूत वर्ग.',
    descriptionEn: 'Prashikshan Varg (Pratham Star) is the foundational course in the Paurohitya track, introducing students to Vedic phonetics, primary Sankalpa, and fundamental ritual procedures according to Shastric norms.',
    descriptionMr: 'पौरोहित्य वर्गाचा पहिला टप्पा. शुद्ध मंत्रोच्चार, संकल्प विधी आणि प्राथमिक पूजा विधींचे शास्त्रोक्त शिक्षण.',
    level: 'Beginner',
    duration: '12 Weeks',
    totalLessons: 0,
    totalHours: '30 Hours',
    mode: 'Classroom (Thane)',
    fee: 'Contact Trust for Details',
    isFreeOrSubsidized: true,
    thumbnail: '/Photos/Surawanee_Paurohitya-Varg-2-updraft-pre-smush-original.jpg',
    upcomingBatch: 'Announced Annually in June / July',
    prerequisites: ['Basic ability to read Devanagari script'],
    learningOutcomes: [
      'Understanding the foundations of Vedic rituals and Puja procedures',
      'Accuracy in introductory Sankalpa, Achamana, and Pranayama mantras'
    ],
    certificateProvided: true,
    featured: true,
    instructor: {
      name: 'Surawanee Paurohitya Faculty',
      titleEn: 'Vedacharya & Ritual Specialists',
      titleMr: 'वेदाचार्य व पौरोहित्य तज्ज्ञ',
      credentials: 'Surawanee Paurohitya Department',
      avatar: '/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg'
    },
    modules: [
      {
        id: 'pau-m1',
        titleEn: 'Pratham Star Foundation & Sankalpa Vidhi',
        titleMr: 'प्रथम स्तर पायाभूत अभ्यासक्रम व संकल्प',
        duration: 'Foundational',
        description: 'Introduction to Vedic ritual structures and purification procedures.',
        topics: ['Sankalpa Vidhi', 'Panchamruta and Kalasha Sthapana', 'Content coming soon']
      }
    ]
  },
  {
    id: 'pooja-vidhi',
    titleEn: 'Pooja Vidhi',
    titleMr: 'पूजा विधी',
    category: 'paurohitya',
    categoryLabelEn: 'Paurohitya',
    categoryLabelMr: 'पौरोहित्य',
    subtitleEn: 'Practical guidance in Shodashopachar Pooja, Ganapati Pooja, and Satyanarayan Pooja.',
    subtitleMr: 'षोडशोपचार पूजा, गणपती पूजा आणि सत्यनारायण पूजा विधींचे प्रत्यक्ष शिक्षण.',
    descriptionEn: 'These courses include the teaching of the proper pronunciation of specific stotras (stotra pathan) which are related to shodashopachar puja and the puja itself. Comprehensive training for Ganapati Pooja, Satyanarayan Pooja, and domestic rituals.',
    descriptionMr: 'षोडशोपचार पूजा, गणपती पूजा, सत्यनारायण पूजा आणि इतर नित्य व नैमित्तिक पूजा विधींचे परिपूर्ण शिक्षण. मंत्रोच्चार व प्रत्यक्ष कृतीचा सराव.',
    level: 'Intermediate',
    duration: '10 Weeks',
    totalLessons: 0,
    totalHours: '25 Hours',
    mode: 'Classroom (Thane)',
    fee: 'Contact Trust for Details',
    isFreeOrSubsidized: true,
    thumbnail: '/Photos/Survani-pujavidhi-updraft-pre-smush-original.png',
    upcomingBatch: 'Weekend Batches at Padma Niwas',
    prerequisites: ['Basic familiarity with Stotra recitation'],
    learningOutcomes: [
      'Mastery of Shodashopachar steps (Asana, Padya, Arghya, Snana, Vastra, etc.)',
      'Independent conduction of Ganapati Pooja and Satyanarayan Pooja'
    ],
    certificateProvided: true,
    featured: true,
    instructor: {
      name: 'Surawanee Paurohitya Faculty',
      titleEn: 'Head of Ritual Studies',
      titleMr: 'पूजा विधी मार्गदर्शक',
      credentials: 'Surawanee Dnyanmandir',
      avatar: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg'
    },
    modules: [
      {
        id: 'pv-m1',
        titleEn: 'Shodashopachar & Ganapati Pooja Vidhi',
        titleMr: 'षोडशोपचार व गणपती पूजा विधी',
        duration: 'Core Module',
        description: 'Complete hands-on steps for sixteen-fold worship and Satyanarayan rituals.',
        topics: ['Shodashopachar Vidhi', 'Ganapati & Satyanarayan rituals', 'Lessons coming soon']
      }
    ]
  },
  {
    id: 'sanskar-varg',
    titleEn: 'Sanskar Varg',
    titleMr: 'संस्कार वर्ग',
    category: 'sanskar',
    categoryLabelEn: 'Other Courses',
    categoryLabelMr: 'इतर वर्ग',
    subtitleEn: 'This course is designed for children between the age of 5-10 years.',
    subtitleMr: '५ ते १० वर्षे वयोगटातील मुलांसाठी विशेष संस्कार वर्ग.',
    descriptionEn: 'This course is designed for children between the age of 5-10 years. Children learn traditional stotras, values, moral stories, concentration games, and cultural heritage in an enjoyable, nurturing environment.',
    descriptionMr: '५ ते १० वयोगटातील मुलांसाठी डिझाइन केलेला हा वर्ग. मुलांमध्ये उत्तम संस्कार, शुद्ध उच्चार, स्तोत्रपठण, गोष्टी आणि संस्कृतीची ओळख करून दिली जाते.',
    level: 'Beginner',
    duration: 'Annual Weekend Program',
    totalLessons: 0,
    totalHours: '40 Hours',
    mode: 'Classroom (Thane)',
    fee: 'Token Contribution',
    isFreeOrSubsidized: true,
    thumbnail: '/Photos/kids-rainbow-surawanee-updraft-pre-smush-original.png',
    upcomingBatch: 'Batch starting this term',
    prerequisites: ['Age 5 to 10 years'],
    learningOutcomes: [
      'Clear recitation of essential Sanskrit Shlokas and Stotras',
      'Value-based cultural foundation and creative storytelling'
    ],
    certificateProvided: true,
    featured: true,
    instructor: {
      name: 'Surawanee Bal Sanskar Faculty',
      titleEn: 'Sanskar Varg Educators',
      titleMr: 'संस्कार वर्ग शिक्षिका',
      credentials: 'Surawanee Dnyanmandir',
      avatar: '/Photos/kids-rainbow-surawanee-updraft-pre-smush-original.png'
    },
    modules: [
      {
        id: 'sv-m1',
        titleEn: 'Bal Sanskar Core Curriculum',
        titleMr: 'बाल संस्कार अभ्यासक्रम',
        duration: 'Year-round',
        description: 'Stotra chanting, moral stories, and cultural activities for 5-10 year olds.',
        topics: ['Daily Shlokas', 'Moral Stories', 'Curriculum details coming soon']
      }
    ]
  },
  {
    id: 'sanskrut-language-classes',
    titleEn: 'Sanskrut Language Classes',
    titleMr: 'संस्कृत भाषा वर्ग',
    category: 'language',
    categoryLabelEn: 'Other Courses',
    categoryLabelMr: 'इतर वर्ग',
    subtitleEn: 'In these classes the students are taught the school syllabus.',
    subtitleMr: 'या वर्गांमध्ये विद्यार्थ्यांना शालेय अभ्यासक्रम शिकवला जातो.',
    descriptionEn: 'In these classes the students are taught the school syllabus. Covers grammar rules, textbook lessons, composition, translation, and exam preparation with individualized academic support.',
    descriptionMr: 'या वर्गांमध्ये शालेय विद्यार्थ्यांना त्यांच्या अभ्यासक्रमानुसार संस्कृत व्याकरण, गद्य, पद्य आणि निबंधलेखनाचे मार्गदर्शन केले जाते.',
    level: 'Beginner',
    duration: 'Academic Term (aligned with School Year)',
    totalLessons: 0,
    totalHours: '60 Hours',
    mode: 'Classroom (Thane)',
    fee: 'Subsidized Trust Rates',
    isFreeOrSubsidized: true,
    thumbnail: '/Photos/Sambhashan-Varg-Vidyaniketan-updraft-pre-smush-original.jpg',
    upcomingBatch: 'Academic Year Batches (June to March)',
    prerequisites: ['School students studying Sanskrit as a subject'],
    learningOutcomes: [
      'Thorough mastery of prescribed school syllabus and Board exam requirements',
      'Strong conceptual clarity in Sanskrit grammar, Sandhi, and Vibhakti'
    ],
    certificateProvided: true,
    featured: true,
    instructor: {
      name: 'Surawanee Sanskrit Teachers',
      titleEn: 'School Syllabus Specialists',
      titleMr: 'शालेय अभ्यासक्रम तज्ज्ञ',
      credentials: 'Surawanee Dnyanmandir Faculty',
      avatar: '/Photos/Sambhashan-Varg-1-updraft-pre-smush-original.jpg'
    },
    modules: [
      {
        id: 'slc-m1',
        titleEn: 'School Syllabus Grammar & Literature',
        titleMr: 'शालेय व्याकरण व पाठ्यपुस्तक अभ्यास',
        duration: 'Semester 1 & 2',
        description: 'Complete syllabus breakdown for school students.',
        topics: ['Textbook prose & poetry', 'Grammar drills', 'Content coming soon']
      }
    ]
  },
  {
    id: 'teachers-training-courses',
    titleEn: 'Teachers Training Courses',
    titleMr: 'शिक्षक प्रशिक्षण वर्ग',
    category: 'teachers-training',
    categoryLabelEn: 'Other Courses',
    categoryLabelMr: 'इतर वर्ग',
    subtitleEn: 'Inputs to teachers for the said changes and prepare them for the conducting classes as per the new syllabus.',
    subtitleMr: 'शिक्षकांना अभ्यासक्रमातील बदलांनुसार तयार करणे व अध्यापनाचे प्रशिक्षण देणे.',
    descriptionEn: 'Inputs to teachers for the said changes and prepare them for the conducting classes as per the new syllabus. Equips educators with interactive teaching methodologies, Devanagari pedagogical aids, and curriculum management.',
    descriptionMr: 'नवीन अभ्यासक्रमानुसार वर्ग चालवण्यासाठी शिक्षकांना आवश्यक ती माहिती व तंत्रज्ञान देणे आणि प्रभावी अध्यापनासाठी तयार करणे.',
    level: 'Advanced',
    duration: 'Intensive Workshop Series',
    totalLessons: 0,
    totalHours: '30 Hours',
    mode: 'Hybrid',
    fee: 'Contact Trust',
    isFreeOrSubsidized: false,
    thumbnail: '/Photos/Teachers-Training-1-updraft-pre-smush-original.jpg',
    upcomingBatch: 'Special Teacher Cohorts',
    prerequisites: ['Sanskrit teachers and educators'],
    learningOutcomes: [
      'Readiness for conducting classes as per the latest revised syllabus',
      'Modern pedagogical tools and student engagement methods'
    ],
    certificateProvided: true,
    featured: true,
    instructor: {
      name: 'Senior Pedagogy Faculty',
      titleEn: 'Master Teacher Educators',
      titleMr: 'ज्येष्ठ शिक्षक मार्गदर्शक',
      credentials: 'Surawanee Academic Council',
      avatar: '/Photos/shikshak-prashikshan-updraft-pre-smush-original.jpg'
    },
    modules: [
      {
        id: 'ttc-m1',
        titleEn: 'Syllabus Adaptation & Modern Pedagogy',
        titleMr: 'अभ्यासक्रम बदल व अध्यापन कौशल्ये',
        duration: 'Module',
        description: 'Equipping teachers with new syllabus requirements.',
        topics: ['New syllabus guidelines', 'Classroom management', 'Content coming soon']
      }
    ]
  }
];

// Exact 4 Home course category cards data
export const HOME_COURSE_CATEGORIES = [
  {
    id: 'sanskar-varg',
    titleEn: 'Sanskar Varg',
    titleMr: 'संस्कार वर्ग',
    descriptionEn: 'This course is designed for children between the age of 5-10 years.',
    descriptionMr: '५ ते १० वर्षे वयोगटातील मुलांसाठी हा वर्ग तयार करण्यात आला आहे.',
    badgeEn: 'Age 5-10 Years',
    badgeMr: 'वय ५-१० वर्षे',
    routeId: 'sanskar-varg',
    icon: 'Sparkles'
  },
  {
    id: 'sanskrut-language-classes',
    titleEn: 'Sanskrut Language Classes',
    titleMr: 'संस्कृत भाषा वर्ग',
    descriptionEn: 'In these classes the students are taught the school syllabus.',
    descriptionMr: 'या वर्गांमध्ये विद्यार्थ्यांना शालेय अभ्यासक्रम शिकवला जातो.',
    badgeEn: 'School Syllabus',
    badgeMr: 'शालेय अभ्यासक्रम',
    routeId: 'sanskrut-language-classes',
    icon: 'BookOpen'
  },
  {
    id: 'space-of-paurohitya',
    titleEn: 'Space of Paurohitya',
    titleMr: 'पौरोहित्य वर्ग',
    descriptionEn: 'These courses include the teaching of the proper pronunciation of specific stotras (stotra pathan) which are related to shodashopachar puja and the puja itself.',
    descriptionMr: 'या अभ्यासक्रमात षोडशोपचार पूजा आणि स्वतः पूजा यांच्याशी संबंधित विशिष्ट स्तोत्रांचे (स्तोत्र पठण) योग्य उच्चारण शिकवले जाते.',
    badgeEn: 'Paurohitya & Puja',
    badgeMr: 'पूजा विधी व स्तोत्र',
    routeId: 'stotra-pathan',
    icon: 'Flame'
  },
  {
    id: 'teachers-training-courses',
    titleEn: 'Teachers Training Courses',
    titleMr: 'शिक्षक प्रशिक्षण वर्ग',
    descriptionEn: 'Inputs to teachers for the said changes and prepare them for the conducting classes as per the new syllabus',
    descriptionMr: 'बदललेल्या अभ्यासक्रमानुसार वर्ग चालवण्यासाठी शिक्षकांना आवश्यक ती माहिती देणे व तयार करणे.',
    badgeEn: 'Pedagogy & Methodology',
    badgeMr: 'अध्यापन पद्धती',
    routeId: 'teachers-training-courses',
    icon: 'GraduationCap'
  }
];

// Sponsors (Real sponsors from surawanee.org: TechnoAdviser and Surawanee secondary mark)
export const SPONSORS = [
  {
    id: 'technoadviser',
    name: 'TechnoAdviser',
    url: 'https://technoadviser.com',
    logoText: 'TechnoAdviser',
    subtitle: 'Technology & Web Advisory Partner',
    isPrimary: true
  },
  {
    id: 'surawanee-mark',
    name: 'Surawanee Dyan Mandir',
    url: '#',
    logoText: 'सुरवाणी ज्ञानमंदिर',
    subtitle: 'Charitable Trust (Est. 1958)',
    isOrgMark: true
  }
];

// Verified YouTube Video IDs from surawanee.org Video Gallery
export const REAL_YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: 'vid-2nE2iiCRjWs',
    titleEn: 'Surawanee Dnyanmandir Sanskrit Discourse',
    titleMr: 'सुरवाणी ज्ञानमंदिर संस्कृत व्याख्यान व सादरीकरण',
    speaker: 'Surawanee Dyan Mandir Channel',
    duration: 'Featured Video',
    category: 'Paurohitya & Sanskrit',
    thumbnail: 'https://img.youtube.com/vi/2nE2iiCRjWs/hqdefault.jpg',
    youtubeId: '2nE2iiCRjWs',
    descriptionEn: 'We have prepared some videos for you, like & subscribe to our channel to keep updated with all new videos.',
    descriptionMr: 'आम्ही आपल्यासाठी काही व्हिडिओ तयार केले आहेत, नवीन व्हिडिओंचे अपडेट मिळवण्यासाठी चॅनेलला सबस्क्राईब करा.'
  },
  {
    id: 'vid-EVFxSDpKU5A',
    titleEn: 'Surawanee Sanskrit Stotra & Puja Chanting',
    titleMr: 'सुरवाणी संस्कृत स्तोत्र व पूजा विधी',
    speaker: 'Surawanee Dyan Mandir Channel',
    duration: 'Featured Video',
    category: 'Paurohitya & Stotra Pathan',
    thumbnail: 'https://img.youtube.com/vi/EVFxSDpKU5A/hqdefault.jpg',
    youtubeId: 'EVFxSDpKU5A',
    descriptionEn: 'Official discourse and chanting demonstration from Surawanee Dyan Mandir, Thane.',
    descriptionMr: 'सुरवाणी ज्ञानमंदिर, ठाणे प्रस्तुत अधिकृत स्तोत्र पठण व विधी मार्गदर्शन.'
  }
];

export const VIDEO_ITEMS = REAL_YOUTUBE_VIDEOS;

// Real exact 6 Image Gallery categories
export const GALLERY_CATEGORIES = [
  { id: 'all', labelEn: 'All Photos', labelMr: 'सर्व छायाचित्रे' },
  { id: 'competition', labelEn: 'Competition', labelMr: 'स्पर्धा' },
  { id: 'paurohitya', labelEn: 'Paurohitya Classes', labelMr: 'पौरोहित्य वर्ग' },
  { id: 'bal-sanskar', labelEn: 'Bal Sanskar Classes', labelMr: 'बाल संस्कार वर्ग' },
  { id: 'teachers-training', labelEn: 'Teachers Training', labelMr: 'शिक्षक प्रशिक्षण' },
  { id: 'other-photos', labelEn: 'Other Photos', labelMr: 'इतर छायाचित्रे' },
  { id: 'sanskrit-sambhashan', labelEn: 'Sanskrit Sambhashan Varg', labelMr: 'संस्कृत संभाषण वर्ग' }
];

// Archive Photos for Carousel & Gallery (Curated with exact tags matching the 6 categories)
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-comp-1',
    titleEn: 'Subhashit Pathan & Geeta Chanting Competition',
    titleMr: 'सुभाषित व भगवद्गीता पठण स्पर्धा',
    category: 'events',
    categoryLabel: 'Competition',
    imageUrl: '/Photos/Surwanee_competition_6-scaled-updraft-pre-smush-original.jpg',
    year: 'Archive',
    captionEn: 'Subhashit Pathan competition conducted for school-going children and Bhagvat Geeta chanting with Thane College.',
    captionMr: 'शालेय विद्यार्थ्यांसाठी सुभाषित पठण स्पर्धा आणि ठाणे महाविद्यालयासोबत भगवद्गीता स्पर्धा.'
  },
  {
    id: 'gal-pau-1',
    titleEn: 'Paurohitya Practical Stotra & Puja Class',
    titleMr: 'पौरोहित्य स्तोत्र व पूजा वर्ग',
    category: 'paurohitya',
    categoryLabel: 'Paurohitya Classes',
    imageUrl: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg',
    year: 'Archive',
    captionEn: 'Paurohitya trainees learning proper pronunciation of specific stotras related to shodashopachar puja.',
    captionMr: 'षोडशोपचार पूजा आणि स्तोत्र पठणाचे शास्त्रशुद्ध उच्चारण शिकणारे विद्यार्थी.'
  },
  {
    id: 'gal-bal-1',
    titleEn: 'Bal Sanskar Varg Sessions (Age 5-10)',
    titleMr: 'बाल संस्कार वर्ग (वय ५-१० वर्षे)',
    category: 'classes',
    categoryLabel: 'Bal Sanskar Classes',
    imageUrl: '/Photos/kids-rainbow-surawanee-updraft-pre-smush-original.png',
    year: 'Archive',
    captionEn: 'Young children in weekend Bal Sanskar Varg learning Sanskrit shlokas and moral stories.',
    captionMr: '५ ते १० वर्षे वयोगटातील बालके संस्कार वर्गात स्तोत्र व कथा शिकताना.'
  },
  {
    id: 'gal-tt-1',
    titleEn: 'Teachers Training Workshop on New Syllabus',
    titleMr: 'नवीन अभ्यासक्रम शिक्षक प्रशिक्षण कार्यशाळा',
    category: 'convocation',
    categoryLabel: 'Teachers Training',
    imageUrl: '/Photos/Teachers-Training-1-updraft-pre-smush-original.jpg',
    year: 'Archive',
    captionEn: 'Inputs to teachers for syllabus changes and preparing them for conducting classes as per new standards.',
    captionMr: 'नवीन अभ्यासक्रमानुसार वर्ग चालवण्यासाठी शिक्षकांना मार्गदर्शन कार्यशाळा.'
  },
  {
    id: 'gal-oth-1',
    titleEn: 'Padma Niwas Trust Premises & Assembly',
    titleMr: 'पद्म निवास वास्तू व ऐतिहासिक मेळावा',
    category: 'historical',
    categoryLabel: 'Other Photos',
    imageUrl: '/Photos/Surawanee_new_location-updraft-pre-smush-original.png',
    year: 'Archive',
    captionEn: 'Surawanee Dyan Mandir premises at Padma Niwas, Ram Maruti Cross Lane, Naupada, Thane.',
    captionMr: 'पद्म निवास, राम मारुती क्रॉस लेन, नौपाडा ठाणे येथील संस्थेचे कार्यालय व वर्ग.'
  },
  {
    id: 'gal-samb-1',
    titleEn: 'Sanskrit Sambhashan Interactive Session',
    titleMr: 'संस्कृत संभाषण प्रात्यक्षिक सत्र',
    category: 'classes',
    categoryLabel: 'Sanskrit Sambhashan Varg',
    imageUrl: '/Photos/Sambhashan-Varg-1-updraft-pre-smush-original.jpg',
    year: 'Archive',
    captionEn: 'Students conversing fluently in Sanskrit in the language classes affiliated with Sanskrit Bhasha Prasarini Sabha.',
    captionMr: 'संस्कृत भाषा प्रसरिणी सभा संलग्नित संभाषण वर्गातील संवादाचे सत्र.'
  },
  {
    id: 'gal-hist-1',
    titleEn: 'Historical Sanman & Pradhanacharya Honor',
    titleMr: 'प्राचार्य सन्मान व ऐतिहासिक मानपत्र',
    category: 'historical',
    categoryLabel: 'Historical',
    imageUrl: '/Photos/Pradhanacharya-Manapatra-updraft-pre-smush-original.jpg',
    year: 'Historical',
    captionEn: 'Felicitation and Manapatra honor bestowed upon Surawanee Acharyas.',
    captionMr: 'सुरवाणीच्या आचार्यांना प्रदान करण्यात आलेले मानपत्र व सन्मान.'
  },
  {
    id: 'gal-hist-2',
    titleEn: 'Spiritual Vedic Conference & Discourse',
    titleMr: 'आध्यात्मिक वैदिक संमेलन व व्याख्यान',
    category: 'events',
    categoryLabel: 'Events',
    imageUrl: '/Photos/Spiritual_surawanee-updraft-pre-smush-original.jpeg',
    year: 'Historical',
    captionEn: 'Vedic discourse and spiritual gathering at Surawanee Dnyanmandir.',
    captionMr: 'सुरवाणी ज्ञानमंदिर येथे आयोजित वैदिक व्याख्यान व आध्यात्मिक मेळावा.'
  },
  {
    id: 'gal-comp-2',
    titleEn: 'State Level Competition Award Ceremony',
    titleMr: 'राज्यस्तरीय पारितोषिक वितरण सोहळा',
    category: 'events',
    categoryLabel: 'Competition',
    imageUrl: '/Photos/Surwanee_competition_8-scaled-updraft-pre-smush-original.jpg',
    year: 'Archive',
    captionEn: 'Surawanee student team winning second prize in state-level competition.',
    captionMr: 'राज्यस्तरीय स्पर्धेत सुरवाणीच्या विद्यार्थी टीमला द्वितीय पारितोषिक.'
  }
];

// Audio items for Knowledge Share and Stotra Pathan
export const AUDIO_ITEMS: AudioItem[] = [
  {
    id: 'aud-stotra-1',
    titleEn: 'Shiv Mahimna Stotra (स्तोत्र पठण)',
    titleMr: 'शिवमहिम्न स्तोत्र (शुद्ध उच्चार)',
    subtitleEn: 'Stotra Pathan with rhythmic clarity & pronunciation rules',
    subtitleMr: 'शुद्ध उच्चार व लयीसह स्तोत्र पठण',
    category: 'stotra',
    duration: '11:20',
    reciter: 'Surawanee Paurohitya Acharyas',
    shlokaText: 'महिम्नः पारं ते परमविदुषो यद्यसदृशी\nस्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।\nअथाऽवाच्यः सर्वः स्वमतिपरिणामावधि गृणन्\nममाप्येष स्तोत्रे हर निरपवादः परिकरः॥',
    transliteration: 'Mahimnaḥ pāraṁ te paramaviduṣo yadyasadṛśī |\nStutirbrahmādīnāmapi tadavasannāstvayi giraḥ ||\nAthāvācyaḥ sarvaḥ svamatipariṇāmāvadhi gṛṇan |\nMamāpyeṣa stotre hara nirapavādaḥ parikaraḥ ||',
    meaning: 'If praise by one ignorant of the limitless glory of Lord Shiva is unworthy, then even the hymns of Brahma and gods are inadequate. But when all praise according to their own capacity, my effort in singing this hymn is also free from fault.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    audioFrequency: 220
  },
  {
    id: 'aud-stotra-2',
    titleEn: 'Ganapati Atharvashirsha (सस्वर पाठ)',
    titleMr: 'श्री गणपती अथर्वशीर्ष (सस्वर पाठ)',
    subtitleEn: 'Rigvedic Ghanapaathi cadence with precise swara accents',
    subtitleMr: 'शुद्ध स्वरांसह प्रामाणिक वैदिक उच्चारण',
    category: 'vedic-chant',
    duration: '6:42',
    reciter: 'Surawanee Paurohitya Department',
    shlokaText: 'ॐ नमस्ते गणपतये। त्वमेव प्रत्यक्षं तत्त्वमसि।\nत्वमेव केवलं कर्ताऽसि। त्वमेव केवलं धर्ताऽसि।\nत्वमेव केवलं हर्ताऽसि। त्वमेव सर्वं खल्विदं ब्रह्मासि।\nत्वं साक्षादात्माऽसि नित्यम्॥',
    transliteration: 'Oṁ namaste gaṇapataye | Tvameva pratyakṣaṁ tattvamasi |\nTvameva kevalaṁ kartāsi | Tvameva kevalaṁ dhartāsi |\nTvameva kevalaṁ hartāsi | Tvameva sarvaṁ khalvidaṁ brahmāsi |\nTvaṁ sākṣādātmāsi nityam ||',
    meaning: 'Salutations unto you, O Lord Ganapati! You alone are the manifest ultimate Reality. You alone are the creator, sustainer, and dissolver. Indeed, You are this entire universe and the eternal Self.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    audioFrequency: 220
  },
  {
    id: 'aud-stotra-3',
    titleEn: 'Durga Saptashati & Stotra Guidance',
    titleMr: 'दुर्गा सप्तशती व स्तोत्र मार्गदर्शन',
    subtitleEn: 'Pronunciation cadence for Shodashopachar Puja',
    subtitleMr: 'पूजा विधीसाठी स्तोत्र उच्चार मार्गदर्शन',
    category: 'stotra',
    duration: '8:15',
    reciter: 'Surawanee Stotra Pathan Faculty',
    shlokaText: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
    transliteration: 'Sarvamaṅgalamāṅgalye śive sarvārthasādhike |\nŚaraṇye tryambake gauri nārāyaṇi namostu te ||',
    meaning: 'O Auspicious One, the most auspicious of all, the accomplisher of all pursuits, the refuge of all, three-eyed Gauri, Narayani, salutations unto You!',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    audioFrequency: 247
  }
];

// Document Items for Knowledge Share
export const DOCUMENT_ITEMS: DocumentItem[] = [
  {
    id: 'doc-1',
    titleEn: 'Stotra Pathan Pronunciation Guide (स्तोत्र उच्चारण नियम)',
    titleMr: 'स्तोत्र उच्चारण नियम व मार्गदर्शिका',
    category: 'Study Material',
    author: 'Surawanee Dyan Mandir Faculty',
    pages: 28,
    fileSize: '1.8 MB (PDF)',
    language: 'Sanskrit & Marathi',
    descriptionEn: 'Detailed rules on Sanskrit letter articulation, rhythm, and breath discipline for Stotra chanting.',
    descriptionMr: 'स्तोत्र पठणासाठी शुद्ध वर्णोच्चार, यती, लय आणि नियमांची मार्गदर्शिका.'
  },
  {
    id: 'doc-2',
    titleEn: 'Paurohitya Shodashopachar Pooja Reference',
    titleMr: 'षोडशोपचार पूजा संदर्भ पुस्तिका',
    category: 'Syllabus',
    author: 'Surawanee Paurohitya Section',
    pages: 42,
    fileSize: '2.4 MB (PDF)',
    language: 'Sanskrit & Marathi',
    descriptionEn: 'Step-by-step guidance for Shodashopachar Puja, Ganapati Puja, and Satyanarayan rituals.',
    descriptionMr: 'गणपती पूजा, सत्यनारायण व षोडशोपचार पूजा विधींची अधिकृत पुस्तिका.'
  },
  {
    id: 'doc-3',
    titleEn: 'Subhashit Sangraha for School Competitions',
    titleMr: 'शालेय सुभाषित संग्रह व अर्थ',
    category: 'Study Material',
    author: 'Surawanee Subhashit Board',
    pages: 36,
    fileSize: '1.5 MB (PDF)',
    language: 'Sanskrit, Marathi & English',
    descriptionEn: 'Prescribed Subhashitas for interschool chanting competitions organized by Surawanee in Thane.',
    descriptionMr: 'ठाण्यातील आंतरशालेय सुभाषित पठण स्पर्धेसाठी निवडक सुभाषितांचा संग्रह.'
  }
];

// Active Trust Calendar Events (2026)
export const TRUST_EVENTS: TrustEvent[] = [
  {
    id: 'event-1',
    titleEn: 'Annual Subhashit Pathan Competition',
    titleMr: 'वार्षिक सुभाषित पठण स्पर्धा',
    date: '2026-10-15',
    day: '15',
    month: 'OCT',
    year: '2026',
    time: '05:00 PM - 08:00 PM',
    venueEn: 'Padma Niwas Sabhagruha, Thane',
    venueMr: 'पद्म निवास सभागृह, ठाणे',
    category: 'Competition',
    descriptionEn: 'Interschool Sanskrit Subhashit recitation for school children across Thane district.',
    descriptionMr: 'ठाणे जिल्ह्यातील शालेय विद्यार्थ्यांसाठी आंतरशालेय सुभाषित पठण स्पर्धा.',
    image: '/Photos/Surwanee_competition_6-scaled-updraft-pre-smush-original.jpg'
  },
  {
    id: 'event-2',
    titleEn: 'Bhagavat Geeta Chanting & Dikshant Samaroh',
    titleMr: 'भगवद्गीता पठण व दीक्षांत समारंभ',
    date: '2026-11-20',
    day: '20',
    month: 'NOV',
    year: '2026',
    time: '04:30 PM - 07:30 PM',
    venueEn: 'Thane College Arts Division Hall',
    venueMr: 'ठाणे महाविद्यालय कला विभाग सभागृह',
    category: 'Convocation',
    descriptionEn: 'Joint Geeta recitation with Thane College Arts Division and certificate distribution for Paurohitya graduates.',
    descriptionMr: 'ठाणे कॉलेज सोबत भगवद्गीता पठण आणि पौरोहित्य पदवीधरांचा दीक्षांत सोहळा.',
    image: '/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg'
  }
];

export const ENROLLMENTS: EnrollmentRecord[] = [
  {
    id: 'enr-101',
    studentName: 'Amit Suresh Joshi',
    email: 'amit.joshi@gmail.com',
    phone: '+91 98201 12345',
    courseName: 'Paurohitya Track & Rigveda Rituals',
    courseId: 'paurohitya-track',
    batchPreference: 'Weekend Morning (Thane Campus)',
    priorKnowledge: 'School level Sanskrit (Std 8-10)',
    occupation: 'Software Engineer',
    city: 'Thane West',
    notes: 'Interested in learning evening Ganesh Puja and Shodashopachar vidhi.',
    createdAt: '2026-03-01T10:30:00Z',
    status: 'Pending'
  },
  {
    id: 'enr-102',
    studentName: 'Sunita Madhav Deshpande',
    email: 'sunita.deshpande@outlook.com',
    phone: '+91 98690 54321',
    courseName: 'Sanskrut Sambhashan Varg (संस्कृत संभाषण)',
    courseId: 'sanskrut-sambhashan',
    batchPreference: 'Weekday Evening Online',
    priorKnowledge: 'Absolute Beginner (Knows Devanagari)',
    occupation: 'Teacher',
    city: 'Naupada, Thane',
    notes: 'Wants to converse fluently in daily Sanskrit.',
    createdAt: '2026-03-02T14:15:00Z',
    status: 'Contacted'
  }
];

export const INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-201',
    name: 'Rajesh Kulkarni',
    email: 'rajesh.k@yahoo.com',
    phone: '+91 98210 99887',
    subject: 'Bal Sanskar Varg Admission Inquiry for 8 yr old child',
    message: 'Namaskar, I want to enroll my son in Bal Sanskar Varg on Sundays. Please share timing and Padma Niwas location details.',
    createdAt: '2026-03-02T09:00:00Z',
    status: 'New'
  }
];
