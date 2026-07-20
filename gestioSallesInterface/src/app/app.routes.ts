import { Routes } from '@angular/router';

import { SalleListComponent} from "./pages/salles/list/list";
import { SalleCreateComponent} from "./pages/salles/create/create";
import { SalleEditComponent} from "./pages/salles/edit/edit"
import { BatimentListComponent} from "./pages/batiments/list/list";
import { BatimentCreateComponent} from "./pages/batiments/create/create";
import { BatimentEditComponent} from "./pages/batiments/edit/edit"
import { Layout } from './layout/layout';
import { GestionComponentSwitch } from './pages/gestion-component-switch/gestion-component-switch';
export const routes: Routes = [


   {
    path: '',
    component: GestionComponentSwitch
  } 
// {
//   path:'',
//   component:Layout,
//   children:[

//     { path:'salles',
//     component: SalleListComponent },
//     {path:'salles/new',
//     component:SalleCreateComponent
//     },
//     {path: 'salles/edit/:id',
//     component: SalleEditComponent
//     },
//      { path:'batiments',
//     component: BatimentListComponent },
//     {path:'batiments/new',
//     component:BatimentCreateComponent
//     },
//     {path: 'batiments/edit/:id',
//     component: BatimentEditComponent
//     },
   

//   ]
// },

];
