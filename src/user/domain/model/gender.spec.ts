import { GenderNotValidError } from '../exception/gender-not-valid.error';
import { Gender, GenderTypes } from './gender';

describe('Gender', () => {
  it('creates a male gender', () => {
    const male = Gender.male();

    expect(male.value).toBe(GenderTypes.Male);
  });

  it('creates a male gender from string', () => {
    const male = Gender.fromString('Male');

    expect(male.value).toBe(GenderTypes.Male);
  });

  it('creates a female gender', () => {
    const female = Gender.female();

    expect(female.value).toBe(GenderTypes.Female);
  });

  it('creates a female gender from string', () => {
    const female = Gender.fromString('Female');

    expect(female.value).toBe(GenderTypes.Female);
  });

  it('creates a other gender', () => {
    const other = Gender.other();

    expect(other.value).toBe(GenderTypes.Other);
  });

  it('creates a other gender from string', () => {
    const other = Gender.fromString('Other');

    expect(other.value).toBe(GenderTypes.Other);
  });

  it('can not create an invalid gender', () => {
    expect(() => Gender.fromString('yy')).toThrow(GenderNotValidError);
  });
});
