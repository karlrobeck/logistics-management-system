import { withForm } from '@/components/ui/form';
import { OrgDepartmentsInsert, OrgDepartmentsUpdate } from '@/db/schemas';

const CreateOrgDepartmentForm = withForm({
  defaultValues: {} as OrgDepartmentsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Department Name" type="text" />}
        </form.AppField>
        <form.AppField name="code">
          {(field) => <field.TextField label="Department Code" type="text" />}
        </form.AppField>
        <form.AppField name="departmentType">
          {(field) => <field.TextField label="Department Type" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="budget">
          {(field) => <field.TextField label="Budget" type="number" />}
        </form.AppField>
        <form.AppField name="managerId">
          {(field) => <field.TextField label="Manager ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateOrgDepartmentForm = withForm({
  defaultValues: {} as OrgDepartmentsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Department Name" type="text" />}
        </form.AppField>
        <form.AppField name="code">
          {(field) => <field.TextField label="Department Code" type="text" />}
        </form.AppField>
        <form.AppField name="departmentType">
          {(field) => <field.TextField label="Department Type" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.TextField label="Email" type="email" />}
        </form.AppField>
        <form.AppField name="phoneNumber">
          {(field) => <field.TextField label="Phone Number" type="tel" />}
        </form.AppField>
        <form.AppField name="budget">
          {(field) => <field.TextField label="Budget" type="number" />}
        </form.AppField>
        <form.AppField name="managerId">
          {(field) => <field.TextField label="Manager ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateOrgDepartmentForm, UpdateOrgDepartmentForm };
