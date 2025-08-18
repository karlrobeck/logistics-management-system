-- LMS -> CRM Notifications triggers
-- Creates crm.notifications when LMS shipments change status or when key tracking events are inserted.
create or replace function lms.tg_notify_shipment_status_change()
  returns trigger
  language plpgsql
  as $$
declare
  notif_type crm.notification_type;
  contact uuid;
  recipient varchar(320);
  subj varchar(200);
  msg text;
begin
  if tg_op <> 'UPDATE' then
    return new;
  end if;
  if new.status is distinct from old.status then
    -- Map shipment status to CRM notification type
    case new.status
    when 'in_transit' then
      notif_type := 'in_transit';
    when 'out_for_delivery' then
      notif_type := 'out_for_delivery';
    when 'delivered' then
      notif_type := 'delivered';
    when 'exception' then
      notif_type := 'exception';
    else
      notif_type := null; -- created, picked_up, cancelled → no direct notification here
    end case;
    if notif_type is not null then
        contact := coalesce(new.receiver_contact_id, new.sender_contact_id); if contact is null then
            return new; -- nowhere to send
          end if;
      select
        c.email into recipient
      from
        crm.contacts c
      where
        c.id = contact;
      if recipient is null or length(btrim(recipient)) = 0 then
        return new;
      end if;
      subj :=
    left (format('Shipment %s: %s', new.tracking_number, notif_type),
      200);
      msg := format('Shipment %s status updated to %s.', new.tracking_number, notif_type);
      insert into crm.notifications(id, shipment_id, contact_id, notification_type, channel, recipient, subject, message, delivery_status)
        values (gen_random_uuid(), new.id, contact, notif_type, 'email', recipient, subj, msg, 'pending');
    end if;
  end if;
    return new;
end;
$$;

create or replace function lms.tg_notify_pickup_scheduled()
  returns trigger
  language plpgsql
  as $$
declare
  contact uuid;
  recipient varchar(320);
  subj varchar(200);
  msg text;
begin
  if tg_op <> 'UPDATE' then
    return new;
  end if;
  if old.pickup_date is null and new.pickup_date is not null then
    contact := coalesce(new.receiver_contact_id, new.sender_contact_id);
    if contact is null then
      return new;
    end if;
    select
      c.email into recipient
    from
      crm.contacts c
    where
      c.id = contact;
    if recipient is null or length(btrim(recipient)) = 0 then
      return new;
    end if;
    subj :=
  left (format('Shipment %s: pickup scheduled', new.tracking_number),
    200);
    msg := format('Pickup scheduled for shipment %s on %s.', new.tracking_number, new.pickup_date::text);
    insert into crm.notifications(id, shipment_id, contact_id, notification_type, channel, recipient, subject, message, delivery_status)
      values (gen_random_uuid(), new.id, contact, 'pickup_scheduled', 'email', recipient, subj, msg, 'pending');
  end if;
  return new;
end;
$$;

create or replace function lms.tg_notify_tracking_event()
  returns trigger
  language plpgsql
  as $$
declare
  notif_type crm.notification_type;
  contact uuid;
  recipient varchar(320);
  subj varchar(200);
  msg text;
  s record;
begin
  if tg_op <> 'INSERT' then
    return new;
  end if;
  -- Map tracking events to CRM notification types
  if new.event_type in ('out-for-delivery', 'delivered', 'exception', 'picked_up', 'departed') then
    case new.event_type
    when 'out-for-delivery' then
      notif_type := 'out_for_delivery';
    when 'delivered' then
      notif_type := 'delivered';
    when 'exception' then
      notif_type := 'exception';
    when 'picked_up' then
      notif_type := 'in_transit';
    when 'departed' then
      notif_type := 'in_transit';
    else
      notif_type := null;
    end case;
    if notif_type is not null then
        select
          id,
          receiver_contact_id,
          sender_contact_id,
          tracking_number into s
        from
          lms.shipments
        where
          id = new.shipment_id; contact := coalesce(s.receiver_contact_id, s.sender_contact_id); if contact is null then
              return new;
            end if;
      select
        c.email into recipient
      from
        crm.contacts c
      where
        c.id = contact;
      if recipient is null or length(btrim(recipient)) = 0 then
        return new;
      end if;
      -- simple de-duplication: avoid spamming identical notifications in a 10-minute window
      if exists (
        select
          1
        from
          crm.notifications n
        where
          n.shipment_id = new.shipment_id
          and n.notification_type = notif_type
          and n.created_at > now() - interval '10 minutes') then
      return new;
    end if;
    subj :=
  left (format('Shipment %s: %s', s.tracking_number, notif_type),
    200);
    msg := format('%s at %s (%s).', initcap(replace(new.event_type::text, '-', ' ')), coalesce(new.event_location, 'unknown location'), new.event_timestamp::text);
    insert into crm.notifications(id, shipment_id, contact_id, notification_type, channel, recipient, subject, message, delivery_status)
      values (gen_random_uuid(), new.shipment_id, contact, notif_type, 'email', recipient, subj, msg, 'pending');
  end if;
  end if;
  return new;
end;
$$;

-- Attach triggers
create trigger shipments_notify_status_change
  after update of status on lms.shipments for each row
  execute function lms.tg_notify_shipment_status_change();

comment on trigger shipments_notify_status_change on lms.shipments is 'Creates crm.notifications when shipment status changes to in_transit/out_for_delivery/delivered/exception.';

create trigger shipments_notify_pickup_scheduled
  after update of pickup_date on lms.shipments for each row
  when(old.pickup_date is distinct from new.pickup_date)
  execute function lms.tg_notify_pickup_scheduled();

comment on trigger shipments_notify_pickup_scheduled on lms.shipments is 'Creates crm.notifications when pickup_date is set (pickup scheduled).';

create trigger tracking_events_notify
  after insert on lms.tracking_events for each row
  execute function lms.tg_notify_tracking_event();

comment on trigger tracking_events_notify on lms.tracking_events is 'Creates crm.notifications for key tracking events (out-for-delivery, delivered, exception, in_transit via picked_up/departed).';

-- Comments on functions
comment on function lms.tg_notify_shipment_status_change() is 'AFTER UPDATE on lms.shipments: maps status transitions to CRM notifications.';

comment on function lms.tg_notify_pickup_scheduled() is 'AFTER UPDATE on lms.shipments: notifies when pickup_date is first set.';

comment on function lms.tg_notify_tracking_event() is 'AFTER INSERT on lms.tracking_events: notifies for key events, with simple duplicate suppression.';

