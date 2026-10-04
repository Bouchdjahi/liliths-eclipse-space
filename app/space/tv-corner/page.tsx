'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'YOUR_OMDB_API_KEY_HERE'

// --- POSTER SOURCE BUILDERS ---

// Cinemeta (Stremio) — most reliable free source, returns exact poster for IMDb ID.
const CINEMETA = (type: string, imdbId: string) => {
  const isSeries = /series|anime|cartoon|documentary|docu|tv|live action/i.test(type)
  return `https://v3-cinemeta.strem.io/meta/${isSeries ? 'series' : 'movie'}/${imdbId}.json`
}

// Metahub — direct image CDN (no API key). May 404 for obscure titles.
const METAHUB = (imdbId: string, size: 'small' | 'medium' | 'large' = 'medium') =>
  `https://images.metahub.space/poster/${size}/${imdbId}.jpg`

// IMDb suggestion — returns real poster URL by title/year.
const IMDB_SUGGEST = (query: string) =>
  `https://v3.sg.media-imdb.com/suggestion/x/${encodeURIComponent(query)}.json`

// TMDB public image proxy (poster path from search API — needs key), skip.
// Fallback: use a generic dark placeholder served as SVG data URI (handled in component).

// --- COMPLETE IMDb ID MAP ---
const IMDB_IDS: Record<string, string> = {
  'after': 'tt4126476', 'my-fault': 'tt21990998', 'ek-villain': 'tt3175038',
  'divergent': 'tt1840309', 'purple-hearts': 'tt4615250', 'hannibal': 'tt2243973',
  'you': 'tt7335184', 'the-vampire-diaries': 'tt1405406', 'the-originals': 'tt2632424',
  'twilight': 'tt1099212', 'from': 'tt9813792', 'the-conjuring': 'tt1457767',
  'scream': 'tt0117571', 'the-witch': 'tt4263482', 'the-addams-family': 'tt0101272',
  'halloween': 'tt0077651', 'the-craft': 'tt0115963', 'mr-robot': 'tt4158110',
  'split': 'tt4972582', 'the-queens-gambit': 'tt10048342', 'pearl': 'tt18925334',
  'dahmer': 'tt13207736', 'zodiac': 'tt0443706', 'night-stalker': 'tt13726458',
  'attack-on-titan': 'tt2560140', 'death-note': 'tt0877057', 'tokyo-ghoul': 'tt3741634',
  'courage-the-cowardly-dog': 'tt0220880', 'the-grim-adventures': 'tt0292800',
  'monster-high': 'tt1880418', 'ruby-gloom': 'tt0949784',
  'siyah-beyaz-ask': 'tt6692740', 'together': 'tt31193180', 'obsession': 'tt21377462',
  'halloween-kills': 'tt10665338', 'halloween-ends': 'tt10665342',
  'nightmare-on-elm-street': 'tt0087800', 'sleepy-hollow': 'tt0162661',
  'elvira-mistress': 'tt0095088', 'elvira-haunted-hills': 'tt0265173',
  'casper': 'tt0112642', 'hotel-transylvania-series': 'tt7628060',
  'growing-up-creepie': 'tt0837981', 'frankenstein-2025': 'tt1312221',
  'annabelle': 'tt3322940', 'the-nun': 'tt5814060', 'annabelle-creation': 'tt5140878',
  'human-centipede': 'tt1461399', 'final-destination': 'tt0195714',
  'jennifers-body': 'tt1131734', 'i-spit-on-your-grave': 'tt1242432',
  'last-house-left': 'tt0848557', 'devils-mouth': 'tt31278426',
  'get-out': 'tt5052448', 'the-purge': 'tt2184339', 'smile': 'tt15474916',
  'insidious': 'tt1591095', 'the-menu': 'tt9764362', 'knock-knock': 'tt3605418',
  'cabin-in-the-woods': 'tt1259521', 'the-descent': 'tt0435625',
  'the-watcher': 'tt14852808', 'bird-box': 'tt2737304', 'wrong-turn': 'tt0295700',
  'orphan': 'tt1148204', 'immaculate': 'tt23137390', 'the-strangers': 'tt0482606',
  'ouija': 'tt1204977', 'texas-chainsaw': 'tt0072271', 'the-ring': 'tt0298130',
  'the-boy': 'tt3882082', 'brahms-boy-ii': 'tt9173418', 'slender-man': 'tt5690360',
  'talk-to-me': 'tt10638522', 'look-away': 'tt5834854', 'the-collector': 'tt0844479',
  'queen-of-the-damned': 'tt0238546', 'resident-evil': 'tt0120804',
  'sweeney-todd': 'tt0408236', 'the-love-witch': 'tt3908142',
  'the-mentalist': 'tt1196946', 'skins': 'tt0840196', 'pretty-little-liars': 'tt1578873',
  'queen-gambit': 'tt10048342', 'aileen-wuornos-doc': 'tt1534763',
  'aileen-unmasking': 'tt1534763', 'ted-bundy-tapes': 'tt9611864',
  'ed-gein-story': 'tt30932784', 'akame-ga-kill': 'tt3742982', 'another': 'tt2176165',
  'banana-fish': 'tt8515016', 'berserk': 'tt0318871', 'black-lagoon': 'tt0962826',
  'bleach': 'tt0434665', 'chainsaw-man': 'tt13616990', 'classroom-elite': 'tt7266668',
  'demon-slayer': 'tt9335498', 'detective-conan': 'tt0131179',
  'hunter-x-hunter': 'tt2098220', 'jojos': 'tt2359704', 'jujutsu-kaisen': 'tt12343534',
  'monster-anime': 'tt0434706', 'moriarty-patriot': 'tt12896142', 'nana': 'tt1145424',
  'naruto': 'tt0409591', 'nier-automata': 'tt1375666', 'bunny-girl-senpai': 'tt8995726',
  'vanitas': 'tt13283500', 'atomic-betty': 'tt0424613', 'fosters': 'tt0419326',
  'kaze-no-shoujo-emily': 'tt0972720', 'winx-club': 'tt0423639',
  'addams-family-cartoon': 'tt0101272', 'hannah-montana': 'tt0493093',
  'victorious': 'tt1604092', 'breaking-bad': 'tt0903747', 'fast-furious': 'tt0232500',
  'john-wick': 'tt2911666', 'kill-bill': 'tt0266697', 'suicide-squad': 'tt1386697',
  'the-batman': 'tt1877830', 'doctor-strange': 'tt1211837', 'harry-potter': 'tt0241527',
  'lord-of-the-rings': 'tt0120737', 'the-matrix': 'tt0133093', 'maze-runner': 'tt1790864',
  'pirates-caribbean': 'tt0325980', 'the-sandman': 'tt1751634', 'supernatural': 'tt0460649',
  'teen-wolf': 'tt1586680', 'lucifer': 'tt4052886', 'venom': 'tt1270797',
  'castlevania': 'tt6517102', 'devil-wears-prada': 'tt0458352',
}

// --- ARABIC PERSONAL NOTES ---
const AR_NOTES: Record<string, string> = {
  'after': `يُعدّ فيلم After من القصص التي يسهل الخلط بينها وبين علاقة توأم الشعلة بسبب شدّة الارتباط بين الشخصيتين.\n\nيبدأ الانجذاب بينهما تقريبًا منذ اللحظة الأولى. شخصيتاهما مختلفتان اختلافًا جذريًا، وسرعان ما تصبح العلاقة معقدة عاطفيًا، مشتعلة، وغير مستقرة، وتتخللها مرارًا حالات من الفراق والمصالحة.\n\nلكن أكثر ما يثير اهتمامي هو ما يحدث لتيسا على امتداد القصة.\n\nفهي تبدأ فتاةً هادئة، قليلة الخبرة، ونشأت في بيئة محمية نسبيًا، ثم تصبح تدريجيًا أكثر ثقة واستقلالية وشجاعة، وأكثر استعدادًا لمواجهة جوانب من ذاتها كانت تخفيها سابقًا. أما هاردن فيمرّ هو الآخر بتطوره الخاص، ويبدأ بمواجهة مشاعر وجراح قضى جزءًا كبيرًا من حياته في تجنّبها.\n\nومع ذلك، فتطوّر الشخصيات وحده لا يجعل العلاقة علاقة توأم شعلة.\n\nما أراه هنا هو في المقام الأول ديناميكية نفسية وعاطفية قوية؛ فهما يستفزّان جراح بعضهما، ويتحدّيان حدود بعضهما، ويُجبر كلٌّ منهما الآخر على التغيّر.\n\nولهذا أضع After أقرب إلى العلاقة الكارمية منه إلى توأم الشعلة.`,
  'my-fault': `My Fault علاقة أخرى مبنية على الشدّة، والانجذاب المحظور، والصراع، والفراق، ثم اللقاء من جديد.\n\nيُدفع نوا ونيك مرارًا نحو بعضهما، بينما يصنعان في الوقت نفسه أسبابًا للابتعاد. فالعلاقة تُخرج من كليهما مكامن الشك وعدم الأمان، والجراح، والغضب، والرغبة، والهشاشة.\n\nكما تظهر بوضوح ديناميكية «الهارب والمطارد» على امتداد قصتهما.\n\nلكن هذه الديناميكية وحدها لا تجعلهما توأم شعلة.\n\nفالعلاقة في نظري تبقى نفسية وعاطفية في المقام الأول. إذ تتغيّر الشخصيتان بفعل ما تعيشانه معًا، لكنني لا أرى فيها الرحلة الروحية أو الطاقية الأعمق التي تجعلني أصنّفهما توأم شعلة.\n\nكما تتضمّن العلاقة سلوكيات تجعلها أكثر هدمًا وعدم استقرار بكثير من ذلك النوع من الارتباط الذي أربطه برحلة توأم الشعلة.`,
  'ek-villain': `فيلم Ek Villain له معنى شخصي عندي لأسباب لا علاقة لها بتصنيفه. فشخصية غورو تذكّرني بقوة بتوأمي، من مظهره وطباعه إلى أوجه شبه شخصية أخرى.\n\nلكن التماهي الشخصي لا يجعل الفيلم تلقائيًا قصة توأم شعلة.\n\nما يلفت انتباهي هنا هو التحوّل الذي يحدث من خلال العلاقة.\n\nفلا أرى أن غورو وعائشة يعكسان ظلال بعضهما بوضوح بالطريقة نفسها التي نراها في بعض العلاقات الأكثر قتامة في هذه القائمة. بل إن العلاقة تكشف الجراح الموجودة أصلًا داخل الشخصيتين.\n\nتمثّل عائشة جانبًا أكثر اتزانًا وإشراقًا، بينما يحمل غورو قدرًا أكبر بكثير من العتمة والألم غير المحلول.\n\nومن خلال ارتباطهما، يبدأ غورو بمواجهة الجانب المظلم من نفسه ويتغيّر تدريجيًا.\n\nولهذا السبب أضعه أقرب إلى الظل منه إلى توأم الشعلة، مع أنني أعدّه مثالًا أخفّ حدّة ضمن هذه الفئة.`,
  'divergent': `تبدأ علاقة تريس وفور بالتوتر والاختلاف وديناميكية «من الأعداء إلى العشاق»، لكنها تتطوّر بصورة مختلفة تمامًا عن العلاقات الهدّامة المذكورة أعلاه.\n\nفهما يواجهان الخطر معًا مرارًا.\n\nويتحدّى كلٌّ منهما الآخر دون أن يحطّمه باستمرار.\n\nوالأهم من ذلك كله وجود إحساس قوي بالدعم المتبادل.\n\nفلا أرى أن أحدهما يستغلّ جراح الآخر مرارًا أو يجرّه إلى دوّامة لا تنتهي من الدمار العاطفي.\n\nبل تصبح علاقتهما شيئًا يساعد كليهما على أن يغدو أقوى.\n\nواختلافاتهما لا تمنع في النهاية الارتباط بينهما، بل يكمّل أحدهما الآخر.\n\nولهذا أرى أن Divergent أقرب بكثير إلى علاقة رفقة الأرواح.`,
  'purple-hearts': `يبدأ Purple Hearts في ظروف غير معتادة، بين شخصين يبدوان غير متوافقين، وتختلف قيمهما وخلفياتهما ونظرتهما إلى الأمور اختلافًا كبيرًا في البداية.\n\nلكن ما يجعل علاقتهما مثيرة للاهتمام هو التحوّل التدريجي في طبيعة الارتباط بينهما.\n\nيبدآن بسوء الفهم المتبادل، ثم يتعلّمان شيئًا فشيئًا أن يريا ما وراء تلك الاختلافات.\n\nوبدلًا من أن يستفزّ كلٌّ منهما جراح الآخر ويكرّرا أنماطًا هدّامة، يبدآن بالفهم والدعم والتأثير الإيجابي في بعضهما.\n\nوتتحوّل العلاقة تدريجيًا إلى مصدر للنمو لا للدمار.\n\nولهذا أضع Purple Hearts أقرب إلى رفقة الأرواح منه إلى الكارمية أو الظل.`,
  'hannibal': `هذه واحدة من أشدّ العلاقات قتامة وأكثرها إثارة للاهتمام من الناحية النفسية في القائمة.\n\nلا أرى ويل وهانيبال توأم شعلة.\n\nفارتباطهما مكثّف، وحميمي، وهوسي، وقائم على التلاعب، وله أثر تحويلي عميق، لكن هذا التحوّل يأتي عبر العتمة والتلاعب النفسي والانكشاف والمواجهة.\n\nيرى ويل في هانيبال ما يشبه شبحًا يلاحقه.\n\nأما هانيبال فينشغل بويل لأنه يرى فيه شيئًا لا يراه الآخرون.\n\nيتلاعب كلٌّ منهما بالآخر.\n\nويكشف كلٌّ منهما الآخر.\n\nويؤذي كلٌّ منهما الآخر.\n\nوينتقم كلٌّ منهما من الآخر.\n\nوالأهم من ذلك أنهما يكشفان ظلال بعضهما.\n\nفتصبح العلاقة مرآة نفسية لا يستطيع فيها أيٌّ منهما أن يبقى مستترًا تمامًا.\n\nومما يجعلها مثيرة للاهتمام بوجه خاص أن شدّة ارتباطهما لا تعتمد على الحميمية الجسدية، فالرابط النفسي نفسه هو الذي يقود القصة.\n\nولهذا أرى أن Hannibal من أوضح الأمثلة على علاقة الظل المظلمة.`,
  'you': `لن أضع جو ولاف ضمن توأم الشعلة.\n\nفعلاقتهما تتحدد بقوة أكبر بالهوس، والإسقاط، والتملّك، والسيطرة، والعنف، والتعلّق الهدّام.\n\nفجو لا يقع في حب النساء كما هنّ في الحقيقة، بل يبني في ذهنه نسخة مثالية منهنّ، ويلاحق تلك الصورة، ويتحرّى عنهنّ ويراقبهنّ، ثم يحاول تدريجيًا امتلاك العلاقة.\n\nولاف شخصية مثيرة للاهتمام بوجه خاص، لأنها تكشف في النهاية أنها قادرة على أن تعكس بعضًا من ظلام جو نفسه.\n\nفي البداية ينبهر بها جو.\n\nلكن حين يدرك أنها ليست المثال البريء الذي تخيّله، وأنها قد تكون هوسية وعنيفة مثله تمامًا، تتغيّر نظرته إليها كليًا.\n\nوهكذا تصبح العلاقة أبعد عن الاتحاد الروحي، وأقرب إلى الإسقاط ومواجهة الأنماط الهدّامة للذات.\n\nكما تُظهر لاف تعلّقًا مفرطًا وخوفًا من فقدان العلاقة، بينما يعود جو مرارًا إلى الدورة نفسها مع امرأة أخرى حين يخبو هوسه.\n\nلذلك أرى أن مكانها في «ركن المسلسلات» كمثال على علاقة نفسية هدّامة، لا كعلاقة توأم شعلة.`,
  'the-vampire-diaries': `إيلينا وداميون علاقة أخرى يسهل تفسيرها على أنها توأم شعلة بسبب شدّة الارتباط الذي ينشأ بينهما.\n\nلكن، مرة أخرى، الشدّة وحدها لا تكفي.\n\nفإيلينا تتغيّر تغيّرًا هائلًا على مدار المسلسل.\n\nوتطوّر شخصيتها لا يمكن إنكاره، وداميون أيضًا يتغيّر بفضل علاقته بها.\n\nلكنني أرى أن هذا التحوّل مرتبط في المقام الأول بتجارب نفسية وعاطفية وعلائقية، لا بالرحلة الروحية المحددة التي أربطها بتوأم الشعلة.\n\nفعلاقتهما تحمل انجذابًا شديدًا، وصراعًا، وألمًا، وخيارات صعبة، واضطرابًا عاطفيًا متكررًا.\n\nلذلك أصنّف إيلينا وداميون علاقة كارمية.\n\nأما إيلينا وستيفان فيبدوان لي مختلفين جوهريًا؛ فارتباطهما مبني بقوة أكبر على التعارف الروحي، والفهم العاطفي، والدعم، والرفقة. وحتى حين تصبح الظروف صعبة، يبقى هناك إحساس بأنهما يفهمان بعضهما ويحميان بعضهما بدلًا من أن يجرّ كلٌّ منهما الآخر باستمرار إلى دوّامات هدّامة. ولهذا أراهما رفيقي روح.`,
  'the-originals': `علاقة كلاوس وكارولين من العلاقات التي تجعل الناس يقولون فورًا: «إنهما توأم شعلة».\n\nالكيمياء بينهما لا يمكن إنكارها.\n\nوالانجذاب شديد.\n\nفكارولين تبلغ أجزاءً من كلاوس لا يبلغها إلا قلّة قليلة.\n\nوكلاوس بدوره يرى في كارولين شيئًا استثنائيًا.\n\nلكن، مرة أخرى، لا أعتمد الكيمياء نظامًا للتصنيف.\n\nفعلاقتهما تتضمن الشوق، والفراق، ومشكلات التوقيت، والتوتر العاطفي، وإحساسًا قويًا بشيء لا يستقر تمامًا أبدًا في حالة من الاستقرار العادي.\n\nولذلك أضعهما أقرب إلى العلاقة الكارمية.\n\nأما كارولين وستيفان فيمثّلان شيئًا مختلفًا جدًا. فارتباطهما يتطوّر تدريجيًا، وهناك إحساس قوي بالفهم العاطفي والرفقة. يساعد كلٌّ منهما الآخر على النمو دون أن يحتاجا إلى تحطيم بعضهما أولًا. ولهذا أرى علاقتهما أقرب بكثير إلى رفقة الأرواح.`,
  'twilight': `لا أعدّ بيلا وإدوارد توأم شعلة.\n\nفارتباطهما قوي وتحويلي ومحوري في حياة كليهما، لكن هذا وحده لا يستوفي معاييري.\n\nتتغيّر بيلا تغيّرًا هائلًا على امتداد القصة.\n\nوإدوارد أيضًا عليه أن يواجه جوانب من نفسه كبتها سنوات: طبيعته، ورغباته، وخوفه من إيذاء بيلا، والصراع بين ما هو عليه وما يريد أن يصبحه.\n\nولذلك تبدو لي علاقتهما أقرب إلى ديناميكية الظل.\n\nفكلٌّ منهما يضع الآخر وجهًا لوجه أمام جوانب من ذاته كانت مخفية من قبل.\n\nومع أنني لن أسمّيها مثالًا كاملًا على علاقة الظل، فإنني أجدها أقرب بكثير إلى الظل منها إلى توأم الشعلة.`,
  'from': `جيد وتابيثا مثيران للاهتمام بوجه خاص لأن قصتهما تتجاوز حياتيهما الحاليتين.\n\nفارتباطهما مرتبط بقصة وُجدت قبل هويتيهما الحاليتين، قصة بقيت غير مكتملة ويبدو أنها تتكرّر عبر التجسّدات.\n\nوهذا بالضبط هو سبب عدم تسميتي لهما توأم شعلة.\n\nفوجود ارتباطات من حيوات سابقة، وتجسّدات متكررة، وذكريات، وقصص غير مكتملة، وغاية متكررة، لا يعني تلقائيًا أن العلاقة توأم شعلة.\n\nوهي عندي أقرب بكثير إلى علاقة كارمية أو ارتباط من حيوات سابقة.\n\nهناك شيء غير مكتمل.\n\nشيء يستمر.\n\nشيء يعود.\n\nوتصبح النسخ الحالية من هاتين الشخصيتين جزءًا من قصة أقدم بكثير.`,
  'siyah-beyaz-ask': `هذا من أقوى أمثلة الظل لديّ.\n\nفالعنوان نفسه يعطينا التناقض المحوري: الأسود والأبيض.\n\nتعيش أصلي في عالم الطب والشفاء وإنقاذ الأرواح.\n\nأما فرهاد فيعيش في عالم العنف والجريمة والظلام.\n\nيبدآن بالعداء والمقاومة لا بانجذاب رومانسي سهل.\n\nومع ذلك، فهذا بالضبط ما يجعل علاقتهما آسرة.\n\nفأصلي تُجبَر على مواجهة الجوانب المظلمة من نفسها التي لم تكن بحاجة إلى مواجهتها من قبل.\n\nوفرهاد بدوره يُجبَر على مواجهة الإنسانية والحنان والهشاشة العاطفية التي دفنها تحت سنوات من العنف والدفاعات النفسية.\n\nفهما لا يقعان في الحب فحسب.\n\nبل يكشف كلٌّ منهما الآخر.\n\nولهذا أعدّ هذه العلاقة علاقة ظل لا توأم شعلة.\n\nفلا أرى فيها المسار الروحي أو الطاقي الذي أشترطه لتصنيف توأم الشعلة.\n\nبل أرى شخصين يقفان على طرفي نقيض، ويُجبر كلٌّ منهما الآخر على مواجهة ما يوجد في الجهة المقابلة.`,
  'together': `فيلم Together مختلف.\n\nفلن أصنّف العلاقة فيه على أنها توأم شعلة، ولا كارمية، ولا ظل، ولا رفقة أرواح.\n\nما أسرني في الفيلم هو رمزيّته.\n\nهناك لحظات يصبح فيها الفصل بين الشخصيتين شبه مستحيل جسديًا، فيتولّد إحساس مزعج بأن شيئًا جوهريًا قد انتُزع منهما حين يفترقان.\n\nوقد ذكّرتني تلك الصور بأوصاف تُستخدم أحيانًا في النقاشات الروحية عن الفراق الشديد، أي الشعور بأن فقدان شخص آخر يترك فراغًا يكاد يكون جسديًا.\n\nلكنني لا أفسّر ذلك على أن الفيلم يصوّر علاقة توأم شعلة.\n\nفهو بالنسبة لي مجرد تمثيل رمزي قوي للتعلّق، والارتباط، والفراق، والهوية، والخوف من فقدان الآخر.\n\nلذلك مكانه في «ركن المسلسلات» كمرجع روحي رمزي، لا ضمن فئات العلاقات.`,
}

// --- ARCHIVE DATA ---
const ARCHIVE_DATA: any[] = [
  { id: 'after', title: 'After', year: 2019, type: 'Movie', genres: ['Drama', 'Romance'], themes: ['Karmic', 'Obsession', 'Transformation', 'Trauma'], categories: ['spiritual-relationships'], description: 'Tessa x Hardin — Karmic Relationship', personalNote: 'After is one of those stories that can easily be mistaken for a Twin Flame relationship because of the intensity between the two characters.', labels: ['SPIRITUAL LENS'], imdbId: 'tt4126476' },
  { id: 'my-fault', title: 'My Fault', year: 2023, type: 'Movie', genres: ['Drama', 'Romance'], themes: ['Karmic', 'Obsession', 'Trauma'], categories: ['spiritual-relationships'], description: 'Noah x Nick — Karmic Relationship', personalNote: 'My Fault is another relationship built around intensity, forbidden attraction, conflict, separation, and reunion.', labels: ['SPIRITUAL LENS'], imdbId: 'tt21990998' },
  { id: 'ek-villain', title: 'Ek Villain', year: 2014, type: 'Movie', genres: ['Action', 'Drama', 'Romance'], themes: ['Shadow', 'Transformation', 'Wounds'], categories: ['spiritual-relationships'], description: 'Guru x Aisha — Shadow Elements', personalNote: 'Ek Villain is personally meaningful to me for reasons that have nothing to do with its classification.', labels: ['SPIRITUAL LENS'], imdbId: 'tt3175038' },
  { id: 'divergent', title: 'Divergent', year: 2014, type: 'Movie', genres: ['Action', 'Adventure', 'Sci-Fi'], themes: ['Soulmate', 'Identity', 'Freedom'], categories: ['spiritual-relationships'], description: 'Tris x Four — Soulmates', personalNote: 'Tris and Four begin with tension, differences, and an Enemies to Lovers dynamic.', labels: ['SPIRITUAL LENS'], imdbId: 'tt1840309' },
  { id: 'purple-hearts', title: 'Purple Hearts', year: 2022, type: 'Movie', genres: ['Drama', 'Romance', 'Music'], themes: ['Soulmate', 'Transformation', 'Love'], categories: ['spiritual-relationships'], description: 'Cassie x Luke — Soulmates', personalNote: 'Purple Hearts begins under unusual circumstances, with two people who appear incompatible.', labels: ['SPIRITUAL LENS'], imdbId: 'tt4615250' },
  { id: 'hannibal', title: 'Hannibal', year: 2013, type: 'Series', genres: ['Psychological', 'Crime', 'Thriller', 'Drama'], themes: ['Shadow', 'Manipulation', 'Obsession', 'Identity', 'Transformation', 'Morality'], categories: ['spiritual-relationships', 'psychological'], description: 'Will Graham x Hannibal Lecter — Shadow Relationship', personalNote: 'This is one of the darkest and most psychologically fascinating relationships on the list.', labels: ['LILITHS PICK', 'PSYCHOLOGICAL FAVORITE', 'SPIRITUAL LENS'], imdbId: 'tt2243973' },
  { id: 'you', title: 'You', year: 2018, type: 'Series', genres: ['Psychological', 'Thriller', 'Drama', 'Crime'], themes: ['Obsession', 'Manipulation', 'Control', 'Identity'], categories: ['spiritual-relationships', 'psychological'], description: 'Joe x Love — Obsession and Destructive Attachment', personalNote: 'Joe and Love relationship is defined by obsession, projection, possession, control, violence, and destructive attachment.', labels: ['DARK FAVORITE', 'SPIRITUAL LENS'], imdbId: 'tt7335184' },
  { id: 'the-vampire-diaries', title: 'The Vampire Diaries', year: 2009, type: 'Series', genres: ['Drama', 'Fantasy', 'Horror', 'Romance'], themes: ['Love', 'Karmic', 'Soulmate', 'Transformation', 'Identity'], categories: ['spiritual-relationships', 'halloween-vault'], description: 'Elena x Damon — Karmic / Elena x Stefan — Soulmates', personalNote: 'Elena and Damon are another relationship that can easily be interpreted as a Twin Flame because of how intense their connection becomes.', labels: ['SPIRITUAL LENS'], imdbId: 'tt1405406' },
  { id: 'the-originals', title: 'The Originals', year: 2013, type: 'Series', genres: ['Drama', 'Fantasy', 'Horror', 'Romance'], themes: ['Karmic', 'Soulmate', 'Transformation'], categories: ['spiritual-relationships', 'halloween-vault'], description: 'Klaus x Caroline — Karmic / Caroline x Stefan — Soulmates', personalNote: 'Klaus and Caroline have one of those relationships that can easily make people immediately say Twin Flames.', labels: ['SPIRITUAL LENS'], imdbId: 'tt2632424' },
  { id: 'twilight', title: 'Twilight', year: 2008, type: 'Movie', genres: ['Drama', 'Fantasy', 'Romance'], themes: ['Shadow', 'Transformation', 'Identity'], categories: ['spiritual-relationships', 'halloween-vault'], description: 'Bella x Edward — Shadow Relationship', personalNote: 'I do not consider Bella and Edward Twin Flames.', labels: ['SPIRITUAL LENS'], imdbId: 'tt1099212' },
  { id: 'from', title: 'FROM', year: 2022, type: 'Series', genres: ['Horror', 'Mystery', 'Sci-Fi'], themes: ['Karmic', 'Past-Life', 'Transformation'], categories: ['spiritual-relationships', 'halloween-vault'], description: 'Jade x Tabitha — Karmic / Past-Life Connection', personalNote: 'Jade and Tabitha are particularly interesting because their story goes beyond their present lives.', labels: ['SPIRITUAL LENS'], imdbId: 'tt9813792' },
  { id: 'the-conjuring', title: 'The Conjuring', year: 2013, type: 'Movie', genres: ['Horror', 'Thriller', 'Mystery'], themes: ['Fear', 'Supernatural', 'Trauma'], categories: ['halloween-vault'], description: 'A classic modern horror.', personalNote: 'A staple in the Halloween Vault.', labels: ['DARK FAVORITE'], imdbId: 'tt1457767' },
  { id: 'scream', title: 'Scream', year: 1996, type: 'Movie', genres: ['Horror', 'Mystery', 'Thriller'], themes: ['Revenge', 'Identity', 'Fear'], categories: ['halloween-vault'], description: 'The meta-slasher that changed the genre forever.', labels: ['CHILDHOOD FAVORITE'], imdbId: 'tt0117571' },
  { id: 'the-witch', title: 'The Witch', year: 2015, type: 'Movie', genres: ['Horror', 'Drama', 'Mystery'], themes: ['Fear', 'Family', 'Supernatural', 'Identity'], categories: ['halloween-vault'], description: 'A slow-burn folk horror masterpiece.', labels: ['DARK FAVORITE'], imdbId: 'tt4263482' },
  { id: 'the-addams-family', title: 'The Addams Family', year: 1991, type: 'Movie', genres: ['Comedy', 'Fantasy', 'Gothic'], themes: ['Family', 'Identity', 'Morality'], categories: ['halloween-vault'], description: 'The original gothic family.', labels: ['CHILDHOOD FAVORITE'], imdbId: 'tt0101272' },
  { id: 'halloween', title: 'Halloween', year: 1978, type: 'Movie', genres: ['Horror', 'Thriller'], themes: ['Fear', 'Evil'], categories: ['halloween-vault'], description: 'The original slasher that started it all.', labels: ['LILITHS PICK'], imdbId: 'tt0077651' },
  { id: 'the-craft', title: 'The Craft', year: 1996, type: 'Movie', genres: ['Horror', 'Fantasy', 'Drama'], themes: ['Power', 'Identity', 'Friendship'], categories: ['halloween-vault'], description: 'A cult classic about teenage witches.', labels: ['DARK FAVORITE'], imdbId: 'tt0115963' },
  { id: 'mr-robot', title: 'Mr. Robot', year: 2015, type: 'Series', genres: ['Psychological', 'Thriller', 'Drama', 'Crime'], themes: ['Identity', 'Madness', 'Control', 'Trauma', 'Morality'], categories: ['psychological'], description: 'A mind-bending journey into identity, mental health, and the systems that control us.', personalNote: 'The psychological depth and the exploration of the mind are unparalleled.', labels: ['PSYCHOLOGICAL FAVORITE'], imdbId: 'tt4158110' },
  { id: 'split', title: 'Split', year: 2016, type: 'Movie', genres: ['Psychological', 'Thriller', 'Horror'], themes: ['Identity', 'Madness', 'Trauma'], categories: ['psychological'], description: 'A thrilling exploration of dissociative identity disorder.', labels: ['PSYCHOLOGICAL FAVORITE'], imdbId: 'tt4972582' },
  { id: 'the-queens-gambit', title: 'The Queens Gambit', year: 2020, type: 'Series', genres: ['Psychological', 'Drama'], themes: ['Obsession', 'Identity', 'Madness'], categories: ['psychological'], description: 'A story of genius, addiction, and the cost of brilliance.', labels: ['PSYCHOLOGICAL FAVORITE'], imdbId: 'tt10048342' },
  { id: 'pearl', title: 'Pearl', year: 2022, type: 'Movie', genres: ['Psychological', 'Horror', 'Drama'], themes: ['Madness', 'Obsession', 'Identity'], categories: ['psychological', 'halloween-vault'], description: 'A terrifying character study of a woman consumed by her own darkness.', labels: ['DARK FAVORITE'], imdbId: 'tt18925334' },
  { id: 'dahmer', title: 'DAHMER Monster', year: 2022, type: 'Series', genres: ['Crime', 'Drama', 'Thriller', 'Biography'], themes: ['Trauma', 'Identity', 'Madness', 'Morality'], categories: ['true-crime'], description: 'A dramatized retelling of one of Americas most notorious serial killers.', labels: ['TO ANALYZE'], imdbId: 'tt13207736' },
  { id: 'zodiac', title: 'Zodiac', year: 2007, type: 'Movie', genres: ['Crime', 'Drama', 'Mystery', 'Thriller'], themes: ['Obsession', 'Madness', 'Identity'], categories: ['true-crime'], description: 'A chilling investigation into the notorious Zodiac killer.', labels: ['TO ANALYZE'], imdbId: 'tt0443706' },
  { id: 'night-stalker', title: 'Night Stalker', year: 2021, type: 'Documentary', genres: ['Crime', 'Documentary', 'Thriller'], themes: ['Fear', 'Madness'], categories: ['true-crime'], description: 'The terrifying true story of Richard Ramirez.', labels: ['DOCUMENTARY'], imdbId: 'tt13726458' },
  { id: 'attack-on-titan', title: 'Attack on Titan', year: 2013, type: 'Anime', genres: ['Action', 'Drama', 'Fantasy', 'Mystery'], themes: ['Shadow', 'Freedom', 'Morality', 'Transformation', 'Trauma'], categories: ['anime-cartoons'], description: 'A story about humanity, freedom, and the monsters we become.', labels: ['LILITHS PICK'], imdbId: 'tt2560140' },
  { id: 'death-note', title: 'Death Note', year: 2006, type: 'Anime', genres: ['Psychological', 'Thriller', 'Supernatural', 'Crime'], themes: ['Morality', 'Power', 'Identity', 'Shadow'], categories: ['anime-cartoons', 'psychological'], description: 'A cat-and-mouse game between genius and justice.', labels: ['PSYCHOLOGICAL FAVORITE'], imdbId: 'tt0877057' },
  { id: 'tokyo-ghoul', title: 'Tokyo Ghoul', year: 2014, type: 'Anime', genres: ['Action', 'Horror', 'Supernatural', 'Drama'], themes: ['Identity', 'Shadow', 'Transformation', 'Trauma'], categories: ['anime-cartoons'], description: 'A story of identity, humanity, and the monsters within us.', labels: ['DARK FAVORITE'], imdbId: 'tt3741634' },
  { id: 'courage-the-cowardly-dog', title: 'Courage the Cowardly Dog', year: 1999, type: 'Cartoon', genres: ['Horror', 'Comedy', 'Fantasy'], themes: ['Fear', 'Family', 'Identity'], categories: ['anime-cartoons', 'halloween-vault'], description: 'A childhood staple that was much darker than we realized.', labels: ['CHILDHOOD FAVORITE'], imdbId: 'tt0220880' },
  { id: 'the-grim-adventures', title: 'The Grim Adventures of Billy and Mandy', year: 2003, type: 'Cartoon', genres: ['Comedy', 'Fantasy', 'Horror'], themes: ['Death', 'Friendship', 'Identity'], categories: ['anime-cartoons', 'halloween-vault'], description: 'A childhood classic that embraced the macabre.', labels: ['CHILDHOOD FAVORITE'], imdbId: 'tt0292800' },
  { id: 'monster-high', title: 'Monster High', year: 2010, type: 'Cartoon', genres: ['Comedy', 'Fantasy', 'Gothic'], themes: ['Identity', 'Friendship', 'Family'], categories: ['anime-cartoons', 'halloween-vault'], description: 'The children of famous monsters navigate high school.', labels: ['CHILDHOOD FAVORITE'], imdbId: 'tt1880418' },
  { id: 'ruby-gloom', title: 'Ruby Gloom', year: 2006, type: 'Cartoon', genres: ['Comedy', 'Fantasy', 'Gothic'], themes: ['Friendship', 'Identity', 'Happiness'], categories: ['anime-cartoons', 'halloween-vault'], description: 'A gothic cartoon about finding happiness in darkness.', labels: ['CHILDHOOD FAVORITE'], imdbId: 'tt0949784' }
]

const PRIMARY_OVERRIDES: Record<string, string> = {
  'after': 'spiritual-relationships', 'my-fault': 'spiritual-relationships', 'ek-villain': 'spiritual-relationships',
  'divergent': 'spiritual-relationships', 'purple-hearts': 'spiritual-relationships', 'hannibal': 'spiritual-relationships',
  'you': 'spiritual-relationships', 'siyah-beyaz-ask': 'spiritual-relationships', 'the-vampire-diaries': 'spiritual-relationships',
  'the-originals': 'spiritual-relationships', 'twilight': 'spiritual-relationships', 'from': 'spiritual-relationships',
  'together': 'spiritual-relationships',
  'the-love-witch': 'halloween-vault', 'death-note': 'anime',
  'attack-on-titan': 'anime', 'tokyo-ghoul': 'anime',
  'courage-the-cowardly-dog': 'cartoons', 'the-grim-adventures': 'cartoons',
  'monster-high': 'cartoons', 'ruby-gloom': 'cartoons', 'pearl': 'psychological'
}

const getPrimaryCategory = (item: any) => {
  if (item.type === 'Anime') return 'anime'
  if (item.type === 'Cartoon') return 'cartoons'
  if (PRIMARY_OVERRIDES[item.id]) return PRIMARY_OVERRIDES[item.id]
  const raw = item.primaryCategory || item.categories?.[0]
  if (raw === 'anime-cartoons') return item.type === 'Anime' ? 'anime' : 'cartoons'
  return raw || 'other'
}

const EXTRA_ARCHIVE_DATA = [
  ['siyah-beyaz-ask','Siyah Beyaz Aşk — Black and White Love',2017,'Series','spiritual-relationships'],
  ['halloween-kills','Halloween Kills',2021,'Movie','halloween-vault'],['halloween-ends','Halloween Ends',2022,'Movie','halloween-vault'],['nightmare-on-elm-street','A Nightmare on Elm Street',1984,'Movie','halloween-vault'],['sleepy-hollow','Sleepy Hollow',1999,'Movie','halloween-vault'],['elvira-mistress','Elvira: Mistress of the Dark',1988,'Movie','halloween-vault'],['elvira-haunted-hills',"Elvira's Haunted Hills",2001,'Movie','halloween-vault'],['casper','Casper',1995,'Movie','halloween-vault'],['hotel-transylvania-series','Hotel Transylvania: The Series',2019,'Series','halloween-vault'],['growing-up-creepie','Growing Up Creepie',2006,'Cartoon','cartoons'],['frankenstein-2025','Frankenstein',2025,'Movie','halloween-vault'],
  ['annabelle','Annabelle',2014,'Movie','horror-thriller'],['the-conjuring','The Conjuring',2013,'Movie','horror-thriller'],['the-nun','The Nun',2018,'Movie','horror-thriller'],['annabelle-creation','Annabelle: Creation',2017,'Movie','horror-thriller'],['human-centipede','The Human Centipede',2009,'Movie','horror-thriller'],['final-destination','Final Destination',2000,'Movie','horror-thriller'],['jennifers-body',"Jennifer's Body",2009,'Movie','horror-thriller'],['i-spit-on-your-grave','I Spit on Your Grave',2010,'Movie','horror-thriller'],['last-house-left','The Last House on the Left',2009,'Movie','horror-thriller'],['devils-mouth',"The Devil's Mouth",2024,'Movie','horror-thriller'],['get-out','Get Out',2017,'Movie','horror-thriller'],['the-purge','The Purge',2013,'Movie','horror-thriller'],['smile','Smile',2022,'Movie','horror-thriller'],['insidious','Insidious',2010,'Movie','horror-thriller'],['the-menu','The Menu',2022,'Movie','horror-thriller'],['knock-knock','Knock Knock',2015,'Movie','horror-thriller'],['cabin-in-the-woods','The Cabin in the Woods',2011,'Movie','horror-thriller'],['the-descent','The Descent',2005,'Movie','horror-thriller'],['the-watcher','The Watcher',2022,'Movie','horror-thriller'],['bird-box','Bird Box',2018,'Movie','horror-thriller'],['wrong-turn','Wrong Turn',2003,'Movie','horror-thriller'],['orphan','Orphan',2009,'Movie','horror-thriller'],['immaculate','Immaculate',2024,'Movie','horror-thriller'],['the-strangers','The Strangers',2008,'Movie','horror-thriller'],['ouija','Ouija',2014,'Movie','horror-thriller'],['texas-chainsaw','The Texas Chain Saw Massacre',1974,'Movie','horror-thriller'],['the-ring','The Ring',2002,'Movie','horror-thriller'],['the-boy','The Boy',2016,'Movie','horror-thriller'],['brahms-boy-ii','Brahms: The Boy II',2020,'Movie','horror-thriller'],['slender-man','Slender Man',2018,'Movie','horror-thriller'],['talk-to-me','Talk to Me',2022,'Movie','horror-thriller'],['look-away','Look Away',2018,'Movie','horror-thriller'],['the-collector','The Collector',2009,'Movie','horror-thriller'],['queen-of-the-damned','Queen of the Damned',2002,'Movie','horror-thriller'],['resident-evil','Resident Evil',2002,'Movie','horror-thriller'],['sweeney-todd','Sweeney Todd',2007,'Movie','horror-thriller'],
  ['the-love-witch','The Love Witch',2016,'Movie','psychological'],['the-mentalist','The Mentalist',2008,'Series','psychological'],['skins','Skins',2007,'Series','psychological'],['pretty-little-liars','Pretty Little Liars',2010,'Series','psychological'],['queen-gambit',"The Queen's Gambit",2020,'Series','psychological'],
  ['aileen-wuornos-doc','Aileen Wuornos documentaries',2020,'Documentary','true-crime'],['aileen-unmasking','Aileen Wuornos: Unmasking a Monster',2020,'Documentary','true-crime'],['ted-bundy-tapes','Conversations with a Killer: The Ted Bundy Tapes',2019,'Documentary','true-crime'],['ed-gein-story','Monster: The Ed Gein Story',2025,'Series','true-crime'],
  ['akame-ga-kill','Akame ga Kill!',2014,'Anime','anime'],['another','Another',2012,'Anime','anime'],['banana-fish','Banana Fish',2018,'Anime','anime'],['berserk','Berserk',1997,'Anime','anime'],['black-lagoon','Black Lagoon',2006,'Anime','anime'],['bleach','Bleach',2004,'Anime','anime'],['chainsaw-man','Chainsaw Man',2022,'Anime','anime'],['classroom-elite','Classroom of the Elite',2017,'Anime','anime'],['demon-slayer','Demon Slayer',2019,'Anime','anime'],['detective-conan','Detective Conan',1996,'Anime','anime'],['hunter-x-hunter','Hunter × Hunter',2011,'Anime','anime'],['jojos',"JoJo's Bizarre Adventure",2012,'Anime','anime'],['jujutsu-kaisen','Jujutsu Kaisen',2020,'Anime','anime'],['monster-anime','Monster',2004,'Anime','anime'],['moriarty-patriot','Moriarty the Patriot',2020,'Anime','anime'],['nana','NANA',2006,'Anime','anime'],['naruto','Naruto',2002,'Anime','anime'],['nier-automata','NieR:Automata Ver1.1a',2023,'Anime','anime'],['bunny-girl-senpai','Rascal Does Not Dream of Bunny Girl Senpai',2018,'Anime','anime'],['vanitas','The Case Study of Vanitas',2021,'Anime','anime'],
  ['atomic-betty','Atomic Betty',2004,'Cartoon','cartoons'],['fosters',"Foster's Home for Imaginary Friends",2004,'Cartoon','cartoons'],['kaze-no-shoujo-emily','Kaze no Shoujo Emily',2007,'Cartoon','cartoons'],['winx-club','Winx Club',2004,'Cartoon','cartoons'],['addams-family-cartoon','The Addams Family',1992,'Cartoon','cartoons'],['hannah-montana','Hannah Montana',2006,'Live Action','other'],['victorious','Victorious',2010,'Live Action','other'],
  ['breaking-bad','Breaking Bad',2008,'Series','other'],['fast-furious','Fast & Furious',2001,'Movie','other'],['john-wick','John Wick',2014,'Movie','other'],['kill-bill','Kill Bill: Volume 1',2003,'Movie','other'],['suicide-squad','Suicide Squad',2016,'Movie','other'],['the-batman','The Batman',2022,'Movie','other'],['doctor-strange','Doctor Strange',2016,'Movie','other'],['harry-potter','Harry Potter',2001,'Movie','other'],['lord-of-the-rings','The Lord of the Rings',2001,'Movie','other'],['the-matrix','The Matrix',1999,'Movie','other'],['maze-runner','The Maze Runner',2014,'Movie','other'],['pirates-caribbean','Pirates of the Caribbean',2003,'Movie','other'],['the-sandman','The Sandman',2022,'Series','other'],['supernatural','Supernatural',2005,'Series','other'],['teen-wolf','Teen Wolf',2011,'Series','other'],['lucifer','Lucifer',2016,'Series','other'],['venom','Venom',2018,'Movie','other'],['castlevania','Castlevania',2017,'Series','other'],['devil-wears-prada','The Devil Wears Prada',2006,'Movie','other'],['together','Together',2025,'Movie','spiritual-relationships'],['obsession','Obsession',2023,'Series','other']
].map(([id,title,year,type,primaryCategory]) => ({
  id, title, year, type,
  genres: [], themes: [], categories: [primaryCategory], primaryCategory,
  description: title, labels: [],
  imdbId: IMDB_IDS[id as string] || undefined,
}))
ARCHIVE_DATA.push(...EXTRA_ARCHIVE_DATA.filter(extra => !ARCHIVE_DATA.some(item => item.id === extra.id)))

// --- THEME CONFIG ---
const THEMES = {
  home:{name:'home',accent:'#2F80FF',bg:'#020816'},
  'halloween-vault':{name:'halloween-vault',accent:'#FF7A00',bg:'#080402'},
  'horror-thriller':{name:'horror-thriller',accent:'#C9D0D8',bg:'#010102'},
  psychological:{name:'psychological',accent:'#39FF88',bg:'#020906'},
  'spiritual-relationships':{name:'spiritual-relationships',accent:'#FF4FA3',bg:'#10030B'},
  'true-crime':{name:'true-crime',accent:'#E51E35',bg:'#080204'},
  anime:{name:'anime',accent:'#A855F7',bg:'#08020F'},
  cartoons:{name:'cartoons',accent:'#FF5FCF',bg:'#100514'},
  other:{name:'other',accent:'#52D6FF',bg:'#031016'}
}

// --- SVG ICONS ---
const SvgBat = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 50" fill={color} className="w-full h-full">
    <path d="M50 20 C40 5, 20 5, 5 20 C15 20, 20 30, 30 30 C40 30, 45 25, 50 25 C55 25, 60 30, 70 30 C80 30, 85 20, 95 20 C80 5, 60 5, 50 20 Z" />
    <circle cx="45" cy="18" r="2" fill="#0A0505" />
    <circle cx="55" cy="18" r="2" fill="#0A0505" />
  </svg>
)

const SvgGhost = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 120" fill="none" className="w-full h-full">
    <path d="M50 8 C27 8 14 27 14 52 V101 C14 106 18 109 22 104 L30 95 L38 105 L46 95 L54 105 L62 95 L70 105 L78 95 L86 104 C90 109 94 106 94 101 V52 C94 27 76 8 50 8Z" fill={color} opacity=".10" stroke={color} strokeWidth="1.2"/>
    <ellipse cx="37" cy="49" rx="5" ry="9" fill={color} opacity=".65"/>
    <ellipse cx="63" cy="49" rx="5" ry="9" fill={color} opacity=".65"/>
    <path d="M43 72 Q50 77 57 72" stroke={color} strokeWidth="1.2" opacity=".45"/>
  </svg>
)

const SvgPumpkin = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2" className="w-full h-full">
    <ellipse cx="50" cy="55" rx="30" ry="25" />
    <ellipse cx="50" cy="55" rx="15" ry="25" />
    <ellipse cx="50" cy="55" rx="45" ry="25" />
    <path d="M50 30 L50 15" />
    <path d="M50 15 Q60 10 65 15" />
    <path d="M35 50 L45 50" strokeWidth="3" />
    <path d="M55 50 L65 50" strokeWidth="3" />
    <path d="M40 65 Q50 75 60 65" strokeWidth="3" fill="none" />
  </svg>
)

const SvgBrain = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5" className="w-full h-full">
    <path d="M40 20 C20 20, 20 40, 30 50 C20 60, 20 80, 40 80 C50 80, 60 75, 65 65 C70 80, 90 80, 90 60 C90 50, 85 45, 80 45 C85 30, 70 20, 60 25 C55 15, 45 15, 40 20 Z" />
    <path d="M45 30 Q50 40 45 50 Q50 60 45 70" />
    <path d="M60 35 Q65 45 60 55 Q65 65 60 75" />
    <path d="M35 40 Q40 45 35 55" />
    <path d="M70 40 Q75 50 70 60" />
    <circle cx="50" cy="50" r="3" fill={color} opacity="0.5" />
  </svg>
)

const SvgHeart = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" fill={color} className="w-full h-full">
    <path d="M50 85 C20 60, 5 40, 20 25 C35 10, 50 25, 50 40 C50 25, 65 10, 80 25 C95 40, 80 60, 50 85 Z" />
  </svg>
)

const SvgKnife = ({ color }: { color: string }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2" className="w-full h-full">
    <path d="M50 10 L55 60 L45 60 Z" fill={color} />
    <rect x="40" y="60" width="20" height="5" fill={color} />
    <rect x="45" y="65" width="10" height="25" fill={color} />
    <path d="M30 20 L40 50" stroke={color} strokeWidth="1" opacity="0.5" />
    <path d="M70 20 L60 50" stroke={color} strokeWidth="1" opacity="0.5" />
  </svg>
)

const SvgBloodDrop = ({ color }: { color: string }) => (
  <svg viewBox="0 0 30 50" fill={color} className="w-full h-full">
    <path d="M15 0 C15 0, 0 25, 0 35 C0 45, 7 50, 15 50 C23 50, 30 45, 30 35 C30 25, 15 0, 15 0 Z" />
  </svg>
)

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 37) % 101}%`, top: `${(i * 61) % 101}%`, size: 2 + (i % 4),
  duration: 7 + (i % 8), delay: (i % 7) * 0.8, drift: (i % 5) * 8 - 16,
}))
const FLOATERS = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 29) % 94 + 3}%`, top: `${(i * 47) % 82 + 6}%`,
  duration: 9 + (i % 6), delay: (i % 6) * 1.1, drift: (i % 4) * 18 - 27, rotate: (i % 5) * 10 - 20,
}))

function Atmosphere({ color, children }: { color: string, children?: ReactNode }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 35%, ${color}18 0%, transparent 42%), #020306` }} />
      {children}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] mix-blend-screen" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,.12) 4px)' }} />
    </div>
  )
}

function FloatingParticles({ color, count = 28 }: { color: string, count?: number }) {
  return (
    <>
      {PARTICLES.slice(0, count).map((p, i) => (
        <motion.span key={i} className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: color, boxShadow: `0 0 12px ${color}` }}
          animate={{ y: [0, -28, 0], x: [0, p.drift, 0], opacity: [0.08, 0.65, 0.08], scale: [0.7, 1.25, 0.7] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </>
  )
}

function SpiderWeb({ flip = false, color = '#FF7A00' }: { flip?: boolean, color?: string }) {
  return (
    <motion.div className={`absolute top-0 ${flip ? 'right-0 scale-x-[-1]' : 'left-0'} w-72 h-72 md:w-[28rem] md:h-[28rem]`}
      initial={{ opacity: 0 }} animate={{ opacity: [0.16, 0.28, 0.16] }} transition={{ duration: 6, repeat: Infinity }}>
      <svg viewBox="0 0 320 320" className="w-full h-full" fill="none" stroke={color}>
        {[0,30,60,90,120,150].map((a) => {
          const r = a * Math.PI / 180
          return <line key={a} x1="0" y1="0" x2={Math.cos(r) * 320} y2={Math.sin(r) * 320} strokeWidth="1" />
        })}
        {[40,75,110,145,185,230,275].map((r) => <path key={r} d={`M0 ${r} Q ${r * .55} ${r * .75} ${r} 0`} strokeWidth="0.8" />)}
      </svg>
    </motion.div>
  )
}

function ThemedBackground({ category }: { category: string }) {
  const theme = THEMES[category as keyof typeof THEMES] || THEMES.home
  return (
    <Atmosphere color={theme.accent}>
      <div className="absolute inset-0" style={{background:`radial-gradient(circle at 50% 35%, ${theme.accent}18 0%, transparent 44%), linear-gradient(135deg, ${theme.bg}, #010205 82%)`}} />
      {category === 'home' && <>
        <div className="absolute inset-0" style={{perspective:'900px'}}>
          <motion.div className="absolute left-1/2 top-1/2 w-[34rem] h-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/15" style={{transform:"translate(-50%,-50%) rotateX(66deg) rotateZ(20deg)"}} animate={{rotateZ:[20,380]}} transition={{duration:28,repeat:Infinity,ease:"linear"}} />
        </div>
        <FloatingParticles color="#72B7FF" count={30} />
      </>}
      {category === 'halloween-vault' && <>
        <SpiderWeb color="#FF7A00" /><SpiderWeb flip color="#FF7A00" />
        {FLOATERS.slice(0,6).map((p,i) => <motion.div key={i} className="absolute w-16 h-10" style={{left:p.left,top:p.top}} animate={{x:[0,p.drift*4,0],y:[0,-24,0],rotate:[0,p.rotate,0],opacity:[.06,.35,.06]}} transition={{duration:p.duration,delay:p.delay,repeat:Infinity}}><SvgBat color="#FF7A00" /></motion.div>)}
        {FLOATERS.slice(0,4).map((p,i) => <motion.div key={i} className="absolute w-20 h-20" style={{left:`${8+i*23}%`,bottom:`${5+i*4}%`}} animate={{y:[0,-14,0],rotate:[-4,4,-4],opacity:[.1,.35,.1]}} transition={{duration:7+i,repeat:Infinity}}><SvgPumpkin color="#FF7A00" /></motion.div>)}
      </>}
      {category === 'horror-thriller' && <>
        <div className="absolute inset-0 bg-black" />
        <motion.div className="absolute inset-x-[-15%] bottom-[-8%] h-[55%]" style={{background:'radial-gradient(ellipse at center,rgba(210,220,230,.10),transparent 62%)',filter:'blur(18px)'}} animate={{x:['-4%','4%','-4%'],opacity:[.18,.38,.18]}} transition={{duration:16,repeat:Infinity,ease:'easeInOut'}} />
        {FLOATERS.slice(0,8).map((p,i) => <motion.div key={i} className="absolute w-24 h-28 md:w-32 md:h-40" style={{left:p.left,top:p.top}} animate={{x:[0,p.drift*1.8,0],y:[0,-22,0],opacity:[.015,.18,.015],scale:[.9,1.04,.9]}} transition={{duration:p.duration+4,delay:p.delay,repeat:Infinity,ease:'easeInOut'}}><SvgGhost color="#DCE3EA" /></motion.div>)}
        <FloatingParticles color="#B9C1CA" count={14} />
      </>}
      {category === 'psychological' && <>
        <motion.div className="absolute left-1/2 top-1/2 w-[30rem] h-[30rem] md:w-[44rem] md:h-[44rem] -translate-x-1/2 -translate-y-1/2 opacity-[.09]" animate={{rotate:[0,360],scale:[1,1.04,1]}} transition={{rotate:{duration:90,repeat:Infinity,ease:'linear'},scale:{duration:9,repeat:Infinity}}}><SvgBrain color="#39FF88" /></motion.div>
        {[18,34,50,66,82].map((top,i) => <motion.div key={top} className="absolute left-0 right-0 h-px" style={{top:`${top}%`,background:'#39FF88'}} animate={{x:['-100%','100%'],opacity:[0,.5,0]}} transition={{duration:5+i,delay:i,repeat:Infinity,ease:'linear'}} />)}
        <FloatingParticles color="#39FF88" count={30} />
      </>}
      {category === 'spiritual-relationships' && <>
        <motion.div className="absolute left-1/2 top-1/2 w-[42rem] h-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{background:'radial-gradient(circle,#FF4FA325,transparent 66%)'}} animate={{scale:[.85,1.15,.85],opacity:[.3,.8,.3]}} transition={{duration:10,repeat:Infinity}} />
        {FLOATERS.slice(0,10).map((p,i) => <motion.div key={i} className="absolute w-8 h-8" style={{left:p.left,top:p.top}} animate={{y:[0,-45,0],x:[0,p.drift,0],opacity:[.03,.3,.03],scale:[.7,1.1,.7]}} transition={{duration:p.duration,delay:p.delay,repeat:Infinity}}><SvgHeart color="#FF4FA3" /></motion.div>)}
      </>}
      {category === 'true-crime' && <>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:'linear-gradient(#E51E3512 1px,transparent 1px),linear-gradient(90deg,#E51E3512 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
        {FLOATERS.slice(0,6).map((p,i) => <motion.div key={i} className="absolute w-16 h-16" style={{left:p.left,top:p.top}} animate={{y:[0,-25,0],rotate:[-10,p.rotate+25,-10],opacity:[.03,.2,.03]}} transition={{duration:p.duration,delay:p.delay,repeat:Infinity}}><SvgKnife color="#E51E35" /></motion.div>)}
        {PARTICLES.slice(0,12).map((p,i) => <motion.div key={i} className="absolute w-2 h-7" style={{left:p.left,top:p.top}} animate={{y:[0,90,160],opacity:[0,.5,0]}} transition={{duration:4+(i%5),delay:i*.35,repeat:Infinity,ease:'easeIn'}}><SvgBloodDrop color="#E51E35" /></motion.div>)}
      </>}
      {(category === 'anime' || category === 'cartoons') && <>
        <div className="absolute inset-0" style={{backgroundImage:`linear-gradient(${theme.accent}18 1px,transparent 1px),linear-gradient(90deg,${theme.accent}18 1px,transparent 1px)`,backgroundSize:'54px 54px',transform:'perspective(650px) rotateX(62deg) scale(1.7)',transformOrigin:'center bottom'}} />
        <motion.div className="absolute inset-x-0 top-0 h-full" style={{background:`linear-gradient(transparent,${theme.accent}10,transparent)`}} animate={{y:['-100%','100%']}} transition={{duration:7,repeat:Infinity,ease:'linear'}} />
        <FloatingParticles color={theme.accent} count={28} />
      </>}
      {category === 'other' && <>
        <motion.div className="absolute left-1/2 top-1/2 w-[44rem] h-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" style={{transform:'translate(-50%,-50%) rotateX(65deg)',boxShadow:'0 0 100px #52D6FF18'}} animate={{rotateZ:[0,360],scale:[1,.94,1]}} transition={{rotateZ:{duration:70,repeat:Infinity,ease:'linear'},scale:{duration:11,repeat:Infinity}}} />
        <FloatingParticles color="#52D6FF" count={24} />
      </>}
    </Atmosphere>
  )
}

const SvgHeartOutline = ({ color, filled = false }: { color: string, filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 20.5S4 15.4 4 9.4C4 6.6 6 4.5 8.6 4.5c1.5 0 2.8.8 3.4 2 0.6-1.2 1.9-2 3.4-2C18 4.5 20 6.6 20 9.4c0 6-8 11.1-8 11.1Z" />
  </svg>
)

const SvgClose = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className="w-5 h-5">
    <path d="M5 5L19 19" /><path d="M19 5L5 19" />
  </svg>
)

const SvgGlobe = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" className="w-4 h-4">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
  </svg>
)

// --- GLOBAL POSTER CACHE (shared across instances so the same title only resolves once) ---
const posterCache: Record<string, string> = {}

// --- POSTER COMPONENT (rewritten: img onLoad/onError drives the fallback chain) ---
function Poster({ imdbId: imdbIdProp, title, year, type, accent }: {
  imdbId?: string, title: string, year?: number, type?: string, accent: string
}) {
  const initialId = imdbIdProp || IMDB_IDS[title]

  // Candidate list is computed once per mount.
  const [candidates, setCandidates] = useState<string[]>(() => {
    if (initialId && posterCache[initialId]) return [posterCache[initialId]]
    const list: string[] = []
    if (initialId) {
      list.push(METAHUB(initialId, 'medium'))
      list.push(METAHUB(initialId, 'large'))
    }
    return list
  })

  const [index, setIndex] = useState(0)
  const [poster, setPoster] = useState<string | null>(() => (initialId && posterCache[initialId]) || null)
  const [loading, setLoading] = useState(!poster)
  const resolvedRef = useRef(false)

  // Fetch Cinemeta / suggestion / OMDb to append more candidates if the direct ones fail.
  useEffect(() => {
    if (resolvedRef.current || poster) return

    let cancelled = false
    const controller = new AbortController()

    const appendExtras = async () => {
      const extras: string[] = []

      // Cinemeta
      if (initialId) {
        try {
          const res = await fetch(CINEMETA(type || 'Movie', initialId), { signal: controller.signal })
          if (res.ok) {
            const data = await res.json()
            if (data?.meta?.poster) extras.push(data.meta.poster)
            if (data?.meta?.background) extras.push(data.meta.background)
          }
        } catch { /* continue */ }
      }

      // IMDb suggestion (title + year → image URL)
      try {
        const q = `${title}${year ? ` ${year}` : ''}`
        const res = await fetch(IMDB_SUGGEST(q), { signal: controller.signal })
        const data = await res.json()
        const results: any[] = Array.isArray(data?.d) ? data.d : []
        const exact = results.find(r => r?.i?.imageUrl && r?.l && r.l.toLowerCase() === title.toLowerCase())
        if (exact?.i?.imageUrl) extras.push(exact.i.imageUrl)
        const loose = results.find(r => r?.i?.imageUrl)
        if (loose?.i?.imageUrl) extras.push(loose.i.imageUrl)
      } catch { /* continue */ }

      // OMDb (if key present)
      if (OMDB_API_KEY !== 'YOUR_OMDB_API_KEY_HERE') {
        try {
          const q = initialId ? `i=${initialId}` : `t=${encodeURIComponent(title)}${year ? `&y=${year}` : ''}`
          const res = await fetch(`https://www.omdbapi.com/?${q}&apikey=${OMDB_API_KEY}`, { signal: controller.signal })
          const data = await res.json()
          if (data?.Response === 'True' && data.Poster && data.Poster !== 'N/A') extras.push(data.Poster)
        } catch { /* continue */ }
      }

      if (!cancelled && extras.length) {
        setCandidates(prev => [...prev, ...extras.filter(u => !prev.includes(u))])
      }
    }

    appendExtras()
    return () => { cancelled = true; controller.abort() }
  }, [initialId, title, year, type, poster])

  // When the index moves past the last candidate, give up → placeholder.
  useEffect(() => {
    if (index >= candidates.length) {
      setLoading(false)
      setPoster(null)
    }
  }, [index, candidates.length])

  const handleLoad = () => {
    if (candidates[index]) {
      if (initialId) posterCache[initialId] = candidates[index]
      setPoster(candidates[index])
      setLoading(false)
      resolvedRef.current = true
    }
  }

  const handleError = () => {
    // Try next candidate.
    if (index + 1 < candidates.length) setIndex(i => i + 1)
    else {
      // Wait a tick in case extras are still being appended.
      setTimeout(() => {
        setIndex(i => (i + 1 < candidates.length ? i + 1 : i))
        setLoading(false)
      }, 100)
    }
  }

  if (loading && !poster) return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: `radial-gradient(circle at 50% 45%,${accent}18,#030306 68%)` }}>
      <motion.div className="absolute inset-0" style={{ background: `linear-gradient(110deg,transparent 20%,${accent}22 50%,transparent 80%)` }} animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="w-10 h-10 rounded-full border" style={{ borderColor: `${accent}35`, borderTopColor: accent }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
      {candidates[index] && (
        <img src={candidates[index]} alt="" onLoad={handleLoad} onError={handleError} className="hidden" />
      )}
    </div>
  )

  if (!poster) return (
    <div className="w-full h-full relative overflow-hidden flex items-end p-4" style={{ background: `radial-gradient(circle at 50% 35%,${accent}25,transparent 45%),linear-gradient(145deg,${accent}12,#030306 70%)` }}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(135deg,transparent 45%,${accent}25 46%,transparent 47%),linear-gradient(45deg,transparent 45%,${accent}18 46%,transparent 47%)` }} />
      <div className="relative z-10 font-display text-lg tracking-wider text-white/75">{title}</div>
    </div>
  )

  return (
    <img
      src={poster}
      alt={`${title} poster`}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.07] group-hover:brightness-110"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => { setPoster(null); setLoading(true); handleError() }}
    />
  )
}

// --- UI STRINGS ---
const UI = {
  en: {
    archive:'ARCHIVE', favorites:'FAVORITES', archiveSector:'ARCHIVE SECTOR', noTitles:'NO TITLES YET',
    viewImdb:'VIEW ON IMDb', watchAnalysis:'WATCH MY ANALYSIS', myLens:'MY LENS', titles:'TITLES',
    tvCorner:'TV CORNER', language:'LANGUAGE', back:'BACK', savedTitles:'Your saved titles from the archive.',
    tagline:'A cinematic archive of stories, darkness, psychology, relationships and imaginary worlds.',
    readMore:'READ MORE', readLess:'READ LESS',
    halloween:'HALLOWEEN', horror:'HORROR & THRILLER', psychological:'PSYCHOLOGICAL', spiritual:'MY ANALYSIS — SPIRITUAL RELATIONSHIPS', trueCrime:'TRUE CRIME — SERIAL KILLERS', anime:'ANIME', cartoons:'CARTOONS', other:'OTHER MOVIES & SERIES',
    theArchive:'THE LILITH ARCHIVE',
    subtitles:{
      halloween:'Witches, classic Halloween atmosphere, gothic icons and Halloween-centered stories',
      horror:'Horror, supernatural terror, slashers, survival and nightmare cinema.',
      psychological:'Stories beneath identity, obsession, control, trauma and the architecture of the mind.',
      spiritual:'A dedicated analysis archive for Karmic, Twin Flame, Shadow and Soulmate dynamics in fiction.',
      trueCrime:'Serial-killer cases, investigations, documentaries and dramatized true-crime stories.',
      anime:'Anime only — worlds of identity, freedom, monsters, power and transformation.',
      cartoons:'Cartoons and childhood animation only, kept separate from anime.',
      other:'Everything outside the core sectors: action, crime, fantasy, sci-fi and drama.'
    },
    spiritualIntro: `Before entering this section, there is something important I want to clarify.

I have already explained my understanding of Karmic Relationships, Twin Flames, Shadow Relationships, and Soulmates in much greater depth. If you want to understand the framework I use when I classify a relationship, you can find the complete explanations in my TikTok playlist dedicated to these subjects.

So here, I will not repeat all of those explanations.

Instead, this section is about the stories themselves.

I will look at the relationships portrayed in movies and series and examine their dynamics, development, patterns, wounds, transformations, and the direction their connection takes. Some relationships may contain elements that resemble more than one category, while others may clearly belong closer to one than another.

And one distinction is particularly important:

I do not call a relationship a Twin Flame simply because the characters have intense chemistry, strong attraction, a painful separation, or an unusual connection.

I have watched many stories where the relationship is incredibly intense, yet I would still classify it as karmic, shadow, soulmate, or something entirely different.

For me, the classification depends on the whole journey of the relationship, not on one characteristic.

With that said, let's enter the stories. 🖤`,
    spiritualTags:'KARMIC · TWIN FLAME · SHADOW · SOULMATE',
    framework:'FULL FRAMEWORK: MY TIKTOK PLAYLIST'
  },
  ar: {
    archive:'الأرشيف', favorites:'المفضلة', archiveSector:'قسم الأرشيف', noTitles:'لا توجد عناوين بعد',
    viewImdb:'عرض على IMDb', watchAnalysis:'مشاهدة تحليلي', myLens:'رؤيتي', titles:'عنوان',
    tvCorner:'ركن التلفاز', language:'اللغة', back:'عودة', savedTitles:'العناوين التي حفظتها من الأرشيف.',
    tagline:'أرشيف سينمائي للقصص والظلام وعلم النفس والعلاقات والعوالم الخيالية.',
    readMore:'اقرأ المزيد', readLess:'إخفاء',
    halloween:'الهالوين', horror:'الرعب والإثارة', psychological:'النفسي', spiritual:'تحليلاتي — العلاقات الروحية', trueCrime:'جرائم حقيقية — قتلة متسلسلون', anime:'أنمي', cartoons:'كرتون', other:'أفلام ومسلسلات أخرى',
    theArchive:'أرشيف ليليث',
    subtitles:{
      halloween:'الساحرات، أجواء الهالوين، الرموز القوطية وحكايات منتصف الليل.',
      horror:'الرعب، الرعب الخارق، أفلام القتلة، النجاة والكوابيس السينمائية.',
      psychological:'الهوية، التعلق، الهوس، السيطرة، الصدمات وبنية العقل.',
      spiritual:'أرشيف مخصص لتحليل العلاقات الكارمية وتوأم الشعلة وعلاقات الظل ورفقاء الروح في القصص.',
      trueCrime:'قضايا القتلة المتسلسلين، التحقيقات، الوثائقيات والقصص المبنية على جرائم حقيقية.',
      anime:'الأنمي فقط — عوالم الهوية والحرية والوحوش والقوة والتحول.',
      cartoons:'الكرتون وعوالم الطفولة المتحركة فقط، منفصل عن الأنمي.',
      other:'كل ما يقع خارج الأقسام الأساسية: الأكشن والجريمة والفانتازيا والخيال العلمي والدراما.'
    },
    spiritualIntro: `كارمي • توأم الشعلة • الظل • رفيق الروح

وقبل أن ندخل إلى هذا القسم، هناك أمر مهم أودّ توضيحه.

لقد شرحتُ فهمي للعلاقات الكارمية، وتوأم الشعلة، وعلاقات الظل، ورفيق الروح بتفصيل أكبر بكثير في مواضع أخرى. وإن أردتم أن تفهموا الإطار الذي أعتمد عليه عند تصنيف أي علاقة، فستجدون الشروحات الكاملة في قائمة التشغيل الخاصة بي على «تيك توك»، المخصّصة لهذه المواضيع.

لذلك لن أكرّر هنا كل تلك الشروحات.

بل سيتناول هذا القسم القصصَ نفسها.

سأتأمل العلاقات التي تصوّرها الأفلام والمسلسلات، وأحلّل ديناميكياتها، وتطوّرها، وأنماطها، وجراحها، وتحوّلاتها، والاتجاه الذي تسلكه الرابطة بين الطرفين. قد تحمل بعض العلاقات عناصر تشبه أكثر من فئة واحدة، بينما تنتمي أخرى بوضوح إلى فئة بعينها أكثر من غيرها.

وهناك فارق مهم بصورة خاصة:

أنا لا أسمّي علاقةً ما «توأم شعلة» لمجرد أن بين الشخصيتين كيمياء قوية، أو انجذابًا شديدًا، أو فراقًا مؤلمًا، أو ارتباطًا غير مألوف.

لقد شاهدتُ قصصًا كثيرة تكون فيها العلاقة شديدة الكثافة، ومع ذلك أصنّفها علاقةً كارمية، أو ظلًّا، أو رفيقَ روح، أو شيئًا مختلفًا تمامًا.

فالتصنيف عندي يعتمد على رحلة العلاقة كاملةً، لا على صفة واحدة منها.

وبعد هذا التوضيح، فلندخل إلى القصص. 🖤`,
    spiritualTags:'كارمي · توأم الشعلة · الظل · رفيق الروح',
    framework:'الإطار الكامل: قائمة TikTok الخاصة بي'
  }
} as const

// --- MAIN PAGE ---
export default function TVCornerPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [langOpen, setLangOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<any>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFullNote, setShowFullNote] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('tv-corner-language') as 'en' | 'ar' | null
    if (savedLanguage === 'en' || savedLanguage === 'ar') setLanguage(savedLanguage)
    const saved = localStorage.getItem('tv-corner-favorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const t = UI[language]
  const isRtl = language === 'ar'

  const setSiteLanguage = (next: 'en' | 'ar') => {
    setLanguage(next)
    localStorage.setItem('tv-corner-language', next)
    setLangOpen(false)
  }

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id]
    setFavorites(newFavs)
    localStorage.setItem('tv-corner-favorites', JSON.stringify(newFavs))
  }

  const getPersonalNote = (item: any): string | null => {
    if (!item?.personalNote && !AR_NOTES[item?.id]) return null
    if (language === 'ar' && AR_NOTES[item.id]) return AR_NOTES[item.id]
    return item.personalNote || null
  }

  const filteredData = activeCategory
    ? activeCategory === 'favorites'
      ? ARCHIVE_DATA.filter(item => favorites.includes(item.id))
      : ARCHIVE_DATA.filter(item => getPrimaryCategory(item) === activeCategory)
    : []

  const currentTheme = THEMES[activeCategory as keyof typeof THEMES] || THEMES.home

  const categoryLabels: Record<string, string> = {
    'halloween-vault': t.halloween,
    'horror-thriller': t.horror,
    psychological: t.psychological,
    'spiritual-relationships': t.spiritual,
    'true-crime': t.trueCrime,
    anime: t.anime,
    cartoons: t.cartoons,
    other: t.other,
  }

  const categorySubtitles: Record<string, string> = {
    'halloween-vault': t.subtitles.halloween,
    'horror-thriller': t.subtitles.horror,
    psychological: t.subtitles.psychological,
    'spiritual-relationships': t.subtitles.spiritual,
    'true-crime': t.subtitles.trueCrime,
    anime: t.subtitles.anime,
    cartoons: t.subtitles.cartoons,
    other: t.subtitles.other,
  }

  const CATEGORIES = [
    {id:'halloween-vault',symbol:'01'},
    {id:'horror-thriller',symbol:'02'},
    {id:'psychological',symbol:'03'},
    {id:'spiritual-relationships',symbol:'04'},
    {id:'true-crime',symbol:'05'},
    {id:'anime',symbol:'06'},
    {id:'cartoons',symbol:'07'},
    {id:'other',symbol:'08'},
  ]

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} lang={language} className="relative min-h-screen bg-[#020306] text-[#E8E8E8] font-sans overflow-hidden selection:bg-white/20">
      
      <AnimatePresence mode="wait">
        <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="fixed inset-0 z-0">
          <ThemedBackground category={activeCategory || 'home'} />
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#030407]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 h-16 flex items-center gap-3">
          <motion.button
            onClick={() => setActiveCategory(null)}
            className="font-display text-[11px] tracking-[0.3em] text-white/90 whitespace-nowrap flex-shrink-0"
            whileHover={{ scale: 1.04 }}
          >
            {t.tvCorner}
          </motion.button>

          <div ref={langRef} className="relative flex-shrink-0">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/25 rounded-full text-white/85 hover:text-white hover:border-white/60 transition-colors"
              aria-label={t.language}
            >
              <SvgGlobe color="currentColor" />
              <span className="text-[9px] tracking-[0.2em] uppercase">{language === 'ar' ? 'AR' : 'EN'}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 start-0 min-w-[130px] rounded-lg border border-white/15 bg-[#0A0D14]/95 backdrop-blur-xl shadow-2xl overflow-hidden z-[100]"
                >
                  <button
                    onClick={() => setSiteLanguage('en')}
                    className={`w-full text-start px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-colors ${language === 'en' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSiteLanguage('ar')}
                    className={`w-full text-start px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase transition-colors ${language === 'ar' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    العربية
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-5 min-w-max px-2">
              {CATEGORIES.map(cat => {
                const catTheme = THEMES[cat.id as keyof typeof THEMES] || THEMES.home
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-[10px] tracking-[0.22em] uppercase transition-all duration-300 whitespace-nowrap ${activeCategory === cat.id ? '' : 'text-[#B7C0CC]/50 hover:text-[#E8E8E8]'}`}
                    style={{ color: activeCategory === cat.id ? catTheme.accent : undefined, borderBottom: activeCategory === cat.id ? `2px solid ${catTheme.accent}` : '2px solid transparent', paddingBottom: '4px' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {categoryLabels[cat.id]}
                  </motion.button>
                )
              })}
            </div>
          </div>

          <motion.button
            onClick={() => setActiveCategory('favorites')}
            className={`text-[10px] tracking-[0.3em] uppercase transition-colors whitespace-nowrap flex-shrink-0 ${activeCategory === 'favorites' ? 'text-[#FF2A2A]' : 'text-[#B7C0CC]/50 hover:text-[#FF2A2A]'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.favorites}
          </motion.button>
        </div>
      </nav>

      <main className="pt-20 pb-24 px-4 md:px-8 max-w-[1500px] mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!activeCategory && (
            <motion.section key="portal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="min-h-[calc(100vh-5rem)] flex flex-col justify-center">
              <div className="text-center mb-14">
                <motion.div initial={{opacity:0,letterSpacing:'0.3em'}} animate={{opacity:1,letterSpacing:'0.75em'}} transition={{duration:1}} className="text-[9px] uppercase text-blue-300/50 mb-5">{t.theArchive}</motion.div>
                <motion.h1 initial={{opacity:0,y:30,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.9}} className="font-display text-5xl md:text-8xl tracking-[0.12em] text-white">{t.tvCorner}</motion.h1>
                <motion.div initial={{width:0}} animate={{width:'14rem'}} transition={{delay:.4,duration:.9}} className="h-px mx-auto mt-6" style={{background:'linear-gradient(90deg,transparent,#3B82F6,#7DD3FC,#3B82F6,transparent)'}} />
                <p className="mt-6 max-w-xl mx-auto text-xs md:text-sm text-white/45 px-4">{t.tagline}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto w-full px-4">
                {CATEGORIES.map((cat,index)=>{ const theme=THEMES[cat.id as keyof typeof THEMES]; const count=ARCHIVE_DATA.filter(i=>getPrimaryCategory(i)===cat.id).length; return (
                  <motion.button key={cat.id} onClick={()=>setActiveCategory(cat.id)} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.15+index*.08}} whileHover={{y:-8,scale:1.015}} whileTap={{scale:.98}} className="group relative text-start overflow-hidden rounded-2xl border p-6 min-h-[180px]" style={{borderColor:`${theme.accent}45`,background:`linear-gradient(145deg,${theme.bg},#030306 82%)`,boxShadow:`inset 0 0 60px ${theme.accent}08`}}>
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-700" style={{background:theme.accent}} />
                    <div className="relative z-10 flex justify-between"><span className="font-mono text-[9px] tracking-[.3em]" style={{color:theme.accent}}>{cat.symbol}</span><span className="text-[9px] tracking-[.2em] text-white/25">{String(count).padStart(2,'0')} {t.titles}</span></div>
                    <div className="relative z-10 mt-12"><h2 className="font-display text-xl md:text-2xl tracking-[.12em]" style={{color:theme.accent}}>{categoryLabels[cat.id]}</h2><p className="mt-2 text-[10px] leading-relaxed text-white/40 max-w-xs">{categorySubtitles[cat.id]}</p></div>
                  </motion.button> )})}
                <motion.button onClick={()=>setActiveCategory('favorites')} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.55}} whileHover={{y:-8}} className="group relative text-start overflow-hidden rounded-2xl border p-6 min-h-[180px]" style={{borderColor:'#FFFFFF20',background:'linear-gradient(145deg,#0B0D12,#030306 80%)'}}>
                  <span className="relative z-10 font-mono text-[9px] tracking-[.3em] text-white/40">09</span><div className="relative z-10 mt-12"><h2 className="font-display text-xl md:text-2xl tracking-[.12em] text-white/80">{t.favorites}</h2><p className="mt-2 text-[10px] text-white/35">{t.savedTitles}</p></div>
                </motion.button>
              </div>
            </motion.section>
          )}
          {activeCategory && (
            <motion.section key={activeCategory} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}>
              <div className="relative py-14 md:py-20 text-center overflow-hidden">
                <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl" style={{background:currentTheme.accent}} animate={{scale:[.8,1.15,.8],opacity:[.03,.1,.03]}} transition={{duration:6,repeat:Infinity}} />
                <button onClick={()=>setActiveCategory(null)} className="absolute start-0 top-6 text-[9px] tracking-[.25em] text-white/35 hover:text-white">{t.archive}</button>
                <div className="relative text-[9px] tracking-[.5em] uppercase mb-5" style={{color:currentTheme.accent}}>{t.archiveSector}</div>
                <h1 className="relative font-display text-4xl md:text-7xl tracking-[.12em] px-4" style={{color:currentTheme.accent,textShadow:`0 0 50px ${currentTheme.accent}35`}}>
                  {activeCategory === 'favorites'
                    ? t.favorites
                    : (categoryLabels[activeCategory] || activeCategory.replaceAll('-', ' ').toUpperCase())}
                </h1>
                <p className="relative mt-5 max-w-2xl mx-auto text-xs md:text-sm text-white/40 px-4">
                  {activeCategory === 'favorites' ? t.savedTitles : (categorySubtitles[activeCategory] || '')}
                </p>

                {activeCategory === 'spiritual-relationships' && (
                  <div className="relative mt-8 mx-auto max-w-3xl rounded-2xl border border-pink-300/15 bg-black/25 backdrop-blur-md p-6 md:p-8 text-start">
                    <div className="text-[9px] tracking-[.35em] uppercase text-pink-300/70 mb-4">{t.spiritualTags}</div>
                    <div className="font-serif text-sm leading-7 text-white/65 whitespace-pre-line">
                      {showFullNote
                        ? t.spiritualIntro
                        : t.spiritualIntro.split('\n\n').slice(0, 3).join('\n\n')}
                    </div>
                    <button
                      onClick={() => setShowFullNote(v => !v)}
                      className="mt-4 text-[10px] tracking-[.25em] uppercase text-pink-200/70 hover:text-pink-100 transition-colors"
                    >
                      {showFullNote ? t.readLess : t.readMore}
                    </button>
                    <p className="mt-5 text-[10px] tracking-widest text-pink-200/45">{t.framework}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
                {filteredData.length>0 ? filteredData.map((item,index)=>{ const itemTheme=activeCategory!=='favorites'?currentTheme:(THEMES[getPrimaryCategory(item) as keyof typeof THEMES]||THEMES.home); return (
                  <motion.div key={item.id} initial={{opacity:0,y:35,filter:'blur(5px)'}} animate={{opacity:1,y:0,filter:'blur(0)'}} transition={{duration:.55,delay:Math.min(index*.045,.45)}} className="group relative cursor-pointer" onClick={()=>setActiveItem(item)} whileHover={{y:-10}}>
                    <div className="relative aspect-[2/3] overflow-hidden rounded-xl border-2 transition-all duration-500" style={{borderColor:`${itemTheme.accent}65`,background:itemTheme.bg,boxShadow:`0 12px 40px rgba(0,0,0,.35)`}}>
                      <div className="absolute inset-0 bg-black"><Poster imdbId={item.imdbId} title={item.title} year={item.year} type={item.type} accent={itemTheme.accent} /></div>
                      <motion.div className="absolute inset-0 pointer-events-none mix-blend-color" style={{background:itemTheme.accent}} animate={{opacity:[.03,.09,.03]}} transition={{duration:4+index%3,repeat:Infinity}} />
                      <div className="absolute inset-1 rounded-lg pointer-events-none" style={{border:`1px solid ${itemTheme.accent}25`}} />
                      <motion.div className="absolute left-0 right-0 bottom-0 h-1" style={{background:`linear-gradient(90deg,transparent,${itemTheme.accent},transparent)`}} animate={{scaleX:[0,1,0],opacity:[.2,.9,.2]}} transition={{duration:3.5,repeat:Infinity,delay:index*.15}} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-15 group-hover:opacity-85 transition-opacity duration-500" />
                      <motion.button onClick={(e)=>{e.stopPropagation();toggleFavorite(item.id)}} className="absolute top-3 end-3 z-20 p-2 rounded-full backdrop-blur-md" style={{background:'rgba(0,0,0,.5)',border:`1px solid ${itemTheme.accent}55`}} whileHover={{scale:1.15}} whileTap={{scale:.9}}><SvgHeartOutline color={favorites.includes(item.id)?'#FF3048':itemTheme.accent} filled={favorites.includes(item.id)} /></motion.button>
                      {item.labels?.length>0 && <div className="absolute top-3 start-3 z-20 flex flex-col gap-1 max-w-[75%]">{item.labels.map((label:string)=><span key={label} className="text-[7px] tracking-[.18em] uppercase px-2 py-1 backdrop-blur-md" style={{color:itemTheme.accent,border:`1px solid ${itemTheme.accent}60`,background:'rgba(0,0,0,.5)'}}>{label}</span>)}</div>}
                      <div className="absolute inset-x-0 bottom-0 z-10 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"><div className="text-[8px] tracking-[.25em] uppercase" style={{color:itemTheme.accent}}>{item.type}</div><div className="font-display text-base text-white">{item.title}</div><div className="text-[8px] text-white/45 mt-1">{item.year}</div></div>
                    </div>
                    <div className="mt-3 px-1"><h3 className="font-display text-xs tracking-[.08em] truncate" style={{color:itemTheme.accent}}>{item.title}</h3><p className="text-[9px] text-white/30 mt-1 tracking-wider">{item.year} · {item.type}</p></div>
                  </motion.div> )}) : <motion.div className="col-span-full py-28 text-center rounded-2xl" style={{border:`1px solid ${currentTheme.accent}20`,background:`${currentTheme.accent}04`}} initial={{opacity:0}} animate={{opacity:1}}><div className="font-display tracking-[.2em] text-white/35">{t.noTitles}</div></motion.div>}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {activeItem && (() => {
          const note = getPersonalNote(activeItem)
          const itemAccent = THEMES[getPrimaryCategory(activeItem) as keyof typeof THEMES]?.accent || '#B7C0CC'
          const itemBg = THEMES[getPrimaryCategory(activeItem) as keyof typeof THEMES]?.bg || '#05070A'
          return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div className="absolute inset-0 bg-[#05070A]/95 backdrop-blur-lg" onClick={() => setActiveItem(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
              style={{
                background: `linear-gradient(to bottom, ${itemBg}, #05070A)`,
                border: `1px solid ${itemAccent}40`
              }}
            >
              <div className="relative p-6 md:p-8">
                <motion.button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-6 end-6 text-[#B7C0CC]/50 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 90 }} whileTap={{ scale: 0.9 }} aria-label={t.back}
                >
                  <SvgClose color="#B7C0CC" />
                </motion.button>
                <div className="flex flex-col md:flex-row gap-8">
                  <motion.div
                    className="w-full md:w-48 h-64 flex-shrink-0 rounded-sm overflow-hidden relative"
                    style={{ border: `1px solid ${itemAccent}20` }}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  >
                    <div className="w-full h-full bg-black relative">
                      <Poster imdbId={activeItem.imdbId} title={activeItem.title} year={activeItem.year} type={activeItem.type} accent={itemAccent} />
                    </div>
                  </motion.div>
                  <motion.div className="flex-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className="font-display text-2xl md:text-3xl tracking-[0.15em] text-white">{activeItem.title}</h2>
                      <motion.button onClick={() => toggleFavorite(activeItem.id)} className="transition-colors flex-shrink-0" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} aria-label={t.favorites}>
                        <SvgHeartOutline color={favorites.includes(activeItem.id) ? '#FF3048' : '#B7C0CC'} filled={favorites.includes(activeItem.id)} />
                      </motion.button>
                    </div>
                    <p className="text-[#B7C0CC]/60 text-sm mb-4">{activeItem.year} • {activeItem.type}</p>
                    {activeItem.genres?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {activeItem.genres.map((g: string) => (
                          <span key={g} className="text-[9px] tracking-widest uppercase px-3 py-1 rounded-full" style={{ border: `1px solid ${itemAccent}40`, color: itemAccent }}>{g}</span>
                        ))}
                      </div>
                    )}
                    <p className="font-serif text-[#E8E8E8]/80 leading-relaxed text-sm mb-6">{activeItem.description}</p>
                    {note && (
                      <motion.div
                        className="mb-6 p-4"
                        style={{
                          borderInlineStart: `2px solid ${itemAccent}`,
                          background: `${itemAccent}10`
                        }}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                      >
                        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: itemAccent }}>{t.myLens}</p>
                        <div className="font-serif italic text-[#E8E8E8]/80 text-sm whitespace-pre-line leading-7">{note}</div>
                      </motion.div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {activeItem.imdbId && (
                        <motion.a href={`https://www.imdb.com/title/${activeItem.imdbId}/`} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300"
                          style={{ borderColor: `${itemAccent}60`, color: itemAccent }}
                          whileHover={{ scale: 1.05, backgroundColor: `${itemAccent}20` }} whileTap={{ scale: 0.95 }}>
                          {t.viewImdb}
                        </motion.a>
                      )}
                      {activeItem.analysisUrl && (
                        <motion.a href={activeItem.analysisUrl} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300"
                          style={{ borderColor: `${itemAccent}60`, color: itemAccent }}
                          whileHover={{ scale: 1.05, backgroundColor: `${itemAccent}20` }} whileTap={{ scale: 0.95 }}>
                          {t.watchAnalysis}
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          )
        })()}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}