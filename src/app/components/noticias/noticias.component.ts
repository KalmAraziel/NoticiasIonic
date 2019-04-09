import { Component, OnInit, Input } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false;
  constructor(private noticiasServices: NoticiasService) { }

  ngOnInit() {

  }

}
