import { withForm } from '@/components/ui/form';
import { LmsAddressesInsert, LmsAddressesUpdate } from '@/db/schemas';
import { LmsAddressType } from '@/db/types';

const CreateLmsAddressForm = withForm({
  defaultValues: {} as LmsAddressesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="addressLine1">
          {(field) => <field.TextField label="Address Line 1" type="text" />}
        </form.AppField>
        <form.AppField name="addressLine2">
          {(field) => <field.TextField label="Address Line 2" type="text" />}
        </form.AppField>
        <form.AppField name="city">
          {(field) => <field.TextField label="City" type="text" />}
        </form.AppField>
        <form.AppField name="state">
          {(field) => <field.TextField label="State" type="text" />}
        </form.AppField>
        <form.AppField name="postalCode">
          {(field) => <field.TextField label="Postal Code" type="text" />}
        </form.AppField>
        <form.AppField name="country">
          {(field) => (
            <field.TextField label="Country (ISO 3166-1 alpha-3)" type="text" />
          )}
        </form.AppField>
        <form.AppField name="latitude">
          {(field) => <field.TextField label="Latitude" type="number" />}
        </form.AppField>
        <form.AppField name="longitude">
          {(field) => <field.TextField label="Longitude" type="number" />}
        </form.AppField>
        <form.AppField name="addressType">
          {(field) => (
            <field.SelectField
              label="Address Type"
              placeholder="Select address type"
              options={Object.values(LmsAddressType).map((type) => ({
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

const UpdateLmsAddressForm = withForm({
  defaultValues: {} as LmsAddressesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="addressLine1">
          {(field) => <field.TextField label="Address Line 1" type="text" />}
        </form.AppField>
        <form.AppField name="addressLine2">
          {(field) => <field.TextField label="Address Line 2" type="text" />}
        </form.AppField>
        <form.AppField name="city">
          {(field) => <field.TextField label="City" type="text" />}
        </form.AppField>
        <form.AppField name="state">
          {(field) => <field.TextField label="State" type="text" />}
        </form.AppField>
        <form.AppField name="postalCode">
          {(field) => <field.TextField label="Postal Code" type="text" />}
        </form.AppField>
        <form.AppField name="country">
          {(field) => (
            <field.TextField label="Country (ISO 3166-1 alpha-3)" type="text" />
          )}
        </form.AppField>
        <form.AppField name="latitude">
          {(field) => <field.TextField label="Latitude" type="number" />}
        </form.AppField>
        <form.AppField name="longitude">
          {(field) => <field.TextField label="Longitude" type="number" />}
        </form.AppField>
        <form.AppField name="addressType">
          {(field) => (
            <field.SelectField
              label="Address Type"
              placeholder="Select address type"
              options={Object.values(LmsAddressType).map((type) => ({
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

export { CreateLmsAddressForm, UpdateLmsAddressForm };
