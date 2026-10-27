/* ==========================================================================
   Origin Dental — site content
   Every page is generated from this file by tools/build.mjs. Edit here, then run:
     node tools/build.mjs
   The clinic, dentists, patient stories and reviews are fictional (concept site).
   ========================================================================== */

export const clinic = {
  name: 'Origin Dental',
  tagline: 'Advanced Dentistry · Simplified',
  // fictional but realistic: the number is in Ofcom's range reserved for drama (it never reaches a real
  // line) and the email domain is unregistered, so no visitor's call or message lands with a real person
  phone: '+44 7700 900461',
  tel: '+447700900461',
  wa: '447700900461',
  email: 'hello@origindentals.in',
  area: 'Kodambakkam, Chennai',
  street: 'No. 18, Arcot Road, Kodambakkam',
  postcode: '600024',
  address: 'No. 18, Arcot Road, Kodambakkam, Chennai 600024',
  mapQuery: 'Kodambakkam, Chennai', // the map and directions show the neighbourhood, not a street address
  founded: 2000,
  hours: [
    [1, 'Monday', '8:00 AM – 9:00 PM'], [2, 'Tuesday', '8:00 AM – 9:00 PM'], [3, 'Wednesday', '8:00 AM – 9:00 PM'],
    [4, 'Thursday', '8:00 AM – 9:00 PM'], [5, 'Friday', '8:00 AM – 9:00 PM'], [6, 'Saturday', '8:00 AM – 9:00 PM'],
    [0, 'Sunday', '9:00 AM – 1:00 PM']
  ]
};

/* Services menu, in the same shape as the reference site: three groups with sub-pages, then single pages. */
export const menu = [
  { label: 'Teeth Replacement', items: ['teeth-replacement', 'smile-design', 'dentures', 'full-mouth-rehabilitation', 'implants', 'fillings', 'inlays-onlays', 'crowns-bridges'] },
  { label: 'Teeth Alignment', items: ['braces', 'aligners'] },
  { label: 'Pain Management', items: ['root-canal', 'oral-surgery', 'gum-care', 'emergency'] },
  'checkups', 'laser-dentistry', 'sedation-dentistry', 'kids', 'teeth-cleaning', 'whitening', 'oral-cancer-screening', 'in-house-laboratory'
];

/* ---------- treatments ----------
   menu: label in the navigation · card: one line for cards · price: shown as "From …" unless priceText is set
   pos: object-position for the photo · icon: line icon in the "Other treatments" carousel */
export const services = {
  'teeth-replacement': {
    title: 'Teeth Replacement', menu: 'Teeth Replacement', icon: 'replace', price: '$90',
    card: 'Implants, bridges and dentures, compared side by side.',
    lead: 'Implants, bridges and dentures compared honestly, so you can choose the right way to replace missing teeth.',
    facts: [['Options', 'Implants, bridges, dentures'], ['Visits', '2–4 visits'], ['Fee', 'From $90']],
    image: 'svc-teeth-replacement', alt: 'A smiling senior patient checking her teeth in a hand mirror', pos: 'center 30%',
    about: [
      'A missing tooth is more than a gap. Neighbouring teeth drift into the space, the opposite tooth over-grows, chewing moves to one side and the jawbone slowly shrinks where the root used to be.',
      'There are three main ways to replace teeth — a dental implant, a fixed bridge or a removable denture. Each suits different mouths and budgets, so we show you all three side by side, with the time, the cost and how long each is likely to last.'
    ],
    suitable: ['One or more missing teeth', 'A tooth that has to be removed', 'A loose or uncomfortable denture', 'An old bridge that has failed'],
    offers: [
      { title: 'Fixed options', items: ['Single-tooth dental implants', 'Implant-supported bridges', 'Conventional bridges on natural teeth', 'Resin-bonded (Maryland) bridges'] },
      { title: 'Removable options', items: ['Complete dentures', 'Cast-metal partial dentures', 'Flexible partial dentures', 'Implant-retained overdentures'] },
      { title: 'Planning', items: ['Digital X-rays and a 3D scan where needed', 'Side-by-side comparison of options', 'Temporary tooth while you heal', 'Written estimate before treatment'] }
    ],
    steps: [
      ['Examine and scan', 'We check the gap, the neighbouring teeth, your gums and the bone, with a 3D scan if an implant is an option.'],
      ['Compare options', 'You see implants, bridges and dentures side by side — time, comfort, lifespan and cost, in writing.'],
      ['Replace the tooth', 'Treatment follows the plan you choose, with a temporary tooth so you are never left with a gap.']
    ],
    doctor: 'meera-raghunathan',
    faq: [
      ['Which is better — an implant, a bridge or a denture?', 'It depends on the gap, your bone and your budget. Implants last longest and protect the bone; bridges are quicker but rely on the neighbouring teeth; dentures are the most affordable and replace many teeth at once.'],
      ["Do I need to replace a back tooth nobody can see?", 'Usually, yes. Back teeth do most of the chewing, and a gap there lets other teeth tilt and drift, which causes bite problems later.'],
      ['Will I be without teeth during treatment?', 'No. We fit a temporary tooth or denture so you can smile and eat while the final teeth are made.']
    ]
  },

  'smile-design': {
    title: 'Smile Makeovers & Veneers', menu: 'Smile Makeovers', icon: 'smile', price: '$100',
    card: 'Veneers, bonding and crowns, planned digitally before treatment.',
    lead: 'Veneers, bonding and crowns, planned digitally before treatment.',
    facts: [['Treatment time', '2–3 weeks'], ['Visits', '2–3 visits'], ['Fee', 'From $100 per tooth']],
    image: 'svc-smile-design', alt: 'Dentist pointing at a 3D dental scan on a tablet', pos: '40% center',
    about: [
      'Smile design starts with photos and a scan of your face and teeth. We design the new shape, length and shade on screen, then try it in your mouth as a temporary mock-up so you can see it, smile with it and change it.',
      'Only when you are happy do we make the final veneers, bonding or crowns.'
    ],
    suitable: ['Chipped, worn or uneven front teeth', 'Small gaps you would like closed without braces', "Teeth that whitening can't brighten enough", 'Old, discoloured fillings on front teeth'],
    offers: [
      { title: 'Design', items: ['Facial and smile photographs', 'Digital smile design on screen', 'Mock-up you try in your own mouth', 'Shade chosen in daylight'] },
      { title: 'Treatments', items: ['Porcelain veneers', 'Composite bonding', 'All-ceramic crowns', 'Gum contouring for a balanced smile'] },
      { title: 'Looking after it', items: ['Night guard if you grind', 'Polish at every check-up', 'Care guide for veneers', 'Repair plan if anything chips'] }
    ],
    steps: [
      ['Photos and scan', 'We photograph your smile and scan your teeth to build an accurate digital model.'],
      ['Design and try-in', 'You see the proposed smile on screen, then wear a temporary mock-up to test it.'],
      ['Make it real', 'Final veneers or bonding are crafted to the approved design and fitted.']
    ],
    doctor: 'kavya-ramesh',
    faq: [
      ['Do veneers ruin your natural teeth?', 'Modern veneers need very little enamel removed — sometimes none, with bonding. We always choose the most conservative option that gives the result you want.'],
      ['Will they look fake?', 'Not when they are designed around your face. That is what the mock-up stage is for: you approve the shape and shade before anything permanent happens.'],
      ['Bonding or porcelain — which is better?', 'Bonding is quicker, cheaper and easy to repair; porcelain lasts longer and resists stains. We show you both side by side.']
    ]
  },

  dentures: {
    title: 'Dentures', menu: 'Dentures', icon: 'dentures', price: '$90',
    card: 'Complete and partial dentures made in our own laboratory.',
    lead: 'Comfortable complete and partial dentures that fit well and look natural.',
    facts: [['Treatment time', '3–4 weeks'], ['Visits', '4–5 visits'], ['Fee', 'From $90']],
    image: 'svc-dentures', alt: 'A dentist showing a senior patient how to care for her dentures', pos: 'center 40%',
    about: [
      'Modern dentures look far more natural than many people expect. We make them in our own laboratory from accurate impressions of your mouth, with teeth chosen to suit your face, age and skin tone.',
      'A denture that rocks or rubs is usually a denture that no longer fits. As the gums and bone change over the years, a reline or a new denture — or a few implants to hold it — can make eating comfortable again.'
    ],
    suitable: ['Several or all teeth missing', 'A denture that is loose, broken or sore', 'Difficulty chewing with your current teeth', 'A budget-friendly alternative to implants'],
    offers: [
      { title: 'Denture types', items: ['Complete (full) dentures', 'Cast-metal partial dentures', 'Flexible, metal-free partials', 'Immediate dentures after extractions'] },
      { title: 'A better fit', items: ['Impressions in custom trays', 'Bite record and wax try-in', 'Teeth matched to your face', 'Soft relines for tender gums'] },
      { title: 'Repairs and aftercare', items: ['Same-day denture repairs', 'Relines as your gums change', 'Implant-retained overdentures', 'Cleaning and night-time care guide'] }
    ],
    steps: [
      ['Impressions', 'Accurate moulds of your gums and a record of how your jaws meet.'],
      ['Try-in', 'You see and test the teeth set in wax, and we adjust the look and bite before it is finished.'],
      ['Fit and adjust', 'The finished denture is fitted, with review visits to ease any sore spots.']
    ],
    doctor: 'meera-raghunathan',
    faq: [
      ['How long does it take to get used to dentures?', 'Most people feel comfortable within two to four weeks. Speaking and eating soft food come first; harder food gets easier with practice.'],
      ['Should I wear my dentures at night?', "We advise taking them out at night to rest your gums, and keeping them in water or a cleaning solution so they don't dry out."],
      ['Can implants stop my denture moving?', 'Yes. Two to four implants with clip-on attachments can hold a lower denture firmly in place, which most patients find life-changing.']
    ]
  },

  'full-mouth-rehabilitation': {
    title: 'Full Mouth Rehabilitation', menu: 'Full Mouth Rehabilitation', icon: 'fullmouth', price: '$1,500',
    card: 'Crowns, bridges and implants planned as one complete treatment.',
    lead: 'Rebuilding worn, broken or missing teeth across the whole mouth, planned as one complete treatment.',
    facts: [['Treatment time', '2–6 months'], ['Visits', '6–10 visits'], ['Fee', 'From $1,500']],
    image: 'svc-full-mouth', alt: 'A fixed full-arch implant bridge on a blue background', pos: 'center',
    about: [
      'When many teeth are worn down, broken, missing or failing, fixing them one at a time rarely works. Full mouth rehabilitation looks at your bite, your jaw joints, your gums and the appearance of your smile together, then rebuilds them as a single plan.',
      'Depending on what you need, the plan may combine crowns, bridges, implants, root canal treatment and gum care. You see the finished result as a mock-up before treatment begins, and you know the stages and the cost from day one.'
    ],
    suitable: ['Many worn, broken or missing teeth', 'Teeth worn short from grinding', 'Repeated failed fillings and crowns', 'A collapsed or uncomfortable bite'],
    offers: [
      { title: 'Assessment', items: ['Full set of X-rays and a 3D scan', 'Bite and jaw-joint analysis', 'Photographs and digital smile design', 'Staged plan with fixed costs'] },
      { title: 'Treatment options', items: ['Crowns and bridges on natural teeth', 'Fixed full arches on four to six implants', 'Implant-retained dentures', 'Root canal and gum treatment as needed'] },
      { title: 'Protecting the result', items: ['Temporary teeth to test the new bite', 'Night guard to protect the work', 'Three-monthly reviews in the first year', 'Long-term maintenance plan'] }
    ],
    steps: [
      ['Records and design', 'X-rays, a 3D scan, photos and bite records let us design the new smile on screen.'],
      ['Test drive', 'You wear temporary teeth with the new shape and bite, so we can fine-tune comfort and looks.'],
      ['Final teeth', 'The permanent crowns, bridges or implant teeth are made in our laboratory and fitted in stages.']
    ],
    doctor: 'meera-raghunathan',
    faq: [
      ['How long does full mouth rehabilitation take?', 'Most cases take two to six months. Treatment involving implants takes longer because the bone needs time to heal around them.'],
      ['Will I have teeth throughout treatment?', 'Yes. Temporary teeth are fitted at every stage, so you can eat and smile normally while the final teeth are made.'],
      ['Can it be done in stages to spread the cost?', 'Yes. We often split treatment into phases — one jaw at a time, for example — and EMI options are available.']
    ]
  },

  implants: {
    title: 'Dental Implants', menu: 'Dental Implants', icon: 'implant', price: '$360',
    card: 'Fixed, natural-looking replacements for missing teeth.',
    lead: 'Fixed, natural-looking replacements for missing teeth.',
    facts: [['Treatment time', 'About 60 minutes to place'], ['Visits', '2–3 visits over 3 months'], ['Fee', 'From $360 with crown']],
    image: 'svc-implants', alt: 'Model showing a dental implant between two natural teeth', pos: 'center 55%',
    about: [
      'An implant is a small titanium post that replaces the root of a missing tooth. Once the bone has bonded to it, we fit a crown on top that is fixed in place — no clips, no adhesive, nothing to take out at night.',
      'Implants also stop the jawbone shrinking where a tooth is missing, which a bridge or a denture cannot do.'
    ],
    suitable: ['One or more missing teeth', 'A loose bridge or a denture that moves', "Teeth that can't be saved and need to come out", 'You want a fixed option rather than a removable one'],
    offers: [
      { title: 'Planning', items: ['3D CBCT scan of the jawbone', 'Digital plan of the implant position', 'Bone-graft assessment if needed', 'Fixed price agreed in writing'] },
      { title: 'Implant options', items: ['Single-tooth implants', 'Implant-supported bridges', 'Fixed full arches on four to six implants', 'Implant-retained dentures'] },
      { title: 'Aftercare', items: ['Review after one week', 'Crown fitting once healed', 'Annual implant check', 'Cleaning routine for implants'] }
    ],
    steps: [
      ['Scan and plan', 'A 3D scan shows exactly how much bone you have, so the plan and the price are fixed before anything starts.'],
      ['Place the implant', 'A gentle, numbed procedure — most patients are back at work the next day.'],
      ['Fit the crown', 'After about three months of healing, the final tooth is fitted and matched to your smile.']
    ],
    doctor: 'vikram-sundaram',
    faq: [
      ['How long do implants last?', 'With good cleaning and regular check-ups, implants commonly last decades. The crown on top may need replacing after 10–15 years, like any crown.'],
      ['Am I too old for an implant?', 'Age itself is rarely the issue — bone volume and general health matter more. Many of our implant patients are in their sixties and seventies.'],
      ["What if I don't have enough bone?", 'A bone graft can often rebuild the area first. The 3D scan tells us up front, so it is part of the plan and the price from day one.']
    ]
  },

  fillings: {
    title: 'Fillings', menu: 'Fillings', icon: 'filling', price: '$17',
    card: 'Tooth-coloured fillings matched to your shade, in one visit.',
    lead: 'Tooth-coloured fillings that repair decay and small chips in a single visit.',
    facts: [['Treatment time', '20–45 minutes'], ['Visits', '1 visit'], ['Fee', 'From $17']],
    image: 'svc-fillings', alt: 'A dentist setting a tooth-coloured filling with a curing light', pos: 'center 35%',
    about: [
      'When decay is caught early, a filling is all a tooth needs. We remove the decayed part gently, then rebuild the tooth with tooth-coloured composite that bonds to the enamel and is matched to your shade.',
      'Small cavities rarely hurt, which is why regular check-ups matter. Left alone, decay spreads towards the nerve — and a simple filling becomes a root canal.'
    ],
    suitable: ['A cavity found at a check-up', 'Food catching between two teeth', 'A small chip or crack', 'Old silver fillings you would like replaced'],
    offers: [
      { title: 'Filling materials', items: ['Tooth-coloured composite', 'Glass ionomer for children and roots', 'Ceramic inlays for larger cavities', 'Temporary fillings in emergencies'] },
      { title: 'Comfort', items: ['Numbing gel before any injection', 'Gentle, slow anaesthetic', 'Rubber dam to keep the tooth dry', 'Most fillings done in one visit'] },
      { title: 'After your filling', items: ['Bite checked and polished', 'Eat once the numbness wears off', 'Advice to reduce new decay', 'Review at your next check-up'] }
    ],
    steps: [
      ['Find it', 'A close look and a digital X-ray show how deep the decay goes.'],
      ['Clean it', 'The tooth is numbed and the decay removed, keeping as much healthy tooth as possible.'],
      ['Rebuild it', 'Tooth-coloured composite is built up in layers, set with a curing light and polished to match.']
    ],
    doctor: 'arjun-prakash',
    faq: [
      ['Do tooth-coloured fillings last?', 'Modern composite fillings commonly last seven to ten years or more with good care. Very large cavities may do better with an inlay or onlay.'],
      ['Should I replace my old silver fillings?', "Only if they are cracked, leaking or decayed underneath, or you want the look improved. Sound amalgam fillings don't need to be removed."],
      ['Can I eat after a filling?', 'Composite sets hard straight away, so you can eat once the numbness has worn off — usually within two to three hours.']
    ]
  },

  'inlays-onlays': {
    title: 'Inlays & Onlays', menu: 'Inlays & Onlays', icon: 'inlay', price: '$95',
    card: 'Made-to-measure ceramic repairs that save more natural tooth.',
    lead: 'Precise ceramic restorations for teeth too damaged for a filling, but not in need of a crown.',
    facts: [['Treatment time', 'Two visits, a few days apart'], ['Visits', '2 visits'], ['Fee', 'From $95']],
    image: 'svc-inlays-onlays', alt: 'Dental model of a back tooth with a blue inlay restoration', pos: 'center',
    about: [
      'An inlay fits inside the grooves of a back tooth; an onlay also covers one or more of its chewing cusps. Both are made outside the mouth — in our in-house laboratory — from strong ceramic or composite, then bonded into place.',
      'Because they are made to measure, inlays and onlays fit more precisely and wear better than a large filling, while saving far more natural tooth than a full crown.'
    ],
    suitable: ['A large or failing old filling', 'A cracked cusp on a back tooth', 'Decay too large for a simple filling', 'You want to keep more natural tooth than a crown allows'],
    offers: [
      { title: 'Materials', items: ['Lithium disilicate ceramic', 'Zirconia for heavy biters', 'Laboratory composite', 'Gold on request'] },
      { title: 'Precision', items: ['Digital scan or accurate impression', 'Made in our in-house laboratory', 'Shade matched in clinic', 'Bonded with adhesive cement'] },
      { title: 'Aftercare', items: ['Bite checked and polished', 'Night guard if you grind', 'Review at check-ups', 'Usually lasts 10–15 years'] }
    ],
    steps: [
      ['Prepare and scan', 'The old filling and decay are removed, the tooth is shaped and scanned, and a temporary placed.'],
      ['Craft in the lab', 'Our technicians make the inlay or onlay to your scan and shade, usually within three days.'],
      ['Bond in place', 'The restoration is tried in, checked for fit and bite, then bonded permanently.']
    ],
    doctor: 'arjun-prakash',
    faq: [
      ['What is the difference between an inlay and an onlay?', 'An inlay sits within the cusps of a tooth, like a filling. An onlay covers one or more cusps too, which protects a weakened tooth from cracking.'],
      ['Why not just have a crown?', 'A crown needs the tooth shaped down on all sides. An onlay keeps the healthy walls of the tooth, which is better for the tooth in the long term.'],
      ['Is it painful?', 'The tooth is numbed for the first visit, much like a filling. The second visit is usually comfortable without anaesthetic.']
    ]
  },

  'crowns-bridges': {
    title: 'Crowns & Bridges', menu: 'Crowns & Bridges', icon: 'crown', price: '$60',
    card: 'Crowns to protect damaged teeth; bridges to replace missing ones.',
    lead: 'Strong, natural-looking crowns to protect damaged teeth, and fixed bridges to replace missing ones.',
    facts: [['Treatment time', '5–7 days'], ['Visits', '2 visits'], ['Fee', 'From $60 per tooth']],
    image: 'svc-crowns-bridges', alt: 'A dental technician placing a ceramic crown on a model', pos: 'center',
    about: [
      'A crown is a cap that covers a tooth completely, restoring its shape and strength. It protects a tooth that is cracked, heavily filled or root-treated, and can transform the look of a discoloured tooth.',
      'A bridge replaces one or more missing teeth by joining an artificial tooth to crowns on the teeth either side. It is fixed in place, so there is nothing to take out — and it can also be supported by implants.'
    ],
    suitable: ['A cracked or heavily filled tooth', 'A tooth after root canal treatment', 'A badly discoloured or misshapen tooth', 'One or two missing teeth'],
    offers: [
      { title: 'Crown materials', items: ['Monolithic zirconia', 'All-ceramic (E.max) for front teeth', 'Metal-ceramic (PFM)', 'Implant crowns'] },
      { title: 'Bridges', items: ['Conventional fixed bridges', 'Implant-supported bridges', 'Resin-bonded (Maryland) bridges', 'Temporary bridge while you wait'] },
      { title: 'Made to fit', items: ['Digital scan or impression', 'Made in our in-house laboratory', 'Shade matched in daylight', 'Bite fine-tuned at fitting'] }
    ],
    steps: [
      ['Prepare', 'The tooth is numbed and shaped, a scan taken and a temporary crown fitted the same day.'],
      ['Craft', 'Our laboratory makes your crown or bridge to the scan, matched to the shade of your teeth.'],
      ['Fit', 'The final crown or bridge is checked for fit, bite and colour, then cemented in place.']
    ],
    doctor: 'meera-raghunathan',
    faq: [
      ['How long do crowns last?', 'With good care, ten to fifteen years or more. Grinding, biting hard objects and poor cleaning shorten their life.'],
      ['Zirconia or porcelain — which should I choose?', 'Zirconia is extremely strong and suits back teeth; all-ceramic crowns are the most lifelike for front teeth. We advise based on where the tooth is and how you bite.'],
      ['How do I clean under a bridge?', 'With a floss threader or a small interdental brush every day. We show you how at the fitting appointment.']
    ]
  },

  braces: {
    title: 'Braces (Orthodontics)', menu: 'Braces (Orthodontics)', icon: 'braces', price: '$400',
    card: 'Metal and tooth-coloured ceramic braces for children and adults.',
    lead: 'Metal and tooth-coloured ceramic braces to straighten teeth and correct the bite, for children and adults.',
    facts: [['Treatment time', '12–24 months'], ['Visits', 'Reviews every 4–6 weeks'], ['Fee', 'From $400']],
    image: 'svc-braces', alt: 'A smiling young woman wearing braces', pos: 'center 30%',
    about: [
      'Braces use small brackets bonded to the teeth and a thin wire to move them gradually into line. They can correct crowding, gaps and bite problems that aligners sometimes cannot, and they work around the clock without you having to remember anything.',
      'Tooth-coloured ceramic brackets are far less noticeable than metal ones. Before you choose, we show you a digital preview of how your teeth will move — and compare braces with clear aligners on time, comfort and cost.'
    ],
    suitable: ['Crowded or overlapping teeth', 'Gaps between teeth', 'An overbite, underbite or crossbite', 'A child aged seven or older due an orthodontic check'],
    offers: [
      { title: 'Assessment', items: ['Digital scan instead of messy moulds', 'Bite and jaw-joint check', 'X-rays and facial photographs', 'Written comparison of options'] },
      { title: 'Brace options', items: ['Metal braces', 'Tooth-coloured ceramic braces', 'Early (interceptive) treatment for children', 'Clear aligners as an alternative'] },
      { title: 'During and after', items: ['Reviews every 4–6 weeks', 'Same-day help for a broken bracket', 'Orthodontic cleaning kit', 'Retainers to keep the result'] }
    ],
    steps: [
      ['Scan and plan', 'A digital scan, X-rays and photos show what needs to move and how long it will take.'],
      ['Fit the braces', 'Brackets are bonded and the wire fitted in one comfortable visit of about an hour.'],
      ['Adjust and finish', 'Short reviews every few weeks move the teeth on; retainers hold them once the braces come off.']
    ],
    doctor: 'meera-krishnan',
    faq: [
      ['Do braces hurt?', 'Teeth feel tender for a few days after fitting and after each adjustment. Soft food and ordinary painkillers help, and the discomfort settles quickly.'],
      ['Braces or clear aligners — which is better for me?', 'Braces suit complex movements and people who would rather not manage removable trays. Aligners are nearly invisible but need wearing 22 hours a day. We show you both.'],
      ["What can't I eat with braces?", 'Hard and sticky foods — nuts, toffees, hard sweets and corn on the cob — can break brackets. We give you a full list at the fitting.']
    ]
  },

  aligners: {
    title: 'Clear Aligners', menu: 'Clear Aligners', icon: 'aligner', price: '$1,200',
    card: 'Nearly invisible, removable trays that straighten teeth.',
    lead: 'Nearly invisible, removable aligners that straighten teeth without brackets or wires.',
    facts: [['Treatment time', '6–18 months'], ['Visits', 'Reviews every 6–8 weeks'], ['Fee', 'From $1,200']],
    image: 'svc-aligners', alt: 'Hands holding clear dental aligners and their case', pos: 'center',
    about: [
      'Clear aligners are thin, transparent trays made from a 3D plan of your teeth. You change to a new set every one to two weeks, and each set moves your teeth a fraction of a millimetre towards their final position.',
      'Because they come out to eat and brush, there are no food restrictions and cleaning is easy. Before you start, you see a 3D preview of how your teeth will move and where they will finish.'
    ],
    suitable: ['Mild to moderate crowding', 'Small gaps between teeth', 'Teeth that have shifted since earlier braces', 'Adults who would prefer not to wear braces'],
    offers: [
      { title: 'Assessment', items: ['Digital scan instead of messy moulds', 'Bite and jaw-joint check', '3D preview of the final result', 'Honest advice if braces would work better'] },
      { title: 'Treatment', items: ['Custom aligner sets from a 3D plan', 'Small tooth-coloured attachments', 'Refinement aligners if needed', 'Optional whitening at the end'] },
      { title: 'During and after', items: ['Reviews every 6–8 weeks', 'Aligner progress checks', 'Clear retainers to hold the result', 'Cleaning kit and coaching'] }
    ],
    steps: [
      ['Scan and preview', 'A quick digital scan becomes a 3D model, so you can see the finished smile before deciding.'],
      ['Collect your aligners', 'We place small attachments and show you how to fit, remove and clean the trays.'],
      ['Change and review', 'You switch trays at home every one to two weeks and visit us for short check-ins.']
    ],
    doctor: 'meera-krishnan',
    faq: [
      ['Am I too old for aligners?', 'No. Adults make up a large share of our orthodontic patients, and clear aligners are especially popular because they are hard to notice.'],
      ['How long do I wear aligners each day?', 'About 22 hours a day. You take them out only to eat, to drink anything other than water, and to brush.'],
      ['Will my teeth move back afterwards?', 'They can, which is why everyone gets a retainer. Wearing it as advised keeps the result for good.']
    ]
  },

  'root-canal': {
    title: 'Root Canal Treatment', menu: 'Root Canal Treatment', icon: 'rootcanal', price: '$50',
    card: 'Painless treatment that saves an infected tooth, often in one visit.',
    lead: 'Treatment for painful or infected teeth, usually completed in one or two visits.',
    facts: [['Treatment time', '60–90 minutes'], ['Visits', '1–2 visits'], ['Fee', 'From $50']],
    image: 'svc-root-canal', alt: 'Dentist reviewing dental X-ray scans on a light box', pos: 'center 30%',
    about: [
      'When decay or a crack reaches the nerve inside a tooth, the pain rarely goes away on its own. A root canal removes the infected pulp, cleans and seals the canals, and lets you keep your own tooth.',
      'With rotary instruments, magnification and proper anaesthesia, most of our patients compare the experience to having a filling.'
    ],
    suitable: ['Throbbing or lingering pain, especially at night', "Sensitivity to hot or cold that doesn't fade", 'A swollen gum or a small pimple near one tooth', 'A tooth that has darkened after an injury'],
    offers: [
      { title: 'Diagnosis', items: ['Digital X-ray of the affected tooth', 'Vitality and bite tests', 'A clear answer on whether it can be saved', 'Written estimate before we start'] },
      { title: 'Treatment', items: ['Single-sitting root canals where possible', 'Rotary files for cleaner, faster canals', 'Re-treatment of older root canals', 'Work under magnification'] },
      { title: 'Protecting the tooth', items: ['Core build-up to rebuild the tooth', 'Zirconia or metal-ceramic crown', 'Bite check after the crown is fitted', 'Review X-ray at six months'] }
    ],
    steps: [
      ['Find the cause', 'We pinpoint the tooth with a bite test and digital X-ray, then tell you whether it can be saved.'],
      ['Clean and seal', 'Under local anaesthetic, the infected pulp is removed and the canals cleaned and sealed — often in one sitting.'],
      ['Crown it', 'A crown fitted a week or two later stops the treated tooth from cracking.']
    ],
    doctor: 'arjun-prakash',
    faq: [
      ['Does a root canal hurt?', 'The treatment is done under local anaesthetic and feels much like a filling. The tooth may be tender for a few days afterwards, which ordinary painkillers handle.'],
      ['Do I really need a crown afterwards?', 'For back teeth, almost always. A root-treated tooth is more brittle, and a crown is what stops it splitting when you chew.'],
      ["Wouldn't it be easier to take the tooth out?", "Keeping your own tooth is usually cheaper and better in the long run than an extraction followed by an implant or bridge. If a tooth genuinely can't be saved, we will say so."]
    ]
  },

  'oral-surgery': {
    title: 'Oral Surgery', menu: 'Oral Surgery', icon: 'extraction', price: '$12',
    card: 'Gentle extractions and wisdom tooth removal, with sedation if needed.',
    lead: 'Gentle tooth extractions, wisdom tooth removal and minor oral surgery, with sedation if you are anxious.',
    facts: [['Treatment time', '20–60 minutes'], ['Visits', '1 visit plus a review'], ['Fee', 'From $12']],
    image: 'svc-oral-surgery', alt: 'An oral surgeon preparing to treat a patient in a dental chair', pos: 'center 40%',
    about: [
      "Sometimes a tooth can't be saved, or a wisdom tooth has no room to come through and keeps getting infected. Our oral and maxillofacial surgeon removes teeth as gently as possible, often without stitches, under thorough local anaesthetic.",
      'Impacted wisdom teeth are planned on an X-ray or 3D scan first, so we can see the roots and the nerve before we begin. If you are nervous, conscious sedation can help you stay relaxed throughout.'
    ],
    suitable: ['A painful or repeatedly swollen wisdom tooth', 'A tooth too broken or decayed to save', 'Teeth to be removed before braces or dentures', 'A cyst, lump or sore that needs a biopsy'],
    offers: [
      { title: 'Procedures', items: ['Simple and surgical extractions', 'Impacted wisdom tooth removal', 'Bone grafting before implants', 'Biopsies of mouth lesions'] },
      { title: 'Comfort', items: ['Thorough local anaesthetic', 'Conscious sedation if you are anxious', 'Gentle, bone-preserving techniques', 'Dissolving stitches where needed'] },
      { title: 'Recovery', items: ['Written aftercare instructions', 'Pain relief plan', 'Helpline if you are worried', 'Review after a week'] }
    ],
    steps: [
      ['Assess', 'An X-ray or 3D scan shows the root shape and position before anything is decided.'],
      ['Treat', 'Under local anaesthetic, with sedation if you wish, the tooth is removed as gently as possible.'],
      ['Recover', 'You go home with clear instructions; most people are back to normal within two to three days.']
    ],
    doctor: 'arvind-subramanian',
    faq: [
      ['Do all wisdom teeth need to come out?', 'No. We only recommend removal if a wisdom tooth is causing pain, infection, decay or damage to the tooth next to it.'],
      ['How painful is recovery?', 'Expect some swelling and soreness for two to three days, which ordinary painkillers and cold compresses manage well.'],
      ['What should I eat afterwards?', 'Soft, cool food for the first day — curd rice, idli, soup that is not too hot. Avoid smoking and drinking through a straw, which can disturb healing.']
    ]
  },

  'gum-care': {
    title: 'Periodontal (Gum) Therapy', menu: 'Periodontal Therapy', icon: 'gum', price: '$17',
    card: 'Treatment for bleeding gums, gum disease and recession.',
    lead: 'Treatment for bleeding gums, gum disease and recession.',
    facts: [['Treatment time', '45–60 minutes'], ['Visits', '1–3 visits'], ['Fee', 'From $17']],
    image: 'svc-gum-care', alt: 'Dental hygienist treating a patient in a bright clinic', pos: '62% 30%',
    about: [
      'Gum disease is the most common reason adults lose teeth, and it is usually painless until it is advanced. Bleeding when you brush is the early warning.',
      'We measure the pockets around each tooth, clean below the gumline where bacteria hide, and help you keep the gums healthy so the bone holding your teeth stays put.'
    ],
    suitable: ['Gums that bleed when you brush or floss', 'Persistent bad breath', 'Teeth that look longer or feel loose', 'Diabetes, which raises the risk of gum disease'],
    offers: [
      { title: 'Assessment', items: ['Pocket charting around every tooth', 'X-rays to check bone levels', 'Risk review, including diabetes and smoking', 'Written plan and cost'] },
      { title: 'Treatment', items: ['Deep cleaning below the gumline', 'Local antibiotic therapy where needed', 'Laser-assisted pocket therapy', 'Gum grafts for recession'] },
      { title: 'Keeping it healthy', items: ['Maintenance cleans every 3–4 months', 'Interdental brush sizing', 'Re-charting to track progress', 'Support to stop smoking'] }
    ],
    steps: [
      ['Measure', 'We chart the gum pockets around each tooth so we know exactly where the problem is.'],
      ['Deep clean', "Under local anaesthetic, we clean the roots below the gumline where brushing can't reach."],
      ['Re-check', 'After six to eight weeks we measure again to confirm the gums have tightened.']
    ],
    doctor: 'vikram-sundaram',
    faq: [
      ['Are bleeding gums serious?', 'They are the earliest sign of gum disease — and the stage at which it is fully reversible. It is worth a check rather than simply brushing more gently.'],
      ['Is deep cleaning painful?', 'We numb the area first, so it is comfortable. The gums may be tender for a day or two.'],
      ['Can lost gum or bone grow back?', "Lost bone usually doesn't regrow on its own, which is why early treatment matters. Gum grafts can cover exposed roots in some cases."]
    ]
  },

  emergency: {
    title: 'Emergency Dental Care', menu: 'Emergency Dental Care', icon: 'emergency', price: '$8', priceText: 'Consultation $8',
    card: 'Same-day appointments for pain, swelling and broken teeth.',
    lead: 'Same-day appointments for pain, swelling and broken teeth.',
    facts: [['Availability', 'Same-day slots'], ['Helpline', 'Answered 24/7'], ['Fee', 'Consultation $8']],
    image: 'svc-emergency', alt: 'Two dentists treating a patient in a clinic', pos: 'center 30%',
    about: [
      "Dental emergencies don't keep office hours. We hold same-day slots every day for severe toothache, swelling, broken or knocked-out teeth and lost crowns.",
      'Our helpline is answered round the clock, so you know what to do before you even reach us.'
    ],
    suitable: ['Severe or throbbing toothache', 'Swelling of the face or gum', 'A broken, chipped or knocked-out tooth', 'A lost crown or filling, or a broken denture'],
    offers: [
      { title: 'Urgent relief', items: ['Same-day pain relief', 'Draining of abscesses', 'Temporary fillings', 'Medication advice'] },
      { title: 'Repairs', items: ['Re-cementing lost crowns', 'Repairing chipped teeth', 'Splinting loose or knocked teeth', 'Denture repairs'] },
      { title: 'Before you arrive', items: ['Knocked-out tooth: keep it in milk', 'Swelling: a cold compress, not heat', 'Bleeding: bite on clean gauze', 'Call us — we will talk you through it'] }
    ],
    steps: [
      ['Call us', 'Ring the helpline. We give first-aid advice and hold the earliest slot for you.'],
      ['Get relief', 'We find the cause and stop the pain first — usually in the same visit.'],
      ['Fix it properly', 'Once you are comfortable, we plan the lasting repair and its cost.']
    ],
    doctor: 'arjun-prakash',
    faq: [
      ['What if a tooth gets knocked out?', 'Pick it up by the crown, not the root, rinse it gently and keep it in milk or inside your cheek. Come in within an hour if you can — that gives it the best chance of being saved.'],
      ['Is facial swelling an emergency?', 'Yes. Swelling that spreads towards the eye or makes swallowing difficult needs urgent care. Call us — and go straight to a hospital if your breathing is affected.'],
      ['Do you see emergencies on Sundays?', 'Yes. We keep emergency slots on Sunday mornings, and the helpline is answered 24/7.']
    ]
  },

  checkups: {
    title: 'Preventive Dentistry', menu: 'Preventive Dentistry', icon: 'preventive', price: '$6',
    card: 'Check-ups, X-rays, sealants and fluoride that stop problems early.',
    lead: 'Six-monthly check-ups, digital X-rays, sealants and fluoride that stop small problems becoming big ones.',
    facts: [['Treatment time', '30–45 minutes'], ['Visits', 'Every 6 months'], ['Fee', 'From $6']],
    image: 'svc-checkups', alt: "Dentist examining a patient's teeth with a mirror and scaler", pos: '30% center',
    about: [
      "A proper check-up is more than a quick look. We examine every tooth and your gums, take low-dose digital X-rays when they are due, and clean away the tartar a brush can't reach.",
      "Catching a small cavity now costs a filling. Finding it in two years' time costs a root canal — which is why we treat the six-monthly visit as the most valuable appointment we offer."
    ],
    suitable: ["You haven't seen a dentist in the last six months", 'Your gums bleed when you brush or floss', 'You have stains from tea, coffee or smoking', "Bad breath that brushing doesn't fix"],
    offers: [
      { title: 'Examination', items: ['Full tooth-by-tooth and gum check', 'Low-dose digital X-rays when due', 'Oral cancer screening', 'Written notes on anything to watch'] },
      { title: 'Cleaning', items: ['Ultrasonic scaling of tartar', 'Polishing to lift surface stains', 'Fluoride varnish on request', 'Brushing and flossing coaching'] },
      { title: 'Prevention', items: ['Pit-and-fissure sealants', 'Night guards for grinding', 'Diet advice on sugar and acid', 'Six-monthly reminder by SMS'] }
    ],
    steps: [
      ['Quick history', 'We ask about pain, sensitivity and any medicines — five minutes, no forms to dread.'],
      ['Exam and X-rays', 'A full check and, if needed, low-dose digital X-rays you can see on screen.'],
      ['Clean and plan', 'Scaling and polish, then a plain-language summary of what is healthy and what to watch.']
    ],
    doctor: 'arjun-prakash',
    faq: [
      ['Does scaling damage enamel?', 'No. Ultrasonic scaling removes hardened tartar sitting on the tooth, not the enamel itself. Teeth can feel sensitive for a day or two as gums that were covered by tartar settle down.'],
      ['How often should I come in?', 'Every six months for most people. If you have gum disease or a lot of dental work, we may suggest every three to four months.'],
      ['Are dental X-rays safe?', 'Our digital sensors use a small fraction of the dose of old film X-rays, and we only take them when the result will change a decision.']
    ]
  },

  'laser-dentistry': {
    title: 'Laser Dentistry', menu: 'Laser Dentistry', icon: 'laser', price: '$40',
    card: 'Gentler gum treatment with less bleeding and faster healing.',
    lead: 'Dental lasers for gentler gum treatment, faster healing and less need for stitches.',
    facts: [['Treatment time', '15–60 minutes'], ['Visits', 'Usually 1 visit'], ['Fee', 'From $40']],
    image: 'svc-laser', alt: 'A smiling patient wearing protective glasses for laser treatment', pos: 'center 40%',
    about: [
      'A dental laser uses a focused beam of light to treat soft tissue precisely. It seals small blood vessels and nerve endings as it works, so there is less bleeding, less swelling and often no need for stitches.',
      'We use lasers for gum contouring, treating gum pockets, releasing a tongue-tie, healing mouth ulcers, reducing sensitivity and disinfecting root canals. Many laser treatments need little or no anaesthetic.'
    ],
    suitable: ["A 'gummy' or uneven gumline", 'Gum disease with deep pockets', 'Painful ulcers or cold sores', 'A tongue-tie or tight lip attachment'],
    offers: [
      { title: 'Gum treatments', items: ['Gum contouring and reshaping', 'Laser-assisted pocket therapy', 'Crown lengthening', 'Treatment of gum overgrowth'] },
      { title: 'Other uses', items: ['Tongue-tie and lip-tie release', 'Ulcer and cold-sore relief', 'Desensitising sensitive teeth', 'Root canal disinfection'] },
      { title: 'Why patients like it', items: ['Little or no bleeding', 'Often no stitches', 'Faster, more comfortable healing', 'Many treatments need no injection'] }
    ],
    steps: [
      ['Check suitability', 'We examine the area and explain whether a laser or a conventional approach suits you best.'],
      ['Treat', 'Everyone wears protective glasses; the laser treatment itself usually takes minutes.'],
      ['Heal', 'Most people go straight back to normal activities, with a simple aftercare routine.']
    ],
    doctor: 'kavya-ramesh',
    faq: [
      ['Is laser treatment safe?', 'Yes. Dental lasers are low-power and used by trained dentists. Everyone in the room wears protective glasses during treatment.'],
      ['Does it hurt?', 'Many soft-tissue procedures need only numbing gel. If an injection is needed, it is usually a smaller dose than for conventional surgery.'],
      ['Can lasers replace the drill?', 'Not for every job. Lasers are best for gums and soft tissue; most fillings still need conventional instruments.']
    ]
  },

  'sedation-dentistry': {
    title: 'Sedation Dentistry', menu: 'Sedation Dentistry', icon: 'sedation', price: '$45',
    card: 'Calm, comfortable treatment for anxious patients.',
    lead: 'Calm, comfortable treatment for anxious patients and longer procedures.',
    facts: [['Options', 'Inhaled or oral sedation'], ['Recovery', 'Same day'], ['Fee', 'From $45 per session']],
    image: 'svc-sedation', alt: 'A patient resting calmly in a dental chair with her eyes closed', pos: 'center 40%',
    about: [
      'If fear of the dentist has kept you away, you are not alone — and you don\'t have to grit your teeth through treatment. Conscious sedation helps you feel calm and drowsy while staying able to respond, and many patients remember little of the appointment afterwards.',
      'Sedation is given and monitored by our oral surgeon, with your oxygen level and pulse checked throughout. It is also useful for long procedures such as wisdom tooth removal, implants or full mouth treatment.'
    ],
    suitable: ['Dental anxiety or a bad past experience', 'A strong gag reflex', 'Long or complex treatment', 'Difficulty getting numb with local anaesthetic'],
    offers: [
      { title: 'Sedation options', items: ['Inhaled sedation (nitrous oxide)', 'Oral sedation tablets', 'Combined with local anaesthetic', 'Hospital referral for general anaesthesia'] },
      { title: 'Safety', items: ['Medical history review beforehand', 'Pulse and oxygen monitoring', 'Trained, certified team', 'Recovery area before you go home'] },
      { title: 'Care for nervous patients', items: ['Longer first appointment', 'Stop signal agreed in advance', 'Treatment explained step by step', 'Music or headphones welcome'] }
    ],
    steps: [
      ['Talk first', 'We discuss your worries, review your health and agree which sedation suits you.'],
      ['Relax and treat', 'The sedation takes effect within minutes, then treatment begins while you are monitored.'],
      ['Rest and go home', 'You rest until steady; after oral sedation, an adult should take you home.']
    ],
    doctor: 'arvind-subramanian',
    faq: [
      ['Will I be asleep?', 'No. Conscious sedation leaves you relaxed and drowsy but able to respond. For treatment under general anaesthesia we refer you to a hospital.'],
      ['Can I drive afterwards?', 'After inhaled sedation, usually yes, once the gas has cleared. After oral sedation you must not drive for the rest of the day, so please bring an adult with you.'],
      ['Is sedation suitable for children?', 'Inhaled sedation can help some anxious children. Our children\'s dentist will advise whether it is right for your child.']
    ]
  },

  kids: {
    title: 'Paediatric Dentistry', menu: 'Paediatric Dentistry', icon: 'kids', price: '$5',
    card: 'Gentle check-ups, fluoride, sealants and fillings for children.',
    lead: 'Check-ups, fluoride, sealants and fillings for children.',
    facts: [['Treatment time', '20–30 minutes'], ['Visits', 'Every 6 months'], ['Fee', 'From $5']],
    image: 'svc-kids', alt: 'A young boy smiling in a dental chair, holding a teeth model', pos: 'center 35%', ratio: [1200, 675],
    about: [
      "A child's first visits shape how they feel about dentists for life. We keep them short, playful and pain-free: counting teeth, riding the chair, a sticker at the end.",
      'Behind the fun is serious prevention — sealants, fluoride and early checks on how the adult teeth are coming in.'
    ],
    suitable: ["A first visit by your child's first birthday", 'Cavities in milk teeth', 'Thumb-sucking, or teeth coming in crowded', 'Children who are anxious about dentists'],
    offers: [
      { title: 'Prevention', items: ['Fluoride varnish', 'Pit-and-fissure sealants', 'Brushing coaching for parents and kids', 'Diet and snacking advice'] },
      { title: 'Treatment', items: ['Tooth-coloured fillings for milk teeth', 'Gentle pulp treatment for milk teeth', 'Space maintainers after early tooth loss', 'Emergency care for knocked teeth'] },
      { title: 'Growing smiles', items: ['Orthodontic screening at age seven', 'Help to break thumb-sucking', 'Sports mouthguards', 'Growth notes at each visit'] }
    ],
    steps: [
      ['Meet and play', 'Your child meets the dentist, explores the chair and counts teeth — no tools until they are ready.'],
      ['Check and protect', 'A quick check, then fluoride or sealants if they are needed.'],
      ['Plan for parents', 'You get a simple home routine and a reminder for the next visit.']
    ],
    doctor: 'meera-krishnan',
    faq: [
      ['When should my child first see a dentist?', 'By their first birthday, or within six months of the first tooth appearing. Early visits are mostly about getting comfortable.'],
      ['Do milk teeth really need fillings?', 'Yes. They hold space for adult teeth and help with chewing and speech. An untreated cavity can cause pain and infection even in a tooth that will fall out later.'],
      ['My child is scared — what do you do?', 'We go at their pace: tell, show, then do. Many anxious children are happily opening up by the second visit.']
    ]
  },

  'teeth-cleaning': {
    title: 'Teeth Cleaning', menu: 'Teeth Cleaning', icon: 'cleaning', price: '$14',
    card: 'Scaling and polishing to remove tartar and stains.',
    lead: 'Professional scaling and polishing to remove tartar and stains, and keep gums healthy.',
    facts: [['Treatment time', '30–45 minutes'], ['Visits', 'Every 6 months'], ['Fee', 'From $14']],
    image: 'svc-teeth-cleaning', alt: "A dental hygienist cleaning a patient's teeth with an ultrasonic scaler", pos: 'center 30%',
    about: [
      "Even with careful brushing, plaque hardens into tartar in places a toothbrush can't reach — behind the lower front teeth and along the gumline. Tartar irritates the gums, causes bad breath and is the starting point for gum disease.",
      'A professional clean removes it with a gentle ultrasonic scaler, then polishes away surface stains from tea, coffee and turmeric. You leave with smoother, brighter teeth and advice for keeping them that way.'
    ],
    suitable: ['Gums that bleed when you brush', 'Visible tartar or stains', 'Bad breath', 'More than six months since your last clean'],
    offers: [
      { title: 'Cleaning', items: ['Ultrasonic scaling', 'Hand scaling for fine deposits', 'Polishing to lift stains', 'Air-polishing for stubborn stains'] },
      { title: 'Protection', items: ['Fluoride varnish on request', 'Desensitising treatment', 'Gum health check', 'Advice on brushes and floss'] },
      { title: 'Keeping it clean', items: ['Six-monthly reminder by SMS', 'Interdental brush sizing', 'Diet advice on staining foods', 'Deep cleaning if gums need it'] }
    ],
    steps: [
      ['Check', 'A quick look at your teeth and gums so we know where to focus.'],
      ['Scale and polish', 'Tartar is removed with a gentle ultrasonic scaler, then the teeth are polished smooth.'],
      ['Coach', 'We show you any areas you are missing and how to clean them at home.']
    ],
    doctor: 'arjun-prakash',
    faq: [
      ['Does a professional clean hurt?', 'Most people find it comfortable. If your teeth or gums are sensitive, we can use numbing gel or a gentler setting.'],
      ['Will cleaning make my teeth white?', 'It removes surface stains, which often makes teeth look noticeably brighter. For a lighter shade than your natural colour, you would need whitening.'],
      ['Is it true that cleaning loosens teeth?', 'No. Tartar can hide gum disease that has already loosened teeth; removing it lets the gums heal and tighten.']
    ]
  },

  whitening: {
    title: 'Teeth Whitening', menu: 'Teeth Whitening', icon: 'whitening', price: '$85',
    card: 'In-clinic and take-home whitening, with care for sensitive teeth.',
    lead: 'In-clinic and take-home whitening, with care for sensitive teeth.',
    facts: [['Treatment time', 'About 75 minutes'], ['Visits', '1 visit'], ['Fee', 'From $85']],
    image: 'svc-whitening', alt: 'Close-up of a bright, white smile', pos: '72% center',
    about: [
      'Tea, coffee, turmeric and time all leave their mark on enamel. Professional whitening uses a stronger, dentist-applied gel than anything sold over the counter, with your gums protected throughout.',
      "We check your teeth first, because whitening won't change fillings or crowns — and we tell you honestly what result to expect."
    ],
    suitable: ['Yellowing from tea, coffee or smoking', 'Teeth that have darkened with age', 'Brightening before a wedding or an event', 'Planning veneers and wanting the best base shade'],
    offers: [
      { title: 'Before whitening', items: ['Check for cavities or exposed roots', 'Starting shade recorded on a guide', 'Scaling to remove surface stain', 'Honest preview of the likely shade'] },
      { title: 'Whitening options', items: ['In-clinic power whitening', 'Custom take-home trays', 'In-clinic plus home kit', 'Touch-up gel for later'] },
      { title: 'Comfort', items: ['Gum barrier during treatment', 'Desensitising gel afterwards', 'Food guide for the first 48 hours', 'Follow-up shade check'] }
    ],
    steps: [
      ['Check and clean', 'We make sure your teeth are healthy enough to whiten and record your starting shade.'],
      ['Whiten', 'Your gums are protected, then the gel is applied in timed cycles while you relax.'],
      ['Compare', 'We match the new shade against the guide and send you home with aftercare.']
    ],
    doctor: 'kavya-ramesh',
    faq: [
      ['Will whitening make my teeth sensitive?', 'Some people feel mild sensitivity for a day or two. We apply a desensitising gel straight afterwards and can adjust the gel strength if you are prone to it.'],
      ['How long does the result last?', 'Typically one to two years, depending on tea, coffee and smoking. A short top-up with home trays keeps it bright.'],
      ['Will it whiten my crowns and fillings?', 'No — whitening only works on natural enamel. If you have visible fillings or crowns, we plan around them first.']
    ]
  },

  'oral-cancer-screening': {
    title: 'Oral Cancer Screening', menu: 'Oral Cancer Screening', icon: 'screening', priceText: 'Free with a check-up',
    card: 'A quick, painless check for early signs of mouth cancer.',
    lead: 'A quick, painless check for early signs of mouth cancer, included at every check-up.',
    facts: [['Treatment time', 'About 5 minutes'], ['Visits', 'At every check-up'], ['Fee', 'Free with a check-up']],
    image: 'svc-oral-cancer', alt: "A dentist in protective gear examining a patient's mouth", pos: 'center 30%',
    about: [
      'Mouth cancer is one of the most common cancers in India, largely because of tobacco, gutka, paan and betel nut. Caught early, it is very often curable; found late, treatment is far harder.',
      "Screening is a simple, painless examination of your lips, cheeks, tongue, gums, palate and neck. If anything looks unusual, we photograph it, review it in two weeks, and arrange a biopsy or specialist referral if it hasn't healed."
    ],
    suitable: ['You smoke or chew tobacco, gutka or paan', 'You drink alcohol regularly', "A mouth ulcer that hasn't healed in two weeks", 'A white or red patch, or a lump in the mouth'],
    offers: [
      { title: 'The examination', items: ['Look-and-feel check of the whole mouth', 'Tongue, floor of mouth and palate', 'Neck and jaw lymph nodes', 'Photographs to track any change'] },
      { title: 'If something is found', items: ['Two-week review', 'Biopsy by our oral surgeon', 'Fast referral to cancer specialists', 'Clear explanation at every step'] },
      { title: 'Lowering your risk', items: ['Support to quit tobacco', 'Advice on alcohol', 'Smoothing sharp teeth and dentures that rub', 'Screening every six months'] }
    ],
    steps: [
      ['Look', 'Lips, cheeks, gums, tongue and palate are examined under a good light.'],
      ['Feel', 'We gently check the floor of the mouth, the jaw and the neck for lumps.'],
      ['Explain', 'You hear the result straight away, and what happens next if anything needs watching.']
    ],
    doctor: 'arvind-subramanian',
    faq: [
      ['Does screening hurt?', 'No. It is a simple look-and-feel examination that takes about five minutes.'],
      ['What warning signs should I look out for?', "An ulcer that doesn't heal within two weeks, a white or red patch, a lump, numbness, or difficulty swallowing. See a dentist if you notice any of these."],
      ["I don't smoke — do I still need screening?", 'Yes. Most cases are linked to tobacco and alcohol, but mouth cancer can occur in anyone, so we check every patient.']
    ]
  },

  'in-house-laboratory': {
    title: 'In-House Laboratory', menu: 'In-House Laboratory', icon: 'lab', priceText: 'Made on site', aboutTitle: 'our in-house laboratory',
    card: 'Crowns, bridges and dentures made on site by our technicians.',
    lead: 'Crowns, bridges, dentures and retainers made on site by our own technicians — faster, and matched in person.',
    facts: [['Crown turnaround', '2–3 days'], ['Repairs', 'Often the same day'], ['Shade matching', 'In person, in daylight']],
    image: 'svc-lab', alt: 'A dental technician shaping crowns on models in a laboratory', pos: 'center',
    about: [
      'Most clinics send their work to an outside laboratory and wait a week or two. Our technicians work in the same building as our dentists, so crowns, bridges, veneers and dentures are made faster — and the technician can see your teeth in person when matching the shade.',
      'Having the laboratory on site also means denture repairs and adjustments can often be done while you wait, and any change the dentist needs is made the same day.'
    ],
    suitable: ['You need a crown, bridge or veneers', 'A denture that needs repair or relining', 'A night guard or sports mouthguard', 'Retainers after braces or aligners'],
    offers: [
      { title: 'What we make', items: ['Zirconia and ceramic crowns', 'Bridges and implant restorations', 'Complete and partial dentures', 'Night guards, retainers and mouthguards'] },
      { title: 'How we work', items: ['Digital scans and 3D design', 'Milling and 3D printing', 'Hand-layered ceramic for front teeth', 'Quality check by the treating dentist'] },
      { title: 'What it means for you', items: ['Fewer, shorter waits', 'Shade matched face to face', 'Same-day denture repairs', 'One team responsible for the result'] }
    ],
    steps: [
      ['Scan', 'Your dentist scans your teeth, and the file goes straight to the laboratory next door.'],
      ['Design and make', 'Technicians design and craft the restoration, matching its shape and shade to your smile.'],
      ['Check and fit', 'The dentist checks the work before your appointment, then fits it and fine-tunes the bite.']
    ],
    doctor: 'meera-raghunathan',
    faq: [
      ['Why does an in-house laboratory matter?', 'It cuts waiting time, lets the technician see your teeth when matching the colour, and means adjustments are made the same day rather than sent away.'],
      ['Can you repair a broken denture while I wait?', 'Most simple repairs — a cracked base or a lost tooth — can be done in a few hours.'],
      ['Do you make retainers and night guards?', 'Yes. Clear retainers, night guards for grinding and sports mouthguards are all made in our laboratory.']
    ]
  }
};

/* ---------- dentists ----------
   round: true for the managing directors, whose photos are round portraits */
export const doctors = {
  'meera-raghunathan': {
    name: 'Dr. Meera Raghunathan', short: 'Dr. Meera R.', role: 'Managing Director · Prosthodontist', menuRole: 'Managing Director',
    quals: 'B.D.S., M.D.S., F.I.C.D.', speciality: 'Prosthodontics', round: true, image: 'dr-meera-raghunathan',
    facts: [['Experience', '29 years'], ['Languages', 'Tamil, English, Hindi'], ['Availability', 'By appointment']],
    about: [
      'Dr. Meera Raghunathan co-founded Origin Dental in 2000 with Dr. Arvind Subramanian, and has led its prosthodontic work ever since — replacing missing teeth and rebuilding worn, broken smiles.',
      'She plans every crown, bridge and denture with our in-house laboratory, and is known for full mouth rehabilitations that look natural and are comfortable to chew with.'
    ],
    quote: '“Replacing teeth is engineering and artistry at once. The bite has to work for decades, and the smile has to look like it was always yours.”',
    timeline: [['2000 – present', 'Co-founder & Managing Director', 'Origin Dental, Kodambakkam'], ['2012', 'Fellow, International College of Dentists (F.I.C.D.)', 'Honoured for services to dentistry'], ['1997 – 2000', 'Consultant Prosthodontist', 'Dental college hospital, Chennai'], ['1997', 'MDS, Prosthodontics', 'Post-graduate training, Chennai']],
    focus: ['Full mouth rehabilitation', 'Crowns and bridges', 'Complete and partial dentures', 'In-house laboratory'],
    treatments: ['teeth-replacement', 'full-mouth-rehabilitation', 'dentures', 'crowns-bridges', 'in-house-laboratory', 'smile-design']
  },
  'arvind-subramanian': {
    name: 'Dr. Arvind Subramanian', short: 'Dr. Arvind S.', role: 'Managing Director · Oral & Maxillofacial Surgeon', menuRole: 'Managing Director',
    quals: 'B.D.S., M.D.S.', speciality: 'Oral & Maxillofacial Surgery', round: true, image: 'dr-arvind-subramanian',
    facts: [['Experience', '28 years'], ['Languages', 'Tamil, English, Kannada'], ['Availability', 'By appointment']],
    about: [
      'Dr. Arvind Subramanian co-founded Origin Dental in 2000 and leads its surgical team. He removes impacted wisdom teeth, places implants in difficult cases and carries out bone grafts, always with careful planning and an emphasis on comfort.',
      'He also runs the clinic\'s oral cancer screening programme and oversees conscious sedation for anxious patients.'
    ],
    quote: '“Good surgery is calm surgery. When a patient understands each step, the whole procedure goes more smoothly.”',
    timeline: [['2000 – present', 'Co-founder & Managing Director', 'Origin Dental, Kodambakkam'], ['1998 – 2000', 'Consultant Oral Surgeon', 'Multi-speciality hospital, Chennai'], ['1998', 'MDS, Oral & Maxillofacial Surgery', 'Post-graduate training, Chennai']],
    focus: ['Wisdom tooth surgery', 'Implant and bone-graft surgery', 'Oral cancer screening', 'Conscious sedation'],
    treatments: ['oral-surgery', 'sedation-dentistry', 'oral-cancer-screening', 'implants']
  },
  'vikram-sundaram': {
    name: 'Dr. Vikram Sundaram', short: 'Dr. Vikram', role: 'Lead Implantologist', menuRole: 'Implantologist',
    quals: 'BDS, MDS (Prosthodontics)', image: 'dr-vikram',
    facts: [['Experience', '24 years'], ['Languages', 'Tamil, English, Hindi'], ['Availability', 'New patients welcome']],
    about: [
      'Dr. Vikram Sundaram joined Origin Dental in 2010 to lead its implant clinic, with a simple rule: explain everything, write the price down first, and never rush a patient.',
      'He specialises in replacing missing teeth — from single implants to full fixed arches — and plans every case on a 3D scan, so patients know the outcome and the cost before treatment begins.'
    ],
    quote: '“A fixed tooth changes how someone eats, talks and smiles. I want every patient to know exactly what that will take before we begin.”',
    timeline: [['2010 – present', 'Lead Implantologist', 'Origin Dental, Kodambakkam'], ['2004 – 2010', 'Consultant Prosthodontist', 'Multi-speciality dental hospital, Chennai'], ['2002', 'MDS, Prosthodontics', 'Post-graduate training, Chennai']],
    focus: ['Dental implants', 'Full-mouth rehabilitation', 'Implant-supported bridges', 'Gum and bone health'],
    treatments: ['implants', 'gum-care', 'full-mouth-rehabilitation']
  },
  'arjun-prakash': {
    name: 'Dr. Arjun Prakash', short: 'Dr. Arjun', role: 'Endodontist · Root Canal Specialist', menuRole: 'Endodontist',
    quals: 'BDS, MDS (Conservative Dentistry & Endodontics)', image: 'dr-arjun',
    facts: [['Experience', '11 years'], ['Languages', 'Tamil, English'], ['Availability', 'New patients welcome']],
    about: [
      'Dr. Arjun Prakash is the dentist people are relieved to meet when they are in pain. He focuses on saving teeth — root canals, re-treatments and cracked teeth — working under magnification for precision.',
      "He also leads the clinic's emergency service and preventive check-ups, believing the best root canal is the one a patient never needs."
    ],
    quote: '“Most people arrive expecting a root canal to hurt. I measure my work by how many leave saying it felt like a filling.”',
    timeline: [['2019 – present', 'Endodontist', 'Origin Dental, Kodambakkam'], ['2015 – 2019', 'Associate Endodontist', 'Private endodontic practice, Chennai'], ['2015', 'MDS, Conservative Dentistry & Endodontics', 'Post-graduate training, Chennai']],
    focus: ['Single-sitting root canals', 'Root canal re-treatment', 'Dental emergencies', 'Preventive check-ups'],
    treatments: ['root-canal', 'emergency', 'checkups', 'fillings', 'inlays-onlays', 'teeth-cleaning']
  },
  'meera-krishnan': {
    name: 'Dr. Meera Krishnan', short: 'Dr. Meera K.', role: "Orthodontist & Children's Dentist", menuRole: 'Orthodontist · Kids',
    quals: 'BDS, MDS (Orthodontics)', image: 'dr-meera',
    facts: [['Experience', '13 years'], ['Languages', 'Tamil, English, Malayalam'], ['Availability', 'New patients welcome']],
    about: [
      "Dr. Meera Krishnan straightens smiles at every age — from a seven-year-old's first orthodontic check to adults who always wanted to fix the gap in their front teeth.",
      "She also runs the children's clinic, where first visits are about play, trust and prevention long before any treatment is needed."
    ],
    quote: "“A child who leaves their first visit smiling grows into an adult who isn't afraid of the dentist. That matters more than any single treatment.”",
    timeline: [['2016 – present', 'Orthodontist', 'Origin Dental, Kodambakkam'], ['2013 – 2016', 'Consultant Orthodontist', 'Dental practice, Coimbatore'], ['2013', 'MDS, Orthodontics', 'Post-graduate training, Chennai']],
    focus: ['Clear aligners', 'Metal and ceramic braces', "Children's dentistry", 'Early orthodontic screening'],
    treatments: ['braces', 'aligners', 'kids']
  },
  'kavya-ramesh': {
    name: 'Dr. Kavya Ramesh', short: 'Dr. Kavya', role: 'Cosmetic Dentist · Smile Design', menuRole: 'Cosmetic Dentist',
    quals: 'BDS, Fellowship in Aesthetic Dentistry', image: 'dr-kavya',
    facts: [['Experience', '8 years'], ['Languages', 'Tamil, English, Telugu'], ['Availability', 'New patients welcome']],
    about: [
      'Dr. Kavya Ramesh designs smiles that look like they have always been yours. She plans every case digitally and lets patients try their new smile as a mock-up before anything permanent is done.',
      'Her work ranges from a single chipped tooth to complete smile makeovers with veneers, bonding, whitening and laser gum contouring.'
    ],
    quote: '“A good smile design is one nobody notices as dental work. People should simply think you look well.”',
    timeline: [['2021 – present', 'Cosmetic Dentist', 'Origin Dental, Kodambakkam'], ['2018 – 2021', 'Associate Dentist', 'Aesthetic dental studio, Bengaluru'], ['2018', 'Fellowship in Aesthetic Dentistry', 'Advanced training, Bengaluru']],
    focus: ['Digital smile design', 'Porcelain veneers', 'Composite bonding', 'Teeth whitening'],
    treatments: ['smile-design', 'whitening', 'laser-dentistry']
  }
};

/* the four dentists shown in "Meet your dentists"; the managing directors appear in the blue band above */
export const team = ['vikram-sundaram', 'arjun-prakash', 'meera-krishnan', 'kavya-ramesh'];
export const leaders = ['meera-raghunathan', 'arvind-subramanian'];

/* ---------- Google reviews band ----------
   PLACEHOLDER reviews for the concept site. Before this goes live for a real clinic, replace this block
   with the clinic's own Google reviews (Places API or a reviews widget) — never publish invented reviews. */
export const reviews = {
  rating: '4.9',
  count: '1,280',
  writeUrl: 'https://www.google.com/maps/search/?api=1&query=Origin+Dental+Kodambakkam+Chennai',
  items: [
    { name: 'Lakshmi Narayanan', when: '2 weeks ago', color: '#5e35b1', guide: true, text: 'Had my wisdom tooth removed by Dr. Arvind. I was very nervous, but he explained every step and the whole thing was over in twenty minutes. The swelling was gone in two days. Very clean clinic and friendly staff.' },
    { name: 'Rahul Venkatesh', when: 'a month ago', color: '#00897b', text: 'Got clear aligners here. They showed me a 3D preview before starting, and fourteen months later the result looks exactly like it. Reviews were always on time and nobody tried to upsell me anything.' },
    { name: 'Fathima Begum', when: 'a month ago', color: '#c2185b', text: 'Took my six-year-old daughter for her first dental visit. Dr. Meera Krishnan was so patient with her, let her sit in the chair and count her teeth first. She actually enjoyed it and wants to go back!' },
    { name: 'Suresh Kumar', when: '2 months ago', color: '#33691e', guide: true, text: 'Full mouth rehabilitation with Dr. Meera Raghunathan. The full cost was given in writing before we started and there were no surprises. After years of trouble I can finally chew properly again. Thank you to the whole team.' },
    { name: 'Priya Sundar', when: '3 months ago', color: '#ef6c00', text: 'Single-sitting root canal with Dr. Arjun. Honestly it felt like a filling. He showed me the X-ray before and after and explained why I needed a crown. Highly recommend.' },
    { name: 'Karthik Rajan', when: '4 months ago', color: '#1565c0', text: 'Broke a front tooth on a Sunday morning. Called the helpline, they saw me within the hour and repaired it the same day. Could not tell which tooth it was afterwards.' },
    { name: 'Anitha Joseph', when: '5 months ago', color: '#6d4c41', guide: true, text: 'Teeth whitening with Dr. Kavya before my wedding. Very natural result and no sensitivity at all. The staff are warm and the clinic is spotless.' },
    { name: 'David Thomas', when: '6 months ago', color: '#455a64', text: 'Flew in from Dubai for two implants. They planned everything on WhatsApp from my X-rays, so I knew the cost and the dates before I landed. Excellent, careful work.' }
  ]
};
