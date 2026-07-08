/* ============================================================
   CONTENT DATA
   Restaurants, must-try foods, and things-to-do below are pulled
   directly from the "HK/Thailand/Vietnam 2026" post in the
   fatboilyfe.wordpress.com export. Photos are the real trip
   photos from that post's gallery. Everything else (why-visit
   copy, hidden gems, travel tips, ratings) is written to match —
   the export didn't include narrative text or per-photo captions.
   ============================================================ */

function img(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

// Real trip photos, in the order they appeared in the blog's gallery
// (which follows the trip itinerary: HK -> Koh Samui -> Bangkok ->
// HCMC -> An Giang -> Hanoi -> Ha Long Bay).
const REAL_PHOTOS = [
  { id: 797, file: "734797723_10234321370203832_7699803050170614722_n.jpg" },
  { id: 801, file: "734685124_10234321371443863_2297942505490832443_n.jpg" },
  { id: 799, file: "731935241_10234321372003877_9075919092052692235_n.jpg" },
  { id: 798, file: "732152074_10234321372603892_3468156686744755713_n.jpg" },
  { id: 805, file: "734797722_10234321373163906_8417483070272532601_n.jpg" },
  { id: 800, file: "731808889_10234321373763921_3715836440244580765_n.jpg" },
  { id: 812, file: "734685277_10234321379604067_7193473609461434376_n.jpg" },
  { id: 803, file: "731823917_10234321379964076_4992366991056480291_n.jpg" },
  { id: 820, file: "731823622_10234321382484139_6285620337918298113_n.jpg" },
  { id: 811, file: "731823921_10234321387484264_6991753109682677852_n.jpg" },
  { id: 809, file: "731808694_10234321390444338_9048449930715725850_n.jpg" },
  { id: 813, file: "734733466_10234321392284384_3447460776999424973_n.jpg" },
  { id: 804, file: "734718602_10234321394964451_3612137320677027374_n.jpg" },
  { id: 814, file: "734685345_10234321395924475_8042695893444786957_n.jpg" },
  { id: 808, file: "734756342_10234321398684544_2031676881820813246_n.jpg" },
  { id: 819, file: "732092413_10234321399884574_2868865708212778836_n.jpg" },
  { id: 802, file: "734896735_10234321400844598_2319769691662735395_n.jpg" },
  { id: 815, file: "734797659_10234321402044628_815949466777883424_n.jpg" },
  { id: 810, file: "731823683_10234321402764646_4875194798172069262_n.jpg" },
  { id: 816, file: "731761141_10234321403364661_5638536671062893744_n.jpg" },
  { id: 807, file: "734706157_10234321404244683_7435124111512065598_n.jpg" },
  { id: 806, file: "735636686_10234321404764696_1151613669696529821_n.jpg" },
  { id: 817, file: "734873706_10234321405564716_652741283521517278_n.jpg" },
  { id: 823, file: "731823607_10234321406284734_3137178903753875777_n.jpg" },
  { id: 822, file: "734664255_10234321407044753_3839576261897530603_n.jpg" },
  { id: 824, file: "731834741_10234321412204882_4177174544736822969_n.jpg" },
  { id: 825, file: "735543790_10234321413804922_5021565051874312662_n.jpg" },
  { id: 826, file: "734685354_10234321420045078_5163203980990012228_n.jpg" },
  { id: 821, file: "731479667_10234321422645143_8713853591532105551_n.jpg" },
  { id: 818, file: "734733254_10234321424205182_6067649309802778866_n.jpg" }
];

function wpImg(id, w) {
  const p = REAL_PHOTOS.find(p => p.id === id);
  if (!p) return img("missing-" + id, w || 1000, w || 1000);
  return `https://fatboilyfe.wordpress.com/wp-content/uploads/2026/07/${p.file}?w=${w || 1024}`;
}

// Chronological slices of the 30-photo gallery, one per stop on the trip
const PHOTO_SETS = {
  "hong-kong": [797, 801, 799, 798, 805],
  "koh-samui": [800, 812, 803, 820],
  "bangkok": [811, 809, 813, 804],
  "ho-chi-minh-city": [814, 808, 819, 802],
  "an-giang": [815, 810, 816, 807],
  "hanoi": [806, 817, 823, 822, 824],
  "ha-long-bay": [825, 826, 821, 818]
};

function photoSet(slug) {
  const ids = PHOTO_SETS[slug] || [];
  return {
    hero: wpImg(ids[0], 1600),
    card: wpImg(ids[1] || ids[0], 900),
    gallery: ids.map(id => wpImg(id, 1000))
  };
}

const DESTINATIONS = [
  {
    slug: "hong-kong",
    name: "Hong Kong",
    country: "China (SAR)",
    tag: "Neon & Dim Sum",
    heroImg: photoSet("hong-kong").hero,
    cardImg: photoSet("hong-kong").card,
    coords: { top: "34%", left: "78%" },
    quickFacts: [
      { label: "Best time to go", value: "Oct – Dec" },
      { label: "Currency", value: "HK Dollar" },
      { label: "Language", value: "Cantonese, English" },
      { label: "Kid-chaos level", value: "Medium" }
    ],
    whyVisit: "Hong Kong is what happens when you drop a mountain range into a trading port and let it grow vertically for a hundred years. We came for the skyline, stayed for the trams, and left having eaten more dim sum than any family should reasonably admit to.",
    thingsToDo: [
      "Victoria Peak",
      "Star Ferry across Victoria Harbour",
      "Temple Street Night Market",
      "Ride the historic Peak Tram",
      "Symphony of Lights from the harbor"
    ],
    restaurants: [
      { name: "Tim Ho Wan", location: "Hong Kong", rating: 4.6, review: "Michelin-famous dim sum without Michelin prices — the baked BBQ pork buns alone were worth the flight.", img: wpImg(797, 900) },
      { name: "Mott 32", location: "Hong Kong", rating: 4.7, review: "Modern Cantonese, and one of the city's genuinely signature dining experiences.", img: wpImg(801, 900) },
      { name: "Yat Lok", location: "Hong Kong", rating: 4.4, review: "Legendary roast goose — the kind of place locals queue for without a second thought.", img: wpImg(799, 900) },
      { name: "Australia Dairy Company", location: "Hong Kong", rating: 4.2, review: "A classic Hong Kong breakfast institution, brisk service included at no extra charge.", img: wpImg(798, 900) }
    ],
    mustTryFoods: [
      { name: "Dim sum", img: wpImg(805, 500) },
      { name: "Roast goose", img: wpImg(800, 500) },
      { name: "BBQ pork buns", img: wpImg(797, 500) },
      { name: "Milk tea", img: wpImg(799, 500) }
    ],
    hiddenGems: [
      "The escalators of the Mid-Levels for a free, air-conditioned hillside tour",
      "Cattle Depot Artist Village for a quiet break from the crowds",
      "Kowloon Walled City Park, built on the site of the old lawless enclave"
    ],
    travelTips: [
      "Get an Octopus card on arrival — it works on everything, including convenience stores",
      "Skip taxis during rush hour; the MTR is faster and the kids think it's a ride",
      "Book Peak Tram tickets online to skip a genuinely brutal queue"
    ],
    gallery: photoSet("hong-kong").gallery,
    rating: 9,
    wouldReturn: "In a heartbeat — ideally with an extra day just for the ferries.",
    relatedAdventure: "southeast-asia-2026"
  },
  {
    slug: "koh-samui",
    name: "Koh Samui",
    country: "Thailand",
    tag: "Slow Beach Days",
    heroImg: photoSet("koh-samui").hero,
    cardImg: photoSet("koh-samui").card,
    coords: { top: "58%", left: "70%" },
    quickFacts: [
      { label: "Best time to go", value: "Dec – Apr" },
      { label: "Currency", value: "Thai Baht" },
      { label: "Language", value: "Thai, English" },
      { label: "Kid-chaos level", value: "Low" }
    ],
    whyVisit: "Samui is the exhale after Hong Kong's inhale. Palm-lined beaches, warm water shallow enough for the kids, and a pace of life that made our family group chat go suspiciously quiet for a few straight days.",
    thingsToDo: [
      "Fisherman's Village",
      "Na Muang Waterfalls",
      "Island hopping to Ang Thong National Marine Park",
      "Sunset on Chaweng or Lamai Beach"
    ],
    restaurants: [
      { name: "Coco Tam's", location: "Koh Samui", rating: 4.7, review: "Beachfront dining with the famous fire show — the kids still bring this up unprompted.", img: wpImg(800, 900) },
      { name: "The Jungle Club", location: "Koh Samui", rating: 4.5, review: "Incredible hilltop views over the island; go for sunset if you can time it.", img: wpImg(812, 900) },
      { name: "Tree Tops Signature Dining", location: "Koh Samui", rating: 4.6, review: "A romantic, special-occasion meal worth booking ahead for.", img: wpImg(803, 900) }
    ],
    mustTryFoods: [
      { name: "Mango sticky rice", img: wpImg(820, 500) },
      { name: "Tom yum goong", img: wpImg(800, 500) },
      { name: "Grilled seafood", img: wpImg(812, 500) },
      { name: "Fresh coconut", img: wpImg(803, 500) }
    ],
    hiddenGems: [
      "The Secret Buddha Garden hidden up in the jungle hills",
      "Laem Sor Pagoda at low tide, when you can walk right out to it",
      "A quiet cove past Choeng Mon that never seems to make the guidebooks"
    ],
    travelTips: [
      "Rent a scooter with a sidecar for the little ones, or hire a driver for the day",
      "Book beachfront dinners early during high season — tables go fast at sunset",
      "Bring reef-safe sunscreen; several beaches now require it"
    ],
    gallery: photoSet("koh-samui").gallery,
    rating: 9,
    wouldReturn: "Yes — this is the one we talk about when we say we need a vacation from our vacation.",
    relatedAdventure: "southeast-asia-2026"
  },
  {
    slug: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    tag: "Street Food Capital",
    heroImg: photoSet("bangkok").hero,
    cardImg: photoSet("bangkok").card,
    coords: { top: "50%", left: "66%" },
    quickFacts: [
      { label: "Best time to go", value: "Nov – Feb" },
      { label: "Currency", value: "Thai Baht" },
      { label: "Language", value: "Thai, English" },
      { label: "Kid-chaos level", value: "High" }
    ],
    whyVisit: "Bangkok is loud, hot, and completely unbothered by your jet lag — and that's exactly why it works. It's the city that taught our kids that dinner can happen on a plastic stool on a sidewalk and still be the best meal of the trip.",
    thingsToDo: [
      "Wat Arun",
      "Grand Palace",
      "Yaowarat at night",
      "Rooftop drinks at Vertigo"
    ],
    restaurants: [
      { name: "Jay Fai", location: "Bangkok", rating: 4.6, review: "The iconic crab omelet everyone warns you about the wait for. Worth every minute of it.", img: wpImg(811, 900) },
      { name: "Thipsamai", location: "Bangkok", rating: 4.5, review: "Famous Pad Thai from a shop that's been perfecting it for decades.", img: wpImg(809, 900) },
      { name: "Jeh O Chula", location: "Bangkok", rating: 4.4, review: "Tom Yum Mama noodles turned into a full-contact food event.", img: wpImg(813, 900) },
      { name: "Sorn", location: "Bangkok", rating: 4.8, review: "One of Thailand's premier fine-dining restaurants — southern Thai cuisine done at the highest level.", img: wpImg(804, 900) }
    ],
    mustTryFoods: [
      { name: "Crab omelet", img: wpImg(811, 500) },
      { name: "Pad Thai", img: wpImg(809, 500) },
      { name: "Tom Yum Mama noodles", img: wpImg(813, 500) },
      { name: "Mango sticky rice", img: wpImg(804, 500) }
    ],
    hiddenGems: [
      "Talat Noi, a maze of street art and old machine shops near the river",
      "The rooftop of Wat Arun at golden hour, before the tour buses arrive",
      "A khlong-side noodle stall with no sign and no menu, just point and nod"
    ],
    travelTips: [
      "Cover shoulders and knees for temple visits — bring a light scarf just in case",
      "Cross streets with a local; Bangkok traffic follows its own physics",
      "Carry small bills for street food, and always ask for 'mai phet' if spice-averse"
    ],
    gallery: photoSet("bangkok").gallery,
    rating: 8,
    wouldReturn: "Absolutely, though next time with a stricter afternoon nap schedule.",
    relatedAdventure: "southeast-asia-2026"
  },
  {
    slug: "ho-chi-minh-city",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    tag: "Motorbikes & Banh Mi",
    heroImg: photoSet("ho-chi-minh-city").hero,
    cardImg: photoSet("ho-chi-minh-city").card,
    coords: { top: "56%", left: "60%" },
    quickFacts: [
      { label: "Best time to go", value: "Dec – Mar" },
      { label: "Currency", value: "Vietnamese Dong" },
      { label: "Language", value: "Vietnamese" },
      { label: "Kid-chaos level", value: "High" }
    ],
    whyVisit: "Nine million motorbikes and not a single traffic light that seems to matter — Ho Chi Minh City is a full sensory reset. Crossing the street as a family became its own daily adventure, one that always ended in banh mi.",
    thingsToDo: [
      "Bến Thành Market",
      "War Remnants Museum",
      "Nguyễn Huệ Walking Street",
      "Rooftop drinks overlooking the city"
    ],
    restaurants: [
      { name: "Pizza 4P's", location: "Ho Chi Minh City", rating: 4.6, review: "A modern Vietnamese favorite — not what you expect to crave in Saigon, but everyone does.", img: wpImg(814, 900) },
      { name: "Bánh Mì Huỳnh Hoa", location: "Ho Chi Minh City", rating: 4.7, review: "Often called the city's best bánh mì, and stuffed enough to make a believer out of anyone.", img: wpImg(808, 900) },
      { name: "Cục Gạch Quán", location: "Ho Chi Minh City", rating: 4.5, review: "Traditional southern Vietnamese cuisine in a garden setting that slows the whole meal down.", img: wpImg(819, 900) }
    ],
    mustTryFoods: [
      { name: "Bánh mì", img: wpImg(814, 500) },
      { name: "Phở", img: wpImg(808, 500) },
      { name: "Southern Vietnamese classics", img: wpImg(819, 500) },
      { name: "Vietnamese iced coffee", img: wpImg(802, 500) }
    ],
    hiddenGems: [
      "The rooftop cafes stacked inside unmarked apartment buildings on Nguyen Hue",
      "A tiny com tam stall behind the Ben Thanh night market that locals actually eat at",
      "The quiet courtyard of the Jade Emperor Pagoda, away from the main road"
    ],
    travelTips: [
      "Hold a child's hand firmly and just walk steadily when crossing — don't stop",
      "Download a ride-hailing app for motorbike taxis; it's cheaper and faster than it sounds",
      "Bargain lightly and with a smile in the markets — it's expected, not rude"
    ],
    gallery: photoSet("ho-chi-minh-city").gallery,
    rating: 8,
    wouldReturn: "Yes, though we're still recovering from the street-crossing adrenaline.",
    relatedAdventure: "southeast-asia-2026"
  },
  {
    slug: "an-giang",
    name: "An Giang",
    country: "Vietnam",
    tag: "Mekong Delta",
    heroImg: photoSet("an-giang").hero,
    cardImg: photoSet("an-giang").card,
    coords: { top: "62%", left: "55%" },
    quickFacts: [
      { label: "Best time to go", value: "Nov – Jan" },
      { label: "Currency", value: "Vietnamese Dong" },
      { label: "Language", value: "Vietnamese" },
      { label: "Kid-chaos level", value: "Low" }
    ],
    whyVisit: "An Giang is the Mekong Delta at its most unhurried — this region is better known for local eateries than famous restaurants, and that turned out to be exactly the point. Rice paddies to the horizon and a slower rhythm let the kids actually watch the world instead of just moving through it.",
    thingsToDo: [
      "Trà Sư Cajuput Forest",
      "Sam Mountain",
      "Floating villages around Châu Đốc"
    ],
    restaurants: [
      { name: "Local eateries around Châu Đốc", location: "An Giang", rating: 4.3, review: "This region is better known for local eateries than famous restaurants — and that's the charm of it.", img: wpImg(815, 900) },
      { name: "Riverside food stalls", location: "An Giang", rating: 4.2, review: "Simple, fresh, and eaten on plastic stools with a view of the river.", img: wpImg(810, 900) }
    ],
    mustTryFoods: [
      { name: "Cá lóc nướng (grilled snakehead fish)", img: wpImg(816, 500) },
      { name: "Bún cá Châu Đốc", img: wpImg(807, 500) },
      { name: "Palm sugar desserts", img: wpImg(815, 500) }
    ],
    hiddenGems: [
      "A family-run boat tour that goes further into the canals than the tour buses reach",
      "The quiet Khmer pagodas of Tri Ton, rarely visited by foreign tourists",
      "A roadside sugar palm stand where they'll crack one open for you on the spot"
    ],
    travelTips: [
      "Hire a local boat guide rather than a big tour group for the floating villages",
      "Bring cash — cards are not reliably accepted outside the town centers",
      "Go at first light for the floating markets; they wind down by mid-morning"
    ],
    gallery: photoSet("an-giang").gallery,
    rating: 9,
    wouldReturn: "Without question — this was the trip's quiet, unexpected favorite.",
    relatedAdventure: "southeast-asia-2026"
  },
  {
    slug: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    tag: "Old Quarter & Egg Coffee",
    heroImg: photoSet("hanoi").hero,
    cardImg: photoSet("hanoi").card,
    coords: { top: "30%", left: "58%" },
    quickFacts: [
      { label: "Best time to go", value: "Oct – Dec" },
      { label: "Currency", value: "Vietnamese Dong" },
      { label: "Language", value: "Vietnamese" },
      { label: "Kid-chaos level", value: "Medium" }
    ],
    whyVisit: "Hanoi's Old Quarter is thirty-six streets of honking scooters, hanging lanterns, and plastic stools set up around whatever's cooking that day. It's chaotic in the best possible way, and our kids still ask for egg coffee at home.",
    thingsToDo: [
      "Old Quarter — wander without a plan and enjoy the street life",
      "Train Street — time your visit for a train passing through the narrow street",
      "Hoàn Kiếm Lake — especially lively in the evenings and on weekends",
      "Temple of Literature — Vietnam's first national university",
      "Hoa Lo Prison — a powerful historical museum"
    ],
    restaurants: [
      { name: "Phở Gia Truyền Bát Đàn", location: "Hanoi", rating: 4.7, review: "One of the city's most famous bowls of pho — expect a line and a fast-moving system.", img: wpImg(806, 900) },
      { name: "Bún Chả Hương Liên", location: "Hanoi", rating: 4.6, review: "The \"Obama Bun Cha\" restaurant that's become a genuine Hanoi institution.", img: wpImg(817, 900) },
      { name: "Chả Cá Thăng Long", location: "Hanoi", rating: 4.5, review: "Hanoi's iconic turmeric fish with dill, cooked tableside.", img: wpImg(823, 900) },
      { name: "Cafe Giảng", location: "Hanoi", rating: 4.8, review: "The birthplace of Vietnamese egg coffee — whipped into something between dessert and caffeine delivery system.", img: wpImg(822, 900) }
    ],
    mustTryFoods: [
      { name: "Pho", img: wpImg(806, 500) },
      { name: "Bún chả", img: wpImg(817, 500) },
      { name: "Chả cá", img: wpImg(823, 500) },
      { name: "Egg coffee", img: wpImg(822, 500) },
      { name: "Bánh cuốn", img: wpImg(824, 500) },
      { name: "Sticky rice (xôi)", img: wpImg(806, 500) }
    ],
    hiddenGems: [
      "The train street, where a working railway runs inches from café tables",
      "A rooftop over West Lake with almost no other tourists in sight",
      "A tiny bun rieu stall down an alley off Hang Bac that has no sign at all"
    ],
    travelTips: [
      "Cross the street slowly and predictably — scooters will flow around you",
      "Try the egg coffee once even if it sounds strange; it always wins people over",
      "Book the overnight train in advance during peak season"
    ],
    gallery: photoSet("hanoi").gallery,
    rating: 9,
    wouldReturn: "Every time we're in the region — it's become a tradition, not a stop.",
    relatedAdventure: "southeast-asia-2026"
  },
  {
    slug: "ha-long-bay",
    name: "Ha Long Bay",
    country: "Vietnam",
    tag: "Limestone Karsts",
    heroImg: photoSet("ha-long-bay").hero,
    cardImg: photoSet("ha-long-bay").card,
    coords: { top: "26%", left: "62%" },
    quickFacts: [
      { label: "Best time to go", value: "Oct – Dec" },
      { label: "Currency", value: "Vietnamese Dong" },
      { label: "Language", value: "Vietnamese" },
      { label: "Kid-chaos level", value: "Low" }
    ],
    whyVisit: "Nearly two thousand limestone islands rising out of jade-green water — Ha Long Bay looks unreal in photos and somehow looks even more unreal in person. An overnight cruise here was the trip's quietest, most awestruck evening.",
    thingsToDo: [
      "Overnight cruise",
      "Sung Sot Cave",
      "Kayaking through limestone islands",
      "Sunrise on the bay",
      "Squid fishing at night"
    ],
    restaurants: [
      { name: "Cua Vàng Restaurant", location: "Ha Long Bay", rating: 4.5, review: "Fresh local seafood, right where you'd want it.", img: wpImg(825, 900) },
      { name: "On-board cruise dining", location: "Ha Long Bay", rating: 4.6, review: "A quality overnight cruise is often the best dining experience in the bay — squid pulled that morning, grilled on deck at sunset.", img: wpImg(826, 900) }
    ],
    mustTryFoods: [
      { name: "Fresh-caught squid", img: wpImg(821, 500) },
      { name: "Local seafood", img: wpImg(825, 500) },
      { name: "On-board cruise seafood BBQ", img: wpImg(826, 500) }
    ],
    hiddenGems: [
      "Lan Ha Bay, the quieter southern cousin with far fewer boats",
      "A sunrise kayak before the day-trip boats arrive from the mainland",
      "Titop Island's short climb for a nearly private lookout at dawn"
    ],
    travelTips: [
      "Choose an overnight cruise, not a day trip — the evening light is the whole point",
      "Book a boat with a real safety record; check recent reviews closely",
      "Pack light, breathable layers — it's humid on the water even in cooler months"
    ],
    gallery: photoSet("ha-long-bay").gallery,
    rating: 10,
    wouldReturn: "Yes — this was the single most beautiful evening of the whole trip.",
    relatedAdventure: "southeast-asia-2026"
  }
,
  {
    slug: "puerto-rico-2010",
    name: `Puerto Rico`,
    country: `Puerto Rico, USA`,
    tag: `Island Getaway`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2010.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr8.jpg?w=900",
    coords: { top: "39.9%", left: "31.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Apr` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `Spanish, English` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Puerto Rico earned its spot on the map for island getaway — visit old san juan was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Visit Old San Juan`,
`Go to the Beach`,
`Hike in El Yunque Rainforest`,
`Take a Bioluminescent Bay Tour`,
`Explore the Coffee Plantations`
    ],
    restaurants: [
      { name: `Casa Lola`, location: `Puerto Rico`, rating: 4.3, review: `Located in the lively Santurce district of San Juan, Casa Lola serves up traditional Puerto Rican cuisine with a contemporary twist. The restaurant is known for its fresh seafood dishes and craft cocktails.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2010.jpg?w=900" },
      { name: `Pikayo`, location: `Puerto Rico`, rating: 4.5, review: `Pikayo is one of the most famous restaurants in Puerto Rico, located in the Condado district of San Juan. Chef Wilo Benet offers a sophisticated fusion of European, Caribbean, and Latin American flavors inspired by his travels and experiences.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr8.jpg?w=900" },
      { name: `La Mallorquina`, location: `Puerto Rico`, rating: 4.6, review: `La Mallorquina, located in Old San Juan, is a classic Puerto Rican bakery and cafe that has been serving traditional “pan sobao” (Puerto Rican bread) and pastries for decades. Try the "quesitos" (pastry filled with cheese) or "mallorca" (sweet and fluffy pastry).`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2.jpg?w=900" },
      { name: `La Estación`, location: `Puerto Rico`, rating: 4.3, review: `La Estación is a farm-to-table restaurant located in Fajardo, on the eastern coast of the island. Their menu features locally sourced ingredients and creative dishes, like the plantain-crusted fish and duck confit empanadillas.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr3.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Casa Lola`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2010.jpg?w=500" },
      { name: `Pikayo`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr8.jpg?w=500" },
      { name: `La Mallorquina`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2.jpg?w=500" },
      { name: `La Estación`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr3.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Puerto Rico`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Puerto Rico fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Dec – Apr before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2010.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr8.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr1.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: null
  },
  {
    slug: "belize-2015",
    name: `Belize`,
    country: `Belize`,
    tag: `Reef & Jungle`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=900",
    coords: { top: "40.5%", left: "25.4%" },
    quickFacts: [
      { label: "Best time to go", value: `Nov – Apr` },
      { label: "Currency", value: `Belize Dollar` },
      { label: "Language", value: `English, Spanish` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Belize earned its spot on the map for reef & jungle — visit mayan ruins was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Visit Mayan Ruins`,
`Snorkeling and Diving`,
`Explore Caves`,
`Wildlife Viewing`,
`Visit Belize's Cayes`
    ],
    restaurants: [
      { name: `The Smuggler's Den`, location: `Belize`, rating: 4.3, review: `Located in San Pedro, The Smuggler's Den is a seafood restaurant that prides itself on its freshly caught local seafood, like lobster, shrimp, and fish.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=900" },
      { name: `The Arepa Lady`, location: `Belize`, rating: 4.5, review: `This small street food stall in San Pedro serves delicious Venezuelan arepas, grilled corn pockets filled with cheese, meats, or vegetables.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=900" },
      { name: `RumFish y Vino`, location: `Belize`, rating: 4.6, review: `Offering international dishes with Caribbean influences, RumFish y Vino is a top-rated restaurant in Placencia. Try their fresh ceviche, grilled meats or seafood, and delicious cocktails.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=900" },
      { name: `Pop's Belize Restaurant`, location: `Belize`, rating: 4.3, review: `Pop's Belize Restaurant, located in San Ignacio, serves traditional Belizean dishes like stewed chicken, rice and beans, and tamales, in a cozy setting.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `The Smuggler's Den`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=500" },
      { name: `The Arepa Lady`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=500" },
      { name: `RumFish y Vino`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=500" },
      { name: `Pop's Belize Restaurant`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Belize`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Belize fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Nov – Apr before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "england-2017",
    name: `England`,
    country: `United Kingdom`,
    tag: `Castles & Countryside`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en11.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en17.jpg?w=900",
    coords: { top: "20.9%", left: "49.7%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `British Pound` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `England earned its spot on the map for castles & countryside — visit london was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Visit London`,
`Tour Harry Potter film locations`,
`Explore the countryside`,
`Visit historic sites`,
`Enjoy the pub culture`
    ],
    restaurants: [
      { name: `The Fat Duck`, location: `England`, rating: 4.3, review: `Located in Bray, Berkshire, The Fat Duck is a Michelin-starred restaurant run by Chef Heston Blumenthal, known for his innovative and modern take on British cuisine.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en11.jpg?w=900" },
      { name: `The Ledbury`, location: `England`, rating: 4.5, review: `The Ledbury, located in Notting Hill, London, is a Michelin-starred restaurant that offers contemporary European cuisine featuring seasonal and locally-sourced ingredients.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en17.jpg?w=900" },
      { name: `St. John`, location: `England`, rating: 4.6, review: `St. John in London's Clerkenwell district is known for its traditional British cuisine with a modern twist, including nose-to-tail dishes like bone marrow on toast and roast pork belly.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en4.jpg?w=900" },
      { name: `The Ivy`, location: `England`, rating: 4.3, review: `The Ivy, located in the heart of London's West End, is a beautiful art deco restaurant that serves classic British cuisine, including their famous shepherd's pie.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en13.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `The Fat Duck`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en11.jpg?w=500" },
      { name: `The Ledbury`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en17.jpg?w=500" },
      { name: `St. John`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en4.jpg?w=500" },
      { name: `The Ivy`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en13.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of England`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in England fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en11.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en17.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en4.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en13.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en5.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "bahamas-2018",
    name: `Bahamas`,
    country: `Bahamas`,
    tag: `Turquoise Water`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=900",
    coords: { top: "36.1%", left: "28.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Apr` },
      { label: "Currency", value: `Bahamian Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Bahamas earned its spot on the map for turquoise water — relax on the beaches was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Relax on the beaches`,
`Visit the Atlantis Paradise Island Resort and Casino`,
`Go snorkeling or scuba diving`,
`Explore the National Parks`,
`Try Bahamian cuisine`
    ],
    restaurants: [
      { name: `Graycliff`, location: `Bahamas`, rating: 4.3, review: `Situated in Nassau, this restaurant is known for its exquisite cuisine and elegant atmosphere. It offers a variety of dining options ranging from an exclusive five-course dinner to a casual lunch at their pizzeria.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=900" },
      { name: `The Poop Deck`, location: `Bahamas`, rating: 4.5, review: `This seafood restaurant has two locations in Nassau and Sandyport. They specialize in local Bahamian cuisine and fresh seafood dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=900" },
      { name: `Cafe Matisse`, location: `Bahamas`, rating: 4.6, review: `Located in Paradise Island, this Italian restaurant is known for its excellent service and cozy atmosphere. They offer a wide selection of homemade pasta dishes and wines.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=900" },
      { name: `Twin Brothers`, location: `Bahamas`, rating: 4.3, review: `This local hotspot in Nassau is famous for its conch salad and fried fish. They have been serving up traditional Bahamian dishes for over 50 years.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Graycliff`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=500" },
      { name: `The Poop Deck`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=500" },
      { name: `Cafe Matisse`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=500" },
      { name: `Twin Brothers`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Bahamas`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Bahamas fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Dec – Apr before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "iceland-2018",
    name: `Iceland`,
    country: `Iceland`,
    tag: `Fire & Ice`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic23.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic28.jpg?w=900",
    coords: { top: "13.9%", left: "44.7%" },
    quickFacts: [
      { label: "Best time to go", value: `Jun – Aug` },
      { label: "Currency", value: `Icelandic Króna` },
      { label: "Language", value: `Icelandic, English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Iceland earned its spot on the map for fire & ice — visit the blue lagoon was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Visit the Blue Lagoon`,
`Explore Reykjavik`,
`Chase the Northern Lights`,
`Go on a glacier hike`,
`Visit Gullfoss Waterfall and Geysir`
    ],
    restaurants: [
      { name: `Dill`, location: `Iceland`, rating: 4.3, review: `This restaurant in Reykjavik received a Michelin star in 2019 and is known for its innovative, modern take on Icelandic cuisine. The tasting menus feature seasonal and locally-sourced ingredients.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic23.jpg?w=900" },
      { name: `Kopar`, location: `Iceland`, rating: 4.5, review: `This seafood restaurant located in Reykjavik has stunning views of the harbor and specializes in fresh Icelandic seafood with a modern twist.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic28.jpg?w=900" },
      { name: `Matur og Drykkur`, location: `Iceland`, rating: 4.6, review: `Located in Reykjavik's Grandi harbour area, this restaurant features traditional Icelandic dishes made with locally-sourced ingredients. Don't miss the fermented shark!`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic2.jpg?w=900" },
      { name: `Slippbarinn`, location: `Iceland`, rating: 4.3, review: `This hip bar in Reykjavik's trendy 101 district serves creative cocktails and small plates made with local and organic ingredients.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic17.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Dill`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic23.jpg?w=500" },
      { name: `Kopar`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic28.jpg?w=500" },
      { name: `Matur og Drykkur`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic2.jpg?w=500" },
      { name: `Slippbarinn`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic17.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Iceland`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Iceland fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Jun – Aug before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic23.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic28.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic17.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic27.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "puerto-vallarta-2019",
    name: `Puerto Vallarta`,
    country: `Mexico`,
    tag: `Pacific Coast`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv6.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv12.jpg?w=900",
    coords: { top: "38.5%", left: "20.8%" },
    quickFacts: [
      { label: "Best time to go", value: `Nov – Apr` },
      { label: "Currency", value: `Mexican Peso` },
      { label: "Language", value: `Spanish` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Puerto Vallarta earned its spot on the map for pacific coast. One caption from the trip says it better than any guidebook could: “Candid moments make the best memories. #fam1st” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Visit the Malecon`,
`Take a boat tour`,
`Explore the Old Town`,
`Visit the Botanical Gardens`,
`Enjoy the beaches`
    ],
    restaurants: [
      { name: `El Arrayán`, location: `Puerto Vallarta`, rating: 4.3, review: `A must-visit for lovers of traditional Mexican cuisine. El Arrayán serves regional dishes from all over Mexico, prepared with fresh ingredients and a contemporary touch. Reservations are recommended.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv6.jpg?w=900" },
      { name: `Café des Artistes`, location: `Puerto Vallarta`, rating: 4.5, review: `Headed by the renowned chef, Thierry Blouet, Café des Artistes is one of the best restaurants in Puerto Vallarta. The menu features gourmet French-Mexican fusion dishes, and the elegant décor creates an unforgettable atmosphere.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv12.jpg?w=900" },
      { name: `La Palapa`, location: `Puerto Vallarta`, rating: 4.6, review: `Located on the beach, La Palapa is the perfect spot for a romantic dinner. The menu offers a mix of international and Mexican dishes, along with fresh seafood options.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv7.jpg?w=900" },
      { name: `Tintoque`, location: `Puerto Vallarta`, rating: 4.3, review: `A relatively new addition to Puerto Vallarta's food scene, Tintoque quickly gained popularity among locals and tourists alike. The menu features contemporary Mexican cuisine using fresh, locally-sourced ingredients.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv13.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `El Arrayán`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv6.jpg?w=500" },
      { name: `Café des Artistes`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv12.jpg?w=500" },
      { name: `La Palapa`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv7.jpg?w=500" },
      { name: `Tintoque`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv13.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Puerto Vallarta`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Puerto Vallarta fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Nov – Apr before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv12.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv7.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv13.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv5.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "orlando-fl-2010",
    name: `Orlando, Florida (2010)`,
    country: `USA`,
    tag: `Theme Park Marathon`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o3.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o5.jpg?w=900",
    coords: { top: "34.1%", left: "27.4%" },
    quickFacts: [
      { label: "Best time to go", value: `Sep – Nov` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `High` }
    ],
    whyVisit: `Orlando, Florida (2010) earned its spot on the map for theme park marathon. One caption from the trip says it better than any guidebook could: “Ariel aka the Mermaid” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Walt Disney World Resort`,
`Universal Orlando Resort`,
`SeaWorld Orlando`,
`International Drive`,
`Kennedy Space Center Visitor Complex`
    ],
    restaurants: [
      { name: `Victoria & Albert's`, location: `Orlando, Florida (2010)`, rating: 4.3, review: `Located at Disney's Grand Floridian Resort & Spa, Victoria & Albert's is a fine dining experience that is often described as the best restaurant in Orlando. The menu changes daily and features seasonal ingredients, and the wine list is extensive.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o3.jpg?w=900" },
      { name: `The Ravenous Pig`, location: `Orlando, Florida (2010)`, rating: 4.5, review: `This gastropub in Winter Park serves up elevated pub fare like pork belly sliders, fish and chips, and burgers, along with a great selection of craft beer and cocktails.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o5.jpg?w=900" },
      { name: `Se7en Bites`, location: `Orlando, Florida (2010)`, rating: 4.6, review: `If you're looking for breakfast or brunch, Se7en Bites is a must-try. This bakery and cafe serves up delicious Southern-style comfort food like biscuits and gravy, shrimp and grits, and chicken and waffles.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o1.jpg?w=900" },
      { name: `Morimoto Asia`, location: `Orlando, Florida (2010)`, rating: 4.3, review: `Iron Chef Masaharu Morimoto's Asian fusion restaurant at Disney Springs is a feast for the senses. The menu includes sushi, dim sum, and other Asian-inspired dishes, and the decor is stunning.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o6.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Victoria & Albert's`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o3.jpg?w=500" },
      { name: `The Ravenous Pig`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o5.jpg?w=500" },
      { name: `Se7en Bites`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o1.jpg?w=500" },
      { name: `Morimoto Asia`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o6.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Orlando, Florida (2010)`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Orlando, Florida (2010) fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Sep – Nov before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o2.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: null
  },
  {
    slug: "gulf-shores-al-2012",
    name: `Gulf Shores, Alabama`,
    country: `USA`,
    tag: `Beach Week`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900",
    coords: { top: "33.2%", left: "25.6%" },
    quickFacts: [
      { label: "Best time to go", value: `May – Sep` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Gulf Shores, Alabama earned its spot on the map for beach week — relax on the beach was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Relax on the beach`,
`Visit Gulf State Park`,
`Explore Bon Secour National Wildlife Refuge`,
`Take a dolphin watching tour`,
`Go fishing`
    ],
    restaurants: [
      { name: `The Hangout`, location: `Gulf Shores, Alabama`, rating: 4.3, review: `This family-friendly restaurant is a local favorite with live music, beach volleyball, and delicious food. They serve a variety of seafood dishes, burgers, sandwiches, and salads.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900" },
      { name: `LuLu's Gulf Shores`, location: `Gulf Shores, Alabama`, rating: 4.5, review: `Owned by Jimmy Buffett's sister, LuLu's is a fun and lively restaurant that serves seafood, burgers, and salads. They have a great outdoor area with a sandy beach and plenty of seating.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900" },
      { name: `Bahama Bob's Beachside Cafe`, location: `Gulf Shores, Alabama`, rating: 4.6, review: `This casual beachfront restaurant is known for its fresh seafood, including shrimp, crab, and fish tacos. They also have a variety of salads, sandwiches, and burgers.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900" },
      { name: `Fisher's at Orange Beach Marina`, location: `Gulf Shores, Alabama`, rating: 4.3, review: `This upscale restaurant offers stunning views of the marina and serves seafood, steaks, and sushi. They have a great wine list and a creative cocktail menu.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `The Hangout`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=500" },
      { name: `LuLu's Gulf Shores`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=500" },
      { name: `Bahama Bob's Beachside Cafe`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=500" },
      { name: `Fisher's at Orange Beach Marina`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Gulf Shores, Alabama`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Gulf Shores, Alabama fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for May – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "hill-country-tx-2012",
    name: `Hill Country, Texas`,
    country: `USA`,
    tag: `Lake House Weekends`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h1.jpg?w=900",
    coords: { top: "33.2%", left: "22.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – May` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Hill Country, Texas earned its spot on the map for lake house weekends — visit wineries and breweries was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Visit wineries and breweries`,
`Explore state parks`,
`Visit historic sites`,
`Enjoy live music`,
`Explore small towns`
    ],
    restaurants: [
      { name: `Salt Lick BBQ`, location: `Hill Country, Texas`, rating: 4.3, review: `This legendary BBQ joint in Driftwood, Texas, is known for its juicy brisket, smoked sausage, and pork ribs. The restaurant offers a family-style dining experience with a rustic ambiance and live music.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1.jpg?w=900" },
      { name: `The Leaning Pear`, location: `Hill Country, Texas`, rating: 4.5, review: `This farm-to-table restaurant in Wimberley, Texas, serves contemporary American cuisine with a focus on locally sourced ingredients. The menu changes seasonally, and the restaurant has an extensive wine list.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h1.jpg?w=900" },
      { name: `August E's`, location: `Hill Country, Texas`, rating: 4.6, review: `This modern Asian fusion restaurant in Fredericksburg, Texas, offers a unique dining experience with a creative menu featuring dishes like Korean-style fried chicken and beef pho.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h4.jpg?w=900" },
      { name: `Coopers Old Time Pit Bar-B-Que`, location: `Hill Country, Texas`, rating: 4.3, review: `This iconic BBQ joint in Llano, Texas, is known for its tender and smoky brisket and sausage. The restaurant offers a casual dining experience with a family-friendly atmosphere.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h3.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Salt Lick BBQ`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1.jpg?w=500" },
      { name: `The Leaning Pear`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h1.jpg?w=500" },
      { name: `August E's`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h4.jpg?w=500" },
      { name: `Coopers Old Time Pit Bar-B-Que`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h3.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Hill Country, Texas`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Hill Country, Texas fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Mar – May before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h4.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h2.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "atlanta-ga-2013",
    name: `Atlanta, Georgia`,
    country: `USA`,
    tag: `Southern City Break`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a3.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a1.jpg?w=900",
    coords: { top: "31.3%", left: "26.6%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Atlanta, Georgia earned its spot on the map for southern city break — visit the georgia aquarium was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Visit the Georgia Aquarium`,
`Explore the Martin Luther King Jr. National Historic Site`,
`Tour the World of Coca-Cola`,
`Visit the Atlanta Botanical Garden`,
`Check out the High Museum of Art`
    ],
    restaurants: [
      { name: `The Optimist`, location: `Atlanta, Georgia`, rating: 4.3, review: `This seafood restaurant is located in the heart of Atlanta and offers a selection of fresh seafood and oysters.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a3.jpg?w=900" },
      { name: `Staplehouse`, location: `Atlanta, Georgia`, rating: 4.5, review: `This restaurant serves up modern American cuisine using seasonal and locally-sourced ingredients. It's also a non-profit, with all proceeds going to support the Giving Kitchen, which helps restaurant workers in need.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a1.jpg?w=900" },
      { name: `Bacchanalia`, location: `Atlanta, Georgia`, rating: 4.6, review: `This upscale restaurant is known for its innovative, contemporary American cuisine and a extensive wine selection.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a7.jpg?w=900" },
      { name: `Fox Bros. Bar-B-Q`, location: `Atlanta, Georgia`, rating: 4.3, review: `A favorite among locals and visitors alike, this restaurant is known for its delicious BBQ meats and sides.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a5.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `The Optimist`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a3.jpg?w=500" },
      { name: `Staplehouse`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a1.jpg?w=500" },
      { name: `Bacchanalia`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a7.jpg?w=500" },
      { name: `Fox Bros. Bar-B-Q`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a5.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Atlanta, Georgia`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Atlanta, Georgia fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a7.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a4.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: null
  },
  {
    slug: "steamboat-springs-co-2014",
    name: `Steamboat Springs, Colorado`,
    country: `USA`,
    tag: `Mountain Town`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s6.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s7.jpg?w=900",
    coords: { top: "27.5%", left: "20.3%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Mar` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Steamboat Springs, Colorado earned its spot on the map for mountain town — skiing and snowboarding was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Skiing and snowboarding`,
`Hot springs`,
`Hiking and biking`,
`Horseback riding`,
`River rafting and kayaking`
    ],
    restaurants: [
      { name: `Laundry Kitchen & Cocktails`, location: `Steamboat Springs, Colorado`, rating: 4.3, review: `This trendy restaurant serves up delicious American cuisine, craft cocktails, and an extensive wine list.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s6.jpg?w=900" },
      { name: `Rex's American Grill & Bar`, location: `Steamboat Springs, Colorado`, rating: 4.5, review: `This classic American restaurant offers a wide range of dishes, including burgers, sandwiches, steaks, and seafood.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s7.jpg?w=900" },
      { name: `Mahogany Ridge Brewery & Grill`, location: `Steamboat Springs, Colorado`, rating: 4.6, review: `This brewery and restaurant offers a fantastic selection of craft beers and a menu featuring creative, locally sourced dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s1.jpg?w=900" },
      { name: `Salt & Lime`, location: `Steamboat Springs, Colorado`, rating: 4.3, review: `This vibrant Mexican restaurant serves up fresh and flavorful dishes, including tacos, burritos, and margaritas.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s5.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Laundry Kitchen & Cocktails`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s6.jpg?w=500" },
      { name: `Rex's American Grill & Bar`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s7.jpg?w=500" },
      { name: `Mahogany Ridge Brewery & Grill`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s1.jpg?w=500" },
      { name: `Salt & Lime`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s5.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Steamboat Springs, Colorado`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Steamboat Springs, Colorado fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Dec – Mar before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s7.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s2.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "galveston-tx-2015",
    name: `Galveston, Texas`,
    country: `USA`,
    tag: `Gulf Coast`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g3-1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g1-1.jpg?w=900",
    coords: { top: "33.7%", left: "23.7%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – Jun` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Galveston, Texas earned its spot on the map for gulf coast. One caption from the trip says it better than any guidebook could: “Sigh, already miss them” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Visit Galveston Island Historic Pleasure Pier`,
`Explore The Strand Historic District`,
`Relax on Galveston's Beaches`,
`Tour the Moody Mansion`,
`Discover Galveston's History at the Galveston Island Railroa`
    ],
    restaurants: [
      { name: `Gaido's Seafood Restaurant`, location: `Galveston, Texas`, rating: 4.3, review: `A Galveston institution known for its fresh seafood dishes and Gulf Coast flavors.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g3-1.jpg?w=900" },
      { name: `Rudy & Paco Restaurant & Bar`, location: `Galveston, Texas`, rating: 4.5, review: `Offers a blend of South American and Caribbean cuisines, known for its steaks and seafood.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g1-1.jpg?w=900" },
      { name: `Shrimp 'N Stuff Downtown`, location: `Galveston, Texas`, rating: 4.6, review: `Casual eatery serving up delicious fried shrimp, oysters, and other seafood specialties.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g4-1.jpg?w=900" },
      { name: `The Sunflower Bakery & Café`, location: `Galveston, Texas`, rating: 4.3, review: `Quaint café offering homemade baked goods, sandwiches, and a cozy atmosphere.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g8-1.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Gaido's Seafood Restaurant`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g3-1.jpg?w=500" },
      { name: `Rudy & Paco Restaurant & Bar`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g1-1.jpg?w=500" },
      { name: `Shrimp 'N Stuff Downtown`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g4-1.jpg?w=500" },
      { name: `The Sunflower Bakery & Café`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g8-1.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Galveston, Texas`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Galveston, Texas fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Mar – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g3-1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g1-1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g4-1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g8-1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g2-1.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "florida-keys-2017",
    name: `The Florida Keys`,
    country: `USA`,
    tag: `Island Chain`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k2.jpg?w=900",
    coords: { top: "36.3%", left: "27.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Apr` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `The Florida Keys earned its spot on the map for island chain. One caption from the trip says it better than any guidebook could: “On our way to snorkeling and scuba .... we're snuba-ing” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Explore Key West`,
`Visit Dry Tortugas National Park`,
`Snorkel or Dive the Florida Reef`,
`Visit Bahia Honda State Park`,
`Experience Key Largo's Underwater World`
    ],
    restaurants: [
      { name: `Blue Heaven (Key West)`, location: `The Florida Keys`, rating: 4.3, review: `Famous for its Key West-style cuisine, this restaurant offers a relaxed atmosphere with outdoor seating and live music.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k1.jpg?w=900" },
      { name: `Latitudes (Key West)`, location: `The Florida Keys`, rating: 4.5, review: `Located on Sunset Key, this waterfront restaurant offers stunning views and a diverse menu featuring fresh seafood and tropical flavors.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k2.jpg?w=900" },
      { name: `Hogfish Bar & Grill (Stock Island)`, location: `The Florida Keys`, rating: 4.6, review: `Known for its casual vibe and fresh seafood, Hogfish is a local favorite. Don't miss their signature hogfish sandwich!`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k3.jpg?w=900" },
      { name: `Marker 88 (Islamorada)`, location: `The Florida Keys`, rating: 4.3, review: `This waterfront restaurant offers a picturesque dining experience and a menu featuring seafood, steaks, and Caribbean-inspired dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k4.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Blue Heaven (Key West)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k1.jpg?w=500" },
      { name: `Latitudes (Key West)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k2.jpg?w=500" },
      { name: `Hogfish Bar & Grill (Stock Island)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k3.jpg?w=500" },
      { name: `Marker 88 (Islamorada)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k4.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of The Florida Keys`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in The Florida Keys fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Dec – Apr before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k4.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "miami-fl-2019",
    name: `Miami, Florida`,
    country: `USA`,
    tag: `Art Deco & Ocean`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m2.jpg?w=900",
    coords: { top: "35.7%", left: "27.7%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Apr` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English, Spanish` },
      { label: "Kid-chaos level", value: `High` }
    ],
    whyVisit: `Miami, Florida earned its spot on the map for art deco & ocean. One caption from the trip says it better than any guidebook could: “#fatboiproblems Takos, cheapest hang over med.” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Visit Miami Beach`,
`Explore the Art Deco Historic District`,
`Visit Vizcaya Museum and Gardens`,
`Experience the Wynwood Walls`,
`Discover Little Havana`
    ],
    restaurants: [
      { name: `Joe's Stone Crab`, location: `Miami, Florida`, rating: 4.3, review: `A Miami institution known for its fresh seafood and famous stone crab claws.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=900" },
      { name: `Versailles Restaurant`, location: `Miami, Florida`, rating: 4.5, review: `A legendary Cuban eatery serving authentic Cuban cuisine, including delicious Cuban sandwiches and pastries.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m2.jpg?w=900" },
      { name: `Yardbird Southern Table & Bar`, location: `Miami, Florida`, rating: 4.6, review: `Offers Southern comfort food with a modern twist, including their famous fried chicken and bourbon cocktails.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1-1.jpg?w=900" },
      { name: `Mandolin Aegean Bistro`, location: `Miami, Florida`, rating: 4.3, review: `A charming Mediterranean restaurant with a cozy courtyard, serving delicious Greek and Turkish dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Joe's Stone Crab`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=500" },
      { name: `Versailles Restaurant`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m2.jpg?w=500" },
      { name: `Yardbird Southern Table & Bar`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1-1.jpg?w=500" },
      { name: `Mandolin Aegean Bistro`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Miami, Florida`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Miami, Florida fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Dec – Apr before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1-1.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: null
  },
  {
    slug: "las-vegas-nv-2020",
    name: `Las Vegas, Nevada`,
    country: `USA`,
    tag: `Neon Desert`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l2.jpg?w=900",
    coords: { top: "29.9%", left: "18.0%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – May` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `High` }
    ],
    whyVisit: `Las Vegas, Nevada earned its spot on the map for neon desert. One caption from the trip says it better than any guidebook could: “Dim Sum w/Old Skool Brothers from way back in the day.” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Explore the Las Vegas Strip`,
`Visit the Casinos`,
`See a Show`,
`Experience Fremont Street`,
`Take a Helicopter Tour`
    ],
    restaurants: [
      { name: `Joel Robuchon`, location: `Las Vegas, Nevada`, rating: 4.3, review: `Located at the MGM Grand, this Michelin three-star restaurant offers an exquisite French dining experience with exceptional service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=900" },
      { name: `Guy Savoy`, location: `Las Vegas, Nevada`, rating: 4.5, review: `Situated at Caesars Palace, Guy Savoy is another Michelin three-star restaurant known for its elegant French cuisine, including signature dishes like artichoke and black truffle soup.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l2.jpg?w=900" },
      { name: `Raku`, location: `Las Vegas, Nevada`, rating: 4.6, review: `This off-Strip Japanese restaurant is beloved by locals and visitors alike. It serves authentic and delicious dishes such as skewered meats, sashimi, and robata-grilled items.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l1.jpg?w=900" },
      { name: `Lotus of Siam`, location: `Las Vegas, Nevada`, rating: 4.3, review: `A Las Vegas institution for Thai cuisine, Lotus of Siam features a diverse menu with flavorful dishes like pad Thai, crispy duck, and spicy curries.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Joel Robuchon`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=500" },
      { name: `Guy Savoy`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l2.jpg?w=500" },
      { name: `Raku`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l1.jpg?w=500" },
      { name: `Lotus of Siam`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Las Vegas, Nevada`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Las Vegas, Nevada fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Mar – May before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l1.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "winter-park-co-2021",
    name: `Winter Park, Colorado`,
    country: `USA`,
    tag: `Snow Season`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w8.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w2.jpg?w=900",
    coords: { top: "27.8%", left: "20.6%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Mar` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Winter Park, Colorado earned its spot on the map for snow season. One caption from the trip says it better than any guidebook could: “It's getting hot” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Skiing and Snowboarding`,
`Tubing`,
`Snowshoeing and Cross-Country Skiing`,
`Snowmobiling`,
`Ice Skating`
    ],
    restaurants: [
      { name: `Deno's Mountain Bistro`, location: `Winter Park, Colorado`, rating: 4.3, review: `This popular restaurant offers a warm and inviting atmosphere with a diverse menu featuring American and Mediterranean cuisine. Deno's is known for its delicious steaks, seafood, and pasta dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w8.jpg?w=900" },
      { name: `Hernando's Pizza Pub`, location: `Winter Park, Colorado`, rating: 4.5, review: `A local favorite, Hernando's is famous for its mouthwatering pizza. With a rustic mountain lodge ambiance, this cozy spot is perfect for enjoying a slice or two after a day on the slopes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w2.jpg?w=900" },
      { name: `Volario's`, location: `Winter Park, Colorado`, rating: 4.6, review: `Located at the Vasquez Creek Inn, Volario's serves up authentic Italian cuisine in a charming setting. The menu features homemade pasta, wood-fired pizza, and a variety of Italian specialties.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w7.jpg?w=900" },
      { name: `The Ditch on 40`, location: `Winter Park, Colorado`, rating: 4.3, review: `This casual restaurant offers a vibrant atmosphere and an extensive menu of American comfort food. Whether you're in the mood for a juicy burger, hearty sandwich, or flavorful salad, The Ditch on 40 has you covered.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w5.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Deno's Mountain Bistro`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w8.jpg?w=500" },
      { name: `Hernando's Pizza Pub`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w2.jpg?w=500" },
      { name: `Volario's`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w7.jpg?w=500" },
      { name: `The Ditch on 40`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w5.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Winter Park, Colorado`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Winter Park, Colorado fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Dec – Mar before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w8.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w7.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w6.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: null
  },
  {
    slug: "maui-hi-2022",
    name: `Maui, Hawaii`,
    country: `USA`,
    tag: `Volcanic Paradise`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h9.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h10.jpg?w=900",
    coords: { top: "38.4%", left: "6.6%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Oct` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Maui, Hawaii earned its spot on the map for volcanic paradise. One caption from the trip says it better than any guidebook could: “¤ï¸ they treated Anna to a free dessert.” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Road to Hana`,
`Haleakala National Park`,
`Snorkeling and Scuba Diving`,
`Whale Watching`,
`Maui Ocean Center`
    ],
    restaurants: [
      { name: `Mama's Fish House (Paia)`, location: `Maui, Hawaii`, rating: 4.3, review: `A legendary restaurant known for its fresh seafood, stunning ocean views, and Polynesian-inspired cuisine. It's a popular spot, so make sure to make a reservation in advance.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h9.jpg?w=900" },
      { name: `Lahaina Grill (Lahaina)`, location: `Maui, Hawaii`, rating: 4.5, review: `This award-winning restaurant offers a sophisticated dining experience with a menu featuring a fusion of Hawaiian and contemporary flavors. The atmosphere is elegant, and the service is exceptional.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h10.jpg?w=900" },
      { name: `Merriman's (Kapalua)`, location: `Maui, Hawaii`, rating: 4.6, review: `Located in the picturesque Kapalua resort area, Merriman's offers farm-to-table cuisine using locally sourced ingredients. The menu highlights the flavors of Hawaii and the Pacific Rim.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h5.jpg?w=900" },
      { name: `The Mill House (Waikapu)`, location: `Maui, Hawaii`, rating: 4.3, review: `Situated in a beautiful plantation-era building, The Mill House serves creative dishes crafted with ingredients grown on their own farm. It offers a unique farm-to-table experience with stunning views of the Maui Tropical Plantation.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h14.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Mama's Fish House (Paia)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h9.jpg?w=500" },
      { name: `Lahaina Grill (Lahaina)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h10.jpg?w=500" },
      { name: `Merriman's (Kapalua)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h5.jpg?w=500" },
      { name: `The Mill House (Waikapu)`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h14.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Maui, Hawaii`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Maui, Hawaii fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Apr – Oct before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h9.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h10.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h14.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h15.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "new-york-city-ny-2022",
    name: `New York City`,
    country: `USA`,
    tag: `The Big Apple`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n6.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n8.jpg?w=900",
    coords: { top: "27.4%", left: "29.4%" },
    quickFacts: [
      { label: "Best time to go", value: `Sep – Nov` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `High` }
    ],
    whyVisit: `New York City earned its spot on the map for the big apple. One caption from the trip says it better than any guidebook could: “Anna and her fatgurl problems.” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Visit Central Park`,
`Take in the views from the Empire State Building`,
`Walk the High Line`,
`Explore Times Square`,
`Visit the Metropolitan Museum of Art`
    ],
    restaurants: [
      { name: `Le Bernardin`, location: `New York City`, rating: 4.3, review: `A renowned seafood restaurant with three Michelin stars, known for its exquisite French cuisine and exceptional service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n6.jpg?w=900" },
      { name: `Peter Luger Steak House`, location: `New York City`, rating: 4.5, review: `A classic steakhouse in Brooklyn, famous for its dry-aged steaks and old-world charm. Make sure to try their iconic porterhouse steak.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n8.jpg?w=900" },
      { name: `Momofuku Ssäm Bar`, location: `New York City`, rating: 4.6, review: `This trendy spot in the East Village offers innovative Asian-inspired dishes, such as their famous pork buns and bo ssäm.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n10.jpg?w=900" },
      { name: `Katz's Delicatessen`, location: `New York City`, rating: 4.3, review: `A legendary Jewish deli on the Lower East Side, serving up delicious pastrami and corned beef sandwiches. Don't forget to grab a ticket and try their "sendwich" experience.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n4.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Le Bernardin`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n6.jpg?w=500" },
      { name: `Peter Luger Steak House`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n8.jpg?w=500" },
      { name: `Momofuku Ssäm Bar`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n10.jpg?w=500" },
      { name: `Katz's Delicatessen`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n4.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of New York City`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in New York City fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Sep – Nov before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n8.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n10.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n4.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n1.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "philadelphia-pa-2022",
    name: `Philadelphia, Pennsylvania`,
    country: `USA`,
    tag: `Brotherly Love`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p5.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p2.jpg?w=900",
    coords: { top: "27.8%", left: "29.1%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Philadelphia, Pennsylvania earned its spot on the map for brotherly love. One caption from the trip says it better than any guidebook could: “When you forget your wallet and run out on the check.  Should have told the kids our plans” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Visit Independence National Historical Park`,
`Explore the Philadelphia Museum of Art`,
`Discover the Reading Terminal Market`,
`Wander through the Philadelphia Magic Gardens`,
`Take a tour of Eastern State Penitentiary`
    ],
    restaurants: [
      { name: `Zahav`, location: `Philadelphia, Pennsylvania`, rating: 4.3, review: `This renowned Israeli restaurant offers a modern take on Middle Eastern cuisine, serving dishes like hummus, lamb shoulder, and grilled duck hearts. Don't miss the salatim and the incredible tasting menu.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p5.jpg?w=900" },
      { name: `Vernick Food & Drink`, location: `Philadelphia, Pennsylvania`, rating: 4.5, review: `Chef Greg Vernick's restaurant focuses on seasonal American cuisine with global influences. The menu features beautifully executed dishes like roasted sea bream, wood-grilled duck, and homemade pastas.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p2.jpg?w=900" },
      { name: `Vedge`, location: `Philadelphia, Pennsylvania`, rating: 4.6, review: `A popular choice for vegetarians and vegans, Vedge serves inventive plant-based dishes with bold flavors. Try their signature dishes like the rutabaga fondue, eggplant braciole, and the wood-roasted carrot.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p1.jpg?w=900" },
      { name: `Talula's Garden`, location: `Philadelphia, Pennsylvania`, rating: 4.3, review: `Located in Washington Square, this charming farm-to-table restaurant offers a delightful menu highlighting local and sustainable ingredients. The butternut squash ravioli, mushroom toast, and roasted chicken are crowd favorites.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p8.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Zahav`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p5.jpg?w=500" },
      { name: `Vernick Food & Drink`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p2.jpg?w=500" },
      { name: `Vedge`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p1.jpg?w=500" },
      { name: `Talula's Garden`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p8.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Philadelphia, Pennsylvania`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Philadelphia, Pennsylvania fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p8.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p6.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "washington-dc-2022",
    name: `Washington, D.C.`,
    country: `USA`,
    tag: `Monuments & Museums`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d3.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d6.jpg?w=900",
    coords: { top: "28.4%", left: "28.6%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – May` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Washington, D.C. earned its spot on the map for monuments & museums. One caption from the trip says it better than any guidebook could: “James Bond original 007 Jag” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Visit the National Mall`,
`Explore the Smithsonian Museums`,
`Tour the U.S. Capitol`,
`Visit the White House`,
`Explore the National Zoo`
    ],
    restaurants: [
      { name: `Rose's Luxury`, location: `Washington, D.C.`, rating: 4.3, review: `This award-winning restaurant offers a unique and innovative dining experience with a changing menu featuring seasonal dishes. The food is creative, flavorful, and beautifully presented.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d3.jpg?w=900" },
      { name: `Little Serow`, location: `Washington, D.C.`, rating: 4.5, review: `If you're a fan of Thai cuisine, Little Serow is a must-visit. This small and intimate restaurant serves up authentic and spicy Northern Thai dishes in a prix-fixe format. Reservations are highly recommended.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d6.jpg?w=900" },
      { name: `Fiola`, location: `Washington, D.C.`, rating: 4.6, review: `Fiola is a fine dining establishment that specializes in Italian cuisine. The menu features exquisite dishes made with high-quality ingredients, and the service is impeccable.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d5.jpg?w=900" },
      { name: `The Dabney`, location: `Washington, D.C.`, rating: 4.3, review: `Located in a historic row house, The Dabney focuses on showcasing the Mid-Atlantic region's local ingredients. The menu changes frequently to highlight seasonal offerings, and the open kitchen adds to the restaurant's charm.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d9.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Rose's Luxury`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d3.jpg?w=500" },
      { name: `Little Serow`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d6.jpg?w=500" },
      { name: `Fiola`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d5.jpg?w=500" },
      { name: `The Dabney`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d9.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Washington, D.C.`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Washington, D.C. fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Mar – May before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d9.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d10.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "florence-italy-2023",
    name: `Florence`,
    country: `Italy`,
    tag: `Renaissance City`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f15.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f11.jpg?w=900",
    coords: { top: "25.7%", left: "53.1%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Florence earned its spot on the map for renaissance city. One caption from the trip says it better than any guidebook could: “Drinking Dante tonight, only one more Artist beer left for me to try.” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Visit the Florence Cathedral (Duomo)`,
`Explore the Uffizi Gallery`,
`Wander through the Historic Center`,
`Visit the Galleria dell'Accademia`,
`Explore the Pitti Palace and Boboli Gardens`
    ],
    restaurants: [
      { name: `Osteria All'Antico Vinaio`, location: `Florence`, rating: 4.3, review: `This small sandwich shop is a local favorite and serves delicious traditional Tuscan panini. The sandwiches are made with high-quality ingredients, and the flavors are incredible.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f15.jpg?w=900" },
      { name: `Trattoria Mario`, location: `Florence`, rating: 4.5, review: `Located near the Mercato Centrale, this traditional trattoria offers classic Tuscan dishes. The menu changes daily, but you can expect hearty, home-cooked meals like ribollita, bistecca alla Fiorentina, and handmade pasta.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f11.jpg?w=900" },
      { name: `La Giostra`, location: `Florence`, rating: 4.6, review: `A charming restaurant with a medieval atmosphere, La Giostra offers a mix of Italian and international dishes. The menu features creative options such as pear and pecorino cheese ravioli and wild boar stew.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f3.jpg?w=900" },
      { name: `Il Santo Bevitore`, location: `Florence`, rating: 4.3, review: `This cozy and rustic restaurant focuses on seasonal ingredients and traditional Tuscan flavors. The menu is varied, and the dishes are beautifully presented. Don't miss their handmade pasta and the selection of local wines.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f2.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Osteria All'Antico Vinaio`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f15.jpg?w=500" },
      { name: `Trattoria Mario`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f11.jpg?w=500" },
      { name: `La Giostra`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f3.jpg?w=500" },
      { name: `Il Santo Bevitore`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f2.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Florence`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Florence fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f15.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f11.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f12.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "orlando-fl-2023",
    name: `Orlando, Florida (2023)`,
    country: `USA`,
    tag: `Back to the Parks`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/13.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/10.jpg?w=900",
    coords: { top: "34.1%", left: "27.4%" },
    quickFacts: [
      { label: "Best time to go", value: `Sep – Nov` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `High` }
    ],
    whyVisit: `Orlando, Florida (2023) earned its spot on the map for back to the parks — walt disney world was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Walt Disney World`,
`Universal Orlando Resort`,
`SeaWorld Orlando`,
`ICON Park`,
`Kennedy Space Center Visitor Complex`
    ],
    restaurants: [
      { name: `Victoria & Albert's`, location: `Orlando, Florida (2023)`, rating: 4.3, review: `Located at Disney's Grand Floridian Resort & Spa, this upscale restaurant offers a fine dining experience with a prix fixe menu. It's renowned for its exquisite cuisine and impeccable service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/13.jpg?w=900" },
      { name: `The Ravenous Pig`, location: `Orlando, Florida (2023)`, rating: 4.5, review: `A popular gastropub featuring a creative menu with a focus on locally sourced ingredients. It offers a mix of innovative dishes and classic pub fare.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/10.jpg?w=900" },
      { name: `Kadence`, location: `Orlando, Florida (2023)`, rating: 4.6, review: `A unique omakase-style sushi experience where the chefs prepare and serve a curated selection of dishes right in front of you. Reservations are recommended well in advance.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/8.jpg?w=900" },
      { name: `Yellow Dog Eats`, location: `Orlando, Florida (2023)`, rating: 4.3, review: `A charming spot known for its creative sandwiches, salads, and quirky atmosphere. It's a local favorite for its delicious comfort food.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/12.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Victoria & Albert's`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/13.jpg?w=500" },
      { name: `The Ravenous Pig`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/10.jpg?w=500" },
      { name: `Kadence`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/8.jpg?w=500" },
      { name: `Yellow Dog Eats`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/12.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Orlando, Florida (2023)`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Orlando, Florida (2023) fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Sep – Nov before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/13.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/10.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/8.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/12.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/6.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "nashville-tn-2023",
    name: `Nashville, Tennessee`,
    country: `USA`,
    tag: `Music City`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394535282_10224807912293330_6820641152032916730_n.jpg?w=900",
    coords: { top: "29.9%", left: "25.9%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Nashville, Tennessee earned its spot on the map for music city — visit the country music hall of fame and museum was the highlight, and the food list only got longer the longer we stayed.`,
    thingsToDo: [
`Visit the Country Music Hall of Fame and Museum`,
`Catch Live Music`,
`Tour the Ryman Auditorium`,
`Explore the Nashville Parthenon`,
`Visit the Belle Meade Plantation`
    ],
    restaurants: [
      { name: `Hattie B's Hot Chicken`, location: `Nashville, Tennessee`, rating: 4.3, review: `If you're a fan of spicy fried chicken, Hattie B's is a must-visit. They offer various levels of heat, allowing you to choose your spice level.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=900" },
      { name: `Prince's Hot Chicken Shack`, location: `Nashville, Tennessee`, rating: 4.5, review: `Another excellent choice for hot chicken lovers, Prince's is one of the pioneers of Nashville hot chicken and offers a unique and flavorful experience.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394535282_10224807912293330_6820641152032916730_n.jpg?w=900" },
      { name: `Loveless Cafe`, location: `Nashville, Tennessee`, rating: 4.6, review: `Famous for its Southern comfort food, Loveless Cafe is renowned for its biscuits, country ham, and homemade preserves. A perfect spot for a traditional Southern breakfast or brunch.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394431453_10224811283697613_1664064479663080319_n.jpg?w=900" },
      { name: `Martin's Bar-B-Que Joint`, location: `Nashville, Tennessee`, rating: 4.3, review: `If you're craving barbecue, Martin's is the place to be. They serve mouthwatering smoked meats, including ribs, brisket, and pulled pork, along with a variety of tasty sauces.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Hattie B's Hot Chicken`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=500" },
      { name: `Prince's Hot Chicken Shack`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394535282_10224807912293330_6820641152032916730_n.jpg?w=500" },
      { name: `Loveless Cafe`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394431453_10224811283697613_1664064479663080319_n.jpg?w=500" },
      { name: `Martin's Bar-B-Que Joint`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Nashville, Tennessee`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Nashville, Tennessee fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394535282_10224807912293330_6820641152032916730_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394431453_10224811283697613_1664064479663080319_n.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: null
  },
  {
    slug: "austin-san-antonio-2024",
    name: `Austin & San Antonio`,
    country: `USA`,
    tag: `Texas Road Trip`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451615030_10226039681406788_8818278162153046029_n.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452156104_10226054326372903_2747347177152676058_n.jpg?w=900",
    coords: { top: "33.4%", left: "22.7%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – May` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Austin & San Antonio earned its spot on the map for texas road trip. One caption from the trip says it better than any guidebook could: “Rare bar and cafe establishment that let dogs inside.  Time for ð¸” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Barton Springs Pool`,
`Hiking and Biking Trails`,
`Mount Bonnell`,
`Zilker Park`,
`Lady Bird Johnson Wildflower Center`
    ],
    restaurants: [
      { name: `Franklin Barbecue`, location: `Austin & San Antonio`, rating: 4.3, review: `Famous for its mouth-watering brisket and long lines, this spot is a must for barbecue lovers.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451615030_10226039681406788_8818278162153046029_n.jpg?w=900" },
      { name: `Uchi`, location: `Austin & San Antonio`, rating: 4.5, review: `A renowned spot for Japanese cuisine, offering a creative menu of sushi and sashimi in a stylish setting.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452156104_10226054326372903_2747347177152676058_n.jpg?w=900" },
      { name: `Emmer & Rye`, location: `Austin & San Antonio`, rating: 4.6, review: `Known for its focus on seasonal and local ingredients, this restaurant offers a unique dining experience with dim sum-style service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452236550_10226052782414305_457577436554945498_n.jpg?w=900" },
      { name: `Torchy's Tacos`, location: `Austin & San Antonio`, rating: 4.3, review: `A local favorite for innovative and delicious tacos with unique flavor combinations.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451808518_10226052781294277_6148522228529596158_n.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Franklin Barbecue`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451615030_10226039681406788_8818278162153046029_n.jpg?w=500" },
      { name: `Uchi`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452156104_10226054326372903_2747347177152676058_n.jpg?w=500" },
      { name: `Emmer & Rye`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452236550_10226052782414305_457577436554945498_n.jpg?w=500" },
      { name: `Torchy's Tacos`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451808518_10226052781294277_6148522228529596158_n.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Austin & San Antonio`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Austin & San Antonio fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Mar – May before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451615030_10226039681406788_8818278162153046029_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452156104_10226054326372903_2747347177152676058_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452236550_10226052782414305_457577436554945498_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451808518_10226052781294277_6148522228529596158_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452099883_10226052647650936_809883522010502635_n.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "twin-lakes-co-2024",
    name: `Twin Lakes, Colorado`,
    country: `USA`,
    tag: `Alpine Lakes`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454741954_10226247521722666_8320194507133385005_n.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454773247_10226247522282680_6115943612354302074_n.jpg?w=900",
    coords: { top: "28.3%", left: "20.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Jun – Sep` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Twin Lakes, Colorado earned its spot on the map for alpine lakes. One caption from the trip says it better than any guidebook could: “Much needed fluid replenishment after a full day of hitting the slopes.” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Explore Twin Lakes`,
`Hiking`,
`Mount Elbert`,
`Fishing`,
`Interlaken Historic Resort`
    ],
    restaurants: [
      { name: `The Twin Lakes Inn & Saloon`, location: `Twin Lakes, Colorado`, rating: 4.3, review: `A historic establishment offering classic American cuisine with a focus on locally sourced ingredients. The atmosphere is cozy and rustic, making it a perfect spot after a day of exploring the area.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454741954_10226247521722666_8320194507133385005_n.jpg?w=900" },
      { name: `The Twin Lakes General Store`, location: `Twin Lakes, Colorado`, rating: 4.5, review: `While primarily a store, it offers fresh sandwiches, baked goods, and coffee. It’s a great spot to grab a quick bite before heading out to explore the lakes and trails.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454773247_10226247522282680_6115943612354302074_n.jpg?w=900" },
      { name: `The Dayton Room`, location: `Twin Lakes, Colorado`, rating: 4.6, review: `Located within the Twin Lakes Inn, this restaurant provides a fine dining experience with a menu that features both creative dishes and comforting classics. It's known for its exceptional service and intimate setting.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454731192_10226247522882695_8438940723759965963_n.jpg?w=900" },
      { name: `Casa Sanchez`, location: `Twin Lakes, Colorado`, rating: 4.3, review: `Located nearby in Leadville, this Mexican restaurant offers delicious, authentic Mexican cuisine. It’s worth the short drive if you're craving something different.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454839035_10226247524002723_1749134143176923779_n.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `The Twin Lakes Inn & Saloon`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454741954_10226247521722666_8320194507133385005_n.jpg?w=500" },
      { name: `The Twin Lakes General Store`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454773247_10226247522282680_6115943612354302074_n.jpg?w=500" },
      { name: `The Dayton Room`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454731192_10226247522882695_8438940723759965963_n.jpg?w=500" },
      { name: `Casa Sanchez`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454839035_10226247524002723_1749134143176923779_n.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Twin Lakes, Colorado`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Twin Lakes, Colorado fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Jun – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454741954_10226247521722666_8320194507133385005_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454773247_10226247522282680_6115943612354302074_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454731192_10226247522882695_8438940723759965963_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454839035_10226247524002723_1749134143176923779_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454952636_10226247525122751_519605023286031266_n.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "seattle-wa-2025",
    name: `Seattle, Washington`,
    country: `USA`,
    tag: `Pacific Northwest`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1040562209185833217451560.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250322_1211441957187576267787351.jpg?w=900",
    coords: { top: "23.6%", left: "16.0%" },
    quickFacts: [
      { label: "Best time to go", value: `Jun – Sep` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Seattle, Washington earned its spot on the map for pacific northwest. One caption from the trip says it better than any guidebook could: “Ferry ´ï¸ time for a day trip to Bainbridge Island ð” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Pike Place Market`,
`Space Needle`,
`Chihuly Garden and Glass`,
`Kerry Park`,
`Mount Rainier National Park`
    ],
    restaurants: [
      { name: `Canlis`, location: `Seattle, Washington`, rating: 4.3, review: `Iconic fine dining with a stunning view and innovative Northwest cuisine.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1040562209185833217451560.jpg?w=900" },
      { name: `The Walrus and the Carpenter`, location: `Seattle, Washington`, rating: 4.5, review: `Famous for oysters and small seafood plates.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250322_1211441957187576267787351.jpg?w=900" },
      { name: `Din Tai Fung`, location: `Seattle, Washington`, rating: 4.6, review: `Famous for soup dumplings and Taiwanese dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250320_1053527e28838980681902663328.jpg?w=900" },
      { name: `Tilikum Place Café`, location: `Seattle, Washington`, rating: 4.3, review: `Known for its amazing Dutch baby pancakes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1116097723142783135128774.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Canlis`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1040562209185833217451560.jpg?w=500" },
      { name: `The Walrus and the Carpenter`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250322_1211441957187576267787351.jpg?w=500" },
      { name: `Din Tai Fung`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250320_1053527e28838980681902663328.jpg?w=500" },
      { name: `Tilikum Place Café`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1116097723142783135128774.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Seattle, Washington`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Seattle, Washington fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Jun – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1040562209185833217451560.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250322_1211441957187576267787351.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250320_1053527e28838980681902663328.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1116097723142783135128774.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250322_12113786682444404878339.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "boston-mv-2025",
    name: `Boston & Martha's Vineyard`,
    country: `USA`,
    tag: `New England`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514514037_10229925389667066_6430556743000150894_n.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514413063_10230024803592352_7441508285926522327_n.jpg?w=900",
    coords: { top: "26.5%", left: "30.3%" },
    quickFacts: [
      { label: "Best time to go", value: `Jun – Sep` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Boston & Martha's Vineyard earned its spot on the map for new england. One caption from the trip says it better than any guidebook could: “They choose the wrong line, look at them back there.” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Walk the Freedom Trail`,
`Boston Tea Party Ships & Museum`,
`Visit the USS Constitution`,
`Ride the Flying Horses Carousel (Oak Bluffs)`,
`Sunset in Menemsha`
    ],
    restaurants: [
      { name: `Union Oyster House`, location: `Boston & Martha's Vineyard`, rating: 4.3, review: `Oldest continuously operating restaurant in the U.S. — go for clam chowder, oysters, baked stuffed lobster.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514514037_10229925389667066_6430556743000150894_n.jpg?w=900" },
      { name: `Neptune Oyster`, location: `Boston & Martha's Vineyard`, rating: 4.5, review: `Tiny, no-reservations spot known for some of the best lobster rolls in the North End.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514413063_10230024803592352_7441508285926522327_n.jpg?w=900" },
      { name: `Giacomo's`, location: `Boston & Martha's Vineyard`, rating: 4.6, review: `Tiny, loud, cash-only — authentic pasta and seafood; the lobster fra diavolo is legendary.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/515935363_10230024805032388_5201113540585239684_n.jpg?w=900" },
      { name: `The Black Dog Tavern`, location: `Boston & Martha's Vineyard`, rating: 4.3, review: `Iconic and family-friendly on Martha's Vineyard — get the clam chowder and blueberry pancakes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514272391_10229980722170344_7946737040818197237_n.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Union Oyster House`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514514037_10229925389667066_6430556743000150894_n.jpg?w=500" },
      { name: `Neptune Oyster`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514413063_10230024803592352_7441508285926522327_n.jpg?w=500" },
      { name: `Giacomo's`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/515935363_10230024805032388_5201113540585239684_n.jpg?w=500" },
      { name: `The Black Dog Tavern`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514272391_10229980722170344_7946737040818197237_n.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Boston & Martha's Vineyard`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Boston & Martha's Vineyard fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Jun – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514514037_10229925389667066_6430556743000150894_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514413063_10230024803592352_7441508285926522327_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/515935363_10230024805032388_5201113540585239684_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514272391_10229980722170344_7946737040818197237_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514514037_10229925389667066_6430556743000150894_n-1.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  },
  {
    slug: "san-francisco-2026",
    name: `San Francisco, California`,
    country: `USA`,
    tag: `Bay Views`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/705717879_10233905444045938_4159279485583045890_n.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707580717_10233944377779257_6490851226168534751_n.jpg?w=900",
    coords: { top: "29.0%", left: "16.0%" },
    quickFacts: [
      { label: "Best time to go", value: `Sep – Oct` },
      { label: "Currency", value: `US Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `San Francisco, California earned its spot on the map for bay views. One caption from the trip says it better than any guidebook could: “Shopping and exploring day” — and honestly, that about sums up how this one went.`,
    thingsToDo: [
`Golden Gate Bridge`,
`Alcatraz Island`,
`Chinatown + North Beach Walk`,
`Twin Peaks Sunset View`,
`Lombard Street`
    ],
    restaurants: [
      { name: `Hog Island Oyster Co.`, location: `San Francisco, California`, rating: 4.3, review: `Fresh oysters, clam chowder, and grilled cheese with oysters — very Northern California.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/705717879_10233905444045938_4159279485583045890_n.jpg?w=900" },
      { name: `Swan Oyster Depot`, location: `San Francisco, California`, rating: 4.5, review: `Legendary tiny seafood counter. Expect a line.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707580717_10233944377779257_6490851226168534751_n.jpg?w=900" },
      { name: `Tadich Grill`, location: `San Francisco, California`, rating: 4.6, review: `Classic historic SF restaurant dating back to the Gold Rush era.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707447081_10233944376619228_3714820704832277364_n.jpg?w=900" },
      { name: `Tartine Bakery`, location: `San Francisco, California`, rating: 4.3, review: `Probably the city's most famous bakery.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/708300398_10233944378699280_8821601808691334938_n.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Hog Island Oyster Co.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/705717879_10233905444045938_4159279485583045890_n.jpg?w=500" },
      { name: `Swan Oyster Depot`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707580717_10233944377779257_6490851226168534751_n.jpg?w=500" },
      { name: `Tadich Grill`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707447081_10233944376619228_3714820704832277364_n.jpg?w=500" },
      { name: `Tartine Bakery`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/708300398_10233944378699280_8821601808691334938_n.jpg?w=500" }
    ],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of San Francisco, California`,
`The neighborhood just past the obvious tourist center, worth a wander`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in San Francisco, California fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Sep – Oct before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/705717879_10233905444045938_4159279485583045890_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707580717_10233944377779257_6490851226168534751_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707447081_10233944376619228_3714820704832277364_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/708300398_10233944378699280_8821601808691334938_n.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707460703_10233944377259244_7653893899704773306_n.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  }
,
  {
    slug: "rome-2022",
    name: `Rome`,
    country: `Italy`,
    tag: `Italy 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i15.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i3.jpg?w=900",
    coords: { top: "26.7%", left: "53.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Rome was one stop on our Italy trip, and it earned its place — visit the colosseum and roman forum in rome.`,
    thingsToDo: [
`Visit the Colosseum and Roman Forum in Rome`,
`Visit the Vatican City`,
`Taste Italian cuisine`,
`Walk along the Amalfi Coast`,
`Explore the ruins of Pompeii`
    ],
    restaurants: [
      { name: `Da Enzo al 29`, location: `Rome`, rating: 4.5, review: `This rustic restaurant serves up traditional Roman dishes in a cozy atmosphere, and is a favorite among locals.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i3.jpg?w=900", communityReview: `Reviewers consistently call this one of the best meals of their trip, especially the carbonara and cacio e pepe — though many mention the wait can run past an hour.`, communitySource: "Google/Yelp/Tripadvisor" },
      { name: `La Pergola`, location: `Rome`, rating: 4.6, review: `Located on the top floor of the Rome Cavalieri hotel, this three-Michelin-starred restaurant offers stunning views of the city along with exquisite cuisine.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i9.jpg?w=900", communityReview: `Reviewers frequently cite the view over Rome as reason enough to visit on its own, with the tasting menu and attentive staff earning consistent praise — some note it's a splurge best saved for a special occasion.`, communitySource: "Google/Yelp/Tripadvisor" },
      { name: `La Taverna dei Fori Imperiali`, location: `Rome`, rating: 4.3, review: `This cozy restaurant near the Roman Forum is known for its classic Roman dishes and warm atmosphere.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i6.jpg?w=900", communityReview: `A favorite for travelers near the Colosseum — reviewers highlight the fresh pasta and warm, welcoming service, though a few mention inconsistent food temperatures or tourist-level pricing.`, communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Il Pagliaccio`, location: `Rome`, rating: 4.6, review: `A two-Michelin-starred restaurant known for creative, boundary-pushing Italian cuisine from chef Anthony Genovese.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i15.jpg?w=900", communityReview: `Reviewers routinely rank this among the best tasting menus they've had anywhere, praising the inventive courses and attentive service — the price tag draws the only real criticism.`, communitySource: "Google/Yelp/Tripadvisor" }
    ],
    mustTryFoods: [
      { name: `Osteria Francescana, Modena`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i15.jpg?w=500" },
      { name: `Da Enzo al 29`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i3.jpg?w=500" },
      { name: `La Pergola`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i9.jpg?w=500" },
      { name: `La Taverna dei Fori Imperiali`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i6.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Rome away from the main sights, worth the wander`,
`Go early — Rome feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Rome fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i15.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i9.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i2.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: "italy-2022"
  },
  {
    slug: "florence-2022",
    name: `Florence`,
    country: `Italy`,
    tag: `Italy 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i8.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i7.jpg?w=900",
    coords: { top: "25.7%", left: "53.1%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Florence was one stop on our Italy trip, and it earned its place — see michelangelo's david in florence.`,
    thingsToDo: [
`See Michelangelo's David in Florence`,
`Take a wine tour in Tuscany`
    ],
    restaurants: [
      { name: `Trattoria da Tito`, location: `Florence`, rating: 4.3, review: `This classic Tuscan trattoria is known for its hearty, traditional dishes and friendly service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i8.jpg?w=900", communityReview: `Known for its graffiti-covered walls and rowdy, singing waiters as much as the Florentine steak — reviewers call it a fun, high-energy spot, though a few mention rushed service during busy hours.`, communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Trattoria Sostanza`, location: `Florence`, rating: 4.5, review: `This small, unassuming restaurant is known for its famous buttered chicken dish, as well as other classic Tuscan dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i7.jpg?w=900", communityReview: `The butter chicken has a near-legendary reputation online — reviewers repeatedly call it one of the best dishes they've had in Italy, with the communal seating adding to the charm for most diners.`, communitySource: "Google/Yelp/Tripadvisor" }
    ],
    mustTryFoods: [
      { name: `Trattoria da Tito`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i8.jpg?w=500" },
      { name: `Trattoria Sostanza`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i7.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Florence away from the main sights, worth the wander`,
`Go early — Florence feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Florence fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i8.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i7.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i14.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i5.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "italy-2022"
  },
  {
    slug: "pisa-2022",
    name: `Pisa`,
    country: `Italy`,
    tag: `Italy 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i16.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i12.jpg?w=900",
    coords: { top: "31.5%", left: "50.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `A quick stop mostly built around one very famous, very leaning tower — Pisa is small enough to see in an afternoon but worth the detour on the way between Florence and the coast.`,
    thingsToDo: [
      `See the Leaning Tower and Piazza dei Miracoli`,
      `Climb the tower if you booked ahead`,
      `Wander the Duomo and Baptistery grounds`
    ],
    restaurants: [
      { name: `La Torre`, location: `Pisa`, rating: 4.4, review: `A seafood-and-pasta spot just off the walk to the Leaning Tower, popular with both locals and travelers.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i16.jpg?w=900", communityReview: `Reviewers consistently praise the lobster pasta and seafood dishes, with several calling it one of the best meals of their Italy trip — a handful mention it gets busy at peak dinner hours.`, communitySource: "Google/Yelp/Tripadvisor" }
    ],
    mustTryFoods: [
      { name: `Seafood pasta`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i16.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Pisa away from the main sights, worth the wander`,
`Go early — Piazza dei Miracoli feels completely different before the tour buses arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book tower-climb tickets online in advance — they sell out same-day`,
`Pisa works well as a half-day stop rather than a full destination`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i16.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i12.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, though half a day was about right.`,
    relatedAdventure: "italy-2022"
  },
  {
    slug: "naples-2022",
    name: `Naples`,
    country: `Italy`,
    tag: `Italy 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i13.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i10.jpg?w=900",
    coords: { top: "45%", left: "51%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Naples is chaotic, loud, and the birthplace of pizza — the launch point for Pompeii and the Amalfi Coast, and a real change of pace from the Renaissance calm of Florence.`,
    thingsToDo: [
      `Explore the ruins of Pompeii`,
      `Walk the historic center`,
      `Eat pizza where it was invented`
    ],
    restaurants: [],
    mustTryFoods: [
      { name: `Neapolitan pizza`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i13.jpg?w=500" }
    ],
    hiddenGems: [
`Still need your input here — restaurant and hidden-gem picks pending your photo/story review`
    ],
    travelTips: [
`Check the weather for Apr – Jun before locking in dates`,
`Pompeii takes a half to full day — plan accordingly`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i13.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i10.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Pending your review — no personal notes on file yet.`,
    relatedAdventure: "italy-2022"
  },
  {
    slug: "amalfi-2022",
    name: `Amalfi Coast`,
    country: `Italy`,
    tag: `Italy 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i4.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i11.jpg?w=900",
    coords: { top: "46%", left: "51.5%" },
    quickFacts: [
      { label: "Best time to go", value: `May – Sep` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Cliffside towns, impossibly blue water, and a coastal road that's an experience in itself — the Amalfi Coast is the slow, scenic exhale after Naples.`,
    thingsToDo: [
      `Walk along the Amalfi Coast`,
      `Explore the cliffside towns`,
      `Take in the coastal drive`
    ],
    restaurants: [],
    mustTryFoods: [
      { name: `Limoncello`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i4.jpg?w=500" }
    ],
    hiddenGems: [
`Still need your input here — restaurant and hidden-gem picks pending your photo/story review`
    ],
    travelTips: [
`Check the weather for May – Sep before locking in dates`,
`The coastal roads are narrow and slow — build in extra travel time`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i4.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i11.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Pending your review — no personal notes on file yet.`,
    relatedAdventure: "italy-2022"
  },
  {
    slug: "tokyo-2019",
    name: `Tokyo`,
    country: `Japan`,
    tag: `Japan 2019 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j16.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j18.jpg?w=900",
    coords: { top: "30.2%", left: "88.8%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – May` },
      { label: "Currency", value: `Japanese Yen` },
      { label: "Language", value: `Japanese` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Tokyo was one stop on our Japan trip, and it earned its place — visit tokyo tower or the tokyo skytree for a panoramic view .`,
    thingsToDo: [
`Visit Tokyo Tower or the Tokyo Skytree for a panoramic view `,
`Take a dip in a traditional Japanese hot spring or "onsen", `,
`Sample delicious Japanese cuisine, such as sushi, ramen, tem`,
`Visit Japan's many museums, including the National Museum of`,
`Enjoy the beauty of Japan's cherry blossoms in spring, or th`
    ],
    restaurants: [
      { name: `Sukiyabashi Jiro`, location: `Tokyo`, rating: 4.3, review: `If you're a sushi lover, this is a must-visit restaurant in Tokyo featured in the famous documentary "Jiro Dreams of Sushi".`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j16.jpg?w=900" },
      { name: `Ichiran Ramen`, location: `Tokyo`, rating: 4.5, review: `This popular ramen chain in Tokyo allows diners to customize their own bowls of ramen in private booths.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j18.jpg?w=900" },
      { name: `Kikunoi`, location: `Tokyo`, rating: 4.6, review: `This three-Michelin-starred restaurant in Kyoto serves traditional kaiseki cuisine, a multi-course meal consisting of beautifully presented dishes made with seasonal ingredients.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j2.jpg?w=900" },
      { name: `Genki Sushi`, location: `Tokyo`, rating: 4.3, review: `This conveyor belt sushi chain is a fun and affordable option for sushi lovers in Tokyo and other cities.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j15.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Sukiyabashi Jiro`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j16.jpg?w=500" },
      { name: `Ichiran Ramen`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j18.jpg?w=500" },
      { name: `Kikunoi`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j2.jpg?w=500" },
      { name: `Genki Sushi`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j15.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Tokyo away from the main sights, worth the wander`,
`Go early — Tokyo feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Tokyo fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Mar – May before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j16.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j18.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j2.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j15.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j14.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "japan-2019"
  },
  {
    slug: "kyoto-2019",
    name: `Kyoto`,
    country: `Japan`,
    tag: `Japan 2019 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j20.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j19.jpg?w=900",
    coords: { top: "30.5%", left: "87.7%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – May` },
      { label: "Currency", value: `Japanese Yen` },
      { label: "Language", value: `Japanese` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Kyoto was one stop on our Japan trip, and it earned its place — take a walk through kyoto's gion district to see traditional.`,
    thingsToDo: [
`Take a walk through Kyoto's Gion district to see traditional`,
`Explore one of Japan's many historic temples, such as the ic`,
`Attend a traditional Japanese tea ceremony, or "chado", for `
    ],
    restaurants: [

    ],
    mustTryFoods: [
      { name: `Local specialties`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j20.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Kyoto away from the main sights, worth the wander`,
`Go early — Kyoto feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Kyoto fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Mar – May before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j20.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j19.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j9.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j1.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j13.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "japan-2019"
  },
  {
    slug: "osaka-2019",
    name: `Osaka`,
    country: `Japan`,
    tag: `Japan 2019 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j12.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j5.jpg?w=900",
    coords: { top: "30.7%", left: "87.6%" },
    quickFacts: [
      { label: "Best time to go", value: `Mar – May` },
      { label: "Currency", value: `Japanese Yen` },
      { label: "Language", value: `Japanese` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Osaka was one stop on our Japan trip, and it earned its place — explore osaka.`,
    thingsToDo: [
`Explore Osaka`
    ],
    restaurants: [
      { name: `Dotonbori Street`, location: `Osaka`, rating: 4.3, review: `Located in Osaka, this vibrant street is home to various street food vendors offering everything from takoyaki to okonomiyaki.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j12.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Dotonbori Street`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j12.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Osaka away from the main sights, worth the wander`,
`Go early — Osaka feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Osaka fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Mar – May before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j12.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j5.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j3.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j10.jpg?w=1000"],
    rating: 8,
    wouldReturn: `Yes, with a slightly longer stay next time.`,
    relatedAdventure: "japan-2019"
  },
  {
    slug: "mt-fuji-2019",
    name: `Mt. Fuji`,
    country: `Japan`,
    tag: `Japan 2019 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j17.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j8.jpg?w=900",
    coords: { top: "22%", left: "80.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Jun – Sep` },
      { label: "Currency", value: `Japanese Yen` },
      { label: "Language", value: `Japanese` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `A day trip out of Tokyo into the mountains — Japan's most iconic peak, at its best on a clear morning from one of the lakes at its base.`,
    thingsToDo: [
      `View Mt. Fuji from Lake Kawaguchiko or Hakone`,
      `Visit a traditional onsen (hot spring) with a view of the mountain`,
      `Photograph the peak from one of the classic viewpoints`
    ],
    restaurants: [],
    mustTryFoods: [
      { name: `Hoto noodles`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j17.jpg?w=500" }
    ],
    hiddenGems: [
`Still need your input here — restaurant and hidden-gem picks pending your photo/story review`
    ],
    travelTips: [
`Fuji is famously shy — check forecasts and go early for the best chance of clear skies`,
`Check the weather for Jun – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j17.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j8.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Pending your review — no personal notes on file yet.`,
    relatedAdventure: "japan-2019"
  },
  {
    slug: "athens-2022",
    name: `Athens`,
    country: `Greece`,
    tag: `Greece 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g16.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g13.jpg?w=900",
    coords: { top: "28.9%", left: "56.6%" },
    quickFacts: [
      { label: "Best time to go", value: `May – Sep` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Greek` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Athens was one stop on our Greece trip, and it earned its place — visit the acropolis.`,
    thingsToDo: [
`Visit the Acropolis`,
`Explore the Greek islands`,
`Try the local cuisine`,
`Go hiking or trekking`,
`Experience the nightlife`
    ],
    restaurants: [
      { name: `Nikolas Taverna`, location: `Athens`, rating: 4.3, review: `This traditional Greek taverna is located on the island of Mykonos and is known for its delicious grilled octopus, freshly caught seafood, and homemade desserts.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g16.jpg?w=900" },
      { name: `To Ouzeri tou Laki`, location: `Athens`, rating: 4.5, review: `This restaurant in Athens is famous for its ouzo, a Greek liquor, and meze, small plates of traditional Greek dishes like tzatziki, saganaki, and dolmades.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g13.jpg?w=900" },
      { name: `Kritamon`, location: `Athens`, rating: 4.6, review: `Located on the island of Crete, this restaurant offers a modern twist on traditional Cretan cuisine. Don't miss their lamb and eggplant moussaka or their homemade pasta dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g22.jpg?w=900" },
      { name: `Selene`, location: `Athens`, rating: 4.3, review: `This upscale restaurant in Santorini is known for its gourmet Greek cuisine made with locally sourced ingredients. Try their Santorinian fava, lobster pasta, and smoked pork with eggplant puree.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g20.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Nikolas Taverna`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g16.jpg?w=500" },
      { name: `To Ouzeri tou Laki`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g13.jpg?w=500" },
      { name: `Kritamon`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g22.jpg?w=500" },
      { name: `Selene`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g20.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Athens away from the main sights, worth the wander`,
`Go early — Athens feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Athens fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for May – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g16.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g13.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g22.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g20.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g8.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "greece-2022"
  },
  {
    slug: "santorini-2022",
    name: `Santorini`,
    country: `Greece`,
    tag: `Greece 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g17.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g19.jpg?w=900",
    coords: { top: "29.8%", left: "57.1%" },
    quickFacts: [
      { label: "Best time to go", value: `May – Sep` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Greek` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Santorini was one stop on our Greece trip, and it earned its place — explore santorini.`,
    thingsToDo: [
`Explore Santorini`
    ],
    restaurants: [

    ],
    mustTryFoods: [
      { name: `Local specialties`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g17.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Santorini away from the main sights, worth the wander`,
`Go early — Santorini feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Santorini fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for May – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g17.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g19.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g12.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g15.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g7.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "greece-2022"
  },
  {
    slug: "mykonos-2022",
    name: `Mykonos`,
    country: `Greece`,
    tag: `Greece 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g23.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g21.jpg?w=900",
    coords: { top: "29.2%", left: "57.0%" },
    quickFacts: [
      { label: "Best time to go", value: `May – Sep` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Greek` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Mykonos was one stop on our Greece trip, and it earned its place — explore mykonos.`,
    thingsToDo: [
`Explore Mykonos`
    ],
    restaurants: [

    ],
    mustTryFoods: [
      { name: `Local specialties`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g23.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Mykonos away from the main sights, worth the wander`,
`Go early — Mykonos feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Mykonos fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for May – Sep before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g23.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g21.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g9.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g6.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g4.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "greece-2022"
  },
  {
    slug: "auckland-2020",
    name: `Auckland`,
    country: `New Zealand`,
    tag: `New Zealand 2020 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz12.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz25.jpg?w=900",
    coords: { top: "70.5%", left: "98.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Feb` },
      { label: "Currency", value: `NZ Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Auckland was one stop on our New Zealand trip, and it earned its place — take a scenic drive along one of new zealand's many beautifu.`,
    thingsToDo: [
`Take a scenic drive along one of New Zealand's many beautifu`,
`Go hiking or tramping through the many scenic trails along t`,
`Explore the underground glowworm caves in Waitomo or the geo`,
`Try wine tasting in New Zealand's many world-renowned wineri`,
`Visit the Hobbiton movie set used in the Lord of the Rings a`
    ],
    restaurants: [
      { name: `Depot Eatery & Oyster Bar`, location: `Auckland`, rating: 4.3, review: `This Auckland restaurant is famous for its fresh New Zealand seafood, particularly the oysters.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz12.jpg?w=900" },
      { name: `The Grove`, location: `Auckland`, rating: 4.5, review: `A fine-dining restaurant in Auckland known for its innovative dishes using locally sourced ingredients.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz25.jpg?w=900" },
      { name: `Fergburger`, location: `Auckland`, rating: 4.6, review: `A burger joint in Queenstown that is famous for its delicious, oversized burgers and long lines.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz11.jpg?w=900" },
      { name: `Ortega Fish Shack`, location: `Auckland`, rating: 4.3, review: `A seafood restaurant in Wellington that offers a variety of dishes made from fresh, local seafood.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz22.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Depot Eatery & Oyster Bar`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz12.jpg?w=500" },
      { name: `The Grove`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz25.jpg?w=500" },
      { name: `Fergburger`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz11.jpg?w=500" },
      { name: `Ortega Fish Shack`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz22.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Auckland away from the main sights, worth the wander`,
`Go early — Auckland feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Auckland fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Dec – Feb before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz12.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz25.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz11.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz22.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz27.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "new-zealand-2020"
  },
  {
    slug: "queenstown-2020",
    name: `Queenstown`,
    country: `New Zealand`,
    tag: `New Zealand 2020 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz19.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz23.jpg?w=900",
    coords: { top: "75.0%", left: "96.9%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Feb` },
      { label: "Currency", value: `NZ Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Queenstown was one stop on our New Zealand trip, and it earned its place — visit fiordland national park to see fjords, mountains, wate.`,
    thingsToDo: [
`Visit Fiordland National Park to see fjords, mountains, wate`,
`Go bungee jumping, skydiving, or ziplining for a thrilling e`,
`Take a scenic flight over the Southern Alps or the glaciers `
    ],
    restaurants: [

    ],
    mustTryFoods: [
      { name: `Local specialties`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz19.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Queenstown away from the main sights, worth the wander`,
`Go early — Queenstown feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Queenstown fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Dec – Feb before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz19.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz23.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz7.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz8.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz4.jpg?w=1000"],
    rating: 10,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "new-zealand-2020"
  },
  {
    slug: "wellington-2020",
    name: `Wellington`,
    country: `New Zealand`,
    tag: `New Zealand 2020 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz14.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz29.jpg?w=900",
    coords: { top: "72.9%", left: "98.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Dec – Feb` },
      { label: "Currency", value: `NZ Dollar` },
      { label: "Language", value: `English` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Wellington was one stop on our New Zealand trip, and it earned its place — explore wellington.`,
    thingsToDo: [
`Explore Wellington`
    ],
    restaurants: [
      { name: `Wellington Chocolate Factory`, location: `Wellington`, rating: 4.3, review: `A chocolate factory in Wellington that also operates a café offering a variety of chocolate treats.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz14.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Wellington Chocolate Factory`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz14.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Wellington away from the main sights, worth the wander`,
`Go early — Wellington feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Wellington fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Dec – Feb before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz14.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz29.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz26.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz15.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz3.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: "new-zealand-2020"
  },
  {
    slug: "paris-2017",
    name: `Paris`,
    country: `France`,
    tag: `France 2017 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr4.jpg?w=900",
    coords: { top: "22.9%", left: "50.7%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `French` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Paris was one stop on our France trip, and it earned its place — visit the eiffel tower.`,
    thingsToDo: [
`Visit the Eiffel Tower`,
`Explore the Palace of Versailles`,
`Visit the Louvre Museum`,
`Walk along Champs-Elysées`,
`Taste French cuisine`
    ],
    restaurants: [
      { name: `Le Jules Verne`, location: `Paris`, rating: 4.3, review: `Located on the Eiffel Tower, this Michelin-starred restaurant offers incredible views of Paris while enjoying French cuisine.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=900" },
      { name: `Le Comptoir du Relais`, location: `Paris`, rating: 4.5, review: `This lively bistro serves classic French dishes like escargots, beef tartare, and coq au vin. It's popular with locals and tourists alike.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr4.jpg?w=900" },
      { name: `Le Grand Véfour`, location: `Paris`, rating: 4.6, review: `This elegant restaurant has been a favorite of the city's elite since the 18th century. It serves classic French dishes in a stunning historic setting.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr5.jpg?w=900" },
      { name: `L'Ambroisie`, location: `Paris`, rating: 4.3, review: `This three-Michelin-starred restaurant is known for its elegant and refined French cuisine, utilizing only the freshest ingredients. It's a perfect date restaurant with its romantic ambiance.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=900" }
    ],
    mustTryFoods: [
      { name: `Le Jules Verne`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=500" },
      { name: `Le Comptoir du Relais`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr4.jpg?w=500" },
      { name: `Le Grand Véfour`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr5.jpg?w=500" },
      { name: `L'Ambroisie`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=500" }
    ],
    hiddenGems: [
`A quiet corner of Paris away from the main sights, worth the wander`,
`Go early — Paris feels completely different before the crowds arrive`,
`Ask a local for their favorite spot; it's usually the best one`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best tables in Paris fill up`,
`Pace the day around one big sight and one slow meal`,
`Check the weather for Apr – Jun before locking in dates`
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr4.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr5.jpg?w=1000"],
    rating: 9,
    wouldReturn: `Yes — already looking for an excuse to go back.`,
    relatedAdventure: null
  }
];

const ADVENTURES = [
  {
    slug: "southeast-asia-2026",
    title: "Southeast Asia 2026",
    subtitle: "Seven stops, one family, and considerably more street food than planned.",
    heroImg: wpImg(797, 1800),
    duration: "24 days",
    distance: "~4,100 km overland & sea",
    stops: ["hong-kong", "koh-samui", "bangkok", "ho-chi-minh-city", "an-giang", "hanoi", "ha-long-bay"],
    intro: "This was the trip we'd been circling for three years — a slow arc from Hong Kong's vertical density down into Thailand's beaches, then north through Vietnam from the Mekong Delta to the karsts of the north. It nearly fell apart twice and turned into our favorite trip yet.",
    topExperiences: [
      "Victoria Peak at sunset (Hong Kong)",
      "Star Ferry across Victoria Harbour (Hong Kong)",
      "Fire show at Coco Tam's (Koh Samui)",
      "Ang Thong Marine Park (Koh Samui)",
      "Wat Arun at sunset (Bangkok)",
      "Yaowarat street food crawl (Bangkok)",
      "Food crawl through Hanoi's Old Quarter — pho, bun cha, egg coffee",
      "Boat ride through Trà Sư Cajuput Forest (An Giang)",
      "Overnight cruise in Hạ Long Bay",
      "Sunrise over Hạ Long Bay"
    ],
    topRestaurants: [
      "Mott 32 (Hong Kong)",
      "Tim Ho Wan (Hong Kong)",
      "Jay Fai (Bangkok)",
      "Coco Tam's (Koh Samui)",
      "Pizza 4P's (Ho Chi Minh City)",
      "Bún Chả Hương Liên (Hanoi)",
      "Phở Gia Truyền Bát Đàn (Hanoi)",
      "Cafe Giảng (Hanoi)",
      "Chả Cá Thăng Long (Hanoi)",
      "Cục Gạch Quán (Ho Chi Minh City)"
    ]
  }
,
  {
    slug: "italy-2022",
    title: `Italy 2022`,
    subtitle: `A grand tour through Rome, Florence, Pisa, Naples, and the Amalfi Coast.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i15.jpg?w=1800",
    duration: "Multi-city",
    distance: "",
    stops: ["rome-2022", "florence-2022", "pisa-2022", "naples-2022", "amalfi-2022"],
    intro: `A trip through Rome, Florence, Pisa, Naples, and the Amalfi Coast — Renaissance cities, a leaning tower, and a coastal road that's an experience in itself.`
  },
  {
    slug: "japan-2019",
    title: `Japan 2019`,
    subtitle: `Temples, trains, and far too much ramen through Tokyo, Kyoto, Osaka, and Mt. Fuji.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j16.jpg?w=1800",
    duration: "Multi-city",
    distance: "",
    stops: ["tokyo-2019", "kyoto-2019", "osaka-2019", "mt-fuji-2019"],
    intro: `A trip through Tokyo, Kyoto, Osaka, and Mt. Fuji — temples, trains, and far too much ramen along the way.`
  },
  {
    slug: "greece-2022",
    title: `Greece 2022`,
    subtitle: `Island-hopping through Athens, Santorini, and Mykonos.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g16.jpg?w=1800",
    duration: "Multi-city",
    distance: "",
    stops: ["athens-2022", "santorini-2022", "mykonos-2022"],
    intro: `A trip through Athens, Santorini, and Mykonos — island-hopping through ancient ruins and whitewashed cliffside towns.`
  },
  {
    slug: "new-zealand-2020",
    title: `New Zealand 2020`,
    subtitle: `Fjords, hobbits, and flat whites through Auckland, Queenstown, and Wellington.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz12.jpg?w=1800",
    duration: "Multi-city",
    distance: "",
    stops: ["auckland-2020", "queenstown-2020", "wellington-2020"],
    intro: `A trip through Auckland, Queenstown, and Wellington — fjords, hobbits, and flat whites across the North and South Islands.`
  }
];

const MISADVENTURES = [
  {
    icon: "🛵",
    title: "The Great Motorbike Standoff",
    location: "Ho Chi Minh City, Vietnam",
    body: "We spent our first twenty minutes in the city standing at a curb, frozen, while a river of scooters parted around a very confused family of four. A local grandmother eventually just grabbed our hands and walked us across like it was nothing. It was, apparently, nothing."
  },
  {
    icon: "🦀",
    title: "The Crab Omelet Wait",
    location: "Bangkok, Thailand",
    body: "We waited well over an hour for a plastic stool outside Jay Fai for the legendary crab omelet, only to discover our youngest had, in that time, quietly decided he only eats 'plain rice.' The rest of us have never recovered from how good it was. He remains unmoved."
  },
  {
    icon: "🧭",
    title: "Wrong Boat, Right Village",
    location: "An Giang, Vietnam",
    body: "A miscommunication about which dock was ours led to an accidental detour on a rice-transport boat instead of our planned skiff through the floating villages. We ended up somewhere not on any itinerary, drinking tea with a family who found the whole mix-up hilarious."
  },
  {
    icon: "🥚",
    title: "The Egg Coffee Bet",
    location: "Hanoi, Vietnam",
    body: "One kid bet the other that egg coffee 'sounds disgusting and definitely is.' Both were proven wrong within one sip at Cafe Giảng, and we now owe that shop for permanently changing our breakfast routine at home."
  },
  {
    icon: "⛴️",
    title: "Seasick on the Star Ferry",
    location: "Hong Kong",
    body: "A ten-minute harbor crossing should not have been a problem. It became a problem. Lesson learned: check the forecast before promising your family the 'calmest boat ride of the whole trip.'"
  },
  {
    icon: "🐚",
    title: "The Tide Came In",
    location: "Koh Samui, Thailand",
    body: "We built an elaborate sandcastle kingdom, forgot entirely about tide tables, and watched the whole thing disappear in under an hour. The kids treated it as a natural disaster movie. We treated it as a lesson in checking tide tables."
  },
  {
    icon: "💸",
    title: "Ran Out On the Check (By Accident)",
    location: "Philadelphia, Pennsylvania",
    body: "\"When you forget your wallet and run out on the check. Should have told the kids our plans\" — the actual caption from that night. To make it worse, we then lost track of the girls in the same outing. \"Lost the girls again. Bad at the chaperone thing,\" the next photo admits. Philly humbled us twice before dinner was even paid for."
  },
  {
    icon: "🥶",
    title: "Day 3, I'm Tired",
    location: "Winter Park, Colorado",
    body: "The trip captions tell the whole story without any help from us: \"F— the cold,\" then \"Day 3, I'm tired,\" then finally, staring at the receipts, \"What $9k gets you.\" Ski season is beautiful. Ski season is also expensive and cold, and we said so in real time."
  },
  {
    icon: "🦀",
    title: "Naming the Hermit Crabs",
    location: "Puerto Vallarta, Mexico",
    body: "Somewhere on the beach we adopted two hermit crabs as temporary mascots. \"They grow up so fast. I named them Tophat and Monocle, Godspeed little buddies,\" reads the original caption — a level of commitment to a bit that only makes sense three margaritas into a family vacation."
  },
  {
    icon: "✨",
    title: "All That Glitters",
    location: "New York City, New York",
    body: "Times Square, at last, in person, in all its neon glory. Our verdict, captured in real time: \"All that glitters is not gold .... other words .... meh.\" Some landmarks are worth the hype. This was, allegedly, not one of them."
  },
  {
    icon: "🐕",
    title: "The Dog Café Detour, Storm Included",
    location: "Austin & San Antonio, Texas",
    body: "We found a \"rare bar and cafe establishment that let dogs inside\" and treated it like a national landmark. The next morning's caption was less celebratory: \"Good Morning. Heading into the Storm!\" Texas road trips will do that to you — perfect coffee one hour, driving into weather the next."
  },
  {
    icon: "🤖",
    title: "Being Robots at the Robot Restaurant",
    location: "Japan",
    body: "\"On our way to Robot Restaurant,\" then, minutes later, \"Anna and I being robots.\" No further context was provided in the original caption, and none was needed. Some Tokyo experiences just have to be seen — or reenacted at the table — to be believed."
  },
  {
    icon: "🐟",
    title: "The Big Fish Photo",
    location: "Seattle, Washington",
    body: "Pike Place Market's flying fish are a rite of passage, and someone in the family insisted on a photo with one of the genuinely enormous ones on ice. \"Unsure why she wanted a pic with a big fish,\" the caption shrugs. We still don't know either. We still have the photo."
  },
  {
    icon: "🤿",
    title: "We're Snuba-ing",
    location: "The Florida Keys",
    body: "\"On our way to snorkeling and scuba .... we're snuba-ing,\" reads the caption, coining a word for a hybrid activity none of us can properly explain to this day. We followed it up with, in the same person's words, \"Nerd Goals .... visited Ernest Hemingway's Home\" — proof the Keys can humble you and educate you in the same afternoon."
  },
  {
    icon: "🎠",
    title: "It's Bibbidi Bobbidi Humiddi",
    location: "Orlando, Florida",
    body: "Florida heat does not care about your Disney magic. \"My neck fan battery died .... it's hott,\" one caption reads, followed shortly by the line that ended up as this story's title. Some trips give you a castle. This one also gave us a weather-related crisis every single afternoon."
  },
  {
    icon: "🦇",
    title: "Becoming Batman at Every Restaurant",
    location: "Washington, D.C.",
    body: "\"When you give up having to explain your name every time you order .... you become Batman every time you order,\" the caption reads — a coping strategy born somewhere between the National Mall and dinner. Our homie Frankie (a statue, not a person) made a cameo appearance in the same photo set and did not comment on the alias."
  }
];

const GALLERY_TAGS = ["all", ...DESTINATIONS.map(d => d.slug)];

const GALLERY = DESTINATIONS.flatMap(d =>
  d.gallery.map((src) => ({ src, tag: d.slug, label: d.name }))
);

function getDestination(slug) {
  return DESTINATIONS.find(d => d.slug === slug);
}

function getAllRestaurants() {
  return DESTINATIONS.flatMap(d =>
    d.restaurants.map(r => ({ ...r, destSlug: d.slug, destName: d.name }))
  );
}

function getAdventure(slug) {
  return ADVENTURES.find(a => a.slug === slug);
}
