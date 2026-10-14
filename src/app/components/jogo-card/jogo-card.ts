import { Component, Input } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterLink } from '@angular/router';
import { Jogo } from '../../models/jogo';

registerLocaleData(localePt);

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-jogo-card',
  styleUrl: './jogo-card.css',
  templateUrl: './jogo-card.html',
})
export class JogoCard {
  @Input({ required: true }) jogo!: Jogo;

  get classificacao(): string {
    if (this.jogo.avaliacao >= 4) {
      return 'Excelente';
    }
    if (this.jogo.avaliacao >= 3) {
      return 'Bom';
    }
    return 'Regular';
  }

  usarImagemProvisoria(event: Event): void {
    const imagem = event.target as HTMLImageElement;
    imagem.src = 'images/jogo-placeholder.svg';
  }
}
