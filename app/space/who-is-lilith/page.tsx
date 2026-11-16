
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
    subtitle1: "مصاصة دماء",
    subtitle2: "حورية بحر",
    tagline: "اكتشف عوالم الكينونة الكونية",

    introTitle: "ليليث",
    introP1: "اسم ليليث بالنسبة إليّ يتجاوز كونه مجرد لقب اخترته. إنه اسم يمثّل جانباً من هويتي، ويعكس شخصيتي، وذوقي الجمالي، وطاقتي، وما يجذبني في الحياة، والطريقة التي أنظر بها إلى العالم من حولي.",
    introP2: "والغريب أن هذا الاسم ظل يرافقني منذ طفولتي، وكأن بيني وبينه صلة لم أكن أفهمها آنذاك، ولم أدرك سبب انجذابي إليه إلا مع مرور الوقت.",
    introP3: "أفضل الاحتفاظ باسمي الحقيقي لنفسي، أما ليليث فهي الهوية التي اخترت أن أظهر بها للعالم. ليس لأنها تحلّ محل هويتي الحقيقية، بل لأنها تعبّر عن جانب مني أشعر بأنه الأقرب إلى ذاتي.",
    introP4: "أنا في أواخر العشرينيات من عمري، جزائرية من أصول تركية، وأعيش حالياً في الجزائر. لكن العمر والجنسية والأصول لا تتجاوز كونها جوانب خارجية من هويتي؛ فما يثير فضولي حقاً هو ما يكمن وراءها.",

    journeyTitle: "ما وراء السطح",
    journeyP1: "تتمحور رحلتي حول السعي إلى الاتحاد بذاتي العليا. ولا أقصد بذلك بلوغ الكمال أو الانفصال عن التجربة الإنسانية، بل التعمّق في معرفة نفسي بكل جوانبها، حتى تلك التي رفضتها سابقاً، أو خشيت مواجهتها، أو أسأت فهمها، أو حاولت إخفاءها.",
    journeyP2: "كانت رحلتي بحثاً عن التوازن بين الأضداد التي تجتمع داخلي: النور والظلام، اليِن واليانغ، الروح والمادة، القلب والعقل، الحدس والمنطق، القوة والهشاشة، الخلق والهدم، التقبّل والتحوّل.",
    journeyP3: "لا أرى أن وجود أحد الجانبين يستلزم إلغاء الآخر. بل أؤمن بأن النضج الحقيقي يكمن في فهم كليهما وإدراك طبيعة العلاقة بينهما. فالنور وحده لا يمنحني كل الإجابات، وكذلك الظلام. إنما أجد طريق التكامل في فهم ما يحمله كل منهما.",
    journeyP4: "ومن هنا اتجه اهتمامي نحو عمل الظل، والتعافي، ومراجعة الذات، والتكامل الداخلي. لا أريد الاكتفاء بتغطية جراحي، بل فهم جذورها. ولا أريد إنكار ظلي أو الهروب منه، بل مواجهته وفهم ما يكشفه عني.",

    shadowTitle: "الظل والجراح والانبعاث من جديد",
    shadowP1: "يرتبط مساري الروحي ارتباطاً وثيقاً بعمل الظل؛ ذلك الجانب من النفس الذي قد نخفيه حتى عن أنفسنا. ويشمل المخاوف، والجراح، والتناقضات، والمشاعر المكبوتة، ومواطن انعدام الأمان، والأنماط اللاواعية التي تؤثر في اختياراتنا وسلوكنا دون أن ننتبه إليها.",
    shadowP2: "لا أدعو إلى تمجيد الظلام أو تحويل المعاناة إلى شيء رومانسي، بل إلى الوعي به وفهمه. فما نرفض مواجهته لا يختفي بالضرورة؛ بل قد يظل حاضراً في حياتنا، ويوجّه أفكارنا وتصرفاتنا من وراء وعينا.",
    shadowP3: "مررت بمراحل شعرت فيها وكأنني احترقت بالكامل. لكنني عدت، ولم أعد الشخص نفسه. عدت أحمل رماد النسخة التي كنتها ذات يوم، وصنعت من ذلك الرماد بداية جديدة.",
    shadowP4: "هذا هو معنى الانبعاث من جديد بالنسبة إليّ: ليس محو الماضي، ولا التظاهر بأن النار لم تشتعل يوماً، بل إدراك ما بقي منا بعد أن خمدت النيران، وما يمكن أن نبنيه انطلاقاً منه.",

    alchemyTitle: "الخيمياء والرواقية",
    alchemyP1: "هناك فكرتان تنسجمان بعمق مع رؤيتي للتحوّل: الخيمياء والرواقية. أرى في الخيمياء استعارة للتحوّل؛ أي القدرة على إعادة تشكيل معنى ما يبدو مكسوراً أو مؤلماً أو عادياً، وتحويله إلى معرفة ووعي وقيمة.",
    alchemyP2: "أما الرواقية فتذكّرني بأهمية الانضباط، والسيادة على الذات، والتقبّل، وتوجيه طاقتي نحو ما أملك القدرة على التأثير فيه. وتمثل الفكرتان معاً مبادئ أسعى إلى تطبيقها باستمرار: أن أتغيّر دون أن أفقد ذاتي، وأن أتقبّل دون أن أستسلم، وأن أشعر دون أن تبتلعني مشاعري، وأن أعيد بناء نفسي دون أن أنسى جذوري.",

    academicTitle: "مساري الأكاديمي والمهني",
    academicP1: "قد تبدو اهتماماتي متباعدة للوهلة الأولى، لكن ثمة خيطاً يربط بينها جميعاً: رغبتي في فهم الإنسان، وفهم الأنظمة التي تشكّل عالمنا.",
    academicP2: "حصلت على شهادة البكالوريا في شعبة تقني رياضي، تخصص هندسة مدنية، ثم أكملت دراستي الجامعية ونلت شهادة الماجستير في اللسانيات الإنجليزية. وإلى جانب مساري الأكاديمي، توسعت في دراسة علم النفس بصورة مستقلة، بما في ذلك علم النفس غير السوي وعلم النفس المظلم، فضلاً عن تطوير الويب والتكنولوجيا.",
    academicP3: "أعمل حالياً على توسيع معرفتي في البرمجة والأمن السيبراني، واضعةً نصب عيني هدفاً مهنياً بعيد المدى: أن أصبح مهندسة في الروبوتات والأنظمة الذاتية، متخصصة في استكشاف البيئات القصوى.",
    academicP4: "أطمح إلى المساهمة في تطوير أنظمة روبوتية ذاتية قادرة على استكشاف البيئات التي يصعب على الإنسان بلوغها، أو التي تنطوي على مخاطر كبيرة، سواء على الأرض أو في أماكن أبعد منها مستقبلاً.",

    nowTitle: "ما أفعله الآن",
    nowP1: "يُعدّ التعليم أحد أكثر المسارات ثباتاً في حياتي. أعمل مدرّسة للغة الإنجليزية وأستاذة جامعية، إلى جانب عملي في مؤسسات التعليم الخاص والعمل الحر. ولدي ما يقارب أربع سنوات من الخبرة في التدريس ضمن قطاعات تعليمية مختلفة.",
    nowP2: "يمنحني التعليم فرصة للجمع بين اللغة والتواصل والإبداع وفهم الإنسان. وفي الوقت نفسه، أواصل العمل على بناء مستقبلي في مجالات التكنولوجيا والبرمجة والأمن السيبراني والروبوتات.",

    interestsTitle: "عوالم متعددة تثير اهتمامي",
    interestsP1: "لم أستطع يوماً حصر فضولي في مجال واحد. فما يجمع اهتماماتي ليس تخصصاً بعينه، بل رغبة مستمرة في اكتشاف ما وراء الظواهر، وفهم ما لا يظهر للعين من الوهلة الأولى.",

    aestheticTitle: "ذوقي الجمالي",
    aestheticP1: "يميل ذوقي إلى الأساليب البديلة، لكنه لا يلتزم بقالب واحد. أجد نفسي بين الـNu-Goth والـTraditional Goth والطابع القوطي، وأحياناً بعض عناصر الـBoho.",
    aestheticP2: "تجذبني الألوان السوداء والزرقاء العميقة، والعتمة الكونية، والكسوف، والقمر، والعناصر العتيقة، والعمارة القوطية، وحوريات البحر، ومصاصو الدماء، والأفاعي، والظلال، والرموز القديمة.",
    aestheticP3: "أحب العتمة حين تحمل طابعاً أنيقاً وغامضاً وذا معنى، لا حين تتحول إلى مبالغة بصرية. فالظلام في نظري ليس مرادفاً للشر أو السلبية؛ قد يكون ببساطة الحيّز الذي تنكشف فيه الأشياء الخفية.",

    animalsTitle: "حيوانات تحمل رمزيتي",
    animalsP1: "أرى في هذه الحيوانات رموزاً وأرشيتيبات تعبّر عن صفات ومعانٍ أجد صداها في شخصيتي ورحلتي.",

    cosmicTitle: "خريطتي الفلكية",
    cosmicP1: "وفقاً للخريطة الفلكية المعتمدة لديّ:",

    languagesTitle: "اللغات",
    languagesP1: "أتحدث العربية والإنجليزية والفرنسية، وأتعلم حالياً اليابانية والألمانية والإيطالية.",
    languagesP2: "تستهويني اللغات لأن كل لغة تحمل رؤية خاصة للعالم، وإيقاعاً مميزاً، وطريقة مختلفة في صياغة الأفكار والتعبير عن الواقع.",

    charactersTitle: "شخصيات وأجواء أجد نفسي منجذبة إليها",
    charactersP1: "تستوقفني بعض الشخصيات الخيالية لما تحمله من رمزية وتعقيد نفسي وحضور مميز. تثير شخصيتا Makima وEsdeath اهتمامي من ناحية البناء الرمزي والنماذج التي تجسدانها. كما أستمتع باستكشاف الشخصيات المركبة والمظلمة نفسياً، مثل Effy Stonem وHannibal Lecter.",
    charactersP2: "أما من ناحية الحضور الجمالي وأجواء المشاهير، فتلفتني Megan Fox بشكل خاص، وهي بالفعل الـCelebrity Crush الخاصة بي. وهذه الشخصيات والمراجع تعبّر عن أذواقي واهتماماتي، ولا تعني أنني أرى نفسي نسخة مطابقة لأي منها.",

    personalTitle: "جانب شخصي من قصتي",
    personalP1: "أعرّف نفسي بأنني Aroace، أي لا رومانسية ولا جنسية. كما أنني أعيش تجارب مرتبطة باضطراب الشخصية الحدّية ونمط التعلّق التجنّبي، وقد تركت هذه التجارب أثرها في بعض جوانب رحلتي، لا سيما ما يتعلق بالحدود العاطفية والعلاقات وفهم الذات والتعافي.",
    personalP2: "ومع ذلك، أرفض اختزال نفسي في تشخيص أو تصنيف أو مرحلة صعبة مررت بها. ما واجهته جزء من قصتي، لكنه لا يختصر هويتي ولا يحدد كل ما أنا عليه.",

    buildTitle: "ما أطمح إلى بنائه",
    buildP1: "في نهاية المطاف، تعود كل الطرق إلى شيء واحد: الإبداع والخلق. لا أريد أن تنتهي رحلتي عند حدود فهم نفسي فحسب. أريد أن أبتكر، وأتعلّم، وأبني، وأستكشف، وأعلّم، وأكتب، وأصمّم، وأجرّب، وأن أجد الروابط بين عوالم قد تبدو للوهلة الأولى بلا صلة.",
    buildP2: "أطمح إلى الجمع بين الإنسان والتكنولوجيا، وعلم النفس والفلسفة، والغموض والعلم، والأرض والكون. قد تتغير تفاصيل طريقي مع مرور الوقت، لكن وجهتي تظل واضحة: أن أزداد وعياً وقدرةً ومعرفةً، وأن أكون أكثر نفعاً، وأن أترك وراءي شيئاً يتجاوز حدود تجربتي الشخصية ويسهم، ولو بقدر بسيط، في إثراء الإنسانية.",

    whyTitle: "وأخيراً — لماذا ليليث؟",
    whyP1: "لأن ليليث ليست مجرد صورة جمالية أو اسم مستعار، بل رمز لرحلة كاملة؛ من التشتّت إلى التكامل، ومن الخوف إلى الفهم، ومن الجراح إلى التعافي، ومن الأنماط اللاواعية إلى الوعي، ومن الهدم إلى إعادة البناء، ومن العتمة إلى الحكمة الكامنة فيها.",
    whyP2: "وربما الأهم من ذلك كله، هو الانتقال من البحث عن الإجابات في الخارج إلى تعلّم العودة إلى الذات والإنصات إليها.",
    whyP3: "كنتُ في مراحل مختلفة نسخاً متعددة من نفسي. أحببت بعضها، وتجاوزت بعضها، واضطررت إلى ترك بعضها خلفي. هناك نسخ حطّمتني، وأخرى أنقذتني، وأخرى ما زلت أكتشفها حتى اليوم.",
    whyP4: "رحلتي لا تقوم على الاختيار بين النور والظلام، بل على تعلّم احتواء كليهما. ليست معركة بين القلب والعقل، بل تعلّم الإصغاء إليهما معاً. وليست صراعاً بين الروح والمادة، بل فهماً لمكانة الروح داخل الوجود. وليست مواجهة بين النور والظلام، بل إدراك لما يكشفه كل منهما. لا أريد تدمير ظلي، بل مواجهته وفهمه. ولا أريد أن أصبح شخصاً آخر، بل أن أكون أكثر اكتمالاً في ذاتي.",
    whyFinal: "أنا ليليث. ما زلت أتعلم، وأتعافى، وأتساءل، وأتحوّل، وأواصل اكتشاف ذاتي.",
    whyFinalP: "وربما هذا هو المعنى الذي حمله اسم ليليث بالنسبة إليّ دائماً: ليست هوية وصلت إلى صورتها النهائية، بل رحلة تحوّل لا تتوقف.",
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
        <div className="absolute bottom-[10%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-siren/15 blur-[120px] animate-slow-drift" style={{ animationDelay: '-15s' }} />

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
          
          {/* INTRO */}
          <section className="text-center space-y-6">
            <h2 className="font-display text-3xl md:text-4xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.introTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.introP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.introP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.introP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.introP4}</p>
          </section>

          {/* JOURNEY */}
          <section className="space-y-6 border-l-2 border-sovereign/40 pl-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.journeyTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.journeyP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.journeyP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.journeyP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.journeyP4}</p>
          </section>

          {/* SHADOW */}
          <section className="space-y-6 border-l-2 border-blood/50 pl-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.shadowTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.shadowP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.shadowP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.shadowP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.shadowP4}</p>
          </section>

          {/* ALCHEMY */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.alchemyTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.alchemyP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.alchemyP2}</p>
          </section>

          {/* ACADEMIC */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.academicTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.academicP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP2}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP3}</p>
            <p className="text-silver/80 leading-relaxed">{t.academicP4}</p>
          </section>

          {/* NOW */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.nowTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.nowP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.nowP2}</p>
          </section>

          {/* INTERESTS */}
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

          {/* AESTHETIC */}
          <section className="space-y-6 border border-silver/20 rounded-lg p-8 bg-obsidian/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blood/15 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.aestheticTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP1}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP2}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.aestheticP3}</p>
          </section>

          {/* ANIMALS */}
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

          {/* COSMIC BLUEPRINT */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.cosmicTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.cosmicP1}</p>
            <div className="border border-silver/20 rounded-lg overflow-hidden bg-obsidian/50 backdrop-blur-sm max-w-md mx-auto mt-6">
              {[
                { sign: 'Rising', value: 'Leo' },
                { sign: 'Sun', value: 'Taurus' },
                { sign: 'Moon', value: 'Libra' },
                { sign: 'Venus', value: 'Gemini' },
                { sign: 'Mercury', value: 'Aries' },
                { sign: 'Mars', value: 'Scorpio' },
                { sign: 'Lilith', value: 'Scorpio' },
                { sign: 'Personality', value: 'INTJ-T' }
              ].map((item, i, arr) => (
                <div key={item.sign} className={`flex items-center justify-between px-6 py-4 ${i !== arr.length - 1 ? 'border-b border-silver/10' : ''}`}>
                  <span className="text-silver/60 text-[10px] tracking-[0.3em] uppercase">{item.sign}</span>
                  <span className="font-display text-lg text-sovereign drop-shadow-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* LANGUAGES */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.languagesTitle}</h2>
            <p className="text-silver/80 leading-relaxed text-center">{t.languagesP1}</p>
            <p className="text-silver/80 leading-relaxed text-center">{t.languagesP2}</p>
          </section>

          {/* CHARACTERS */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 text-center drop-shadow-md">{t.charactersTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.charactersP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.charactersP2}</p>
          </section>

          {/* PERSONAL */}
          <section className="space-y-6 border border-silver/20 rounded-lg p-8 bg-obsidian/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-siren/15 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.personalTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.personalP1}</p>
            <p className="text-silver/80 leading-relaxed font-medium text-white">{t.personalP2}</p>
          </section>

          {/* BUILD */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl md:text-3xl tracking-[0.1em] text-white mb-6 drop-shadow-md">{t.buildTitle}</h2>
            <p className="text-silver/80 leading-relaxed">{t.buildP1}</p>
            <p className="text-silver/80 leading-relaxed">{t.buildP2}</p>
          </section>

          {/* WHY LILITH */}
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
