import { HttpClient } from '@angular/common/http'; // Importation du module HttpClient pour effectuer des requêtes HTTP
import { inject, Injectable } from '@angular/core'; // Importation du décorateur Injectable pour marquer la classe comme un service injectable injectable est un décorateur qui permet de marquer une classe comme un service injectable dans Angular. Cela signifie que cette classe peut être injectée dans d'autres composants ou services pour être utilisée.
import { Observable } from 'rxjs'; // observable est un type qui représente une séquence de valeurs ou d'événements futurs. Il est utilisé pour gérer les flux de données asynchrones dans Angular.
import { Salle } from '../models/salle'; 
import { environment } from '../../environments/environment';
import { Specification } from '../models/Specification';

@Injectable({
  providedIn: 'root'
})  // Le décorateur @Injectable indique que ce service peut être injecté dans d'autres composants ou services. Le paramètre providedIn: 'root' signifie que ce service sera disponible dans toute l'application.
export class SalleService {
  private http =inject(HttpClient);
  private api=`${environment.apiUrl}/Salle`;
   
  getSalles():Observable<Salle[]>{
    return this.http.get<Salle[]>(this.api);
  }
  getSalleById(id: number):Observable<Salle>{
    return this.http.get<Salle>(`${this.api}/${id}`)
  };
  createSalle(salle: Salle):Observable<Salle>{
    return this.http.post<Salle>(this.api,salle);
  };
  updateSalle(id:number,salle: Salle):Observable<Salle>{
    return this.http.put<Salle>(`${this.api}/${id}`,salle);
  };
  deleteSalle(id: number):Observable<Salle>{
    return this.http.delete<Salle>(`${this.api}/${id}`)
  }
  getSpecifications(): Observable<Specification[]>{
    return this.http.get<Specification[]>(`${this.api}/specifications`)
  }
  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`${this.api}/Categories`)
  }
 changeEtat(id: number) {
  return this.http.patch(`${this.api}/${id}/etat`, {});
}


}