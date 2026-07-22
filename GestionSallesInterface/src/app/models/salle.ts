import { Batiment } from "./batiment";
import { Faculte } from "./faculte";
import { Specification } from "./Specification";
export interface Salle {
    id?:number;
    intitule:string;
    capacite:number;
    capacite_exam:number;
    categorie:string;
    surface:number;
    etage:string;
    faculteId:number;
    batimentId:number;
    faculte?:Faculte;
    batiment?:Batiment;
    specifications:Specification[];
}
