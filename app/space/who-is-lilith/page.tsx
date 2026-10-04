'use client'

import { useState } from 'react'
import Link from 'next/link'

type Animal = {
  label: string
  name: string
  title: string
  description: string
}

type Zodiac = {
  placement: string
  sign: string
}

type Character = {
  name: string
  description: string
}

type PersonalItem = {
  label: string
  value: string
  description: string
}

type Card = {
  id: string
  number: string
  title: string
  category: string
  content: string[]
  accent?: 'red' | 'white'
  type?:
    | 'tags'
    | 'animals'
    | 'zodiac'
    | 'languages'
    | 'personal'
    | 'mbti'
    | 'characters'
    | 'celebrity'
  tags?: string[]
  animals?: Animal[]
  zodiac?: Zodiac[]
  languages?: {
    current: {
      language: string
      level?: string
    }[]
    learning: {
      language: string
    }[]
  }
  personal?: PersonalItem[]
  mbti?: {
    type: string
    title: string
    description: string
  }
  characters?: Character[]
  celebrity?: {
    name: string
    description: string
  }
}

type ContentSet = {
  back: string
  title: string
  subtitle: string
  langToggle: string
  introLabel: string
  introText: string
  footerText: string
  cards: Card[]
}

const CONTENT: Record<'en' | 'ar', ContentSet> = {
  en: {
    back: '← BACK TO ECLIPSE',
    title: 'LILITH',
    subtitle: 'VAMPIRE • SIREN',
    langToggle: 'العربية',
    introLabel: 'GETTING TO KNOW LILITH',
    introText:
      'There is a lot behind the name Lilith.',
    footerText:
      'WRITE IT. FEEL IT. RELEASE IT. RETURN TO YOURSELF.',

    cards: [
      {
        id: 'getting-to-know',
        number: '01',
        title: 'GETTING TO KNOW LILITH',
        category: 'THE NAME',
        accent: 'red',
        content: [
          'There is a lot behind the name Lilith.',
          'Lilith is my nickname, but to me, it is much more than a name. It represents a part of my personality, my aesthetic, my energy, and the way I see the world. In some way, the name has been haunting me since I was a child, long before I fully understood why I was drawn to it.',
          'It became a symbol of the parts of myself that I could not always explain: curiosity, darkness, independence, transformation, mystery, femininity, introspection, and the constant desire to understand what exists beneath the surface.',
          'So, if you know me as Lilith, you are not simply knowing a nickname. You are seeing a part of who I am.',
          'And Eclipse carries a meaning of its own. It refers to a Japanese legend in which the Sun and the Moon loved each other, but because they existed at different times, they could never meet. According to the legend, God created the eclipse so that they could finally meet, if only for a moment.',
          'To me, that image represents the idea that there is no impossible love — only circumstances that may keep two souls apart until the moment they are finally allowed to meet. It is also connected to my own understanding of the twin flame story.'
        ]
      },

      {
        id: 'about',
        number: '02',
        title: 'A LITTLE ABOUT ME',
        category: 'IDENTITY',
        content: [
          'I am in my late twenties.',
          'I am Algerian and currently live in Algeria, with Turkish heritage.',
          'I tend to be a private person, so I prefer keeping certain parts of my identity to myself. I believe that not everything meaningful about a person needs to be publicly revealed.',
          'I am someone who is constantly learning, questioning, creating, and rebuilding myself.',
          "I don't think I have ever been interested in living only on the surface of things.",
          'I want to know why.',
          'Why people behave the way they do. Why we become who we become. Why certain symbols appear throughout history. Why we dream. Why cultures develop differently. Why humans fear certain things. Why we are attracted to darkness, beauty, mystery, and the unknown.',
          'I am fascinated by the layers underneath ordinary life.'
        ]
      },

      {
        id: 'education',
        number: '03',
        title: 'EDUCATION & KNOWLEDGE',
        category: 'KNOWLEDGE',
        content: [
          'My academic background is quite diverse.',
          'I obtained my Baccalaureate in Technical Mathematics — Civil Engineering.',
          "I then pursued a Master's degree in English Linguistics.",
          'Alongside my formal education, I have independently explored subjects that interest me deeply, including psychology, abnormal psychology, forensic psychology, human behaviour, and what is often referred to as dark psychology.',
          'I also have a background in web development, and I am currently expanding my knowledge of programming, cybersecurity, robotics, artificial intelligence, and autonomous systems.',
          'For me, learning is not something that ends with a degree.',
          'I am interested in becoming someone who can move between different worlds of knowledge rather than being confined to one.'
        ]
      },

      {
        id: 'career',
        number: '04',
        title: 'WHAT I DO',
        category: 'CAREER & FUTURE',
        content: [
          'I currently work as an English instructor at university, at a private school, and as a freelancer.',
          'I have almost four years of teaching experience across different educational sectors.',
          'Teaching is one part of my life, but it is not the only direction I am pursuing.',
          'I am also working towards a much bigger dream: Robotics & Autonomous Systems Engineer — Extreme Environment Exploration.',
          'I want to work at the intersection of robotics, autonomous systems, technology, exploration, and science — building systems capable of going where humans cannot easily go.',
          'My curiosity extends from the depths of the oceans to the vastness of space.',
          'I want to explore the unknown through technology.'
        ]
      },

      {
        id: 'mind',
        number: '05',
        title: 'THE THINGS THAT LIVE IN MY MIND',
        category: 'CURIOSITY',
        content: [
          'My interests are probably one of the hardest things to summarise because they are everywhere.',
          'I am deeply interested in shadow work, psychology, abnormal psychology, forensic psychology, human behaviour, neuroscience, philosophy, emotional intelligence, body language, birth charts and astrology, spirituality, mythology, ancient civilisations, Ancient Greek culture, Japanese culture, ancient symbols, symbolism, astronomy, space, moon phases, parallel universe theories, dream meanings, lucid dreaming, mystery, horror, true crime, crime documentaries, gothic aesthetics, dark academia, cosmic and vintage aesthetics, storytelling, art and music, hidden meanings in films and music, cultures and languages, technology and AI, meditation, energy frequencies, energy healing, manifestation, tarot, self-improvement, fitness and healthy living, and animals.',
          'And probably most importantly: I love understanding things that make people stop and ask questions.'
        ]
      },

      {
        id: 'aesthetic',
        number: '06',
        title: 'MY AESTHETIC',
        category: 'VISUAL LANGUAGE',
        type: 'tags',
        tags: [
          'ALTERNATIVE',
          'GOTHIC',
          'NU-GOTH',
          'TRADITIONAL GOTH',
          'BOHO',
          'DARK ACADEMIA',
          'COSMIC',
          'VINTAGE',
          'VAMPIRE',
          'SIREN',
          'ECLIPSE',
          'MIDNIGHT BLUE',
          'BLACK',
          'BLOOD RED',
          'MOONLIGHT',
          'MYSTERY'
        ],
        content: [
          "My aesthetic is alternative and gothic, but I don't like being restricted to one category.",
          'Sometimes I lean towards nu-goth. Sometimes traditional goth. Sometimes boho. Sometimes something darker, more cosmic, vintage, mysterious, or simply impossible to categorise.',
          'I love the combination of darkness + elegance + mystery + femininity + cosmic symbolism.',
          'I am drawn to black, deep blues, eclipses, snakes, ravens, old symbols, moonlight, rainy weather, gothic architecture, vintage imagery, mysterious places, cosmic landscapes, and anything that feels like it belongs somewhere between reality and a dream.'
        ]
      },

      {
        id: 'animals',
        number: '07',
        title: 'MY SPIRITUAL ANIMALS',
        category: 'SYMBOLISM',
        type: 'animals',
        animals: [
          {
            label: 'PRIMARY SPIRIT ANIMAL',
            name: 'SNAKE',
            title: 'Transformation • Rebirth • Hidden Wisdom',
            description:
              'The snake represents transformation, rebirth, and hidden wisdom. Like a snake shedding its skin, I see myself as someone who constantly evolves, leaves old versions of herself behind, and searches for deeper truths. It reflects my attraction to shadow work, self-discovery, transformation, and personal growth.'
          },
          {
            label: 'GUIDE ANIMAL',
            name: 'OWL',
            title: 'Intuition • Insight • Observation',
            description:
              'The owl represents intuition, insight, observation, and seeing what others overlook. It symbolises my desire to understand what exists beneath the obvious.'
          },
          {
            label: 'SHADOW ANIMAL',
            name: 'RAVEN',
            title: 'Mystery • Unconscious • Transformation',
            description:
              'The raven represents mystery, the unconscious, transformation, and wisdom found in darkness. It reflects my willingness to explore difficult emotions, uncomfortable questions, and the parts of life that people sometimes avoid.'
          },
          {
            label: 'PROTECTIVE ANIMAL',
            name: 'BLACK JAGUAR',
            title: 'Strength • Protection • Instinct',
            description:
              'The black jaguar represents strength, protection, courage, instinct, and mastery of the shadow. It reminds me to stand in my own power and trust myself when moving through uncertainty.'
          },
          {
            label: 'HIGHER PERSPECTIVE ANIMAL',
            name: 'EAGLE',
            title: 'Freedom • Vision • Perspective',
            description:
              'The eagle represents freedom, independence, vision, and the ability to see the bigger picture. It reflects my desire to rise above limitations, find my own path, and understand life from a wider perspective.'
          }
        ],
        content: [
          'These animals are symbolic representations of qualities and psychological themes that resonate with different parts of me.'
        ]
      },

      {
        id: 'zodiac',
        number: '08',
        title: 'MY COSMIC BLUEPRINT',
        category: 'ASTROLOGY',
        type: 'zodiac',
        zodiac: [
          {
            placement: 'RISING',
            sign: 'LEO'
          },
          {
            placement: 'SUN',
            sign: 'TAURUS'
          },
          {
            placement: 'MOON',
            sign: 'VIRGO'
          },
          {
            placement: 'VENUS',
            sign: 'GEMINI'
          },
          {
            placement: 'MERCURY',
            sign: 'ARIES'
          },
          {
            placement: 'MARS',
            sign: 'SCORPIO'
          },
          {
            placement: 'LILITH',
            sign: 'SCORPIO'
          }
        ],
        content: [
          'My astrological placements are Rising — Leo, Sun — Taurus, Moon — Virgo, Venus — Gemini, Mercury — Aries, Mars — Scorpio, and Lilith — Scorpio.',
          'Astrology is one of the symbolic systems I enjoy exploring because I find it fascinating as a language for personality, archetypes, symbolism, and self-reflection.'
        ]
      },

      {
        id: 'personality',
        number: '09',
        title: 'MY PERSONALITY',
        category: 'MBTI',
        type: 'mbti',
        mbti: {
          type: 'INTJ-T',
          title: 'THE ARCHITECT',
          description:
            'I naturally gravitate towards strategy, independence, observation, analysis, long-term thinking, and understanding systems.'
        },
        content: [
          'I enjoy figuring things out for myself.',
          'I tend to question things rather than simply accepting them, and I value depth over superficiality.',
          'I do not see MBTI as a complete definition of who I am. I see it as one framework that describes certain tendencies in the way I think, process information, and approach the world.'
        ]
      },

      {
        id: 'languages',
        number: '10',
        title: 'LANGUAGES',
        category: 'CULTURE & COMMUNICATION',
        type: 'languages',
        languages: {
          current: [
            {
              language: 'ARABIC',
              level: 'SPOKEN'
            },
            {
              language: 'ENGLISH',
              level: 'SPOKEN'
            },
            {
              language: 'FRENCH',
              level: 'SPOKEN'
            }
          ],
          learning: [
            {
              language: 'JAPANESE'
            },
            {
              language: 'GERMAN'
            },
            {
              language: 'ITALIAN'
            }
          ]
        },
        content: [
          'Languages fascinate me because learning a language is not simply learning vocabulary.',
          'It is stepping into another culture, another way of thinking, and sometimes another version of yourself.'
        ]
      },

      {
        id: 'hobbies',
        number: '11',
        title: 'WHAT I DO FOR FUN',
        category: 'OFF THE RECORD',
        content: [
          'I have far too many hobbies to have just one.',
          'I love reading, writing, cooking — which genuinely calms me — fitness, yoga, crochet, although I am still a beginner, learning random things, watching crime documentaries, exploring mythology, studying psychology, listening to music, storytelling, and exploring films and their hidden meanings.',
          'I am the kind of person who can spend hours going down an unexpected research rabbit hole simply because one question led to another.'
        ]
      },

      {
        id: 'characters',
        number: '12',
        title: 'CHARACTERS THAT REPRESENT DIFFERENT SIDES OF ME',
        category: 'FICTIONAL ARCHETYPES',
        type: 'characters',
        characters: [
          {
            name: 'MAKIMA',
            description:
              'Represents certain aspects of the powerful, controlled, intimidating feminine archetype that fascinates me.'
          },
          {
            name: 'ESDEATH',
            description:
              'Represents another expression of the powerful, commanding, controlled feminine archetype that I find psychologically fascinating.'
          },
          {
            name: 'EFFY STONEM',
            description:
              'Represents complexity, emotional contradiction, mystery, vulnerability, and detachment.'
          },
          {
            name: 'HANNIBAL',
            description:
              'Represents my fascination with intelligence, psychology, aesthetics, symbolism, philosophy, and the darker sides of human nature.'
          }
        ],
        content: [
          "These characters don't define me literally. I simply find different fragments of their archetypes fascinating."
        ]
      },

      {
        id: 'energy',
        number: '13',
        title: 'THE ENERGY I AM DRAWN TO',
        category: 'ATTRACTION & AESTHETICS',
        type: 'celebrity',
        celebrity: {
          name: 'MEGAN FOX',
          description:
            'If I had to describe the kind of beauty and energy I am naturally drawn towards, Megan Fox is probably the closest celebrity reference. She is also my celebrity crush, so there is that.'
        },
        content: []
      },

      {
        id: 'personal',
        number: '14',
        title: 'A MORE PRIVATE PART OF ME',
        category: 'PERSONAL',
        type: 'personal',
        accent: 'red',
        personal: [
          {
            label: 'SEXUALITY',
            value: 'AROACE',
            description:
              'I identify as aromantic and asexual.'
          },
          {
            label: 'ATTRACTION',
            value: 'SAPIOSEXUAL',
            description:
              'I am particularly drawn to intelligence, depth of thought, and meaningful intellectual connection.'
          },
          {
            label: 'WORLDVIEW',
            value: 'ANTINATALIST',
            description:
              'I identify with antinatalism, a philosophical position concerning the ethical implications of bringing new life into existence.'
          },
          {
            label: 'PHILOSOPHY',
            value: 'ALCHEMY • STOICISM',
            description:
              'Alchemy and Stoicism are two philosophical and symbolic frameworks that influence the way I think about transformation, discipline, suffering, meaning, self-mastery, and becoming.'
          },
          {
            label: 'PERSONAL EXPERIENCE',
            value: 'AVOIDANT PERSONALITY DISORDER',
            description:
              'This is part of my personal experience and has influenced the way I understand boundaries, vulnerability, relationships, identity, and self-awareness.'
          }
        ],
        content: [
          "I identify as aromantic and asexual — aroace.",
          'I also identify with sapiosexuality, particularly in the sense that intelligence, depth of thought, and meaningful intellectual connection strongly influence the kind of attraction I experience.',
          'Antinatalism is also part of my philosophical worldview, alongside my interest in alchemy and Stoicism.',
          "I have Avoidant Personality Disorder, which is part of my personal experience, but I don't want it to become the definition of who I am.",
          'These things are parts of my story, not the entirety of my identity.'
        ]
      },

      {
        id: 'why',
        number: '15',
        title: 'WHY LILITH?',
        category: 'THE CORE',
        accent: 'red',
        content: [
          'Perhaps the easiest way to explain everything above is this:',
          'I have always been drawn to the things that exist between opposites.',
          'Light and darkness. Science and mystery. Logic and intuition. Beauty and horror. The physical and the symbolic. The known and the unknown.',
          "I don't want to choose only one side.",
          'I want to explore the space between them.',
          'That is what Lilith represents to me.',
          'Not perfection. Not darkness for the sake of darkness. But curiosity, transformation, independence, depth, and the courage to look beneath the surface.',
          'I am still becoming.',
          'Still learning.',
          'Still shedding old skins.',
          'Still asking questions.',
          'Still building the person I want to become.',
          'And perhaps that is the most accurate introduction I can give you:',
          'I am Lilith — and I am still discovering what that means.'
        ]
      }
    ]
  },

  ar: {
    back: '← العودة إلى الكسوف',
    title: 'ليليث',
    subtitle: 'VAMPIRE • SIREN',
    langToggle: 'English',
    introLabel: 'التعرّف إلى ليليث',
    introText: 'هناك الكثير مما يقف خلف اسم «ليليث».',
    footerText:
      'اكتبها. اشعر بها. تحرر منها. ثم عُد إلى ذاتك.',

    cards: [
      {
        id: 'getting-to-know',
        number: '٠١',
        title: 'التعرّف إلى ليليث',
        category: 'الاسم',
        accent: 'red',
        content: [
          'هناك الكثير مما يقف خلف اسم «ليليث».',
          'ليليث هو الاسم الذي اخترته لنفسي، لكنه بالنسبة إليّ يتجاوز كونه مجرد اسم مستعار. إنه يمثل جانبًا من شخصيتي، وجمالي، وطاقة حضوري، والطريقة التي أنظر بها إلى العالم. وبشكل ما، ظل هذا الاسم يطاردني منذ طفولتي، قبل وقت طويل من أن أفهم تمامًا سبب انجذابي إليه.',
          'أصبح الاسم رمزًا لأجزاء مني لم أكن أستطيع دائمًا تفسيرها: الفضول، والظلام، والاستقلال، والتحول، والغموض، والأنوثة، والتأمل في الذات، والرغبة المستمرة في فهم ما يكمن تحت السطح.',
          'لذلك، عندما تعرفني باسم ليليث، فأنت لا تعرف مجرد لقب. أنت ترى جزءًا من حقيقتي.',
          'أما «Eclipse» — الكسوف — فيحمل معنى خاصًا بالنسبة إليّ أيضًا. فهو يشير إلى أسطورة يابانية تُروى عن الشمس والقمر، إذ كانا يحبان بعضهما، لكنهما كانا يوجدان في أوقات مختلفة، ولذلك لم يكن بوسعهما أن يلتقيا. ووفقًا للأسطورة، خلق الله الكسوف حتى يتمكنا من اللقاء، ولو للحظات قليلة.',
          'بالنسبة إليّ، تختصر هذه الصورة فكرة أن الحب المستحيل قد لا يكون مستحيلًا في جوهره، وإنما قد تفصل بينه وبين اللقاء ظروف لا تدوم إلى الأبد. ولهذا ارتبط معنى الكسوف لديّ أيضًا بقصة توأم الشعلة كما أفهمها.'
        ]
      },

      {
        id: 'about',
        number: '٠٢',
        title: 'قليل عني',
        category: 'الهوية',
        content: [
          'أنا في أواخر العشرينيات من عمري.',
          'أنا جزائرية وأعيش حاليًا في الجزائر، ولديّ أصول تركية.',
          'أميل إلى أن أكون شخصية شديدة الخصوصية، ولذلك أفضل الاحتفاظ ببعض جوانب هويتي لنفسي. فأنا أؤمن بأن ليس كل ما هو عميق أو ذو معنى في الإنسان يجب أن يكون مكشوفًا أمام الجميع.',
          'أنا شخص لا يتوقف عن التعلم، والتساؤل، والإبداع، وإعادة بناء ذاته.',
          'ولا أظن أنني كنت يومًا مهتمة بالعيش على سطح الأشياء فقط.',
          'أريد أن أعرف: لماذا؟',
          'لماذا يتصرف الناس بالطريقة التي يتصرفون بها؟ لماذا نصبح ما نصبح عليه؟ لماذا تتكرر رموز معينة عبر التاريخ؟ لماذا نحلم؟ لماذا تتطور الثقافات بطرق مختلفة؟ لماذا يخاف البشر من أشياء بعينها؟ ولماذا ننجذب إلى الظلام والجمال والغموض والمجهول؟',
          'إنني مفتونة بالطبقات الخفية التي تكمن تحت الحياة اليومية.'
        ]
      },

      {
        id: 'education',
        number: '٠٣',
        title: 'التعليم والمعرفة',
        category: 'المعرفة',
        content: [
          'خلفيتي الأكاديمية متنوعة إلى حد كبير.',
          'حصلت على شهادة البكالوريا في الرياضيات التقنية، تخصص الهندسة المدنية.',
          'ثم تابعت دراستي للحصول على درجة الماجستير في اللسانيات الإنجليزية.',
          'وإلى جانب تعليمي الأكاديمي، درست بشكل مستقل العديد من المجالات التي تثير اهتمامي، من بينها علم النفس، وعلم النفس غير السوي، وعلم النفس الجنائي، والسلوك البشري، وما يُشار إليه عادةً بعلم النفس المظلم.',
          'كما أمتلك خلفية في تطوير الويب، وأعمل حاليًا على توسيع معرفتي بالبرمجة، والأمن السيبراني، والروبوتات، والذكاء الاصطناعي، والأنظمة المستقلة.',
          'بالنسبة إليّ، لا تنتهي رحلة التعلم عند الحصول على شهادة.',
          'أريد أن أصبح شخصًا قادرًا على التنقل بين عوالم مختلفة من المعرفة، بدلًا من أن أحصر نفسي في مجال واحد فقط.'
        ]
      },

      {
        id: 'career',
        number: '٠٤',
        title: 'ماذا أفعل؟',
        category: 'المهنة والمستقبل',
        content: [
          'أعمل حاليًا كمدرّسة للغة الإنجليزية في الجامعة، وفي مدرسة خاصة، كما أعمل بشكل مستقل.',
          'لديّ ما يقارب أربع سنوات من الخبرة في التدريس ضمن قطاعات تعليمية مختلفة.',
          'التدريس جزء من حياتي، لكنه ليس الاتجاه الوحيد الذي أسعى إليه.',
          'كما أعمل على الوصول إلى حلم أكبر بكثير: مهندسة في الروبوتات والأنظمة المستقلة، مع التخصص في استكشاف البيئات القصوى.',
          'أريد أن أعمل عند نقطة التقاء الروبوتات، والأنظمة المستقلة، والتكنولوجيا، والاستكشاف، والعلوم، وأن أساهم في بناء أنظمة قادرة على الوصول إلى أماكن يصعب على الإنسان الوصول إليها.',
          'يمتد فضولي من أعماق المحيطات إلى اتساع الفضاء.',
          'أريد أن أستكشف المجهول من خلال التكنولوجيا.'
        ]
      },

      {
        id: 'mind',
        number: '٠٥',
        title: 'الأشياء التي تشغل ذهني',
        category: 'الفضول',
        content: [
          'من أصعب الأمور بالنسبة إليّ أن ألخّص اهتماماتي، لأنها تمتد في اتجاهات كثيرة.',
          'أهتم بشدة بعمل الظل، وعلم النفس، وعلم النفس غير السوي، وعلم النفس الجنائي، والسلوك البشري، وعلم الأعصاب، والفلسفة، والذكاء العاطفي، ولغة الجسد، وخرائط الميلاد وعلم التنجيم، والروحانيات، والأساطير، والحضارات القديمة، والثقافة اليونانية القديمة، والثقافة اليابانية، والرموز القديمة، وعلم الرموز، وعلم الفلك، والفضاء، وأطوار القمر، ونظريات الأكوان المتوازية، ومعاني الأحلام، والحلم الواعي، والغموض، والرعب، والجرائم الحقيقية، ووثائقيات الجرائم، والجماليات القوطية، وDark Academia، والجماليات الكونية والقديمة، وسرد القصص، والفن والموسيقى، والمعاني الخفية في الأفلام والموسيقى، والثقافات واللغات، والتكنولوجيا والذكاء الاصطناعي، والتأمل، وترددات الطاقة، والعلاج بالطاقة، والتجلّي، والتاروت، وتطوير الذات، واللياقة والحياة الصحية، والحيوانات.',
          'وربما الأهم من كل ذلك: أحب فهم الأشياء التي تجعل الإنسان يتوقف للحظة ويسأل: لماذا؟'
        ]
      },

      {
        id: 'aesthetic',
        number: '٠٦',
        title: 'جمالي البصري',
        category: 'اللغة البصرية',
        type: 'tags',
        tags: [
          'ALTERNATIVE',
          'GOTHIC',
          'NU-GOTH',
          'TRADITIONAL GOTH',
          'BOHO',
          'DARK ACADEMIA',
          'COSMIC',
          'VINTAGE',
          'VAMPIRE',
          'SIREN',
          'ECLIPSE',
          'MIDNIGHT BLUE',
          'BLACK',
          'BLOOD RED',
          'MOONLIGHT',
          'MYSTERY'
        ],
        content: [
          'جمالي البصري يميل إلى البديل والقوطي، لكنني لا أحب أن أحصر نفسي في تصنيف واحد.',
          'أميل أحيانًا إلى الـNu-Goth، وأحيانًا إلى القوطي التقليدي، وأحيانًا إلى الـBoho، وأحيانًا إلى شيء أكثر ظلمة أو كونية أو قِدمًا أو غموضًا، أو ببساطة إلى شيء يستعصي على التصنيف.',
          'أحب اجتماع الظلام مع الأناقة، والغموض مع الأنوثة، والرمزية الكونية مع الجمال.',
          'أنجذب إلى الأسود، والأزرق الداكن، والكسوفات، والثعابين، والغربان، والرموز القديمة، وضوء القمر، والطقس الماطر، والعمارة القوطية، والصور ذات الطابع العتيق، والأماكن الغامضة، والمشاهد الكونية، وكل ما يوحي بأنه ينتمي إلى منطقة تقع بين الواقع والحلم.'
        ]
      },

      {
        id: 'animals',
        number: '٠٧',
        title: 'حيواناتي الروحية',
        category: 'الرمزية',
        type: 'animals',
        animals: [
          {
            label: 'الحيوان الروحي الأساسي',
            name: 'SNAKE',
            title: 'التحول • الولادة من جديد • الحكمة الخفية',
            description:
              'يمثل الثعبان التحول، والتجدد، والحكمة الخفية. وكما يتخلى الثعبان عن جلده القديم، أرى نفسي شخصًا يتغير باستمرار، ويترك نسخًا قديمة من ذاته خلفه، ويبحث عن حقائق أعمق. وهو يعكس انجذابي إلى عمل الظل، واكتشاف الذات، والتحول، والنمو الشخصي.'
          },
          {
            label: 'حيوان الدليل',
            name: 'OWL',
            title: 'الحدس • البصيرة • الملاحظة',
            description:
              'تمثل البومة الحدس، والبصيرة، ودقة الملاحظة، والقدرة على رؤية ما قد يغفل عنه الآخرون. وهي ترمز إلى رغبتي في فهم ما يكمن خلف الظاهر.'
          },
          {
            label: 'حيوان الظل',
            name: 'RAVEN',
            title: 'الغموض • اللاوعي • التحول',
            description:
              'يمثل الغراب الغموض، واللاوعي، والتحول، والحكمة التي يمكن العثور عليها في الظلام. وهو يعكس استعدادي لاستكشاف المشاعر الصعبة، والأسئلة المزعجة، والجوانب التي يفضّل الناس أحيانًا تجنب مواجهتها.'
          },
          {
            label: 'الحيوان الحامي',
            name: 'BLACK JAGUAR',
            title: 'القوة • الحماية • الغريزة',
            description:
              'يمثل اليغور الأسود القوة، والحماية، والشجاعة، والغريزة، والسيطرة على الظل. ويذكّرني بالوقوف في قوتي الخاصة والثقة بنفسي عندما أعبر مناطق عدم اليقين.'
          },
          {
            label: 'حيوان الرؤية العليا',
            name: 'EAGLE',
            title: 'الحرية • الرؤية • المنظور',
            description:
              'يمثل النسر الحرية، والاستقلال، والرؤية، والقدرة على رؤية الصورة الأكبر. وهو يعكس رغبتي في تجاوز القيود، وصنع طريقي الخاص، وفهم الحياة من منظور أوسع.'
          }
        ],
        content: [
          'هذه الحيوانات تمثل رموزًا وصفات وموضوعات نفسية أشعر بأنها تعبّر عن جوانب مختلفة مني.'
        ]
      },

      {
        id: 'zodiac',
        number: '٠٨',
        title: 'خريطتي الكونية',
        category: 'علم التنجيم',
        type: 'zodiac',
        zodiac: [
          {
            placement: 'الطالع',
            sign: 'الأسد'
          },
          {
            placement: 'الشمس',
            sign: 'الثور'
          },
          {
            placement: 'القمر',
            sign: 'العذراء'
          },
          {
            placement: 'الزهرة',
            sign: 'الجوزاء'
          },
          {
            placement: 'عطارد',
            sign: 'الحمل'
          },
          {
            placement: 'المريخ',
            sign: 'العقرب'
          },
          {
            placement: 'ليليث',
            sign: 'العقرب'
          }
        ],
        content: [
          'مواقعي الفلكية هي: الطالع في الأسد، والشمس في الثور، والقمر في العذراء، والزهرة في الجوزاء، وعطارد في الحمل، والمريخ في العقرب، وليليث في العقرب.',
          'علم التنجيم أحد الأنظمة الرمزية التي أحب استكشافها، لأنني أجد فيه لغة مثيرة للتأمل في الشخصية، والرموز، والنماذج النفسية، ومعاني الذات.'
        ]
      },

      {
        id: 'personality',
        number: '٠٩',
        title: 'شخصيتي',
        category: 'MBTI',
        type: 'mbti',
        mbti: {
          type: 'INTJ-T',
          title: 'THE ARCHITECT',
          description:
            'أميل بطبيعتي إلى الاستراتيجية، والاستقلالية، والملاحظة، والتحليل، والتفكير بعيد المدى، وفهم الأنظمة والبنى التي تقف خلف الأشياء.'
        },
        content: [
          'أستمتع بفهم الأشياء والوصول إلى استنتاجاتي بنفسي.',
          'أميل إلى التساؤل بدلًا من قبول الأشياء كما هي، وأقدّر العمق أكثر من السطحية.',
          'لا أرى MBTI تعريفًا كاملًا لهويتي، بل أتعامل معه كإطار يساعدني على وصف بعض الميول في طريقة تفكيري، ومعالجتي للمعلومات، وتعاملي مع العالم.'
        ]
      },

      {
        id: 'languages',
        number: '١٠',
        title: 'اللغات',
        category: 'الثقافة والتواصل',
        type: 'languages',
        languages: {
          current: [
            {
              language: 'العربية',
              level: 'أتحدثها'
            },
            {
              language: 'الإنجليزية',
              level: 'أتحدثها'
            },
            {
              language: 'الفرنسية',
              level: 'أتحدثها'
            }
          ],
          learning: [
            {
              language: 'اليابانية'
            },
            {
              language: 'الألمانية'
            },
            {
              language: 'الإيطالية'
            }
          ]
        },
        content: [
          'اللغات تثير اهتمامي لأن تعلم لغة جديدة لا يعني حفظ المفردات فحسب.',
          'إنه دخول إلى ثقافة أخرى، وطريقة أخرى في التفكير، وأحيانًا إلى نسخة أخرى من الذات.'
        ]
      },

      {
        id: 'hobbies',
        number: '١١',
        title: 'ماذا أفعل في وقت فراغي؟',
        category: 'خارج السجل',
        content: [
          'لديّ من الهوايات ما يكفي لأن يصعب اختزالها في واحدة فقط.',
          'أحب القراءة، والكتابة، والطبخ — فهو يبعث في نفسي الهدوء فعلًا — واللياقة البدنية، واليوغا، والكروشيه رغم أنني ما زلت مبتدئة فيه، وتعلم الأشياء العشوائية لمجرد الفضول، ومشاهدة وثائقيات الجرائم، واستكشاف الأساطير، ودراسة علم النفس، والاستماع إلى الموسيقى، وسرد القصص، وتحليل الأفلام وما تخفيه من معانٍ.',
          'أنا من النوع الذي يمكنه أن يقضي ساعات في الغوص داخل موضوع بحثي غير متوقع، فقط لأن سؤالًا واحدًا قادني إلى سؤال آخر.'
        ]
      },

      {
        id: 'characters',
        number: '١٢',
        title: 'شخصيات تمثل جوانب مختلفة مني',
        category: 'النماذج الخيالية',
        type: 'characters',
        characters: [
          {
            name: 'MAKIMA',
            description:
              'تمثل بعض جوانب النموذج الأنثوي القوي، المتحكم، والمهيب الذي يثير اهتمامي.'
          },
          {
            name: 'ESDEATH',
            description:
              'تمثل جانبًا آخر من النموذج الأنثوي القوي، الحازم، والمسيطر الذي أجده مثيرًا للاهتمام من الناحية النفسية.'
          },
          {
            name: 'EFFY STONEM',
            description:
              'تمثل التعقيد، والتناقض العاطفي، والغموض، والهشاشة، والانفصال العاطفي.'
          },
          {
            name: 'HANNIBAL',
            description:
              'يمثل افتتاني بالذكاء، وعلم النفس، والجماليات، والرمزية، والفلسفة، والجوانب الأكثر ظلمة في الطبيعة البشرية.'
          }
        ],
        content: [
          'هذه الشخصيات لا تمثلني حرفيًا، ولا أعتبر نفسي نسخة منها. إنما أجد أجزاء مختلفة من نماذجها الرمزية والنفسية مثيرة للاهتمام.'
        ]
      },

      {
        id: 'energy',
        number: '١٣',
        title: 'الطاقة التي أنجذب إليها',
        category: 'الانجذاب والجماليات',
        type: 'celebrity',
        celebrity: {
          name: 'MEGAN FOX',
          description:
            'إذا أردت وصف نوع الجمال والطاقة التي أنجذب إليها بطبيعتي، فربما تكون ميغان فوكس أقرب مرجع معروف يمكن أن أستحضره. وهي أيضًا الـcelebrity crush الخاصة بي، لذلك نعم، هناك ذلك أيضًا.'
        },
        content: []
      },

      {
        id: 'personal',
        number: '١٤',
        title: 'جانب أكثر خصوصية مني',
        category: 'شخصي',
        type: 'personal',
        accent: 'red',
        personal: [
          {
            label: 'الميول العاطفية والجنسية',
            value: 'AROACE',
            description:
              'أعرّف نفسي بأنني لا رومانسية ولا جنسية.'
          },
          {
            label: 'الانجذاب',
            value: 'SAPIOSEXUAL',
            description:
              'ينجذب اهتمامي بصورة خاصة إلى الذكاء، وعمق التفكير، والاتصال الفكري ذي المعنى.'
          },
          {
            label: 'نظرتي إلى الإنجاب',
            value: 'لا إنجابية',
            description:
              'أتوافق مع الفلسفة اللاإنجابية، وهي موقف فلسفي يتناول الأبعاد الأخلاقية والنتائج المترتبة على جلب حياة جديدة إلى الوجود.'
          },
          {
            label: 'الفلسفة',
            value: 'الخيمياء • الرواقية',
            description:
              'الخيمياء والرواقية إطاران فكريان ورمزيان يؤثران في نظرتي إلى التحول، والانضباط، والمعاناة، والمعنى، وإتقان الذات، وعملية التكوّن.'
          },
          {
            label: 'تجربة شخصية',
            value: 'اضطراب الشخصية التجنّبية',
            description:
              'هذا جزء من تجربتي الشخصية، وقد أثّر في الطريقة التي أفهم بها الحدود، والهشاشة، والعلاقات، والهوية، والوعي بالذات.'
          }
        ],
        content: [
          'أعرّف نفسي بأنني لا رومانسية ولا جنسية — AROACE.',
          'كما أصف نوع الانجذاب لديّ بأنه SAPIOSEXUAL، خصوصًا بمعنى أن الذكاء، وعمق التفكير، والاتصال الفكري الحقيقي عوامل ذات أهمية كبيرة بالنسبة إليّ.',
          'اللاإنجابية جزء أيضًا من رؤيتي الفلسفية، إلى جانب اهتمامي بالخيمياء والرواقية.',
          'وأعيش مع اضطراب الشخصية التجنّبية، وهو جزء من تجربتي الشخصية، لكنني لا أريد له أن يتحول إلى تعريف كامل لي.',
          'هذه كلها أجزاء من قصتي، وليست كل قصتي.'
        ]
      },

      {
        id: 'why',
        number: '١٥',
        title: 'لماذا «ليليث»؟',
        category: 'الجوهر',
        accent: 'red',
        content: [
          'ربما تكون أسهل طريقة لشرح كل ما سبق هي التالية:',
          'لطالما انجذبت إلى الأشياء التي توجد بين المتناقضات.',
          'النور والظلام. العلم والغموض. المنطق والحدس. الجمال والرعب. المادي والرمزي. المعروف والمجهول.',
          'لا أريد أن أختار جانبًا واحدًا فقط.',
          'أريد أن أستكشف المساحة الواقعة بينهما.',
          'وهذا هو ما تمثله لي ليليث.',
          'ليست الكمال. وليست الظلام لمجرد الظلام. بل الفضول، والتحول، والاستقلال، والعمق، والشجاعة اللازمة للنظر تحت السطح.',
          'ما زلت في طور التكوّن.',
          'ما زلت أتعلم.',
          'ما زلت أخلع جلودي القديمة.',
          'ما زلت أطرح الأسئلة.',
          'وما زلت أبني الإنسانة التي أريد أن أصبحها.',
          'وربما يكون هذا أدق تعريف يمكنني أن أقدمه لكم:',
          'أنا ليليث — وما زلت أكتشف ما الذي يعنيه ذلك.'
        ]
      }
    ]
  }
}

export default function WhoIsLilithPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const t = CONTENT[lang]
  const isRTL = lang === 'ar'

  const activeCardData = t.cards.find(
    (card) => card.id === activeCard
  )

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`relative min-h-screen overflow-hidden bg-black text-white ${
        isRTL ? 'font-arabic' : 'font-nav'
      }`}
    >
      {/* =========================================================
          EXISTING VIDEO BACKGROUND
          DO NOT REPLACE — /lilith-bg.mp4
          ========================================================= */}

      <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        >
          <source src="/lilith-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
      </div>

      {/* =========================================================
          MAIN
          ========================================================= */}

      <main className="relative z-10 min-h-screen">

        {/* NAVIGATION */}

        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <Link
            href="/"
            className="text-[9px] tracking-[0.35em] text-white/55 transition-colors hover:text-white"
          >
            {t.back}
          </Link>

          <button
            onClick={() => setLang(isRTL ? 'en' : 'ar')}
            className="border border-white/20 px-4 py-2 text-[9px] tracking-[0.3em] text-white/65 transition-all hover:border-white/60 hover:text-white"
          >
            {t.langToggle}
          </button>
        </header>

        {/* =======================================================
            HERO
            ======================================================= */}

        <section className="mx-auto flex min-h-[72vh] w-full max-w-7xl items-center px-6 py-24 md:px-10 lg:px-16">
          <div className="max-w-5xl">

            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-14 bg-red-800" />

              <span className="text-[9px] tracking-[0.45em] text-white/40">
                {t.introLabel}
              </span>
            </div>

            <h1 className="text-[clamp(5rem,16vw,14rem)] font-light leading-[0.72] tracking-[-0.08em] text-white">
              {t.title}
            </h1>

            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-20 bg-white/50" />

              <span className="text-[9px] tracking-[0.5em] text-white/55">
                {t.subtitle}
              </span>
            </div>

            <div className="mt-14 max-w-2xl">
              <p className="text-sm font-light leading-8 text-white/55 md:text-base md:leading-9">
                {t.introText}
              </p>
            </div>

            <div className="mt-16 flex items-center gap-4">
              <span className="text-[8px] tracking-[0.4em] text-white/25">
                01 — 15
              </span>

              <span className="h-px w-20 bg-white/15" />

              <span className="text-[8px] tracking-[0.4em] text-white/25">
                PERSONAL ARCHIVE
              </span>
            </div>

          </div>
        </section>

        {/* =======================================================
            ARCHIVE
            ======================================================= */}

        <section className="mx-auto w-full max-w-7xl px-6 pb-32 md:px-10 lg:px-16">

          <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
            <span className="text-[8px] tracking-[0.4em] text-white/30">
              {isRTL ? 'الفهرس الشخصي' : 'PERSONAL INDEX'}
            </span>

            <span className="text-[8px] tracking-[0.3em] text-white/20">
              {t.cards.length.toString().padStart(2, '0')} FILES
            </span>
          </div>

          <div className="border-t border-white/10">

            {t.cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`group relative flex w-full items-center border-b border-white/10 py-8 transition-all duration-500 hover:bg-white/[0.035] ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >

                <span className="w-16 shrink-0 text-[9px] tracking-[0.25em] text-white/20 transition-colors group-hover:text-red-700">
                  {card.number}
                </span>

                <div className="flex-1">

                  <span className="block text-[clamp(1.15rem,2.4vw,2rem)] font-light tracking-[0.07em] text-white/80 transition-all duration-300 group-hover:tracking-[0.11em] group-hover:text-white">
                    {card.title}
                  </span>

                  <span className="mt-2 block text-[8px] tracking-[0.35em] text-white/25">
                    {card.category}
                  </span>

                </div>

                <span className="px-4 text-lg font-light text-white/20 transition-all duration-300 group-hover:text-red-700">
                  {isRTL ? '←' : '→'}
                </span>

                <span
                  className={`absolute bottom-0 h-px w-0 bg-red-800 transition-all duration-500 group-hover:w-28 ${
                    isRTL ? 'right-0' : 'left-0'
                  }`}
                />

              </button>
            ))}

          </div>
        </section>

        {/* FOOTER */}

        <footer className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/10 px-6 py-10 md:flex-row md:px-10 lg:px-16">

          <span className="text-[8px] tracking-[0.45em] text-white/20">
            LILITH'S ECLIPSE
          </span>

          <span className="text-center text-[8px] tracking-[0.3em] text-white/20">
            {t.footerText}
          </span>

        </footer>

      </main>

      {/* =========================================================
          MODAL
          ========================================================= */}

      {activeCardData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">

          <button
            aria-label="Close"
            onClick={() => setActiveCard(null)}
            className="absolute inset-0 cursor-default bg-black/85 backdrop-blur-md"
          />

          <div
            className={`relative flex max-h-[91vh] w-full max-w-5xl flex-col overflow-hidden border border-white/15 bg-black/95 shadow-2xl ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >

            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-start justify-between border-b border-white/10 px-6 py-6 md:px-10">

              <div className="flex items-start gap-5">

                <span className="pt-1 text-[9px] tracking-[0.3em] text-red-700">
                  {activeCardData.number}
                </span>

                <div>

                  <span className="mb-2 block text-[8px] tracking-[0.4em] text-white/25">
                    {activeCardData.category}
                  </span>

                  <h2 className="text-xl font-light tracking-[0.08em] text-white md:text-3xl">
                    {activeCardData.title}
                  </h2>

                </div>

              </div>

              <button
                onClick={() => setActiveCard(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-xl font-light text-white/40 transition-colors hover:border-white/50 hover:text-white"
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="overflow-y-auto px-6 py-10 md:px-10 md:py-14">

              {/* REGULAR TEXT */}

              {activeCardData.content.length > 0 && (
                <div className="max-w-4xl space-y-7">

                  {activeCardData.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-sm font-light leading-8 text-white/60 md:text-base md:leading-9 ${
                        index === 0
                          ? 'border-red-900 pl-5 text-white/85 ' +
                            (isRTL
                              ? 'border-r pr-5 pl-0'
                              : 'border-l')
                          : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}

                </div>
              )}

              {/* TAGS */}

              {activeCardData.type === 'tags' &&
                activeCardData.tags && (
                  <div className="mt-12 grid grid-cols-2 border-t border-white/10 sm:grid-cols-3 md:grid-cols-4">

                    {activeCardData.tags.map((tag) => (
                      <div
                        key={tag}
                        className="border-b border-r border-white/10 px-4 py-5 text-center text-[8px] tracking-[0.25em] text-white/45 transition-colors hover:text-white"
                      >
                        {tag}
                      </div>
                    ))}

                  </div>
                )}

              {/* SPIRITUAL ANIMALS */}

              {activeCardData.type === 'animals' &&
                activeCardData.animals && (
                  <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">

                    {activeCardData.animals.map((animal) => (
                      <div
                        key={animal.name}
                        className="bg-black p-7 md:p-9"
                      >

                        <span className="text-[8px] tracking-[0.35em] text-red-800">
                          {animal.label}
                        </span>

                        <h3 className="mt-5 text-xl font-light tracking-[0.15em] text-white">
                          {animal.name}
                        </h3>

                        <p className="mt-3 text-[9px] tracking-[0.25em] text-white/35">
                          {animal.title}
                        </p>

                        <p className="mt-6 text-xs leading-7 text-white/45">
                          {animal.description}
                        </p>

                      </div>
                    ))}

                  </div>
                )}

              {/* ZODIAC */}

              {activeCardData.type === 'zodiac' &&
                activeCardData.zodiac && (
                  <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-3">

                    {activeCardData.zodiac.map((item) => (
                      <div
                        key={`${item.placement}-${item.sign}`}
                        className="bg-black p-7 md:p-8"
                      >

                        <span className="text-[8px] tracking-[0.35em] text-red-800">
                          {item.placement}
                        </span>

                        <h3 className="mt-5 text-2xl font-light tracking-[0.1em] text-white">
                          {item.sign}
                        </h3>

                      </div>
                    ))}

                  </div>
                )}

              {/* MBTI */}

              {activeCardData.type === 'mbti' &&
                activeCardData.mbti && (
                  <div className="mt-12 border border-white/10 p-8 md:p-12">

                    <span className="text-[8px] tracking-[0.45em] text-red-800">
                      PERSONALITY TYPE
                    </span>

                    <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

                      <div>

                        <div className="text-[clamp(4rem,11vw,8rem)] font-light leading-none tracking-[-0.08em] text-white">
                          {activeCardData.mbti.type}
                        </div>

                        <div className="mt-4 text-[9px] tracking-[0.5em] text-white/30">
                          {activeCardData.mbti.title}
                        </div>

                      </div>

                      <p className="max-w-md text-xs leading-7 text-white/45">
                        {activeCardData.mbti.description}
                      </p>

                    </div>

                  </div>
                )}

              {/* LANGUAGES */}

              {activeCardData.type === 'languages' &&
                activeCardData.languages && (
                  <div className="mt-12 grid gap-10 md:grid-cols-2">

                    <div>
                      <span className="text-[8px] tracking-[0.4em] text-red-800">
                        CURRENTLY SPEAK
                      </span>

                      <div className="mt-6 border-t border-white/10">

                        {activeCardData.languages.current.map((item) => (
                          <div
                            key={item.language}
                            className="flex items-center justify-between border-b border-white/10 py-5"
                          >
                            <span className="text-sm tracking-[0.2em] text-white/75">
                              {item.language}
                            </span>

                            <span className="text-[8px] tracking-[0.3em] text-white/25">
                              {item.level}
                            </span>
                          </div>
                        ))}

                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] tracking-[0.4em] text-red-800">
                        CURRENTLY LEARNING
                      </span>

                      <div className="mt-6 border-t border-white/10">

                        {activeCardData.languages.learning.map((item) => (
                          <div
                            key={item.language}
                            className="border-b border-white/10 py-5 text-sm tracking-[0.2em] text-white/75"
                          >
                            {item.language}
                          </div>
                        ))}

                      </div>
                    </div>

                  </div>
                )}

              {/* CHARACTERS */}

              {activeCardData.type === 'characters' &&
                activeCardData.characters && (
                  <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">

                    {activeCardData.characters.map((character) => (
                      <div
                        key={character.name}
                        className="bg-black p-8 md:p-10"
                      >

                        <h3 className="text-lg tracking-[0.2em] text-white">
                          {character.name}
                        </h3>

                        <p className="mt-5 text-xs leading-7 text-white/45">
                          {character.description}
                        </p>

                      </div>
                    ))}

                  </div>
                )}

              {/* CELEBRITY */}

              {activeCardData.type === 'celebrity' &&
                activeCardData.celebrity && (
                  <div className="mt-12 border border-white/10 p-8 md:p-14">

                    <span className="text-[8px] tracking-[0.4em] text-red-800">
                      CELEBRITY CRUSH
                    </span>

                    <h3 className="mt-7 text-[clamp(3rem,9vw,7rem)] font-light leading-none tracking-[-0.05em] text-white">
                      {activeCardData.celebrity.name}
                    </h3>

                    <p className="mt-8 max-w-2xl text-sm leading-8 text-white/50">
                      {activeCardData.celebrity.description}
                    </p>

                  </div>
                )}

              {/* PERSONAL */}

              {activeCardData.type === 'personal' &&
                activeCardData.personal && (
                  <div className="mt-12 border-t border-white/10">

                    {activeCardData.personal.map((item) => (
                      <div
                        key={item.label}
                        className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-[190px_220px_1fr] md:items-start"
                      >

                        <span className="text-[8px] tracking-[0.3em] text-white/30">
                          {item.label}
                        </span>

                        <h3 className="text-sm tracking-[0.18em] text-white">
                          {item.value}
                        </h3>

                        <p className="text-xs leading-7 text-white/45">
                          {item.description}
                        </p>

                      </div>
                    ))}

                  </div>
                )}

            </div>

            {/* MODAL FOOTER */}

            <div className="flex shrink-0 items-center justify-between border-t border-white/10 px-6 py-4 md:px-10">

              <span className="text-[7px] tracking-[0.4em] text-white/20">
                LILITH'S PERSONAL ARCHIVE
              </span>

              <button
                onClick={() => setActiveCard(null)}
                className="text-[8px] tracking-[0.35em] text-white/35 transition-colors hover:text-white"
              >
                {isRTL ? 'إغلاق الملف' : 'CLOSE FILE'}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}