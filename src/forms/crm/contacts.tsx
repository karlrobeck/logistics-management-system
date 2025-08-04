import { withForm } from '@/components/ui/form';
import { CrmContactsInsert, CrmContactsUpdate } from '@/db/schemas';
import { CrmContactStatus } from '@/db/types';

const CreateCrmContactForm = withForm({
  defaultValues: {} as CrmContactsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="firstName">
          {(field) => <field.TextField label="First Name" type="text" />}
        </form.AppField>
        <form.AppField name="lastName">
          {(field) => <field.TextField label="Last Name" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="jobTitle">
          {(field) => <field.TextField label="Job Title" type="text" />}
        </form.AppField>
        <form.AppField name="companyId">
          {(field) => <field.TextField label="Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="birthDate">
          {(field) => <field.TextField label="Birth Date" type="date" />}
        </form.AppField>
        <form.AppField name="leadSource">
          {(field) => <field.TextField label="Lead Source" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select contact status"
              options={Object.values(CrmContactStatus).map((status) => ({
                label: status.charAt(0).toUpperCase() + status.slice(1),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmContactForm = withForm({
  defaultValues: {} as CrmContactsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="firstName">
          {(field) => <field.TextField label="First Name" type="text" />}
        </form.AppField>
        <form.AppField name="lastName">
          {(field) => <field.TextField label="Last Name" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="jobTitle">
          {(field) => <field.TextField label="Job Title" type="text" />}
        </form.AppField>
        <form.AppField name="companyId">
          {(field) => <field.TextField label="Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="birthDate">
          {(field) => <field.TextField label="Birth Date" type="date" />}
        </form.AppField>
        <form.AppField name="leadSource">
          {(field) => <field.TextField label="Lead Source" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select contact status"
              options={Object.values(CrmContactStatus).map((status) => ({
                label: status.charAt(0).toUpperCase() + status.slice(1),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmContactForm, UpdateCrmContactForm };
