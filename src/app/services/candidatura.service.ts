import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidaturaResponse } from '../types/candidatura-response.type';

@Injectable({
  providedIn: 'root'
})

export class CandidaturaService {
  private apiUrl = 'http://localhost:8081/candidaturas';

  constructor(private http: HttpClient) {}

  findAllByUsuarioId(id: number): Observable<CandidaturaResponse[]> {
    return this.http.get<CandidaturaResponse[]>(`${this.apiUrl}/${id}`);
  }
}
