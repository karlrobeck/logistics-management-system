import { withForm } from '@/components/ui/form';
import {
  LmsTransportationProvidersInsert,
  LmsTransportationProvidersUpdate,
} from '@/db/schemas';

const CreateLmsProviderForm = withForm({
  defaultValues: {} as LmsTransportationProvidersInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="companyName">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="providerType">
          {(field) => <field.TextField label="Provider Type" type="text" />}
        </form.AppField>
        <form.AppField name="contactPerson">
          {(field) => <field.TextField label="Contact Person" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="text" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="apiEndpoint">
          {(field) => <field.TextField label="API Endpoint" type="text" />}
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
        <form.AppField name="performanceRating">
          {(field) => (
            <field.TextField label="Performance Rating" type="number" />
          )}
        </form.AppField>
        <form.AppField name="insuranceCoverage">
          {(field) => (
            <field.TextField label="Insurance Coverage" type="number" />
          )}
        </form.AppField>
        <form.AppField name="preferredByDepartmentId">
          {(field) => (
            <field.TextField label="Preferred By Department ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="isActive">
          {(field) => <field.TextField label="Is Active" type="checkbox" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsProviderForm = withForm({
  defaultValues: {} as LmsTransportationProvidersUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="companyName">
          {(field) => <field.TextField label="Company Name" type="text" />}
        </form.AppField>
        <form.AppField name="providerType">
          {(field) => <field.TextField label="Provider Type" type="text" />}
        </form.AppField>
        <form.AppField name="contactPerson">
          {(field) => <field.TextField label="Contact Person" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="text" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="apiEndpoint">
          {(field) => <field.TextField label="API Endpoint" type="text" />}
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
        <form.AppField name="performanceRating">
          {(field) => (
            <field.TextField label="Performance Rating" type="number" />
          )}
        </form.AppField>
        <form.AppField name="insuranceCoverage">
          {(field) => (
            <field.TextField label="Insurance Coverage" type="number" />
          )}
        </form.AppField>
        <form.AppField name="preferredByDepartmentId">
          {(field) => (
            <field.TextField label="Preferred By Department ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="isActive">
          {(field) => <field.TextField label="Is Active" type="checkbox" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsProviderForm, UpdateLmsProviderForm };
