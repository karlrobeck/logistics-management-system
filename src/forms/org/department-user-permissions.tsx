import { withForm } from '@/components/ui/form';
import {
  OrgDepartmentUserPermissionsInsert,
  OrgDepartmentUserPermissionsUpdate,
} from '@/db/schemas';

const CreateOrgDepartmentUserPermissionForm = withForm({
  defaultValues: {} as OrgDepartmentUserPermissionsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="userId">
          {(field) => <field.TextField label="User ID" type="text" />}
        </form.AppField>
        <form.AppField name="permissionId">
          {(field) => <field.TextField label="Permission ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateOrgDepartmentUserPermissionForm = withForm({
  defaultValues: {} as OrgDepartmentUserPermissionsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="userId">
          {(field) => <field.TextField label="User ID" type="text" />}
        </form.AppField>
        <form.AppField name="permissionId">
          {(field) => <field.TextField label="Permission ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export {
  CreateOrgDepartmentUserPermissionForm,
  UpdateOrgDepartmentUserPermissionForm,
};
