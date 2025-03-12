import { User } from "../type";

export default class UserEntity implements User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;

  constructor({ id, name, email, image }: User) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.image = image;
  }
}
