import { AggregateRoot } from '../../../core/domain';
import { UserFullnameWasChanged } from '../event/user-fullname-was-changed.event';
import { UserGenderWasChanged } from '../event/user-gender-was-changed.event';
import { UserWasRegistered } from '../event/user-was-registered.event';
import { Fullname } from './fullname';
import { Gender } from './gender';
import { UserId } from './user-id';
import { Username } from './username';

export class User extends AggregateRoot {
  private _userId: UserId;
  private _username: Username;
  private _fullname: Fullname;
  private _gender: Gender;

  private constructor() {
    super();
  }

  public static add(userId: UserId, username: Username): User {
    const user = new this();

    user.apply(new UserWasRegistered(userId.value, username.value));

    return user;
  }

  aggregateId(): string {
    return this._userId.value;
  }

  get id(): UserId {
    return this._userId;
  }

  get username(): Username {
    return this._username;
  }

  get fullname(): Fullname {
    return this._fullname;
  }

  get gender(): Gender {
    return this._gender;
  }

  changeFullname(fullname: Fullname) {
    if (fullname.equals(this._fullname)) {
      return;
    }

    this.apply(new UserFullnameWasChanged(this.id.value, fullname.value));
  }

  changeGender(gender: Gender) {
    if (gender.equals(this._gender)) {
      return;
    }

    this.apply(new UserGenderWasChanged(this.id.value, gender.value));
  }

  private onUserWasRegistered(event: UserWasRegistered) {
    this._userId = UserId.fromString(event.id);
    this._username = Username.fromString(event.username);
    this._fullname = Fullname.fromString(event.username);
    this._gender = Gender.other();
  }

  private onUserFullnameWasChanged(event: UserFullnameWasChanged) {
    this._fullname = Fullname.fromString(event.fullname);
  }

  private onUserGenderWasChanged(event: UserGenderWasChanged) {
    this._gender = Gender.fromString(event.gender);
  }
}
