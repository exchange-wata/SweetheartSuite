export class Mailaddress {
  public mailaddress: string;

  private constructor(mailaddress: string) {
    if (!this.isValidMailaddress(mailaddress)) {
      throw new Error('Invalid email address');
    }
    this.mailaddress = mailaddress;
  }

  public static create(mailaddress: string): Mailaddress {
    return new Mailaddress(mailaddress);
  }

  private isValidMailaddress(mailaddress: string): boolean {
    const mailaddressRegex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return mailaddressRegex.test(mailaddress);
  }
}
