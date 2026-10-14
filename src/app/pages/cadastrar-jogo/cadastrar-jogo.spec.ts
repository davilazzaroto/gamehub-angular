import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { CadastrarJogo } from './cadastrar-jogo';
import { Jogos } from '../jogos/jogos';
import { JogoService } from '../../services/jogo';

describe('CadastrarJogo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([
        { path: 'cadastrar', component: CadastrarJogo },
        { path: 'jogos', component: Jogos },
      ])],
    });
  });

  it('cadastra pelo formulário e mostra o novo jogo no catálogo', async () => {
    const harness = await RouterTestingHarness.create('/cadastrar');
    await harness.fixture.whenStable();
    const pagina = harness.routeNativeElement!;
    const nome = pagina.querySelector<HTMLInputElement>('#nome')!;
    nome.value = '  Novo jogo  ';
    nome.dispatchEvent(new Event('input'));
    await harness.fixture.whenStable();
    pagina.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/jogos');
    expect(harness.routeNativeElement?.textContent).toContain('Novo jogo');
    expect(harness.routeNativeElement?.querySelectorAll('app-jogo-card').length).toBe(9);
    const service = TestBed.inject(JogoService);
    expect(service.buscarPorId(9)?.nome).toBe('Novo jogo');
    expect(service.buscarPorId(9)?.preco).toBe(0);
    expect(service.buscarPorId(9)?.imagem).toBe('images/jogo-placeholder.svg');

    const { id, ...dados } = service.buscarPorId(9)!;
    service.adicionar(dados);
    expect(service.buscarPorId(10)).toBeDefined();
    expect(new Set(service.listar().map((jogo) => jogo.id)).size).toBe(10);
  });

  it.each([
    ['', 0, 0],
    ['   ', 0, 0],
    ['Teste', -1, 0],
    ['Teste', null, 0],
    ['Teste', 0, -1],
    ['Teste', 0, 6],
    ['Teste', 0, null],
  ])('impede dados inválidos: %s, %s, %s', async (nome, preco, avaliacao) => {
    const harness = await RouterTestingHarness.create();
    const componente = await harness.navigateByUrl('/cadastrar', CadastrarJogo);
    componente.nome = nome;
    componente.preco = preco;
    componente.avaliacao = avaliacao;
    componente.salvar();
    harness.detectChanges();

    expect(TestBed.inject(JogoService).totalJogos()).toBe(8);
    expect(TestBed.inject(Router).url).toBe('/cadastrar');
    expect(harness.routeNativeElement?.querySelector('.erro')).not.toBeNull();
  });
});
