import { Injectable, inject } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Faculte } from '../models/faculte';

@Injectable({providedIn: 'root'}) //dispo dans tout l'app

export class FaculteService {
    private http = inject(HttpClient);
    private api = `${environment.apiUrl}/Faculte`

    getFacultes():Observable<Faculte[]>{
        return this.http.get<Faculte[]>(this.api);
    }
    getFaculteById(id: number):Observable<Faculte>{
        return this.http.get<Faculte>(`${this.api}/${id}`)
    }
    createFaculte(faculte: Faculte):Observable<Faculte>{
       return this.http.post<Faculte>(this.api,faculte);
    }
    updateFaculte(id: number,faculte: Faculte):Observable<Faculte>{
        return this.http.put<Faculte>(`${this.api}/${id}`,faculte)
    }
    deleteFaculte(id: number):Observable<Faculte>{
        return this.http.delete<Faculte>(`${this.api}/${id}`)
    }
    

}
