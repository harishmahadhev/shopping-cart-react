import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Recipe from "./Recipe";
import Filter from "./Filter";
import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { HiOutlineAdjustments } from "react-icons/hi";
import { useSpring, animated } from "react-spring";
import { Dialog, DialogContent } from "@material-ui/core";
import { Loading, varCtx } from "./loader";
export default function Home() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("indian");
  return (
    <div className="container home">
      <header>
        <h1 className="m-4">Food Recipes </h1>
      </header>

      <Search
        search={search}
        setSearch={setSearch}
        setQuery={setQuery}
        query={query}
      />
      <Content query={query} search={search} setSearch={setSearch} />
    </div>
  );
}

// {Search Functionality section}
function Search({ search, setSearch, setQuery, query }) {
  const [filter, showFilter] = useState(false);
  const animation = useSpring({
    config: {
      duration: 100
    },
    reverse: filter,
    opacity: filter ? 1 : 0
  });
  return (
    <>
      <div className="food-search-box">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button className="filter-btn" onClick={() => showFilter((on) => !on)}>
          <HiOutlineAdjustments />
        </button>
      </div>
      <animated.div style={animation}>
        <Dialog open={filter} maxWidth="md" onClose={() => showFilter(false)}>
          <DialogContent>
            <Filter setQuery={setQuery} showFilter={showFilter} query={query} />
          </DialogContent>
        </Dialog>
      </animated.div>
    </>
  );
}

// Content Section

function Content({ query, search }) {
  const [recipes, setRecipes] = useState([]);
  const { loading, setLoading } = useContext(varCtx);
  const AppId = "0bf36c54";
  const AppKey = "7811cb68bc349ca48b5468b2b0ccacbb";
  useEffect(() => {
    getReceipies();
  }, [query]);

  const getReceipies = async () => {
    await setLoading(true);
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${AppId}&app_key=${AppKey}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    await setLoading(false);
  };

  return (
    <Container>
      <h3 className="cuisine-title">Explore New Tastes</h3>
      {loading ? (
        <div className="loader">
          {" "}
          <Loading />{" "}
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4">
          {recipes
            .filter((recipe) => {
              if (search === "") {
                return recipe;
              } else if (
                recipe.recipe.label.toLowerCase().includes(search.toLowerCase())
              ) {
                return recipe;
              }
            })
            .map((recipe, index) => (
              <Recipe
                key={index}
                title={recipe.recipe.label}
                image={recipe.recipe.image}
                ingredient={recipe.recipe.ingredientLines}
                index={index}
                recipe={recipe}
                setRecipes={setRecipes}
                recipes={recipes}
              />
            ))}
        </div>
      )}
    </Container>
  );
}
