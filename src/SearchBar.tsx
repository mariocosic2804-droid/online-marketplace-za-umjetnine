type SearchBarProps = {
  title: string;
  setTitle: (value: string) => void;
};

export default function SearchBar({ title, setTitle }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Pretraži umjetninu..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
