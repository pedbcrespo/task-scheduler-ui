import { Injectable } from '@angular/core';
import {Usuario} from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios: Usuario[] = [
      new Usuario('Pedro Crespo', 'pedro-crespo@zgsolucoes.com.br', new Date(), '123456')
  ];

  constructor() { }

  adicionaUsuario(usuario: Usuario): void{
    this.usuarios.push(usuario);
  }
}
