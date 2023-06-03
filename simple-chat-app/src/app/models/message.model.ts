export class Message {
  public text: string;
  public time: Date;

  constructor(content: string, time: Date) {
    this.text = content;
    this.time = time;
  }
}
