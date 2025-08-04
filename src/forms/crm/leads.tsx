import { withForm } from '@/components/ui/form';
import { CrmLeadsInsert, CrmLeadsUpdate } from '@/db/schemas';
import { CrmLeadStatus } from '@/db/types';

const CreateCrmLeadForm = withForm({
  defaultValues: {} as CrmLeadsInsert,
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
        <form.AppField name="companyName">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="leadSource">
          {(field) => <field.TextField label="Lead Source" type="text" />}
        </form.AppField>
        <form.AppField name="leadScore">
          {(field) => (
            <field.TextField label="Lead Score (0-100)" type="number" />
          )}
        </form.AppField>
        <form.AppField name="convertedToContactId">
          {(field) => (
            <field.TextField label="Converted to Contact ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="leadStatus">
          {(field) => (
            <field.SelectField
              label="Lead Status"
              placeholder="Select lead status"
              options={Object.values(CrmLeadStatus).map((status) => ({
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

const UpdateCrmLeadForm = withForm({
  defaultValues: {} as CrmLeadsUpdate,
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
        <form.AppField name="companyName">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="leadSource">
          {(field) => <field.TextField label="Lead Source" type="text" />}
        </form.AppField>
        <form.AppField name="leadScore">
          {(field) => (
            <field.TextField label="Lead Score (0-100)" type="number" />
          )}
        </form.AppField>
        <form.AppField name="convertedToContactId">
          {(field) => (
            <field.TextField label="Converted to Contact ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="leadStatus">
          {(field) => (
            <field.SelectField
              label="Lead Status"
              placeholder="Select lead status"
              options={Object.values(CrmLeadStatus).map((status) => ({
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

export { CreateCrmLeadForm, UpdateCrmLeadForm };
