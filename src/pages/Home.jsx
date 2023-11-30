import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBeers,
  setPage,
  setBrewedBefore,
  setBrewedAfter,
} from "../app/slices/beerSlice";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
  const beers = useSelector((state) => state.beers.data);
  const page = useSelector((state) => state.beers.page);
  const brewedBefore = useSelector((state) => state.beers.brewedBefore);
  const brewedAfter = useSelector((state) => state.beers.brewedAfter);
  const dispatch = useDispatch();

  const [beforeDate, setBeforeDate] = useState("");
  const [afterDate, setAfterDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${page}&per_page=10${
            brewedBefore ? `&brewed_before=${brewedBefore}` : ""
          }${brewedAfter ? `&brewed_after=${brewedAfter}` : ""}`
        );
        dispatch(setBeers(response.data));
      } catch (error) {
        console.error("Error fetching beer data:", error);
      }
    };

    fetchData();
  }, [page, brewedBefore, brewedAfter, dispatch]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [brewedBefore, brewedAfter]);

  const formatDate = (date) => {
    const dateVal = date;
    const parts = dateVal.split("-");
    return `${parts[1]}-${parts[0]}`;
  };

  const handleBrewedBeforeChange = (event) => {
    setBeforeDate(event.target.value);
    dispatch(setBrewedBefore(formatDate(event.target.value)));
  };

  const handleBrewedAfterChange = (event) => {
    setAfterDate(event.target.value);
    dispatch(setBrewedAfter(formatDate(event.target.value)));
  };

  const handleReset = () => {
    setBeforeDate("");
    dispatch(setBrewedBefore(null));
    setAfterDate("");
    dispatch(setBrewedAfter(null));
  };

  return (
    <div className="container-md">
      <h1>Beers List</h1>

      <div className="py-4 d-flex flex-column flex-md-row gap-4">
        <label htmlFor="brewedBefore">
          Brewed Before:
          <input
            className="mx-2"
            type="date"
            id="brewedBefore"
            value={beforeDate || ""}
            onChange={handleBrewedBeforeChange}
          />
        </label>

        <label htmlFor="brewedAfter">
          Brewed After:
          <input
            className="mx-2"
            type="date"
            id="brewedAfter"
            value={afterDate || ""}
            onChange={handleBrewedAfterChange}
          />
        </label>

        <button
          type="button"
          class="btn btn-primary btn-sm"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-primary table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Brewed</th>
              <th>Image</th>
              <th>Name</th>
              <th>Tagline</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {beers.map((beer, i) => (
              <tr key={beer.id}>
                <td>{beer.id}</td>
                <td>{beer.first_brewed}</td>
                <td>
                  <div style={{ height: "80px" }}>
                    <img
                      src={beer.image_url}
                      alt=""
                      className="img-thumbnail"
                      style={{ height: "100%" }}
                    />
                  </div>
                </td>
                <td>{beer.name}</td>
                <td>{beer.tagline}</td>
                <td>{beer.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
