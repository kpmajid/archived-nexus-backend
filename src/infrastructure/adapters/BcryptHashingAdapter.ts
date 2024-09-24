import bcrypt from "bcryptjs";
import { IHashingAdapter } from "../../domain/interfaces/IHashingAdapter";

export class BcryptHashingAdapter implements IHashingAdapter {
  async hash(password: string, saltRounds: number = 10): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
