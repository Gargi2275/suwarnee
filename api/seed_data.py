# Seed data for Surawanee Dnyanmandir SQLite database

DEFAULT_CATEGORIES = [
  {
    "id": "paurohitya",
    "titleEn": "Paurohitya Track",
    "titleMr": "पौरोहित्य वर्ग",
    "type": "course",
    "descriptionEn": "Priest training, ritual ceremonies, pujas, and Vedic rites",
    "descriptionMr": "पौरोहित्य प्रशिक्षण, पूजाविधी व शास्त्रोक्त संस्कार"
  },
  {
    "id": "other-courses",
    "titleEn": "Other Courses",
    "titleMr": "इतर अभ्यासक्रम",
    "type": "course",
    "descriptionEn": "General Sanskrit learning, language vargs, and teacher training",
    "descriptionMr": "सामान्य संस्कृत शिक्षण व इतर वर्ग"
  },
  {
    "id": "language",
    "titleEn": "Sanskrit Language",
    "titleMr": "संस्कृत भाषा",
    "type": "course",
    "descriptionEn": "Grammar, conversation, literature and foundation classes",
    "descriptionMr": "व्याकरण, संभाषण व भाषा परिचय वर्ग"
  },
  {
    "id": "sanskar",
    "titleEn": "Sanskar Varg",
    "titleMr": "संस्कार वर्ग",
    "type": "course",
    "descriptionEn": "Value education, shlokas, and cultural heritage for kids",
    "descriptionMr": "मुलांसाठी संस्कार, श्लोक व मूल्यांचे धडे"
  },
  {
    "id": "teachers-training",
    "titleEn": "Teachers Training",
    "titleMr": "शिक्षक प्रशिक्षण",
    "type": "course",
    "descriptionEn": "Pedagogy and advanced teaching methodologies for Sanskrit tutors",
    "descriptionMr": "संस्कृत शिक्षकांसाठी अध्यापन कौशल्ये"
  },
  {
    "id": "paurohitya-media",
    "titleEn": "Paurohitya Media",
    "titleMr": "पौरोहित्य साहित्य",
    "type": "knowledge",
    "descriptionEn": "Audio chants, ritual demonstration videos, and puja manuals",
    "descriptionMr": "पूजाविधी ध्वनी, व्हिडिओ व साहित्य"
  },
  {
    "id": "audio-recitations",
    "titleEn": "Audio Recitations",
    "titleMr": "ध्वनी फीती (Audio)",
    "type": "knowledge",
    "descriptionEn": "Authentic Veda mantras, Stotras, and pronunciation guides",
    "descriptionMr": "वेद मंत्रोच्चार, स्तोत्र पठण व शुद्ध उच्चार"
  },
  {
    "id": "video-lectures",
    "titleEn": "Video Lectures",
    "titleMr": "व्हिडिओ वर्ग",
    "type": "knowledge",
    "descriptionEn": "Recorded lectures, webinars, and event broadcasts",
    "descriptionMr": "व्याख्याने, व्हिडिओ पाठ व सोहळे"
  },
  {
    "id": "study-docs",
    "titleEn": "Study Material & PDFs",
    "titleMr": "अभ्यास साहित्य व पुस्तके",
    "type": "knowledge",
    "descriptionEn": "Downloadable PDF reference guides, research papers, and manuscripts",
    "descriptionMr": "अभ्यासक्रम मार्गदर्शिका, ई-पुस्तके व हस्तलिखिते"
  }
]

DEFAULT_COURSES = [
  {
    "id": "stotra-pathan",
    "titleEn": "Stotra Pathan",
    "titleMr": "स्तोत्र पठण",
    "category": "paurohitya",
    "categoryLabelEn": "Paurohitya",
    "categoryLabelMr": "पौरोहित्य",
    "subtitleEn": "Proper pronunciation, meter, and sacred context of Stotras related to Puja rituals.",
    "subtitleMr": "पूजा विधी आणि स्तोत्रांचे शुद्ध उच्चारण, लय व अध्यात्मिक ज्ञान.",
    "descriptionEn": "The pronunciation of words is of extreme importance in Sanskrit language as the way one pronounces it is as if communication with the God and hence the clarity, perfect pronunciation and the rhythm in which a stotra (prarthana) is to be pronounced need to be learned through proper Guru.",
    "descriptionMr": "संस्कृत भाषेत शब्दांचे उच्चारण अत्यंत महत्त्वाचे आहे. योग्य गुरूंकडून स्तोत्रांचे शुद्ध, स्पष्ट आणि लयबद्ध उच्चारण शिकणे आवश्यक आहे.",
    "level": "Beginner",
    "duration": "10 Weeks",
    "totalLessons": 12,
    "totalHours": "20+ Hours",
    "mode": "Classroom (Thane)",
    "fee": "Free",
    "isFreeOrSubsidized": True,
    "thumbnail": "/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg",
    "upcomingBatch": "Batch Announcements (Inquire at Padma Niwas Campus)",
    "prerequisites": ["Interest in Sanskrit Stotra recitation"],
    "learningOutcomes": ["Clarity and perfect pronunciation of sacred Stotras"],
    "certificateProvided": True,
    "featured": True,
    "instructor": {
      "name": "Surawanee Faculty",
      "titleEn": "Senior Faculty & Sanskrit Acharyas",
      "titleMr": "संस्कृत प्राध्यापक व तज्ज्ञ",
      "credentials": "Surawanee Dnyanmandir Council",
      "avatar": "/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg"
    }
  },
  {
    "id": "prashikshan-varg-pratham-star",
    "titleEn": "Prashikshan Varg (Pratham Star)",
    "titleMr": "प्रशिक्षण वर्ग (प्रथम स्तर)",
    "category": "paurohitya",
    "categoryLabelEn": "Paurohitya",
    "categoryLabelMr": "पौरोहित्य",
    "subtitleEn": "Foundational stage training for Paurohitya and Vedic ritual ceremonies.",
    "subtitleMr": "पौरोहित्य आणि वैदिक कर्मकांड विधींचा प्रथम स्तर पायाभूत वर्ग.",
    "descriptionEn": "Prashikshan Varg (Pratham Star) is the foundational course in the Paurohitya track, introducing students to Vedic phonetics, primary Sankalpa, and fundamental ritual procedures.",
    "descriptionMr": "पौरोहित्य वर्गाचा पहिला टप्पा. शुद्ध मंत्रोच्चार, संकल्प विधी आणि प्राथमिक पूजा विधींचे शास्त्रोक्त शिक्षण.",
    "level": "Beginner",
    "duration": "12 Weeks",
    "totalLessons": 14,
    "totalHours": "30 Hours",
    "mode": "Classroom (Thane)",
    "fee": "Contact Trust",
    "isFreeOrSubsidized": True,
    "thumbnail": "/Photos/Surawanee_Paurohitya-Varg-2-updraft-pre-smush-original.jpg",
    "upcomingBatch": "Announced Annually in June / July",
    "prerequisites": ["Basic ability to read Devanagari script"],
    "learningOutcomes": ["Understanding the foundations of Vedic rituals"],
    "certificateProvided": True,
    "featured": True,
    "instructor": {
      "name": "Surawanee Paurohitya Faculty",
      "titleEn": "Vedacharya & Ritual Specialists",
      "titleMr": "वेदाचार्य व पौरोहित्य तज्ज्ञ",
      "credentials": "Surawanee Department",
      "avatar": "/Photos/Surawanee_Paurohitya-Varg-1-updraft-pre-smush-original.jpg"
    }
  },
  {
    "id": "pooja-vidhi",
    "titleEn": "Pooja Vidhi",
    "titleMr": "पूजा विधी",
    "category": "paurohitya",
    "categoryLabelEn": "Paurohitya",
    "categoryLabelMr": "पौरोहित्य",
    "subtitleEn": "Practical guidance in Shodashopachar Pooja, Ganapati Pooja, and Satyanarayan Pooja.",
    "subtitleMr": "षोडशोपचार पूजा, गणपती पूजा आणि सत्यनारायण पूजा विधींचे प्रत्यक्ष शिक्षण.",
    "descriptionEn": "Comprehensive training for Ganapati Pooja, Satyanarayan Pooja, and domestic rituals with practical mantras and procedure steps.",
    "descriptionMr": "षोडशोपचार पूजा, गणपती पूजा, सत्यनारायण पूजा आणि इतर नित्य व नैमित्तिक पूजा विधींचे परिपूर्ण शिक्षण.",
    "level": "Intermediate",
    "duration": "10 Weeks",
    "totalLessons": 10,
    "totalHours": "25 Hours",
    "mode": "Classroom (Thane)",
    "fee": "Contact Trust",
    "isFreeOrSubsidized": True,
    "thumbnail": "/Photos/Survani-pujavidhi-updraft-pre-smush-original.png",
    "upcomingBatch": "Weekend Batches at Padma Niwas",
    "prerequisites": ["Basic familiarity with Stotra recitation"],
    "learningOutcomes": ["Mastery of Shodashopachar steps"],
    "certificateProvided": True,
    "featured": True,
    "instructor": {
      "name": "Surawanee Ritual Faculty",
      "titleEn": "Head of Ritual Studies",
      "titleMr": "पूजा विधी मार्गदर्शक",
      "credentials": "Surawanee Dnyanmandir",
      "avatar": "/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg"
    }
  },
  {
    "id": "sanskar-varg",
    "titleEn": "Sanskar Varg",
    "titleMr": "संस्कार वर्ग",
    "category": "sanskar",
    "categoryLabelEn": "Other Courses",
    "categoryLabelMr": "इतर वर्ग",
    "subtitleEn": "This course is designed for children between the age of 5-10 years.",
    "subtitleMr": "५ ते १० वर्षे वयोगटातील मुलांसाठी विशेष संस्कार वर्ग.",
    "descriptionEn": "Designed for children between the age of 5-10 years to learn traditional stotras, values, moral stories, concentration games, and cultural heritage.",
    "descriptionMr": "५ ते १० वयोगटातील मुलांसाठी डिझाइन केलेला हा वर्ग. मुलांमध्ये उत्तम संस्कार, शुद्ध उच्चार, स्तोत्रपठण आणि कथा शिकवल्या जातात.",
    "level": "Beginner",
    "duration": "Annual Weekend Program",
    "totalLessons": 20,
    "totalHours": "40 Hours",
    "mode": "Classroom (Thane)",
    "fee": "Token Contribution",
    "isFreeOrSubsidized": True,
    "thumbnail": "/Photos/kids-rainbow-surawanee-updraft-pre-smush-original.png",
    "upcomingBatch": "Batch starting this term",
    "prerequisites": ["Age 5 to 10 years"],
    "learningOutcomes": ["Recitation of essential Sanskrit Shlokas and moral stories"],
    "certificateProvided": True,
    "featured": True,
    "instructor": {
      "name": "Surawanee Bal Sanskar Faculty",
      "titleEn": "Sanskar Varg Educators",
      "titleMr": "संस्कार वर्ग शिक्षिका",
      "credentials": "Surawanee Dnyanmandir",
      "avatar": "/Photos/kids-rainbow-surawanee-updraft-pre-smush-original.png"
    }
  },
  {
    "id": "sanskrut-language-classes",
    "titleEn": "Sanskrut Language Classes",
    "titleMr": "संस्कृत भाषा वर्ग",
    "category": "language",
    "categoryLabelEn": "Other Courses",
    "categoryLabelMr": "इतर वर्ग",
    "subtitleEn": "In these classes the students are taught the school syllabus.",
    "subtitleMr": "या वर्गांमध्ये विद्यार्थ्यांना शालेय अभ्यासक्रम शिकवला जातो.",
    "descriptionEn": "Covers grammar rules, textbook lessons, composition, translation, and exam preparation with individualized academic support.",
    "descriptionMr": "शालेय विद्यार्थ्यांना त्यांच्या अभ्यासक्रमानुसार संस्कृत व्याकरण, गद्य, पद्य आणि निबंधलेखनाचे मार्गदर्शन केले जाते.",
    "level": "Beginner",
    "duration": "Academic Term",
    "totalLessons": 24,
    "totalHours": "60 Hours",
    "mode": "Classroom (Thane)",
    "fee": "Subsidized Rates",
    "isFreeOrSubsidized": True,
    "thumbnail": "/Photos/Sambhashan-Varg-Vidyaniketan-updraft-pre-smush-original.jpg",
    "upcomingBatch": "Academic Year Batches (June to March)",
    "prerequisites": ["School students studying Sanskrit"],
    "learningOutcomes": ["Thorough mastery of prescribed school syllabus"],
    "certificateProvided": True,
    "featured": True,
    "instructor": {
      "name": "Surawanee Teachers",
      "titleEn": "Syllabus Specialists",
      "titleMr": "शालेय अभ्यासक्रम तज्ज्ञ",
      "credentials": "Surawanee Faculty",
      "avatar": "/Photos/Sambhashan-Varg-1-updraft-pre-smush-original.jpg"
    }
  },
  {
    "id": "teachers-training-courses",
    "titleEn": "Teachers Training Courses",
    "titleMr": "शिक्षक प्रशिक्षण वर्ग",
    "category": "teachers-training",
    "categoryLabelEn": "Other Courses",
    "categoryLabelMr": "इतर वर्ग",
    "subtitleEn": "Inputs to teachers for syllabus changes and preparing them for classes.",
    "subtitleMr": "शिक्षकांना अभ्यासक्रमातील बदलांनुसार तयार करणे व अध्यापनाचे प्रशिक्षण देणे.",
    "descriptionEn": "Equips educators with interactive teaching methodologies, Devanagari pedagogical aids, and curriculum management.",
    "descriptionMr": "नवीन अभ्यासक्रमानुसार वर्ग चालवण्यासाठी शिक्षकांना आवश्यक ती माहिती देणे आणि प्रभावी अध्यापनासाठी तयार करणे.",
    "level": "Advanced",
    "duration": "Intensive Workshop Series",
    "totalLessons": 10,
    "totalHours": "30 Hours",
    "mode": "Hybrid",
    "fee": "Contact Trust",
    "isFreeOrSubsidized": False,
    "thumbnail": "/Photos/Teachers-Training-1-updraft-pre-smush-original.jpg",
    "upcomingBatch": "Special Teacher Cohorts",
    "prerequisites": ["Sanskrit teachers and educators"],
    "learningOutcomes": ["Readiness for conducting classes as per latest revised syllabus"],
    "certificateProvided": True,
    "featured": True,
    "instructor": {
      "name": "Master Educators",
      "titleEn": "Senior Pedagogy Faculty",
      "titleMr": "ज्येष्ठ शिक्षक मार्गदर्शक",
      "credentials": "Surawanee Academic Council",
      "avatar": "/Photos/shikshak-prashikshan-updraft-pre-smush-original.jpg"
    }
  }
]

DEFAULT_GALLERY = [
  {
    "id": "gal-comp-1",
    "titleEn": "Subhashit Pathan & Geeta Chanting Competition",
    "titleMr": "सुभाषित व भगवद्गीता पठण स्पर्धा",
    "category": "events",
    "categoryLabel": "Competition",
    "imageUrl": "/Photos/Surwanee_competition_6-scaled-updraft-pre-smush-original.jpg",
    "year": "Archive",
    "captionEn": "Subhashit Pathan competition conducted for school-going children and Bhagvat Geeta chanting with Thane College.",
    "captionMr": "शालेय विद्यार्थ्यांसाठी सुभाषित पठण स्पर्धा आणि ठाणे महाविद्यालयासोबत भगवद्गीता स्पर्धा."
  },
  {
    "id": "gal-pau-1",
    "titleEn": "Paurohitya Practical Stotra & Puja Class",
    "titleMr": "पौरोहित्य स्तोत्र व पूजा वर्ग",
    "category": "paurohitya",
    "categoryLabel": "Paurohitya Classes",
    "imageUrl": "/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg",
    "year": "Archive",
    "captionEn": "Paurohitya trainees learning proper pronunciation of specific stotras related to shodashopachar puja.",
    "captionMr": "षोडशोपচার पूजा आणि स्तोत्र पठणाचे शास्त्रशुद्ध उच्चारण शिकणारे विद्यार्थी."
  },
  {
    "id": "gal-bal-1",
    "titleEn": "Bal Sanskar Varg Sessions (Age 5-10)",
    "titleMr": "बाल संस्कार वर्ग (वय ५-१० वर्षे)",
    "category": "classes",
    "categoryLabel": "Bal Sanskar Classes",
    "imageUrl": "/Photos/kids-rainbow-surawanee-updraft-pre-smush-original.png",
    "year": "Archive",
    "captionEn": "Young children in weekend Bal Sanskar Varg learning Sanskrit shlokas and moral stories.",
    "captionMr": "५ ते १० वर्षे वयोगटातील बालके संस्कार वर्गात स्तोत्र व कथा शिकताना."
  },
  {
    "id": "gal-tt-1",
    "titleEn": "Teachers Training Workshop on New Syllabus",
    "titleMr": "नवीन अभ्यासक्रम शिक्षक प्रशिक्षण कार्यशाळा",
    "category": "convocation",
    "categoryLabel": "Teachers Training",
    "imageUrl": "/Photos/Teachers-Training-1-updraft-pre-smush-original.jpg",
    "year": "Archive",
    "captionEn": "Inputs to teachers for syllabus changes and preparing them for conducting classes as per new standards.",
    "captionMr": "नवीन अभ्यासक्रमानुसार वर्ग चालवण्यासाठी शिक्षकांना मार्गदर्शन कार्यशाळा."
  },
  {
    "id": "gal-oth-1",
    "titleEn": "Padma Niwas Trust Premises & Assembly",
    "titleMr": "पद्म निवास वास्तू व ऐतिहासिक मेळावा",
    "category": "historical",
    "categoryLabel": "Other Photos",
    "imageUrl": "/Photos/Surawanee_new_location-updraft-pre-smush-original.png",
    "year": "Archive",
    "captionEn": "Surawanee Dyan Mandir premises at Padma Niwas, Ram Maruti Cross Lane, Naupada, Thane.",
    "captionMr": "पद्म निवास, राम मारुती क्रॉस लेन, नौपाडा ठाणे येथील संस्थेचे कार्यालय व वर्ग."
  },
  {
    "id": "gal-samb-1",
    "titleEn": "Sanskrit Sambhashan Interactive Session",
    "titleMr": "संस्कृत संभाषण प्रात्यक्षिक सत्र",
    "category": "classes",
    "categoryLabel": "Sanskrit Sambhashan Varg",
    "imageUrl": "/Photos/Sambhashan-Varg-1-updraft-pre-smush-original.jpg",
    "year": "Archive",
    "captionEn": "Students conversing fluently in Sanskrit in the language classes affiliated with Sanskrit Bhasha Prasarini Sabha.",
    "captionMr": "संस्कृत भाषा प्रसरिणी सभा संलग्नित संभाषण वर्गातील संवादाचे सत्र."
  },
  {
    "id": "gal-hist-1",
    "titleEn": "Historical Sanman & Pradhanacharya Honor",
    "titleMr": "प्राचार्य सन्मान व ऐतिहासिक मानपत्र",
    "category": "historical",
    "categoryLabel": "Historical",
    "imageUrl": "/Photos/Pradhanacharya-Manapatra-updraft-pre-smush-original.jpg",
    "year": "Historical",
    "captionEn": "Felicitation and Manapatra honor bestowed upon Surawanee Acharyas.",
    "captionMr": "सुरवाणीच्या आचार्यांना प्रदान करण्यात आलेले मानपत्र व सन्मान."
  },
  {
    "id": "gal-hist-2",
    "titleEn": "Spiritual Vedic Conference & Discourse",
    "titleMr": "आध्यात्मिक वैदिक संमेलन व व्याख्यान",
    "category": "events",
    "categoryLabel": "Events",
    "imageUrl": "/Photos/Spiritual_surawanee-updraft-pre-smush-original.jpeg",
    "year": "Historical",
    "captionEn": "Vedic discourse and spiritual gathering at Surawanee Dnyanmandir.",
    "captionMr": "सुरवाणी ज्ञानमंदिर येथे आयोजित वैदिक व्याख्यान व आध्यात्मिक मेळावा."
  },
  {
    "id": "gal-comp-2",
    "titleEn": "State Level Competition Award Ceremony",
    "titleMr": "राज्यस्तरीय पारितोषिक वितरण सोहळा",
    "category": "events",
    "categoryLabel": "Competition",
    "imageUrl": "/Photos/Surwanee_competition_8-scaled-updraft-pre-smush-original.jpg",
    "year": "Archive",
    "captionEn": "Surawanee student team winning second prize in state-level competition.",
    "captionMr": "राज्यस्तरीय स्पर्धेत सुरवाणीच्या विद्यार्थी टीमला द्वितीय पारितोषिक."
  }
]

DEFAULT_AUDIO = [
  {
    "id": "aud-stotra-1",
    "titleEn": "Shiv Mahimna Stotra (स्तोत्र पठण)",
    "titleMr": "शिवमहिम्न स्तोत्र (शुद्ध उच्चार)",
    "subtitleEn": "Stotra Pathan with rhythmic clarity & pronunciation rules",
    "subtitleMr": "शुद्ध उच्चार व लयीसह स्तोत्र पठण",
    "category": "stotra",
    "duration": "11:20",
    "reciter": "Surawanee Paurohitya Acharyas",
    "shlokaText": "महिम्नः पारं ते परमविदुषो यद्यसदृशी\nस्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।\nअथाऽवाच्यः सर्वः स्वमतिपरिणामावधि गृणन्\nममाप्येष स्तोत्रे हर निरपवादः परिकरः॥",
    "transliteration": "Mahimnaḥ pāraṁ te paramaviduṣo yadyasadṛśī |\nStutirbrahmādīnāmapi tadavasannāstvayi giraḥ ||",
    "meaning": "If praise by one ignorant of the glory of Shiva is unworthy, even Brahma's hymns are inadequate. But when all praise according to their capacity, my effort is also free from fault.",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioFrequency": 220
  },
  {
    "id": "aud-stotra-2",
    "titleEn": "Ganapati Atharvashirsha (सस्वर पाठ)",
    "titleMr": "श्री गणपती अथर्वशीर्ष (सस्वर पाठ)",
    "subtitleEn": "Rigvedic Ghanapaathi cadence with precise swara accents",
    "subtitleMr": "शुद्ध स्वरांसह प्रामाणिक वैदिक उच्चारण",
    "category": "vedic-chant",
    "duration": "6:42",
    "reciter": "Surawanee Paurohitya Department",
    "shlokaText": "ॐ नमस्ते गणपतये। त्वमेव प्रत्यक्षं तत्त्वमसि।\nत्वमेव केवलं कर्ताऽसि। त्वमेव केवलं धर्ताऽसि।\nत्वमेव केवलं हर्ताऽसि। त्वमेव सर्वं खल्विदं ब्रह्मासि।",
    "transliteration": "Oṁ namaste gaṇapataye | Tvameva pratyakṣaṁ tattvamasi |",
    "meaning": "Salutations unto you, O Lord Ganapati! You alone are the manifest ultimate Reality.",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "audioFrequency": 220
  },
  {
    "id": "aud-stotra-3",
    "titleEn": "Durga Saptashati & Stotra Guidance",
    "titleMr": "दुर्गा सप्तशती व स्तोत्र मार्गदर्शन",
    "subtitleEn": "Pronunciation cadence for Shodashopachar Puja",
    "subtitleMr": "पूजा विधीसाठी स्तोत्र उच्चार मार्गदर्शन",
    "category": "stotra",
    "duration": "8:15",
    "reciter": "Surawanee Stotra Pathan Faculty",
    "shlokaText": "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
    "transliteration": "Sarvamaṅgalamāṅgalye śive sarvārthasādhike |",
    "meaning": "O Auspicious One, the most auspicious of all, salutations unto You!",
    "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "audioFrequency": 247
  }
]

DEFAULT_VIDEOS = [
  {
    "id": "vid-2nE2iiCRjWs",
    "titleEn": "Surawanee Dnyanmandir Sanskrit Discourse",
    "titleMr": "सुरवाणी ज्ञानमंदिर संस्कृत व्याख्यान व सादरीकरण",
    "speaker": "Surawanee Dyan Mandir Channel",
    "duration": "Featured Video",
    "category": "Paurohitya & Sanskrit",
    "thumbnail": "https://img.youtube.com/vi/2nE2iiCRjWs/hqdefault.jpg",
    "youtubeId": "2nE2iiCRjWs",
    "descriptionEn": "We have prepared some videos for you, like & subscribe to our channel to keep updated with all new videos.",
    "descriptionMr": "आम्ही आपल्यासाठी काही व्हिडिओ तयार केले आहेत, नवीन व्हिडिओंचे अपडेट मिळवण्यासाठी चॅनेलला सबस्क्राईब करा."
  },
  {
    "id": "vid-EVFxSDpKU5A",
    "titleEn": "Surawanee Sanskrit Stotra & Puja Chanting",
    "titleMr": "सुरवाणी संस्कृत स्तोत्र व पूजा विधी",
    "speaker": "Surawanee Dyan Mandir Channel",
    "duration": "Featured Video",
    "category": "Paurohitya & Stotra Pathan",
    "thumbnail": "https://img.youtube.com/vi/EVFxSDpKU5A/hqdefault.jpg",
    "youtubeId": "EVFxSDpKU5A",
    "descriptionEn": "Official discourse and chanting demonstration from Surawanee Dyan Mandir, Thane.",
    "descriptionMr": "सुरवाणी ज्ञानमंदिर, ठाणे प्रस्तुत अधिकृत स्तोत्र पठण व विधी मार्गदर्शन."
  }
]

DEFAULT_DOCUMENTS = [
  {
    "id": "doc-1",
    "titleEn": "Stotra Pathan Pronunciation Guide (स्तोत्र उच्चारण नियम)",
    "titleMr": "स्तोत्र उच्चारण नियम व मार्गदर्शिका",
    "category": "Study Material",
    "author": "Surawanee Dyan Mandir Faculty",
    "pages": 28,
    "fileSize": "1.8 MB (PDF)",
    "language": "Sanskrit & Marathi",
    "descriptionEn": "Detailed rules on Sanskrit letter articulation, rhythm, and breath discipline for Stotra chanting.",
    "descriptionMr": "स्तोत्र पठणासाठी शुद्ध वर्णोच्चार, यती, लय आणि नियमांची मार्गदर्शिका."
  },
  {
    "id": "doc-2",
    "titleEn": "Paurohitya Shodashopachar Pooja Reference",
    "titleMr": "षोडशोपचार पूजा संदर्भ पुस्तिका",
    "category": "Syllabus",
    "author": "Surawanee Paurohitya Section",
    "pages": 42,
    "fileSize": "2.4 MB (PDF)",
    "language": "Sanskrit & Marathi",
    "descriptionEn": "Step-by-step guidance for Shodashopachar Puja, Ganapati Puja, and Satyanarayan rituals.",
    "descriptionMr": "गणपती पूजा, सत्यनारायण व षोडशोपचार पूजा विधींची अधिकृत पुस्तिका."
  },
  {
    "id": "doc-3",
    "titleEn": "Subhashit Sangraha for School Competitions",
    "titleMr": "शालेय सुभाषित संग्रह व अर्थ",
    "category": "Study Material",
    "author": "Surawanee Subhashit Board",
    "pages": 36,
    "fileSize": "1.5 MB (PDF)",
    "language": "Sanskrit, Marathi & English",
    "descriptionEn": "Prescribed Subhashitas for interschool chanting competitions organized by Surawanee in Thane.",
    "descriptionMr": "ठाण्यातील आंतरशालेय सुभाषित पठण स्पर्धेसाठी निवडक सुभाषितांचा संग्रह."
  }
]

DEFAULT_EVENTS = [
  {
    "id": "event-1",
    "titleEn": "Annual Subhashit Pathan Competition",
    "titleMr": "वार्षिक सुभाषित पठण स्पर्धा",
    "date": "2026-10-15",
    "day": "15",
    "month": "OCT",
    "year": "2026",
    "time": "05:00 PM - 08:00 PM",
    "venueEn": "Padma Niwas Sabhagruha, Thane",
    "venueMr": "पद्म निवास सभागृह, ठाणे",
    "category": "Competition",
    "descriptionEn": "Interschool Sanskrit Subhashit recitation for school children across Thane district.",
    "descriptionMr": "ठाणे जिल्ह्यातील शालेय विद्यार्थ्यांसाठी आंतरशालेय सुभाषित पठण स्पर्धा.",
    "image": "/Photos/Surwanee_competition_6-scaled-updraft-pre-smush-original.jpg"
  },
  {
    "id": "event-2",
    "titleEn": "Bhagavat Geeta Chanting & Dikshant Samaroh",
    "titleMr": "भगवद्गीता पठण व दीक्षांत समारंभ",
    "date": "2026-11-20",
    "day": "20",
    "month": "NOV",
    "year": "2026",
    "time": "04:30 PM - 07:30 PM",
    "venueEn": "Thane College Arts Division Hall",
    "venueMr": "ठाणे महाविद्यालय कला विभाग सभागृह",
    "category": "Convocation",
    "descriptionEn": "Joint Geeta recitation with Thane College Arts Division and certificate distribution for Paurohitya graduates.",
    "descriptionMr": "ठाणे कॉलेज सोबत भगवद्गीता पठण आणि पौरोहित्य पदवीधरांचा दीक्षांत सोहळा.",
    "image": "/Photos/Surawanee_Paurohitya-Ganesh-Pooja-e1660834393968-updraft-pre-smush-original.jpg"
  }
]
