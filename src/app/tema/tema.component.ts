import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    if(environment.token == ''){
      alert('Sessão expirada! Faça o login.')
      this.router.navigate(['/entrar'])
    }
  }

}
