type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <section className="search-section">
      <input
        type="text"
        placeholder="Pretraži umjetninu..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </section>
  );
}
