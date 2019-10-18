export class EmptyFullnameError extends Error {
  constructor(message: string = `Fullname is not valid because is empty`) {
    super(message);
  }
}
