import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JogoService } from '../../services/jogo';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastrar-jogo',
  styleUrl: './cadastrar-jogo.css',
  templateUrl: './cadastrar-jogo.html',
})
export class CadastrarJogo {
  private jogoService = inject(JogoService);
  private router = inject(Router);

  categorias = [...new Set(this.jogoService.listar().map((jogo) => jogo.categoria))];
  nome = '';
  descricao = '';
  categoria = this.categorias[0] ?? '';
  preco: number | null = 0;
  avaliacao: number | null = 0;
  imagem = '';
  disponivel = true;
  tentouSalvar = false;

  get nomeInvalido(): boolean {
    // Um nome só com espaços também é considerado vazio.
    return this.nome.trim().length === 0;
  }

  get precoInvalido(): boolean {
    return this.preco === null || !Number.isFinite(this.preco) || this.preco < 0;
  }

  get avaliacaoInvalida(): boolean {
    return this.avaliacao === null || !Number.isFinite(this.avaliacao)
      || this.avaliacao < 0 || this.avaliacao > 5;
  }

  salvar(): void {
    // Libera as mensagens de erro mesmo nos campos ainda não tocados.
    this.tentouSalvar = true;

    // Só cadastra quando os valores e a categoria são válidos.
    if (this.nomeInvalido || this.precoInvalido || this.avaliacaoInvalida
      || !this.categorias.includes(this.categoria)) {
      return;
    }

    this.jogoService.adicionar({
      nome: this.nome.trim(),
      descricao: this.descricao.trim(),
      categoria: this.categoria,
      preco: this.preco!,
      avaliacao: this.avaliacao!,
      // Usa uma capa padrão quando a URL não foi preenchida.
      imagem: this.imagem.trim() || 'images/jogo-placeholder.svg',
      disponivel: this.disponivel,
    });

    // Volta ao catálogo para mostrar o jogo recém-cadastrado.
    this.router.navigate(['/jogos']);
  }
}
