import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit, OnDestroy {

  listaProdutos: Produto[];

  @Input() save: EventEmitter<void>;
  @Output() produto: EventEmitter<Produto> = new EventEmitter();

  saveSub: Subscription = null;
  deletarSub: Subscription = null;
  carregarSub: Subscription = null;

  constructor(private web : WebService) { }

  carregarProdutos() : void {
    this.carregarSub = this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
    });
  }

  ngOnInit(): void {
    this.carregarProdutos();
    this.saveSub = this.save.subscribe(() => {
      this.carregarProdutos();
    });
  }

  deletarProduto(id: string) {
    this.deletarSub = this.web.deletarProduto(id).subscribe(
      () => {
        alert('Produto deletado com sucesso!');
        this.carregarProdutos();
      },
      () => alert('Ops! Algum erro aconteceu...'),
    );
  }

  atualizarProduto(produto: Produto) {
    this.produto.emit({ ...produto });
  }

  ngOnDestroy() {
    if (this.saveSub) { this.saveSub.unsubscribe(); }
    if (this.deletarSub) { this.deletarSub.unsubscribe(); }
    if (this.carregarSub) { this.carregarSub.unsubscribe(); }
  }
}