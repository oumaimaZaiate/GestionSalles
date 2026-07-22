import { Routes } from '@angular/router';

import { SalleListComponent} from "./pages/salles/list/list";
import { SalleCreateComponent} from "./pages/salles/create/create";
import { SalleEditComponent} from "./pages/salles/edit/edit"
import { BatimentListComponent} from "./pages/batiments/list/list";
import { BatimentCreateComponent} from "./pages/batiments/create/create";
import { BatimentEditComponent} from "./pages/batiments/edit/edit"
import { GestionComponentSwitch } from './pages/gestion-component-switch/gestion-component-switch';
export const routes: Routes = [


   {
    path: '',
    component: GestionComponentSwitch
  } 

];
