export interface IHashingAdapter {
  hash(password: string, saltRounds: number): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}
