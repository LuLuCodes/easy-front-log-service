import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OpenApiLogDocument = OpenApiLog & Document;

@Schema()
export class OpenApiLog extends Document {
  @Prop({ required: true })
  app_key: string;

  @Prop({ required: true })
  from_ip: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  method: string;

  @Prop(raw({}))
  request_session: Record<string, any>;

  @Prop(raw({}))
  request_params: Record<string, any>;

  @Prop(raw({}))
  request_query: Record<string, any>;

  @Prop(raw({}))
  request_body: Record<string, any>;

  @Prop()
  referer: string;

  @Prop()
  ua: string;

  @Prop()
  response_status_code: number;

  @Prop(raw({}))
  response_data: Record<string, any>;

  @Prop({ required: true })
  request_time: number;

  @Prop({ required: true })
  display_time: string;

  @Prop({ required: true })
  created_at: Date;
}

const LogSchema = SchemaFactory.createForClass(OpenApiLog);
LogSchema.index({
  app_key: 1,
  from_ip: 1,
  url: 1,
  method: 1,
  request_time: 1,
  display_time: 1,
});
LogSchema.index(
  {
    created_at: 1,
  },
  { expires: '30d' },
);

export const OpenApiLogSchema = LogSchema;
