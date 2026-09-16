type ArtworkFormProps = {
  title: string;
  setTitle: (value: string) => void;
  onAdd: () => void;
};

export default function ArtworkForm({
  title,
  setTitle,
  onAdd,
}: ArtworkFormProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Unesi naziv umjetnine..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={onAdd}>Dodaj umjetninu</button>
    </div>
  );
}
