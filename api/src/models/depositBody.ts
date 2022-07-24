interface DepositBody {
  account: {
    cpf: string;
    agency: string;
    verificationAgencyDigit: string;
    accountNumber: string;
    verificationAccountDigit: string;
  };
  value: number;
}

export default DepositBody;
