import { withForm } from '@/components/ui/form';
import {
  CrmCampaignContactsInsert,
  CrmCampaignContactsUpdate,
} from '@/db/schemas';
import { CrmCampaignContactsStatus } from '@/db/types';

const CreateCrmCampaignContactForm = withForm({
  defaultValues: {} as CrmCampaignContactsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="campaignId">
          {(field) => <field.TextField label="Campaign ID" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="interactionDate">
          {(field) => <field.TextField label="Interaction Date" type="date" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select campaign contact status"
              options={Object.values(CrmCampaignContactsStatus).map(
                (status) => ({
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  value: status,
                }),
              )}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmCampaignContactForm = withForm({
  defaultValues: {} as CrmCampaignContactsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="campaignId">
          {(field) => <field.TextField label="Campaign ID" type="text" />}
        </form.AppField>
        <form.AppField name="contactId">
          {(field) => <field.TextField label="Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="interactionDate">
          {(field) => <field.TextField label="Interaction Date" type="date" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select campaign contact status"
              options={Object.values(CrmCampaignContactsStatus).map(
                (status) => ({
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  value: status,
                }),
              )}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmCampaignContactForm, UpdateCrmCampaignContactForm };
