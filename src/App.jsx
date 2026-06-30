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
     <div className='app-container'>
  
      {/*  . ݁₊ ⊹ Main Dashboard ⊹  . ݁˖ . */}
      <div className="discover-card">
        <h1>Paws & Pals: Dog Explorer</h1>
        <h1>Discover new dog breeds, but ban traits you don't like</h1>

        <button onClick={fetchinRandomDog} disbled={loading} style={btnStyle}>
         {loading ? "Searching..." : "🔀 Discover!"}
        </button>
      
        {currentDog && (
          <div style={{ marginTop: '20px' }}>
            <h2>{currentDog.name}</h2>

        {/*  . ݁₊ ⊹ Clickable Atrributes ⊹  . ݁˖ . */}
        <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => addToBanList(currentDog.group)} style={attrButtonStyle}>
                📁 Group: {currentDog.group}
              </button>
              <span style={{ padding: '6px 12px', background: '#444', borderRadius: '20px', fontSize: '14px' }}>
                ⏳ Life: {currentDog.lifeSpan}
              </span>
            </div>
         
        {/*  . ݁₊ ⊹ Clickable Temperament Badges ⊹  . ݁˖ . */} 
        <div style={{ marginBottom: '20px' }}>
              <h4>Temperaments (Click to ban):</h4>
              {currentDog.temperaments.length > 0 ? (
                currentDog.temperaments.map((trait, index) => (
                  <button key={index} onClick={() => addToBanList(trait)} style={traitButtonStyle}>
                    {trait}
                  </button>
                ))
              ) : (
                <p style={{ fontSize: '12px', color: '#888' }}>No temperaments listed for this breed.</p>
              )}
            </div>
          
          {/*  . ݁₊ ⊹ Image Display ⊹  . ݁˖ . */}
            <img 
              src={currentDog.image} 
              alt={currentDog.name} 
              style={{ maxWidth: '100%', maxHeight: '450px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} 
            />
          </div>
        )}
      </div>

      {/*  . ݁₊ ⊹ Ban List Sidebar ⊹  . ݁˖ . */}
      <div style={{ flex: 1, borderLeft: '2px solid #444', paddingLeft: '20px', minWidth: '200px' }}>
        <h3>🚫 My Ban List</h3>
        <p style={{ fontSize: '12px', color: '#aaa' }}>Click an attribute to unban it</p>
        {banList.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No attributes banned yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {banList.map((bannedItem, index) => (
              <button 
                key={index} 
                onClick={() => removeFromBanList(bannedItem)} 
                style={bannedItemStyle}
              >
                ❌ {bannedItem}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// *  . ݁₊ ⊹ Some quick styling objects to keep everything tidy ⊹  . ݁˖ . *
const btnStyle = {pa}

export default App
