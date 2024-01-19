export default class RequestError extends Error {
  public status;
  public body;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}
