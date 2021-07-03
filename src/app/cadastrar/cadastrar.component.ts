import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  @Output() cadastro: EventEmitter<void> = new EventEmitter();

  produto = {titulo : "", preco: 0.0, descricao: ""};

  constructor(private web : WebService) { }

  cadastrar() {
    this.web.cadastrarProduto(this.produto).subscribe(res => {
      if(res.ok == true) {
        alert("O cadastro foi realizado com sucesso");
        this.cadastro.emit();
        this.produto = {titulo : "", preco: 0.0, descricao: ""}
      } else {
        alert("O cadastro não foi realizado!");
      }
    });
  }

  ngOnInit(): void {
  }

}
