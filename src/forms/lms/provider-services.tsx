import { withForm } from '@/components/ui/form';
import {
  LmsProviderServicesInsert,
  LmsProviderServicesUpdate,
} from '@/db/schemas';

const CreateLmsProviderServiceForm = withForm({
  defaultValues: {} as LmsProviderServicesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="serviceName">
          {(field) => <field.TextField label="Service Name" type="text" />}
        </form.AppField>
        <form.AppField name="serviceType">
          {(field) => <field.TextField label="Service Type" type="text" />}
        </form.AppField>
        <form.AppField name="transportMode">
          {(field) => <field.TextField label="Transport Mode" type="text" />}
        </form.AppField>
        <form.AppField name="maxWeight">
          {(field) => <field.TextField label="Max Weight" type="number" />}
        </form.AppField>
        <form.AppField name="transitTimeMin">
          {(field) => (
            <field.TextField label="Min Transit Time" type="number" />
          )}
        </form.AppField>
        <form.AppField name="transitTimeMax">
          {(field) => (
            <field.TextField label="Max Transit Time" type="number" />
          )}
        </form.AppField>
        <form.AppField name="cutoffTime">
          {(field) => <field.TextField label="Cutoff Time" type="text" />}
        </form.AppField>
        <form.AppField name="trackingAvailable">
          {(field) => (
            <field.TextField label="Tracking Available" type="checkbox" />
          )}
        </form.AppField>
        <form.AppField name="insuranceAvailable">
          {(field) => (
            <field.TextField label="Insurance Available" type="checkbox" />
          )}
        </form.AppField>
        <form.AppField name="isActive">
          {(field) => <field.TextField label="Is Active" type="checkbox" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsProviderServiceForm = withForm({
  defaultValues: {} as LmsProviderServicesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="serviceName">
          {(field) => <field.TextField label="Service Name" type="text" />}
        </form.AppField>
        <form.AppField name="serviceType">
          {(field) => <field.TextField label="Service Type" type="text" />}
        </form.AppField>
        <form.AppField name="transportMode">
          {(field) => <field.TextField label="Transport Mode" type="text" />}
        </form.AppField>
        <form.AppField name="maxWeight">
          {(field) => <field.TextField label="Max Weight" type="number" />}
        </form.AppField>
        <form.AppField name="transitTimeMin">
          {(field) => (
            <field.TextField label="Min Transit Time" type="number" />
          )}
        </form.AppField>
        <form.AppField name="transitTimeMax">
          {(field) => (
            <field.TextField label="Max Transit Time" type="number" />
          )}
        </form.AppField>
        <form.AppField name="cutoffTime">
          {(field) => <field.TextField label="Cutoff Time" type="text" />}
        </form.AppField>
        <form.AppField name="trackingAvailable">
          {(field) => (
            <field.TextField label="Tracking Available" type="checkbox" />
          )}
        </form.AppField>
        <form.AppField name="insuranceAvailable">
          {(field) => (
            <field.TextField label="Insurance Available" type="checkbox" />
          )}
        </form.AppField>
        <form.AppField name="isActive">
          {(field) => <field.TextField label="Is Active" type="checkbox" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsProviderServiceForm, UpdateLmsProviderServiceForm };
