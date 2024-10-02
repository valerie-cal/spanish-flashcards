import "./styles.css";
import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";

const queryClient = new QueryClient({});

const cards = [
  ["yo (buscar)", "busco"],
  ["tú (buscar)", "buscas"],
  ["él (buscar)", "busca"],
  ["nosotros (buscar)", "buscamos"],
  ["vosotros (buscar)", "buscáis"],
  ["ellos (buscar)", "buscan"],
  ["yo (aprender)", "aprendo"],
  ["tú (aprender)", "aprendes"],
  ["él (aprender)", "aprende"],
  ["nosotros (aprender)", "aprendemos"],
  ["vosotros (aprender)", "aprendéis"],
  ["ellos (aprender)", "aprenden"],
  ["yo (preferir)", "prefiero"],
  ["tú (preferir)", "prefieres"],
  ["él (preferir)", "prefiere"],
  ["nosotros (preferir)", "preferimos"],
  ["vosotros (preferir)", "preferís"],
  ["ellos (preferir)", "prefieran"],
];

function Flashcard() {
  const [curr, setCurr] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const mutation = useMutation(
    async (body) => {
      // call server
      console.log("mutation");
      return true;
    },
    {
      onSuccess: (data) => {
        // This is the response you get back
        console.log(data);
        // setResponse(data);
      },
    }
  );
  const onFlip = (e) => {
    setFlipped(!flipped);
  };
  const onPrev = (e) => {
    setCurr((curr + cards.length - 1) % cards.length);
    setFlipped(false);
  };
  const onNext = (e) => {
    setCurr((curr + 1) % cards.length);
    setFlipped(false);
  };

  return (
    <div>
      <div>
        Card {curr + 1} of {cards.length}
      </div>
      <br />
      <div>
        <span class="arrow" onClick={onPrev}>
          &#9668;{" "}
        </span>
        <button
          class="flashcard"
          onClick={onFlip}
          style={{ backgroundColor: flipped ? "lightgray" : "lightblue" }}
        >
          {cards[curr][flipped ? 1 : 0]}
        </button>
        <span class="arrow" onClick={onNext}>
          {" "}
          &#9658;
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Spanish Conjugation Flashcards</h1>
        <h2>Click to see answer</h2>
        <Flashcard />
      </div>
    </QueryClientProvider>
  );
}

