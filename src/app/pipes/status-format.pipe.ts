
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFormat'
})
export class StatusFormatPipe implements PipeTransform {
  transform(value: string): string {
    const mapa: Record<string, string> = {
      AGUARDANDO_RESPOSTA: 'Aguardando resposta',
      SEM_RESPOSTA: 'Sem resposta',
      RESPOSTA_POSITIVA: 'Resposta positiva',
      RESPOSTA_NEGATIVA: 'Resposta negativa'
    };

    return mapa[value] || value;
  }
}
