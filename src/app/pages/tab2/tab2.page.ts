import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  @ViewChild(IonSegment) segment: IonSegment;
  categorias = [
    'business', 
    'entertainment', 
    'general', 
    'health', 
    'science', 
    'sports', 
    'technology'
  ];
  noticias: Article[] = [];
  constructor(private noticiasServ: NoticiasService) {
    
  }

  ngOnInit(): void {
    this.segment.value= this.categorias[0];
    this.cargarNoticiasPorCategorias(this.segment.value);
  }

  cambiarCategoria(event) {
    this.noticias = [];
    this.cargarNoticiasPorCategorias(event.detail.value);
  }

  cargarNoticiasPorCategorias(categoria: string, event?) {
    this.noticiasServ.getTopHeadlinesCategorias(categoria).subscribe( categorias => {
      this.noticias.push( ...categorias.articles);
      if(event) {
        event.target.complete();
      }
    });
  }

  cargarNoticiasScroll(event?) {
    this.cargarNoticiasPorCategorias(this.segment.value, event);
  }
}
