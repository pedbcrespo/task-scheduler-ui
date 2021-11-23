import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario.model';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios: Usuario[] = [
      new Usuario('Pedro Crespo', 'pedro-crespo@zgsolucoes.com.br', new Date(), '12345678')
  ];

  private usuarioLogado: Usuario;

  constructor(private router: Router) { }

  adicionaUsuario(usuario: Usuario): void{
    this.usuarios.push(usuario);
  }

  realizarLogin(email: string, senha: string): boolean {

    const usuarioValido = this.usuarios.find(usuario =>
    usuario.email === email && usuario.senha === senha
    );

    if (usuarioValido) {
      this.usuarioLogado = usuarioValido;
      this.router.navigate(['execucoes']);
    }

    return usuarioValido !== undefined;
  }

  existeUsuarioAutenticado(): boolean {
    return this.usuarioLogado !== undefined;
  }

  getNomeUsuarioLogado(): string {
    return this.usuarioLogado.nome;
  }

  realizarLogout(): void {
    this.usuarioLogado = undefined;
  }
}
