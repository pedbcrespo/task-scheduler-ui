import { Injectable } from '@angular/core';
import {Executavel} from '../models/executavel.model';
import {Parametro} from '../models/parametro.model';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExecutavelService {
    private executaveis: Executavel[] = [
        new Executavel(1, 'Testar o codigo', 'testar o codigo desenvolvido no curso de dev',
            'TaskTestarCodigo', [
                new Parametro('nomeRelatorio', 'Relatorio Testes Semanal'),
                new Parametro('dataInicio', '28/09/2021')
            ]),
        new Executavel(2, 'Atualizar os dados do painel de BI',
            'Atualiza o painel de BI com os últimos dados produzidos pelo sistema',
            'TaskAtualizarDadosBI',
            [
                new Parametro('nomePainel', 'Painel Analítico de Gastos')
            ]),
    ];

    listaExecutaveisSubject = new Subject<Executavel[]>();

    getRandomId(): number {
        return Math.floor(Math.random() * 100);
    }

    getExecutaveis(): Executavel[] {
        return this.executaveis.slice();
    }

    adicionarExecutavel(executavel: Executavel): void {
        this.executaveis.push(executavel);
        this.disparaEventoAtualizacaoListaExecutaveis();
    }

    removerExecutavel(id: number): void {
        const posicaoLista = this.executaveis.map((executavel: Executavel) => {
            return executavel.id;
        }).indexOf(id);
        this.executaveis.splice(posicaoLista, 1);
        this.disparaEventoAtualizacaoListaExecutaveis();
    }

    atualizarExecutavel(id: number, executavelAtualizado: Executavel): void {
        const posicaoLista = this.executaveis.map((executavel: Executavel) => {
            return executavel.id;
        }).indexOf(id);
        this.executaveis[posicaoLista] = executavelAtualizado;
        this.disparaEventoAtualizacaoListaExecutaveis();
    }

    getExecutavelPorId(id: number): Executavel {
        const executavel = this.executaveis.find(
            (executavelAtual: Executavel) => {
                console.log(executavelAtual);
                return executavelAtual.id == id;
            }
        );
        return executavel;
    }

    private disparaEventoAtualizacaoListaExecutaveis(): void {
        this.listaExecutaveisSubject.next(this.executaveis.slice());
    }
}
