import { withForm } from '@/components/ui/form';
import {
  LmsTransportationProvidersInsert,
  LmsTransportationProvidersUpdate,
} from '@/db/schemas';
import { LmsProviderType } from '@/db/types';

const CreateLmsTransportationProviderForm = withForm({
  defaultValues: {} as LmsTransportationProvidersInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="companyName">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="contactPerson">
          {(field) => <field.TextField label="Contact Person" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="apiEndpoint">
          {(field) => <field.TextField label="API Endpoint" type="url" />}
        </form.AppField>
        <form.AppField name="apiKey">
          {(field) => <field.TextField label="API Key" type="text" />}
        </form.AppField>
        <form.AppField name="contractStartDate">
          {(field) => (
            <field.TextField label="Contract Start Date" type="date" />
          )}
        </form.AppField>
        <form.AppField name="contractEndDate">
          {(field) => <field.TextField label="Contract End Date" type="date" />}
        </form.AppField>
        <form.AppField name="paymentTerms">
          {(field) => <field.TextField label="Payment Terms" type="text" />}
        </form.AppField>
        <form.AppField name="insuranceCoverage">
          {(field) => (
            <field.TextField label="Insurance Coverage" type="number" />
          )}
        </form.AppField>
        <form.AppField name="performanceRating">
          {(field) => (
            <field.TextField label="Performance Rating" type="number" />
          )}
        </form.AppField>
        <form.AppField name="preferredByDepartmentId">
          {(field) => (
            <field.TextField label="Preferred by Department ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="providerType">
          {(field) => (
            <field.SelectField
              label="Provider Type"
              placeholder="Select provider type"
              options={Object.values(LmsProviderType).map((type) => ({
                label: type
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: type,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsTransportationProviderForm = withForm({
  defaultValues: {} as LmsTransportationProvidersUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="companyName">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="contactPerson">
          {(field) => <field.TextField label="Contact Person" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="apiEndpoint">
          {(field) => <field.TextField label="API Endpoint" type="url" />}
        </form.AppField>
        <form.AppField name="apiKey">
          {(field) => <field.TextField label="API Key" type="text" />}
        </form.AppField>
        <form.AppField name="contractStartDate">
          {(field) => (
            <field.TextField label="Contract Start Date" type="date" />
          )}
        </form.AppField>
        <form.AppField name="contractEndDate">
          {(field) => <field.TextField label="Contract End Date" type="date" />}
        </form.AppField>
        <form.AppField name="paymentTerms">
          {(field) => <field.TextField label="Payment Terms" type="text" />}
        </form.AppField>
        <form.AppField name="insuranceCoverage">
          {(field) => (
            <field.TextField label="Insurance Coverage" type="number" />
          )}
        </form.AppField>
        <form.AppField name="performanceRating">
          {(field) => (
            <field.TextField label="Performance Rating" type="number" />
          )}
        </form.AppField>
        <form.AppField name="preferredByDepartmentId">
          {(field) => (
            <field.TextField label="Preferred by Department ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="providerType">
          {(field) => (
            <field.SelectField
              label="Provider Type"
              placeholder="Select provider type"
              options={Object.values(LmsProviderType).map((type) => ({
                label: type
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: type,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export {
  CreateLmsTransportationProviderForm,
  UpdateLmsTransportationProviderForm,
};
