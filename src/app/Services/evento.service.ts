import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../Models/evento';

@Injectable()
export class EventoService {

  baseUrl = 'https://localhost:7295/Eventos';

  constructor(private http: HttpClient) { }

  getEventos() : Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseUrl)
  }

  getEventosByTema( tema : string) : Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseUrl}/${tema}/tema`)
  }

  getEventoById(id : number) : Observable<Evento>{
    return this.http.get<Evento>(`${this.baseUrl}/${id}`)
  }


  postEvento(evento : Evento) : Observable<Evento>{
    return this.http.post<Evento>(this.baseUrl, evento)
  }

  putEvento(id : number, evento : Evento) : Observable<Evento>{
    return this.http.put<Evento>(`${this.baseUrl}/${id}`, evento)
  }

  deleteEvento(id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
