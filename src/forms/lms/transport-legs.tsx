import { withForm } from '@/components/ui/form';
import { LmsTransportLegsInsert, LmsTransportLegsUpdate } from '@/db/schemas';

const CreateLmsTransportLegForm = withForm({
  defaultValues: {} as LmsTransportLegsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="legSequence">
          {(field) => <field.TextField label="Leg Sequence" type="number" />}
        </form.AppField>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="providerServiceId">
          {(field) => (
            <field.TextField label="Provider Service ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="providerTrackingNumber">
          {(field) => (
            <field.TextField label="Provider Tracking Number" type="text" />
          )}
        </form.AppField>
        <form.AppField name="originAddressId">
          {(field) => <field.TextField label="Origin Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="destinationAddressId">
          {(field) => (
            <field.TextField label="Destination Address ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="originWarehouseId">
          {(field) => (
            <field.TextField label="Origin Warehouse ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="destinationWarehouseId">
          {(field) => (
            <field.TextField label="Destination Warehouse ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="driverId">
          {(field) => <field.TextField label="Driver ID" type="text" />}
        </form.AppField>
        <form.AppField name="vehicleId">
          {(field) => <field.TextField label="Vehicle ID" type="text" />}
        </form.AppField>
        <form.AppField name="transportType">
          {(field) => <field.TextField label="Transport Type" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => <field.TextField label="Status" type="text" />}
        </form.AppField>
        <form.AppField name="scheduledPickup">
          {(field) => (
            <field.TextField label="Scheduled Pickup" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualPickup">
          {(field) => (
            <field.TextField label="Actual Pickup" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="scheduledDelivery">
          {(field) => (
            <field.TextField label="Scheduled Delivery" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualDelivery">
          {(field) => (
            <field.TextField label="Actual Delivery" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="cost">
          {(field) => <field.TextField label="Cost" type="number" />}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="specialInstructions">
          {(field) => (
            <field.TextField label="Special Instructions" type="text" />
          )}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsTransportLegForm = withForm({
  defaultValues: {} as LmsTransportLegsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
        <form.AppField name="legSequence">
          {(field) => <field.TextField label="Leg Sequence" type="number" />}
        </form.AppField>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="providerServiceId">
          {(field) => (
            <field.TextField label="Provider Service ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="providerTrackingNumber">
          {(field) => (
            <field.TextField label="Provider Tracking Number" type="text" />
          )}
        </form.AppField>
        <form.AppField name="originAddressId">
          {(field) => <field.TextField label="Origin Address ID" type="text" />}
        </form.AppField>
        <form.AppField name="destinationAddressId">
          {(field) => (
            <field.TextField label="Destination Address ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="originWarehouseId">
          {(field) => (
            <field.TextField label="Origin Warehouse ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="destinationWarehouseId">
          {(field) => (
            <field.TextField label="Destination Warehouse ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="driverId">
          {(field) => <field.TextField label="Driver ID" type="text" />}
        </form.AppField>
        <form.AppField name="vehicleId">
          {(field) => <field.TextField label="Vehicle ID" type="text" />}
        </form.AppField>
        <form.AppField name="transportType">
          {(field) => <field.TextField label="Transport Type" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => <field.TextField label="Status" type="text" />}
        </form.AppField>
        <form.AppField name="scheduledPickup">
          {(field) => (
            <field.TextField label="Scheduled Pickup" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualPickup">
          {(field) => (
            <field.TextField label="Actual Pickup" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="scheduledDelivery">
          {(field) => (
            <field.TextField label="Scheduled Delivery" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="actualDelivery">
          {(field) => (
            <field.TextField label="Actual Delivery" type="datetime-local" />
          )}
        </form.AppField>
        <form.AppField name="cost">
          {(field) => <field.TextField label="Cost" type="number" />}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="specialInstructions">
          {(field) => (
            <field.TextField label="Special Instructions" type="text" />
          )}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsTransportLegForm, UpdateLmsTransportLegForm };
