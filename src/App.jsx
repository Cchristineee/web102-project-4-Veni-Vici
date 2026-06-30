import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // . ݁₊ ⊹ Stating my variables ⊹ . ݁˖ . ݁
  const [currentDog, setCurrentDog] = useState(null);
  const [banList, setBanlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // . ݁₊ ⊹ Fetching Function with Async/Await & Ban filtering ⊹ . ݁˖ . ݁
  const fetchRandomDog = async () => {
    setLoading(true);
    const url ='https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&limit=1';

    try {
      const response = await fetch(url);
      const data = await response.json();

      const dogObject = data[0];
      const breedInfo = dogObject?.breeds?.[0];
      
      // . ݁₊ ⊹ Safe Extraction with Fallbacks ⊹ . ݁˖ . ݁
      const breedGroup = breedInfo?.breed_group || "Unkown Group";
      const temperamentString = breedInfo?.temperament || "";
      const temperamentArray = temperamentString ? temperamentString.split(", ").map(t => t.trim()) : [];

       // . ݁₊ ⊹ Checking the Ban List: If the group or any temperament is banned, re-fetch immediately ⊹ . ݁˖ . ݁
      const isGroupBanned = banList.includes(breedGroup);
      const hasBannedTemperament = temperamentsArray.some(trait => banList.includes(trait));

      if (isGroupBanned || hasBannedTemperament) {
        console.log(`Banned attribute found in ${breedInfo?.name}. Fetching a new one...`);
        return fetchRandomDog(); // . ݁₊ ⊹ Auto-fetch background loop ⊹ . ݁˖ . ݁
      }

      // . ݁₊ ⊹ This just checks if it passes the check, it will update our state ⊹ . ݁˖ . 
      setCurrentDog({
        image: dogObject.url,
        name: breedInfo?.name || "Unknown Breed",
        group: breedGroup,
        lifeSpan: breedInfo?.life_span || "Unknown Lifespan",
        temperaments: temperamentsArray
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

    // . ݁₊ ⊹ Automatically loads the first dog when the page opens ⊹ . ݁˖ . 
      useEffect(() => {
      fetchRandomDog();
    }, []);

    // . ݁₊ ⊹ Ban List Handlers ⊹ . ݁˖ .
      const addToBanList = (attribute) => {
      if (!banList.includes(attribute) && attribute !== "Unknown Group") {
        setBanList([...banList, attribute]);
      }
  };
      const removeFromBanList = (attribute) => {
        setBanList(banList.filter(item => item !== attribute));
  };

  return (
    <>

    </>
  )
}

export default App
