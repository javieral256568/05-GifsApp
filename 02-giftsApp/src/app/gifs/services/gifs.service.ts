import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
//RdykGbRf5ExsikDuLoGkRVCt8OyLaJdm

  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private api_key: string = 'RdykGbRf5ExsikDuLoGkRVCt8OyLaJdm';
  private _historial:string[] = [];

  // Nota: Inicialmente es ANY despues cambua a su tipo Gif (interface).
  public resultados: Gif[] = [];

  get historial(){
    
    return [...this._historial];
  }

  buscarGifs(query:string = ''){
    //https://api.giphy.com/v1/gifs/search?api_key=RdykGbRf5ExsikDuLoGkRVCt8OyLaJdm&q=cat&limit=10

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

      
    }
  
    console.log('Historial:', this._historial)

    const parametros = new HttpParams()
        .set('api_key',this.api_key)
        .set('limit','10')
        .set('q',query);
      


    //SearchGifsResponse se genera con el JSON del API usando la pagina: https://app.quicktype.io/
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`,{ params: parametros })
    .subscribe( (response) => {
        console.log(response.data);    
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));  
    })
  


    
  }



  constructor(private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')! );
      
    } 
    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
      console.log('resultados:',this.resultados)
    }
    
  }



/*  Segunda forma para consumir el servicio (Obsoleta)
  async buscarGifs(query:string = ''){
    //https://api.giphy.com/v1/gifs/search?api_key=RdykGbRf5ExsikDuLoGkRVCt8OyLaJdm&q=cat&limit=10

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
  
    console.log('Historial:', this._historial)

    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=RdykGbRf5ExsikDuLoGkRVCt8OyLaJdm&q=cat&limit=10')
    const data = await resp.json();

    console.log(data);

  }
*/

/*  Primera forma para consumir el servicio (Obsoleta)
  buscarGifs(query:string = ''){
    //https://api.giphy.com/v1/gifs/search?api_key=RdykGbRf5ExsikDuLoGkRVCt8OyLaJdm&q=cat&limit=10

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
  
    console.log('Historial:', this._historial)

    fetch('https://api.giphy.com/v1/gifs/search?api_key=RdykGbRf5ExsikDuLoGkRVCt8OyLaJdm&q=cat&limit=10')
    .then(response => {
        response.json().then(data => {
            console.log(data);
        })
    } )

  }*/


}
