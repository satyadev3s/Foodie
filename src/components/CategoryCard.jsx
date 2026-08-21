function CategoryCard({ category, image, onClick }) {
  return (
    <button className="category-card" onClick={onClick}>
      <img src={image} alt={category} />
      <span>{category}</span>
    </button>
  );
}

export default CategoryCard;
