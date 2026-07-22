import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Batiment } from '../models/batiment';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})
export class BatimentService {
private http = inject(HttpClient)
private api = `${environment.apiUrl}/Batiment`

getBatiments():Observable<Batiment[]>{
    return this.http.get<Batiment[]>(this.api)
}
getBatimentById(id: number):Observable<Batiment>{
    return this.http.get<Batiment>(`${this.api}/${id}`)
}
createBatiment(batiment: Batiment):Observable<Batiment>{
    return this.http.post<Batiment>(this.api,batiment);
}
updateBatiment(id:number,batiment: Batiment):Observable<Batiment>{
    return this.http.put<Batiment>(`${this.api}/${id}`,batiment)
}
deleteBatiment(id:number):Observable<Batiment>{
    return this.http.delete<Batiment>(`${this.api}/${id}`)
}
getAdresse(latitude: number, longitude: number) {
    return this.http.get<any>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
  }

}
