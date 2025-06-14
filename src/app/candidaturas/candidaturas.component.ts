import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CandidaturaService } from '../services/candidatura.service';
import { CandidaturaResponse } from '../types/candidatura-response.type';

@Component({
  selector: 'app-candidaturas',
  templateUrl: './candidaturas.component.html',
  styleUrls: ['./candidaturas.component.css']
})
export class CandidaturasComponent implements OnChanges {
  @Input() userId!: number;
  candidaturas: CandidaturaResponse[] = [];

  constructor(private candidaturaService: CandidaturaService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.loadCandidaturas();
    }
  }

  loadCandidaturas(): void {
    this.candidaturaService.findAllByUsuarioId(this.userId).subscribe({
      next: data => this.candidaturas = data,
      error: err => console.error(err)
    });
  }

  verDetalhes(candidatura: CandidaturaResponse) {
  console.log('Detalhes da candidatura:', candidatura);
}

}
