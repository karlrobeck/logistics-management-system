import { withForm } from '@/components/ui/form';
import { CrmOpportunitiesInsert, CrmOpportunitiesUpdate } from '@/db/schemas';
import { CrmOpportunityStage } from '@/db/types';

const CreateCrmOpportunityForm = withForm({
  defaultValues: {} as CrmOpportunitiesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Opportunity Name" type="text" />}
        </form.AppField>
        <form.AppField name="amount">
          {(field) => <field.TextField label="Amount" type="number" />}
        </form.AppField>
        <form.AppField name="probability">
          {(field) => <field.TextField label="Probability (%)" type="number" />}
        </form.AppField>
        <form.AppField name="closeDate">
          {(field) => <field.TextField label="Close Date" type="date" />}
        </form.AppField>
        <form.AppField name="companyId">
          {(field) => <field.TextField label="Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="primaryContactId">
          {(field) => (
            <field.TextField label="Primary Contact ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="stage">
          {(field) => (
            <field.SelectField
              label="Stage"
              placeholder="Select opportunity stage"
              options={Object.values(CrmOpportunityStage).map((stage) => ({
                label: stage
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: stage,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmOpportunityForm = withForm({
  defaultValues: {} as CrmOpportunitiesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Opportunity Name" type="text" />}
        </form.AppField>
        <form.AppField name="amount">
          {(field) => <field.TextField label="Amount" type="number" />}
        </form.AppField>
        <form.AppField name="probability">
          {(field) => <field.TextField label="Probability (%)" type="number" />}
        </form.AppField>
        <form.AppField name="closeDate">
          {(field) => <field.TextField label="Close Date" type="date" />}
        </form.AppField>
        <form.AppField name="companyId">
          {(field) => <field.TextField label="Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="primaryContactId">
          {(field) => (
            <field.TextField label="Primary Contact ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="stage">
          {(field) => (
            <field.SelectField
              label="Stage"
              placeholder="Select opportunity stage"
              options={Object.values(CrmOpportunityStage).map((stage) => ({
                label: stage
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: stage,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmOpportunityForm, UpdateCrmOpportunityForm };
