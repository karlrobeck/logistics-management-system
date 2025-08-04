import { withForm } from '@/components/ui/form';
import { OrgVehiclesInsert, OrgVehiclesUpdate } from '@/db/schemas';
import { OrgVehicleStatus, OrgVehicleType } from '@/db/types';

const CreateOrgVehicleForm = withForm({
  defaultValues: {} as OrgVehiclesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="vehicleNumber">
          {(field) => <field.TextField label="Vehicle Number" type="text" />}
        </form.AppField>
        <form.AppField name="licensePlate">
          {(field) => <field.TextField label="License Plate" type="text" />}
        </form.AppField>
        <form.AppField name="make">
          {(field) => <field.TextField label="Make" type="text" />}
        </form.AppField>
        <form.AppField name="model">
          {(field) => <field.TextField label="Model" type="text" />}
        </form.AppField>
        <form.AppField name="year">
          {(field) => <field.TextField label="Year" type="number" />}
        </form.AppField>
        <form.AppField name="vehicleType">
          {(field) => (
            <field.SelectField
              label="Vehicle Type"
              placeholder="Select vehicle type"
              options={Object.values(OrgVehicleType).map((type) => ({
                label: type.charAt(0).toUpperCase() + type.slice(1),
                value: type,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select vehicle status"
              options={Object.values(OrgVehicleStatus).map((status) => ({
                label:
                  status.charAt(0).toUpperCase() +
                  status.slice(1).replace('_', ' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="capacityWeight">
          {(field) => <field.TextField label="Capacity Weight" type="number" />}
        </form.AppField>
        <form.AppField name="capacityVolume">
          {(field) => <field.TextField label="Capacity Volume" type="number" />}
        </form.AppField>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="warehouseId">
          {(field) => <field.TextField label="Warehouse ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateOrgVehicleForm = withForm({
  defaultValues: {} as OrgVehiclesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="vehicleNumber">
          {(field) => <field.TextField label="Vehicle Number" type="text" />}
        </form.AppField>
        <form.AppField name="licensePlate">
          {(field) => <field.TextField label="License Plate" type="text" />}
        </form.AppField>
        <form.AppField name="make">
          {(field) => <field.TextField label="Make" type="text" />}
        </form.AppField>
        <form.AppField name="model">
          {(field) => <field.TextField label="Model" type="text" />}
        </form.AppField>
        <form.AppField name="year">
          {(field) => <field.TextField label="Year" type="number" />}
        </form.AppField>
        <form.AppField name="vehicleType">
          {(field) => (
            <field.SelectField
              label="Vehicle Type"
              placeholder="Select vehicle type"
              options={Object.values(OrgVehicleType).map((type) => ({
                label: type.charAt(0).toUpperCase() + type.slice(1),
                value: type,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select vehicle status"
              options={Object.values(OrgVehicleStatus).map((status) => ({
                label:
                  status.charAt(0).toUpperCase() +
                  status.slice(1).replace('_', ' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="capacityWeight">
          {(field) => <field.TextField label="Capacity Weight" type="number" />}
        </form.AppField>
        <form.AppField name="capacityVolume">
          {(field) => <field.TextField label="Capacity Volume" type="number" />}
        </form.AppField>
        <form.AppField name="departmentId">
          {(field) => <field.TextField label="Department ID" type="text" />}
        </form.AppField>
        <form.AppField name="warehouseId">
          {(field) => <field.TextField label="Warehouse ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateOrgVehicleForm, UpdateOrgVehicleForm };
