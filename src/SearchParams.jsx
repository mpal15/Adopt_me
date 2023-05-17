import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
//import { useState} from "react";
// remove useEffect import from 'react' import
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import Results from "./Results";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
   // const [pets, setPets] = useState([]);
   //const [location, updateLocation] = useState("");
   const [animal, updateAnimal] = useState("");
  //const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const [adoptedPet] = useContext(AdoptedPetContext);

  
  
    return (
      <div className="search-params">
      <form
          onSubmit={ (e)=>{
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
              animal: formData.get("animal") ?? "",
              breed: formData.get("breed") ?? "",
              location: formData.get("location") ?? "",
            };
            setRequestParams(obj);}
        }
        
            >
                {
  adoptedPet ? (
    <div className="pet image-container">
      <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
    </div>
  ) : null // you have to remove this semi-colon, my auto-formatter adds it back if I delete it
}
          <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              updateAnimal(e.target.value);
            }}
            onBlur={(e) => {
              updateAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;