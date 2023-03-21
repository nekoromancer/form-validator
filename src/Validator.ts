import { Result } from './Result';

const validator = (value: any, ...rules: Function[]): Result[] => {
   return rules.map(rule => rule(value));
}

export default validator;
