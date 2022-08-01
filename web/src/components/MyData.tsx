type headerProps = {
  name: string;
  birthdate: string;
  document: string;
};

export const MyData = ({ name, birthdate, document }: headerProps) => {
  return (
    <div className="flex flex-col justify-start gap-y-1">
      <p className="text-my-data">Nome: {name}</p>
      <p className="text-my-data">Data de nascimento: {birthdate}</p>
      <p className="text-my-data">CPF: {document}</p>
    </div>
  );
};
