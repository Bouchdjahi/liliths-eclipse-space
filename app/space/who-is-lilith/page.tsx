
'use client'

import { useState } from 'react'
import Link from 'next/link'

// --------------------------------------------------
// TRANSLATIONS
// --------------------------------------------------

const CONTENT = {
  en: {
    back: "← Back to Eclipse",
    symbol: "⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆",
    title: "LILITH",
    subtitle1: "VAMPY",
    subtitle2: "SIREN",
    tagline: "Explore the cosmic being",

    introTitle: "ABOUT ME",
    introP1: "Lilith is more than a name or a nickname to me. I never consciously chose it as an identity. Somehow, it found its way into my life and stayed with me, almost as if it had always belonged there.",
    introP2: "Since childhood, I have felt an inexplicable connection to this name. I did not understand it at the time, but the feeling never disappeared. Eventually, I stopped asking why I was drawn to it and began to understand what it represented to me.",
    introP3: "I prefer to keep my real name private. Lilith is the name through which I express a part of myself: my personality, aesthetic, interests, energy and perception of the world.",
    introP4: "I am Algerian, with Turkish ancestry, currently living in Algeria. But nationality, age and background are only the outer layers of a person. What interests me most is everything that lies beneath them.",

    journeyTitle: "MY JOURNEY",
    journeyP1: "At the heart of my journey is the search for union with my Higher Self. This does not mean becoming perfect or escaping the human experience. It means understanding every part of myself, including the parts I once rejected, feared, misunderstood or tried to conceal.",
    journeyP2: "My journey revolves around finding balance between the opposing forces within me: light and darkness, Yin and Yang, soul and matter, heart and mind, intuition and reason, strength and vulnerability, creation and destruction, acceptance and transformation.",
    journeyP3: "I do not believe that one side must eliminate the other. Wisdom lies in understanding both and recognising their place within the whole. Light alone cannot reveal everything, nor can darkness. It is through understanding their relationship that I move towards inner integration.",
    journeyP4: "This is what led me towards shadow work, healing, self-examination and inner integration. I do not want to simply cover my wounds; I want to understand them. I want to meet my shadow rather than deny its existence.",

    messageTitle: "MY MESSAGE & MISSION",
    messageP1: "My message revolves around awareness, self-discovery and liberation from unconscious programming. I am interested in examining the beliefs, conditioning, inherited ideas and patterns that shape the way people perceive themselves and the world.",
    messageP2: "I believe that genuine transformation requires more than repeating spiritual terminology or adopting an identity associated with awakening. It requires questioning what we have accepted without examination, recognising our shadows and taking responsibility for our own development.",
    messageP3: "My mission is not to think for others, impose beliefs or offer ready-made answers. It is to encourage deeper observation, reveal what often remains hidden beneath the surface and create space for people to question what they have been conditioned to accept.",
    messageP4: "I am interested in the process of becoming conscious, not in creating another system of beliefs for people to follow. Freedom begins when we learn to examine even the ideas we once considered unquestionable.",

    abilitiesTitle: "MY SPIRITUAL ABILITIES",
    abilitiesP1: "My interest in spirituality goes beyond labels and terminology. I am drawn to exploring intuition, inner perception, symbolism, energetic concepts and the different ways people experience their relationship with themselves and the world around them.",
    abilitiesP2: "I approach these subjects through personal reflection, observation and exploration. I do not consider every feeling or unusual experience proof of a supernatural ability, and I believe discernment is just as important as openness.",
    abilitiesP3: "For me, spirituality should deepen self-awareness rather than disconnect us from reality. I remain curious about what I experience, what I can understand and what still requires questioning.",

    shadowTitle: "MY SHADOW WORK",
    shadowP1: "My spiritual path is deeply connected to shadow work: exploring the parts of ourselves we avoid acknowledging. Our fears, wounds, contradictions, suppressed emotions, insecurities and unconscious patterns can quietly influence the way we think, feel, choose and behave.",
    shadowP2: "My perspective is not about romanticising darkness. It is about becoming conscious of it. What we refuse to confront does not necessarily disappear. It may continue shaping our decisions and reactions from beneath the surface.",
    shadowP3: "There were moments when I felt as though everything within me had burned to the ground. Yet I returned, not as the person I had been. I carried the ashes of my former self and began building something different from what remained.",
    shadowP4: "That is what rebirth means to me: not erasing the past or pretending the fire never happened, but understanding what it left behind, recognising what survived, and choosing what to build next.",

    philosophyTitle: "MY PHILOSOPHY",
    philosophyP1: "Two philosophies deeply resonate with my understanding of transformation: alchemy and Stoicism. I see alchemy as a metaphor for transformation, taking what seems broken, painful or ordinary and extracting deeper meaning and understanding from it.",
    philosophyP2: "Stoicism reminds me of discipline, self-mastery, inner sovereignty and the importance of distinguishing between what I can and cannot control.",
    philosophyP3: "My philosophy is built around balance rather than extremes: transforming without losing myself, accepting without surrendering, feeling without being consumed, and rebuilding without denying my past.",

    academicTitle: "MY EDUCATION",
    academicP1: "My interests may appear scattered at first, but there is a common thread connecting them: I want to understand both humanity and the systems that shape our world.",
    academicP2: "I obtained a Baccalaureate in Technical Mathematics, specialising in Civil Engineering, and later completed a Master's degree in English Linguistics. Alongside my formal education, I have independently explored psychology, including abnormal psychology and dark psychology, as well as web development and technology.",
    academicP3: "I am currently expanding my knowledge of programming and cybersecurity, with a long-term ambition of becoming a Robotics & Autonomous Systems Engineer specialising in Extreme Environment Exploration.",
    academicP4: "I want to contribute to the development of autonomous robotic systems capable of exploring environments that are difficult, dangerous or inaccessible to humans, including extreme environments on Earth and, eventually, beyond it.",

    nowTitle: "MY WORK",
    nowP1: "Teaching has been one of the most consistent parts of my life. I work as an English teacher and university instructor, alongside private education and freelance work. I have almost four years of teaching experience across different educational sectors.",
    nowP2: "Teaching allows me to combine language, communication, creativity and an understanding of people. At the same time, I continue developing my future in technology, programming, cybersecurity and robotics.",

    interestsTitle: "MY INTERESTS",
    interestsP1: "I have never been able to confine my curiosity to a single category. What connects my interests is not one particular subject, but a desire to understand what lies beneath the obvious.",
    interestsP2: "My interests extend across psychology, philosophy, spirituality, neuroscience, technology, artificial intelligence, robotics, cybersecurity, astronomy, physics, mythology, symbolism, literature and human behaviour.",
    interestsP3: "I am particularly fascinated by the intersection of seemingly unrelated disciplines, and by the possibilities that emerge when different fields of knowledge meet.",

    aestheticTitle: "MY AESTHETIC",
    aestheticP1: "My aesthetic is alternative, but it refuses to remain within a single category. I move between Nu-Goth, Traditional Goth, Gothic and, occasionally, Boho.",
    aestheticP2: "I am drawn to black, deep blue, cosmic darkness, eclipses, the moon, vintage elements, gothic architecture, sirens, vampires, snakes, shadows and ancient symbolism.",
    aestheticP3: "I appreciate darkness when it feels elegant, mysterious and meaningful rather than exaggerated. To me, darkness is not inherently negative. Sometimes it is simply where the hidden becomes visible.",

    animalsTitle: "MY SYMBOLS",
    animalsP1: "I see these animals as personal symbols and archetypes, each representing qualities and themes that resonate with my journey.",
    animalsP2: "The snake represents transformation, renewal and the shedding of old identities. The owl represents observation, wisdom and the ability to perceive what others overlook. The raven evokes mystery, intelligence and the unknown.",
    animalsP3: "The black jaguar symbolises silent strength, independence and power, while the eagle represents perspective, freedom and vision.",

    cosmicTitle: "MY ZODIAC",
    cosmicP1: "According to my birth chart:",
    cosmicSun: "Taurus Sun",
    cosmicMoon: "Libra Moon",
    cosmicRising: "Leo Rising",
    cosmicVenus: "Gemini Venus",
    cosmicMercury: "Aries Mercury",
    cosmicMars: "Scorpio Mars",
    cosmicLilith: "Scorpio Lilith",
    cosmicP2: "I enjoy exploring astrology as a symbolic language for understanding personality, tendencies, inner contrasts and different dimensions of human experience. I approach it as a framework for reflection rather than a fixed definition of who I am.",

    languagesTitle: "MY LANGUAGES",
    languagesP1: "I speak Arabic, English and French. I am currently learning Japanese, German and Italian.",
    languagesP2: "Languages fascinate me because every language carries its own worldview, rhythm and way of expressing reality. Learning a language is also an opportunity to explore another way of thinking.",

    charactersTitle: "CHARACTERS I RESONATE WITH",
    charactersP1: "Some fictional characters fascinate me because of their symbolism, complexity and presence. Makima and Esdeath are characters whose fictional archetypes I find compelling. Effy Stonem and Hannibal Lecter also represent the psychologically complex and darker characters I enjoy exploring.",
    charactersP2: "As for celebrity aesthetics and presence, Megan Fox is someone whose appearance and energy I find particularly captivating. And yes, she is my celebrity crush. These are fictional and aesthetic references that resonate with me; they do not mean I consider myself identical to these characters.",

    personalTitle: "A PERSONAL SIDE OF ME",
    personalP1: "I identify as aroace: aromantic and asexual. I also live with experiences related to BPD and avoidant attachment. These experiences have influenced parts of my journey involving emotional boundaries, relationships, self-understanding and healing.",
    personalP2: "However, I refuse to reduce myself to a diagnosis, a label or a difficult chapter of my life. My struggles are part of my story, but they are not the entirety of who I am.",

    futureTitle: "MY FUTURE",
    futureP1: "Everything eventually comes back to one thing: creation. I do not want my journey to end with simply understanding myself. I want to create, learn, build, explore, teach, write, design, experiment and connect seemingly unrelated worlds.",
    futureP2: "I want to bring together the human and the technological, psychology and philosophy, mystery and science, the Earth and the cosmos. My path may evolve, but the direction remains the same: to become more conscious, capable and useful, and eventually create something that exists beyond me and contributes something meaningful to humanity.",

    whyTitle: "WHY LILITH?",
    whyP1: "Because Lilith is more than an aesthetic. She represents a journey: from fragmentation towards integration, from fear towards understanding, from wounds towards healing, from unconscious patterns towards awareness, from destruction towards reconstruction, and from darkness towards the wisdom hidden within it.",
    whyP2: "Perhaps most importantly, she represents the transition from searching outside myself for answers to learning how to return to myself.",
    whyP3: "I have been many versions of myself. Some I loved. Some I outgrew. Some I had to leave behind. Some broke me. Some saved me. And some are still waiting to be discovered.",
    whyP4: "My journey is not about choosing light over darkness or darkness over light. It is about learning to hold both. Not heart against mind, but heart alongside mind. Not destroying the shadow, but meeting it. Not becoming someone else, but becoming more fully myself.",
    whyFinal: "I am Lilith. Still learning. Still healing. Still questioning. Still transforming. Still becoming.",
    whyFinalP: "Perhaps that is what Lilith has always meant to me: not a finished identity, but an ongoing transformation.",

    click: "EXPLORE THIS CHAPTER",
    close: "CLOSE CHAPTER",
    footer: "A WORK IN PROGRESS. ALWAYS BECOMING."
  },

  ar: {
    back: "← العودة إلى الكسوف",
    symbol: "⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆",
    title: "ليليث",
    subtitle1: "VAMPY",
    subtitle2: "SIREN",
    tagline: "اكتشف عالمي وما يكمن خلف السطح",

    introTitle: "من أنا",
    introP1: "ليليث بالنسبة إليّ ليست مجرد اسم أو لقب. لم أخترها يوماً لأجعل منها هوية تمثلني؛ بل أشعر بأن الاسم هو الذي وجد طريقه إليّ، وكأنه كان جزءاً من حكايتي منذ البداية.",
    introP2: "منذ طفولتي، كان لديّ انجذاب غريب إلى هذا الاسم، دون أن أفهم سببه. ومع مرور الوقت، لم يختفِ ذلك الشعور، بل أصبحت أكثر وعياً بما يمثله لي وما يرتبط به من جوانب في شخصيتي.",
    introP3: "أفضّل الاحتفاظ باسمي الحقيقي لنفسي، أما ليليث فهي الاسم الذي أعبّر من خلاله عن جانب مني؛ عن شخصيتي، وذوقي، واهتماماتي، وطاقتي، والطريقة التي أرى بها العالم.",
    introP4: "أنا جزائرية، من أصول تركية، وأعيش حالياً في الجزائر. لكن الجنسية والعمر والجذور ليست سوى جوانب خارجية من الإنسان؛ أما ما يثير فضولي حقاً فهو ما يكمن وراءها.",

    journeyTitle: "رحلتي",
    journeyP1: "في جوهر رحلتي، أسعى إلى الاتحاد بذاتي العليا والاقتراب منها. ولا أقصد بذلك بلوغ الكمال أو الهروب من التجربة الإنسانية، بل معرفة نفسي بكل جوانبها، حتى تلك التي أنكرتها أو خشيتها أو أسأت فهمها أو حاولت إخفاءها.",
    journeyP2: "تتمحور رحلتي حول تحقيق التوازن بين الأضداد في داخلي: النور والظلام، الين واليانغ، الروح والمادة، القلب والعقل، الحدس والمنطق، القوة والهشاشة، الخلق والهدم، والتقبّل والتحوّل.",
    journeyP3: "لا أؤمن بأن أحد الطرفين يجب أن يلغي الآخر. فالحكمة لا تكمن في الانحياز إلى جانب وإقصاء الآخر، بل في فهم كليهما وإدراك موقع كل منهما ضمن الصورة الكاملة. لا يكشف النور وحده كل شيء، ولا يفعل الظلام ذلك بمفرده؛ إنما يساعدني فهم العلاقة بينهما على الاقتراب من التكامل الداخلي.",
    journeyP4: "من هنا جاء اهتمامي بعمل الظل، والتعافي، ومراجعة الذات، والتكامل الداخلي. لا أريد الاكتفاء بتغطية جراحي أو تجاهل آثارها، بل أريد فهمها ومواجهة الجوانب التي أخفيها عن نفسي بدلاً من التظاهر بأنها غير موجودة.",

    messageTitle: "رسالتي ومهمتي",
    messageP1: "تتمحور رسالتي حول الوعي واكتشاف الذات والتحرّر من البرمجيات اللاواعية. يثير اهتمامي تفكيك المعتقدات والأفكار الموروثة والأنماط التي تشكّل نظرتنا إلى أنفسنا وإلى العالم من حولنا.",
    messageP2: "أؤمن بأن التحوّل الحقيقي لا يتحقق بمجرد ترديد المصطلحات الروحية أو تبنّي هوية مرتبطة بالصحوة؛ بل يتطلب مراجعة ما اعتدنا تصديقه دون تمحيص، والتعرّف إلى ظلالنا، وتحمل مسؤولية تطورنا الداخلي.",
    messageP3: "لا تتمثل مهمتي في التفكير نيابة عن الآخرين، أو فرض المعتقدات عليهم، أو تقديم إجابات جاهزة. ما يعنيني هو تحفيزهم على النظر بعمق، وكشف ما يظل خفياً تحت السطح، وفتح المجال أمام التساؤل في الأفكار التي اعتادوا التسليم بها.",
    messageP4: "ما أبحث عنه هو الوعي الحقيقي، لا استبدال منظومة معتقدات بأخرى واتباعها دون تفكير. تبدأ الحرية حين نتعلم مساءلة الأفكار التي نشأنا على اعتبارها حقائق لا تقبل النقاش.",

    abilitiesTitle: "قدراتي الروحية",
    abilitiesP1: "اهتمامي بالروحانيات يتجاوز المصطلحات والتصنيفات. يجذبني استكشاف الحدس والإدراك الداخلي والرمزية والمفاهيم المرتبطة بالطاقة، إلى جانب الطرق المختلفة التي يختبر بها الإنسان علاقته بذاته وبالعالم من حوله.",
    abilitiesP2: "أتعامل مع هذه الموضوعات من خلال التأمل الشخصي والملاحظة والاستكشاف. ولا أعتبر كل شعور أو تجربة غير مألوفة دليلاً قاطعاً على امتلاك قدرة خارقة؛ فالتمييز والوعي مهمان بقدر أهمية الانفتاح على التجربة.",
    abilitiesP3: "بالنسبة إليّ، ينبغي للروحانية أن تعمّق وعينا بذواتنا، لا أن تفصلنا عن الواقع. لذلك أظل منفتحة على استكشاف ما أختبره، وفهم ما يمكن فهمه، وإعادة النظر فيما لا يزال بحاجة إلى تساؤل.",

    shadowTitle: "عملي مع الظل",
    shadowP1: "يرتبط مساري الروحي ارتباطاً وثيقاً بعمل الظل، أي استكشاف الجوانب التي نتجنب الاعتراف بها في أنفسنا: المخاوف، والجراح، والتناقضات، والمشاعر المكبوتة، ومواطن الضعف، والأنماط اللاواعية التي تؤثر في أفكارنا واختياراتنا وسلوكنا دون أن ننتبه.",
    shadowP2: "لا أدعو إلى تمجيد الظلام أو تحويل المعاناة إلى صورة مثالية، بل إلى الوعي بما نحمله في أعماقنا. فما نرفض مواجهته لا يختفي بالضرورة؛ فقد يستمر في توجيه قراراتنا وردود أفعالنا من خلفية لا ننتبه إليها.",
    shadowP3: "مررت بمراحل شعرت فيها وكأن كل شيء بداخلي قد احترق وانتهى. ومع ذلك، عدت من جديد، لا بالشخصية نفسها ولا بالتصورات القديمة ذاتها. حملت رماد ما كنت عليه، وبدأت أبني منه شيئاً مختلفاً.",
    shadowP4: "هذا هو معنى الولادة من جديد بالنسبة إليّ: ألا أمحو الماضي أو أتظاهر بأن الألم لم يحدث، بل أن أفهم ما تركته التجربة في داخلي، وما بقي مني بعدها، وأن أختار بوعي ما سأبنيه من جديد.",

    philosophyTitle: "فلسفتي",
    philosophyP1: "هناك فكرتان تنسجمان بعمق مع رؤيتي للتحوّل: الخيمياء والرواقية. أرى في الخيمياء استعارة للتحوّل؛ أي إعادة النظر فيما نمر به، واستخراج فهم أعمق ومعنى وقيمة من التجارب التي بدت مؤلمة أو مكسورة أو عادية.",
    philosophyP2: "أما الرواقية فتذكّرني بالانضباط، والسيادة على النفس، والاتزان، والتمييز بين ما أستطيع تغييره وما يخرج عن إرادتي.",
    philosophyP3: "تقوم فلسفتي على التوازن لا على التطرف: أن أتغيّر دون أن أفقد ذاتي، وأن أتقبّل دون استسلام، وأن أشعر دون أن تبتلعني مشاعري، وأن أعيد بناء نفسي دون إنكار ماضيّ.",

    academicTitle: "تعليمي",
    academicP1: "قد تبدو اهتماماتي متباعدة للوهلة الأولى، لكن ما يجمع بينها هو رغبتي في فهم الإنسان والأنظمة التي تشكّل العالم من حوله.",
    academicP2: "حصلت على شهادة البكالوريا في شعبة تقني رياضي، تخصص هندسة مدنية، ثم نلت شهادة الماجستير في اللسانيات الإنجليزية. وإلى جانب دراستي الأكاديمية، توسّعت بصورة مستقلة في مجالات علم النفس، بما فيها علم النفس غير السوي وبعض جوانب علم النفس المظلم، فضلاً عن تطوير الويب والتكنولوجيا.",
    academicP3: "أعمل حالياً على تطوير معارفي في البرمجة والأمن السيبراني، وأطمح مستقبلاً إلى أن أصبح مهندسة روبوتات وأنظمة ذاتية التشغيل، متخصصة في استكشاف البيئات القصوى.",
    academicP4: "أطمح إلى المساهمة في تطوير أنظمة روبوتية مستقلة تستطيع استكشاف البيئات الصعبة والخطيرة أو التي يتعذر على الإنسان الوصول إليها، سواء على الأرض أو، مستقبلاً، خارجها.",

    nowTitle: "عملي",
    nowP1: "يُعدّ التعليم أحد أكثر الجوانب حضوراً واستمرارية في حياتي. أعمل مدرّسة للغة الإنجليزية وأستاذة جامعية، إلى جانب التدريس في مؤسسات التعليم الخاص والعمل الحر. ولدي ما يقارب أربع سنوات من الخبرة في التدريس ضمن قطاعات تعليمية مختلفة.",
    nowP2: "يمنحني التعليم فرصة للجمع بين اللغة والتواصل والإبداع وفهم الإنسان. وفي الوقت نفسه، أواصل العمل على بناء مساري في التكنولوجيا والبرمجة والأمن السيبراني والروبوتات.",

    interestsTitle: "اهتماماتي",
    interestsP1: "لم أستطع يوماً حصر فضولي في مجال واحد. فما يجمع اهتماماتي ليس موضوعاً بعينه، بل الرغبة في اكتشاف ما يتوارى خلف الظواهر والأفكار المألوفة.",
    interestsP2: "تمتد اهتماماتي إلى علم النفس، والفلسفة، والروحانيات، وعلوم الأعصاب، والتكنولوجيا، والذكاء الاصطناعي، والروبوتات، والأمن السيبراني، وعلم الفلك، والفيزياء، والأساطير، والرموز، والأدب، والسلوك الإنساني.",
    interestsP3: "ويثير اهتمامي بوجه خاص التقاء التخصصات التي تبدو متباعدة، وما يمكن أن ينشأ من أفكار وإمكانات جديدة عندما تتقاطع المعارف المختلفة.",

    aestheticTitle: "ذوقي الجمالي",
    aestheticP1: "يميل ذوقي إلى الأساليب البديلة، لكنه لا يلتزم بقالب واحد. أتنقّل بين الـNu-Goth والـTraditional Goth والطابع القوطي، وأميل أحياناً إلى الـBoho.",
    aestheticP2: "يجذبني الأسود والأزرق الداكن، والظلام الكوني، والكسوف، والقمر، والعناصر العتيقة، والعمارة القوطية، وحوريات البحر، ومصاصو الدماء، والأفاعي، والظلال والرموز القديمة.",
    aestheticP3: "أحب الظلام حين يحمل أناقة وغموضاً ومعنى، بعيداً عن المبالغة. فالظلام في نظري ليس مرادفاً للشر أو السلبية؛ أحياناً يكون المساحة التي تنكشف فيها الأشياء التي ظلت خفية.",

    animalsTitle: "رموزي",
    animalsP1: "أنظر إلى هذه الحيوانات باعتبارها رموزاً وأرشيتيبات شخصية، يحمل كل منها صفات ومعاني أجد صدى لها في رحلتي.",
    animalsP2: "ترمز الأفعى إلى التحوّل والتجدّد والتخلّي عن الهويات القديمة. وترمز البومة إلى الملاحظة والحكمة والقدرة على رؤية ما يغيب عن الآخرين. أما الغراب فيرتبط لدي بالغموض والذكاء واستكشاف المجهول.",
    animalsP3: "يجسّد اليغور الأسود القوة الصامتة والاستقلالية والهيبة، بينما يرمز النسر إلى اتساع الرؤية والحرية والقدرة على النظر إلى الأشياء من منظور أوسع.",

    cosmicTitle: "أبراجي",
    cosmicP1: "وفقاً لخريطتي الفلكية:",
    cosmicSun: "الشمس في الثور",
    cosmicMoon: "القمر في الميزان",
    cosmicRising: "الطالع في الأسد",
    cosmicVenus: "الزهرة في الجوزاء",
    cosmicMercury: "عطارد في الحمل",
    cosmicMars: "المريخ في العقرب",
    cosmicLilith: "ليليث في العقرب",
    cosmicP2: "أحب استكشاف علم التنجيم بوصفه لغة رمزية تساعد على التأمل في الشخصية والميول والتناقضات الداخلية وأبعاد التجربة الإنسانية. أتعامل معه كإطار للتفكير وفهم الذات، لا كحكم نهائي يختزل الإنسان أو يحدد هويته.",

    languagesTitle: "لغاتي",
    languagesP1: "أتحدث العربية والإنجليزية والفرنسية، وأتعلم حالياً اليابانية والألمانية والإيطالية.",
    languagesP2: "تثير اللغات اهتمامي لأن لكل لغة رؤيتها الخاصة للعالم وإيقاعها وطريقتها في التعبير عن الواقع. فتعلّم لغة جديدة يمنحني أيضاً فرصة لاكتشاف طريقة مختلفة في التفكير.",

    charactersTitle: "شخصيات أجد صدى لها",
    charactersP1: "تثير بعض الشخصيات الخيالية اهتمامي بسبب رمزيتها وتعقيدها وحضورها. تجذبني شخصيتا Makima وEsdeath من ناحية النماذج الرمزية التي تجسّدانها، كما أجد في Effy Stonem وHannibal Lecter نماذج لشخصيات معقدة نفسياً وذات طابع مظلم أحب استكشافها.",
    charactersP2: "أما من ناحية المظهر والحضور الجمالي للمشاهير، فتلفتني Megan Fox بشكل خاص، ونعم، هي الشخصية المشهورة التي أُعجب بها. هذه الشخصيات والمراجع تعبّر عن ذائقتي وما يثير اهتمامي، ولا تعني أنني أرى نفسي نسخة مطابقة منها.",

    personalTitle: "جانب شخصي مني",
    personalP1: "أعرّف نفسي بأنني Aroace، أي لا رومانسية ولا جنسية. كما أعيش تجارب مرتبطة باضطراب الشخصية الحدّية ونمط التعلّق التجنّبي، وقد أثرت هذه التجارب في بعض جوانب رحلتي، خصوصاً ما يتعلق بالحدود العاطفية والعلاقات وفهم الذات والتعافي.",
    personalP2: "لكنني أرفض اختزال نفسي في تشخيص أو تصنيف أو مرحلة صعبة من حياتي. صعوباتي جزء من قصتي، لكنها لا تختصر هويتي ولا تحدد كل ما أنا عليه.",

    futureTitle: "مستقبلي",
    futureP1: "في نهاية المطاف، تعود الأشياء جميعها إلى فكرة واحدة: الخلق والإبداع. لا أريد أن تنتهي رحلتي عند حدود فهم نفسي فحسب؛ أريد أن أبتكر وأتعلّم وأبني وأستكشف وأعلّم وأكتب وأصمّم وأجرّب، وأن أصل بين عوالم قد تبدو منفصلة.",
    futureP2: "أطمح إلى الجمع بين الإنسان والتكنولوجيا، وعلم النفس والفلسفة، والغموض والعلم، والأرض والكون. قد تتغير تفاصيل طريقي مع مرور الوقت، لكن وجهته تظل واحدة: أن أصبح أكثر وعياً وقدرة ونفعاً، وأن أبني شيئاً يتجاوز حدود وجودي الشخصي ويترك أثراً ذا قيمة في الإنسانية.",

    whyTitle: "لماذا ليليث؟",
    whyP1: "لأن ليليث ليست مجرد ذوق جمالي أو اسم اخترته؛ إنها رمز لرحلة من التشتّت إلى التكامل، ومن الخوف إلى الفهم، ومن الجراح إلى التعافي، ومن الأنماط اللاواعية إلى الوعي، ومن الهدم إلى إعادة البناء، ومن الظلام إلى الحكمة الكامنة فيه.",
    whyP2: "وربما الأهم من ذلك كله، أنها تعبّر عن الانتقال من البحث عن الإجابات خارج الذات إلى تعلّم العودة إليها.",
    whyP3: "لقد مررت بنسخ كثيرة من نفسي؛ أحببت بعضها، وتجاوزت بعضها، واضطررت إلى ترك بعضها خلفي. بعضها حطّمني، وبعضها أنقذني، وبعضها ما زلت أكتشفه حتى اليوم.",
    whyP4: "رحلتي ليست اختيار النور على حساب الظلام، ولا الظلام على حساب النور، بل تعلّم احتوائهما معاً. ليس القلب في مواجهة العقل، بل القلب إلى جانب العقل. وليس المطلوب تدمير الظل، بل مواجهته وفهمه. وليس أن أصبح شخصاً آخر، بل أن أقترب أكثر من حقيقتي.",

    whyFinal: "أنا ليليث. ما زلت أتعلم، وأتعافى، وأتساءل، وأتحوّل، وأواصل التشكل.",
    whyFinalP: "وربما هذا هو المعنى الذي حمله اسم ليليث بالنسبة إليّ دائماً: ليست هوية اكتملت، بل رحلة تحوّل لا تتوقف.",

    click: "اكتشف هذا الفصل",
    close: "إغلاق الفصل",
    footer: "رحلة مستمرة من التحوّل والتشكّل."
  }
}

// --------------------------------------------------
// SECTIONS
// --------------------------------------------------

const SECTIONS = [
  { id: 'intro', title: 'introTitle', paragraphs: ['introP1', 'introP2', 'introP3', 'introP4'] },
  { id: 'journey', title: 'journeyTitle', paragraphs: ['journeyP1', 'journeyP2', 'journeyP3', 'journeyP4'] },
  { id: 'message', title: 'messageTitle', paragraphs: ['messageP1', 'messageP2', 'messageP3', 'messageP4'] },
  { id: 'abilities', title: 'abilitiesTitle', paragraphs: ['abilitiesP1', 'abilitiesP2', 'abilitiesP3'] },
  { id: 'shadow', title: 'shadowTitle', paragraphs: ['shadowP1', 'shadowP2', 'shadowP3', 'shadowP4'] },
  { id: 'philosophy', title: 'philosophyTitle', paragraphs: ['philosophyP1', 'philosophyP2', 'philosophyP3'] },
  { id: 'academic', title: 'academicTitle', paragraphs: ['academicP1', 'academicP2', 'academicP3', 'academicP4'] },
  { id: 'now', title: 'nowTitle', paragraphs: ['nowP1', 'nowP2'] },
  { id: 'interests', title: 'interestsTitle', paragraphs: ['interestsP1', 'interestsP2', 'interestsP3'] },
  { id: 'aesthetic', title: 'aestheticTitle', paragraphs: ['aestheticP1', 'aestheticP2', 'aestheticP3'] },
  { id: 'animals', title: 'animalsTitle', paragraphs: ['animalsP1', 'animalsP2', 'animalsP3'] },
  { id: 'cosmic', title: 'cosmicTitle', paragraphs: ['cosmicP1', 'cosmicP2'] },
  { id: 'languages', title: 'languagesTitle', paragraphs: ['languagesP1', 'languagesP2'] },
  { id: 'characters', title: 'charactersTitle', paragraphs: ['charactersP1', 'charactersP2'] },
  { id: 'personal', title: 'personalTitle', paragraphs: ['personalP1', 'personalP2'] },
  { id: 'future', title: 'futureTitle', paragraphs: ['futureP1', 'futureP2'] },
  { id: 'why', title: 'whyTitle', paragraphs: ['whyP1', 'whyP2', 'whyP3', 'whyP4'] }
] as const

// --------------------------------------------------
// PAGE
// --------------------------------------------------

export default function WhoIsLilithPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [openSection, setOpenSection] = useState<string | null>(null)

  const t = CONTENT[lang]
  const isRTL = lang === 'ar'

  const toggleSection = (id: string) => {
    setOpenSection(current => current === id ? null : id)
  }

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`relative min-h-screen text-white font-nav selection:bg-blood/30 selection:text-white ${isRTL ? 'font-arabic' : ''}`}
    >

      {/* BACKGROUND VIDEO & ANIMATION */}

      <div className="fixed inset-0 z-0 overflow-hidden bg-obsidian pointer-events-none">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src="/lilith-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian/80" />

        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blood/10 blur-[150px] animate-slow-drift" />

        <div
          className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-siren/15 blur-[120px] animate-slow-drift"
          style={{ animationDelay: '-15s' }}
        />

        {/* FLOATING PARTICLES */}

        {Array.from({ length: 30 }, (_, i) => {
          const left = (i * 37.7) % 100
          const top = (i * 61.3) % 100
          const size = (i % 3) + 1
          const delay = (i * 1.7) % 15
          const duration = 15 + ((i * 3.1) % 20)
          const isCrimson = i % 7 === 0

          return (
            <div
              key={i}
              className={`absolute rounded-full animate-float-particle ${
                isCrimson ? 'bg-blood/50' : 'bg-silver/30'
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                boxShadow: isCrimson
                  ? '0 0 4px rgba(92,10,18,0.6)'
                  : '0 0 6px rgba(170,183,200,0.4)'
              }}
            />
          )
        })}
      </div>

      {/* MAIN CONTENT */}

      <div className={`relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}>

        {/* NAVIGATION */}

        <div className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center">

          <Link
            href="/space"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-silver/80 hover:text-sovereign transition-colors bg-obsidian/80 backdrop-blur-md px-4 py-2 rounded-full border border-silver/20 hover:border-sovereign/60"
          >
            {t.back}
          </Link>

          <button
            type="button"
            onClick={() => {
              setLang(lang === 'en' ? 'ar' : 'en')
              setOpenSection(null)
            }}
            className="text-[10px] tracking-[0.3em] uppercase text-silver/80 hover:text-sovereign transition-colors bg-obsidian/80 backdrop-blur-md px-4 py-2 rounded-full border border-silver/20 hover:border-sovereign/60"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

        </div>

        {/* HERO */}

        <section className="pt-40 pb-24 px-6 text-center flex flex-col items-center justify-center min-h-[70vh]">

          <div className="mb-8 text-silver text-xl md:text-2xl tracking-[0.5em] animate-pulse-glow drop-shadow-[0_0_10px_rgba(170,183,200,0.5)]">
            {t.symbol}
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] text-white drop-shadow-[0_0_30px_rgba(74,140,255,0.4)] mb-6">
            {t.title}
          </h1>

          {/* VAMPY / SIREN — WHITE */}

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mt-4">

            <span className="font-display text-sm md:text-base tracking-[0.4em] text-white uppercase drop-shadow-md">
              {t.subtitle1}
            </span>

            <span className="hidden md:block w-1 h-1 rounded-full bg-white/50" />

            <span className="font-display text-sm md:text-base tracking-[0.4em] text-white uppercase drop-shadow-md">
              {t.subtitle2}
            </span>

          </div>

          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-silver/50 to-transparent mx-auto mt-12 mb-6" />

          <p className="text-silver/70 text-[10px] md:text-xs tracking-[0.4em] uppercase">
            {t.tagline}
          </p>

        </section>

        {/* INTERACTIVE CONTENT */}

        <div className="max-w-4xl mx-auto px-6 space-y-5 pb-32">

          <div className="text-center mb-12">
            <div className="text-silver/60 text-xl tracking-[0.5em]">
              ☽ ⋆ ◯ ⋆ ☾
            </div>
          </div>

          {SECTIONS.map((section, index) => {
            const isOpen = openSection === section.id

            return (
              <section
                key={section.id}
                className={`overflow-hidden border transition-all duration-500 ${
                  isOpen
                    ? 'border-sovereign/50 bg-obsidian/75 shadow-[0_0_30px_rgba(74,140,255,0.08)]'
                    : 'border-silver/15 bg-obsidian/45 hover:border-silver/40'
                }`}
              >

                {/* CLICKABLE TITLE */}

                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${section.id}-content`}
                  className="w-full flex items-center gap-5 px-5 md:px-8 py-6 group"
                >

                  <span className="text-silver/40 text-xs tracking-widest shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span
                    className={`flex-1 text-lg md:text-2xl text-white transition-colors duration-300 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t[section.title]}
                  </span>

                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full border border-silver/30 text-silver/70 transition-all duration-300 shrink-0 ${
                      isOpen ? 'rotate-45 border-white text-white' : 'group-hover:border-white group-hover:text-white'
                    }`}
                  >
                    +
                  </span>

                </button>

                {/* EXPANDABLE INFORMATION */}

                <div
                  id={`${section.id}-content`}
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >

                  <div className="overflow-hidden">

                    <div className={`px-6 md:px-12 pb-10 pt-3 space-y-6 ${
                      isRTL
                        ? 'border-r-2 border-sovereign/40 mr-6 md:mr-10'
                        : 'border-l-2 border-sovereign/40 ml-6 md:ml-10'
                    }`}>

                      {section.id === 'cosmic' ? (
                        <>

                          <p className="text-silver/80 leading-relaxed">
                            {t.cosmicP1}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            {[
                              ['☉', t.cosmicSun],
                              ['☽', t.cosmicMoon],
                              ['ASC', t.cosmicRising],
                              ['♀', t.cosmicVenus],
                              ['☿', t.cosmicMercury],
                              ['♂', t.cosmicMars],
                              ['⚸', t.cosmicLilith]
                            ].map(([symbol, value], i) => (
                              <div
                                key={i}
                                className="flex items-center gap-4 p-4 bg-obsidian/70 border border-silver/15 hover:border-sovereign/50 transition-colors"
                              >
                                <span className="text-silver text-xl w-8 text-center">
                                  {symbol}
                                </span>

                                <span className="text-silver/90 text-sm md:text-base">
                                  {value}
                                </span>
                              </div>
                            ))}

                          </div>

                          <p className="text-silver/80 leading-relaxed">
                            {t.cosmicP2}
                          </p>

                        </>
                      ) : (

                        section.paragraphs.map((key, i) => (
                          <p
                            key={i}
                            className="text-silver/80 leading-relaxed text-base md:text-lg"
                          >
                            {t[key]}
                          </p>
                        ))

                      )}

                      <div className={`pt-4 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                        <span className="text-silver/40 text-[9px] tracking-[0.3em] uppercase">
                          {t.close}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

              </section>
            )
          })}

          {/* FINAL STATEMENT */}

          <section className="pt-24 pb-12 text-center">

            <div className="text-silver/60 text-xl tracking-[0.5em] mb-10">
              {t.symbol}
            </div>

            <h2 className="font-display text-2xl md:text-4xl text-white leading-relaxed mb-8">
              {t.whyFinal}
            </h2>

            <p className="text-silver/60 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
              {t.whyFinalP}
            </p>

            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-silver/40 to-transparent mx-auto mt-12" />

            <p className="text-silver/40 text-[9px] tracking-[0.35em] uppercase mt-8">
              {t.footer}
            </p>

          </section>

        </div>
      </div>
    </div>
  )
}
