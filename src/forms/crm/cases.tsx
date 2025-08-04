import { withForm } from '@/components/ui/form';
import { CrmCasesInsert, CrmCasesUpdate } from '@/db/schemas';
import { CrmCasePriority, CrmCaseStatus } from '@/db/types';

const CreateCrmCaseForm = withForm({
  defaultValues: {} as CrmCasesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="subject">
          {(field) => <field.TextField label="Subject" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="closedAt">
          {(field) => <field.TextField label="Closed Date" type="date" />}
        </form.AppField>
        <form.AppField name="priority">
          {(field) => (
            <field.SelectField
              label="Priority"
              placeholder="Select case priority"
              options={Object.values(CrmCasePriority).map((priority) => ({
                label: priority.charAt(0).toUpperCase() + priority.slice(1),
                value: priority,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select case status"
              options={Object.values(CrmCaseStatus).map((status) => ({
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

const UpdateCrmCaseForm = withForm({
  defaultValues: {} as CrmCasesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="subject">
          {(field) => <field.TextField label="Subject" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="closedAt">
          {(field) => <field.TextField label="Closed Date" type="date" />}
        </form.AppField>
        <form.AppField name="priority">
          {(field) => (
            <field.SelectField
              label="Priority"
              placeholder="Select case priority"
              options={Object.values(CrmCasePriority).map((priority) => ({
                label: priority.charAt(0).toUpperCase() + priority.slice(1),
                value: priority,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select case status"
              options={Object.values(CrmCaseStatus).map((status) => ({
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

export { CreateCrmCaseForm, UpdateCrmCaseForm };
