import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { PostgresUserRepository } from './../../repositories/implementations/PostgresUserRepository';
import { MailtrapMailProvider } from './../../providers/implementations/MaitrapMailProvider';

const mailTrapProvider = new MailtrapMailProvider();
const postgresUserRepository = new PostgresUserRepository(); 

const createUserUseCase = new CreateUserUseCase(postgresUserRepository, mailTrapProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };