'use client'

import { useState } from 'react'
import Link from 'next/link'

// --- TRANSLATIONS ---
const CONTENT = {
  en: {
    back: "← Back to Eclipse",
    symbol: "⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆",
    title: "LILITH",
    subtitle1: "VAMPIRE",
    subtitle2: "SIREN",
    tagline: "Explore the cosmic being",
    introTitle: "LILITH",
    introP1: "There is much more behind the name Lilith than a simple nickname. Lilith is the name I chose to represent a part of me. It reflects my personality, my aesthetic, my energy, the things I am drawn to, and the way I perceive the world.",
    introP2: "In some strange way, the name has been haunting me since I was a child — long before I understood why I felt so drawn to it.",
    introP3: "I prefer to keep my real name private. Lilith is the identity I share with the world. Not because it replaces who I am, but because it expresses a part of me that feels deeply authentic.",
    introP4: "I am in my late twenties, Algerian, currently living in Algeria, with Turkish ancestry. But nationality, age and background are only the outer layers. What interests me is everything underneath.",
    journeyTitle: "THE JOURNEY BENEATH THE SURFACE",
    journeyP1: "At the heart of my journey is a search for union with my Higher Self. For me, this does not mean becoming perfect or escaping the human experience. It means learning to know every part of myself — including the parts I once rejected, feared, misunderstood or tried to hide.",
    journeyP2: "My journey has been about finding balance between the poles within me: light and darkness, Yin and Yang, soul and material existence, heart and mind, intuition and reason, strength and vulnerability, creation and destruction, acceptance and transformation.",
    journeyP3: "I do not believe that one side must destroy the other. I believe there is wisdom in learning how to hold both. The light cannot teach me everything. Neither can the darkness. It is in understanding the relationship between them that I find wholeness.",
    journeyP4: "That is why my path has led me towards shadow work, healing, self-examination and inner integration. I want to understand my wounds rather than simply cover them. I want to face my shadow rather than pretend it does not exist.",
    shadowTitle: "SHADOW, WOUNDS & REBIRTH",
    shadowP1: "My spiritual path is deeply connected to shadow work. I am interested in the parts of ourselves that we hide from ourselves — the fears, wounds, contradictions, suppressed emotions, insecurities and unconscious patterns that quietly shape the way we live.",
    shadowP2: "My message is not that we should romanticise darkness. It is that we should become conscious of it. Because what we refuse to face does not necessarily disappear. Sometimes it simply continues to influence us from somewhere we cannot see.",
    shadowP3: "There were moments when I felt as though I had been completely burned down. But I returned. Not as the person I had been. I returned carrying the ashes of who I once was — and built something new from them.",
    shadowP4: "That is what rebirth means to me. Not erasing the past. Not pretending that the fire never happened. But becoming conscious of what survived it.",
    alchemyTitle: "ALCHEMY & STOICISM",
    alchemyP1: "Two ideas deeply resonate with the way I see transformation: alchemy and Stoicism. Alchemy, to me, is a metaphor for transformation — taking what appears broken, painful or ordinary and transforming its meaning into something conscious and valuable.",
    alchemyP2: "Stoicism reminds me of the importance of discipline, inner sovereignty, acceptance and focusing my energy on what I can actually shape. Together, they represent something I continually work towards: transforming without losing myself, accepting without surrendering, feeling without being consumed, and rebuilding without forgetting where I came from.",
    academicTitle: "MY ACADEMIC & PROFESSIONAL PATH",
    academicP1: "My interests may seem scattered at first glance, but there is a thread connecting them: I want to understand both humanity and the systems that shape our world.",
    academicP2: "I obtained a Baccalaureate in Technical Mathematics, specialising in Civil Engineering, and later completed a Master's degree in English Linguistics. Alongside my formal education, I have independently explored psychology, including abnormal psychology and dark psychology, as well as web development and technology.",
    academicP3: "I am currently developing my knowledge of programming and cybersecurity, with a long-term goal of becoming a: Robotics & Autonomous Systems Engineer — Extreme Environment Exploration.",
    academicP4: "I want to work towards creating autonomous robotic systems capable of exploring environments that are difficult, dangerous or inaccessible to humans — including extreme environments on Earth and, eventually, beyond it.",
    nowTitle: "WHAT I DO NOW",
    nowP1: "Teaching has been one of the most consistent parts of my life. I work as an English teacher and university instructor, as well as in private education and freelance work. I have almost four years of teaching experience across different educational sectors.",
    nowP2: "Teaching allows me to combine language, communication, creativity and human understanding. At the same time, I am continuing to build my future in technology, programming, cybersecurity and robotics.",
    interestsTitle: "THE MANY WORLDS THAT INTEREST ME",
    interestsP1: "I have never been able to fit my curiosity into one category. What connects these interests is not a single subject. It is curiosity about what lies beneath the obvious.",
    aestheticTitle: "MY AESTHETIC",
    aestheticP1: "My aesthetic is alternative, but it refuses to stay inside one box. I move between nu-goth, traditional goth, gothic, and sometimes boho.",
    aestheticP2: "I am drawn to black, deep blue, cosmic darkness, eclipses, the moon, vintage elements, gothic architecture, sirens, vampires, snakes, shadows and ancient symbolism.",
    aestheticP3: "I like darkness when it feels elegant, mysterious and meaningful, rather than exaggerated. For me, darkness is not automatically something negative. Sometimes it is simply where the hidden becomes visible.",
    animalsTitle: "MY SYMBOLIC ANIMALS",
    animalsP1: "I see these animals as personal symbols and archetypes, representing qualities and themes that resonate with my journey.",
    cosmicTitle: "MY COSMIC BLUEPRINT",
    cosmicP1: "According to the birth-chart system I follow:",
    languagesTitle: "MY LANGUAGES",
    languagesP1: "I speak: Arabic • English • French. And I am currently learning: Japanese • German • Italian.",
    languagesP2: "Languages fascinate me because every language carries its own worldview, rhythm and way of expressing reality.",
    charactersTitle: "THE CHARACTERS & ENERGY I RESONATE WITH",
    charactersP1: "Some fictional characters fascinate me because of their symbolism, complexity or presence. Makima and Esdeath are characters whose fictional archetypes I find compelling. Effy Stonem and Hannibal Lecter also represent the kind of psychologically complex and darker fictional characters that I enjoy exploring.",
    charactersP2: "As for celebrity energy and aesthetic presence, Megan Fox is someone whose look and presence I find particularly captivating — and yes, she is my celebrity crush. These are fictional and aesthetic references that resonate with me; they do not mean that I consider myself identical to these characters.",
    personalTitle: "A PERSONAL PART OF MY STORY",
    personalP1: "I identify as aroace — aromantic and asexual. I also live with experiences related to BPD and avoidant attachment, and these experiences have influenced parts of my journey with emotional boundaries, relationships, self-understanding and healing.",
    personalP2: "But I refuse to reduce myself to any diagnosis, label or difficult chapter. My struggles are part of my story. They are not the entirety of who I am.",
    buildTitle: "WHAT I WANT TO BUILD",
    buildP1: "Everything eventually comes back to one thing: creation. I don't want my journey to end with simply understanding myself. I want to create. To learn. To build. To explore. To teach. To write. To design. To experiment. To connect seemingly unrelated worlds.",
    buildP2: "I want to bring together the human and the technological, the psychological and the philosophical, the mysterious and the scientific, the Earth and the cosmos. Perhaps my path will change along the way. But the direction remains the same: to become more conscious, more capable, and more useful — and eventually build something that can exist beyond me and contribute something meaningful to humanity.",
    whyTitle: "AND FINALLY — WHY LILITH?",
    whyP1: "Because Lilith is not merely an aesthetic. She is a symbol of a journey. A journey from fragmentation towards integration. From fear towards understanding. From wounds towards healing. From unconscious patterns towards awareness. From destruction towards reconstruction. From darkness towards the wisdom hidden within it.",
    whyP2: "And perhaps most importantly: from searching outside myself for the answer, to learning how to return to myself.",
    whyP3: "I have been many versions of myself. Some I loved. Some I outgrew. Some I had to leave behind. Some broke me. Some saved me. And some are still being discovered.",
    whyP4: "My journey is not about choosing between the light and the dark. It is about learning to hold both. Not heart against mind, but heart with mind. Not soul against matter, but soul within existence. Not darkness against light, but understanding the purpose of both. Not destroying the shadow, but meeting it. Not becoming someone else, but becoming more fully myself.",
    whyFinal: "I am Lilith. I am still learning. Still healing. Still questioning. Still transforming. Still becoming.",
    whyFinalP: "And perhaps that is what Lilith has always meant to me: not a finished identity, but an ongoing transformation.",
  },
  ar: {
    back: "← العودة إلى الكسوف",
    symbol: "⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆",
    title: "ليليث",
    subtitle1: "مصاصة الدماء",
    subtitle2: "حورية البحر",
    tagline: "استكشفي الكينونة الكونية",
    introTitle: "ليليث",
    introP1: "هناك الكثير وراء اسم ليليث أكثر من كونه مجرد لقب. ليليث هو الاسم الذي اخترته ليعبّر عن جزء مني. فهو يعكس شخصيتي، وذوقي الجمالي، وطاقتي، والأشياء التي أنجذب إليها، والطريقة التي أرى بها العالم.",
    introP2: "وبطريقة غامضة ما، ظل هذا الاسم يطاردني منذ طفولتي، قبل وقت طويل من أن أفهم سبب شعوري بهذا الانجذاب نحوه.",
    introP3: "أفضل أن أبقي اسمي الحقيقي خاصاً. ليليث هي الهوية التي أشاركها مع العالم. ليس لأنها تحل محل من أكون، بل لأنها تعبّر عن جانب مني أشعر بأنه صادق وعميق وأصيل.",
    introP4: "أنا في أواخر العشرينيات من عمري، جزائرية أعيش حالياً في الجزائر، ولدي أصول تركية. لكن العمر والجنسية والخلفية ليست سوى الطبقات الخارجية. أما ما يثير اهتمامي حقاً فهو كل ما يكمن تحت السطح.",
    journeyTitle: "الرحلة التي تكمن تحت السطح",
    journeyP1: "في قلب رحلتي يوجد بحث عن الاتحاد بذاتي العليا. وبالنسبة إليّ، لا يعني ذلك أن أصبح كاملة أو أن أهرب من التجربة الإنسانية. بل يعني أن أتعلم معرفة كل جزء مني؛ بما في ذلك الأجزاء التي رفضتها أو خفت منها أو أسأت فهمها أو حاولت إخفاءها في الماضي.",
    journeyP2: "كانت رحلتي تتمحور حول إيجاد التوازن بين الأقطاب الموجودة داخلي: النور والظلام، اليِن واليانغ، الروح والوجود المادي، القلب والعقل، الحدس والمنطق، القوة والهشاشة، الخلق والهدم، التقبّل والتحوّل.",
    journeyP3: "لا أؤمن بأن على أحد الجانبين أن يدمر الآخر. بل أؤمن بأن الحكمة تكمن في تعلّم كيفية احتواء الاثنين معاً. فالنور وحده لا يستطيع أن يعلّمني كل شيء. والظلام كذلك. إن فهم العلاقة بينهما هو ما يقودني نحو التكامل.",
    journeyP4: "ولهذا قادتني رحلتي نحو عمل الظل، والشفاء، والتأمل في الذات، والتكامل الداخلي. أريد أن أفهم جراحي بدلاً من أن أكتفي بتغطيتها. أريد أن أواجه ظلي بدلاً من التظاهر بأنه غير موجود.",
    shadowTitle: "الظل والجراح والولادة من جديد",
    shadowP1: "يرتبط مساري الروحي ارتباطاً عميقاً بعمل الظل. أنا مهتمة بالأجزاء التي نخفيها حتى عن أنفسنا؛ المخاوف، والجراح، والتناقضات، والمشاعر المكبوتة، وحالات عدم الأمان، والأنماط اللاواعية التي تشكّل حياتنا بصمت.",
    shadowP2: "رسالتي ليست أن نمجّد الظلام. بل أن نصبح واعين به. لأن ما نرفض مواجهته لا يختفي بالضرورة. وأحياناً يستمر ببساطة في التأثير فينا من مكان لا نستطيع رؤيته.",
    shadowP3: "كانت هناك مراحل شعرت فيها وكأنني احترقت بالكامل. لكنني عدت. ولم أعد كما كنت. عدت حاملة رماد من كنتها ذات يوم، وبنيت من ذلك الرماد شيئاً جديداً.",
    shadowP4: "وهذا هو معنى الولادة الجديدة بالنسبة إليّ. ليست محو الماضي. وليست التظاهر بأن النار لم تحدث. بل أن أصبح واعية بما نجا منها.",
    alchemyTitle: "الخيمياء والرواقية",
    alchemyP1: "هناك فكرتان تنسجمان بعمق مع الطريقة التي أنظر بها إلى التحوّل: الخيمياء والرواقية. الخيمياء بالنسبة إليّ هي استعارة للتحوّل؛ أن آخذ ما يبدو مكسوراً أو مؤلماً أو عادياً، وأحوّل معناه إلى شيء واعٍ وذي قيمة.",
    alchemyP2: "أما الرواقية فتذكّرني بأهمية الانضباط، والسيادة الداخلية، والتقبّل، وتوجيه طاقتي نحو ما أستطيع فعلاً التأثير فيه. ومعاً، تمثلان شيئاً أعمل باستمرار على الوصول إليه: أن أتحوّل دون أن أفقد نفسي، وأن أتقبّل دون أن أستسلم، وأن أشعر دون أن أُستهلك، وأن أعيد بناء نفسي دون أن أنسى من أين أتيت.",
    academicTitle: "مساري الأكاديمي والمهني",
    academicP1: "قد تبدو اهتماماتي متفرقة للوهلة الأولى، لكن هناك خيطاً يربط بينها: أريد أن أفهم الإنسان والأنظمة التي تشكّل عالمنا معاً.",
    academicP2: "حصلت على شهادة البكالوريا في شعبة تقني رياضي، تخصص هندسة مدنية، ثم أكملت درجة الماجستير في اللسانيات الإنجليزية. وبالتوازي مع تعليمي الأكاديمي، درست بشكل مستقل مجالات في علم النفس، بما في ذلك علم النفس غير السوي وبعض جوانب علم النفس المظلم، إلى جانب تطوير الويب والتكنولوجيا.",
    academicP3: "وأعمل حالياً على تطوير معرفتي في البرمجة والأمن السيبراني، مع هدف طويل المدى يتمثل في أن أصبح: مهندسة أنظمة الروبوتات والأنظمة الذاتية — متخصصة في استكشاف البيئات القصوى.",
    academicP4: "أريد أن أعمل على تطوير أنظمة روبوتية ذاتية قادرة على استكشاف البيئات الصعبة أو الخطرة أو التي يصعب على البشر الوصول إليها، بما في ذلك البيئات القصوى على الأرض، وربما خارجها مستقبلاً.",
    nowTitle: "ما أفعله الآن",
    nowP1: "كان التعليم أحد أكثر الجوانب استمرارية في حياتي. أعمل مدرّسة للغة الإنجليزية وأستاذة جامعية، كما أعمل في التعليم الخاص والعمل الحر. لدي ما يقارب أربع سنوات من الخبرة في التدريس عبر قطاعات تعليمية مختلفة.",
    nowP2: "يسمح لي التعليم بالجمع بين اللغة، والتواصل، والإبداع، وفهم الإنسان. وفي الوقت نفسه، أواصل بناء مستقبلي في التكنولوجيا، والبرمجة، والأمن السيبراني، والروبوتات.",
    interestsTitle: "العوالم الكثيرة التي تثير اهتمامي",
    interestsP1: "لم أستطع يوماً أن أحصر فضولي في مجال واحد. ما يجمع كل هذه الاهتمامات ليس موضوعاً واحداً. بل هو فضولي تجاه ما يكمن خلف الأشياء الظاهرة.",
    aestheticTitle: "جماليّتي",
    aestheticP1: "جماليّتي بديلة، لكنها لا تحب أن تبقى داخل قالب واحد. أتنقل بين الـNu-Goth، والـTraditional Goth، والقوثيك، وأحياناً الـBoho.",
    aestheticP2: "أنجذب إلى الأسود، والأزرق العميق، والظلام الكوني، والكسوف، والقمر، والعناصر العتيقة، والعمارة القوطية، وحوريات البحر، ومصاصي الدماء، والأفاعي، والظلال، والرموز القديمة.",
    aestheticP3: "أحب الظلام عندما يكون أنيقاً وغامضاً وذا معنى، وليس مبالغاً فيه. وبالنسبة إليّ، لا يعني الظلام بالضرورة شيئاً سلبياً. فأحياناً يكون الظلام ببساطة هو المكان الذي تصبح فيه الأشياء المخفية مرئية.",
    animalsTitle: "حيواناتي الرمزية",
    animalsP1: "أرى هذه الحيوانات بوصفها رموزاً وأرشيتيبات شخصية تعبّر عن صفات وموضوعات تتناغم مع رحلتي.",
    cosmicTitle: "مخططي الكوني",
    cosmicP1: "وفقاً لنظام الخريطة الفلكية الذي أتبعه:",
    languagesTitle: "لغاتي",
    languagesP1: "أتحدث: العربية • الإنجليزية • الفرنسية. وأتعلم حالياً: اليابانية • الألمانية • الإيطالية.",
    languagesP2: "تثير اللغات اهتمامي لأن لكل لغة رؤيتها الخاصة للعالم، وإيقاعها، وطريقتها في التعبير عن الواقع.",
    charactersTitle: "الشخصيات والطاقة التي أجد صدى لها",
    charactersP1: "هناك شخصيات خيالية تثير اهتمامي بسبب رمزيتها، وتعقيدها، وحضورها. تجذبني الشخصيتان Makima وEsdeath من ناحية الأرشيتيبات الخيالية التي تمثلانها. كما تمثل Effy Stonem وHannibal Lecter نوعاً من الشخصيات الخيالية المعقدة نفسياً والمظلمة التي أحب استكشافها.",
    charactersP2: "أما من ناحية طاقة المشاهير وحضورهم الجمالي، فإن Megan Fox من الشخصيات التي أجد مظهرها وحضورها لافتين جداً — ونعم، هي الـCelebrity Crush الخاصة بي. وهذه مجرد مراجع خيالية وجمالية تتناغم معي، ولا تعني أنني أعتبر نفسي مطابقة لهذه الشخصيات.",
    personalTitle: "جانب شخصي من قصتي",
    personalP1: "أعرّف نفسي بأنني Aroace — لا رومانسية ولا جنسية. كما أنني أعيش تجارب مرتبطة بـ اضطراب الشخصية الحدّية والتعلّق التجنّبي، وقد أثرت هذه التجارب في بعض جوانب رحلتي مع الحدود العاطفية، والعلاقات، وفهم الذات، والشفاء.",
    personalP2: "لكنني أرفض اختزال نفسي في تشخيص أو تصنيف أو فصل صعب من حياتي. صعوباتي جزء من قصتي. لكنها ليست كل ما أنا عليه.",
    buildTitle: "ما أريد أن أبنيه",
    buildP1: "في النهاية، يعود كل شيء إلى شيء واحد: الخَلْق. لا أريد أن تنتهي رحلتي بمجرد فهم نفسي. أريد أن أخلق. أن أتعلّم. أن أبني. أن أستكشف. أن أعلّم. أن أكتب. أن أصمّم. أن أجرّب. وأن أربط بين عوالم قد تبدو منفصلة عن بعضها.",
    buildP2: "أريد أن أجمع بين الإنسان والتكنولوجيا، وعلم النفس والفلسفة، والغموض والعلم، والأرض والكون. قد تتغير طريقي وتفاصيلها مع مرور الوقت. لكن الاتجاه يبقى واحداً: أن أصبح أكثر وعياً، وأكثر قدرة، وأكثر نفعاً، وأن أبني في النهاية شيئاً يتجاوز وجودي الشخصي ويضيف شيئاً ذا معنى إلى الإنسانية.",
    whyTitle: "وأخيراً — لماذا ليليث؟",
    whyP1: "لأن ليليث ليست مجرد جمالية. إنها رمز لرحلة. رحلة من التشتّت نحو التكامل. ومن الخوف نحو الفهم. ومن الجراح نحو الشفاء. ومن الأنماط اللاواعية نحو الوعي. ومن الهدم نحو إعادة البناء. ومن الظلام نحو الحكمة الكامنة فيه.",
    whyP2: "وربما الأهم من كل ذلك: أن أنتقل من البحث عن الإجابة خارج ذاتي، إلى تعلّم كيفية العودة إلى نفسي.",
    whyP3: "لقد كنت نسخاً كثيرة من نفسي. بعضها أحببته. وبعضها تجاوزته. وبعضها اضطررت إلى تركه خلفي. وبعضها كسرني. وبعضها أنقذني. وبعضها ما زلت أكتشفه.",
    whyP4: "رحلتي ليست في اختيار النور على حساب الظلام، أو الظلام على حساب النور. بل في تعلّم كيفية احتوائهما معاً. ليس القلب في مواجهة العقل، بل القلب مع العقل. وليست الروح في مواجهة المادة، بل الروح داخل الوجود. وليس الظلام في مواجهة النور، بل فهم الحكمة التي يمكن أن يحملها كل منهما. وليس تدمير الظل، بل مواجهته. وليس أن أصبح شخصاً آخر، بل أن أصبح أكثر اكتمالاً في كينونتي.",
    whyFinal: "أنا ليليث. ما زلت أتعلم. وما زلت أتعافى. وما زلت أطرح الأسئلة. وما زلت أتحوّل. وما زلت في طور التشكّل.",
    whyFinalP: "وربما هذا هو المعنى الحقيقي لليليث بالنسبة إليّ: ليست هوية مكتملة، بل تحوّل مستمر.",
  }
}

export default function WhoIsLilithPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const t = CONTENT[lang];
  const isRTL = lang === 'ar';

  return (
    <div className={`relative min-h-screen text-white font-nav selection:bg-blood/30 selection:text-white ${isRTL ? 'font-arabic' : ''}`}>
      
      {/* --- BACKGROUND VIDEO & ANIMATION LAYER --- */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-obsidian pointer-events-none">
        {/* The Video — mobile autoplay compatible */}
        <video
          ref={(el) => {
            if (!el) return
            el.muted = true
            el.defaultMuted = true
            el.volume = 0
            el.setAttribute('muted', '')
            el.setAttribute('playsinline', '')
            el.setAttribute('webkit-playsinline', 'true')
            const tryPlay = () => {
              const p = el.play()
              if (p && typeof p.catch === 'function') {
                p.catch(() => {
                  setTimeout(() => el.play().catch(() => {}), 300)
                  setTimeout(() => el.play().catch(() => {}), 1200)
                })
              }
            }
            tryPlay()
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-ignore
          webkit-playsinline="true"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{
            pointerEvents: 'none',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
        >
          <source src="/lilith-bg.mp4" type="video/mp4" />
          <source src="/lilith-bg.webm" type="video/webm" />
        </video>

        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian/80" />
        
        {/* Subtle Crimson & Blue Atmospheric Fog */}
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blood/10 blur-[150px] animate-slow-drift" />
        <div className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-siren/15 blur-[120px] animate-slow-drift" style={{ animationDelay: '-15s' }} />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => {
          const isCrimson = i % 7 === 0;
          const size = Math.random() * 2 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 15;
          const duration = Math.random() * 20 + 15;
          return (
            <div
              key={i}
              className={`absolute rounded-full animate-float-particle ${isCrimson ? "bg-blood/50" : "bg-silver/30"}`}
              style={{
                width: `${size}px`, height: `${size}px`, left: `${left}%`, top: `${top}%`,
                animationDelay: `${delay}s`, animationDuration: `${duration}s`,
                boxShadow: isCrimson ? '0 0 4px rgba(92,10,18,0.6)' : '0 0 6px rgba(170,183,200,0.4)'
              }}
            />
          );
        })}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className={`relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Top Navigation */}
        <div className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center">
          <Link 
            href="/space" 
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-silver/80 hover:text-sovereign transition-colors bg-obsidian/80 backdrop-blur-md px-4 py-2 rounded-full border border-silver/20 hover:border-sovereign/60"
          >
            {t.back}
          </Link>
          
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
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
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mt-4">
            <span className="font-display text-sm md:text-base tracking-[0.4em] text-blood/90 uppercase drop-shadow-md">{t.subtitle1}</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-silver/50" />
            <span className="font-display text-sm md:text-base tracking-[0.4em] text-siren uppercase drop-shadow-md">{t.subtitle2}</span>
          </div>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-silver/50 to-transparent mx-auto mt-12 mb-6" />
          <p className="text-silver/70 text-[10px] md:text-xs tracking-[0.4em] uppercase">{t.tagline}</p>
        </section>

        {/* CONTENT SECTIONS */}
        <div className="max-w-4xl mx-auto px-6 space-y-24 pb-32">
          
          <section className="text-center space-y-6">
            <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.introTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.introP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.introP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.introP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.introP4}</p>
          </section>

          <section className="space-y-6 border-l-2 border-sovereign/40 pl-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.journeyTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.journeyP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.journeyP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.journeyP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.journeyP4}</p>
          </section>

          <section className="space-y-6 border-l-2 border-blood/50 pl-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.shadowTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.shadowP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.shadowP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.shadowP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.shadowP4}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.alchemyTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.alchemyP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.alchemyP2}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.academicTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.academicP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP4}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.nowTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.nowP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.nowP2}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.interestsTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center max-w-2xl mx-auto">{t.interestsP1}</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mt-6">
              {['Shadow Work','Psychology','Forensic Psychology','Human Behaviour','Neuroscience','Philosophy','Astrology','Mythology','Astronomy','Spirituality','Tarot','Meditation','Dreams','Ancient Symbols','Cultures & Languages','Technology & AI','Art & Music','Storytelling','Body Language','Horror & True Crime','Gothic Aesthetics','Dark Academia','Cosmic Aesthetics','Moon Phases','Space','Fitness','Self-Development','Animals','Parallel-Universe Theories'].map((interest) => (
                <span key={interest} className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase text-silver/80 border border-silver/20 rounded-full hover:border-sovereign/60 hover:text-white hover:bg-obsidian/60 transition-all duration-300">
                  {interest}
                </span>
              ))}
            </div>
          </section>

          <section className="space-y-6 border border-silver/20 rounded-lg p-8 bg-obsidian/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blood/15 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.aestheticTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP1}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP2}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP3}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.animalsTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center max-w-2xl mx-auto">{t.animalsP1}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { emoji: '🐍', name: 'The Snake', title: 'Transformation', desc: 'The snake represents transformation, rebirth and hidden wisdom.' },
                { emoji: '🦉', name: 'The Owl', title: 'Insight', desc: 'The owl represents intuition, observation and seeing what others overlook.' },
                { emoji: '🐦‍⬛', name: 'The Raven', title: 'Shadow', desc: 'The raven represents mystery, the unconscious and transformation through darkness.' },
                { emoji: '🐆', name: 'The Black Jaguar', title: 'Protection', desc: 'The black jaguar represents strength, courage, protection and mastery of the shadow.' },
                { emoji: '🦅', name: 'The Eagle', title: 'Higher Perspective', desc: 'The eagle represents freedom, independence, vision and the ability to see the larger picture.' },
              ].map((animal, i) => (
                <div key={i} className="border border-silver/20 rounded-lg p-6 bg-obsidian/50 backdrop-blur-sm hover:border-sovereign/60 transition-all duration-500 group">
                  <div className="text-3xl mb-3">{animal.emoji}</div>
                  <p className="text-sovereign/80 text-[10px] tracking-[0.3em] uppercase mb-1 group-hover:text-sovereign transition-colors">{animal.title}</p>
                  <h4 className="font-display text-xl text-white mb-2">{animal.name}</h4>
                  <p className="text-silver/70 text-sm leading-relaxed">{animal.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.cosmicTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.cosmicP1}</p>
            <div className="border border-silver/20 rounded-lg overflow-hidden bg-obsidian/50 backdrop-blur-sm max-w-md mx-auto mt-6">
              {[
                { sign: 'Rising', value: 'Leo' }, { sign: 'Sun', value: 'Taurus' }, { sign: 'Moon', value: 'Virgo' },
                { sign: 'Venus', value: 'Gemini' }, { sign: 'Mercury', value: 'Aries' }, { sign: 'Mars', value: 'Scorpio' },
                { sign: 'Lilith', value: 'Scorpio' }, { sign: 'Personality', value: 'INTJ-T' }
              ].map((item, i, arr) => (
                <div key={item.sign} className={`flex items-center justify-between px-6 py-4 ${i !== arr.length - 1 ? 'border-b border-silver/10' : ''}`}>
                  <span className="text-silver/60 text-[10px] tracking-[0.3em] uppercase">{item.sign}</span>
                  <span className="font-display text-lg text-sovereign drop-shadow-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.languagesTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.languagesP1}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.languagesP2}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.charactersTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.charactersP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.charactersP2}</p>
          </section>

          <section className="space-y-6 border border-silver/20 rounded-lg p-8 bg-obsidian/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-siren/15 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.personalTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.personalP1}</p>
            <p className="text-silver/80 leading-relaxed font-medium text-white">{t.personalP2}</p>
          </section>

          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.buildTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.buildP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.buildP2}</p>
          </section>

          <section className="space-y-6 text-center border-t border-silver/20 pt-16">
            <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] text-white mb-8 drop-shadow-md">{t.whyTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.whyP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.whyP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.whyP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.whyP4}</p>
            <p className="font-display text-xl text-white italic mt-8 drop-shadow-md">{t.whyFinal}</p>
            <p className="text-silver/70 leading-relaxed italic">{t.whyFinalP}</p>
          </section>

        </div>
      </div>
    </div>
  )
}
