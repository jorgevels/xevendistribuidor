import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearch } from "../../context/SearchContext"; // usa el contexto
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import { Box, Box_texto, Container, Input, Texto } from "./styles";

const Search = ({ products = [] }) => {
  const { loading } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");
  const { inputRef } = useSearch(); // obtener el ref compartido

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      `${product.name} ${product.title} ${product.id}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [products, query]);

  const onChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [inputRef]);

  return (
    <Container>
      <Box>
        <div className="row">
          <div className="col-12">
            <div className="input-group mb-3">
              <Input
                type="search"
                className="form-control"
                placeholder="Buscar un producto..."
                onChange={onChange}
                ref={inputRef} // ref conectado
              />
            </div>
          </div>
        </div>
      </Box>

      {loading ? (
        <Loading />
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <Box_texto>
              <Texto>Busqueda sin resultados, intenta con otro artículo</Texto>
            </Box_texto>
          ) : (
            <section className="py-5">
              <div className="container">
                <div className="row">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="col-6 col-md-4 mx-auto mb-4 mb-md-0"
                    >
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
