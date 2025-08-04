import { withForm } from '@/components/ui/form';
import {
  OrgDepartmentUsersInsert,
  OrgDepartmentUsersUpdate,
} from '@/db/schemas';

const CreateOrgDepartmentUserForm = withForm({
  defaultValues: {} as OrgDepartmentUsersInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="userId">
          {(field) => <field.TextField label="User ID" type="text" />}
        </form.AppField>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="role">
          {(field) => <field.TextField label="Role" type="text" />}
        </form.AppField>
        <form.AppField name="assignedDate">
          {(field) => <field.TextField label="Assigned Date" type="date" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateOrgDepartmentUserForm = withForm({
  defaultValues: {} as OrgDepartmentUsersUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="userId">
          {(field) => <field.TextField label="User ID" type="text" />}
        </form.AppField>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="role">
          {(field) => <field.TextField label="Role" type="text" />}
        </form.AppField>
        <form.AppField name="assignedDate">
          {(field) => <field.TextField label="Assigned Date" type="date" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateOrgDepartmentUserForm, UpdateOrgDepartmentUserForm };
