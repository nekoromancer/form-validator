import { ResultList } from './ResultList';

const validator = (value: any, ...rules: Function[]): ResultList => {
   return new ResultList(rules.map(rule => rule(value)));
}

export default validator;
