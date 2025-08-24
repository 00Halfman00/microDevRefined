import mongoose from 'mongoose';

interface TicketAttrs {
  userId: string;
  title: string;
  price: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

interface TicketDoc extends mongoose.Document {
  userId: string;
  title: string;
  price: number;
}

const ticketSchema = new mongoose.Schema<TicketDoc>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        const transformedRet = ret as {
          _id?: any;
          __v?: any;
          id?: string;
          title: string;
          price: number;
          userId: string;
        };
        transformedRet.id = transformedRet._id;
        delete transformedRet._id;
        delete transformedRet.__v;

        return transformedRet;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
