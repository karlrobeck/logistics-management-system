import { withForm } from '@/components/ui/form';
import { CrmCompaniesInsert, CrmCompaniesUpdate } from '@/db/schemas';

const CreateCrmCompanyForm = withForm({
  defaultValues: {} as CrmCompaniesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="industry">
          {(field) => <field.TextField label="Industry" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="website">
          {(field) => <field.TextField label="Website" type="url" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmCompanyForm = withForm({
  defaultValues: {} as CrmCompaniesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="industry">
          {(field) => <field.TextField label="Industry" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="website">
          {(field) => <field.TextField label="Website" type="url" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmCompanyForm, UpdateCrmCompanyForm };
