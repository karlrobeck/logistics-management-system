import { withForm } from '@/components/ui/form';
import {
  LmsProviderInvoiceLineItemsInsert,
  LmsProviderInvoiceLineItemsUpdate,
} from '@/db/schemas';

const CreateLmsProviderInvoiceLineItemForm = withForm({
  defaultValues: {} as LmsProviderInvoiceLineItemsInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerInvoiceId">
          {(field) => (
            <field.TextField label="Provider Invoice ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="transportLegId">
          {(field) => <field.TextField label="Transport Leg ID" type="text" />}
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
      </>
    );
  },
});

const UpdateLmsProviderInvoiceLineItemForm = withForm({
  defaultValues: {} as LmsProviderInvoiceLineItemsUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerInvoiceId">
          {(field) => (
            <field.TextField label="Provider Invoice ID" type="text" />
          )}
        </form.AppField>
        <form.AppField name="transportLegId">
          {(field) => <field.TextField label="Transport Leg ID" type="text" />}
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
      </>
    );
  },
});

export {
  CreateLmsProviderInvoiceLineItemForm,
  UpdateLmsProviderInvoiceLineItemForm,
};
