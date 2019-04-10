import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;
  constructor(
    private iab: InAppBrowser, 
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalServ: DataLocalService,
    private platform: Platform
  ) { 

  }

  ngOnInit() { }

  
  
  verDetalleNoticias() {
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
    if(this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Eliminar de Favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Delete Favorito clicked');
          this.dataLocalServ.borrarNoticiaFavorito(this.noticia);
        }
      };

    } else {
      guardarBorrarBtn = {
        text: 'Agregar a Favoritos',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito clicked');
          this.dataLocalServ.guardarNoticia(this.noticia);
        }
      };
    }
    const actionSheet = await this.actionSheetController.create({
     
      buttons: [ {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.compartirNoticias();
          

        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  compartirNoticias() {
    if (this.platform.is('cordova') ) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if (navigator['share']) {
        navigator['share']({
            title: this.noticia.title,
            text: this.noticia.description,
            url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se pudo compartir por que el navegador no soporta share');
      }
    }
    
  }
}
