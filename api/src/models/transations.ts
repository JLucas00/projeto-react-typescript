interface Transations {
  id: string; // uuid
  date: string;
  value: number;
  originId: string | null; // id account origin
  receiverId: string | null; // id account destiny
  type: string;
}

export default Transations;
