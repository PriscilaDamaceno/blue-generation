import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})

export class EntrarComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe(
      (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;

        environment.token = this.usuarioLogin.token;
        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.tipo = this.usuarioLogin.tipo;
        console.log(
          '🚀 ~ file: entrar.component.ts ~ line 33 ~ EntrarComponent ~ this.auth.entrar ~ environment',
          environment
        );

        this.router.navigate(['/inicio']);
      },
      (erro) => {
        if (erro.status == 401) {
          alert('Digite usuário e senha válidos!');
        }
      }
    );
  }
}