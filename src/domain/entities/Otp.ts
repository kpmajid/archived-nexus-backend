export interface Otp {
  otp: string;
  email: string;
  timeStamp?: Date;
  expireAt: Date;
  type: "verification" ;
}
