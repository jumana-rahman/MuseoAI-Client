export type Guide = {
  id: string;
  title: string;
  museumId: string;
  museumName: string;
  museumCountry: string;
  targetAudience: string;
  visitDuration: string;
  shortDescription: string;
  guideContent: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
};

export const GUIDES: Guide[] = [
  {
    id: "g1",
    title: "A Perfect Half-Day at the Louvre: Renaissance Masterpieces",
    museumId: "louvre",
    museumName: "The Louvre Museum",
    museumCountry: "France",
    targetAudience: "Art Lovers",
    visitDuration: "4 hours",
    shortDescription: "Skip the crowds and see the greatest Renaissance works in a focused, curated route through the Denon Wing.",
    guideContent: "Start at 9:00 AM sharp when the museum opens. Head directly to the Denon Wing on the ground floor for ancient sculptures including the Venus de Milo. Then ascend to the first floor for the Grand Galerie where Italian painting masterpieces line the walls. End with the Mona Lisa room — arrive before 11 AM for the best viewing experience.",
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&h=400&fit=crop&auto=format",
    authorId: "u2",
    authorName: "Isabelle Martin",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
    createdAt: "2025-10-15",
    likes: 234,
  },
  {
    id: "g2",
    title: "Egyptian Museum with Kids: Mummies & Mysteries",
    museumId: "egyptian-museum",
    museumName: "Egyptian Museum of Cairo",
    museumCountry: "Egypt",
    targetAudience: "Families",
    visitDuration: "3 hours",
    shortDescription: "Make ancient Egypt come alive for children with this family-friendly route through Cairo's greatest museum.",
    guideContent: "Begin at the ground floor Atrium where the massive royal statues will immediately impress young visitors. Move to the animal mummies room — always a child favorite. The Tutankhamun gallery on the upper floor is the dramatic finale with the golden mask and royal treasures.",
    coverImage: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&h=400&fit=crop&auto=format",
    authorId: "u3",
    authorName: "Ahmed Al-Rashid",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format",
    createdAt: "2025-11-02",
    likes: 187,
  },
  {
    id: "g3",
    title: "Tokyo National Museum: A Samurai's Journey",
    museumId: "tokyo-national",
    museumName: "Tokyo National Museum",
    museumCountry: "Japan",
    targetAudience: "Tourists",
    visitDuration: "5 hours",
    shortDescription: "Trace Japan's martial heritage from ancient armor to the elegance of the tea ceremony in this immersive day guide.",
    guideContent: "Start with the Honkan (Japanese Gallery) Building for its sweeping survey of Japanese art history. The samurai armor and swords collection on the second floor is extraordinary. After lunch at the museum café, explore the Heiseikan Archaeological Museum for Jomon period artifacts.",
    coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop&auto=format",
    authorId: "u4",
    authorName: "Yuki Nakamura",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format",
    createdAt: "2025-09-28",
    likes: 312,
  },
  {
    id: "g4",
    title: "Metropolitan Museum: Ancient Egypt to Modern Art",
    museumId: "metropolitan",
    museumName: "The Metropolitan Museum of Art",
    museumCountry: "USA",
    targetAudience: "Students",
    visitDuration: "6 hours",
    shortDescription: "A student's guide to spanning 5,000 years of art history in a single extraordinary day at the Met.",
    guideContent: "Begin with the Egyptian Wing and the Temple of Dendur — free-standing inside a glass room, it is awe-inspiring. Move through Greek and Roman art before heading to the European Paintings galleries. Finish on the roof garden for contemporary art with Manhattan skyline views (seasonal).",
    coverImage: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop&auto=format",
    authorId: "u5",
    authorName: "Marcus Thompson",
    authorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&h=60&fit=crop&auto=format",
    createdAt: "2025-12-03",
    likes: 156,
  },
  {
    id: "g5",
    title: "Uffizi Gallery: Botticelli & the Birth of Beauty",
    museumId: "uffizi",
    museumName: "Uffizi Gallery",
    museumCountry: "Italy",
    targetAudience: "Art Lovers",
    visitDuration: "4 hours",
    shortDescription: "An art lover's essential guide to the greatest concentration of Renaissance masterpieces in a single building.",
    guideContent: "Pre-book your 8:15 AM entry. The Botticelli rooms (rooms 10-14) should be your first stop when the museum opens and before tour groups arrive. The Birth of Venus and Primavera need time to absorb properly — allow 30 minutes here. Continue to the Michelangelo and da Vinci rooms before taking a break at the rooftop terrace café.",
    coverImage: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=400&fit=crop&auto=format",
    authorId: "u2",
    authorName: "Isabelle Martin",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
    createdAt: "2025-10-28",
    likes: 289,
  },
  {
    id: "g6",
    title: "British Museum in 3 Hours: The Greatest Hits",
    museumId: "british-museum",
    museumName: "The British Museum",
    museumCountry: "United Kingdom",
    targetAudience: "Tourists",
    visitDuration: "3 hours",
    shortDescription: "Short on time? This efficient route takes you through the British Museum's most extraordinary artifacts in under three hours.",
    guideContent: "Enter through the Great Court and immediately head to Room 4 for the Rosetta Stone. Then Egyptian Rooms (61-66) for mummies and coffins. The Elgin Marbles in Room 18 are essential. Finish with the Sutton Hoo helmet in Room 41 — one of the most beautiful objects in the museum.",
    coverImage: "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=600&h=400&fit=crop&auto=format",
    authorId: "u6",
    authorName: "Charlotte Davies",
    authorAvatar: "https://images.unsplash.com/photo-1580673845328-ee53ac43b8b2?w=60&h=60&fit=crop&auto=format",
    createdAt: "2025-11-15",
    likes: 201,
  },
];

export const REVIEWS = [
  {
    id: "r1",
    museumId: "louvre",
    userId: "u7",
    userName: "Pierre Dubois",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format",
    rating: 5,
    review: "The Louvre is an experience like no other. Even for a Parisian, returning every year reveals something new. The night openings on Wednesdays and Fridays are magical with far fewer visitors.",
    createdAt: "2025-12-10",
  },
  {
    id: "r2",
    museumId: "louvre",
    userId: "u8",
    userName: "Emma Williams",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
    rating: 4,
    review: "Absolutely magnificent collection but overwhelming in scale. Definitely pre-book and prioritize. The glass pyramid entrance is beautiful. Bring comfortable shoes!",
    createdAt: "2025-11-22",
  },
];
