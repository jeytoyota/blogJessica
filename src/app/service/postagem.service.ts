import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('http://localhost:8080/postagens',this.token)
  }


  postPostagem(postagem: Postagem) : Observable<Postagem>{
    return this.http.post<Postagem>('http://localhost:8080/postagens', postagem, this.token)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`http://localhost:8080/usuarios/${id}`,this.token)
  }
}
