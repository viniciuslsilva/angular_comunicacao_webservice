import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Produto } from './Produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tutorialWebservice';
  produto: Produto;

  save: EventEmitter<void> = new EventEmitter();
  cancel: EventEmitter<void> = new EventEmitter();

  saveSub: Subscription = null;

  ngOnInit() {
    this.saveSub = this.save.subscribe(() => this.produto = null);
  }

  ngOnDestroy() {
    if (this.saveSub) { this.saveSub.unsubscribe(); }
  }

  novoCadastro(event) {
    this.save.emit();
  }
}