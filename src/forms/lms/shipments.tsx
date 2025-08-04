import { withForm } from '@/components/ui/form';
import { LmsShipmentsInsert, LmsShipmentsUpdate } from '@/db/schemas';
import { LmsShipmentStatus, LmsTransportMode } from '@/db/types';

const CreateLmsShipmentForm = withForm({
  defaultValues: {} as LmsShipmentsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="trackingNumber">
          {(field) => <field.TextField label="Tracking Number" type="text" />}
        </form.AppField>
        <form.AppField name="serviceId">
          {(field) => <field.TextField label="Service ID" type="text" />}
        </form.AppField>
        <form.AppField name="senderAddressId">
          {(field) => <field.TextField label="Sender Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="receiverAddressId">
          {(field) => (
            <field.TextField label="Receiver Address ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="senderCompanyId">
          {(field) => <field.TextField label="Sender Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="receiverCompanyId">
          {(field) => (
            <field.TextField label="Receiver Company ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="senderContactId">
          {(field) => <field.TextField label="Sender Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="receiverContactId">
          {(field) => (
            <field.TextField label="Receiver Contact ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="totalWeight">
          {(field) => <field.TextField label="Total Weight" type="number" />}
        </form.AppField>
        <form.AppField name="totalValue">
          {(field) => <field.TextField label="Total Value" type="number" />}
        </form.AppField>
        <form.AppField name="shippingCost">
          {(field) => <field.TextField label="Shipping Cost" type="number" />}
        </form.AppField>
        <form.AppField name="insuranceAmount">
          {(field) => (
            <field.TextField label="Insurance Amount" type="number" />
          )}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="pickupDate">
          {(field) => <field.TextField label="Pickup Date" type="date" />}
        </form.AppField>
        <form.AppField name="estimatedDeliveryDate">
          {(field) => (
            <field.TextField label="Estimated Delivery Date" type="date" />
          )}
        </form.AppField>
        <form.AppField name="deliveryDate">
          {(field) => <field.TextField label="Delivery Date" type="date" />}
        </form.AppField>
        <form.AppField name="specialInstructions">
          {(field) => (
            <field.TextField label="Special Instructions" type="text" />
          )}
        </form.AppField>
        <form.AppField name="assignedDepartmentId">
          {(field) => (
            <field.TextField label="Assigned Department ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="createdBy">
          {(field) => <field.TextField label="Created By" type="text" />}
        </form.AppField>
        <form.AppField name="primaryTransportMode">
          {(field) => (
            <field.SelectField
              label="Primary Transport Mode"
              placeholder="Select transport mode"
              options={Object.values(LmsTransportMode).map((mode) => ({
                label: mode.charAt(0).toUpperCase() + mode.slice(1),
                value: mode,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select shipment status"
              options={Object.values(LmsShipmentStatus).map((status) => ({
                label: status
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsShipmentForm = withForm({
  defaultValues: {} as LmsShipmentsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="trackingNumber">
          {(field) => <field.TextField label="Tracking Number" type="text" />}
        </form.AppField>
        <form.AppField name="serviceId">
          {(field) => <field.TextField label="Service ID" type="text" />}
        </form.AppField>
        <form.AppField name="senderAddressId">
          {(field) => <field.TextField label="Sender Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="receiverAddressId">
          {(field) => (
            <field.TextField label="Receiver Address ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="senderCompanyId">
          {(field) => <field.TextField label="Sender Company ID" type="text" />}
        </form.AppField>
        <form.AppField name="receiverCompanyId">
          {(field) => (
            <field.TextField label="Receiver Company ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="senderContactId">
          {(field) => <field.TextField label="Sender Contact ID" type="text" />}
        </form.AppField>
        <form.AppField name="receiverContactId">
          {(field) => (
            <field.TextField label="Receiver Contact ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="totalWeight">
          {(field) => <field.TextField label="Total Weight" type="number" />}
        </form.AppField>
        <form.AppField name="totalValue">
          {(field) => <field.TextField label="Total Value" type="number" />}
        </form.AppField>
        <form.AppField name="shippingCost">
          {(field) => <field.TextField label="Shipping Cost" type="number" />}
        </form.AppField>
        <form.AppField name="insuranceAmount">
          {(field) => (
            <field.TextField label="Insurance Amount" type="number" />
          )}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="pickupDate">
          {(field) => <field.TextField label="Pickup Date" type="date" />}
        </form.AppField>
        <form.AppField name="estimatedDeliveryDate">
          {(field) => (
            <field.TextField label="Estimated Delivery Date" type="date" />
          )}
        </form.AppField>
        <form.AppField name="deliveryDate">
          {(field) => <field.TextField label="Delivery Date" type="date" />}
        </form.AppField>
        <form.AppField name="specialInstructions">
          {(field) => (
            <field.TextField label="Special Instructions" type="text" />
          )}
        </form.AppField>
        <form.AppField name="assignedDepartmentId">
          {(field) => (
            <field.TextField label="Assigned Department ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="createdBy">
          {(field) => <field.TextField label="Created By" type="text" />}
        </form.AppField>
        <form.AppField name="primaryTransportMode">
          {(field) => (
            <field.SelectField
              label="Primary Transport Mode"
              placeholder="Select transport mode"
              options={Object.values(LmsTransportMode).map((mode) => ({
                label: mode.charAt(0).toUpperCase() + mode.slice(1),
                value: mode,
              }))}
            />
          )}
        </form.AppField>
        <form.AppField name="status">
          {(field) => (
            <field.SelectField
              label="Status"
              placeholder="Select shipment status"
              options={Object.values(LmsShipmentStatus).map((status) => ({
                label: status
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
                value: status,
              }))}
            />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsShipmentForm, UpdateLmsShipmentForm };
