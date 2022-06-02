import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { Gif } from '../../gifs/interfaces/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get historial(){
    return this.gifsService.historial;
  }

  bucarEnLocalStorage(cadenaBusqueda: string){
  
    this.gifsService.buscarGifs(cadenaBusqueda);
  
  }
  
  constructor(private gifsService: GifsService) { }

 

}
