interface WithdrawBody {
  account: {
    cpf: string;
    agency: string;
    verificationAgencyDigit: string;
    accountNumber: string;
    verificationAccountDigit: string;
    password: string;
  };
  value: number;
}

export default WithdrawBody;
