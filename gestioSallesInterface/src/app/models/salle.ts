import { Batiment } from "./batiment";
import { Faculte } from "./faculte";

export interface Salle {
    id?:string;
    intitule:string;
    capacite:number;
    capacite_exam:number;
    categorie:string;
    surface:number;
    etage:string;
    faculteId:string;
    batimentId:string;
    faculte?:Faculte;
    batiment?:Batiment;
}
