import { withForm } from '@/components/ui/form';
import { LmsPackagesInsert, LmsPackagesUpdate } from '@/db/schemas';
import { LmsPackageType } from '@/db/types';

const CreateLmsPackageForm = withForm({
  defaultValues: {} as LmsPackagesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="packageNumber">
          {(field) => <field.TextField label="Package Number" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="weight">
          {(field) => <field.TextField label="Weight" type="number" />}
        </form.AppField>
        <form.AppField name="length">
          {(field) => <field.TextField label="Length" type="number" />}
        </form.AppField>
        <form.AppField name="width">
          {(field) => <field.TextField label="Width" type="number" />}
        </form.AppField>
        <form.AppField name="height">
          {(field) => <field.TextField label="Height" type="number" />}
        </form.AppField>
        <form.AppField name="declaredValue">
          {(field) => <field.TextField label="Declared Value" type="number" />}
        </form.AppField>
        <form.AppField name="contentsDescription">
          {(field) => (
            <field.TextField label="Contents Description" type="text" />
          )}
        </form.AppField>
        <form.AppField name="packageType">
          {(field) => (
            <field.SelectField
              label="Package Type"
              placeholder="Select package type"
              options={Object.values(LmsPackageType).map((type) => ({
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

const UpdateLmsPackageForm = withForm({
  defaultValues: {} as LmsPackagesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="packageNumber">
          {(field) => <field.TextField label="Package Number" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="weight">
          {(field) => <field.TextField label="Weight" type="number" />}
        </form.AppField>
        <form.AppField name="length">
          {(field) => <field.TextField label="Length" type="number" />}
        </form.AppField>
        <form.AppField name="width">
          {(field) => <field.TextField label="Width" type="number" />}
        </form.AppField>
        <form.AppField name="height">
          {(field) => <field.TextField label="Height" type="number" />}
        </form.AppField>
        <form.AppField name="declaredValue">
          {(field) => <field.TextField label="Declared Value" type="number" />}
        </form.AppField>
        <form.AppField name="contentsDescription">
          {(field) => (
            <field.TextField label="Contents Description" type="text" />
          )}
        </form.AppField>
        <form.AppField name="packageType">
          {(field) => (
            <field.SelectField
              label="Package Type"
              placeholder="Select package type"
              options={Object.values(LmsPackageType).map((type) => ({
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

export { CreateLmsPackageForm, UpdateLmsPackageForm };
