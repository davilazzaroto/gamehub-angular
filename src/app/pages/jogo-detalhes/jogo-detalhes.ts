import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Jogo } from '../../models/jogo';
import { JogoService } from '../../services/jogo';

registerLocaleData(localePt);

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-jogo-detalhes',
  styleUrl: './jogo-detalhes.css',
  templateUrl: './jogo-detalhes.html',
})
export class JogoDetalhes {
  private route = inject(ActivatedRoute);
  private jogoService = inject(JogoService);
  private changeDetector = inject(ChangeDetectorRef);

  jogo: Jogo | undefined;

  constructor() {
    // Atualiza o jogo quando o ID da URL muda e encerra a escuta ao sair da página.
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((parametros) => {
      const parametroId = parametros.get('id');
      const id = Number(parametroId);

      // Só aceita um ID inteiro positivo, sem letras ou casas decimais.
      if (!parametroId || !/^\d+$/.test(parametroId) || !Number.isSafeInteger(id) || id <= 0) {
        this.jogo = undefined;
      } else {
        this.jogo = this.jogoService.buscarPorId(id);
      }

      // Sinaliza que a tela precisa refletir o resultado da busca.
      this.changeDetector.markForCheck();
    });
  }

  usarImagemProvisoria(event: Event): void {
    const imagem = event.target as HTMLImageElement;
    imagem.src = 'images/jogo-placeholder.svg';
  }
}
