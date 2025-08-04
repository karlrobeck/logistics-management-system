import { withForm } from '@/components/ui/form';
import { LmsPricingZonesInsert, LmsPricingZonesUpdate } from '@/db/schemas';

const CreateLmsPricingZoneForm = withForm({
  defaultValues: {} as LmsPricingZonesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Zone Name" type="text" />}
        </form.AppField>
        <form.AppField name="zoneCode">
          {(field) => <field.TextField label="Zone Code" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsPricingZoneForm = withForm({
  defaultValues: {} as LmsPricingZonesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Zone Name" type="text" />}
        </form.AppField>
        <form.AppField name="zoneCode">
          {(field) => <field.TextField label="Zone Code" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsPricingZoneForm, UpdateLmsPricingZoneForm };
