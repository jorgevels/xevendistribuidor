import { useEffect, useRef, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import lubricantes from "../../assets/images/categories/11.png";
import multiorgasmos from "../../assets/images/categories/12.png";
import electrizante from "../../assets/images/categories/13.png";
import aceite from "../../assets/images/categories/14.png";
import energizante from "../../assets/images/categories/15.png";
import juguete from "../../assets/images/categories/16.png";
import pheromona from "../../assets/images/categories/17.png";
import anal from "../../assets/images/categories/18.png";
import welfare from "../../assets/images/categories/19.png";
import xeven from "../../assets/images/categories/20.png";
import { useSelectedCategory } from "../../context/SelectedCategoryContext";
import "./Categories.scss";

const Categories = () => {
  const categoriesData = [
    { image: xeven, title: "Todos", link: "/products" },
    { image: lubricantes, title: "Lubricantes", link: "/lubricant" },
    { image: multiorgasmos, title: "Multiorgasmos", link: "/multiorgasm" },
    { image: welfare, title: "Bienestar", link: "/welfare" },
    { image: electrizante, title: "Electrizantes", link: "/electrifying" },
    { image: aceite, title: "Aceites", link: "/oil" },
    { image: energizante, title: "Energizantes", link: "/energizing" },
    { image: juguete, title: "Juguetes", link: "/toy" },
    { image: pheromona, title: "Pheromonas", link: "/pheromonas" },
    { image: anal, title: "Anales", link: "/annals" },
  ];

  const { selectedIndex, setSelectedIndex } = useSelectedCategory();
  const categoryRefs = useRef([]);

  const handleCategoryClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const [startIndex, setStartIndex] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  /* const pageSize = 11 */
  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + pageSize < categoriesData.length ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(window.innerWidth < 768 ? 12 : 11);
    };

    handleResize(); // Call initially to set the right pageSize

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      const container = document.querySelector(".category-container");
      const selectedCategoryRef = categoryRefs.current[selectedIndex];

      if (selectedCategoryRef) {
        const containerLeft = container.getBoundingClientRect().left;
        const containerRight = container.getBoundingClientRect().right;
        const categoryLeft = selectedCategoryRef.getBoundingClientRect().left;
        const categoryRight = selectedCategoryRef.getBoundingClientRect().right;

        // Verifica si la izquierda de la categoría está fuera de la vista
        if (categoryLeft < containerLeft) {
          container.scrollLeft -= containerLeft - categoryLeft; // Desplazamiento hacia la izquierda
        }

        // Verifica si la derecha de la categoría está fuera de la vista
        if (categoryRight > containerRight) {
          container.scrollLeft += categoryRight - containerRight; // Desplazamiento hacia la derecha
        }
      }
    }
  }, [selectedIndex]);

  return (
    <section className="py-4 section-bg-categories no-pb">
      <div className="container">
        <h3>BUSCA EN NUESTRAS CATEGORIAS</h3>
        <div className="category-container">
          {startIndex > 0 && (
            <button className="prev-button" onClick={handlePrev}>
              <GrFormPrevious className="icon" />
            </button>
          )}
          <div className="category-grid">
            {categoriesData
              .slice(startIndex, startIndex + pageSize)
              .map((category, index) => (
                <div
                  key={index}
                  className={`category-item ${
                    index + startIndex === selectedIndex ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryClick(index + startIndex)}
                  ref={(el) => (categoryRefs.current[index] = el)}
                >
                  <Link to={category.link}>
                    <div className="image-container">
                      <img src={category.image} alt={category.title} />
                    </div>
                    <h3>{category.title}</h3>
                  </Link>
                  {index + startIndex === selectedIndex && (
                    <div className="selected-indicator"></div>
                  )}
                </div>
              ))}
          </div>
          {startIndex + pageSize < categoriesData.length && (
            <button className="next-button" onClick={handleNext}>
              <MdNavigateNext className="icon" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
