import { withForm } from '@/components/ui/form';
import { LmsPricingRatesInsert, LmsPricingRatesUpdate } from '@/db/schemas';

const CreateLmsPricingRateForm = withForm({
  defaultValues: {} as LmsPricingRatesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="serviceId">
          {(field) => <field.TextField label="Service ID" type="text" />}
        </form.AppField>
        <form.AppField name="originZoneId">
          {(field) => <field.TextField label="Origin Zone ID" type="text" />}
        </form.AppField>
        <form.AppField name="destinationZoneId">
          {(field) => (
            <field.TextField label="Destination Zone ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="weightMin">
          {(field) => <field.TextField label="Minimum Weight" type="number" />}
        </form.AppField>
        <form.AppField name="weightMax">
          {(field) => <field.TextField label="Maximum Weight" type="number" />}
        </form.AppField>
        <form.AppField name="baseRate">
          {(field) => <field.TextField label="Base Rate" type="number" />}
        </form.AppField>
        <form.AppField name="perKgRate">
          {(field) => <field.TextField label="Per KG Rate" type="number" />}
        </form.AppField>
        <form.AppField name="fuelSurchargeRate">
          {(field) => (
            <field.TextField label="Fuel Surcharge Rate" type="number" />
          )}
        </form.AppField>
        <form.AppField name="effectiveDate">
          {(field) => <field.TextField label="Effective Date" type="date" />}
        </form.AppField>
        <form.AppField name="expiryDate">
          {(field) => <field.TextField label="Expiry Date" type="date" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsPricingRateForm = withForm({
  defaultValues: {} as LmsPricingRatesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="serviceId">
          {(field) => <field.TextField label="Service ID" type="text" />}
        </form.AppField>
        <form.AppField name="originZoneId">
          {(field) => <field.TextField label="Origin Zone ID" type="text" />}
        </form.AppField>
        <form.AppField name="destinationZoneId">
          {(field) => (
            <field.TextField label="Destination Zone ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="weightMin">
          {(field) => <field.TextField label="Minimum Weight" type="number" />}
        </form.AppField>
        <form.AppField name="weightMax">
          {(field) => <field.TextField label="Maximum Weight" type="number" />}
        </form.AppField>
        <form.AppField name="baseRate">
          {(field) => <field.TextField label="Base Rate" type="number" />}
        </form.AppField>
        <form.AppField name="perKgRate">
          {(field) => <field.TextField label="Per KG Rate" type="number" />}
        </form.AppField>
        <form.AppField name="fuelSurchargeRate">
          {(field) => (
            <field.TextField label="Fuel Surcharge Rate" type="number" />
          )}
        </form.AppField>
        <form.AppField name="effectiveDate">
          {(field) => <field.TextField label="Effective Date" type="date" />}
        </form.AppField>
        <form.AppField name="expiryDate">
          {(field) => <field.TextField label="Expiry Date" type="date" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsPricingRateForm, UpdateLmsPricingRateForm };
