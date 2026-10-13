import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jogos } from './pages/jogos/jogos';
import { JogoDetalhes } from './pages/jogo-detalhes/jogo-detalhes';
import { CadastrarJogo } from './pages/cadastrar-jogo/cadastrar-jogo';
import { Sobre } from './pages/sobre/sobre';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'jogos', component: Jogos },
  { path: 'jogos/:id', component: JogoDetalhes },
  { path: 'cadastrar', component: CadastrarJogo },
  { path: 'sobre', component: Sobre },
  { path: '**', redirectTo: '' },
];
