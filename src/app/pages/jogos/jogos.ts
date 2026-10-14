import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JogoCard } from '../../components/jogo-card/jogo-card';
import { JogoService } from '../../services/jogo';

@Component({
  imports: [FormsModule, JogoCard],
  selector: 'app-jogos',
  styleUrl: './jogos.css',
  templateUrl: './jogos.html',
})
export class Jogos {
  private jogoService = inject(JogoService);

  nomeBusca = '';
  categoriaSelecionada = '';
  jogos = this.jogoService.listar();
  categorias = [...new Set(this.jogoService.listar().map((jogo) => jogo.categoria))];

  aplicarFiltros(): void {
    let resultados = this.jogoService.buscarPorNome(this.nomeBusca);

    if (this.categoriaSelecionada !== '') {
      const jogosDaCategoria = this.jogoService.filtrarPorCategoria(this.categoriaSelecionada);
      resultados = resultados.filter((jogo) =>
        jogosDaCategoria.some((jogoDaCategoria) => jogoDaCategoria.id === jogo.id),
      );
    }

    this.jogos = resultados;
  }
}
