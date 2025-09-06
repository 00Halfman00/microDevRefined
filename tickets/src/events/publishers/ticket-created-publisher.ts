import { Publisher, Subjects, TicketCreatedEvent } from '@00tickets00/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
