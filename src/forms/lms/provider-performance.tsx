import { withForm } from '@/components/ui/form';
import {
  LmsProviderPerformanceInsert,
  LmsProviderPerformanceUpdate,
} from '@/db/schemas';

const CreateLmsProviderPerformanceForm = withForm({
  defaultValues: {} as LmsProviderPerformanceInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="transportLegId">
          {(field) => <field.TextField label="Transport Leg ID" type="text" />}
        </form.AppField>
        <form.AppField name="metricType">
          {(field) => <field.TextField label="Metric Type" type="text" />}
        </form.AppField>
        <form.AppField name="metricValue">
          {(field) => <field.TextField label="Metric Value" type="number" />}
        </form.AppField>
        <form.AppField name="measurementDate">
          {(field) => (
            <field.TextField label="Measurement Date" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="notes">
          {(field) => <field.TextField label="Notes" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsProviderPerformanceForm = withForm({
  defaultValues: {} as LmsProviderPerformanceUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="transportLegId">
          {(field) => <field.TextField label="Transport Leg ID" type="text" />}
        </form.AppField>
        <form.AppField name="metricType">
          {(field) => <field.TextField label="Metric Type" type="text" />}
        </form.AppField>
        <form.AppField name="metricValue">
          {(field) => <field.TextField label="Metric Value" type="number" />}
        </form.AppField>
        <form.AppField name="measurementDate">
          {(field) => (
            <field.TextField label="Measurement Date" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="notes">
          {(field) => <field.TextField label="Notes" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsProviderPerformanceForm, UpdateLmsProviderPerformanceForm };
