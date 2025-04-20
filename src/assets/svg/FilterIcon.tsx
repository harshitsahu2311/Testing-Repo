const FilterIcon = ({ color = "black" }: { color: string }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.2497 13.61C14.2697 16.2 17.9997 21 17.9997 21V27C17.9997 27.55 18.4497 28 18.9997 28H20.9997C21.5497 28 21.9997 27.55 21.9997 27V21C21.9997 21 25.7197 16.2 27.7397 13.61C28.2497 12.95 27.7797 12 26.9497 12H13.0397C12.2097 12 11.7397 12.95 12.2497 13.61Z"
        fill={color}
        fill-opacity="0.56"
      />
    </svg>
  );
};

export default FilterIcon;
