export type Language = 'de' | 'en' | 'tg';

export const TRANSLATIONS = {
  de: {
    nav: {
      portfolio: 'Portfolio',
      about: 'Über mich',
      contact: 'Kontakt',
      doc: 'Documentary / Commercial'
    },
    hero: {
      taglineLine1: 'Hochzeitsfilme,',
      taglineLine2: 'die sich wie Kino anfühlen',
      subtitle: 'Eine Geschichte erzählt durch Bild, Rhythmus und Ton'
    },
    portfolio: {
      title: 'Portfolio',
      weddingSubtitle: 'Ausgewählte Hochzeitsfilme',
      docSubtitle: 'Dokumentationen & Commercials',
      viewFilm: 'Film ansehen'
    },
    about: {
      sectionTitle: 'ÜBER MICH',
      p1: 'Ich heiße Tolya. Ich bin Wedding Filmmaker aus Mannheim – tätig in ganz Deutschland und darüber hinaus.',
      p2: 'Für mich ist jede Hochzeit keine Veranstaltung, die man einfach dokumentiert, sondern eine Geschichte, die es verdient, in Bildern, Schnitt, Musik und Stimme erzählt zu werden.',
      p3: 'Mein Blick auf Hochzeitsfilme kommt nicht aus einem Videografie-Kurs, sondern aus jahrelanger Erfahrung mit Musik. Das gibt mir etwas, das man sich nicht antrainieren kann: ein Gespür für Rhythmus, für Pausen, für den Moment, in dem eine Einstellung stehen bleiben muss – und den, in dem sich das Tempo abrupt ändert. Genau deshalb wirken meine Filme nicht nur schön geschnitten, sondern haben eine eigene Dramaturgie, wie echtes Kino.',
      specTitle: 'MEINE SPEZIALISIERUNG',
      specBody: 'Ich erstelle einen einzigen, in sich stimmigen Hochzeitsfilm – statt euch mit zehn verschiedenen Formaten zu überhäufen. Einen Film, den ihr euch noch in Jahren ansehen und dabei den Tag jedes Mal aufs Neue erleben werdet. Ich passe mich eurem Ablauf an und nehme aus eurem Tag genau das mit, was wirklich erzählenswert ist.',
      styleTitle: 'MEIN STIL',
      styleBody: 'Autorenhaft. Ich dokumentiere eure Hochzeit nicht – ich interpretiere sie wie ein Regisseur: Ich entscheide, wo die Kamera schweigt und wo sie spricht, welcher Moment zum Höhepunkt des Films wird und welcher außen vor bleibt. Das Ergebnis ist kein einfach schönes Video, sondern ein Film mit Charakter.'
    },
    weddingProject: {
      backToPortfolio: 'Portfolio',
      filmType: 'Wedding Film',
      locationLabel: 'Location',
      kindWordsLabel: 'Kind Words',
      trailerBtn: 'Trailer (1-3 Min)',
      fullFilmBtn: 'Hauptfilm (Full Version)',
      versionHint: '2 Versionen verfügbar',
      nextProject: 'Nächstes Projekt'
    },
    docPage: {
      subtitle: 'Ein erweiterter Blick des Filmemachers',
      intro: 'Neben Hochzeitsfilmen entstehen hier Arbeiten, die zeigen, wie ich als Filmemacher denke — dokumentarisch, werblich, künstlerisch. Jede Produktion ist eine eigene visuelle Sprache.'
    },
    contactForm: {
      tag: 'Termin Reservieren',
      title: 'Jetzt Anfragen',
      subtitle: 'Unverbindliche Anfrage für eure Hochzeit. Ich freue mich darauf, eure Geschichte kennenzulernen.',
      namesLabel: 'Eure Namen *',
      namesPlaceholder: 'z.B. Kerstin & Freddy',
      emailLabel: 'E-Mail-Adresse *',
      emailPlaceholder: 'eure.email@beispiel.de',
      dateLabel: 'Hochzeitsdatum *',
      locationLabel: 'Location & Ort *',
      locationPlaceholder: 'z.B. Morrhof, Großkarlbach',
      messageLabel: 'Eure Geschichte & Wünsche',
      messagePlaceholder: 'Erzählt mir etwas über euch und eure Hochzeitspläne...',
      submitBtn: 'ANFRAGE ABSCHICKEN',
      submittingBtn: 'WIRD GESENDET...',
      successTitle: 'Vielen Dank für eure Anfrage!',
      successDesc: 'Eure Nachricht wurde erfolgreich übermittelt. Ich werde mich innerhalb von 24 Stunden persönlich bei euch melden.',
      newInquiryBtn: 'Neue Anfrage senden',
      gdprError: 'Bitte bestätigen Sie die Datenschutzerklärung, um Ihre Anfrage zu senden.'
    },
    cookie: {
      title: 'Privatsphäre & Cookies',
      desc: 'Wir nutzen Cookies, um unsere Website zu optimieren. Essentielle Cookies sind immer aktiv. Analyse-Cookies helfen uns, das Nutzungserlebnis zu verbessern.',
      acceptAll: 'Alle akzeptieren',
      rejectOptional: 'Alle ablehnen',
      settingsBtn: 'Einstellungen',
      policyLink: 'COOKIE-RICHTLINIE',
      settingsLink: 'COOKIE-EINSTELLUNGEN'
    },
    footer: {
      copyright: 'ALLE RECHTE VORBEHALTEN.',
      taglineLine1: 'JEDE GESCHICHTE VERDIENT ES,',
      taglineLine2: 'GESEHEN ZU WERDEN.',
      impressum: 'IMPRESSUM',
      datenschutz: 'DATENSCHUTZ',
      cookiePolicy: 'COOKIE-RICHTLINIE',
      cookieSettings: 'COOKIE-EINSTELLUNGEN'
    }
  },
  en: {
    nav: {
      portfolio: 'Portfolio',
      about: 'About me',
      contact: 'Contact',
      doc: 'Documentary / Commercial'
    },
    hero: {
      taglineLine1: 'Wedding films',
      taglineLine2: 'that feel like cinema',
      subtitle: 'A story told through image, rhythm, and sound'
    },
    portfolio: {
      title: 'Portfolio',
      weddingSubtitle: 'Selected Wedding Films',
      docSubtitle: 'Documentaries & Commercials',
      viewFilm: 'Watch Film'
    },
    about: {
      sectionTitle: 'ABOUT ME',
      p1: 'My name is Tolya. I am a wedding filmmaker based in Mannheim – working across Germany and worldwide.',
      p2: 'For me, every wedding is not just an event to document, but a story that deserves to be told through imagery, editing, music, and voice.',
      p3: 'My approach to wedding films does not come from a videography course, but from years of musical experience. This gives me something that cannot be taught: a sense of rhythm, pauses, the exact moment to let a shot linger – and the moment to change tempo. That is why my films do not just look beautifully edited, but have their own dramatic arc, like real cinema.',
      specTitle: 'MY SPECIALIZATION',
      specBody: 'I create a single, harmonious wedding film – instead of overwhelming you with ten different formats. A film you will watch years from now and relive your day anew every single time. I adapt to your schedule and capture exactly what is truly worth telling.',
      styleTitle: 'MY STYLE',
      styleBody: 'Auteur. I do not just document your wedding – I interpret it like a film director: I decide where the camera stays quiet and where it speaks, which moment becomes the climax and which stays out. The result is not just a pretty video, but a film with character.'
    },
    weddingProject: {
      backToPortfolio: 'Portfolio',
      filmType: 'Wedding Film',
      locationLabel: 'Location',
      kindWordsLabel: 'Kind Words',
      trailerBtn: 'Trailer (1-3 Min)',
      fullFilmBtn: 'Full Film (Full Version)',
      versionHint: '2 Versions Available',
      nextProject: 'Next Project'
    },
    docPage: {
      subtitle: "A filmmaker's broader lens",
      intro: 'Alongside wedding films, this selection highlights how I think as a filmmaker — documentarian, commercial, artistic. Every production speaks its own visual language.'
    },
    contactForm: {
      tag: 'Reserve Your Date',
      title: 'Book Now',
      subtitle: 'Non-binding inquiry for your wedding. I look forward to getting to know your story.',
      namesLabel: 'Your Names *',
      namesPlaceholder: 'e.g. Kerstin & Freddy',
      emailLabel: 'E-Mail Address *',
      emailPlaceholder: 'your.email@example.com',
      dateLabel: 'Wedding Date *',
      locationLabel: 'Location & City *',
      locationPlaceholder: 'e.g. Morrhof, Großkarlbach',
      messageLabel: 'Your Story & Wishes',
      messagePlaceholder: 'Tell me something about yourselves and your wedding plans...',
      submitBtn: 'SEND INQUIRY',
      submittingBtn: 'SENDING...',
      successTitle: 'Thank you for your inquiry!',
      successDesc: 'Your message has been sent successfully. I will get back to you personally within 24 hours.',
      newInquiryBtn: 'Send Another Inquiry',
      gdprError: 'Please accept the Privacy Policy to send your inquiry.'
    },
    cookie: {
      title: 'Privacy & Cookies',
      desc: 'We use cookies to optimize our website. Essential cookies are always active. Analytics cookies help us improve your experience.',
      acceptAll: 'Accept All',
      rejectOptional: 'Reject All',
      settingsBtn: 'Settings',
      policyLink: 'COOKIE POLICY',
      settingsLink: 'COOKIE SETTINGS'
    },
    footer: {
      copyright: 'ALL RIGHTS RESERVED.',
      taglineLine1: 'EVERY STORY DESERVES TO BE SEEN.',
      taglineLine2: '',
      impressum: 'LEGAL NOTICE',
      datenschutz: 'PRIVACY POLICY',
      cookiePolicy: 'COOKIE POLICY',
      cookieSettings: 'COOKIE SETTINGS'
    }
  },
  tg: {
    nav: {
      portfolio: 'Портфолио',
      about: 'Дар бораи ман',
      contact: 'Тамос',
      doc: 'Ҳуҷҷатӣ / Рекламавӣ'
    },
    hero: {
      taglineLine1: 'Филмҳои арӯсӣ,',
      taglineLine2: 'ки монанди синамо эҳсос мешаванд',
      subtitle: 'Қиссае, ки тавассути тасвир, ритм ва садо нақл карда мешавад'
    },
    portfolio: {
      title: 'Портфолио',
      weddingSubtitle: 'Филмҳои издивоҷи интихобшуда',
      docSubtitle: 'Филмҳои ҳуҷҷатӣ ва рекламавӣ',
      viewFilm: 'Тамошои филм'
    },
    about: {
      sectionTitle: 'ДАР БОРАИ МАН',
      p1: 'Номи ман Толя аст. Ман филмсози тӯйҳо аз Маннхайм ҳастам ва дар тамоми Олмон ва хориҷ аз он фаъолият мекунам.',
      p2: 'Барои ман, ҳар як тӯй танҳо як чорабинӣ нест, ки сабт карда шавад, балки қиссаест, ки сазовори он аст, ки тавассути тасвирҳо, танзим, мусиқӣ ва садо нақл карда шавад.',
      p3: 'Назари ман ба филмҳои арӯсӣ на аз курсҳои видеография, балки аз таҷрибаи бисёрсола дар мусиқӣ сарчашма мегирад. Ин ба ман чизеро медиҳад, ки омӯхтани он номумкин аст: эҳсоси ритм, таваққуфҳо, лаҳзаи дақиқе, ки кадр бояд ором бимонад – ва лаҳзае, ки суръат бояд тағйир ёбад. Маҳз ба ҳамин далел филмҳои ман танҳо видеои зебо нест, балки мисли синамои ҳақиқӣ драматургияи хоси худро доранд.',
      specTitle: 'ИХТИСОСИ МАН',
      specBody: 'Ман як филми мукаммал ва ҳамоҳанги арӯсӣ эҷод мекунам – ба ҷои он ки шуморо бо даҳҳо форматҳои гуногун сарбор кунам. Филме, ки шумо пас аз солҳо тамошо мекунед ва ҳар дафъа рӯзи тӯйи худро аз нав эҳсос хоҳед кард. Ман худро ба ҷадвали шумо мутобиқ мекунам ва маҳз ҳамон чизеро мебардорам, ки воқеан арзиши нақл карданро дорад.',
      styleTitle: 'УСЛУБИ МАН',
      styleBody: 'Муаллифӣ. Ман тӯйи шуморо танҳо сабт намекунам – ман онро мисли режиссёр шарҳ медиҳам: ман тасмим мегирам, ки камера дар куҷо хомӯш мемонад ва дар куҷо сухан мегӯяд, кадом лаҳза авҷи филм мешавад ва кадом лаҳза берун мемонад. Натиҷа танҳо як видеои зебо нест, балки филмест дорои хислат ва ҷаззобият.'
    },
    weddingProject: {
      backToPortfolio: 'Портфолио',
      filmType: 'Филми арӯсӣ',
      locationLabel: 'Ҷойгоҳ',
      kindWordsLabel: 'Таассурот',
      trailerBtn: 'Трейлер (1-3 дақ)',
      fullFilmBtn: 'Филми пурра (Full Version)',
      versionHint: '2 версия дастрас аст',
      nextProject: 'Лоиҳаи навбатӣ'
    },
    docPage: {
      subtitle: 'Назари васеътари филмсоз',
      intro: 'Дар канори филмҳои арӯсӣ, ин ҷо корҳое оварда шудаанд, ки тарзи тафаккури маро ҳамчун филмсоз нишон медиҳанд — ҳуҷҷатӣ, рекламавӣ ва бадеӣ. Ҳар як истеҳсолот забони визуалии худро дорад.'
    },
    contactForm: {
      tag: 'Банд кардани вақт',
      title: 'Дархост фиристодан',
      subtitle: 'Дархости бе ӯҳдадорӣ барои тӯйи шумо. Ман аз шинос шудан бо қиссаи шумо шод хоҳам шуд.',
      namesLabel: 'Номҳои шумо *',
      namesPlaceholder: 'масалан Керстин ва Фредди',
      emailLabel: 'Почтаи электронӣ *',
      emailPlaceholder: 'yugon.email@example.com',
      dateLabel: 'Таърихи тӯй *',
      locationLabel: 'Ҷои баргузорӣ ва шаҳр *',
      locationPlaceholder: 'масалан Моррҳоф, Гросскарлбах',
      messageLabel: 'Қисса ва орзуҳои шумо',
      messagePlaceholder: 'Дар бораи худ ва нақшаҳои тӯйи худро ба ман бигӯед...',
      submitBtn: 'ФИРИСТОДАНИ ДАРХОСТ',
      submittingBtn: 'ИРСОЛ МЕШАВАД...',
      successTitle: 'Ташаккур барои дархостатон!',
      successDesc: 'Паёми шумо бо муваффақият фиристода шуд. Ман дар давоми 24 соат шахсан бо шумо тамос хоҳам гирифт.',
      newInquiryBtn: 'Фиристодани дархости нав',
      gdprError: 'Лутфан Сиёсати маҳрамиятро қабул кунед, та тавонед дархостро фиристед.'
    },
    cookie: {
      title: 'Маҳрамият ва Кукиҳо',
      desc: 'Ма ба хотири беҳтар кардани сомонаи худ аз кукиҳо истифода мебарем. Кукиҳои асосӣ ҳамеша фаъоланд. Кукиҳои таҳлилӣ ба мо барои беҳтар кардани таҷрибаи шумо кӯмак мекунанд.',
      acceptAll: 'Ҳамаро қабул кардан',
      rejectOptional: 'Рад кардани ғайриолӣ',
      settingsBtn: 'Танзимот',
      policyLink: 'СИЁСАТИ КУКИ',
      settingsLink: 'ТАНЗИМОТИ КУКИ'
    },
    footer: {
      copyright: 'ҲАМАИ ҲУҚУҚҲО ҲИФЗ ШУДААНД.',
      taglineLine1: 'ҲАР ЯК ҚИССА САЗОВОРИ ОН АСТ, КИ',
      taglineLine2: 'ДИДА ШАВАД.',
      impressum: 'ОГОҲИИ ҲУҚУҚӢ',
      datenschutz: 'СИЁСАТИ МАҲРАМИЯТ',
      cookiePolicy: 'СИЁСАТИ КУКИ',
      cookieSettings: 'ТАНЗИМОТИ КУКИ'
    }
  }
};
