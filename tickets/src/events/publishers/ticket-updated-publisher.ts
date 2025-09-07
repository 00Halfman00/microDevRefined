import { Publisher, Subjects, TicketUpdatedEvent } from '@00tickets00/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
