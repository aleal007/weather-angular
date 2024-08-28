import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlBase = 'http://localhost:8080/api/v1/search';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private http: HttpClient) { }

  getEstadoTiempo(latitud: string, longitud: string){

    let body = {
      "latitude": latitud,
      "longitude": longitud
    }

    return this.http.post(urlBase, body, {
      responseType: 'blob'
    });
  }
}
