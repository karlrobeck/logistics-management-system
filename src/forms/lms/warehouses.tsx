import { withForm } from '@/components/ui/form';
import { LmsWarehousesInsert, LmsWarehousesUpdate } from '@/db/schemas';
import { LmsWarehouseType } from '@/db/types';

const CreateLmsWarehouseForm = withForm({
  defaultValues: {} as LmsWarehousesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Warehouse Name" type="text" />}
        </form.AppField>
        <form.AppField name="code">
          {(field) => <field.TextField label="Warehouse Code" type="text" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="capacity">
          {(field) => <field.TextField label="Capacity" type="number" />}
        </form.AppField>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="managerId">
          {(field) => <field.TextField label="Manager ID" type="text" />}
        </form.AppField>
        <form.AppField name="warehouseType">
          {(field) => (
            <field.SelectField
              label="Warehouse Type"
              placeholder="Select warehouse type"
              options={Object.values(LmsWarehouseType).map((type) => ({
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

const UpdateLmsWarehouseForm = withForm({
  defaultValues: {} as LmsWarehousesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="name">
          {(field) => <field.TextField label="Warehouse Name" type="text" />}
        </form.AppField>
        <form.AppField name="code">
          {(field) => <field.TextField label="Warehouse Code" type="text" />}
        </form.AppField>
        <form.AppField name="addressId">
          {(field) => <field.TextField label="Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="capacity">
          {(field) => <field.TextField label="Capacity" type="number" />}
        </form.AppField>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="managerId">
          {(field) => <field.TextField label="Manager ID" type="text" />}
        </form.AppField>
        <form.AppField name="warehouseType">
          {(field) => (
            <field.SelectField
              label="Warehouse Type"
              placeholder="Select warehouse type"
              options={Object.values(LmsWarehouseType).map((type) => ({
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

export { CreateLmsWarehouseForm, UpdateLmsWarehouseForm };
