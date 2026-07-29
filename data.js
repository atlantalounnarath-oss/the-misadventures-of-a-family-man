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
    year: 2026,
    tag: "Neon & Dim Sum",
    heroImg: photoSet("hong-kong").hero,
    cardImg: photoSet("hong-kong").card,
    coords: { top: "37.58%", left: "81.69%" },
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
      { name: "Tim Ho Wan", location: "Hong Kong", rating: 4.6, review: "Michelin-famous dim sum without Michelin prices — the baked BBQ pork buns alone were worth the flight.", img: wpImg(797, 900), communityReview: "Known as the world's cheapest Michelin-starred restaurant. Reviewers consistently single out the baked BBQ pork buns as the must-order — some say the rest of the menu doesn't quite match up, and service is efficient but can run brusque during rush.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Mott 32", location: "Hong Kong", rating: 4.7, review: "Modern Cantonese, and one of the city's genuinely signature dining experiences.", img: wpImg(801, 900), communityReview: "Regularly cited as one of Hong Kong's top dining experiences — reviewers rave about the Apple Wood Roasted Peking Duck and the atmosphere (a converted bank vault). Pre-ordering the duck is a common tip; a few reviews find it overpriced for the portions.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Yat Lok", location: "Hong Kong", rating: 4.4, review: "Legendary roast goose — the kind of place locals queue for without a second thought.", img: wpImg(799, 900), communityReview: "A Michelin-starred roast goose institution (and a stop on Anthony Bourdain's Hong Kong episode) — reviews are notably split: many call the goose some of the best in the city, while a recurring complaint is brusque, rushed service.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Australia Dairy Company", location: "Hong Kong", rating: 4.2, review: "A classic Hong Kong breakfast institution, brisk service included at no extra charge.", img: wpImg(798, 900), communityReview: "A no-frills cha chaan teng famous for silky scrambled eggs and steamed milk pudding — reviewers consistently rave about the food while warning about famously brusque, fast-paced service and cash-only, shared-table seating.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2026,
    tag: "Slow Beach Days",
    heroImg: photoSet("koh-samui").hero,
    cardImg: photoSet("koh-samui").card,
    coords: { top: "44.85%", left: "77.64%" },
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
      { name: "Coco Tam's", location: "Koh Samui", rating: 4.7, review: "Beachfront dining with the famous fire show — the kids still bring this up unprompted.", img: wpImg(800, 900), communityReview: "Known island-wide for its beachfront fire shows and sunset views. Reviews are notably split: many call it a must-visit highlight of Samui nightlife, while others find it overpriced and overhyped for the food quality.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Jungle Club", location: "Koh Samui", rating: 4.5, review: "Incredible hilltop views over the island; go for sunset if you can time it.", img: wpImg(812, 900), communityReview: "Reviewers consistently rave about the sunset views over Chaweng Bay — widely called one of the most breathtaking spots on the island — though the steep drive up and inconsistent service on busy nights draw occasional complaints.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Tree Tops Signature Dining", location: "Koh Samui", rating: 4.6, review: "A romantic, special-occasion meal worth booking ahead for.", img: wpImg(803, 900), communityReview: "A treehouse fine-dining experience frequently booked for honeymoons and anniversaries — reviewers consistently praise the setting and attentive service; the main criticism is steep pricing for the portion sizes.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2026,
    tag: "Street Food Capital",
    heroImg: photoSet("bangkok").hero,
    cardImg: photoSet("bangkok").card,
    coords: { top: "42.4%", left: "77.9%" },
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
      { name: "Jay Fai", location: "Bangkok", rating: 4.6, review: "The iconic crab omelet everyone warns you about the wait for. Worth every minute of it.", img: wpImg(811, 900), communityReview: "A Michelin-starred street food legend famous for goggle-wearing chef Jay Fai's crab omelet. Opinion is genuinely split — many call it a bucket-list meal worth the multi-hour wait and steep price, while others find it overhyped for what's still, at its core, street food.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Thipsamai", location: "Bangkok", rating: 4.5, review: "Famous Pad Thai from a shop that's been perfecting it for decades.", img: wpImg(809, 900), communityReview: "Often called Bangkok's best pad Thai, running since 1939 — reviewers consistently praise the signature egg-wrapped noodles and fresh orange juice, though several note it's pricier than street-stall pad Thai and can mean a real wait.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Jeh O Chula", location: "Bangkok", rating: 4.4, review: "Tom Yum Mama noodles turned into a full-contact food event.", img: wpImg(813, 900), communityReview: "A Michelin Bib Gourmand institution famous for its Tom Yum Mama noodles — most reviewers say it's every bit worth the notoriously long queue, though a vocal minority calls it overrated instant noodles riding a social-media wave.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Sorn", location: "Bangkok", rating: 4.8, review: "One of Thailand's premier fine-dining restaurants — southern Thai cuisine done at the highest level.", img: wpImg(804, 900), communityReview: "Thailand's first three-Michelin-starred restaurant, celebrated for its bold, intensely spiced tour of Southern Thai cuisine. Reservations are famously difficult to land, and reviewers near-universally call it one of the best meals of their trip.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2026,
    tag: "Motorbikes & Banh Mi",
    heroImg: photoSet("ho-chi-minh-city").hero,
    cardImg: photoSet("ho-chi-minh-city").card,
    coords: { top: "44.0%", left: "79.6%" },
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
      { name: "Pizza 4P's", location: "Ho Chi Minh City", rating: 4.6, review: "A modern Vietnamese favorite — not what you expect to crave in Saigon, but everyone does.", img: wpImg(814, 900), communityReview: "A Japanese-run pizza chain beloved across Vietnam for house-made cheese and farm-sourced ingredients from Da Lat. Reviewers near-universally praise the burrata pizzas and attentive service; the main downside noted is inconsistent wait times at busy branches.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Bánh Mì Huỳnh Hoa", location: "Ho Chi Minh City", rating: 4.7, review: "Often called the city's best bánh mì, and stuffed enough to make a believer out of anyone.", img: wpImg(808, 900), communityReview: "Famous for the biggest, priciest bánh mì in Saigon — reviewers are split between calling it the best in the city and finding it overstuffed and overpriced next to cheaper local spots, but the queue rarely lets up either way.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Cục Gạch Quán", location: "Ho Chi Minh City", rating: 4.5, review: "Traditional southern Vietnamese cuisine in a garden setting that slows the whole meal down.", img: wpImg(819, 900), communityReview: "A longtime favorite for home-style southern Vietnamese cooking in a quiet, plant-filled setting — reviewers consistently praise the atmosphere and traditional dishes as a welcome break from Saigon's street-level chaos.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2026,
    tag: "Mekong Delta",
    heroImg: photoSet("an-giang").hero,
    cardImg: photoSet("an-giang").card,
    coords: { top: "44.24%", left: "78.91%" },
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
    foodPhotos: [],
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
    year: 2026,
    tag: "Old Quarter & Egg Coffee",
    heroImg: "assets/uploads/hanoi-1.jpg",
    cardImg: "assets/uploads/hanoi-2.jpg",
    coords: { top: "38.3%", left: "79.4%" },
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
      { name: "Phở Gia Truyền Bát Đàn", location: "Hanoi", rating: 4.7, review: "One of the city's most famous bowls of pho — expect a line and a fast-moving system.", img: wpImg(806, 900), communityReview: "Widely called one of Hanoi's best bowls of pho, with a Michelin Bib Gourmand to back it up — reviewers rave about the rich broth, though several mention gruff service and a no-frills, self-service setup as part of the deal.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Bún Chả Hương Liên", location: "Hanoi", rating: 4.6, review: "The \"Obama Bun Cha\" restaurant that's become a genuine Hanoi institution.", img: wpImg(817, 900), communityReview: "Famous as the spot where Obama and Anthony Bourdain shared a meal in 2016 — reviewers say the smoky grilled pork still delivers, though opinions are mixed on whether it's still Hanoi's best bun cha or just its most famous.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Chả Cá Thăng Long", location: "Hanoi", rating: 4.5, review: "Hanoi's iconic turmeric fish with dill, cooked tableside.", img: wpImg(823, 900), communityReview: "A go-to spot for Hanoi's signature turmeric-and-dill fish dish, cooked tableside — reviewers consistently praise the tableside sizzle and flavor as a memorable, distinctly Hanoi experience.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Cafe Giảng", location: "Hanoi", rating: 4.8, review: "The birthplace of Vietnamese egg coffee — whipped into something between dessert and caffeine delivery system.", img: wpImg(822, 900), communityReview: "The original home of Vietnamese egg coffee, now run by the second generation of the family that invented it — reviewers near-universally call it a must-try, tucked down a narrow alley with a distinctly old-Hanoi atmosphere.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    gallery: ["assets/uploads/hanoi-1.jpg", "assets/uploads/hanoi-2.jpg", ...photoSet("hanoi").gallery],
    rating: 9,
    wouldReturn: "Every time we're in the region — it's become a tradition, not a stop.",
    relatedAdventure: "southeast-asia-2026"
  },
  {
    slug: "ha-long-bay",
    name: "Ha Long Bay",
    country: "Vietnam",
    year: 2026,
    tag: "Limestone Karsts",
    heroImg: photoSet("ha-long-bay").hero,
    cardImg: photoSet("ha-long-bay").card,
    coords: { top: "38.34%", left: "79.78%" },
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
      { name: "Cua Vàng Restaurant", location: "Ha Long Bay", rating: 4.5, review: "Fresh local seafood, right where you'd want it.", img: wpImg(825, 900), communityReview: "A large, well-known seafood spot near the pier known for its live tanks and crab hotpot — reviews run hot and cold, with many praising the fresh seafood and harbor views while a vocal minority flags it as a tourist-priced trap.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "On-board cruise dining", location: "Ha Long Bay", rating: 4.6, review: "A quality overnight cruise is often the best dining experience in the bay — squid pulled that morning, grilled on deck at sunset.", img: wpImg(826, 900) }
    ],
    foodPhotos: [],
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
    year: 2010,
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
      { name: "Casa Lola", location: "Puerto Rico", rating: 4.3, review: "Located in the lively Santurce district of San Juan, Casa Lola serves up traditional Puerto Rican cuisine with a contemporary twist. The restaurant is known for its fresh seafood dishes and craft cocktails.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2010.jpg?w=900", communityReview: "Reviews are notably mixed — some locals call it a genuine elevation of Puerto Rican classics, while others report slow service and inconsistent food. Worth noting: online listings show this location as permanently closed, so confirm before planning a visit.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Pikayo", location: "Puerto Rico", rating: 4.5, review: "Pikayo is one of the most famous restaurants in Puerto Rico, located in the Condado district of San Juan. Chef Wilo Benet offers a sophisticated fusion of European, Caribbean, and Latin American flavors inspired by his travels and experiences.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr8.jpg?w=900", communityReview: "Long regarded as one of San Juan's top fine-dining rooms, with reviewers praising chef Wilo Benet's globally inflected Puerto Rican menu. Worth noting: online listings show this location as permanently closed, so confirm before planning a visit.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "La Mallorquina", location: "Puerto Rico", rating: 4.6, review: "La Mallorquina, located in Old San Juan, is a classic Puerto Rican bakery and cafe that has been serving traditional \"pan sobao\" (Puerto Rican bread) and pastries for decades. Try the \"quesitos\" (pastry filled with cheese) or \"mallorca\" (sweet and fluffy pastry).", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr2.jpg?w=900", communityReview: "Puerto Rico's oldest restaurant (since 1848), prized for its old-world atmosphere and asopao — but reviews are genuinely all over the map, ranging from \"a piece of culinary history\" to complaints about slow service and tourist-trap pricing. Worth going for the history; keep expectations moderate on the food.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "La Estación", location: "Puerto Rico", rating: 4.3, review: "La Estación is a farm-to-table restaurant located in Fajardo, on the eastern coast of the island. Their menu features locally sourced ingredients and creative dishes, like the plantain-crusted fish and duck confit empanadillas.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pr3.jpg?w=900", communityReview: "A local favorite for wood-fired Nuyorican BBQ and Caribbean fare near Fajardo — reviewers consistently call it a pleasant surprise, with several naming it the best barbecue they had on the island.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2015,
    tag: `Central America 2015 Stop`,
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
      { name: "The Smuggler's Den", location: "Belize", rating: 4.3, review: "Located in San Pedro, The Smuggler's Den is a seafood restaurant that prides itself on its freshly caught local seafood, like lobster, shrimp, and fish.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=900", communityReview: "A beloved, off-the-beaten-path spot reviewers describe as a hidden gem — the roast beef and fresh seafood draw repeat visitors, with the remote, laid-back setting cited as much of the charm.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Arepa Lady", location: "Belize", rating: 4.5, review: "This small street food stall in San Pedro serves delicious Venezuelan arepas, grilled corn pockets filled with cheese, meats, or vegetables.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=900", communityReview: "A Venezuelan-Belizean fusion spot built around the humble arepa — locals and travelers alike praise it as an inventive, tasty change of pace on an island otherwise dominated by seafood and Belizean classics.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "RumFish y Vino", location: "Belize", rating: 4.6, review: "Offering international dishes with Caribbean influences, RumFish y Vino is a top-rated restaurant in Placencia. Try their fresh ceviche, grilled meats or seafood, and delicious cocktails.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=900", communityReview: "Widely considered Placencia's top upscale dining spot, praised for handcrafted fruit-infusion cocktails and fresh seafood — reviewers call it the best meal of their Belize trip, though a few note it's pricier than most of the village.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Pop's Belize Restaurant", location: "Belize", rating: 4.3, review: "Pop's Belize Restaurant, located in San Ignacio, serves traditional Belizean dishes like stewed chicken, rice and beans, and tamales, in a cozy setting.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz2.jpg?w=900", communityReview: "A tiny, six-booth San Ignacio institution reviewers call the town's best-kept breakfast secret — the omelets and bottomless coffee are the main draw, with prompt service and a genuinely local crowd.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    relatedAdventure: "central-america-2015"
  },
  {
    slug: "roatan-2015",
    name: `Roatán`,
    country: `Honduras`,
    year: 2015,
    tag: `Central America 2015 Stop`,
    heroImg: "https://images.unsplash.com/photo-1668813610810-3d15364b6af9?w=1600&auto=format&fit=crop&q=80",
    cardImg: "https://images.unsplash.com/photo-1668813610810-3d15364b6af9?w=900&auto=format&fit=crop&q=80",
    heroCaption: "Too busy creating memories to capture the moment — here's a generic pic from what I remember. (Stock photo, not our own — no camera made it on this trip.)",
    coords: { top: "42.25%", left: "24.63%" },
    quickFacts: [
      { label: "Best time to go", value: "Mar – Aug" },
      { label: "Currency", value: "Honduran Lempira / US Dollar" },
      { label: "Language", value: "Spanish, English" },
      { label: "Kid-chaos level", value: "Low" }
    ],
    whyVisit: "Part of the same Central America trip as Belize — Roatán sits on the second-largest barrier reef in the world, and the diving and beach time here were the perfect counterpoint to the jungle and ruins on the mainland.",
    thingsToDo: [
      "Snorkel or dive the Mesoamerican Barrier Reef",
      "Relax at West Bay Beach",
      "Visit a sloth or wildlife sanctuary",
      "Zipline through the island's jungle canopy"
    ],
    restaurants: [],
    foodPhotos: [],
    hiddenGems: [
      "West Bay's quieter north end, away from the cruise-ship crowds",
      "A local sloth sanctuary tucked away from the main resort strip"
    ],
    travelTips: [
      "Book dive trips a day ahead in high season",
      "Check the weather for Mar – Aug before locking in dates"
    ],
    gallery: [{ src: "https://images.unsplash.com/photo-1668813610810-3d15364b6af9?w=1200&auto=format&fit=crop&q=80", caption: "Too busy creating memories to capture the moment — here's a generic pic from what I remember." }],
    rating: 9,
    wouldReturn: "Yes — the reef alone is worth the return trip.",
    relatedAdventure: "central-america-2015"
  },
  {
    slug: "cancun-2015",
    name: `Cancún`,
    country: `Mexico`,
    year: 2015,
    tag: `Central America 2015 Stop`,
    heroImg: "https://images.unsplash.com/photo-1736648432485-c82f30912ec5?w=1600&auto=format&fit=crop&q=80",
    cardImg: "https://images.unsplash.com/photo-1736648432485-c82f30912ec5?w=900&auto=format&fit=crop&q=80",
    heroCaption: "Too busy creating memories to capture the moment — here's a generic pic from what I remember. (Stock photo, not our own — no camera made it on this trip.)",
    coords: { top: "37.5%", left: "22%" },
    quickFacts: [
      { label: "Best time to go", value: "Nov – Apr" },
      { label: "Currency", value: "Mexican Peso" },
      { label: "Language", value: "Spanish" },
      { label: "Kid-chaos level", value: "Medium" }
    ],
    whyVisit: "The last stop on the same trip as Belize and Roatán — turquoise water, all-inclusive ease, and an easy jumping-off point for day trips into the Yucatán's ruins.",
    thingsToDo: [
      "Relax on the beaches of the Hotel Zone",
      "Day trip to Chichén Itzá",
      "Snorkel the cenotes near Playa del Carmen",
      "Explore the Mayan ruins at Tulum"
    ],
    restaurants: [],
    foodPhotos: [],
    hiddenGems: [
      "Isla Mujeres, a short ferry ride away and far quieter than the Hotel Zone",
      "A cenote off the main tourist path near Puerto Morelos"
    ],
    travelTips: [
      "Book Chichén Itzá as an early-morning trip to beat both the heat and the crowds",
      "Check the weather for Nov – Apr before locking in dates"
    ],
    gallery: [{ src: "https://images.unsplash.com/photo-1736648432485-c82f30912ec5?w=1200&auto=format&fit=crop&q=80", caption: "Too busy creating memories to capture the moment — here's a generic pic from what I remember." }],
    rating: 8,
    wouldReturn: "Yes — mainly for the day trips out to the ruins.",
    relatedAdventure: "central-america-2015"
  },
  {
    slug: "england-2017",
    name: `England`,
    country: `United Kingdom`,
    year: 2017,
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
      { name: "The Fat Duck", location: "England", rating: 4.3, review: "Located in Bray, Berkshire, The Fat Duck is a Michelin-starred restaurant run by Chef Heston Blumenthal, known for his innovative and modern take on British cuisine.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en11.jpg?w=900", communityReview: "One of the most divisive bucket-list restaurants around — reviewers either call the theatrical, memory-driven tasting menu one of the best meals of their life, or find the gimmickry overshadows the food relative to its steep price. Worth knowing going in: it's polarizing by design.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Ledbury", location: "England", rating: 4.5, review: "The Ledbury, located in Notting Hill, London, is a Michelin-starred restaurant that offers contemporary European cuisine featuring seasonal and locally-sourced ingredients.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en17.jpg?w=900", communityReview: "Regularly ranked among London's very best restaurants — reviewers consistently praise chef Brett Graham's seasonal tasting menus and the notably warm, unstuffy service for a two-Michelin-starred room.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "St. John", location: "England", rating: 4.6, review: "St. John in London's Clerkenwell district is known for its traditional British cuisine with a modern twist, including nose-to-tail dishes like bone marrow on toast and roast pork belly.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en4.jpg?w=900", communityReview: "A genuine London institution for nose-to-tail cooking — the bone marrow and Eccles cake with cheese are near-universally recommended, though a handful of reviewers feel the famously spare, no-frills plating and pricing haven't aged as well as the reputation.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Ivy", location: "England", rating: 4.3, review: "The Ivy, located in the heart of London's West End, is a beautiful art deco restaurant that serves classic British cuisine, including their famous shepherd's pie.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/en13.jpg?w=900", communityReview: "A century-old London fixture prized more for the glamorous Art Deco room and reliably good service than groundbreaking food — reviewers call the shepherd's pie and classic British menu comforting rather than exciting, with a few flagging steep drink prices.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2018,
    tag: `Turquoise Water`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=900",
    coords: { top: "36.1%", left: "28.49%" },
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
      { name: "Graycliff", location: "Bahamas", rating: 4.3, review: "Situated in Nassau, this restaurant is known for its exquisite cuisine and elegant atmosphere. It offers a variety of dining options ranging from an exclusive five-course dinner to a casual lunch at their pizzeria.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=900", communityReview: "A historic mansion with a legendary wine cellar (250,000+ bottles) — reviews are genuinely polarized between guests who call it one of the world's great dining experiences and others who report slow service and underwhelming food for the price. Worth going for the history and setting; keep expectations tempered on the meal itself.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Poop Deck", location: "Bahamas", rating: 4.6, review: "This seafood restaurant has two locations in Nassau and Sandyport. They specialize in local Bahamian cuisine and fresh seafood dishes.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=900", communityReview: "A Nassau institution since 1972 with a devoted following — reviewers near-universally praise the \"you pick it, we cook it\" fresh catch, conch fritters, and waterfront views, with many calling it their favorite meal in Nassau on repeat visits.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Cafe Matisse", location: "Bahamas", rating: 4.6, review: "Located in Paradise Island, this Italian restaurant is known for its excellent service and cozy atmosphere. They offer a wide selection of homemade pasta dishes and wines.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs1.jpg?w=900", communityReview: "A charming Italian spot in a 19th-century mansion, praised for its intimate courtyard and attentive service — reviewers describe it as a longtime favorite, though a handful of recent reviews note inconsistency since a change in ownership.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Twin Brothers", location: "Bahamas", rating: 4.3, review: "This local hotspot in Nassau is famous for its conch salad and fried fish. They have been serving up traditional Bahamian dishes for over 50 years.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bs2.jpg?w=900", communityReview: "A Fish Fry favorite known for cracked conch and sky juice — reviews are mixed but mostly positive, with the fresh conch salad as the standout and occasional complaints about slow, \"Bahama time\" service.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2018,
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
      { name: "Dill", location: "Iceland", rating: 4.3, review: "This restaurant in Reykjavik received a Michelin star in 2019 and is known for its innovative, modern take on Icelandic cuisine. The tasting menus feature seasonal and locally-sourced ingredients.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic23.jpg?w=900", communityReview: "Iceland's first Michelin-starred restaurant, and reviewers routinely call it one of the best meals of their lives — the immersive, story-driven tasting menu and warm, personal service earn near-universal praise. Book well ahead; it's open only a few nights a week.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Kopar", location: "Iceland", rating: 4.5, review: "This seafood restaurant located in Reykjavik has stunning views of the harbor and specializes in fresh Icelandic seafood with a modern twist.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic28.jpg?w=900", communityReview: "A harborside seafood favorite reviewers consistently praise for the fresh cod and langoustine dishes, warm service, and views of the docking boats — the multi-course \"Kopar adventure\" tasting menu gets frequent recommendations.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Matur og Drykkur", location: "Iceland", rating: 4.6, review: "Located in Reykjavik's Grandi harbour area, this restaurant features traditional Icelandic dishes made with locally-sourced ingredients. Don't miss the fermented shark!", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic2.jpg?w=900", communityReview: "A Michelin-recognized spot reinterpreting old Icelandic recipes (including cod heads and horse tartare) in a relaxed, unpretentious setting — reviewers consistently call the food a genuine highlight of their Iceland trip, with the horse tartare and halibut soup among the most-recommended dishes.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Slippbarinn", location: "Iceland", rating: 4.3, review: "This hip bar in Reykjavik's trendy 101 district serves creative cocktails and small plates made with local and organic ingredients.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/ic17.jpg?w=900", communityReview: "A lively harborside cocktail bar reviewers praise for inventive, seasonally-driven drinks and a welcoming vibe — a popular pick for an after-dinner nightcap rather than a full meal.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2019,
    tag: `Pacific Coast`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv6.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv12.jpg?w=900",
    coords: { top: "39.0%", left: "20.9%" },
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
      { name: "El Arrayán", location: "Puerto Vallarta", rating: 4.3, review: "A must-visit for lovers of traditional Mexican cuisine. El Arrayán serves regional dishes from all over Mexico, prepared with fresh ingredients and a contemporary touch. Reservations are recommended.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv6.jpg?w=900", communityReview: "Reviewers consistently praise this as authentic Mexican cooking done right — the duck tostadas and mole dishes get repeat mentions, with several travelers saying they returned multiple times during a single trip.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Café des Artistes", location: "Puerto Vallarta", rating: 4.5, review: "Headed by the renowned chef, Thierry Blouet, Café des Artistes is one of the best restaurants in Puerto Vallarta. The menu features gourmet French-Mexican fusion dishes, and the elegant décor creates an unforgettable atmosphere.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv12.jpg?w=900", communityReview: "A long-running Vallarta institution (since 1990) that reviewers frequently call one of the best meals of their lives — the garden setting and French-Mexican tasting menu draw near-universal praise, though it's a splurge by local standards.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "La Palapa", location: "Puerto Vallarta", rating: 4.6, review: "Located on the beach, La Palapa is the perfect spot for a romantic dinner. The menu offers a mix of international and Mexican dishes, along with fresh seafood options.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv7.jpg?w=900", communityReview: "Puerto Vallarta's original beach restaurant, running since 1959 — reviewers love the on-the-sand setting and sunset ambiance, though some longtime visitors feel the food doesn't quite match the view and prefer nearby Tintoque for the meal itself.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Tintoque", location: "Puerto Vallarta", rating: 4.3, review: "A relatively new addition to Puerto Vallarta's food scene, Tintoque quickly gained popularity among locals and tourists alike. The menu features contemporary Mexican cuisine using fresh, locally-sourced ingredients.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/pv13.jpg?w=900", communityReview: "Widely cited as Puerto Vallarta's most ambitious fine-dining restaurant, with reviewers frequently ranking it above the more famous, longer-established spots in town — the tasting menu is the move, though a rare reviewer finds it overpriced for the portions.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2010,
    tag: `Theme Park Marathon`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o3.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o5.jpg?w=900",
    coords: { top: "34.16%", left: "27.57%" },
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
      { name: "Victoria & Albert's", location: "Orlando, Florida (2010)", rating: 4.3, review: "Located at Disney's Grand Floridian Resort & Spa, Victoria & Albert's is a fine dining experience that is often described as the best restaurant in Orlando. The menu changes daily and features seasonal ingredients, and the wine list is extensive.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o3.jpg?w=900", communityReview: "A AAA Five-Diamond restaurant reviewers consistently call the best dining experience in all of Walt Disney World — the multi-course tasting menu, formal service, and no-kids-under-10 policy make it a genuine special-occasion splurge, with prices to match.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Ravenous Pig", location: "Orlando, Florida (2010)", rating: 4.5, review: "This gastropub in Winter Park serves up elevated pub fare like pork belly sliders, fish and chips, and burgers, along with a great selection of craft beer and cocktails.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o5.jpg?w=900", communityReview: "A Michelin Bib Gourmand gastropub with a devoted local following — reviewers consistently praise the farm-to-table cooking (the Iberian pork and pork belly starter get repeat mentions) and reasonable pricing for the quality.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Se7en Bites", location: "Orlando, Florida (2010)", rating: 4.6, review: "If you're looking for breakfast or brunch, Se7en Bites is a must-try. This bakery and cafe serves up delicious Southern-style comfort food like biscuits and gravy, shrimp and grits, and chicken and waffles.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o1.jpg?w=900", communityReview: "A beloved off-the-tourist-track brunch spot — reviewers rave about the Minnie Pearl sandwich and cheddar chive grits, frequently calling it worth the drive out from the parks.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Morimoto Asia", location: "Orlando, Florida (2010)", rating: 4.3, review: "Iron Chef Masaharu Morimoto's Asian fusion restaurant at Disney Springs is a feast for the senses. The menu includes sushi, dim sum, and other Asian-inspired dishes, and the decor is stunning.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/o6.jpg?w=900", communityReview: "One of Disney Springs' most upscale options, with reviewers frequently praising the Morimoto spare ribs and sushi — opinion varies more than most Disney restaurants, though, with a vocal minority calling the food bland or inconsistent for the price.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2012,
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
      { name: "The Hangout", location: "Gulf Shores, Alabama", rating: 4.3, review: "This family-friendly restaurant is a local favorite with live music, beach volleyball, and delicious food. They serve a variety of seafood dishes, burgers, sandwiches, and salads.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900", communityReview: "A perennial local debate — \"LuLu's vs. The Hangout\" — with most reviewers landing on \"come for the beach-bar atmosphere and kids' activities, not the food,\" which they consistently call just okay. Waits can run long in peak season.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "LuLu's Gulf Shores", location: "Gulf Shores, Alabama", rating: 4.5, review: "Owned by Jimmy Buffett's sister, LuLu's is a fun and lively restaurant that serves seafood, burgers, and salads. They have a great outdoor area with a sandy beach and plenty of seating.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900", communityReview: "Reviewers consistently praise the fried green tomato BLT, gumbo, and lively live-music atmosphere, with the ropes course and sand play area a big hit for kids — though several note it's pricier than the food quality strictly justifies, and waits can be long at peak times.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Bahama Bob's Beachside Cafe", location: "Gulf Shores, Alabama", rating: 4.3, review: "This casual beachfront restaurant is known for its fresh seafood, including shrimp, crab, and fish tacos. They also have a variety of salads, sandwiches, and burgers.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900", communityReview: "A beloved beachside spot reviewers praise for the gumbo, coconut shrimp, and key lime pie, with a steps-from-the-sand setting that's a big part of the appeal — service and consistency get occasional mixed marks, but most calls are positive.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Fisher's at Orange Beach Marina", location: "Gulf Shores, Alabama", rating: 4.3, review: "This upscale restaurant offers stunning views of the marina and serves seafood, steaks, and sushi. They have a great wine list and a creative cocktail menu.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/gs1.jpg?w=900", communityReview: "Split across two experiences in one building — an upstairs fine-dining room with marina views and a more casual downstairs option — reviewers generally recommend the upstairs for a special-occasion dinner and note it's one of the more polished, upscale options in the Orange Beach area.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2012,
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
      { name: "Salt Lick BBQ", location: "Hill Country, Texas", rating: 4.3, review: "This legendary BBQ joint in Driftwood, Texas, is known for its juicy brisket, smoked sausage, and pork ribs. The restaurant offers a family-style dining experience with a rustic ambiance and live music.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1.jpg?w=900", communityReview: "A genuine Texas institution since 1967, though locals are famously split — many call it a must-do bucket-list stop with excellent brisket, while serious barbecue fans argue it's more about the hype and atmosphere than the best 'cue in the area. Expect a long wait at peak times.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Leaning Pear", location: "Hill Country, Texas", rating: 4.5, review: "This farm-to-table restaurant in Wimberley, Texas, serves contemporary American cuisine with a focus on locally sourced ingredients. The menu changes seasonally, and the restaurant has an extensive wine list.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h1.jpg?w=900", communityReview: "A genuine Wimberley institution reviewers consistently praise for the wood-fired pizza, Brussels sprouts, and treehouse-like outdoor seating — a longtime local favorite, though a handful of reviews mention inconsistent service on busy weekends.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "August E's", location: "Hill Country, Texas", rating: 4.6, review: "This modern Asian fusion restaurant in Fredericksburg, Texas, offers a unique dining experience with a creative menu featuring dishes like Korean-style fried chicken and beef pho.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h4.jpg?w=900", communityReview: "Regularly named one of Fredericksburg's top restaurants, praised for bringing genuinely inventive Asian-fusion small plates to Texas Hill Country wine country — a reservation-recommended splurge rather than a casual stop.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Coopers Old Time Pit Bar-B-Que", location: "Hill Country, Texas", rating: 4.3, review: "This iconic BBQ joint in Llano, Texas, is known for its tender and smoky brisket and sausage. The restaurant offers a casual dining experience with a family-friendly atmosphere.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h3.jpg?w=900", communityReview: "A beloved old-school pit stop reviewers praise for the pork ribs and old-fashioned cafeteria-style ordering — long a favorite on Hill Country barbecue road trips, though a few recent reviews note quality has grown inconsistent compared to years past.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2013,
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
      { name: "The Optimist", location: "Atlanta, Georgia", rating: 4.3, review: "This seafood restaurant is located in the heart of Atlanta and offers a selection of fresh seafood and oysters.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a3.jpg?w=900", communityReview: "Widely considered one of Atlanta's best seafood spots, with reviewers consistently praising the lobster roll and hush puppies and calling out the excellent service — a rare complaint flags the advertised happy-hour oyster price as slightly misleading in the fine print.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Staplehouse", location: "Atlanta, Georgia", rating: 4.5, review: "This restaurant serves up modern American cuisine using seasonal and locally-sourced ingredients. It's also a non-profit, with all proceeds going to support the Giving Kitchen, which helps restaurant workers in need.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a1.jpg?w=900", communityReview: "One of Atlanta's most talked-about tasting-menu restaurants, with reviewers consistently calling the seasonal, farm-driven courses outstanding — the nonprofit model supporting the Giving Kitchen charity adds a layer most diners mention appreciating.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Bacchanalia", location: "Atlanta, Georgia", rating: 4.6, review: "This upscale restaurant is known for its innovative, contemporary American cuisine and a extensive wine selection.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a7.jpg?w=900", communityReview: "A Michelin-starred, James Beard Award-winning restaurant reviewers regularly call Atlanta's top special-occasion dinner — the four-course prix fixe menu draws consistent praise, with most reviews recommending booking two to three weeks ahead.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Fox Bros. Bar-B-Q", location: "Atlanta, Georgia", rating: 4.3, review: "A favorite among locals and visitors alike, this restaurant is known for its delicious BBQ meats and sides.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/a5.jpg?w=900", communityReview: "A near-legendary Atlanta BBQ spot with a devoted following — reviewers consistently praise the brisket, burnt ends, and mac and cheese, though a small handful report an inconsistent off night with dry meat. Go early; ribs sell out.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2014,
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
      { name: "Laundry Kitchen & Cocktails", location: "Steamboat Springs, Colorado", rating: 4.3, review: "This trendy restaurant serves up delicious American cuisine, craft cocktails, and an extensive wine list.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s6.jpg?w=900", communityReview: "One of Steamboat's most consistently well-reviewed restaurants, with locals and visitors alike praising the creative American menu and cocktail program — regularly named among the town's best dinner spots.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Rex's American Grill & Bar", location: "Steamboat Springs, Colorado", rating: 4.5, review: "This classic American restaurant offers a wide range of dishes, including burgers, sandwiches, steaks, and seafood.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s7.jpg?w=900", communityReview: "A 16-year neighborhood favorite that reviewers fondly remember for its 'shroom bucket appetizer and friendly service, though a few later reviews noted declining consistency in its final years. Worth noting: Rex's permanently closed its doors on January 3, 2023.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Mahogany Ridge Brewery & Grill", location: "Steamboat Springs, Colorado", rating: 4.6, review: "This brewery and restaurant offers a fantastic selection of craft beers and a menu featuring creative, locally sourced dishes.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s1.jpg?w=900", communityReview: "Long regarded as one of the best brewpubs in the Rockies, with reviewers consistently praising the elk shepherd's pie and bison steak (beer opinions were more mixed over the years). Worth noting: Mahogany Ridge has permanently closed.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Salt & Lime", location: "Steamboat Springs, Colorado", rating: 4.3, review: "This vibrant Mexican restaurant serves up fresh and flavorful dishes, including tacos, burritos, and margaritas.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/s5.jpg?w=900", communityReview: "A well-reviewed Southwestern spot in the local Rex's Family of Restaurants group — reviewers consistently praise the fresh, elevated take on Mexican and Latin American dishes, with margaritas a frequent highlight.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Steamboat Springs, Colorado`,
`The neighborhood just past the obvious tourist center, worth a wander`,
`The local hot springs are split — a warm side and a genuinely freezing pond next door. Taking the plunge into the cold side is a rite of passage`
    ],
    travelTips: [
`Book the well-reviewed restaurants ahead — the best spots in Steamboat Springs, Colorado fill up`,
`Pace the day around one big activity and one slow meal, not back-to-back sightseeing`,
`Check the weather for Dec – Mar before locking in dates`,
`Driving up in winter? Don't trust a rental car from a warm-weather state to be ready — bring your own snow chains and all-weather washer fluid`
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
    year: 2015,
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
`Discover Galveston's History at the Galveston Island Railroa`,
`Stop at NASA's Space Center Houston on the way in — worth the detour`
    ],
    restaurants: [
      { name: "Gaido's Seafood Restaurant", location: "Galveston, Texas", rating: 4.3, review: "A Galveston institution known for its fresh seafood dishes and Gulf Coast flavors.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g3-1.jpg?w=900", communityReview: "A Galveston Seawall fixture since 1911, still pulling a 4.5-star average across 5,000+ reviews — the pecan pie and grilled oysters get consistent raves. Reviews genuinely split on service, though, with some calling it the best meal of their trip and others reporting slow, disorganized waitstaff on an off night.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Rudy & Paco Restaurant & Bar", location: "Galveston, Texas", rating: 4.7, review: "Offers a blend of South American and Caribbean cuisines, known for its steaks and seafood.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g1-1.jpg?w=900", communityReview: "One of Galveston's most consistently praised upscale restaurants — reviewers repeatedly call it \"first class\" and highlight standout dishes like the Pargo entrees, with attentive service earning near-universal mentions.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Shrimp 'N Stuff Downtown", location: "Galveston, Texas", rating: 4.6, review: "Casual eatery serving up delicious fried shrimp, oysters, and other seafood specialties.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g4-1.jpg?w=900", communityReview: "A no-frills local institution since 1976, beloved for generous portions and honest prices — reviewers consistently call it the place they return to on every Galveston trip, with the stuffed shrimp and gumbo as top picks.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Sunflower Bakery & Café", location: "Galveston, Texas", rating: 4.3, review: "Quaint café offering homemade baked goods, sandwiches, and a cozy atmosphere.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g8-1.jpg?w=900", communityReview: "A beloved East End neighborhood breakfast spot reviewers call a Galveston tradition — the Grilled Cinnamon Roll and Oysters Benedict come up again and again, with the from-scratch bakery a consistent highlight.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Galveston, Texas`,
`The neighborhood just past the obvious tourist center, worth a wander`,
`Don't sleep on the Thai food here — surprisingly great for a Gulf Coast town`
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
    year: 2017,
    tag: `Island Chain`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k1.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k2.jpg?w=900",
    coords: { top: "36.14%", left: "27.61%" },
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
      { name: "Blue Heaven (Key West)", location: "The Florida Keys", rating: 4.3, review: "Famous for its Key West-style cuisine, this restaurant offers a relaxed atmosphere with outdoor seating and live music.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k1.jpg?w=900", communityReview: "A bohemian Key West landmark known for banana pancakes, roosters wandering the patio, and legendary key lime pie — reviewers love the laid-back vibe, though several mention long waits and food that can be inconsistent on a busy day.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Latitudes (Key West)", location: "The Florida Keys", rating: 4.5, review: "Located on Sunset Key, this waterfront restaurant offers stunning views and a diverse menu featuring fresh seafood and tropical flavors.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k2.jpg?w=900", communityReview: "A genuinely unique experience — your reservation includes a private ferry ride to Sunset Key, and reviewers consistently call the trip and the beachfront setting worth it on their own, even before the food arrives.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Hogfish Bar & Grill (Stock Island)", location: "The Florida Keys", rating: 4.6, review: "Known for its casual vibe and fresh seafood, Hogfish is a local favorite. Don't miss their signature hogfish sandwich!", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k3.jpg?w=900", communityReview: "A short drive off the main drag and near-universally loved for it — reviewers consistently call the Killer Hogfish Sandwich and lobster bisque some of the best they've had in the Keys, in a working-harbor setting locals actually recommend over the touristier Key West spots.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Marker 88 (Islamorada)", location: "The Florida Keys", rating: 4.3, review: "This waterfront restaurant offers a picturesque dining experience and a menu featuring seafood, steaks, and Caribbean-inspired dishes.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/k4.jpg?w=900", communityReview: "Running since 1967 and famous for sunset views over Florida Bay — reviewers consistently praise the setting and key lime pie, though a recurring complaint is long waits (sometimes over two hours) and food that can be inconsistent for the price.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2019,
    tag: `Art Deco & Ocean`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m2.jpg?w=900",
    coords: { top: "35.93%", left: "27.7%" },
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
      { name: "Joe's Stone Crab", location: "Miami, Florida", rating: 4.3, review: "A Miami institution known for its fresh seafood and famous stone crab claws.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=900", communityReview: "A South Beach fixture since 1913 and still one of the highest-grossing independent restaurants in the country — reviewers consistently praise the stone crab claws, fried chicken, and key lime pie, though long waits (even with reservations) are a near-universal complaint, and a few longtime regulars feel it's coasting on reputation as much as food.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Versailles Restaurant", location: "Miami, Florida", rating: 4.5, review: "A legendary Cuban eatery serving authentic Cuban cuisine, including delicious Cuban sandwiches and pastries.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m2.jpg?w=900", communityReview: "Little Havana's most famous restaurant and a genuine Miami cultural landmark — reviewers love the ventanita cafecito window and old-school Cuban classics, though some note it's more about the history and people-watching than the most refined Cuban food in the city.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Yardbird Southern Table & Bar", location: "Miami, Florida", rating: 4.6, review: "Offers Southern comfort food with a modern twist, including their famous fried chicken and bourbon cocktails.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m1-1.jpg?w=900", communityReview: "The fried chicken and waffles are the clear standout, and reviewers consistently recommend it for brunch — a few note it leans touristy on South Beach's Lincoln Road strip and can feel more polished chain than local secret, but the food itself delivers.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Mandolin Aegean Bistro", location: "Miami, Florida", rating: 4.3, review: "A charming Mediterranean restaurant with a cozy courtyard, serving delicious Greek and Turkish dishes.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/m3.jpg?w=900", communityReview: "A Michelin Bib Gourmand pick reviewers consistently praise for the grilled octopus, lamb chops, and one of Miami's most charming courtyard settings — the Design District favorite books out weeks in advance for a reason.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2020,
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
`Take a Helicopter Tour`,
`Ride the indoor canal boats at the Venetian — genuinely worth it`
    ],
    restaurants: [
      { name: `Joel Robuchon`, location: `Las Vegas, Nevada`, rating: 4.3, review: `Located at the MGM Grand, this Michelin three-star restaurant offers an exquisite French dining experience with exceptional service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=900", communityReview: "Widely regarded as one of the finest fine-dining experiences in America, with reviewers consistently calling the multi-course tasting menu (bread, cheese, and dessert carts included) some of the best food of their lives. Worth checking before you go: as of mid-2026 the restaurant is listed as temporarily closed.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Guy Savoy`, location: `Las Vegas, Nevada`, rating: 4.5, review: `Situated at Caesars Palace, Guy Savoy is another Michelin three-star restaurant known for its elegant French cuisine, including signature dishes like artichoke and black truffle soup.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l2.jpg?w=900", communityReview: "Frequently compared to Joel Robuchon by regulars who dine at both — reviewers describe Guy Savoy's style as more restrained and minimalist by comparison, with the artichoke and black truffle soup and colors-of-caviar dish drawing consistent praise.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Raku`, location: `Las Vegas, Nevada`, rating: 4.6, review: `This off-Strip Japanese restaurant is beloved by locals and visitors alike. It serves authentic and delicious dishes such as skewered meats, sashimi, and robata-grilled items.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l1.jpg?w=900", communityReview: "Tucked into an unassuming Chinatown strip mall, Raku is regularly called one of the best Japanese restaurants in the country — reviewers rave about the housemade tofu and robata-grilled skewers, with local chefs and hospitality workers famously eating here late after their own shifts end.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Lotus of Siam`, location: `Las Vegas, Nevada`, rating: 4.3, review: `A Las Vegas institution for Thai cuisine, Lotus of Siam features a diverse menu with flavorful dishes like pad Thai, crispy duck, and spicy curries.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/l3.jpg?w=900", communityReview: "A James Beard Award-winning strip-mall institution that reviewers consistently call a Las Vegas must — the northern Thai dishes and crispy garlic prawns are the most-recommended orders, with the standing local advice being to skip the pad Thai and order what the chef is actually known for.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Las Vegas, Nevada`,
`The neighborhood just past the obvious tourist center, worth a wander`,
`Book a spa massage — one of the most memorable, transcendent massages we've ever had was here`
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
    year: 2020,
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
      { name: `Deno's Mountain Bistro`, location: `Winter Park, Colorado`, rating: 4.3, review: `This popular restaurant offers a warm and inviting atmosphere with a diverse menu featuring American and Mediterranean cuisine. Deno's is known for its delicious steaks, seafood, and pasta dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w8.jpg?w=900", communityReview: "A Winter Park fixture since 1976 with a loyal local following — reviewers love the Greek-influenced menu, wine list, and happy hour, though a vocal minority reports inconsistent service and food quality on off nights, which longtime regulars say is unusual for the restaurant.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Hernando's Pizza Pub`, location: `Winter Park, Colorado`, rating: 4.5, review: `A local favorite, Hernando's is famous for its mouthwatering pizza. With a rustic mountain lodge ambiance, this cozy spot is perfect for enjoying a slice or two after a day on the slopes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w2.jpg?w=900", communityReview: "A Winter Park institution since 1967, with decades of returning regulars — some longtime customers have noted a dip in consistency and service in recent years, which they attribute to changes in ownership, but most reviewers still call it a required stop for pizza after skiing.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Volario's`, location: `Winter Park, Colorado`, rating: 4.6, review: `Located at the Vasquez Creek Inn, Volario's serves up authentic Italian cuisine in a charming setting. The menu features homemade pasta, wood-fired pizza, and a variety of Italian specialties.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w7.jpg?w=900", communityReview: "Widely considered the most upscale option in Winter Park, with reviewers praising the homemade pasta and creekside patio — reviews are genuinely mixed on consistency, with some visits described as exceptional and others marked by slow service, so it may be worth checking current hours before visiting (it closes seasonally).", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Ditch on 40`, location: `Winter Park, Colorado`, rating: 4.3, review: `This casual restaurant offers a vibrant atmosphere and an extensive menu of American comfort food. Whether you're in the mood for a juicy burger, hearty sandwich, or flavorful salad, The Ditch on 40 has you covered.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/w5.jpg?w=900", communityReview: "A self-described locals' dive bar that tolerates ski tourists — reviewers rave about the Ditch Burger and green chile on everything, though service reports are notably inconsistent from visit to visit.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    slug: "vail-2023",
    name: "Vail",
    country: "USA",
    year: 2023,
    tag: "Ski Trip",
    heroImg: "assets/uploads/vail-hero.jpg",
    cardImg: "assets/uploads/vail-card.jpg",
    coords: { top: "28.0%", left: "20.5%" },
    quickFacts: [
      { label: "Best time to go", value: "Dec – Mar" },
      { label: "Currency", value: "US Dollar" },
      { label: "Language", value: "English" },
      { label: "Kid-chaos level", value: "Medium" }
    ],
    whyVisit: "A January ski trip that lived up to the price tag and the cold in equal measure — Vail's slopes and European-style village are the real deal, even when day three has everyone questioning their life choices.",
    thingsToDo: [
      "Ski or snowboard Vail Mountain's Back Bowls",
      "Wander the pedestrian-only Vail Village",
      "Après-ski by the fire after a day on the mountain",
      "Soak in a hot tub after a hard run day"
    ],
    restaurants: [
      { name: "Sweet Basil", location: "Vail", rating: 4.6, review: "A Vail Village institution since 1977, known for creative seasonal dishes overlooking Gore Creek.", img: img("vail-r1", 900, 650), communityReview: "One of Vail's most enduring restaurants, still evolving after nearly 50 years — reviewers consistently praise the lobster-topped dishes and creek-side setting, though reservations book out weeks ahead in peak season.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Mountain Standard", location: "Vail", rating: 4.5, review: "A game-forward American restaurant known for elk, trout, and mountain-driven cooking.", img: img("vail-r2", 900, 650), communityReview: "Praised for its wild-game-forward menu and mountain-modern atmosphere — reviewers frequently call the trout and elk dishes standouts, with the lively bar scene a common highlight for après-ski.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
      "Booth Falls Trail, a quieter hike than the main resort trails",
      "The gondola cabins some restaurants reserve for private fondue dinners in winter"
    ],
    travelTips: [
      "Book dinner reservations well ahead in peak ski season",
      "Layer up — Vail's cold is a real, frequent topic of conversation among visitors",
      "Check the weather for Dec – Mar before locking in dates"
    ],
    gallery: ["assets/uploads/vail-g1.jpg", "assets/uploads/vail-g2.jpg", "assets/uploads/vail-g3.jpg", "assets/uploads/vail-g4.jpg", "assets/uploads/vail-g5.jpg", "assets/uploads/vail-g6.jpg"],
    rating: 9,
    wouldReturn: "Yes — even after the $9k price tag and the cold.",
    relatedAdventure: null
  },
  {
    slug: "boulder-denver-2023",
    name: "Boulder & Denver",
    country: "USA",
    year: 2023,
    tag: "Colorado City Break",
    heroImg: "assets/uploads/boulder-hero.jpg",
    cardImg: "assets/uploads/boulder-card.jpg",
    coords: { top: "27.8%", left: "20.8%" },
    quickFacts: [
      { label: "Best time to go", value: "Apr – Jun" },
      { label: "Currency", value: "US Dollar" },
      { label: "Language", value: "English" },
      { label: "Kid-chaos level", value: "Low" }
    ],
    whyVisit: "A spring trip pairing Boulder's laid-back, foodie-college-town energy with Denver's bigger-city pace — daddy-daughter latte dates and a chocolate factory stop were the highlights that stuck.",
    thingsToDo: [
      "Walk the Pearl Street Mall in Boulder",
      "Hike the Flatirons or Chautauqua Park",
      "Visit a Denver chocolate factory or confectionery",
      "Explore Denver's LoDo neighborhood"
    ],
    restaurants: [
      { name: "Frasca Food and Wine", location: "Boulder", rating: 4.7, review: "A Michelin-starred, James Beard Award-winning restaurant celebrating the food and wine of Friuli-Venezia Giulia, Italy.", img: img("boulder-r1", 900, 650), communityReview: "Widely regarded as one of Colorado's best restaurants — reviewers consistently praise the refined Friulian cooking, deep wine list, and warm, unpretentious service for a Michelin-starred room.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Black Cat Farmstead", location: "Boulder", rating: 4.6, review: "A farm-to-table restaurant with a rotating chef's tasting menu built around ingredients grown on its own historic farmstead.", img: img("boulder-r2", 900, 650), communityReview: "Diners consistently highlight the hyper-local, farm-driven tasting menu and unique private garden cabana seating as a standout Boulder-area experience.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
      "The Boulder Creek Path for a quiet walk away from Pearl Street",
      "Smaller neighborhood coffee shops away from the main downtown strip",
      "One cafe was worth a 25-minute walk from our hotel every single morning — the weather cooperated every time",
      "If you're not on a tight schedule, just drive — we headed out with no agenda beyond one school visit and ended up spotting sheep and moose almost all the way to Wyoming"
    ],
    travelTips: [
      "Boulder and Denver are close enough to combine easily in one trip",
      "Check the weather for Apr – Jun before locking in dates"
    ],
    gallery: ["assets/uploads/boulder-g1.jpg", "assets/uploads/boulder-g2.jpg", "assets/uploads/boulder-g3.jpg", "assets/uploads/boulder-g4.jpg", "assets/uploads/boulder-g5.jpg", "assets/uploads/boulder-g6.jpg"],
    rating: 8,
    wouldReturn: "Yes — the lattes alone are worth it.",
    relatedAdventure: null
  },
  {
    slug: "maui-hi-2022",
    name: `Maui, Hawaii`,
    country: `USA`,
    year: 2022,
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
      { name: `Mama's Fish House (Paia)`, location: `Maui, Hawaii`, rating: 4.3, review: `A legendary restaurant known for its fresh seafood, stunning ocean views, and Polynesian-inspired cuisine. It's a popular spot, so make sure to make a reservation in advance.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h9.jpg?w=900", communityReview: "One of Maui's most debated restaurants — the beachfront setting and daily-changing fresh fish menu draw genuine devotion from many diners, while others (including some longtime residents) call it overpriced tourist theater you can beat elsewhere on the island for less. Book three to six months out either way.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Lahaina Grill (Lahaina)`, location: `Maui, Hawaii`, rating: 4.5, review: `This award-winning restaurant offers a sophisticated dining experience with a menu featuring a fusion of Hawaiian and contemporary flavors. The atmosphere is elegant, and the service is exceptional.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h10.jpg?w=900", communityReview: "Lahaina Grill was lost in the August 2023 wildfire that destroyed most of historic Front Street — it no longer exists. Longtime visitors still remember it fondly as one of the best restaurants on the island; if you're headed to West Maui, consider supporting one of the businesses that reopened as part of the town's ongoing recovery.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Merriman's (Kapalua)`, location: `Maui, Hawaii`, rating: 4.6, review: `Located in the picturesque Kapalua resort area, Merriman's offers farm-to-table cuisine using locally sourced ingredients. The menu highlights the flavors of Hawaii and the Pacific Rim.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h5.jpg?w=900", communityReview: "Frequently named as the answer in the ongoing \"Merriman's vs. Mama's\" Maui debate — many locals and repeat visitors prefer it for the Kapalua Bay sunset views and consistent farm-to-table cooking, with happy hour on the patio a favorite recommendation.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Mill House (Waikapu)`, location: `Maui, Hawaii`, rating: 4.3, review: `Situated in a beautiful plantation-era building, The Mill House serves creative dishes crafted with ingredients grown on their own farm. It offers a unique farm-to-table experience with stunning views of the Maui Tropical Plantation.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/h14.jpg?w=900", communityReview: "A genuinely farm-to-table spot reviewers appreciate for being a step off the resort circuit — the plantation setting and produce grown on-site get consistent praise, with sunset views over the valley as a frequent highlight.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2022,
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
      { name: `Le Bernardin`, location: `New York City`, rating: 4.3, review: `A renowned seafood restaurant with three Michelin stars, known for its exquisite French cuisine and exceptional service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n6.jpg?w=900", communityReview: "One of the few NYC restaurants that reviewers describe as living up to decades of hype — the seafood-focused tasting menu and dining room service are consistently called flawless, and unlike some legacy institutions, its reputation hasn't slipped.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Peter Luger Steak House`, location: `New York City`, rating: 4.5, review: `A classic steakhouse in Brooklyn, famous for its dry-aged steaks and old-world charm. Make sure to try their iconic porterhouse steak.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n8.jpg?w=900", communityReview: "A genuinely documented decline: Peter Luger lost its Michelin star in 2022 after a famously scathing zero-star New York Times review in 2019 that criticized inconsistent, underwhelming steak and brusque service. It still has passionate defenders who call the burger and the 138-year history worth it regardless — but go in knowing the food no longer has universal acclaim.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Momofuku Ssäm Bar`, location: `New York City`, rating: 4.6, review: `This trendy spot in the East Village offers innovative Asian-inspired dishes, such as their famous pork buns and bo ssäm.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n10.jpg?w=900", communityReview: "Momofuku Ssäm Bar has closed — both its original East Village spot and its 2021 relocation to South Street Seaport now show as permanently closed. David Chang's Momofuku Noodle Bar, the sister restaurant that started it all, is still open and thriving in the East Village if you want the brand experience.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Katz's Delicatessen`, location: `New York City`, rating: 4.3, review: `A legendary Jewish deli on the Lower East Side, serving up delicious pastrami and corned beef sandwiches. Don't forget to grab a ticket and try their "sendwich" experience.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/n4.jpg?w=900", communityReview: "New York's most famous deli since 1888, and reviewers overwhelmingly say it earns the hype — the hand-carved pastrami and old-school counter chaos are consistently called a must-do. One fun bit of contrarian history: a 1979 New York Times ranking of the city's best Jewish delis actually rated Katz's pastrami the weakest of the top tier, calling it \"tough\" and \"barely edible\" — a reminder that even legends have critics.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2022,
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
      { name: `Zahav`, location: `Philadelphia, Pennsylvania`, rating: 4.3, review: `This renowned Israeli restaurant offers a modern take on Middle Eastern cuisine, serving dishes like hummus, lamb shoulder, and grilled duck hearts. Don't miss the salatim and the incredible tasting menu.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p5.jpg?w=900", communityReview: "A James Beard Award winner for Outstanding Restaurant and widely called the best restaurant in Philadelphia — reviewers consistently rave about the mezze, pomegranate lamb shoulder, and warm laffa bread. Reservations release on the first Tuesday of the month for the following month, so plan ahead.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Vernick Food & Drink`, location: `Philadelphia, Pennsylvania`, rating: 4.5, review: `Chef Greg Vernick's restaurant focuses on seasonal American cuisine with global influences. The menu features beautifully executed dishes like roasted sea bream, wood-grilled duck, and homemade pastas.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p2.jpg?w=900", communityReview: "Regularly named among Philadelphia's best restaurants, with reviewers praising the signature \"toasts,\" wood-fired whole chicken, and polished-but-unstuffy Rittenhouse Square atmosphere — some travelers rank it above comparable meals they've had in Paris.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Vedge`, location: `Philadelphia, Pennsylvania`, rating: 4.6, review: `A popular choice for vegetarians and vegans, Vedge serves inventive plant-based dishes with bold flavors. Try their signature dishes like the rutabaga fondue, eggplant braciole, and the wood-roasted carrot.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p1.jpg?w=900", communityReview: "Michelin-recommended and James Beard-nominated, often called one of the best vegan restaurants in the country — reviewers rave about the rutabaga fondue, though a few mention smaller portions and higher prices than expected for a plant-based menu.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Talula's Garden`, location: `Philadelphia, Pennsylvania`, rating: 4.3, review: `Located in Washington Square, this charming farm-to-table restaurant offers a delightful menu highlighting local and sustainable ingredients. The butternut squash ravioli, mushroom toast, and roasted chicken are crowd favorites.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/p8.jpg?w=900", communityReview: "A garden-patio favorite reviewers consistently call magical for a special occasion, with the lamb bolognese and brunch fried chicken and waffle earning particular praise — Taylor Swift and Travis Kelce were even spotted there for a family Mother's Day brunch.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2022,
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
      { name: `Rose's Luxury`, location: `Washington, D.C.`, rating: 4.3, review: `This award-winning restaurant offers a unique and innovative dining experience with a changing menu featuring seasonal dishes. The food is creative, flavorful, and beautifully presented.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d3.jpg?w=900", communityReview: "Named Bon Appétit's Best New Restaurant in 2014 and now holding a Michelin star, with chef Aaron Silverman a James Beard winner — reviewers consistently rave about the pork and lychee salad and playful \"choose your own adventure\" prix-fixe format. It doesn't take advance reservations, so plan to line up early.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Little Serow`, location: `Washington, D.C.`, rating: 4.5, review: `If you're a fan of Thai cuisine, Little Serow is a must-visit. This small and intimate restaurant serves up authentic and spicy Northern Thai dishes in a prix-fixe format. Reservations are highly recommended.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d6.jpg?w=900", communityReview: "Frequently mentioned in the same breath as Rose's Luxury and Komi as DC's top tier of no-reservation fine dining — reviewers love the family-style Northern Thai prix fixe and warm, high-energy service, though the no-reservations policy means a real wait during peak hours.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Fiola`, location: `Washington, D.C.`, rating: 4.6, review: `Fiola is a fine dining establishment that specializes in Italian cuisine. The menu features exquisite dishes made with high-quality ingredients, and the service is impeccable.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d5.jpg?w=900", communityReview: "A Michelin-starred, James Beard-winning Italian tasting menu widely called one of DC's best restaurants — most reviews are glowing, though a notable minority report uneven service and steep pricing (one detailed a $1,000+ tab with service they called disappointing), so it's not universally flawless despite the accolades.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Dabney`, location: `Washington, D.C.`, rating: 4.3, review: `Located in a historic row house, The Dabney focuses on showcasing the Mid-Atlantic region's local ingredients. The menu changes frequently to highlight seasonal offerings, and the open kitchen adds to the restaurant's charm.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/d9.jpg?w=900", communityReview: "A Michelin-starred Mid-Atlantic wood-hearth kitchen named Washingtonian's #1 restaurant in 2023 — reviewers consistently call it one of the best meals in the city, with a couple noting the Blagden Alley location is easy to miss on a first visit.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2023,
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
      { name: `Osteria All'Antico Vinaio`, location: `Florence`, rating: 4.3, review: `This small sandwich shop is a local favorite and serves delicious traditional Tuscan panini. The sandwiches are made with high-quality ingredients, and the flavors are incredible.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f15.jpg?w=900", communityReview: "One of Florence's most famous sandwich shops, with reviewers consistently praising the schiacciata bread and fresh fillings — the line is long but efficiently managed, though a few reviewers note occasional inconsistency in how generously they're filled.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Trattoria Mario`, location: `Florence`, rating: 4.5, review: `Located near the Mercato Centrale, this traditional trattoria offers classic Tuscan dishes. The menu changes daily, but you can expect hearty, home-cooked meals like ribollita, bistecca alla Fiorentina, and handmade pasta.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f11.jpg?w=900", communityReview: "A no-reservations, lunch-only, communal-table Florentine institution since 1953 — reviewers overwhelmingly call the bistecca alla Fiorentina one of the best steaks of their trip, though a handful of recent reviews grumble that its viral popularity online has made it feel more like a tourist checklist stop than the hidden gem it once was.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `La Giostra`, location: `Florence`, rating: 4.6, review: `A charming restaurant with a medieval atmosphere, La Giostra offers a mix of Italian and international dishes. The menu features creative options such as pear and pecorino cheese ravioli and wild boar stew.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f3.jpg?w=900", communityReview: "Locals in Florence dining forums often describe La Giostra as more touristy and pricier than nearby alternatives like Il Santo Bevitore, though most diners still leave impressed by the atmosphere and pasta — worth booking the main dining room specifically, per repeat visitors.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Il Santo Bevitore`, location: `Florence`, rating: 4.3, review: `This cozy and rustic restaurant focuses on seasonal ingredients and traditional Tuscan flavors. The menu is varied, and the dishes are beautifully presented. Don't miss their handmade pasta and the selection of local wines.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/06/f2.jpg?w=900", communityReview: "A Michelin-recognized favorite with locals as much as tourists — reviewers consistently praise the seasonal Tuscan menu and lively atmosphere, though portions run smaller than expected and reservations are essential, as it fills up fast even on weeknights.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2023,
    tag: `Back to the Parks`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/13.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/10.jpg?w=900",
    coords: { top: "34.16%", left: "27.57%" },
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
      { name: `Victoria & Albert's`, location: `Orlando, Florida (2023)`, rating: 4.3, review: `Located at Disney's Grand Floridian Resort & Spa, this upscale restaurant offers a fine dining experience with a prix fixe menu. It's renowned for its exquisite cuisine and impeccable service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/13.jpg?w=900", communityReview: "A AAA Five-Diamond restaurant reviewers consistently call the best dining experience in all of Walt Disney World — the multi-course tasting menu, formal service, and no-kids-under-10 policy make it a genuine special-occasion splurge, with prices to match.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Ravenous Pig`, location: `Orlando, Florida (2023)`, rating: 4.5, review: `A popular gastropub featuring a creative menu with a focus on locally sourced ingredients. It offers a mix of innovative dishes and classic pub fare.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/10.jpg?w=900", communityReview: "A Michelin Bib Gourmand gastropub with a devoted local following — reviewers consistently praise the farm-to-table cooking (the Iberian pork and pork belly starter get repeat mentions) and reasonable pricing for the quality.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Kadence`, location: `Orlando, Florida (2023)`, rating: 4.6, review: `A unique omakase-style sushi experience where the chefs prepare and serve a curated selection of dishes right in front of you. Reservations are recommended well in advance.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/8.jpg?w=900", communityReview: "A Michelin-starred, nine-seat omakase counter with many glowing reviews calling it one of Orlando's best meals — but worth knowing before booking: multiple independent reviews describe alarming incidents at the counter, including reports of inappropriate jokes and, in one detailed account, a chef brandishing a knife over a guest's comment. Read recent reviews yourself before committing to the $200+ prepaid seating.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Yellow Dog Eats`, location: `Orlando, Florida (2023)`, rating: 4.3, review: `A charming spot known for its creative sandwiches, salads, and quirky atmosphere. It's a local favorite for its delicious comfort food.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/08/12.jpg?w=900", communityReview: "A funky, dog-friendly sandwich shop in a historic 1910 house that reviewers consistently call an Orlando hidden gem — the pulled pork sandwiches and homemade desserts draw praise, with roaming chickens and a laid-back backyard patio as part of the charm.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2023,
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
      { name: `Hattie B's Hot Chicken`, location: `Nashville, Tennessee`, rating: 4.3, review: `If you're a fan of spicy fried chicken, Hattie B's is a must-visit. They offer various levels of heat, allowing you to choose your spice level.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=900", communityReview: "Nashville's most tourist-famous hot chicken spot, and genuinely a fun, crowd-pleasing stop — though longtime locals frequently point out it's the newer, more corporate version of what Prince's actually invented, and a fair number rank it below several lesser-known local favorites.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Prince's Hot Chicken Shack`, location: `Nashville, Tennessee`, rating: 4.5, review: `Another excellent choice for hot chicken lovers, Prince's is one of the pioneers of Nashville hot chicken and offers a unique and flavorful experience.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394535282_10224807912293330_6820641152032916730_n.jpg?w=900", communityReview: "The true original — legend has it hot chicken was invented here as revenge, when a scorned girlfriend overspiced her boyfriend's fried chicken and he loved it anyway. Reviewers and locals overwhelmingly consider it the more authentic choice over Hattie B's, though it's a no-frills counter-service spot, not a sit-down restaurant.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Loveless Cafe`, location: `Nashville, Tennessee`, rating: 4.6, review: `Famous for its Southern comfort food, Loveless Cafe is renowned for its biscuits, country ham, and homemade preserves. A perfect spot for a traditional Southern breakfast or brunch.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/394431453_10224811283697613_1664064479663080319_n.jpg?w=900", communityReview: "A Nashville landmark since 1951, and the biscuits still earn near-universal praise — but reviews on the rest of the menu are more mixed, with some longtime visitors feeling the historic reputation now outpaces the food and portions for the price.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Martin's Bar-B-Que Joint`, location: `Nashville, Tennessee`, rating: 4.3, review: `If you're craving barbecue, Martin's is the place to be. They serve mouthwatering smoked meats, including ribs, brisket, and pulled pork, along with a variety of tasty sauces.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/11/393349720_10224807722688590_8153504040082434340_n.jpg?w=900", communityReview: "A West Tennessee whole-hog BBQ specialist that reviewers consistently praise for the brisket and pulled pork, with live music at some locations a fun bonus — reviews are mostly strong, though a handful mention inconsistent sides or an off night on the sausage.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2024,
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
      { name: `Franklin Barbecue`, location: `Austin & San Antonio`, rating: 4.3, review: `Famous for its mouth-watering brisket and long lines, this spot is a must for barbecue lovers.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451615030_10226039681406788_8818278162153046029_n.jpg?w=900", communityReview: "Anthony Bourdain called it the finest brisket he'd ever had, and reviewers overwhelmingly agree it's worth the notorious 2-5 hour line — bring a chair, arrive before dawn, and expect them to sell out by early afternoon most days.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Uchi`, location: `Austin & San Antonio`, rating: 4.5, review: `A renowned spot for Japanese cuisine, offering a creative menu of sushi and sashimi in a stylish setting.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452156104_10226054326372903_2747347177152676058_n.jpg?w=900", communityReview: "Widely considered Austin's best sushi, from James Beard Award-winning chef Tyson Cole — reviewers consistently praise the inventive small plates and hot dishes alongside the sushi, though it's a splurge and reservations book out well in advance.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Emmer & Rye`, location: `Austin & San Antonio`, rating: 4.6, review: `Known for its focus on seasonal and local ingredients, this restaurant offers a unique dining experience with dim sum-style service.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/452236550_10226052782414305_457577436554945498_n.jpg?w=900", communityReview: "Praised for its dim-sum-cart-style service and hyper-local, seasonal menu that changes constantly — reviewers call the format genuinely fun and different from typical fine dining, with the homemade pastas a recurring highlight.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Torchy's Tacos`, location: `Austin & San Antonio`, rating: 4.3, review: `A local favorite for innovative and delicious tacos with unique flavor combinations.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/07/451808518_10226052781294277_6148522228529596158_n.jpg?w=900", communityReview: "An Austin institution that's since grown into a regional chain — reviewers consistently praise the Trailer Park (fried chicken) taco and queso, with the caveat that service and cleanliness can vary noticeably between locations.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2024,
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
      { name: `The Twin Lakes Inn & Saloon`, location: `Twin Lakes, Colorado`, rating: 4.3, review: `A historic establishment offering classic American cuisine with a focus on locally sourced ingredients. The atmosphere is cozy and rustic, making it a perfect spot after a day of exploring the area.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454741954_10226247521722666_8320194507133385005_n.jpg?w=900", communityReview: "Dating to 1879 and rumored to have once been a brothel, this is essentially the only real restaurant in the tiny town of Twin Lakes — reviewers are consistently surprised by how good the food is given the remote location, with the smoked wings and steak singled out most often.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Twin Lakes General Store`, location: `Twin Lakes, Colorado`, rating: 4.5, review: `While primarily a store, it offers fresh sandwiches, baked goods, and coffee. It's a great spot to grab a quick bite before heading out to explore the lakes and trails.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454773247_10226247522282680_6115943612354302074_n.jpg?w=900", communityReview: "A convenient grab-and-go stop in a town with very few options — reviewers appreciate having fresh coffee and sandwiches available before a day on the trails, without expecting (or getting) a full restaurant experience.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Dayton Room`, location: `Twin Lakes, Colorado`, rating: 4.6, review: `Located within the Twin Lakes Inn, this restaurant provides a fine dining experience with a menu that features both creative dishes and comforting classics. It's known for its exceptional service and intimate setting.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454731192_10226247522882695_8438940723759965963_n.jpg?w=900", communityReview: "Reviewers repeatedly call this one of the best surprise meals of their whole Colorado trip — unexpectedly gourmet dishes like wild game meatloaf in a warm, intimate dining room, though at least one review mentions an off night with a curt staff member.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Casa Sanchez`, location: `Twin Lakes, Colorado`, rating: 4.3, review: `Located nearby in Leadville, this Mexican restaurant offers delicious, authentic Mexican cuisine. It's worth the short drive if you're craving something different.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2024/08/454839035_10226247524002723_1749134143176923779_n.jpg?w=900", communityReview: "A Leadville favorite reviewers consistently praise for generous portions, strong margaritas, and a complimentary tequila shot served as \"Mexican dessert\" — a handful of reviews note inconsistent salsa or an occasional off dish, but the overall verdict is overwhelmingly positive.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2025,
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
      { name: `Canlis`, location: `Seattle, Washington`, rating: 4.3, review: `Iconic fine dining with a stunning view and innovative Northwest cuisine.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1040562209185833217451560.jpg?w=900", communityReview: "Seattle's fine-dining institution since 1950, and Food & Wine ranked it the #2 best restaurant in America in 2025 — yet a growing chorus of local critics (including the Seattle Times) argue it's lost some of its edge, citing soggy fries and an overpriced, occasionally underwhelming tasting menu relative to newer competitors. Still worth the view at least once.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Walrus and the Carpenter`, location: `Seattle, Washington`, rating: 4.5, review: `Famous for oysters and small seafood plates.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250322_1211441957187576267787351.jpg?w=900", communityReview: "A Ballard institution that's landed on national best-restaurant lists, with reviewers consistently raving about the fresh, sustainably-sourced oysters — no reservations means real waits at peak times, and a handful of recent reviews flag slower, less attentive service than the restaurant's reputation suggests.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Din Tai Fung`, location: `Seattle, Washington`, rating: 4.6, review: `Famous for soup dumplings and Taiwanese dishes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250320_1053527e28838980681902663328.jpg?w=900", communityReview: "A globally acclaimed Taiwanese chain, and reviewers consistently say it earns the hype despite being a chain — the xiao long bao (soup dumplings) draw near-universal praise for consistency, with the dim-sum-style ordering sheet making it easy to over-order.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Tilikum Place Café`, location: `Seattle, Washington`, rating: 4.3, review: `Known for its amazing Dutch baby pancakes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/04/20250323_1116097723142783135128774.jpg?w=900", communityReview: "A tiny, 12-table neighborhood favorite reviewers call a hidden gem for brunch — the Dutch baby pancakes are the signature order, though the small dining room means real waits and reservations are essential, especially on weekends.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2025,
    tag: `New England`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514514037_10229925389667066_6430556743000150894_n.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514413063_10230024803592352_7441508285926522327_n.jpg?w=900",
    coords: { top: "26.96%", left: "30.39%" },
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
      { name: `Union Oyster House`, location: `Boston & Martha's Vineyard`, rating: 4.3, review: `Oldest continuously operating restaurant in the U.S. — go for clam chowder, oysters, baked stuffed lobster.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514514037_10229925389667066_6430556743000150894_n.jpg?w=900", communityReview: "Running since 1826, and the honest local consensus (including a Boston Globe piece literally titled \"Tourist trap or living history?\") is that you're paying for history and atmosphere, not a great meal — sit at the raw bar where oysters are shucked fresh in front of you rather than pre-shucked, and go in for the JFK booth and 200 years of history, not a culinary highlight.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Neptune Oyster`, location: `Boston & Martha's Vineyard`, rating: 4.5, review: `Tiny, no-reservations spot known for some of the best lobster rolls in the North End.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514413063_10230024803592352_7441508285926522327_n.jpg?w=900", communityReview: "Frequently named the actual best oyster spot in Boston, and locals steer visitors here over Union Oyster House specifically for food quality — no reservations, tiny space, and real waits, but reviewers overwhelmingly say the butter-poached lobster roll is worth it.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Giacomo's`, location: `Boston & Martha's Vineyard`, rating: 4.6, review: `Tiny, loud, cash-only — authentic pasta and seafood; the lobster fra diavolo is legendary.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/515935363_10230024805032388_5201113540585239684_n.jpg?w=900", communityReview: "The original North End location (355 Hanover St) was ranked one of the best Italian restaurants in the U.S. by Tasting Table — reviewers consistently rave about the pumpkin tortellini and seafood, with the line-out-the-door, cash-only, no-reservations routine treated as part of the experience. Note: a separate South End sister location, Casa Giacomo's, has closed — make sure you're headed to the original.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `The Black Dog Tavern`, location: `Boston & Martha's Vineyard`, rating: 4.3, review: `Iconic and family-friendly on Martha's Vineyard — get the clam chowder and blueberry pancakes.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2025/07/514272391_10229980722170344_7946737040818197237_n.jpg?w=900", communityReview: "An island landmark right by the Vineyard Haven ferry terminal — reviewers openly call it touristy but say it's genuinely fun, with the mussels, chowder, and waterfront fireplace atmosphere earning consistent praise even from visitors who expected a tourist-trap letdown.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of Boston & Martha's Vineyard`,
`The neighborhood just past the obvious tourist center, worth a wander`,
`If your trip lands around July 4th, a harbor-view room gets you the fireworks without fighting the crowds`,
`The best food and neighborhoods weren't near the main sights — they were just a few blocks away the whole time`
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
    year: 2026,
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
      { name: `Hog Island Oyster Co.`, location: `San Francisco, California`, rating: 4.3, review: `Fresh oysters, clam chowder, and grilled cheese with oysters — very Northern California.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/705717879_10233905444045938_4159279485583045890_n.jpg?w=900", communityReview: "A Ferry Building fixture that sources its own oysters from Tomales Bay — reviewers consistently call it a rare exception among touristy waterfront spots, saying the seafood and Bay Bridge views both genuinely deliver rather than one propping up the other.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Swan Oyster Depot`, location: `San Francisco, California`, rating: 4.5, review: `Legendary tiny seafood counter. Expect a line.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707580717_10233944377779257_6490851226168534751_n.jpg?w=900", communityReview: "Family-run since 1912, and genuinely beloved by food-world insiders — Anthony Bourdain filmed here, and Bon Appétit's restaurant editor called it \"maybe my favorite restaurant on the planet.\" Cash only, no reservations, counter seating only, and waits can run over an hour — locals say it's worth timing your visit right at opening.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Tadich Grill`, location: `San Francisco, California`, rating: 4.6, review: `Classic historic SF restaurant dating back to the Gold Rush era.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/707447081_10233944376619228_3714820704832277364_n.jpg?w=900", communityReview: "The oldest restaurant in California, dating to 1849 — reviewers call the old-school charm and old-fashioned menu (think petrale sole and lamb chops with mint jelly) a genuine time capsule. Often debated as the more polished alternative to Swan Oyster Depot's counter-and-a-wait experience.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Tartine Bakery`, location: `San Francisco, California`, rating: 4.3, review: `Probably the city's most famous bakery.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2026/05/708300398_10233944378699280_8821601808691334938_n.jpg?w=900", communityReview: "Reviewers overwhelmingly say it lives up to the hype — the croissants and morning buns draw particular praise, and while the line can be long, most say it moves quickly and is worth the wait.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`Ask a local for their favorite spot away from the main strip — it's usually the best one`,
`An early-morning walk before the crowds is the best version of San Francisco, California`,
`The neighborhood just past the obvious tourist center, worth a wander`,
`Our redwood forest driver turned into an unofficial tour guide for the whole hour-long ride — a local who grew up there and pointed out everything, historical and otherwise, with genuine love for his city`
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
    year: 2022,
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
    foodPhotos: [],
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
    year: 2022,
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
    foodPhotos: [],
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
    year: 2022,
    tag: `Italy 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i16.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/i12.jpg?w=900",
    coords: { top: "25.7%", left: "52.9%" },
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
    foodPhotos: [],
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
    year: 2022,
    tag: `Italy 2022 Stop`,
        heroImg: "assets/uploads/naples-hero.jpg",
        cardImg: "assets/uploads/naples-card.jpg",
    coords: { top: "27.3%", left: "54.0%" },
    quickFacts: [
      { label: "Best time to go", value: `Apr – Jun` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Medium` }
    ],
    whyVisit: `Naples is chaotic, loud, and the birthplace of pizza — the launch point for Pompeii and the Amalfi Coast, and a real change of pace from the Renaissance calm of Florence. The pizza was legit everywhere we tried it — no bad slice in the whole city.`,
    thingsToDo: [
      `Explore the ruins of Pompeii`,
      `Walk the historic center`,
      `Eat pizza where it was invented`
    ],
    restaurants: [
      { name: "L'Antica Pizzeria Da Michele", location: "Naples", rating: 4.5, review: "The most famous pizzeria in Naples, serving only two kinds of pizza since 1870 — Margherita and Marinara — in a no-frills, cramped dining room in the historic center.", img: "assets/uploads/naples-g1.jpg", communityReview: "Featured in Eat, Pray, Love and beloved by locals and tourists alike for over 150 years — reviewers consistently call the simplicity the whole point, with soft, chewy, wood-fired crust that needs nothing more than the two options on the menu. Expect a real line; they don't take reservations.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Gino Sorbillo", location: "Naples", rating: 4.4, review: "A Naples pizza dynasty since 1935 — the Sorbillo family has 21 children who all became pizza makers, and grandson Gino has become something of a celebrity chef.", img: "assets/uploads/naples-g2.jpg", communityReview: "Regularly named in the same breath as Da Michele as one of the two best-known pizzerias in the city — reviewers praise the wider topping selection and chewy Neapolitan dough, though it's just as packed with tourists as its famous rival.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Antica Pizzeria Di Matteo", location: "Naples", rating: 4.5, review: "A cheap, unpretentious Naples institution on Via dei Tribunali, known for turning out fantastic pizza without the ceremony of its more famous neighbors.", img: "assets/uploads/naples-g3.jpg", communityReview: "Often called the underdog favorite among Naples pizza spots — reviewers love that it's easy to walk right into compared to the hours-long waits elsewhere, without sacrificing quality.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Antica Friggitoria La Masardona", location: "Naples", rating: 4.3, review: "A Naples specialist in pizza fritta — fried pizza — running since 1945, serving a completely different (and less internationally famous) side of Neapolitan pizza tradition.", img: "assets/uploads/naples-g4.jpg", communityReview: "Reviewers consistently recommend this as the place to try fried pizza specifically, distinct from the wood-fired classics found elsewhere in the city — a genuinely different dish worth seeking out on its own.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`The lesser-visited Herculaneum ruins, smaller and less crowded than Pompeii but remarkably well preserved`,
`The Naples Underground (Napoli Sotterranea) for a look at the tunnels below the city`
    ],
    travelTips: [
`Check the weather for Apr – Jun before locking in dates`,
`Pompeii takes a half to full day — plan accordingly`
    ],
        gallery: ["assets/uploads/naples-hero.jpg", "assets/uploads/naples-card.jpg", "assets/uploads/naples-g1.jpg", "assets/uploads/naples-g2.jpg", "assets/uploads/naples-g3.jpg", "assets/uploads/naples-g4.jpg", "assets/uploads/naples-g5.jpg", "assets/uploads/naples-g6.jpg"],
    rating: 8,
    wouldReturn: `Yes — mainly for the pizza.`,
    relatedAdventure: "italy-2022"
  },
  {
    slug: "amalfi-2022",
    name: `Amalfi Coast`,
    country: `Italy`,
    year: 2022,
    tag: `Italy 2022 Stop`,
        heroImg: "assets/uploads/amalfi-hero.jpg",
        cardImg: "assets/uploads/amalfi-card.jpg",
    coords: { top: "27.4%", left: "54.1%" },
    quickFacts: [
      { label: "Best time to go", value: `May – Sep` },
      { label: "Currency", value: `Euro` },
      { label: "Language", value: `Italian` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `Cliffside towns, impossibly blue water, and a coastal road that's an experience in itself — the Amalfi Coast is the slow, scenic exhale after Naples. We mostly grazed here — pastries and limoncello along the coast road — rather than sitting down for full meals.`,
    thingsToDo: [
      `Walk along the Amalfi Coast`,
      `Explore the cliffside towns`,
      `Take in the coastal drive`
    ],
    restaurants: [
      { name: "Da Gemma", location: "Amalfi", rating: 4.5, review: "An old-school Amalfi favorite with recipes said to trace back to cookbooks used for the Dukes of Naples — expect fresh fish and old-school, detail-oriented service.", img: "assets/uploads/amalfi-g1.jpg", communityReview: "Reviewers consistently recommend booking ahead for an outdoor table, calling the fritto misto (lightly battered mixed seafood) and the Caprese salad standouts — a reliably excellent, classic Amalfi meal.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Ristorante La Caravella", location: "Amalfi", rating: 4.4, review: "A Michelin-starred restaurant set in a 12th-century palace near Amalfi's old shipyards, blending regional dishes with modern, experimental touches.", img: "assets/uploads/amalfi-g2.jpg", communityReview: "One of the most decorated dining rooms on this stretch of coast — reviewers praise both the historic setting and dishes like squid-ink pasta filled with ricotta and lobster, calling it a genuine special-occasion splurge.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Ristorante il Chiostro", location: "Amalfi", rating: 4.3, review: "A charming spot right by the Amalfi Cathedral, with outdoor seating looking straight onto the piazza.", img: "assets/uploads/amalfi-g3.jpg", communityReview: "Reviewers consistently mention the views of the cathedral square as the highlight, with scratch-made pasta — the lasagna and pesto get particular praise — rounding out a reliably good meal in the heart of town.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Sensi Restaurant", location: "Amalfi", rating: 4.5, review: "A Michelin-starred seafood specialist with multi-course tasting menus and a romantic outdoor terrace for sunset dining.", img: "assets/uploads/amalfi-hero.jpg", communityReview: "Reviewers consistently call the terrace dinner one of the highlights of the whole Amalfi Coast, with the zucchini flowers stuffed with ricotta and zucchini linguine getting particular praise — request the terrace table when booking.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`Path of the Gods, a cliffside hiking trail above the coast with fewer crowds than the beach towns below`,
`Take the ferry between towns instead of the coastal road to skip the traffic entirely`
    ],
    travelTips: [
`Check the weather for May – Sep before locking in dates`,
`The coastal roads are narrow and slow — build in extra travel time`
    ],
        gallery: ["assets/uploads/amalfi-hero.jpg", "assets/uploads/amalfi-card.jpg", "assets/uploads/amalfi-g1.jpg", "assets/uploads/amalfi-g2.jpg", "assets/uploads/amalfi-g3.jpg"],
    rating: 9,
    wouldReturn: `Yes — this was one of the most beautiful drives of the whole trip.`,
    relatedAdventure: "italy-2022"
  },
  {
    slug: "tokyo-2019",
    name: `Tokyo`,
    country: `Japan`,
    year: 2019,
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
      { name: `Sukiyabashi Jiro`, location: `Tokyo`, rating: 4.3, review: `If you're a sushi lover, this is a must-visit restaurant in Tokyo featured in the famous documentary "Jiro Dreams of Sushi".`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j16.jpg?w=900", communityReview: "Made famous by 'Jiro Dreams of Sushi' and a presidential visit — reviews run to extremes. Many call it the best sushi of their life; others find the famously brisk, no-frills 20-minute service cold and not worth the steep price.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Ichiran Ramen`, location: `Tokyo`, rating: 4.5, review: `This popular ramen chain in Tokyo allows diners to customize their own bowls of ramen in private booths.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j18.jpg?w=900", communityReview: "Famous for solo dining booths and a fully customizable tonkotsu broth — reviewers consistently enjoy the novelty and quality, though some call it more tourist experience than Kyoto or Tokyo's best ramen.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: `Genki Sushi`, location: `Tokyo`, rating: 4.3, review: `This conveyor belt sushi chain is a fun and affordable option for sushi lovers in Tokyo and other cities.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j15.jpg?w=900", communityReview: "A popular, affordable conveyor-belt sushi chain — reviews are mixed, with many enjoying the fun, kid-friendly format while others note inconsistent freshness and slow service at busier locations.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2019,
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
      { name: `Kikunoi`, location: `Kyoto`, rating: 4.6, review: `This three-Michelin-starred restaurant in Kyoto serves traditional kaiseki cuisine, a multi-course meal consisting of beautifully presented dishes made with seasonal ingredients.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j2.jpg?w=900", communityReview: "A three-Michelin-starred kaiseki institution led by chef Yoshihiro Murata — most reviewers call it an unforgettable, exquisitely presented meal, though a few find the pacing slow and the experience doesn't match the price for their taste.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2019,
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
      { name: `Dotonbori Street`, location: `Osaka`, rating: 4.3, review: `Located in Osaka, this vibrant street is home to various street food vendors offering everything from takoyaki to okonomiyaki.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j12.jpg?w=900", communityReview: "Osaka's best-known food street, lined with neon signs and street stalls — reviewers consistently call it a must-see for takoyaki and okonomiyaki, while noting it's crowded and touristy by evening.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2019,
    tag: `Japan 2019 Stop`,
        heroImg: "assets/uploads/fuji-hero.jpg",
        cardImg: "assets/uploads/fuji-card.jpg",
    coords: { top: "22%", left: "80.5%" },
    quickFacts: [
      { label: "Best time to go", value: `Jun – Sep` },
      { label: "Currency", value: `Japanese Yen` },
      { label: "Language", value: `Japanese` },
      { label: "Kid-chaos level", value: `Low` }
    ],
    whyVisit: `A day trip out of Tokyo into the mountains — Japan's most iconic peak, at its best on a clear morning from one of the lakes at its base. We stayed and dined right at the resort spa here, so no outside restaurant picks from this stop.`,
    thingsToDo: [
      `View Mt. Fuji from Lake Kawaguchiko or Hakone`,
      `Visit a traditional onsen (hot spring) with a view of the mountain`,
      `Photograph the peak from one of the classic viewpoints`
    ],
    restaurants: [
      { name: "Houtou Fudou", location: "Mt. Fuji (Kawaguchiko)", rating: 4.4, review: "The area's best-known hoto noodle specialist, with several branches around Lake Kawaguchiko — the main store sits near the Kawaguchiko Museum of Art with views of Mt. Fuji itself.", img: "assets/uploads/fuji-g1.jpg", communityReview: "Reviewers consistently call this the place to try hoto — thick, chewy wheat noodles in a rich miso-pumpkin broth — with the hearty, warming bowl repeatedly described as the perfect antidote to the mountain cold.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Kosaku Hoto Kosaku", location: "Mt. Fuji (Kawaguchiko)", rating: 4.3, review: "A humble, locally loved noodle shop known for its exceptional hoto noodle soup, tucked into the Mt. Fuji area away from the busier tourist strips.", img: "assets/uploads/fuji-g2.jpg", communityReview: "Reviewers consistently praise the generous portions and rich broth, with the spicy pork hoto and fried oyster getting particular mentions — a genuine local favorite, not just a tourist stop.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Shaw's Sushi Bar & Dining", location: "Mt. Fuji (Kawaguchiko)", rating: 4.4, review: "A stylish, modern sushi spot right across from Kawaguchiko Station, with beautifully presented nigiri and rolls.", img: "assets/uploads/fuji-g3.jpg", communityReview: "Reviewers consistently say the quality justifies the higher price tag for the area, with the variety of sushi sets — including a dedicated vegetarian option — earning particular praise.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Sanrokuen", location: "Mt. Fuji (Kawaguchiko)", rating: 4.3, review: "A traditional barbecue restaurant inside a 150-year-old thatched-roof building, where diners grill their own skewers at the table.", img: "assets/uploads/fuji-g4.jpg", communityReview: "Reviewers consistently describe the atmosphere as stepping back into old Japan, with the historic building and hands-on grilling experience cited as much as the food itself as the reason to visit.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
    hiddenGems: [
`Still need your input here — restaurant and hidden-gem picks pending your photo/story review`
    ],
    foodPhotos: [],
    hiddenGems: [
`The Chureito Pagoda viewpoint near Fujiyoshida for the classic pagoda-and-mountain photo`,
`The north shore of Lake Kawaguchiko tends to be quieter than the main tourist strip`
    ],
    travelTips: [
`Fuji is famously shy — check forecasts and go early for the best chance of clear skies`,
`Check the weather for Jun – Sep before locking in dates`
    ],
        gallery: ["assets/uploads/fuji-hero.jpg", "assets/uploads/fuji-card.jpg", "assets/uploads/fuji-g1.jpg", "assets/uploads/fuji-g2.jpg", "assets/uploads/fuji-g3.jpg", "assets/uploads/fuji-g4.jpg", "assets/uploads/fuji-g5.jpg", "assets/uploads/fuji-g6.jpg"],
    rating: 9,
    wouldReturn: `Yes — worth a second try if the mountain hid behind clouds the first time.`,
    relatedAdventure: "japan-2019"
  },
  {
    slug: "athens-2022",
    name: `Athens`,
    country: `Greece`,
    year: 2022,
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
      { name: `To Ouzeri tou Laki`, location: `Athens`, rating: 4.5, review: `This restaurant in Athens is famous for its ouzo, a Greek liquor, and meze, small plates of traditional Greek dishes like tzatziki, saganaki, and dolmades.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g13.jpg?w=900", communityReview: "A classic Athens ouzeri praised by reviewers for its lively, authentic meze spread and generous ouzo pours — a favorite for a long, unhurried Greek meal rather than a quick bite." , communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2022,
    tag: `Greece 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g17.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g19.jpg?w=900",
    coords: { top: "29.56%", left: "57.19%" },
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
      { name: "Selene", location: "Santorini", rating: 4.5, review: "This upscale restaurant in Santorini is known for its gourmet Greek cuisine made with locally sourced ingredients. Try their Santorinian fava, lobster pasta, and smoked pork with eggplant puree.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g20.jpg?w=900", communityReview: "A destination restaurant set in a converted 18th-century monastery, led by a Michelin-starred chef — reviewers consistently call it one of the best meals on the island, though several flag steep pricing and a slow-paced, hours-long tasting menu.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2022,
    tag: `Greece 2022 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g23.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g21.jpg?w=900",
    coords: { top: "29.15%", left: "57.0%" },
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
      { name: "Nikolas Taverna", location: "Mykonos", rating: 4.3, review: "This traditional Greek taverna is known for its delicious grilled octopus, freshly caught seafood, and homemade desserts.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g16.jpg?w=900", communityReview: "A long-running, unpretentious taverna in Mykonos Town — reviewers consistently praise the grilled octopus and fresh seafood as some of the best on the island, with an authentic, low-key atmosphere compared to the island's flashier spots.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2020,
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
      { name: "Depot Eatery & Oyster Bar", location: "Auckland", rating: 4.3, review: "This Auckland restaurant is famous for its fresh New Zealand seafood, particularly the oysters.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz12.jpg?w=900", communityReview: "Chef Al Brown's laid-back oyster bar is regularly called one of Auckland's best — reviewers rave about the fresh oysters and lively atmosphere, though it's a no-reservations spot so expect a wait during peak hours.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "The Grove", location: "Auckland", rating: 4.5, review: "A fine-dining restaurant in Auckland known for its innovative dishes using locally sourced ingredients.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz25.jpg?w=900", communityReview: "A longtime Auckland fine-dining favorite, often booked for anniversaries and celebrations — reviewers consistently praise the outstanding service and thoughtful touches, with the tasting menu earning particular praise.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2020,
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
      { name: "Fergburger", location: "Queenstown", rating: 4.6, review: "A burger joint in Queenstown that is famous for its delicious, oversized burgers and long lines.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz11.jpg?w=900", communityReview: "A Queenstown institution and a rite of passage — reviewers say it's genuinely worth the notoriously long queue (the lamb with blue cheese is the top recommendation), with efficient staff keeping the line moving faster than it looks.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    year: 2020,
    tag: `New Zealand 2020 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz14.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz29.jpg?w=900",
    coords: { top: "73.0%", left: "98.58%" },
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
      { name: `Wellington Chocolate Factory`, location: `Wellington`, rating: 4.3, review: `A chocolate factory in Wellington that also operates a café offering a variety of chocolate treats.`, img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz14.jpg?w=900", communityReview: "A bean-to-bar chocolate maker with an attached café — reviewers enjoy the factory tour and tasting flights, calling it a fun, kid-friendly stop that's more experience than sit-down meal.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Ortega Fish Shack", location: "Wellington", rating: 4.7, review: "A seafood restaurant in Wellington that offers a variety of dishes made from fresh, local seafood.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz22.jpg?w=900", communityReview: "Widely called one of Wellington's best restaurants — reviewers consistently praise the fresh seafood and warm service, with several naming it the best meal of their entire New Zealand trip. It's tiny, so book ahead.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    slug: "taupo-2020",
    name: `Taupo`,
    country: `New Zealand`,
    year: 2020,
    tag: `New Zealand 2020 Stop`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz24.jpg?w=1600",
    cardImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz9.jpg?w=900",
    coords: { top: "73.8%", left: "97.5%" },
    quickFacts: [
      { label: "Best time to go", value: "Dec – Feb" },
      { label: "Currency", value: "NZ Dollar" },
      { label: "Language", value: "English" },
      { label: "Kid-chaos level", value: "Low" }
    ],
    whyVisit: "Taupo centers on New Zealand's largest lake — a volcanic crater filled with impossibly blue water — with some of the country's best geothermal activity, waterfalls, and adrenaline stops within a short drive.",
    thingsToDo: [
      "See Huka Falls",
      "Walk or swim at Lake Taupo",
      "Visit a geothermal park (Craters of the Moon or Wai-O-Tapu)",
      "Bungee jump or skydive over the lake",
      "Soak in a natural hot spring"
    ],
    restaurants: [],
    foodPhotos: [],
    hiddenGems: [
      "The short walk to the base of Huka Falls, away from the main lookout crowds",
      "Sunrise over the lake before the day-trip buses arrive",
      "A quiet geothermal pool away from the main tourist parks"
    ],
    travelTips: [
      "Huka Falls and the geothermal parks are best done as a single day loop",
      "Book adrenaline activities (bungee, skydiving) ahead in peak season",
      "Check the weather for Dec – Feb before locking in dates"
    ],
    gallery: ["https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz24.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz9.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz21.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz28.jpg?w=1000", "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz6.jpg?w=1000"],
    rating: 9,
    wouldReturn: "Yes — the lake alone is worth a return trip.",
    relatedAdventure: "new-zealand-2020"
  },
  {
    slug: "paris-2017",
    name: `Paris`,
    country: `France`,
    year: 2017,
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
      { name: "Le Jules Verne", location: "Paris", rating: 4.3, review: "Located on the Eiffel Tower, this Michelin-starred restaurant offers incredible views of Paris while enjoying French cuisine.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=900", communityReview: "A two-Michelin-starred restaurant on the Eiffel Tower's second floor — reviewers consistently call the view unforgettable and the private elevator a fun touch, though several note the food can be inconsistent relative to the steep, view-driven price tag.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Le Comptoir du Relais", location: "Paris", rating: 4.5, review: "This lively bistro serves classic French dishes like escargots, beef tartare, and coq au vin. It's popular with locals and tourists alike.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr4.jpg?w=900", communityReview: "A beloved Saint-Germain bistro that reviewers call quintessentially Parisian — indulgent, authentic plates and warm service, though it's famously tiny, gets crowded, and doesn't take reservations for dinner.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "Le Grand Véfour", location: "Paris", rating: 4.6, review: "This elegant restaurant has been a favorite of the city's elite since the 18th century. It serves classic French dishes in a stunning historic setting.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr5.jpg?w=900", communityReview: "One of Paris's oldest restaurants, dating to 1784, with a jaw-dropping 18th-century dining room — reviewers consistently praise the refined cooking and history (Napoleon and Victor Hugo both dined here), though a few call the prices steep relative to the food.", communitySource: "Google/Yelp/Tripadvisor" },
      { name: "L'Ambroisie", location: "Paris", rating: 4.3, review: "This three-Michelin-starred restaurant is known for its elegant and refined French cuisine, utilizing only the freshest ingredients. It's a perfect date restaurant with its romantic ambiance.", img: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/fr7.jpg?w=900", communityReview: "A three-Michelin-starred institution on Place des Vosges — opinion is genuinely split, with many calling it the best meal of their life and others (at these prices) finding the classic, unchanging menu less exciting than more inventive competitors.", communitySource: "Google/Yelp/Tripadvisor" }
    ],
    foodPhotos: [],
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
    ],
    packingTips: [
      "Pack light — laundry is cheap and fast almost everywhere in Southeast Asia, so there's no need to bring more than a few days of clothes",
      "Download the Grab app before you land — it's the regional Uber, and rides cost pennies compared to walking through the heat",
      "Use Grab (or a local equivalent) for food delivery too — a few cents to skip walking through the humidity, and it usually ends up being a nice quiet break at the hotel"
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
    intro: `A trip through Rome, Florence, Pisa, Naples, and the Amalfi Coast — Renaissance cities, a leaning tower, and a coastal road that's an experience in itself.`,
    packingTips: [
      "Placeholder — add your real packing and practical tips for Italy here"
    ]
  },
  {
    slug: "japan-2019",
    title: `Japan 2019`,
    subtitle: `Temples, trains, and far too much ramen through Tokyo, Kyoto, Osaka, and Mt. Fuji.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/j16.jpg?w=1800",
    duration: "Multi-city",
    distance: "",
    stops: ["tokyo-2019", "kyoto-2019", "osaka-2019", "mt-fuji-2019"],
    intro: `A trip through Tokyo, Kyoto, Osaka, and Mt. Fuji — temples, trains, and far too much ramen along the way.`,
    packingTips: [
      "Placeholder — add your real packing and practical tips for Japan here"
    ]
  },
  {
    slug: "greece-2022",
    title: `Greece 2022`,
    subtitle: `Island-hopping through Athens, Santorini, and Mykonos.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/g16.jpg?w=1800",
    duration: "Multi-city",
    distance: "",
    stops: ["athens-2022", "santorini-2022", "mykonos-2022"],
    intro: `A trip through Athens, Santorini, and Mykonos — island-hopping through ancient ruins and whitewashed cliffside towns.`,
    packingTips: [
      "Placeholder — add your real packing and practical tips for Greece here"
    ]
  },
  {
    slug: "new-zealand-2020",
    title: `New Zealand 2020`,
    subtitle: `Fjords, hobbits, and flat whites through Auckland, Taupo, Queenstown, and Wellington.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/05/nz12.jpg?w=1800",
    duration: "Multi-city",
    distance: "",
    stops: ["auckland-2020", "taupo-2020", "queenstown-2020", "wellington-2020"],
    intro: `A trip through Auckland, Taupo, Queenstown, and Wellington — fjords, hobbits, and flat whites across the North and South Islands.`,
    packingTips: [
      "Placeholder — add your real packing and practical tips for New Zealand here"
    ]
  },
  {
    slug: "central-america-2015",
    title: `Central America 2015`,
    subtitle: `Reef, jungle, and ruins through Belize, Roatán, and Cancún.`,
    heroImg: "https://fatboilyfe.wordpress.com/wp-content/uploads/2023/04/bz1.jpg?w=1800",
    duration: "Multi-country",
    distance: "",
    stops: ["belize-2015", "roatan-2015", "cancun-2015"],
    intro: `A trip through Belize, Roatán, and Cancún — Mayan ruins, the Mesoamerican Barrier Reef, and a stretch of turquoise coastline spanning three countries.`,
    packingTips: [
      "Placeholder — add your real packing and practical tips for Central America here"
    ]
  }
];

const MISADVENTURES = [
  {
    icon: "🛵",
    title: "The Great Motorbike Standoff",
    location: "Ho Chi Minh City, Vietnam",
    body: "No stoplights, just a constant river of scooters — our first few times trying to cross the street, we froze at the curb completely unwilling to step out into it. What locals do in seconds took us forever those first few tries."
  },
  {
    icon: "🏍️",
    title: "The Grab Driver Lottery",
    location: "Ho Chi Minh City, Vietnam",
    body: "My daughter and niece called Grab motorbikes constantly to get around the city — and somehow it became a running joke how differently their luck ran. My niece kept getting matched with the same type of driver every time: overweight, sweaty, barely-hold-on-able. My daughter's drivers were consistently fit and clean. Neither of them could explain it, and it never once evened out."
  },
  {
    icon: "🌶️",
    title: "The First-Day Spice Miscalculation",
    location: "Bangkok, Thailand",
    body: "Day one, big group, nobody could agree on where to eat, so we just walked into the heat and humidity until we hit the first place we saw — outdoor seating, no air conditioning, fans barely moving air. Nobody in our group had registered exactly how hot Thai spice levels run, so \"level 1\" turned out to be too much for most of us, and we had to order chilled or frozen drinks to cope — which melted almost as fast as they arrived in that heat. Turns out a lot of the kids couldn't handle the \"exotic\" dishes the grandparents had picked for the table either. The one saving grace was the beer — cold, refreshing, and cheap. Oh, and the flies and mosquitoes were abundant the entire meal."
  },
  {
    icon: "🥣",
    title: "The Van That Got Away",
    location: "An Giang, Vietnam",
    body: "An Giang is where we met distant relatives for the first time — grandpa wanted to show everyone his hometown and feed us the traditional foods he grew up on, bird's nest soup included. Once people heard how it's actually made, half the table quietly spat their spoonfuls into napkins when no one was looking. Meanwhile, one of our two vans ran out of gas on the way there, stranding half the family at a rest stop for hours. They missed the reunion meal entirely — but also missed the soup, eating whatever the rest stop had instead. To this day nobody's settled which van actually won: the one that made it and had to eat bird's nest soup with the family, or the one that broke down and just got regular food."
  },
  {
    icon: "☕",
    title: "The Attic Above the Sweaty Cafe",
    location: "Hanoi, Vietnam",
    body: "Egg coffee was a letdown — we'd hyped ourselves up over how strange it sounded online, paid extra for it, and it just tasted like regular coffee. Social media got us again. The real win of that stop was upstairs: a tiny staircase nobody wanted to climb except me. I went up alone and found a tiny, air-conditioned attic overlooking the whole café. While the rest of the group sat downstairs sweating in front of a fan that barely moved air, I had a cool little balcony entirely to myself."
  },
  {
    icon: "🍵",
    title: "The Tea That Wasn't for Drinking",
    location: "Hong Kong",
    body: "A few of us went out for dim sum, not realizing Hong Kong dim sum isn't the cart-rolling-through-the-restaurant kind we knew from the States — here you order at a window and they bring your plates out when ready, which made sense once we saw how small and old the place was. Small and old also meant the dishwashing wasn't exactly top-tier. One of us ordered hot tea with the meal, and when a kettle of plain hot water showed up, we assumed it was for the tea — until we noticed the tables around us using it to rinse off their own dishes before eating. They absolutely knew we were tourists."
  },
  {
    icon: "🐘",
    title: "Grandpa and the Elephants",
    location: "Koh Samui, Thailand",
    body: "We booked an elephant sanctuary visit, and grandpa — old-school about what that meant — assumed we were going to watch elephants perform tricks. He didn't realize until we arrived that the whole point of the place is rescuing elephants from exactly that kind of exploitation. He was visibly embarrassed once it clicked, and ended up moping on the sidelines instead of joining in. Meanwhile the kids got the show of their lives anyway, watching one of the elephants produce an absolutely massive pile of poop, mouths hanging open the entire time."
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
    location: "Vail, Colorado",
    body: "The trip captions tell the whole story without any help from us: \"F— the cold,\" then \"Day 3, I'm tired,\" then finally, staring at the receipts, \"What $9k gets you.\" Ski season is beautiful. Ski season is also expensive and cold, and we said so in real time."
  },
  {
    icon: "🐢",
    title: "The Kidnapper Vans and the Baby Sea Turtles",
    location: "Puerto Vallarta, Mexico",
    body: "We found a family sea turtle release online and booked it, and when we met the tour guide, only two unmarked vans showed up. After they verified us, we got in, and the vans started heading off onto unmarked trails deep into the jungle. Eventually we were asked to get out and start walking — across an empty beach that felt like the middle of nowhere, nowhere near civilization. We joked, only half-joking, that this is exactly how kidnappings and murders happen — but with twenty of us in the group, we figured we'd be fine. Turned out completely legitimate: a tiny beach camp dedicated to preserving and saving sea turtles. We got to release baby sea turtles onto the beach ourselves, and we named a couple of them Tophat and Monocle. Still have the video."
  },
  {
    icon: "🍩",
    title: "The Churro Man",
    location: "Puerto Vallarta, Mexico",
    body: "A Yelp review sent us hunting for \"the greatest churros,\" and we didn't realize until we got there that the churro guy runs a push cart — meaning he isn't in the same spot every night. We spent an evening walking the whole town asking, in our best broken Spanish, where to find \"the churro man.\" When we finally tracked him down, we ordered 25 orders on the spot, which promptly made him close up shop and turn away every other customer in line. The locals were not thrilled. The churro man, on the other hand, was thrilled. We hauled it all back to our seaside bnb, ate what we could, and passed out — only to wake up to ants crawling all over the churros we never finished. A sad way for a great night to end."
  },
  {
    icon: "💧",
    title: "The Hidden Waterfall and an Unexpected Friend",
    location: "Puerto Vallarta, Mexico",
    body: "Locals kept talking about a hidden waterfall, so we asked our driver to take us to one — not realizing it meant a long hike through a dried-up riverbed. We just kept walking and walking until I struck up a conversation with a local guy on the trail. We hit it off immediately, and he ended up hiking the rest of the way with us, pointing things out and explaining the area as we went, until we reached a secluded waterfall with cliff diving and a hidden cave. Turned out our new hiking buddy owned the largest seafood restaurant in town. We jokingly tried to set him up with our single sister — he jokingly clarified he was more interested in me, which, fair enough, Puerto Vallarta is known for exactly that, and it explained how fast we'd all become genuine friends that afternoon."
  },
  {
    icon: "✈️",
    title: "Three Strikes Before We Even Landed",
    location: "Miami, Florida",
    body: "An unannounced, last-minute bachelor party for my brother — and since I was out of PTO, I had to book separately from the rest of the guys. Mistake one: last-minute Spirit Airlines seats that didn't recline, didn't cushion, and didn't apologize for either. Mistake two: a quickly-booked BnB I figured I'd barely use anyway — until the host started throwing parties every night. Got a refund and lucked into an empty room at the actual party house when one of the guys bailed early. Mistake three, courtesy of whoever was actually running point on this thing (not the best man): the trip landed right in the middle of Pride Week. So the single guys expecting a standard bachelor-party lineup got a very different Miami than advertised. What happened the rest of the weekend stays under Bro Code — some misadventures just aren't meant for the blog."
  },
  {
    icon: "🧋",
    title: "The Best Boba in Town",
    location: "Atlanta, Georgia",
    body: "Visited for a funeral — and visiting family is its own kind of chaos even without the occasion. The food overall was a letdown, but nothing summed it up like the boba. Boba was still new to Atlanta at the time, and locals swore by one spot as the best in town. We waited an hour for it. What arrived was uncooked, unsweetened, and — having owned a cafe and made boba drinks myself — I'm not convinced it was made for human consumption. Might've been snobbery. Might've just been bad boba. On the way out of town, we got pulled over at a random sobriety checkpoint, a new experience entirely — didn't realize Georgia still legally did those."
  },
  {
    icon: "🕰️",
    title: "You Can't Go Home Again",
    location: "Atlanta, Georgia",
    body: "Grew up here, so revisiting as an adult came with its own quiet letdown — the places that meant something as a kid either don't exist anymore or don't look anything like memory insists they should. Haven't been back since. Maybe it's easier to leave childhood exactly where it lives in your head than risk finding out what else has changed."
  },
  {
    icon: "☕",
    title: "The Coffee De-Icer",
    location: "Steamboat Springs, Colorado",
    body: "First family ski trip — my wife's sister, being frugal, rented a 9-passenger SUV for the 12-hour drive up an ice-covered mountain, scheduled for the worst possible week to attempt it: between Christmas and New Year's. Texas rental cars are not built for Colorado winter — no snow tires, no chains, and critically, no all-weather washer fluid. Trying to clear mud off the windshield just left it frozen solid and filthier. In a panic, I opened the sunroof, grabbed someone's hot coffee, and poured it straight onto the windshield. It worked. First chance I got, I bought an actual gallon of de-icing fluid. When the weather kept worsening, we dropped the rental and just bought plane tickets home rather than attempt that drive again."
  },
  {
    icon: "🔥",
    title: "Floor Warmers, Who Knew",
    location: "Steamboat Springs, Colorado",
    body: "Our BnB was great except for one mystery: we couldn't figure out why our feet were always freezing indoors. Texans don't grow up with floor warmers — that's not a thing where we're from. It wasn't until a local mentioned it that we went back and found the switch, sitting there the whole time, that turned on floor heating in every room."
  },
  {
    icon: "🌿",
    title: "The Friendliest Festival",
    location: "Steamboat Springs, Colorado",
    body: "Didn't realize we'd booked our trip during an annual music festival with a distinctly 420 flavor. The locals lived up to the reputation — we were offered free marijuana pretty much everywhere we went. Honestly, I think most of them were just trying to talk to my wife's sister."
  },
  {
    icon: "⛷️",
    title: "Out of Bounds",
    location: "Steamboat Springs, Colorado",
    body: "My wife's first time skiing, mid-lesson, ended with her skidding straight past the orange caution tape into out-of-bounds terrain. Luckily she landed in a shallow pit instead of anything worse. Those caution nets could stand to be a little sturdier."
  },
  {
    icon: "🧊",
    title: "The Polar Bear Challenge",
    location: "Steamboat Springs, Colorado",
    body: "Booked a hot spring to recover from sore ski days — didn't clock in advance that it was clothing-optional with co-ed changing rooms. Worked out fine, I look good naked. The real twist: the spring sat right next to a genuinely freezing pond, so naturally I had to swim through the ice water to reach the hot side. Refreshing doesn't begin to cover it."
  },
  {
    icon: "🎡",
    title: "The Not-Quite-Year-Round Boardwalk",
    location: "Galveston, Texas",
    body: "A quick overnight before boarding a cruise ship — stopped at NASA on the way in, found surprisingly great Thai food once we got there, and figured we'd close out the night at Galveston's boardwalk, Ferris wheel and all. Turns out \"year-round\" boardwalk doesn't necessarily mean everything on it runs year-round — the Ferris wheel was closed. A quiet correction to an assumption we didn't know we were making."
  },
  {
    icon: "🎰",
    title: "All Night, Every Time",
    location: "Las Vegas, Nevada",
    body: "Kids' first trip to Sin City, and the trip we found out my wife can gamble all night — and I mean all night, as in still at the tables when I woke up the next morning. Her siblings had warned me with stories I assumed were exaggerated. They were not. Turns out she parties harder than I do, which might explain why we work so well together. At least she's consistently come out a few hundred ahead every time I can remember."
  },
  {
    icon: "🏜️",
    title: "Nothing Out Here But Desert",
    location: "Las Vegas, Nevada",
    body: "Ran into friends from Texas who'd coincidentally picked the same weekend, and met up in \"Chinatown\" — using that term loosely. Also learned there's genuinely nothing in Vegas outside the Strip; it's desert, then more desert. And somehow, despite the Strip being one single road where you can only go one direction or the other, we got lost. Multiple times. Cutting through casinos didn't help. My wife's sense of direction strikes again."
  },
  {
    icon: "🐾",
    title: "First Snow, First Dogs",
    location: "Winter Park, Colorado",
    body: "First snow trip with the dogs — and first challenge was the AC dying on the drive up, which is its own special kind of bad with a wet, smelly mutt trapped in the car. Once we arrived, walking the dogs through actual snow for the first time was new for all of us, though nowhere near unbearable. Otherwise, a quiet trip — the food just wasn't good. Winter Park didn't leave much of a mark either way."
  },
  {
    icon: "📦",
    title: "The Cardboard Box Conspiracy",
    location: "Maui, Hawaii",
    body: "Rented an apartment with a strict no-cardboard-boxes policy, which confused us enough to ask why. Turns out cardboard attracts roaches, so local buildings just ban it outright — any box from groceries or deliveries has to go straight out to the recycling, no exceptions. A completely reasonable rule we'd never once had to think about before."
  },
  {
    icon: "🚗",
    title: "Maui Traffic, Thailand Rules",
    location: "Maui, Hawaii",
    body: "Rented a car and immediately regretted it — traffic here somehow operates like Thailand, minus the excuse of Thailand's actual traffic laws, which only made it slower. Genuinely gave us new appreciation for why driving works the way it does over there."
  },
  {
    icon: "🍜",
    title: "Underbooked and Overcrowded",
    location: "Maui, Hawaii",
    body: "Visited not long after COVID died down, right as tourists were flooding back — locals were split on it, and both sides of that were true: things were more crowded and more expensive, but plenty of businesses were also just glad to see life return to the local economy. We underestimated the crowds and didn't book enough ahead of time, so we ended up eating way more street food and fast food than we'd planned, just trying to find anywhere with an open table."
  },
  {
    icon: "🏈",
    title: "The Coach Prime Effect",
    location: "Boulder & Denver, Colorado",
    body: "Another school-scouting trip, and we happened to visit right as Deion Sanders took over as head coach — overnight, this quiet college town turned into a boomtown. Crowds and zero parking became the running theme everywhere we went, whatever we were actually trying to do that day."
  },
  {
    icon: "⛺",
    title: "A Different Kind of Lesson",
    location: "Boulder & Denver, Colorado",
    body: "This was also the first time our kids saw homeless tent cities up close, on our daily 25-minute walk to a cafe we'd fallen hard for. Beautiful weather every morning, genuinely great coffee — and a conversation with the kids we hadn't planned on having, but needed to."
  },
  {
    icon: "🤠",
    title: "Texas Sarcasm Doesn't Translate",
    location: "Nashville, Tennessee",
    body: "A work trip, mostly uneventful — except for how many people I apparently offended without meaning to. Turns out Texas sarcasm doesn't land the same in Nashville, and a handful of strangers took things completely at face value that were never meant to be taken seriously. No hard feelings on my end. Theirs, maybe."
  },
  {
    icon: "🔑",
    title: "The Locks That Wouldn't Cooperate",
    location: "Twin Lakes, Colorado",
    body: "A just-because trip — one last hooray with our dog, who had cancer, and pure, uninterrupted family bonding time. Anything that went sideways barely registered against everything else the trip actually was; we were too busy trying to make every moment count to care much. If there's a misadventure at all, it's the string of times we got locked out, completely defeated by the new-fangled smart door handles none of us could figure out. Everything else about that trip is just ours."
  },
  {
    icon: "📋",
    title: "The Itinerary Nobody Followed",
    location: "San Francisco, California",
    body: "I'll admit it upfront: I hate California, and everyone who knows me knows it. So for this trip I planned everything — day by day, hour by hour, backup plans included, at the family's own request. They didn't stick to a single bit of it."
  },
  {
    icon: "🩹",
    title: "Three Miles, One Scraped Knee",
    location: "San Francisco, California",
    body: "We agreed on a 1-mile loop through the redwoods. My wife had other ideas, and \"let's go up and this way\" turned into a 3-mile hike with no turning back. We were nearly at the end, completely injury-free, when my eldest fell and scraped her knee. Injury-free no more. A mile back to the car, jeans rolled up, bleeding the whole way. She's a trooper."
  },
  {
    icon: "🍽️",
    title: "Room for the Next Spot",
    location: "San Francisco, California",
    body: "The food here is genuinely great — best Chinese food we've had, easily. Which made it worse when my wife kept \"saving room for the next spot\" at every meal, leaving plates half-finished across more restaurants than I could keep track of. A lot of good food left the table uneaten in the name of what might be coming next."
  },
  {
    icon: "🚶",
    title: "The City That Goes Nowhere",
    location: "San Francisco, California",
    body: "Traffic that never made sense — jammed roads with seemingly no one actually going anywhere. A pier walk that felt endless. The whole trip distilled down to one feeling: San Francisco is a city where you see everything and somehow do nothing. People, next to people, following people, going nowhere."
  },
  {
    icon: "🏰",
    title: "One Last Disney, Just in Case",
    location: "Orlando, Florida (2023)",
    body: "A birthday trip — the girls are born a week apart, different years, and this one felt like it might be the last big Disney trip before my eldest moved out. So we went all in: dinner in the castle with the princesses, the works. A completely uneventful, perfectly executed, typical Disney day. Sometimes the whole point is that nothing goes wrong."
  },
  {
    icon: "🤷",
    title: "Misadventures Pending .... Let Me Know if You Have Any",
    location: "Gulf Shores, Alabama",
    body: "Won this trip free at the State Fair — every day was easy, sunny, and mercifully uneventful. Which is great for a vacation, less great for this section. If you were there and remember something we don't, let us know."
  },
  {
    icon: "🤷",
    title: "Misadventures Pending .... Let Me Know if You Have Any",
    location: "Hill Country, Texas",
    body: "Another free win from the State Fair, and just a genuinely relaxing day and weekend trip through Hill Country. Nothing went wrong, which almost feels suspicious in hindsight. Still waiting on a misadventure to file here."
  },
  {
    icon: "🧭",
    title: "The GPS Knows Best (She Didn't)",
    location: "Boston, Massachusetts",
    body: "On the way to tour MIT, my wife and her GPS decided they knew the way better than any of us — and since none of us had actually looked up directions ourselves, we blindly followed. A few trains and buses later, we arrived exactly where her GPS told her to go: the wrong main street, in the wrong town. Another 25 minutes and a few more trains and buses got us back to the right Boston street — 15 minutes after our tour group had already left. We got a refund, a self-guided map, and free rein of the campus, which was a mistake on MIT's part, since I'm notorious for opening restricted doors and wandering into \"closed\" rooms."
  },
  {
    icon: "🚿",
    title: "Martha's Vineyard, Unplumbed",
    location: "Martha's Vineyard, Massachusetts",
    body: "Overrated and expensive — the ferry ride alone nearly gave me an aneurysm. We landed to rain, mud, and a BnB a few miles off, saved only by the ocean breeze on the walk over. The place itself was quaint, sure — quaint for \"not pest-controlled\" and \"plumbing system stuck in another decade.\" Hot water was a coin flip, and on the rare win, the steam never let up, fogging the entire tiny house solid. An experience, if nothing else."
  },
  {
    icon: "🎭",
    title: "The Salem Sweatbox",
    location: "Salem, Massachusetts",
    body: "Booked a tour to learn about the witch trials, got an awkward wraparound theater where you had to crane your neck 360 degrees just to catch the show — which turned out to be an overgrown puppet performance, Chuck E. Cheese-tier. No ocean breeze here either: just an old, un-air-conditioned building packed wall to wall, everyone sweating through the whole thing. That was the real horror of Salem."
  },
  {
    icon: "🚗",
    title: "The Uber Driver Who Knew Too Much (Incorrectly)",
    location: "Boston, Massachusetts",
    body: "Our Uber driver spent the entire ride lecturing us on everything — confidently, at length, and almost entirely wrong. We sat there quietly plotting an escape plan and begging him internally to stop taking the scenic route. The trip wasn't a total loss, though: we lucked into a harbor-view suite upgrade in time to watch the 4th of July fireworks over Boston from our own window — nothing says America like that. What the view didn't mention was that it also came with a front-row seat to the Northeast sunrise, wide awake and blazing at 4am. Thank god for blackout curtains. We only discovered the best neighborhoods and food in town during our last week, just a few blocks from where we'd been the whole time."
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
  },
  {
    icon: "🥵",
    title: "Blindsided by the Heat",
    location: "Puerto Rico",
    body: "One of our very first trips together, and we had no idea what we were in for — we decided to wander off the ship's beaten path and trek up through town, completely unwarned about the heat. By the time we made it back to the ship we were soaked through with sweat. Rookie travelers, rookie mistake."
  },
  {
    icon: "🦜",
    title: "Living Statue at the Bird Sanctuary",
    location: "Puerto Rico",
    body: "At a bird sanctuary, birds landed all over me like I was part of the furniture. I stood there, essentially a human perch, while the rest of the group just watched it happen."
  },
  {
    icon: "🔫",
    title: "Machine Guns on the Beach",
    location: "Belize",
    body: "We had no idea how militarized parts of Belize and Honduras were until we saw men patrolling our beach with machine guns, like danger could break out at any second. It was a real wake-up call to pay more attention to where we actually were."
  },
  {
    icon: "🍗",
    title: "The $25 Two-Piece KFC",
    location: "Iceland",
    body: "Iceland taught us fast food isn't actually fast or cheap everywhere — a two-piece KFC meal ran us $25. We still bring this up."
  },
  {
    icon: "🥡",
    title: "The Worst \"Chinese Food\" We've Ever Had",
    location: "Iceland",
    body: "We found a restaurant claiming to serve Chinese food in Iceland. It did not. It was genuinely one of the worst meals of the entire trip."
  },
  {
    icon: "🪰",
    title: "The One Week a Year for Flies",
    location: "Iceland",
    body: "Locals told us the flies only swarm and mate for one week out of the entire year. We happened to book that exact week."
  },
  {
    icon: "🥚",
    title: "The Smell We Weren't Warned About",
    location: "Iceland",
    body: "Nobody told us the geothermally heated water across Iceland smells like rotten eggs. We found out everywhere, all at once."
  },
  {
    icon: "💦",
    title: "The Overcrowded Blue Lagoon",
    location: "Iceland",
    body: "After all the hype, the Blue Lagoon was a genuine letdown — so crowded it barely felt like the bucket-list moment we expected."
  },
  {
    icon: "🎒",
    title: "Carrying a Kid Through a Fault Line",
    location: "Iceland",
    body: "Walking between the tectonic plates, my youngest gave up walking about halfway through, so I ended up carrying them in a child backpack across an actual fault line in the earth."
  },
  {
    icon: "🌨️",
    title: "Lost in a Whiteout on a Snowmobile",
    location: "Iceland",
    body: "A snowmobile ride near the magnetic north pole turned into total whiteout conditions — we genuinely lost our bearings in the middle of a blizzard."
  },
  {
    icon: "😴",
    title: "The Eight-Hour Nap",
    location: "Rome",
    body: "Jet lag got the better of us on day one — \"quick nap before lunch\" turned into eight hours asleep, and we woke up having missed dinner entirely."
  },
  {
    icon: "🏃",
    title: "Sprinting Through Rome",
    location: "Rome",
    body: "We missed our tour group and ended up flat-out sprinting through downtown Rome to catch up with them at the Colosseum."
  },
  {
    icon: "🧳",
    title: "Recovering Our Lost Luggage",
    location: "Rome",
    body: "Our luggage got lost with a flight out the next morning, so I had to get a special pass to go behind the scenes of the Italian airport just to track our bags down — we had nothing else with us."
  },
  {
    icon: "🍷",
    title: "The Wine That Never Made It Back",
    location: "Rome",
    body: "When we finally recovered our luggage, two of our expensive, rare wine bottles were missing. Never did find out what happened to them."
  },
  {
    icon: "⛲",
    title: "The Secret Entrance Under the Trevi Fountain",
    location: "Rome",
    body: "We ducked down a random alley just to explore, and it turned out to be a secret entrance leading underneath the Trevi Fountain itself."
  },
  {
    icon: "🗣️",
    title: "Lost in Translation",
    location: "Japan",
    body: "Getting lost with zero shared language was its own adventure — equal parts stressful and genuinely memorable."
  },
  {
    icon: "⛰️",
    title: "The Last 15 Minutes",
    location: "Japan",
    body: "Everyone gave up on the mountain climb except me — they stopped just fifteen minutes short of the summit without realizing it. I kept going and got the whole view of Tokyo to myself while they sat on the stairs."
  },
  {
    icon: "🚶",
    title: "Wandering Off Alone",
    location: "Japan",
    body: "Bored one afternoon, I ventured off by myself and learned the obvious lesson: locals always have the best insight into a place."
  },
  {
    icon: "🤖",
    title: "The Unclaimed Prize",
    location: "Japan",
    body: "My shy daughter won at the Robot Cafe and then refused to go claim her prize because she was too embarrassed."
  },
  {
    icon: "♨️",
    title: "The Onsen Rule Nobody Mentioned",
    location: "Japan",
    body: "We showed up to an onsen not realizing clothing wasn't allowed. Lesson learned, quickly."
  },
  {
    icon: "🪑",
    title: "No Chairs at Tokyo Disney",
    location: "Japan",
    body: "We showed up to Tokyo Disney without our own folding chairs, the way every prepared local family does. We were very obviously not locals that day."
  },
  {
    icon: "🗑️",
    title: "Carrying Our Own Trash All Day",
    location: "Japan",
    body: "Japan has almost no public trash cans, so we ended up carrying our garbage around with us for hours until we got back to the hotel."
  },
  {
    icon: "🚪",
    title: "The Empty Restaurant That Wouldn't Serve Us",
    location: "Japan",
    body: "More than once we found a completely empty restaurant that still turned us away, apparently because serving foreigners was considered too difficult."
  },
  {
    icon: "🐛",
    title: "Showers With the Bugs",
    location: "Japan",
    body: "Some showers were fully outdoors, open to nature — and the bugs that came with it. The kids were not fans."
  },
  {
    icon: "🙏",
    title: "Getting It Wrong, Kindly",
    location: "Japan",
    body: "We didn't always understand the local customs and culture, but people were consistently gracious about it and met us with patience instead of frustration."
  },
  {
    icon: "🍽️",
    title: "The Horrid Bland Food",
    location: "England",
    body: "We'd heard the jokes about English food before we ever landed, and somehow the reality still managed to undersell itself. Bland doesn't begin to cover it."
  },
  {
    icon: "🥡",
    title: "The Disappointing Chinatown",
    location: "England",
    body: "We went in with real expectations for London's Chinatown and left disappointed — not the food scene we were hoping to find."
  },
  {
    icon: "👻",
    title: "The Haunted Tour We Paid to Abandon",
    location: "England",
    body: "We paid for a haunted tour through what we're pretty sure was a haunted underground tower/castle experience — the kind with actors and jump scares built in. We made it through the first few parts before the kids were too scared to go any further, so we left the tour early, money spent and unfinished, and then had to figure our way back out from wherever we'd stopped, halfway through, stranded and turned around."
  },
  {
    icon: "🚦",
    title: "Booked Too Close to the Red Light District",
    location: "Paris",
    body: "We didn't realize until we arrived that our hotel sat right at the edge of the red light district — walk the wrong direction after dark and you'd run straight into it. Between that and the near-constant smell of public urination, human and canine both, we got very selective about which route we'd take in or out of the hotel."
  },
  {
    icon: "🥂",
    title: "Drunk and In Love Under the Eiffel Tower",
    location: "Paris",
    body: "We met up with distant relatives for what we thought was just a stop by the Eiffel Tower, not realizing it was actually a full picnic-park scene — wine and champagne flowing, strangers turning into friends over great conversation. Before we knew it, my wife and I were both thoroughly drunk, happy, in love, and watching the tower light up at night surrounded by genuinely wonderful people we'd never met before that afternoon."
  },
  {
    icon: "🗼",
    title: "The Eiffel Tower Itself Was a Letdown",
    location: "Paris",
    body: "After that night in the park, the actual tower visit was almost anticlimactic — long lines, decent history, and a view that was the one part that really delivered."
  },
  {
    icon: "🏰",
    title: "Versailles, Undefeated",
    location: "Paris",
    body: "Versailles was so much bigger than we expected that we didn't come close to finishing it in a single day. We just weren't prepared for the scale of the place."
  },
  {
    icon: "🖼️",
    title: "The Louvre and the Tiny Mona Lisa",
    location: "Paris",
    body: "Same story at the Louvre — we didn't finish, and the Mona Lisa itself turned out to be far smaller in person than anyone expects."
  },
  {
    icon: "🐸",
    title: "Frog Legs Without a Warning",
    location: "Paris",
    body: "Distant family of ours owns a Thai restaurant chain, and the kids ended up eating frog legs without realizing it — I knew exactly what was on their plates and said nothing. They almost got served escargot too, but I drew the line there. Some things I wasn't willing to do to them."
  },
  {
    icon: "🚗",
    title: "Driving Stick With Uncle",
    location: "Paris",
    body: "Riding with my uncle while he drove stick through Paris traffic was its own event — a genuinely scary ride, with a disregard for traffic laws that honestly reminded me more of Thailand than France."
  },
  {
    icon: "🛍️",
    title: "The Arc de Triomphe Shopping Surprise",
    location: "Paris",
    body: "The Arc de Triomphe came with an unplanned shopping trip that hit my wallet a lot harder than expected. The kids, of course, loved every second of it."
  },
  {
    icon: "😱",
    title: "The Sleepwalking Scare",
    location: "Paris",
    body: "Best misadventure of the whole trip: near the end, the kids stayed in on a rainy night to watch a scary movie while we went out. Later that night, while they were asleep, my wife sleepwalked into their room and just stood in the corner, staring at them — exactly like something out of the movie they'd just watched. She scared them half to death. In the morning she had zero memory of it. I'm pretty sure the wine had a little something to do with it."
  },
  {
    icon: "🍫",
    title: "Melted Chocolate",
    location: "Bahamas",
    body: "The chocolate factory tour turned messy in the heat, and by the time we made it back to the bus, our chocolates hadn't survived the walk — melted before we ever got to enjoy them."
  },
  {
    icon: "🏖️",
    title: "Sand Everywhere, Forever",
    location: "Bahamas",
    body: "The private island's sand got into absolutely everything — we ended up rinsing off every ten yards just to keep moving. This trip is the reason the girls still refuse to do beach vacations."
  },
  {
    icon: "🚶",
    title: "The Long Walk Back",
    location: "Bahamas",
    body: "We misjudged the shuttle timing back from the private beach and ended up on a long, unplanned walk back to the ship instead."
  },
  {
    icon: "🐦",
    title: "Eating Outdoors With Company",
    location: "Bahamas",
    body: "The food itself was fine, but eating outdoors came with uninvited guests — bugs and birds circling the whole meal. The good food, when we found it, came at a price."
  },
  {
    icon: "🥓",
    title: "Unlimited Bacon and Fro-Yo, 24/7",
    location: "Bahamas",
    body: "This cruise is the one my youngest still talks about — not for any sight or excursion, but because the buffet had unlimited bacon and frozen yogurt, both available around the clock. A star was born."
  },
  {
    icon: "🍷",
    title: "The Wine Went Missing Again",
    location: "Greece",
    body: "Just like Italy, our wine went missing again in Greece. Apparently we just can't be trusted to keep a good bottle in our luggage across an entire trip."
  },
  {
    icon: "🚗",
    title: "The Parking Brake Incident",
    location: "Greece",
    body: "I rented a car and parked at our boutique hotel on a gravel lot, forgetting I'd left the parking brake on — I'm not used to parking brakes since Texas is flat and I never need one. I spun out, shooting gravel across every parked car around me. Here's hoping everyone had the loss damage waiver."
  },
  {
    icon: "🐴",
    title: "Donkeys, Hills, and the Myth of Driving Everywhere",
    location: "Greece",
    body: "Donkeys everywhere, and an unexpected hike up the hill we hadn't planned for — we assumed having a car meant we could drive anywhere. Turns out the car only got us in and out on the main road; nothing else fit."
  },
  {
    icon: "🍾",
    title: "Drunk on the Yacht",
    location: "Greece",
    body: "We ended up genuinely drunk on a yacht trip, having badly underestimated how well Greeks can actually handle their liquor. They were fun and friendly the whole way through, and the view of Oia made up for however rough the morning after was."
  },
  {
    icon: "🦐",
    title: "Seafood on the Wrong Side of the Island",
    location: "Greece",
    body: "We spent almost the entire trip craving seafood while stuck on the wrong side of the island, and only found the good stuff on the last day — fresh seafood on the black sands beach, finally worth the wait."
  },
  {
    icon: "🗺️",
    title: "The Parthenon Standoff",
    location: "Greece",
    body: "My wife and I argued the whole drive about how to get to the Parthenon — I'd been there several times and remembered the route from the hotel, but she insisted on trusting the GPS instead. We kept passing signs pointing the other way, and I kept saying so, and she kept saying she knew how to read a GPS. We finally arrived and looked up to see a shop called Parthenon Corner Store. I looked at her, shook my head, and said, yeah, we passed it a mile ago, exactly like I said. Hilarious in hindsight. Very frustrating in the moment."
  },
  {
    icon: "😴",
    title: "The Day We Overslept and Didn't Care",
    location: "Greece",
    body: "We overslept one day and lost half a day of adventures — but with no set itinerary for that stretch of the trip, nobody actually minded."
  },
  {
    icon: "🚙",
    title: "Wrong Side of the Road",
    location: "New Zealand",
    body: "I drove on the wrong side of the road. More than once. Gave my wife a genuine heart attack a few different times before it finally clicked."
  },
  {
    icon: "🏞️",
    title: "Better Than Iceland",
    location: "New Zealand",
    body: "This trip felt like Iceland minus the flies and the sulfur smell — the food still wasn't great, but the people and the overall vibe were fantastic. Taupo especially got me: a lake view, a quaint little downtown, affordable new housing. If I ever actually retire somewhere, that town is exactly the feeling I'm chasing."
  },
  {
    icon: "🌉",
    title: "The Sky Walk That Didn't Happen",
    location: "New Zealand",
    body: "A miscommunication in the city cost us the sky walk entirely — we just never actually got to do it."
  },
  {
    icon: "🌌",
    title: "Southern Lights, Finally",
    location: "New Zealand",
    body: "This is where I finally saw the aurora — except it turned out to be the Southern Lights instead of the Northern Lights I'd always pictured. Still counts."
  },
  {
    icon: "🗺️",
    title: "Accidentally in Cuba Town",
    location: "New Zealand",
    body: "Getting genuinely lost in the city turned out to be one of the best parts — there was always something worth seeing around the next corner. We wandered without any real plan and ended up in Cuba Street purely by accident."
  },
  {
    icon: "🎬",
    title: "Hobbiton's Movie Magic",
    location: "New Zealand",
    body: "Hobbiton itself was a bit of a letdown in person — smaller and less impressive than the movies make it look. But it made the movie magic even more impressive, knowing how much they were able to do with how little was actually there."
  }
];

const GALLERY_TAGS = ["all", ...DESTINATIONS.map(d => d.slug)];

const GALLERY = DESTINATIONS.flatMap(d =>
  d.gallery.map((entry) => {
    const src = typeof entry === "string" ? entry : entry.src;
    const label = typeof entry === "string" ? d.name : (entry.caption || d.name);
    return { src, tag: d.slug, label };
  })
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
