type ArtworkFormProps = {
  title: string;
  artist: string;
  price: string;
  onTitleChange: (value: string) => void;
  onArtistChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onImageChange: (value: string) => void;
  onAdd: () => void;
};

export default function ArtworkForm({
  title,
  artist,
  price,
  onTitleChange,
  onArtistChange,
  onPriceChange,
  onImageChange,
  onAdd,
}: ArtworkFormProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Odaberite ispravnu slikovnu datoteku.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const uploadedImage = new Image();

      uploadedImage.onload = () => {
        const maximumWidth = 900;
        const scale =
          uploadedImage.width > maximumWidth
            ? maximumWidth / uploadedImage.width
            : 1;

        const canvas = document.createElement("canvas");

        canvas.width = Math.round(uploadedImage.width * scale);

        canvas.height = Math.round(uploadedImage.height * scale);

        const context = canvas.getContext("2d");

        if (!context) {
          alert("Slika se nije mogla obraditi.");
          return;
        }

        context.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.7);

        onImageChange(compressedImage);
      };

      uploadedImage.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="add-form">
      <h2>Dodaj umjetninu</h2>

      <input
        type="text"
        placeholder="Naziv umjetnine"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
      />

      <input
        type="text"
        placeholder="Autor"
        value={artist}
        onChange={(event) => onArtistChange(event.target.value)}
      />

      <input
        type="number"
        placeholder="Cijena"
        value={price}
        onChange={(event) => onPriceChange(event.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button type="button" onClick={onAdd}>
        Dodaj umjetninu
      </button>
    </section>
  );
}
