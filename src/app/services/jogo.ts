import { Injectable } from '@angular/core';
import { Jogo } from '../models/jogo';

@Injectable({ providedIn: 'root' })
export class JogoService {
  // Os cadastros ficam na memória e são perdidos ao recarregar a página.
  private jogos: Jogo[] = [
    {
      id: 1,
      nome: 'Minecraft',
      descricao: 'Explore um mundo de blocos e construa suas próprias aventuras.',
      categoria: 'Sandbox',
      preco: 99.90,
      avaliacao: 4.8,
      imagem: 'images/minecraft.jpg',
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Stardew Valley',
      descricao: 'Cuide de uma fazenda e conheça os moradores de uma pequena cidade.',
      categoria: 'Simulação',
      preco: 24.99,
      avaliacao: 4.9,
      imagem: 'images/Stardew_Valley.jpg',
      disponivel: true,
    },
    {
      id: 3,
      nome: 'Hollow Knight',
      descricao: 'Explore um reino subterrâneo e enfrente criaturas misteriosas.',
      categoria: 'Aventura',
      preco: 46.99,
      avaliacao: 4.9,
      imagem: 'images/hollow_knigth.jpg',
      disponivel: true,
    },
    {
      id: 4,
      nome: 'Celeste',
      descricao: 'Supere desafios de plataforma durante a escalada de uma montanha.',
      categoria: 'Plataforma',
      preco: 36.99,
      avaliacao: 4.8,
      imagem: 'images/celeste.jpg',
      disponivel: true,
    },
    {
      id: 5,
      nome: 'Portal 2',
      descricao: 'Resolva quebra-cabeças usando portais e raciocínio lógico.',
      categoria: 'Puzzle',
      preco: 32.99,
      avaliacao: 4.9,
      imagem: 'images/Portal_2.jpg',
      disponivel: true,
    },
    {
      id: 6,
      nome: 'Terraria',
      descricao: 'Explore, construa e enfrente inimigos em um mundo em duas dimensões.',
      categoria: 'Sandbox',
      preco: 19.99,
      avaliacao: 4.7,
      imagem: 'images/terraria.jpg',
      disponivel: true,
    },
    {
      id: 7,
      nome: 'The Witcher 3',
      descricao: 'Viva as aventuras de um caçador de monstros em um mundo de fantasia.',
      categoria: 'RPG',
      preco: 129.99,
      avaliacao: 4.8,
      imagem: 'images/The_Witcher_3.jpg',
      disponivel: false,
    },
    {
      id: 8,
      nome: 'Overcooked! 2',
      descricao: 'Prepare receitas em cozinhas divertidas e desafiadoras.',
      categoria: 'Simulação',
      preco: 59.90,
      avaliacao: 4.6,
      imagem: 'images/overcooked.jpg',
      disponivel: true,
    },
  ];

  listar(): Jogo[] {
    return this.jogos;
  }

  buscarPorId(id: number): Jogo | undefined {
    return this.jogos.find((jogo) => jogo.id === id);
  }

  adicionar(jogo: Omit<Jogo, 'id'>): void {
    // Usa o maior ID cadastrado como base para não repetir IDs.
    const id = Math.max(0, ...this.jogos.map((jogoExistente) => jogoExistente.id)) + 1;
    this.jogos.push({ ...jogo, id });
  }

  // Compara a categoria sem diferenciar maiúsculas e minúsculas.
  filtrarPorCategoria(categoria: string): Jogo[] {
    return this.jogos.filter(
      (jogo) => jogo.categoria.toLowerCase() === categoria.trim().toLowerCase(),
    );
  }

  // Aceita parte do nome e ignora espaços nas pontas da busca.
  buscarPorNome(nome: string): Jogo[] {
    return this.jogos.filter(
      (jogo) => jogo.nome.toLowerCase().includes(nome.trim().toLowerCase()),
    );
  }

  totalJogos(): number {
    return this.jogos.length;
  }
}
