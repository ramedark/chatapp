export class Message {
  from: string;
  public text: string;
  public time: Date;

  constructor(from: string, text: string, time: Date) {
    this.text = text;
    this.time = time;
    this.from = from;
  }
}
