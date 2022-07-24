interface TransferBody {
  accountOrigin: {
    cpf: string;
    agency: string;
    verificationAgencyDigit: string;
    accountNumber: string;
    verificationAccountDigit: string;
    password: string;
  };
  accountReceiver: {
    cpf: string;
    agency: string;
    verificationAgencyDigit: string;
    accountNumber: string;
    verificationAccountDigit: string;
  };

  value: number;
}

export default TransferBody;
