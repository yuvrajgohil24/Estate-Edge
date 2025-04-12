import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
    const [option, setOption] = useState({
        type: "buy",
        city: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const switchType = (val) => {
        setOption((prev) => ({ ...prev, type: val }));
    };

    const handleChange = (e) => {
        setOption((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => switchType(type)}
                        className={option.type === type ? "active" : ""}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <form>
                <input type="text" name="city" placeholder="City" onChange={handleChange} />
                <input
                    type="number"
                    name="minPrice"
                    min={0}
                    max={10000000}
                    placeholder="Min Price"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={10000000}
                    placeholder="Max Price"
                    onChange={handleChange}
                />
                <Link to={`/list?type=${option.type}&city=${option.city}&minPrice=${option.minPrice}&maxPrice=${option.maxPrice}`}>
                    <button>
                        <img src="/search.png" alt="" />
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default SearchBar;