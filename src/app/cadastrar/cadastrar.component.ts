import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  @Output() cadastro: EventEmitter<void> = new EventEmitter();

  produto = {title : "", price: 0.0, description: ""};

  constructor(private web : WebService) { }

  cadastrar() {
    this.web.cadastrarProduto(this.produto).subscribe(res => {
      if(res.ok == true) {
        alert("O cadastro foi realizado com sucesso");
        this.cadastro.emit();
        this.produto = {title : "", price: 0.0, description: ""}
      } else {
        alert("O cadastro não foi realizado!");
      }
    });
  }

  ngOnInit(): void {
  }

}
