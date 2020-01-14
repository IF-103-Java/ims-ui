export class Transaction {
  id: number;
  timestamp: string;
  type: string;
  item: {
    id: number;
    name: string;
  };
  quantity: number;
  movedFrom: {
    id: 64;
    name: string;
  };
  movedTo: {
    id: number;
    name: string;
  };
}
