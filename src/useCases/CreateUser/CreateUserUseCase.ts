import { IMailProvider } from './../../providers/IEmailProvider';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IUserRepository } from './../../repositories/IUserRepository';
import { User } from '../../entities/User';
export class CreateUserUseCase {

  constructor(
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}
 
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.userRepository.save(user);

    await this.mailProvider.sendEmail({
      to: {
        email: data.email,
        name: data.name
      },
      from: {
        email: 'equipe@meuapp.com',
        name: 'Equipe do meu App'
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    })
  }
}