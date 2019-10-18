export class EmptyUsernameError extends Error {
  constructor(message: string = `Username is not valid because is empty`) {
    super(message);
  }
}
