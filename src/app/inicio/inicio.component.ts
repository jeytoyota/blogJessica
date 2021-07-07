import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTema: Tema[]
  idTema: number

  user: User =  new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert('Sessão expirada! Faça o login.')
      this.router.navigate(['/entrar'])
    }

    this.getAllTema()
    this.getAllPostagens()
    
  }

  getAllTema(){
    
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTema = resp
    })
  }

  findByIdTema(){
    
    this.temaService.getById(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  findByIdUser(){
    
    this.postagemService.getByIdUser(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })
  }

  getAllPostagens(){
    
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  publicar(){
    
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!!!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
