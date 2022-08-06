import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

interface ExtractRequest {
  cpf: string;
  agency: string;
  verificationAgencyDigit: string;
  accountNumber: string;
  verificationAccountDigit: string;
}
export async function getExtract(body: ExtractRequest) {
  return await api.post('get-extract', body);
}

interface DepositRequest {
  account: {
    cpf: string;
    agency: string;
    verificationAgencyDigit: string;
    accountNumber: string;
    verificationAccountDigit: string;
  };
  value: number;
}
export async function postDeposit(body: DepositRequest) {
  return await api.post('create-deposit', body);
}

interface WithdrawRequest {
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
export async function postWithdraw(body: WithdrawRequest) {
  return await api.post('create-withdraw', body);
}

interface TransferRequest {
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
export async function postTransfer(body: TransferRequest) {
  return await api.post('create-transfer', body);
}

interface AccountRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birthdate: string;
}
export async function postAccount(body: AccountRequest) {
  return await api.post('create-withdraw', body);
}

interface ProfileRequest {
  cpf: string;
  agency: string;
  verificationAgencyDigit: string;
  accountNumber: string;
  verificationAccountDigit: string;
}
export async function getProfile(body: ProfileRequest) {
  return await api.post('get-profile', body);
}
interface LoginRequest {
  cpf: string;
  password: string;
}
export async function getLogin(body: LoginRequest) {
  return await api.post('login', body);
}

interface CreateAccountRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birthdate: string;
}
export async function createAccount(body: CreateAccountRequest) {
  return await api.post('create-account', body);
}

interface ProofRequest {
  id: string;
}
export async function getProof(body: ProofRequest) {
  return await api.post('get-proof', body);
}
