import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RouterTestingHarness } from '@angular/router/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the menu and router outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-menu')?.textContent).toContain('GameHub');
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it.each([
    ['/', 'Bem-vindo ao GameHub'],
    ['/jogos', 'Jogos'],
    ['/jogos/1', 'Minecraft'],
    ['/cadastrar', 'Cadastrar jogo'],
    ['/sobre', 'Sobre'],
    ['/pagina-inexistente', 'Bem-vindo ao GameHub'],
  ])('should render %s', async (url, titulo) => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe(titulo);
  });
});
