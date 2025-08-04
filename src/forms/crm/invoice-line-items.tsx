import { withForm } from '@/components/ui/form';
import {
  CrmInvoiceLineItemsInsert,
  CrmInvoiceLineItemsUpdate,
} from '@/db/schemas';

const CreateCrmInvoiceLineItemForm = withForm({
  defaultValues: {} as CrmInvoiceLineItemsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="invoiceId">
          {(field) => <field.TextField label="Invoice ID" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="quantity">
          {(field) => <field.TextField label="Quantity" type="number" />}
        </form.AppField>
        <form.AppField name="unitPrice">
          {(field) => <field.TextField label="Unit Price" type="number" />}
        </form.AppField>
        <form.AppField name="lineTotal">
          {(field) => <field.TextField label="Line Total" type="number" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateCrmInvoiceLineItemForm = withForm({
  defaultValues: {} as CrmInvoiceLineItemsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="invoiceId">
          {(field) => <field.TextField label="Invoice ID" type="text" />}
        </form.AppField>
        <form.AppField name="description">
          {(field) => <field.TextField label="Description" type="text" />}
        </form.AppField>
        <form.AppField name="quantity">
          {(field) => <field.TextField label="Quantity" type="number" />}
        </form.AppField>
        <form.AppField name="unitPrice">
          {(field) => <field.TextField label="Unit Price" type="number" />}
        </form.AppField>
        <form.AppField name="lineTotal">
          {(field) => <field.TextField label="Line Total" type="number" />}
        </form.AppField>
        <form.AppField name="shipmentId">
          {(field) => <field.TextField label="Shipment ID" type="text" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateCrmInvoiceLineItemForm, UpdateCrmInvoiceLineItemForm };
