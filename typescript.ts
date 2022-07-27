// https://learntypescript.dev/
// https://www.youtube.com/watch?v=PJjeHzvi_VQ&list=LL&index=4&t=1557s
// https://www.youtube.com/watch?v=nNse0r0aRT8
// https://github.com/type-challenges/type-challenges#challenges

//tuples

const janTuple: [string, number] = ["jan", 70];

const wouterTuple: [string, ...number[]] = ["wouter", 70, 80];

//returnType

const getData = () => {
  return {
    name: "wouter",
  };
};

type ReturnedData = ReturnType<typeof getData>;

//generics

type Coordinate = [number, number];

type Result = {
  firstName: string;
  surname?: string;
  score?: number;
};
type ResultRecord = Record<string, Result>;

const resultRecord: ResultRecord = {
  test: {
    firstName: "jan",
  },
};

const getGenericData = <T extends string | number>() => {
  return {
    id: 1,
  } as { id: T };
};

const dataEndpoint1 = getGenericData();

const contactForm = {
  values: {
    name: "Bob",
    email: "bob@someemail.com",
    age: 30,
  },
};
//will fail, any
interface Form<T> {
  values: T;
}
function getFieldValue<T>(form: Form<T>, fieldName: string) {
  return form.values[fieldName];
}

const field1 = getFieldValue(contactForm, "name");
const field2 = getFieldValue(contactForm, "phone");
const field3 = getFieldValue(contactForm, "age");

//will work
interface Form<T> {
  values: T;
}
function getFieldValueFixed<T, K extends keyof T>(form: Form<T>, fieldName: K) {
  return form.values[fieldName];
}

const fieldFixed1 = getFieldValueFixed(contactForm, "name");
const fieldFixed2 = getFieldValueFixed(contactForm, "phone");
const fieldFixed3 = getFieldValueFixed(contactForm, "age");

type NameAndThings<T extends unknown[]> = [
  name: string,
  ...things: T,
  lastName: string
];

const nameAndThings: NameAndThings<number[]> = ["jan", 1, 2, "joris"];

// merge examples

function merge(names: string[], scores: number[]) {
  return [...names, ...scores];
}

const scores = merge(["Bill", "Jane"], [8, 9]);

function mergeExtends<Names extends string[], Scores extends number[]>(
  names: [...Names],
  scores: [...Scores]
) {
  return [...names, ...scores];
}

const scoresExtends = mergeExtends(["Bill", "Jane"], [8, 9]);

function mergeExtendsFinal<Names extends string[], Scores extends number[]>(
  names: [...Names],
  scores: [...Scores]
): [...Names, ...Scores] {
  return [...names, ...scores];
}

const scoresExtendsFinal = mergeExtendsFinal(["Bill", "Jane"], [8, 9]);

//advanced generic types, mapped types
type Dispatch<PropertyType> = (value: PropertyType) => void;

type ZustandURLStoreSetter<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: Dispatch<T[K]>;
};

const urlStore: ZustandURLStoreSetter<{ open: true }> = {
  setOpen: () => {},
};

//conditional types

type Person = {
  name: string;
  age: number;
};
type Example1 = Person extends {} ? string : number;

//what are you

type WhatAreYou<T> = T extends { name: string } ? "human" : "elon musk";

const wouter = {
  name: "wouter",
};

const elon = {
  blaba: "elon",
};

type Elon = WhatAreYou<typeof elon>;

//infer

export type PopArgument<T extends (...args: never[]) => unknown> = T extends (
  ...args: [...infer A, infer _]
) => infer R
  ? (...args: A) => R
  : never;

const getAllHumans = (getNames: () => void, getLocations: () => void) => {};

type GetAllHumansPopped = PopArgument<typeof getAllHumans>;
