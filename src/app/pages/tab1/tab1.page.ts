import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  constructor(private noticiasServices: NoticiasService){
    
  }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticiasScroll(event) {
    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasServices.getTopHeadlines().subscribe( data => {
      // desabilito scroll cuando no vengan noticias
      if(data.articles.length === 0) {
        event.target.disabled = true;
        return;
      }
      
      // muchos arreglos a una por vez evitar foreach
      this.noticias.push(...data.articles);
      // si existe evento completo el infinite scroll
      if(event){
        event.target.complete();
      }
    })
  }
}
