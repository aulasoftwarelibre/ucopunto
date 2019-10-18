import uuid = require('uuid');

import { UserWasRegistered } from '../event';
import { UserFullnameWasChanged } from '../event/user-fullname-was-changed.event';
import { UserGenderWasChanged } from '../event/user-gender-was-changed.event';
import { Fullname } from './fullname';
import { Gender } from './gender';
import { User } from './user';
import { UserId } from './user-id';
import { Username } from './username';

describe('User', () => {
  const userId = UserId.fromString(uuid.v4());
  const username = Username.fromString('johndoe');
  const fullname = Fullname.fromString('John Doe');
  const gender = Gender.male();

  it('can be created', () => {
    const user = User.add(userId, username);

    expect(user.getUncommittedEvents()).toContainEqual(
      new UserWasRegistered(userId.value, username.value),
    );
  });

  it('has an id', () => {
    const user = User.add(userId, username);

    expect(user.id.equals(userId)).toBeTruthy();
  });

  it('has a username', () => {
    const user = User.add(userId, username);

    expect(user.username.equals(username)).toBeTruthy();
  });

  it('has username as default fullname', () => {
    const user = User.add(userId, username);

    expect(
      user.fullname.equals(Fullname.fromString(user.username.value)),
    ).toBeTruthy();
  });

  it('has other as default gender', () => {
    const user = User.add(userId, username);

    expect(user.gender.equals(Gender.other()));
  });

  it('can change his fullname', () => {
    const user = User.add(userId, username);
    user.changeFullname(fullname);

    expect(user.getUncommittedEvents()).toContainEqual(
      new UserFullnameWasChanged(userId.value, fullname.value),
    );
    expect(user.fullname.equals(fullname)).toBeTruthy();
  });

  it('ignores to change the same fullname', () => {
    const user = User.add(userId, username);
    const sameFullname = Fullname.fromString(username.value);

    user.changeFullname(sameFullname);

    expect(user.getUncommittedEvents()).not.toContainEqual(
      new UserFullnameWasChanged(userId.value, sameFullname.value),
    );
  });

  it('can change his gender', () => {
    const user = User.add(userId, username);
    user.changeGender(gender);

    expect(user.getUncommittedEvents()).toContainEqual(
      new UserGenderWasChanged(userId.value, gender.value),
    );
    expect(user.gender.equals(gender)).toBeTruthy();
  });

  it('ignores to change the same gender', () => {
    const user = User.add(userId, username);
    const sameGender = Gender.other();

    user.changeGender(sameGender);

    expect(user.getUncommittedEvents()).not.toContainEqual(
      new UserGenderWasChanged(userId.value, sameGender.value),
    );
  });
});
