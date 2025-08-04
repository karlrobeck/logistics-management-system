import { withForm } from '@/components/ui/form';
import {
  LmsWarehouseInventoriesInsert,
  LmsWarehouseInventoriesUpdate,
} from '@/db/schemas';
import { LmsWarehouseInventoryStatus } from '@/db/types';

const CreateLmsWarehouseInventoryForm = withForm({
  defaultValues: {} as LmsWarehouseInventoriesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="warehouseId">
          {(field) => <field.TextField label="Warehouse ID" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="packageId">
          {(field) => <field.TextField label="Package ID" type="text" />}
        </form.AppField>
        <form.AppField name="locationCode">
          {(field) => <field.TextField label="Location Code" type="text" />}
        </form.AppField>
        <form.AppField name="arrivedAt">
          {(field) => (
            <field.TextField label="Arrived At" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="departedAt">
          {(field) => (
            <field.TextField label="Departed At" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select inventory status"
              options={Object.values(LmsWarehouseInventoryStatus).map(
                (status) => ({
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  value: status,
                }),
              )}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsWarehouseInventoryForm = withForm({
  defaultValues: {} as LmsWarehouseInventoriesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="warehouseId">
          {(field) => <field.TextField label="Warehouse ID" type="text" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="packageId">
          {(field) => <field.TextField label="Package ID" type="text" />}
        </form.AppField>
        <form.AppField name="locationCode">
          {(field) => <field.TextField label="Location Code" type="text" />}
        </form.AppField>
        <form.AppField name="arrivedAt">
          {(field) => (
            <field.TextField label="Arrived At" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="departedAt">
          {(field) => (
            <field.TextField label="Departed At" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select inventory status"
              options={Object.values(LmsWarehouseInventoryStatus).map(
                (status) => ({
                  label: status.charAt(0).toUpperCase() + status.slice(1),
                  value: status,
                }),
              )}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsWarehouseInventoryForm, UpdateLmsWarehouseInventoryForm };
