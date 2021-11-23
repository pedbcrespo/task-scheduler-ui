import { Component, OnInit, OnDestroy } from '@angular/core';
import {Agendamento} from '../../models/agendamento.model';
import {AgendamentoService} from '../../services/agendamento.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {
  agendamentos: Agendamento[];
  inscricao: Subscription;
  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
    this.inscricao = this.agendamentoService.listaAgendamentosSubject.subscribe(
        (agendamentos) => {
          return this.agendamentos = agendamentos;
        }
    );
    this.agendamentos = this.agendamentoService.getAgendamentos();
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  onRemoverAgendamento(agendamento): void {
    if (confirm('Deseja remover' + agendamento.executavel.titulo + '?')){
      this.agendamentoService.removerAgendamento(agendamento.id);
    }
  }

}
