import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);
const keyLen = 64;

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buff = (await scryptAsync(password, salt, keyLen)) as Buffer;

    return `${buff.toString('hex')}.${salt}`;
  }

  static async compare(suppliedPassword: string, storedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buff = (await scryptAsync(suppliedPassword, salt, keyLen)) as Buffer;
    return hashedPassword == buff.toString('hex');
  }
}
