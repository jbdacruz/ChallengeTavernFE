import {HttpInterceptorFn} from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  next(req).subscribe(
    // value => console.log(value),
  )
  return next(req);

};
