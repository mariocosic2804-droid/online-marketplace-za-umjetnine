import ArtworkCard from "./ArtworkCard";

type Artwork = {
  title: string;
  artist: string;
  price: number;
  image: string;
};

type ArtworkListProps = {
  artworks: Artwork[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onBuy: (title: string) => void;
};

export default function ArtworkList({
  artworks,
  onDelete,
  onEdit,
  onBuy,
}: ArtworkListProps) {
  return (
    <div className="gallery">
      {artworks.map((artwork, index) => (
        <ArtworkCard
          key={index}
          title={artwork.title}
          artist={artwork.artist}
          price={artwork.price}
          image={artwork.image}
          onDelete={() => onDelete(index)}
          onEdit={() => onEdit(index)}
          onBuy={() => onBuy(artwork.title)}
        />
      ))}
    </div>
  );
}
