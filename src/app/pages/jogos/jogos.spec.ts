import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Jogos } from './jogos';
import { JogoService } from '../../services/jogo';

describe('Jogos', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jogos],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('combina os campos de busca e categoria sem alterar o catálogo original', async () => {
    const fixture = TestBed.createComponent(Jogos);
    await fixture.whenStable();
    const pagina = fixture.nativeElement as HTMLElement;
    const busca = pagina.querySelector('input')!;
    const categoria = pagina.querySelector('select')!;

    expect(pagina.querySelectorAll('app-jogo-card').length).toBe(8);

    busca.value = '  MINE  ';
    busca.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    categoria.value = 'Sandbox';
    categoria.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect(pagina.querySelectorAll('app-jogo-card').length).toBe(1);
    expect(pagina.querySelector('app-jogo-card h2')?.textContent).toBe('Minecraft');
    expect(pagina.querySelector('app-jogo-card a')?.getAttribute('href')).toBe('/jogos/1');

    categoria.value = 'RPG';
    categoria.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect(pagina.querySelectorAll('app-jogo-card').length).toBe(0);
    expect(pagina.textContent).toContain('Nenhum jogo corresponde aos filtros informados.');
    expect(pagina.textContent).toContain('Resultados encontrados: 0');

    busca.value = '';
    busca.dispatchEvent(new Event('input'));
    categoria.value = '';
    categoria.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect(pagina.querySelectorAll('app-jogo-card').length).toBe(8);
    expect(TestBed.inject(JogoService).totalJogos()).toBe(8);
  });
});
