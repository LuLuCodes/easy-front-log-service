import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OpenApiLogDocument = OpenApiLog & Document;

@Schema()
export class OpenApiLog extends Document {
  @Prop({ required: true })
  app_key: string;

  @Prop({ required: true })
  host: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  method: string;

  @Prop(raw({}))
  request_parms: Record<string, any>;

  @Prop()
  response_status_code: number;

  @Prop(raw({}))
  response_parms: Record<string, any>;

  @Prop({ required: true })
  create_time: number;
}

export const OpenApiLogSchema = SchemaFactory.createForClass(OpenApiLog);
