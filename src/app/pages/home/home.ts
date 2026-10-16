import { Component, inject } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterLink } from '@angular/router';
import { JogoService } from '../../services/jogo';

registerLocaleData(localePt);

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private jogoService = inject(JogoService);

  totalJogos = this.jogoService.totalJogos();
  totalGratuitos = this.jogoService.listar().filter((jogo) => jogo.preco === 0).length;
  // Os destaques seguem a ordem do catálogo, sem ordenar pela avaliação.
  jogosDestaque = this.jogoService.listar().slice(0, 4);

  usarImagemProvisoria(event: Event): void {
    const imagem = event.target as HTMLImageElement;
    imagem.src = 'images/jogo-placeholder.svg';
  }
}
