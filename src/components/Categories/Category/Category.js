import "./Category.scss";

const Category = ({ title, image }) => {
  return (
    <div className="category">
      <img src={image} alt="category" className="category__image" />

      <h3>{title}</h3>
    </div>
  );
};

export default Category;
