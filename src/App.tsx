import React, { useState, useEffect } from 'react';
import { Shuffle, ChevronUp, ChevronDown, ChevronFirst, ChevronLast, Trash2 } from 'lucide-react';

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


  const [gif, setGif] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    fetchRandomGif();
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    const allChecked = people.every(person => person.active);
    if (allChecked) {
      setIsRunning(false);
    }
  }, [people]);

  const fetchRandomGif = async () => {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=good+morning&api_key=Pu520AataQOyWkSY21Au4EfCVIX8OSwm`
    );
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.data.length);
    setGif(data.data[randomIndex]?.images.original.url);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto flex gap-6">
          
          {/* People List */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1">
              <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
                <h1 className="text-3xl font-bold text-white">Daily Randomizer</h1>
              </div>

              <div className="divide-y divide-gray-100">
                {people.map((person) => (
                  <div
                    key={person.id}
                    className={`p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                      person.active ? 'bg-[#38d779]' : ''
                    }`}
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GIF or Timer with Background Color Change */}
          <div className="flex-1 flex flex-col">
            <div className={`p-6 rounded-2xl shadow-xl flex-1 flex items-center justify-center transition-all
              ${people.every(person => person.active) ? (timer < 1800 ? 'bg-green-200' : 'bg-red-200') : 'bg-white'}
            `}>
              {people.every(person => person.active) ? (
                <h1 className="text-3xl font-bold text-gray-700">
                  Tiempo!: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </h1>
              ) : (
                gif && (
                  <div className="w-full h-auto overflow-hidden rounded-lg">
                    <img
                      src={gif}
                      alt="Daily GIF"
                      className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform"
                    />
                  </div>
                )
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;