import { withForm } from '@/components/ui/form';
import {
  LmsProviderInvoicesInsert,
  LmsProviderInvoicesUpdate,
} from '@/db/schemas';

const CreateLmsProviderInvoiceForm = withForm({
  defaultValues: {} as LmsProviderInvoicesInsert,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="invoiceNumber">
          {(field) => <field.TextField label="Invoice Number" type="text" />}
        </form.AppField>
        <form.AppField name="invoiceDate">
          {(field) => <field.TextField label="Invoice Date" type="date" />}
        </form.AppField>
        <form.AppField name="dueDate">
          {(field) => <field.TextField label="Due Date" type="date" />}
        </form.AppField>
        <form.AppField name="subtotal">
          {(field) => <field.TextField label="Subtotal" type="number" />}
        </form.AppField>
        <form.AppField name="taxAmount">
          {(field) => <field.TextField label="Tax Amount" type="number" />}
        </form.AppField>
        <form.AppField name="totalAmount">
          {(field) => <field.TextField label="Total Amount" type="number" />}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => <field.TextField label="Status" type="text" />}
        </form.AppField>
        <form.AppField name="paymentDate">
          {(field) => <field.TextField label="Payment Date" type="date" />}
        </form.AppField>
      </>
    );
  },
});

const UpdateLmsProviderInvoiceForm = withForm({
  defaultValues: {} as LmsProviderInvoicesUpdate,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="providerId">
          {(field) => <field.TextField label="Provider ID" type="text" />}
        </form.AppField>
        <form.AppField name="invoiceNumber">
          {(field) => <field.TextField label="Invoice Number" type="text" />}
        </form.AppField>
        <form.AppField name="invoiceDate">
          {(field) => <field.TextField label="Invoice Date" type="date" />}
        </form.AppField>
        <form.AppField name="dueDate">
          {(field) => <field.TextField label="Due Date" type="date" />}
        </form.AppField>
        <form.AppField name="subtotal">
          {(field) => <field.TextField label="Subtotal" type="number" />}
        </form.AppField>
        <form.AppField name="taxAmount">
          {(field) => <field.TextField label="Tax Amount" type="number" />}
        </form.AppField>
        <form.AppField name="totalAmount">
          {(field) => <field.TextField label="Total Amount" type="number" />}
        </form.AppField>
        <form.AppField name="currency">
          {(field) => <field.TextField label="Currency" type="text" />}
        </form.AppField>
        <form.AppField name="status">
          {(field) => <field.TextField label="Status" type="text" />}
        </form.AppField>
        <form.AppField name="paymentDate">
          {(field) => <field.TextField label="Payment Date" type="date" />}
        </form.AppField>
      </>
    );
  },
});

export { CreateLmsProviderInvoiceForm, UpdateLmsProviderInvoiceForm };
