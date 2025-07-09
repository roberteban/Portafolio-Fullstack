import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return next.handle(apiReq).pipe(
      timeout(30000),
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
  }
}
