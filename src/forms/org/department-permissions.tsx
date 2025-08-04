import { withForm } from '@/components/ui/form';
import {
  OrgDepartmentPermissionsInsert,
  OrgDepartmentPermissionsUpdate,
} from '@/db/schemas';
import { OrgPermissionStatus } from '@/db/types';

const CreateOrgDepartmentPermissionForm = withForm({
  defaultValues: {} as OrgDepartmentPermissionsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="resource">
          {(field) => <field.TextField label="Resource" type="text" />}
        </form.AppField>
        <form.AppField name="action">
          {(field) => (
            <field.SelectField
              label="Action"
              placeholder="Select permission action"
              options={Object.values(OrgPermissionStatus).map((action) => ({
                label: action.charAt(0).toUpperCase() + action.slice(1),
                value: action,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateOrgDepartmentPermissionForm = withForm({
  defaultValues: {} as OrgDepartmentPermissionsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="resource">
          {(field) => <field.TextField label="Resource" type="text" />}
        </form.AppField>
        <form.AppField name="action">
          {(field) => (
            <field.SelectField
              label="Action"
              placeholder="Select permission action"
              options={Object.values(OrgPermissionStatus).map((action) => ({
                label: action.charAt(0).toUpperCase() + action.slice(1),
                value: action,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateOrgDepartmentPermissionForm, UpdateOrgDepartmentPermissionForm };
