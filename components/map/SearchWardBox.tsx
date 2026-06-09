interface Props {
  searchText: string;
  setSearchText: (
    value: string,
  ) => void;

  suggestions: any[];

  onSelect: (
    feature: any,
  ) => void;
}

export default function SearchWardBox({
  searchText,
  setSearchText,
  suggestions,
  onSelect,
}: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 130,
        left: 50,
        zIndex: 9999,
        width: 320,
      }}
    >
      <input
        type="text"
        placeholder="Tìm kiếm phường..."
        value={searchText}
        onChange={(e) =>
          setSearchText(
            e.target.value,
          )
        }
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          background: '#fff',
        }}
      />

      {suggestions.length > 0 && (
        <div
          style={{
            background: '#fff',
            border: '1px solid #ccc',
            maxHeight: '250px',
            overflowY: 'auto',
          }}
        >
          {suggestions.map(
            (feature: any) => (
              <div
                key={
                  feature.properties
                    .osm_id
                }
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom:
                    '1px solid #eee',
                }}
                onClick={() =>
                  onSelect(feature)
                }
              >
                {
                  feature.properties
                    .name
                }
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}