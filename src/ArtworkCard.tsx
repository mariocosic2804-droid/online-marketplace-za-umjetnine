type ArtworkProps = {
  title: string;
  artist: string;
  price: number;
  image: string;
  onDelete: () => void;
  onEdit: () => void;
  onBuy: () => void;
};

export default function ArtworkCard({
  title,
  artist,
  price,
  image,
  onDelete,
  onEdit,
  onBuy,
}: ArtworkProps) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>

      <p>Autor: {artist}</p>

      <p>Cijena: {price} €</p>

      <button onClick={onDelete}>Obriši</button>

      <button onClick={onBuy}>Kupi</button>

      <button onClick={onEdit}>Uredi</button>
    </div>
  );
}
