import { Result } from './Result';
declare const validator: (value: any, ...rules: Function[]) => Result[];
export default validator;
