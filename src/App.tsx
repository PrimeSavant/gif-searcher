import { IGif } from "@giphy/js-types";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import GifThumbnail from "./components/gif-thumbnail";
import Modal from "./components/modal";
import Search from "./components/search";
import giphy from "./utils/giphy";

function App() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [currentGif, setCurrentGif] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);

  // right arrow handler, goes to next GIF in the grid
  const handleNext = () => {
    setCurrentGif(Math.min(currentGif + 1, gifs.length - 1));
  };

  // left arrow handler, goes to previous GIF in the grid
  const handlePrev = () => {
    setCurrentGif(Math.max(0, currentGif - 1));
  };

  // Opens the lightbox (thumbnail click)
  const handleGifClick = (gif?: IGif) => {
    setModalOpen(true);
    setCurrentGif(gifs.indexOf(gif as IGif));
  };

  // execute the call to Giphy API, and set the gifs array
  // this function is debounced to avoid searching on every character changed.
  const search = useRef(
    debounce(async (query) => {
      const result = await giphy.search(query, { limit: 100 });
      setGifs(result.data);
    }, 500)
  ).current;

  // handler for the load more button
  const loadMore = useCallback(async () => {
    const { data } = await giphy.search(query, {
      offset: gifs.length,
      limit: 12,
    });
    setGifs([...gifs, ...data]);
  }, [query, gifs.length]);

  // when you change the search text, it executes the search function
  useEffect(() => {
    search.cancel();
    search(query);
  }, [query]);

  return (
    <>
      <div className="p-3 bg-gray-900 h-screen w-screen overflow-x-hidden">
        <header className="">
          <h1 className="text-white font-bold text-2xl text-center my-3">
            GIF Searcher
          </h1>
          <Search query={query} onChange={setQuery} />
        </header>

        <div className={`grid grid-cols-6 gap-3`}>
          {gifs.map((gif) => {
            return (
              <GifThumbnail key={gif.id} gif={gif} onClick={handleGifClick} />
            );
          })}
        </div>

        {gifs.length === 0 && (
          <p className="text-center w-full text-gray-100">No results to show</p>
        )}

        {gifs.length > 0 && (
          <div className="py-5 flex justify-center">
            <Button variant="contained" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>

      {/* lightbox */}
      {modalOpen && (
        <Modal
          gifToShow={gifs[currentGif]}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
