export class Item {

  id: number;
  name: string;
  unit: string;
  description: string;
  volume: number;
  accountId: number;
  active: boolean;
  public itemToString()  {
    return 'itemDto{' +
      'id=' + this.id +
      ', name=' + this.name + '\'' +
      ', unit=' + this.unit + '\'' +
      ', description=' + this.description + '\'' +
      ', volume=' + this.volume +
      ', accountId=' + this.accountId +
      ', active=' + this.active +
      '}';
  }
  }
