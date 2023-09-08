import { hash, compare } from 'bcrypt';

export class Auth {
    private static SALBOUND = 10
    static async makeHash(password: string): Promise<string> {
        return await hash(password, this.SALBOUND);
    }

    static async comparePassword(plainTextPassword: string, passwordHashed: string): Promise<boolean> {
        return await compare(plainTextPassword, passwordHashed);
    }
}