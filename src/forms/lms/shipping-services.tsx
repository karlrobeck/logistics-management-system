import { withForm } from '@/components/ui/form';
import {
  LmsShippingServicesInsert,
  LmsShippingServicesUpdate,
} from '@/db/schemas';
import { LmsServiceType } from '@/db/types';

const CreateLmsShippingServiceForm = withForm({
  defaultValues: {} as LmsShippingServicesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Service Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="deliveryTimeMin">
          {(field) => (
            <field.TextField
              label="Minimum Delivery Time (days)"
              type="number"
            />
          )}
        </form.AppField>
        <form.AppField name="deliveryTimeMax">
          {(field) => (
            <field.TextField
              label="Maximum Delivery Time (days)"
              type="number"
            />
          )}
        </form.AppField>
        <form.AppField name="maxWeight">
          {(field) => <field.TextField label="Maximum Weight" type="number" />}
        </form.AppField>
        <form.AppField name="serviceType">
          {(field) => (
            <field.SelectField
              label="Service Type"
              placeholder="Select service type"
              options={Object.values(LmsServiceType).map((type) => ({
                label: type.charAt(0).toUpperCase() + type.slice(1),
                value: type,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsShippingServiceForm = withForm({
  defaultValues: {} as LmsShippingServicesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Service Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="deliveryTimeMin">
          {(field) => (
            <field.TextField
              label="Minimum Delivery Time (days)"
              type="number"
            />
          )}
        </form.AppField>
        <form.AppField name="deliveryTimeMax">
          {(field) => (
            <field.TextField
              label="Maximum Delivery Time (days)"
              type="number"
            />
          )}
        </form.AppField>
        <form.AppField name="maxWeight">
          {(field) => <field.TextField label="Maximum Weight" type="number" />}
        </form.AppField>
        <form.AppField name="serviceType">
          {(field) => (
            <field.SelectField
              label="Service Type"
              placeholder="Select service type"
              options={Object.values(LmsServiceType).map((type) => ({
                label: type.charAt(0).toUpperCase() + type.slice(1),
                value: type,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsShippingServiceForm, UpdateLmsShippingServiceForm };
