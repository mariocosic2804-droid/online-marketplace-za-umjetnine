import "./styles.css";
import Navbar from "./Navbar";
import ArtworkCard from "./ArtworkCard";
import { useEffect, useState } from "react";

type Artwork = {
  title: string;
  artist: string;
  price: number;
  image: string;
};

const initialArtworks: Artwork[] = [
  {
    title: "Sunset Dreams",
    artist: "John Stones",
    price: 250,
    image: "/art1.jpg",
  },
  {
    title: "Abstract Flow",
    artist: "Ana Marić",
    price: 450,
    image: "/art2.jpg",
  },
  {
    title: "Ocean Light",
    artist: "Marko Kovač",
    price: 600,
    image: "/art3.jpg",
  },
  {
    title: "Flower Pot",
    artist: "Marko Ćosić",
    price: 600,
    image: "/art4.jpg",
  },
  {
    title: "Obsession",
    artist: "Marcos Torres",
    price: 350,
    image: "/art5.jpg",
  },
  {
    title: "Elegant Cat",
    artist: "Margaret Thatcher",
    price: 450,
    image: "/art6.jpg",
  },
  {
    title: "Rusty Old Dusty",
    artist: "Christian Damomn",
    price: 300,
    image: "/art7.jpg",
  },
  {
    title: "Glorious Church",
    artist: "Sebastian Terry",
    price: 500,
    image: "/art8.jpg",
  },
  {
    title: "New York City",
    artist: "Marko Polo",
    price: 800,
    image: "/art9.jpg",
  },
  {
    title: "Golden Boys",
    artist: "Hansi Flick",
    price: 900,
    image: "/art10.jpg",
  },
  {
    title: "Waterfall Creek",
    artist: "Zdravko Perić",
    price: 600,
    image: "/art11.jpg",
  },
  {
    title: "Planet Earth",
    artist: "Tony Parker",
    price: 500,
    image: "/art12.jpg",
  },
];

export default function App() {
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const savedArtworks = localStorage.getItem("artworks");

    if (savedArtworks) {
      try {
        return JSON.parse(savedArtworks);
      } catch {
        return initialArtworks;
      }
    }

    return initialArtworks;
  });

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("artworks", JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    if (selectedArtwork) {
      setMessage(`Zanima me umjetnina: ${selectedArtwork}`);
    }
  }, [selectedArtwork]);

  const filteredArtworks = artworks.filter((artwork) =>
    artwork.title.toLowerCase().includes(search.toLowerCase())
  );

  const addArtwork = () => {
    if (!title.trim() || !artist.trim() || !price) {
      alert("Popuni naziv, autora i cijenu.");
      return;
    }

    if (Number(price) <= 0) {
      alert("Cijena mora biti veća od 0.");
      return;
    }

    const newArtwork: Artwork = {
      title: title.trim(),
      artist: artist.trim(),
      price: Number(price),
      image: image || "/art1.jpg",
    };

    setArtworks((previousArtworks) => [...previousArtworks, newArtwork]);

    setTitle("");
    setArtist("");
    setPrice("");
    setImage("");
  };

  const deleteArtwork = (artworkToDelete: Artwork) => {
    const confirmed = window.confirm(
      `Želite li obrisati umjetninu "${artworkToDelete.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setArtworks((previousArtworks) =>
      previousArtworks.filter((artwork) => artwork !== artworkToDelete)
    );

    if (selectedArtwork === artworkToDelete.title) {
      setSelectedArtwork("");
      setMessage("");
    }
  };

  const editArtwork = (artworkToEdit: Artwork) => {
    const newTitle = prompt("Novi naziv:", artworkToEdit.title);

    if (!newTitle?.trim()) {
      return;
    }

    const newArtist = prompt("Novi autor:", artworkToEdit.artist);

    if (!newArtist?.trim()) {
      return;
    }

    const newPrice = prompt("Nova cijena:", artworkToEdit.price.toString());

    if (!newPrice || Number(newPrice) <= 0) {
      alert("Cijena mora biti veća od 0.");
      return;
    }

    setArtworks((previousArtworks) =>
      previousArtworks.map((artwork) =>
        artwork === artworkToEdit
          ? {
              ...artwork,
              title: newTitle.trim(),
              artist: newArtist.trim(),
              price: Number(newPrice),
            }
          : artwork
      )
    );

    if (selectedArtwork === artworkToEdit.title) {
      setSelectedArtwork(newTitle.trim());
    }
  };

  const buyArtwork = (artworkTitle: string) => {
    setSelectedArtwork(artworkTitle);

    setTimeout(() => {
      document.getElementById("upit-forma")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const sendInquiry = () => {
    if (!selectedArtwork) {
      alert("Prvo odaberite umjetninu klikom na gumb Kupi.");
      return;
    }

    if (!customerName.trim() || !customerEmail.trim()) {
      alert("Unesite ime i email adresu.");
      return;
    }

    if (!customerEmail.includes("@")) {
      alert("Unesite ispravnu email adresu.");
      return;
    }

    if (!message.trim()) {
      alert("Unesite poruku.");
      return;
    }

    alert(`Upit za umjetninu "${selectedArtwork}" uspješno je poslan!`);

    setSelectedArtwork("");
    setCustomerName("");
    setCustomerEmail("");
    setMessage("");
  };

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      <main>
        <h1>🎨 Online Marketplace za Umjetnine</h1>

        <p className="subtitle">
          Otkrij, dodaj i upravljaj umjetničkim djelima.
        </p>

        <section>
          <input
            type="text"
            placeholder="Pretraži umjetninu..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>

        <section className="add-form">
          <h2>Dodaj umjetninu</h2>

          <input
            type="text"
            placeholder="Naziv umjetnine"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            type="text"
            placeholder="Autor"
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
          />

          <input
            type="number"
            placeholder="Cijena"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (!file) {
                return;
              }

              const reader = new FileReader();

              reader.onloadend = () => {
                setImage(reader.result as string);
              };

              reader.readAsDataURL(file);
            }}
          />

          <button type="button" onClick={addArtwork}>
            Dodaj umjetninu
          </button>
        </section>

        <section>
          {filteredArtworks.length === 0 ? (
            <p>Nema pronađenih umjetnina.</p>
          ) : (
            <div className="gallery">
              {filteredArtworks.map((artwork, index) => (
                <ArtworkCard
                  key={`${artwork.title}-${index}`}
                  title={artwork.title}
                  artist={artwork.artist}
                  price={artwork.price}
                  image={artwork.image}
                  onDelete={() => deleteArtwork(artwork)}
                  onEdit={() => editArtwork(artwork)}
                  onBuy={() => buyArtwork(artwork.title)}
                />
              ))}
            </div>
          )}
        </section>

        <section id="upit-forma" className="inquiry-section">
          <h2>Pošalji upit za umjetninu</h2>

          {selectedArtwork ? (
            <>
              <p>
                Odabrana umjetnina: <strong>{selectedArtwork}</strong>
              </p>

              <input
                type="text"
                placeholder="Ime i prezime"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />

              <input
                type="email"
                placeholder="Email adresa"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
              />

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                placeholder="Napišite poruku..."
              />

              <button type="button" onClick={sendInquiry}>
                Pošalji upit
              </button>
            </>
          ) : (
            <p>Kliknite na gumb Kupi uz željenu umjetninu.</p>
          )}
        </section>
      </main>

      <footer>
        <p>Online Marketplace za Umjetnine © 2026</p>
      </footer>
    </div>
  );
}
