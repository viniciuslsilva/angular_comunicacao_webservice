import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit, OnDestroy {

  @Input() produto: Produto;
  @Input() save: EventEmitter<void>;
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  atualizarSub: Subscription = null;

  constructor(private web : WebService) { }

  ngOnInit(): void {}

  cancelar() { this.cancel.emit(); }

  atualizar() {
    this.atualizarSub = this.web.atualizarProduto(this.produto).subscribe(
      () => {
        alert('Operação realizada com sucesso!');
        this.save.emit();
      },
      () => alert('Erro! Operação não realizada!'),
    );
  }

  ngOnDestroy() {
    if (this.atualizarSub) { this.atualizarSub.unsubscribe(); }
  }
}