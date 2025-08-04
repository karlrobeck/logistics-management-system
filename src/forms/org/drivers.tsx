import { withForm } from '@/components/ui/form';
import { OrgDriversInsert, OrgDriversUpdate } from '@/db/schemas';
import { OrgDriverStatus } from '@/db/types';

const CreateOrgDriverForm = withForm({
  defaultValues: {} as OrgDriversInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="employeeId">
          {(field) => <field.TextField label="Employee ID" type="text" />}
        </form.AppField>
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
        <form.AppField name="licenseNumber">
          {(field) => <field.TextField label="License Number" type="text" />}
        </form.AppField>
        <form.AppField name="hireDate">
          {(field) => <field.TextField label="Hire Date" type="date" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select driver status"
              options={Object.values(OrgDriverStatus).map((status) => ({
                label:
                  status.charAt(0).toUpperCase() +
                  status.slice(1).replace('_', ' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateOrgDriverForm = withForm({
  defaultValues: {} as OrgDriversUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="employeeId">
          {(field) => <field.TextField label="Employee ID" type="text" />}
        </form.AppField>
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
        <form.AppField name="licenseNumber">
          {(field) => <field.TextField label="License Number" type="text" />}
        </form.AppField>
        <form.AppField name="hireDate">
          {(field) => <field.TextField label="Hire Date" type="date" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select driver status"
              options={Object.values(OrgDriverStatus).map((status) => ({
                label:
                  status.charAt(0).toUpperCase() +
                  status.slice(1).replace('_', ' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateOrgDriverForm, UpdateOrgDriverForm };
