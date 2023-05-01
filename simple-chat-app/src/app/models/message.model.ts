export class Message {
  public content: string;
  public time: Date;

  constructor(content: string, time: Date) {
    this.content = content;
    this.time = time;
  }
}
