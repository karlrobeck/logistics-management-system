import { withForm } from '@/components/ui/form';
import { CrmInteractionsInsert, CrmInteractionsUpdate } from '@/db/schemas';
import { CrmInteractionType } from '@/db/types';

const CreateCrmInteractionForm = withForm({
  defaultValues: {} as CrmInteractionsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="subject">
          {(field) => <field.TextField label="Subject" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="interactionDate">
          {(field) => <field.TextField label="Interaction Date" type="date" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="opportunityId">
          {(field) => <field.TextField label="Opportunity ID" type="text" />}
        </form.AppField>
        <form.AppField name="type">
          {(field) => (
            <field.SelectField
              label="Interaction Type"
              placeholder="Select interaction type"
              options={Object.values(CrmInteractionType).map((type) => ({
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

const UpdateCrmInteractionForm = withForm({
  defaultValues: {} as CrmInteractionsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="subject">
          {(field) => <field.TextField label="Subject" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="interactionDate">
          {(field) => <field.TextField label="Interaction Date" type="date" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="opportunityId">
          {(field) => <field.TextField label="Opportunity ID" type="text" />}
        </form.AppField>
        <form.AppField name="type">
          {(field) => (
            <field.SelectField
              label="Interaction Type"
              placeholder="Select interaction type"
              options={Object.values(CrmInteractionType).map((type) => ({
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

export { CreateCrmInteractionForm, UpdateCrmInteractionForm };
