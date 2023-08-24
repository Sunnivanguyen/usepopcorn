import { useRef, useEffect } from "react";
function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  // useEffect(function(){
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus()
  // }, [])

  useEffect(
    function () {
      function callback(e) {
        //we need to use an effect in order to use a ref that contains a DOM element
        //because the ref only gets added to the DOM element after the DOM has already loaded.
        //Therefore we can only access it in effect which also runs after the DOM has been loaded.

        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;
