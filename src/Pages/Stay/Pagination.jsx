function Pagination({
  current,
  onChange,
  total
}) {
  if (!total || total <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: total },
    (_, index) => index + 1
  );

  return (
    <div data-testid="page-container">
      {pages.map((page) => (
        <button
          id="pagination"
          key={page}
          style={{
            margin: "0.5rem",
            padding: "0.5rem",
            backgroundColor:
              current === page
                ? "green"
                : "teal",
            color: "white",
            borderRadius: "5px"
          }}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;