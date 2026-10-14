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
    this.tentouSalvar = true;

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
      imagem: this.imagem.trim() || 'images/jogo-placeholder.svg',
      disponivel: this.disponivel,
    });

    this.router.navigate(['/jogos']);
  }
}
