import { IEmailService } from "../../domain/interfaces/IEmailService";
import { IOTPRepository } from "../../domain/interfaces/Repository/IOTPRepository";
import { IHashingAdapter } from "../../domain/interfaces/IHashingAdapter";

export class EmailService {
  constructor(
    private emailService: IEmailService,
    private otpRepository: IOTPRepository,
    private hashingAdapter: IHashingAdapter
  ) {}

  async sendOTP(email: string): Promise<void> {
    const otp = this.generateOTP();
    const hashedOtp = await this.hashingAdapter.hash(otp, 8);
    const type = "verification";
    await this.otpRepository.saveOtp(email, hashedOtp, type);
    await this.emailService.sendOTP(email, otp);
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    await this.emailService.sendPasswordResetLink(email, resetToken);
  }
}
