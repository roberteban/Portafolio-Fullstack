import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return next(apiReq).pipe(
    timeout(30000), // 30 segundos timeout
    catchError((error: HttpErrorResponse) => {
      console.error('API Error:', error);

      let errorMessage = 'Error desconocido';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 0:
            errorMessage = 'No se puede conectar al servidor. Verifica tu conexión.';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor.';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;
        }
      }

      console.error('Error procesado:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
