interface MusicArtist extends CardItem {
  genre:string
}

export const mockArtists: MusicArtist[] = [
  // Pop
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    genre: "Pop",
    photo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
  },
  {
    id: "dua-lipa",
    name: "Dua Lipa",
    genre: "Pop",
    photo: "https://images.unsplash.com/photo-1682534434080-404a5edda2f3",
  },
  {
    id: "harry-styles",
    name: "Harry Styles",
    genre: "Pop",
    photo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  },

  // Rock / Indie
  {
    id: "arctic-monkeys",
    name: "Arctic Monkeys",
    genre: "Rock",
    photo: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
  },
  {
    id: "the-1975",
    name: "The 1975",
    genre: "Indie",
    photo: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: "tame-impala",
    name: "Tame Impala",
    genre: "Indie",
    photo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  },
  {
    id: "radiohead",
    name: "Radiohead",
    genre: "Rock",
    photo: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },

  // Metal
  {
    id: "metallica",
    name: "Metallica",
    genre: "Metal",
    photo: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
  },

  // Hip-Hop / Rap
  {
    id: "kendrick-lamar",
    name: "Kendrick Lamar",
    genre: "Hip-Hop",
    photo: "https://images.unsplash.com/photo-1682534434080-404a5edda2f3",
  },
  {
    id: "drake",
    name: "Drake",
    genre: "Hip-Hop",
    photo: "https://images.unsplash.com/photo-1604514628550-37477afdf4e3",
  },
  {
    id: "tyler-the-creator",
    name: "Tyler, the Creator",
    genre: "Rap",
    photo: "https://images.unsplash.com/photo-1509973385458-f9609c21b528",
  },
  {
    id: "kanye-west",
    name: "Kanye West",
    genre: "Rap",
    photo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  },

  // R&B / Soul
  {
    id: "the-weeknd",
    name: "The Weeknd",
    genre: "R&B",
    photo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
  },
  {
    id: "frank-ocean",
    name: "Frank Ocean",
    genre: "R&B",
    photo: "https://images.unsplash.com/photo-1598387993441-a364f854cffd",
  },
  {
    id: "sza",
    name: "SZA",
    genre: "R&B",
    photo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
  },
  {
    id: "beyonce",
    name: "Beyoncé",
    genre: "R&B",
    photo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  },

  // Eletrônica / House / Lo-Fi
  {
    id: "daft-punk",
    name: "Daft Punk",
    genre: "Eletrônica",
    photo: "https://images.unsplash.com/photo-1633677290061-e1c7d9ae8538",
  },
  {
    id: "disclosure",
    name: "Disclosure",
    genre: "House",
    photo: "https://images.unsplash.com/photo-1619229665486-19f7ee2987a5",
  },
  {
    id: "nujabes",
    name: "Nujabes",
    genre: "Lo-Fi",
    photo: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
  },

  // Jazz / Blues / Clássica
  {
    id: "miles-davis",
    name: "Miles Davis",
    genre: "Jazz",
    photo: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
  },
  {
    id: "norah-jones",
    name: "Norah Jones",
    genre: "Jazz",
    photo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  },
  {
    id: "bb-king",
    name: "B.B. King",
    genre: "Blues",
    photo: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
  },

  // MPB
  {
    id: "caetano-veloso",
    name: "Caetano Veloso",
    genre: "MPB",
    photo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  },
  {
    id: "gilberto-gil",
    name: "Gilberto Gil",
    genre: "MPB",
    photo: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
  {
    id: "ana-frango-eletrico",
    name: "Ana Frango Elétrico",
    genre: "MPB",
    photo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
  },

  // Sertanejo
  {
    id: "ana-castela",
    name: "Ana Castela",
    genre: "Sertanejo",
    photo: "https://images.unsplash.com/photo-1598387993441-a364f854cffd",
  },
  {
    id: "gusttavo-lima",
    name: "Gusttavo Lima",
    genre: "Sertanejo",
    photo: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },

  // Pagode / Samba
  {
    id: "thiaguinho",
    name: "Thiaguinho",
    genre: "Pagode",
    photo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  },
  {
    id: "martinho-da-vila",
    name: "Martinho da Vila",
    genre: "Samba",
    photo: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
  },

  // Funk
  {
    id: "mc-hariel",
    name: "MC Hariel",
    genre: "Funk",
    photo: "https://images.unsplash.com/photo-1775117419764-177be61d070c",
  },
  {
    id: "ludmilla",
    name: "Ludmilla",
    genre: "Funk",
    photo: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
  },

  // K-Pop
  {
    id: "bts",
    name: "BTS",
    genre: "K-Pop",
    photo: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: "blackpink",
    name: "BLACKPINK",
    genre: "K-Pop",
    photo: "https://images.unsplash.com/photo-1598387993441-a364f854cffd",
  },

  // Reggae
  {
    id: "bob-marley",
    name: "Bob Marley",
    genre: "Reggae",
    photo: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
  },
];