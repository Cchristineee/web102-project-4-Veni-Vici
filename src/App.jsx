import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // . ݁₊ ⊹ Stating my variables ⊹ . ݁˖ . ݁
  const [currentDog, setCurrentDog] = useState(null);
  const [banList, setBanList] = useState([]);
  const [loading, setLoading] = useState(false);

  // . ݁₊ ⊹Array of full objects to keep track of previous choices for history tracking
  const [history, setHistory] = useState([]);

  // . ݁₊ ⊹ Fetching Function with Async/Await & Ban filtering ⊹ . ݁˖ . ݁
  const fetchRandomDog = async () => {
    setLoading(true);
    const url = 'https://api.thedogapi.com/v1/images/search?has_breeds=true';

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data || data.length === 0) {
        setLoading(false);
        return;
      }

      const dogObject = data[0];
      const breedInfo = dogObject?.breeds?.[0];

     
      const breedName = breedInfo?.name || 'Mixed Breed Pup';
      const breedGroup = breedInfo?.breed_group || 'Companion';
      const lifeSpan = breedInfo?.life_span || '10 - 15 years';
      const temperamentString = breedInfo?.temperament || 'Friendly, Playful, Loyal';
      const temperamentArray = temperamentString.split(', ').map(t => t.trim());

      // . ݁₊ ⊹ Checks Ban List ⊹ . ݁˖ . ݁
      const isGroupBanned = banList.includes(breedGroup);
      const hasBannedTemperament = temperamentArray.some(trait => banList.includes(trait));

      if (isGroupBanned || hasBannedTemperament) {
        console.log(`Banned attribute found. Skipping background loop...`);

        setLoading(false);
        return fetchRandomDog();
      }

      const newDog = {
        image: dogObject.url,
        name: breedName,
        group: breedGroup,
        lifeSpan: lifeSpan,
        temperaments: temperamentArray,
      };

      if (currentDog) {
        setHistory(prev => [currentDog, ...prev]);
      }

      setCurrentDog(newDog);
    } catch (error) {
      console.error('Error fetching data from The Dog API:', error);
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
    if (attribute && !banList.includes(attribute) && attribute !== "Unknown Group") {
      setBanList([...banList, attribute]);
    }
  };
      const removeFromBanList = (attribute) => {
        setBanList(banList.filter(item => item !== attribute));
  };
 
  // . ݁₊ ⊹ Uses the current image URL directly as a full layout background context wrapper ⊹ . ݁˖ . 
  const backgroundOverlay = currentDog?.image
    ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${currentDog.image})`
    : 'none';

  return (
     <div className='app-container' style={{ backgroundImage: backgroundOverlay }}>
      <div className='page-shell'>
        <div className='layout'>

          {/*  . ݁₊ ⊹ History Sidebar ⊹ . ݁˖ . */}
          <aside className='history-sidebar'>
            <h3>Who Seen</h3>
            <p style={{ fontSize: '12px', textAlign: 'center', margin: '0 0 10px 0' }}>History log of dogs viewed this session.</p>
            {history.length === 0 ? (
              <p className='empty-text'>None yet.</p>
            ) : (
              history.map((item, idx) => (
                <div key={idx} className='history-item'>
                  <img src={item.image} alt={item.name} className='history-thumb' />
                  <p>{item.name}</p>
                </div>
              ))
            )}
          </aside>

          {/*  . ݁₊ ⊹ Main Content Area ⊹ . ݁˖ . */}
          <section className='discover-card'>
            <div className='discover-card__head'>
              <h1>Paws & Pals</h1>
              <p className='subtitle'>Discover new dog breeds from your wildest dreams!</p>
            </div>

            <button onClick={fetchRandomDog} disabled={loading} className='btn-discover'>
              {loading ? 'Searching...' : '🔀 Discover!'}
            </button>

            {currentDog && (
              <div className='breed-panel'>
                <h2>{currentDog.name}</h2>
                
                <div className='attribute-row'>
                  <button onClick={() => addToBanList(currentDog.group)} className='attribute-badge'>
                    {currentDog.group}
                  </button>
                  <span className='life-badge'>{currentDog.lifeSpan}</span>
                </div>

                <div className='temperaments'>
                  <div className='trait-row'>
                    {currentDog.temperaments.map((trait, index) => (
                      <button key={index} onClick={() => addToBanList(trait)} className='trait-badge'>
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>

                <img src={currentDog.image} alt={currentDog.name} className='dog-image' />
              </div>
            )}
          </section>

          {/* . ݁₊ ⊹ Ban List Sidebar ⊹ . ݁˖ . */}
          <aside className='sidebar'>
            <h3>Ban List</h3>
            <p className='sidebar-copy'>Select an attribute in your listing to ban it</p>
            {banList.length === 0 ? (
              <p className='empty-text'>No attributes banned yet.</p>
            ) : (
              <div className='ban-list'>
                {banList.map((bannedItem, index) => (
                  <button key={index} onClick={() => removeFromBanList(bannedItem)} className='banned-item'>
                    {bannedItem}
                  </button>
                ))}
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
}

export default App
