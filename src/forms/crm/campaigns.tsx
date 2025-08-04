import { withForm } from '@/components/ui/form';
import { CrmCampaignsInsert, CrmCampaignsUpdate } from '@/db/schemas';
import { CrmCampaignStatus } from '@/db/types';

const CreateCrmCampaignForm = withForm({
  defaultValues: {} as CrmCampaignsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Campaign Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="startDate">
          {(field) => <field.TextField label="Start Date" type="date" />}
        </form.AppField>
        <form.AppField name="endDate">
          {(field) => <field.TextField label="End Date" type="date" />}
        </form.AppField>
        <form.AppField name="budget">
          {(field) => <field.TextField label="Budget" type="number" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select campaign status"
              options={Object.values(CrmCampaignStatus).map((status) => ({
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

const UpdateCrmCampaignForm = withForm({
  defaultValues: {} as CrmCampaignsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Campaign Name" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="startDate">
          {(field) => <field.TextField label="Start Date" type="date" />}
        </form.AppField>
        <form.AppField name="endDate">
          {(field) => <field.TextField label="End Date" type="date" />}
        </form.AppField>
        <form.AppField name="budget">
          {(field) => <field.TextField label="Budget" type="number" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select campaign status"
              options={Object.values(CrmCampaignStatus).map((status) => ({
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

export { CreateCrmCampaignForm, UpdateCrmCampaignForm };
