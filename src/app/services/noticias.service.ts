import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';

const apiKey =environment.apiKey;
const url = environment.url;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  categoriaActual= '';
  categoriaPage = 0;
  headlinesPage = 0;
  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = url + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategorias(categoria: string) {
    if(categoria === this.categoriaActual){
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`)
  }
}
