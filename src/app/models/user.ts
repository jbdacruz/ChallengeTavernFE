export class User {
  constructor(
    public userId: number = -1,
    public email: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public joined: string = '',
    public branch: string = '',
    public publicId: string = '',
  ) {
  }
}
