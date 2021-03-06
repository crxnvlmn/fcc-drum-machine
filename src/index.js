import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const PianoMachine = () => {
  const [key, setKey] = React.useState({
    c: {
      name: 'Note C',
      keyCode: 81, // Q
      soundURL: 'https://www.myinstants.com/media/sounds/notec_yhGsG75.mp3'
    },
    cs: {
      name: 'Note C#',
      keyCode: 87, // W
      soundURL: 'https://www.myinstants.com/media/sounds/notecs.mp3'
    },
    d: {
      name: 'Note D',
      keyCode: 69, // E
      soundURL: 'https://www.myinstants.com/media/sounds/noted.mp3'
    },
    ds: {
      name: 'Note D#',
      keyCode: 65, // A
      soundURL: 'https://www.myinstants.com/media/sounds/noteds.mp3'
    },
    e: {
      name: 'Note E',
      keyCode: 83, // S
      soundURL: 'https://www.myinstants.com/media/sounds/notee.mp3'
    },
    f: {
      name: 'Note F',
      keyCode: 68, // D
      soundURL: 'https://www.myinstants.com/media/sounds/notef.mp3'
    },
    fs: {
      name: 'Note F#',
      keyCode: 90, // Z
      soundURL: 'https://www.myinstants.com/media/sounds/notefs.mp3'
    },
    g: {
      name: 'Note G',
      keyCode: 88, // X
      soundURL: 'https://www.myinstants.com/media/sounds/noteg.mp3'
    },
    gs: {
      name: 'Note G#',
      keyCode: 67, // C
      soundURL: 'https://www.myinstants.com/media/sounds/notegs.mp3'
    },
    a: {
      name: 'Note A',
      keyCode: 86, // V
      soundURL: 'https://www.myinstants.com/media/sounds/notea.mp3'
    },
    as: {
      name: 'Note A#',
      keyCode: 66, // B
      soundURL: 'https://www.myinstants.com/media/sounds/noteas.mp3'
    },
    b: {
      name: 'Note B',
      keyCode: 78, // N
      soundURL: 'https://www.myinstants.com/media/sounds/noteb.mp3'
    }
  });
  const [pressed, setPressed] = React.useState('Note _');
  const [effect, setEffect] = React.useState('');
  const lastNotePlayed = note => {
    setPressed(note);
    setEffect('glow');
    setTimeout(() => setEffect(''), 100);
  };

  return (
    <div id="drum-machine">
      <h1 id="title">🎹 &lt;PIANO MACHINE /&gt; 🎹</h1>
      <h1 id="display" className={effect}>
        {pressed}
      </h1>
      <div id="keysContainer">
        <Keys thisKey={key} lastNote={lastNotePlayed} />
      </div>

      <h1 id="song">SONG</h1>
      <div id="songList">
        <p>
          Mary had a little lamb
          <br /> S, E, Q, E, S, S, S
          <br /> E, E, E, S, X, X
          <br /> S, E, Q, E, S, S, S
          <br /> S, E, E, S, E, Q
        </p>

        <p>
          Twinkle Twinkle Little Star
          <br /> Q, Q, X, X, V, V, X
          <br /> D, D, S, S, E, E, Q
          <br /> X, X, D, D, S, S, E
          <br /> X, X, D, D, S, S, E
          <br /> Q, Q, X, X, V, V, X
          <br /> D, D, S, S, E, E, Q
        </p>

        <p>
          If You’re Happy and You Know It
          <br /> Q, Q, D, D, D, D, D, D, S, D, X
          <br /> Q, Q, X, X, X, X, X, X, D, X, V
          <br /> V, V, B, B, B, B, E, E
          <br /> B, B, V, V, V, X, D, D
          <br /> V, V, X, X, X, D, S, S, E, S, D
        </p>
      </div>
    </div>
  );
};

const Keys = ({ thisKey, lastNote }) => {
  const order = [
    'c',
    'cs',
    'd',
    'ds',
    'e',
    'f',
    'fs',
    'g',
    'gs',
    'a',
    'as',
    'b'
  ];
  const keys = order.map((item, index) => (
    <li key={index + 1}>
      <Key keyer={thisKey[item]} lastNote={lastNote} index={index} />
    </li>
  ));

  return <ol>{keys}</ol>;
};

const Key = ({ lastNote, keyer, index }) => {
  const [pushed, setPushed] = React.useState('');
  React.useEffect(
    () => document.addEventListener('keydown', handleKeyPress),
    []
  );

  const handleKeyClick = () => playNote();
  const handleKeyPress = e => e.keyCode === keyer.keyCode && playNote();
  const playNote = () => {
    const sound = document.getElementById(String.fromCharCode(keyer.keyCode));
    sound.currentTime = 0;
    sound.play();
    lastNote(keyer.name);
    setPushed('played');
    setTimeout(() => setPushed(''), 75);
  };
  const color = keyer.name.length === 6 ? 'white' : 'black';
  return (
    <div
      className={`${index < 9 ? 'drum-pad' : 'drum-pad2'} ${color} ${pushed}`}
      id={keyer.name}
      onClick={handleKeyClick}
    >
      <p id="buttonKey">{String.fromCharCode(keyer.keyCode)}</p>
      <audio
        src={keyer.soundURL}
        className={`${index < 9 ? 'clip' : 'clip2'}`}
        id={String.fromCharCode(keyer.keyCode)}
      />
    </div>
  );
};

ReactDOM.render(<PianoMachine />, document.getElementById('piano-machine'));
