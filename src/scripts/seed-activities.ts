import prisma from '../lib/db'

const activities = [
  {
    titleBn: 'ইসলাম প্রচার',
    titleEn: 'Preaching Islam',
    icon: 'BookOpen',
    descriptionBn: `শুব্বান দাওয়াতি কাফেলার অন্যতম প্রধান উদ্দেশ্য হলো ইসলামের সুমহান বাণী প্রতিটি ঘরে ঘরে পৌঁছে দেওয়া। আল্লাহ তায়ালা পবিত্র কুরআনে এরশাদ করেছেন, "তোমরাই শ্রেষ্ঠ উম্মত, মানবজাতির কল্যাণের জন্য তোমাদের উদ্ভব ঘটানো হয়েছে। তোমরা সৎকাজের নির্দেশ দেবে এবং অসৎকাজে নিষেধ করবে।" (সূরা আল-ইমরান: ১১০) এই আয়াতের আলোকে আমরা দাওয়াতি কাজ পরিচালনা করছি।

    আমরা বিভিন্ন সভা-সেমিনার, হালাকা এবং ব্যক্তিগত যোগাযোগের মাধ্যমে মানুষকে ইসলামের সঠিক জ্ঞান প্রদানের চেষ্টা করি। এর মাধ্যমে সমাজে শান্তি, সম্প্রীতি ও ভ্রাতৃত্ববোধ ছড়িয়ে দেওয়া সম্ভব বলে আমরা বিশ্বাস করি। 
    
    যুব সমাজকে পথভ্রষ্টতা থেকে রক্ষা করতে এবং তাদেরকে আল্লাহমুখী করতে আমাদের রয়েছে বিশেষ কর্মপরিকল্পনা। দ্বীনি সাহিত্য বিতরণ, অনলাইন দাওয়াত এবং মসজিদে মসজিদে আলোচনা সভার মাধ্যমে এই কার্যক্রম চলমান রয়েছে।
    
    আমাদের এই দাওয়াতি কার্যক্রমে যে কেউ অংশগ্রহণ করতে পারেন। আসুন, আমরা সকলে মিলে আল্লাহর জমিনে আল্লাহর দ্বীন প্রতিষ্ঠায় আত্মনিয়োগ করি। আল্লাহ আমাদের এই ক্ষুদ্র প্রচেষ্টাকে কবুল করুন। আমিন।`,
    descriptionEn: `One of the primary objectives of the Shubban Dawati Kafela is to spread the noble message of Islam to every home. Allah says in the Holy Quran, "You are the best nation produced [as an example] for mankind. You enjoin what is right and forbid what is wrong..." (Surah Al-Imran: 110). In light of this verse, we conduct our Dawah activities.

    Through seminars, halaqas (study circles), and personal communication, we strive to provide authentic Islamic knowledge to the people. We believe this is the key to spreading peace, harmony, and brotherhood in society.
    
    We have specific action plans to protect the youth from misguidance and turn them towards Allah. This is ongoing through the distribution of Islamic literature, online Dawah, and discussions in various mosques.
    
    Anyone can participate in these Dawah activities. Let us all dedicate ourselves to establishing the Deen of Allah on His earth. May Allah accept our humble efforts. Ameen.`
  },
  {
    titleBn: 'বার্ষিক ইসলামী সম্মেলন',
    titleEn: 'Annual Islamic Conference',
    icon: 'Mic2',
    descriptionBn: `প্রতি বছর আমরা একটি বৃহত্তর পরিসরে 'বার্ষিক ইসলামী সম্মেলন'-এর আয়োজন করে থাকি। এই সম্মেলনে দেশের বরেণ্য ওলামায়ে কেরাম এবং ইসলামী চিন্তাবিদগণ উপস্থিত হয়ে কুরআন ও সুন্নাহর আলোকে গুরুত্বপূর্ণ দিকনির্দেশনা প্রদান করেন।

    এই সম্মেলনের মূল লক্ষ্য হলো সাধারণ মানুষের মাঝে ইসলামের সঠিক বার্তা পৌঁছে দেওয়া এবং মুসলিম উম্মাহর সমসাময়িক সমস্যা ও তার সমাধান নিয়ে আলোচনা করা। রাসুলুল্লাহ (সা.) বলেছেন, "যে ব্যক্তি জ্ঞান অর্জনের উদ্দেশ্যে কোনো পথ অবলম্বন করে, আল্লাহ তার জান্নাতের পথ সহজ করে দেন।" (মুসলিম)
    
    আমাদের এই সম্মেলনে হাজার হাজার দ্বীনপিপাসু মানুষের সমাগম ঘটে। এখানে যেমন ঈমান উদ্দীপক আলোচনা হয়, তেমনি সামাজিক অবক্ষয় রোধে তরুণদের করণীয় সম্পর্কেও সচেতন করা হয়।
    
    সম্মেলনের পাশাপাশি এখানে ইসলামিক বইমেলা ও প্রশ্নোত্তর পর্বের আয়োজন থাকে, যাতে করে শ্রোতারা তাদের দ্বীনি জিজ্ঞাসাগুলোর সঠিক উত্তর আলেমদের কাছ থেকে সরাসরি জেনে নিতে পারেন।`,
    descriptionEn: `Every year, we organize a large-scale 'Annual Islamic Conference'. In this gathering, prominent Islamic scholars and thinkers of the country are invited to provide valuable guidance in the light of the Quran and Sunnah.

    The main objective of this conference is to deliver the true message of Islam to the general public and discuss contemporary issues facing the Muslim Ummah along with their solutions. The Messenger of Allah (PBUH) said, "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him." (Sahih Muslim)
    
    Thousands of knowledge-seekers attend this conference. Inspiring lectures on Iman (faith) are delivered, and the youth are made aware of their role in preventing social degradation.
    
    Alongside the conference, an Islamic book fair and a Q&A session are organized so that the audience can get authentic answers to their religious queries directly from the scholars.`
  },
  {
    titleBn: 'ঈদ সামগ্রী বিতরণ',
    titleEn: 'Eid Materials Distribution',
    icon: 'Gift',
    descriptionBn: `ঈদ মানেই আনন্দ। কিন্তু সমাজের সুবিধাবঞ্চিত ও অসহায় মানুষদের জন্য এই আনন্দ অনেক সময় অধরাই থেকে যায়। তাই শুব্বান দাওয়াতি কাফেলা প্রতি বছর পবিত্র ঈদুল ফিতর ও ঈদুল আযহা উপলক্ষে হতদরিদ্র পরিবারের মাঝে 'ঈদ সামগ্রী' বিতরণ করে থাকে।

    রাসুলুল্লাহ (সা.) বলেছেন, "যে ব্যক্তি কোনো মুমিনের পার্থিব কষ্ট দূর করবে, আল্লাহ কিয়ামতের দিন তার কষ্ট দূর করবেন।" (মুসলিম) এই হাদিসের শিক্ষায় উদ্বুদ্ধ হয়ে আমরা আমাদের সাধ্যমতো গরিব-দুঃখীদের মুখে হাসি ফোটানোর চেষ্টা করি।
    
    আমাদের ঈদ সামগ্রীর মধ্যে থাকে সেমাই, চিনি, দুধ, পোলাওয়ের চাল, তেলসহ নিত্যপ্রয়োজনীয় খাদ্যদ্রব্য এবং নতুন পোশাক। ঈদের দিন যেন কোনো ঘরে খাদ্যের অভাব না থাকে, সেটাই আমাদের এই কর্মসূচির মূল উদ্দেশ্য।
    
    সমাজের বিত্তবানদের আর্থিক সহযোগিতায় আমাদের এই কার্যক্রম পরিচালিত হয়। আমরা বিশ্বাস করি, ঈদের আনন্দ সকলের মাঝে ভাগ করে নেওয়াই হলো প্রকৃত ইসলামী শিক্ষা ও ভ্রাতৃত্বের উজ্জ্বল দৃষ্টান্ত।`,
    descriptionEn: `Eid is synonymous with joy. However, for the underprivileged and helpless people of society, this joy often remains out of reach. Therefore, Shubban Dawati Kafela distributes 'Eid Gifts and Groceries' among destitute families every year on the occasion of Eid-ul-Fitr and Eid-ul-Adha.

    The Prophet (PBUH) said, "Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter." (Sahih Muslim). Inspired by this teaching, we try to bring smiles to the faces of the poor.
    
    Our Eid packages typically include vermicelli, sugar, milk, aromatic rice, oil, and occasionally new clothes. Our main goal is to ensure that no household goes without a proper meal on the day of Eid.
    
    This program is run with the financial support of generous members of society. We believe that sharing the joy of Eid with everyone is the true reflection of Islamic teachings and brotherhood.`
  },
  {
    titleBn: 'এতিম অসহায়দের সাহায্য',
    titleEn: 'Helping Orphans & Helpless',
    icon: 'HeartHandshake',
    descriptionBn: `ইসলাম এতিম ও অসহায়দের প্রতি বিশেষ যত্ন নেওয়ার নির্দেশ দিয়েছে। রাসুলুল্লাহ (সা.) বলেছেন, "আমি এবং এতিমের লালনপালনকারী জান্নাতে এভাবে থাকব" (এই বলে তিনি তর্জনী ও মধ্যমা আঙুল দিয়ে ইশারা করলেন)। (বুখারি) 

    এই মহান মর্যাদার কথা মাথায় রেখে শুব্বান দাওয়াতি কাফেলা সমাজের এতিম ও দুস্থ শিশুদের শিক্ষা, চিকিৎসা এবং ভরণপোষণের দায়িত্ব গ্রহণে সচেষ্ট রয়েছে। আমরা এতিমদের মাসিক বৃত্তির ব্যবস্থা করে থাকি।
    
    পাশাপাশি, অসহায় বিধবা ও কর্মহীন মানুষদের স্বাবলম্বী করার জন্য আমরা ক্ষুদ্র পরিসরে সেলাই মেশিন বিতরণ বা ছোট ব্যবসা শুরু করার মূলধন প্রদান করে থাকি। উদ্দেশ্য একটাই— তারা যেন কারো মুখাপেক্ষী না হয়ে আত্মমর্যাদার সাথে বাঁচতে পারে।
    
    এতিমের মাথায় হাত বুলানো এবং তাদের মুখে হাসি ফোটানো ঈমানদারদের অন্যতম বৈশিষ্ট্য। আমরা আমাদের দাতাদের অনুদান অত্যন্ত স্বচ্ছতার সাথে এই খাতে ব্যয় করি এবং মহান আল্লাহর কাছে এর উত্তম প্রতিদান কামনা করি।`,
    descriptionEn: `Islam strongly commands the care of orphans and the helpless. The Prophet (PBUH) said, "I and the one who sponsors an orphan will be in Paradise like these two" – and he pointed his index and middle fingers together. (Sahih Bukhari)

    Keeping this great reward in mind, Shubban Dawati Kafela endeavors to take responsibility for the education, medical care, and maintenance of orphaned and destitute children in society. We arrange monthly stipends for orphans.
    
    In addition, to make helpless widows and unemployed individuals self-reliant, we distribute sewing machines or provide initial capital to start a small business. The sole purpose is to enable them to live with dignity without depending on others.
    
    Showing affection to orphans and bringing joy to their lives is a core trait of a believer. We utilize our donors' contributions transparently in this sector and seek the best reward from Almighty Allah.`
  },
  {
    titleBn: 'বৃক্ষরোপণ কর্মসূচি',
    titleEn: 'Tree Plantation Program',
    icon: 'TreePine',
    descriptionBn: `পরিবেশের ভারসাম্য রক্ষায় বৃক্ষরোপণের গুরুত্ব অপরিসীম। ইসলাম এটিকে একটি 'সাদাকায়ে জারিয়া' বা চলমান দান হিসেবে আখ্যায়িত করেছে। রাসুলুল্লাহ (সা.) বলেছেন, "কোনো মুসলিম যদি গাছ লাগায় বা ফসল বোনে, আর তা থেকে মানুষ, পাখি বা কোনো প্রাণী খায়, তবে তা তার জন্য সদকা হিসেবে গণ্য হবে।" (বুখারি ও মুসলিম)

    এই হাদিসকে সামনে রেখে শুব্বান দাওয়াতি কাফেলা প্রতি বছর বর্ষা মৌসুমে দেশব্যাপী ব্যাপক 'বৃক্ষরোপণ কর্মসূচি' গ্রহণ করে থাকে। আমরা প্রধানত ফলজ, বনজ এবং ঔষধি গাছ রোপণ করে থাকি।
    
    রাস্তার দুই পাশে, মসজিদ-মাদ্রাসার আঙিনায় এবং পতিত জমিতে চারা রোপণের মাধ্যমে আমরা একটি সবুজ ও সুন্দর আগামী বিনির্মাণে কাজ করছি। শুধু গাছ লাগানোই নয়, সেগুলোর সঠিক পরিচর্যা নিশ্চিত করতেও আমরা স্বেচ্ছাসেবকদের উদ্বুদ্ধ করি।
    
    গাছপালা আল্লাহর এক অপূর্ব নেয়ামত। এটি পরিবেশের অক্সিজেন সরবরাহ করে এবং তাপমাত্রা নিয়ন্ত্রণে রাখে। আসুন, ইসলামী শিক্ষার আলোকে আমরা বেশি বেশি গাছ লাগাই এবং পরিবেশ রক্ষা করি।`,
    descriptionEn: `Tree plantation is crucial for maintaining environmental balance. Islam considers it a 'Sadaqah Jariyah' or continuous charity. The Messenger of Allah (PBUH) said, "If a Muslim plants a tree or sows seeds, and then a bird, or a person or an animal eats from it, it is regarded as a charitable gift (Sadaqah) for him." (Bukhari and Muslim)

    Keeping this Hadith in mind, Shubban Dawati Kafela undertakes a massive 'Tree Plantation Program' across the country every monsoon season. We primarily plant fruit-bearing, timber, and medicinal trees.
    
    By planting saplings on both sides of roads, in mosque and madrasa courtyards, and on barren lands, we are working towards building a greener and more beautiful future. We don't just plant trees; we also encourage our volunteers to ensure their proper care.
    
    Trees are a wonderful blessing from Allah. They provide oxygen and help regulate temperature. Let us plant more trees in the light of Islamic teachings and protect the environment.`
  },
  {
    titleBn: 'খাদ্য বিতরণ',
    titleEn: 'Food Distribution',
    icon: 'Utensils',
    descriptionBn: `ক্ষুধার্তকে খাবার খাওয়ানো ইসলামের অন্যতম শ্রেষ্ঠ ইবাদত। পবিত্র কুরআনে জান্নাতিদের গুণাবলি বর্ণনা করতে গিয়ে আল্লাহ বলেন, "তারা আল্লাহর প্রেমে অভাবগ্রস্ত, এতিম ও বন্দিদের খাবার খাওয়ায় এবং বলে, আমরা তো কেবল আল্লাহর সন্তুষ্টির জন্যই তোমাদের খাওয়াই, তোমাদের কাছে আমরা কোনো প্রতিদান বা কৃতজ্ঞতা কামনা করি না।" (সূরা ইনসান: ৮-৯)

    এই আয়াতের শিক্ষাকে ধারণ করে, শুব্বান দাওয়াতি কাফেলা নিয়মিতভাবে সমাজের ছিন্নমূল, ভাসমান এবং অভুক্ত মানুষদের মাঝে রান্না করা খাবার ও শুকনা রেশন বিতরণ করে থাকে। 
    
    বিশেষ করে দুর্যোগকালীন সময়ে (যেমন: বন্যা, জলোচ্ছ্বাস বা মহামারী) আমাদের স্বেচ্ছাসেবকরা জীবনের ঝুঁকি নিয়ে দুর্গত এলাকায় মানুষের ঘরে ঘরে ত্রাণ ও খাদ্যসামগ্রী পৌঁছে দেয়। 
    
    অভুক্ত মানুষের মুখে একবেলা অন্ন তুলে দিতে পারার যে আত্মতৃপ্তি, তা অন্য কিছুতে নেই। আপনাদের সামান্য সহযোগিতায় হয়তো কোনো ক্ষুধার্ত শিশুর মুখের হাসি ফুটে উঠতে পারে। আল্লাহ আমাদের এই কাজগুলোকে কবুল করুন।`,
    descriptionEn: `Feeding the hungry is one of the greatest acts of worship in Islam. Describing the qualities of the people of Paradise, Allah says in the Quran, "And they give food in spite of love for it to the needy, the orphan, and the captive, [Saying], 'We feed you only for the countenance of Allah. We wish not from you reward or gratitude.'" (Surah Al-Insan: 8-9)

    Embracing the teachings of this verse, Shubban Dawati Kafela regularly distributes cooked meals and dry rations among the homeless, vagabonds, and starving people of society.
    
    Especially during disasters (such as floods, cyclones, or pandemics), our volunteers risk their lives to deliver relief and food supplies door-to-door in affected areas.
    
    The spiritual satisfaction of providing a meal to a hungry person is incomparable. With your small contribution, a starving child's smile can blossom. May Allah accept our efforts.`
  },
  {
    titleBn: 'শীতবস্ত্র বিতরণ',
    titleEn: 'Winter Clothes Distribution',
    icon: 'CloudSnow',
    descriptionBn: `শীতকাল বিত্তবানদের জন্য আরামদায়ক হলেও দরিদ্র ও ছিন্নমূল মানুষদের জন্য এটি একটি কষ্টের ঋতু। কনকনে শীতে গরম কাপড়ের অভাবে অনেকেই মানবেতর জীবনযাপন করেন। তাই প্রতি বছর শীতের শুরুতে শুব্বান দাওয়াতি কাফেলা দেশব্যাপী 'শীতবস্ত্র বিতরণ' কর্মসূচি গ্রহণ করে।

    রাসুলুল্লাহ (সা.) বলেছেন, "যে মুমিন কোনো বস্ত্রহীন মুমিনকে কাপড় পরাবে, আল্লাহ তাকে জান্নাতের সবুজ পোশাক পরাবেন।" (তিরমিজি) এই সুসংবাদ লাভের আশায় আমরা সমাজের সামর্থ্যবানদের কাছ থেকে নতুন ও পুরাতন শীতবস্ত্র বা ফান্ড সংগ্রহ করে থাকি।
    
    আমাদের স্বেচ্ছাসেবকরা গভীর রাতে রেলওয়ে স্টেশন, বাস টার্মিনাল এবং বস্তি এলাকায় গিয়ে প্রকৃত অসহায় ও শীতার্ত মানুষের গায়ে কম্বল জড়িয়ে দেয়। এছাড়াও উত্তরবঙ্গের তীব্র শীতপ্রবণ এলাকাগুলোতে বিশেষ টিমের মাধ্যমে আমরা শীতবস্ত্র পৌঁছানোর ব্যবস্থা করি।
    
    শীতের কষ্ট থেকে একজন মানুষকে রক্ষা করা মানে মানবতার সেবা করা। আপনাদের যাকাত ও সদকার অর্থে কেনা একটি কম্বল পারে একজন অসহায় মানুষের শীত নিবারণ করতে। আসুন, শীতার্ত মানুষের পাশে দাঁড়াই।`,
    descriptionEn: `While winter may be comfortable for the affluent, it is a season of hardship for the poor and homeless. Due to a lack of warm clothing in the freezing cold, many live an inhumane life. Therefore, at the onset of winter every year, Shubban Dawati Kafela undertakes a nationwide 'Winter Clothes Distribution' program.

    The Prophet (PBUH) said, "Whichever believer clothes another believer who is naked, Allah will clothe him with the green garments of Paradise." (Tirmidhi). Hoping for this glad tiding, we collect new and old winter clothes and funds from capable individuals in society.
    
    Late at night, our volunteers go to railway stations, bus terminals, and slum areas to wrap blankets around truly helpless and shivering people. We also send special teams to deliver winter clothes to the severely cold-prone regions of northern Bangladesh.
    
    Protecting a person from the biting cold is a true service to humanity. A single blanket purchased with your Zakat or Sadaqah can save a helpless person. Let us stand by the cold-stricken people.`
  }
]

async function main() {
  console.log('Start seeding activities...')

  // Clear existing activities first if needed (optional)
  await prisma.activity.deleteMany()

  for (const act of activities) {
    const activity = await prisma.activity.create({
      data: act
    })
    console.log(`Created activity with id: ${activity.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
