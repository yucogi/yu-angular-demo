import { FormControl } from "@angular/forms";
export class LimitValidator {
  static Limit(limit:number) {
    //returns the validation function. validation function is a lambda function, (control:FormControl)  is param,
    //{[key: string]: any} is return value, after => is lambda function body
    return (control:FormControl) : {[key: string]: any} => {
      let val = Number(control.value);
      if (val != NaN && val > limit) {
        return {"limit": {"limit": limit, "actualValue": val}};
      } else {
        return null;
      }
    }
  }
}
