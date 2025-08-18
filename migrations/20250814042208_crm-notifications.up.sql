-- Add up migration script here
create type crm.notification_type as enum(
  'pickup_scheduled',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception',
  'delayed'
);

-- Type documentation
comment on type crm.notification_type is 'Kinds of shipment/customer notifications triggered by events.';

create type crm.notification_channel as enum(
  'email',
  'sms',
  'push',
  'webhook'
);

comment on type crm.notification_channel is 'Delivery channels used to send notifications.';

create type crm.notification_delivery_status as enum(
  'pending',
  'sent',
  'delivered',
  'failed',
  'bounced'
);

comment on type crm.notification_delivery_status is 'Delivery/transport status of a notification message.';

create table crm.notifications(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  contact_id uuid not null references crm.contacts(id),
  notification_type crm.notification_type not null,
  channel crm.notification_channel not null,
  recipient varchar(320) not null,
  subject varchar(200),
  message text not null,
  sent_at timestamptz,
  delivery_status crm.notification_delivery_status not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Indexes for crm.notifications
create index idx_crm_notifications_shipment on crm.notifications(shipment_id);

create index idx_crm_notifications_contact on crm.notifications(contact_id);

create index idx_crm_notifications_type on crm.notifications(notification_type);

create index idx_crm_notifications_channel on crm.notifications(channel);

create index idx_crm_notifications_status on crm.notifications(delivery_status);

create index idx_crm_notifications_sent_at on crm.notifications(sent_at);

create index idx_crm_notifications_created_at on crm.notifications(created_at);

-- Trigger functions for CRM notifications
create or replace function crm.tg_notifications_trim_and_validate()
  returns trigger
  language plpgsql
  as $$
begin
  if new.recipient is not null then
    new.recipient := btrim(new.recipient);
  end if;
  if new.subject is not null then
    new.subject := btrim(new.subject);
  end if;
  if new.message is not null then
    new.message := btrim(new.message);
  end if;
  return new;
end;
$$;

-- Triggers for CRM notifications
create trigger notifications_set_updated_at
  before update on crm.notifications for each row
  execute function crm.tg_set_updated_at();

create trigger notifications_trim_and_validate
  before insert or update on crm.notifications for each row
  execute function crm.tg_notifications_trim_and_validate();

-- Comments on functions and triggers
comment on function crm.tg_notifications_trim_and_validate() is 'BEFORE INSERT/UPDATE on crm.notifications: trims recipient, subject, and message.';

comment on trigger notifications_set_updated_at on crm.notifications is 'Keeps notifications.updated_at current on updates.';

comment on trigger notifications_trim_and_validate on crm.notifications is 'Trims text fields before write.';

-- Table and column documentation: crm.notifications
comment on table crm.notifications is 'Outbound notifications about shipment milestones or exceptions.';

comment on column crm.notifications.id is 'Primary key: UUID for the notification.';

comment on column crm.notifications.shipment_id is 'FK to lms.shipments(id) that the notification concerns.';

comment on column crm.notifications.contact_id is 'FK to crm.contacts(id) designated to receive the message.';

comment on column crm.notifications.notification_type is 'Notification type/category.';

comment on column crm.notifications.channel is 'Channel used to deliver the notification.';

comment on column crm.notifications.recipient is 'Recipient address/identifier (email/phone/webhook URL).';

comment on column crm.notifications.subject is 'Optional subject/title for the message (email-like).';

comment on column crm.notifications.message is 'Message body (rendered content).';

comment on column crm.notifications.sent_at is 'Timestamp when the message was sent (if applicable).';

comment on column crm.notifications.delivery_status is 'Delivery result (pending/sent/delivered/failed/bounced).';

comment on column crm.notifications.created_at is 'Row creation timestamp (UTC).';

comment on column crm.notifications.updated_at is 'Row last-updated timestamp (UTC).';

