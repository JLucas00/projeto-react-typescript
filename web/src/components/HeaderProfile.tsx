import { ArrowLeft, Moon, Sun, ToggleLeft, ToggleRight } from 'phosphor-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type headerProps = {
  img?: string;
  name: string;
};

export const HeaderProfile = ({ img, name }: headerProps) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(false);

  const btnMode = () => {
    if (mode) {
      console.log('Modo Noturno');
    } else {
      console.log('Modo Dia');
    }
    setMode(!mode);
  };

  return (
    <>
      <div className="h-full w-full px-6 py-5 flex flex-col justify-start items-center">
        <div className="h-5 w-full flex justify-between">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="text-icon-light" size={20} />
          </button>
          <div className="flex">
            {mode ? (
              <Moon className="text-body-dark" size={20} />
            ) : (
              <Sun className="text-icon-light" size={20} />
            )}
            <button className="ml-1" onClick={btnMode}>
              {mode ? (
                <ToggleLeft className="text-body-dark" size={20} />
              ) : (
                <ToggleRight className="text-icon-light" size={20} />
              )}
            </button>
          </div>
        </div>
        <img
          className="h-20 w-20 mt-2 mb-3 rounded-full"
          src={
            img
              ? img
              : 'https://pps.whatsapp.net/v/t61.24694-24/254332755_598306361252236_4093905170529476787_n.jpg?ccb=11-4&oh=01_AVylqo9A0CJZ854ETK0Q7f-I7uW_FOa-Ei6pD5LRZg8hFg&oe=62F999AB'
          }
          alt="User Image"
        />
        <p className="text-xl flex items-center text-icon-light">{name}</p>
      </div>
    </>
  );
};
