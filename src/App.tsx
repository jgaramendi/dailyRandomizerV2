import React, { useState, useEffect } from 'react';
import { Shuffle, ChevronUp, ChevronDown, ChevronFirst, ChevronLast, Trash2, Smile } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  emoji: string;
  active: boolean;
}

const EMOJIS = ['😄','😃','😀','😊','😉','😍','😘','😚','😗','😙','😜','😝','😛',
  '😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩',
  '😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦',
  '😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷',
  '💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼',
  '🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫',
  '💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊',
  '✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃',
  '👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎',
  '🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖',
  '👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔',
  '💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶',
  '🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴',
  '🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌',
  '🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐',
  '🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸',
  '🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰',
  '🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛',
  '🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁',
  '🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄',
  '🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻'
  ];

function App() {
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'roberto', emoji: '😄', active: false },
    { id: '2', name: 'adri', emoji: '😊', active: false },
    { id: '3', name: 'harold', emoji: '😎', active: false },
    { id: '4', name: 'javi', emoji: '🌟', active: false },
    { id: '5', name: 'juanvi', emoji: '✨', active: false },
    { id: '6', name: 'jon', emoji: '✨', active: false },
    { id: '7', name: 'juanjo', emoji: '✨', active: false },
    { id: '8', name: 'martin', emoji: '✨', active: false },
    { id: '9', name: 'susana', emoji: '✨', active: false },
    { id: '10', name: 'pedro', emoji: '✨', active: false },
  ]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [gif, setGif] = useState<string | null>(null);

  useEffect(() => {
    fetchRandomGif();
    shufflePeople();
  }, []);

  const fetchRandomGif = async () => {
    const isItFriday = new Date().getDay() === 5;
    const query = isItFriday ? 'Its+friday' : 'good+morning';
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=Pu520AataQOyWkSY21Au4EfCVIX8OSwm`
    );
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.data.length);
    setGif(data.data[randomIndex].images.original.url);
  };

  const toggleActive = (id: string) => {
    setPeople(people.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const changeEmoji = (id: string) => {
    setPeople(people.map(p =>
      p.id === id ? { ...p, emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)] } : p
    ));
  };

  const movePerson = (id: string, direction: 'up' | 'down' | 'first' | 'last') => {
    const index = people.findIndex(p => p.id === id);
    const newPeople = [...people];
    const person = newPeople[index];

    newPeople.splice(index, 1);

    if (direction === 'up' && index > 0) {
      newPeople.splice(index - 1, 0, person);
    } else if (direction === 'down' && index < people.length - 1) {
      newPeople.splice(index + 1, 0, person);
    } else if (direction === 'first') {
      newPeople.unshift(person);
    } else if (direction === 'last') {
      newPeople.push(person);
    }

    setPeople(newPeople);
  };

  const deletePerson = (id: string) => {
    setPeople(people.filter(p => p.id !== id));
  };

  const shufflePeople = () => {
    setPeople(prevPeople => {
      const shuffled = [...prevPeople];
  
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
  
      // Return a new array with shuffled order and new emojis
      return shuffled.map(person => ({
        ...person,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      }));
    });
  };  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9]">
      <div className="container mx-auto px-4 py-8">
        {/* Flex container for people list & GIF */}
        <div className="max-w-5xl mx-auto flex gap-6">
          
          {/* People List */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1">
              <div className="p-6 bg-gradient-to-r from-[#1973B8] to-[#00A8E0]">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-white">Daily Randomizer</h1>
                  <button
                    onClick={shufflePeople}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                  >
                    <Shuffle size={20} />
                    A Mezclarse
                  </button>
                </div>
              </div>
  
              <div className="divide-y divide-gray-100">
                  {people.map((person) => (
                    <div
                    key={person.id}
                    className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors 
                      ${person.active ? 'bg-[#38d779]' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={person.active}
                      onChange={() => toggleActive(person.id)}
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => changeEmoji(person.id)}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {person.emoji}
                    </button>
                    <span className="flex-1 font-medium text-gray-700">{person.name}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => movePerson(person.id, 'first')} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronFirst size={20} className="text-gray-500" />
                      </button>
                      <button onClick={() => movePerson(person.id, 'up')} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronUp size={20} className="text-gray-500" />
                      </button>
                      <button onClick={() => movePerson(person.id, 'down')} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronDown size={20} className="text-gray-500" />
                      </button>
                      <button onClick={() => movePerson(person.id, 'last')} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLast size={20} className="text-gray-500" />
                      </button>
                      <button onClick={() => deletePerson(person.id)} className="p-1 hover:bg-red-100 rounded group">
                        <Trash2 size={20} className="text-gray-500 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* GIF Container (Same Height as People List) */}
          {gif && (
            <div className="flex-1 flex flex-col">
              <div className="bg-white p-6 rounded-2xl shadow-xl flex-1 flex items-center justify-center">
                <div className="w-full h-auto overflow-hidden rounded-lg">
                  <img
                    src={gif}
                    alt="Daily GIF"
                    className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={fetchRandomGif}
                  />
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );  
}

export default App;