// import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
//import Pet from "./pet";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route,Link} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  // return React.createElement("div", {}, [
  //   React.createElement("h1", {}, "Adopt Me!"),
  //   React.createElement(Pet, {
  //     name: "Luna",
  //     animal: "Dog",
  //     breed: "Havanese",
  //   }),
  //   React.createElement(Pet, {
  //     name: "Pepper",
  //     animal: "Bird",
  //     breed: "Cockatiel",
  //   }),
  //   React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" }),
  // ]);
  return(
    // wrap the rest of the app inside of BrowserRouter
<AdoptedPetContext.Provider value={adoptedPet}><QueryClientProvider client={queryClient}>
    <BrowserRouter>
   <header>
  <Link to="/">Adopt Me!</Link>
   </header>
    <Routes>
      <Route path="/details/:id" element={<Details />} />
      <Route path="/" element={<SearchParams />} />
    </Routes>
  </BrowserRouter>
</QueryClientProvider>
</AdoptedPetContext.Provider>
    
   
  )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);