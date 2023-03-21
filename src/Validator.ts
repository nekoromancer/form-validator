import { Result } from './Result';

const V = (value: any, ...rules: Function[]): Result[] => {
   return rules.map(rule => rule(value));
}

export default V;
