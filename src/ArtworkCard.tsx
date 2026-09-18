import React from "react";

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
  const openImage = () => {
    window.open(image, "_blank", "noopener,noreferrer");
  };

  const artworkImage = React.createElement("img", {
    src: image,
    alt: title,
    className: "clickable-image",
    onClick: openImage,
  });

  return (
    <article className="card">
      {artworkImage}

      <h3>{title}</h3>

      <p>Autor: {artist}</p>

      <p>Cijena: {price} €</p>

      <div className="card-buttons">
        <button type="button" onClick={onDelete}>
          Obriši
        </button>

        <button type="button" onClick={onBuy}>
          Kupi
        </button>

        <button type="button" onClick={onEdit}>
          Uredi
        </button>
      </div>
    </article>
  );
}
