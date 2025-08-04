import { withForm } from '@/components/ui/form';
import {
  OrgDepartmentTransportModesInsert,
  OrgDepartmentTransportModesUpdate,
} from '@/db/schemas';

const CreateOrgDepartmentTransportModeForm = withForm({
  defaultValues: {} as OrgDepartmentTransportModesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="transportMode">
          {(field) => <field.TextField label="Transport Mode" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateOrgDepartmentTransportModeForm = withForm({
  defaultValues: {} as OrgDepartmentTransportModesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="transportMode">
          {(field) => <field.TextField label="Transport Mode" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export {
  CreateOrgDepartmentTransportModeForm,
  UpdateOrgDepartmentTransportModeForm,
};
