type headerProps = {
  userId: string;
};

export const MyAccounts = ({ userId }: headerProps) => {
  return (
    <div className="flex flex-col justify-start gap-y-6">
      <div className="p-1 flex flex-col justify-start gap-y-1 border rounded border-btn-secondary-base bg-body-dark">
        <p className="text-my-data">Agência: {'Numero'}</p>
        <p className="text-my-data">Conta: {'Número'}</p>
      </div>
      <div className="p-1.5 flex flex-col justify-start gap-y-1 border rounded border-btn-secondary-base bg-body-dark">
        <p className="text-my-data">Agência: {'Numero'}</p>
        <p className="text-my-data">Conta: {'Número'}</p>
      </div>
    </div>
  );
};
