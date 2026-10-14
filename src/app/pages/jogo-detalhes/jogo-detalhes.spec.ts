import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { JogoDetalhes } from './jogo-detalhes';
import { JogoService } from '../../services/jogo';

describe('JogoDetalhes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'jogos/:id', component: JogoDetalhes }])],
    });
  });

  it('exibe os dados do service e acompanha a mudança de ID', async () => {
    const harness = await RouterTestingHarness.create();
    const componente = await harness.navigateByUrl('/jogos/1', JogoDetalhes);
    expect(componente.jogo).toBe(TestBed.inject(JogoService).buscarPorId(1));
    expect(harness.routeNativeElement?.textContent).toContain('Minecraft');
    expect(harness.routeNativeElement?.querySelector('img')?.getAttribute('src')).toBe('images/minecraft.jpg');
    expect(harness.routeNativeElement?.querySelector('a')?.getAttribute('href')).toBe('/jogos');

    await harness.navigateByUrl('/jogos/7');
    expect(harness.routeNativeElement?.textContent).toContain('The Witcher 3');
    expect(harness.routeNativeElement?.textContent).toContain('Indisponível');

    await harness.navigateByUrl('/jogos/invalido');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Jogo não encontrado');
  });

  it.each(['abc', '0', '-1', '1.5', 'Infinity', '1e0', '999', '9007199254740992'])(
    'trata o ID %s sem lançar erro', async (id) => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(`/jogos/${id}`);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Jogo não encontrado');
      expect(harness.routeNativeElement?.querySelector('a')?.getAttribute('href')).toBe('/jogos');
    },
  );
});
