import { withForm } from '@/components/ui/form';
import { CrmNotificationsInsert, CrmNotificationsUpdate } from '@/db/schemas';
import {
  CrmNotificationChannel,
  CrmNotificationDeliveryStatus,
  CrmNotificationType,
} from '@/db/types';

const CreateCrmNotificationForm = withForm({
  defaultValues: {} as CrmNotificationsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="subject">
          {(field) => <field.TextField label="Subject" type="text" />}
        </form.AppField>
        <form.AppField name="message">
          {(field) => <field.TextField label="Message" type="text" />}
        </form.AppField>
        <form.AppField name="recipient">
          {(field) => <field.TextField label="Recipient" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="sentAt">
          {(field) => <field.TextField label="Sent At" type="datetime-local" />}
        </form.AppField>
        <form.AppField name="channel">
          {(field) => (
            <field.SelectField
              label="Channel"
              placeholder="Select notification channel"
              options={Object.values(CrmNotificationChannel).map((channel) => ({
                label: channel.toUpperCase(),
                value: channel,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="deliveryStatus">
          {(field) => (
            <field.SelectField
              label="Delivery Status"
              placeholder="Select delivery status"
              options={Object.values(CrmNotificationDeliveryStatus).map(
                (status) => ({
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  value: status,
                }),
              )}
            />
          )}
        </form.AppField>
        <form.AppField name="notificationType">
          {(field) => (
            <field.SelectField
              label="Notification Type"
              placeholder="Select notification type"
              options={Object.values(CrmNotificationType).map((type) => ({
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

const UpdateCrmNotificationForm = withForm({
  defaultValues: {} as CrmNotificationsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="subject">
          {(field) => <field.TextField label="Subject" type="text" />}
        </form.AppField>
        <form.AppField name="message">
          {(field) => <field.TextField label="Message" type="text" />}
        </form.AppField>
        <form.AppField name="recipient">
          {(field) => <field.TextField label="Recipient" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="sentAt">
          {(field) => <field.TextField label="Sent At" type="datetime-local" />}
        </form.AppField>
        <form.AppField name="channel">
          {(field) => (
            <field.SelectField
              label="Channel"
              placeholder="Select notification channel"
              options={Object.values(CrmNotificationChannel).map((channel) => ({
                label: channel.toUpperCase(),
                value: channel,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="deliveryStatus">
          {(field) => (
            <field.SelectField
              label="Delivery Status"
              placeholder="Select delivery status"
              options={Object.values(CrmNotificationDeliveryStatus).map(
                (status) => ({
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  value: status,
                }),
              )}
            />
          )}
        </form.AppField>
        <form.AppField name="notificationType">
          {(field) => (
            <field.SelectField
              label="Notification Type"
              placeholder="Select notification type"
              options={Object.values(CrmNotificationType).map((type) => ({
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

export { CreateCrmNotificationForm, UpdateCrmNotificationForm };
