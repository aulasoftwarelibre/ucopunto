import { RegisterUserHandler } from './register-user.handler';
import { UpdateProfileHandler } from './update-profile.handler';

export const CommandHandlers = [RegisterUserHandler, UpdateProfileHandler];

export * from './register-user.command';
export * from './update-profile.command';
