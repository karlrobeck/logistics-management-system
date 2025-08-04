import { withForm } from '@/components/ui/form';
import { LmsTrackingEventsInsert, LmsTrackingEventsUpdate } from '@/db/schemas';
import { LmsTrackingEventType } from '@/db/types';

const CreateLmsTrackingEventForm = withForm({
  defaultValues: {} as LmsTrackingEventsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="eventDescription">
          {(field) => <field.TextField label="Event Description" type="text" />}
        </form.AppField>
        <form.AppField name="eventLocation">
          {(field) => <field.TextField label="Event Location" type="text" />}
        </form.AppField>
        <form.AppField name="eventTimestamp">
          {(field) => (
            <field.TextField label="Event Timestamp" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="eventType">
          {(field) => (
            <field.SelectField
              label="Event Type"
              placeholder="Select event type"
              options={Object.values(LmsTrackingEventType).map((type) => ({
                label: type
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: type,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsTrackingEventForm = withForm({
  defaultValues: {} as LmsTrackingEventsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="eventDescription">
          {(field) => <field.TextField label="Event Description" type="text" />}
        </form.AppField>
        <form.AppField name="eventLocation">
          {(field) => <field.TextField label="Event Location" type="text" />}
        </form.AppField>
        <form.AppField name="eventTimestamp">
          {(field) => (
            <field.TextField label="Event Timestamp" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="eventType">
          {(field) => (
            <field.SelectField
              label="Event Type"
              placeholder="Select event type"
              options={Object.values(LmsTrackingEventType).map((type) => ({
                label: type
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: type,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsTrackingEventForm, UpdateLmsTrackingEventForm };
