import { useState, useEffect } from 'react';
import ButtonGroup from './ButtonGroup';
import InputSection from './InputSelection';
import MemberGrid from './MemberGrid';
import Score from './Score';
import { Member } from './types'; // Import the Member type from a common types file


const API_KEY = 'HxVjHIxlzdkW3dXPQxNu4BKFiQbEpLydEw16cP3P'; //normally would delete fot git
const BASE_URL = 'https://api.congress.gov/v3/member';

const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
};

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [inputNumber, setInputNumber] = useState<string>('12');
  const [randomMembers, setRandomMembers] = useState<Member[]>([]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [gamePlaying, setGamePlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [allTimeHigh, setAllTimeHigh] = useState(0);
  const [selectedPeople, setSelectedPeople] = useState<Member[]>([]);
  
  useEffect(() => {
    async function getData() {
      let offset = 0;
      const allMembers: Member[] = [];
      while (offset < 2522) {
        setSpinning(true);
        try {
          const json = await fetchData(`${BASE_URL}?offset=${offset}&limit=250&api_key=${API_KEY}`);
          allMembers.push(...json.members);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("An unknown error occurred");
          }
        }
        offset += 250;
      }
      const filtered = allMembers.filter((member) => member.terms.item.some(term => term.endYear === undefined) && member.depiction?.imageUrl);
      setMembers(filtered);
      setFilteredMembers(filtered); // Initialize with all members
      setSpinning(false);
    }

    getData();
  }, []);

  function handleAllButton() {
    setFilteredMembers(members); // Show all members
    setRandomMembers([]); // Clear random members
    quitPlaying();
  }

  function handleSenatorButton() {
    setFilteredMembers(members.filter(member => 
      member.terms.item.some(term => term.chamber === 'Senate' && term.endYear === undefined)
    ));
    setRandomMembers([]); // Clear random members
    quitPlaying();
  }

  function handleHouseButton() {
    setFilteredMembers(members.filter(member => 
      member.terms.item.some(term => term.chamber === 'House of Representatives' && term.endYear === undefined)
    ));
    setRandomMembers([]); // Clear random members
    quitPlaying();
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputNumber(value);
  }

  function chooseRandom(howManyPeople: number): Member[] {
    const numberOfMembers = Math.min(howManyPeople, filteredMembers.length);
    const shuffled = [...filteredMembers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfMembers);
  }

  function start() {
    const numberOfPeople = parseInt(inputNumber, 10);
    if (!isNaN(numberOfPeople) && numberOfPeople > 0) {
      const randomMembers = chooseRandom(numberOfPeople);
      setRandomMembers(randomMembers); // Store the randomly chosen members
      setGamePlaying(true);
    } else {
      setRandomMembers([]); // Clear random members if the input is not a valid number
    }
  }

  function shuffleArray(array:Member[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

  function quitPlaying() {
    setGamePlaying(false);
    setScore(0);
    setHighScore(0);
  }

  function lose() {
    setScore(0);
    setSelectedPeople([])
  }

  function onClickCard(member: Member) {
    console.log(randomMembers)
    let randMembersCopy = randomMembers
    randMembersCopy = shuffleArray(randomMembers)
    setRandomMembers(randMembersCopy)
    if(selectedPeople.includes(member)) {
      lose()
    }
    else {
      setSelectedPeople([...selectedPeople, member])
      setScore(score+1)
      if(score+1 > highScore) {
        setHighScore(score+1)
      }
    }
  }

  const displayMembers = randomMembers.length > 0 ? randomMembers : filteredMembers;

  return (
    <>
      <Score
        score={score}
        highScore={highScore}
        gamePlaying={gamePlaying}
      />
      <div className={` ${spinning ? 'animate-spin-slow' : 'animate-none'} background -z-20 fixed w-full h-full grayscale opacity-15 `} />
      <div>
        <h1>Loading...</h1>
      </div>
      <div className='flex bg-[#242424] w-full h-auto fixed top-0 justify-around flex-wrap z-10'>
        <ButtonGroup 
          onAllClick={handleAllButton}
          onSenatorClick={handleSenatorButton}
          onHouseClick={handleHouseButton}
          gamePlaying={gamePlaying}
        />
        <InputSection
          inputNumber={inputNumber}
          onInputChange={handleInput}
          onStartClick={start}
          gamePlaying={gamePlaying}
        />
      </div>
      <MemberGrid 
        members={displayMembers}
        gamePlaying={gamePlaying}
        onClickCard={onClickCard}
      />
    </>
  );
}

export default App;
